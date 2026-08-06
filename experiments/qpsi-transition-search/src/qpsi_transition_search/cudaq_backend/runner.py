import numpy as np
import time
import random
from typing import Dict, Any, List
from qpsi_transition_search.domain.scoring import CandidateEvaluation
from qpsi_transition_search.qubo.formulation import QuboFormulation
from qpsi_transition_search.qubo.ising import IsingConverter
from qpsi_transition_search.cudaq_backend.environment import HAS_CUDA_Q, cudaq
from qpsi_transition_search.cudaq_backend.optimizer import QaoaOptimizer
from qpsi_transition_search.cudaq_backend.sampler import BitstringSampler

class CudaQExperimentRunner:
    """Executes QAOA transition search experiment for depth p."""

    def __init__(self, p: int = 1, shots: int = 1000, seed: int = 42):
        self.p = p
        self.shots = shots
        self.seed = seed

    def run_experiment(
        self,
        evaluations: List[CandidateEvaluation],
        Q: np.ndarray,
        C_qubo: float,
    ) -> Dict[str, Any]:
        start_time = time.time()

        # 1. Convert QUBO to Ising
        h, J, C_ising = IsingConverter.qubo_to_ising(Q, C_qubo)

        # 2. State-vector / QAOA simulation (handles both native CUDA-Q and Python simulator baseline)
        if HAS_CUDA_Q and cudaq is not None:
            sample_counts = self._run_cudaq_native(h, J)
        else:
            sample_counts = self._run_python_qaoa_simulator(h, J)

        # 3. Decode & rank candidates
        processed = BitstringSampler.process_sample_counts(sample_counts, evaluations)

        elapsed = time.time() - start_time
        processed["runtime_seconds"] = round(elapsed, 4)
        processed["qaoa_depth"] = self.p
        processed["shots"] = self.shots
        processed["seed"] = self.seed

        return processed

    def _run_python_qaoa_simulator(self, h: np.ndarray, J: np.ndarray) -> Dict[str, int]:
        """Mathematically exact QAOA state vector simulator for 8 qubits."""
        n = 8
        rng = random.Random(self.seed)

        # Build diagonal Ising energy for all 256 computational basis states
        num_states = 1 << n
        energies = np.zeros(num_states, dtype=np.float64)

        for int_val in range(num_states):
            x = np.array([(int_val >> (7 - b)) & 1 for b in range(8)], dtype=np.float64)
            s = 1.0 - 2.0 * x
            energies[int_val] = IsingConverter.compute_ising_energy(s, h, J, 0.0)

        # Cost evaluator for parameter optimizer
        def eval_qaoa_cost(params: np.ndarray) -> float:
            gammas = params[: self.p]
            betas = params[self.p :]

            # Start in equal superposition state |+>^n
            state = np.ones(num_states, dtype=np.complex128) / np.sqrt(num_states)

            for layer in range(self.p):
                gamma = gammas[layer]
                beta = betas[layer]

                # Apply exp(-i * gamma * H_cost)
                state = state * np.exp(-1j * gamma * energies)

                # Apply exp(-i * beta * H_mixer) for each qubit
                for q in range(n):
                    c = np.cos(beta)
                    s_val = -1j * np.sin(beta)
                    # RX(2*beta) on qubit q
                    new_state = np.zeros_like(state)
                    mask = 1 << (7 - q)
                    for idx in range(num_states):
                        target_idx = idx ^ mask
                        new_state[idx] = c * state[idx] + s_val * state[target_idx]
                    state = new_state

            probs = np.abs(state) ** 2
            return float(np.sum(probs * energies))

        optimizer = QaoaOptimizer(p=self.p, max_evals=60, seed=self.seed)
        opt_params, opt_cost, _ = optimizer.optimize(eval_qaoa_cost)

        # Final probabilities after optimization
        gammas = opt_params[: self.p]
        betas = opt_params[self.p :]
        state = np.ones(num_states, dtype=np.complex128) / np.sqrt(num_states)
        for layer in range(self.p):
            state = state * np.exp(-1j * gammas[layer] * energies)
            for q in range(n):
                c = np.cos(betas[layer])
                s_val = -1j * np.sin(betas[layer])
                new_state = np.zeros_like(state)
                mask = 1 << (7 - q)
                for idx in range(num_states):
                    target_idx = idx ^ mask
                    new_state[idx] = c * state[idx] + s_val * state[target_idx]
                state = new_state

        probs = np.abs(state) ** 2
        probs_sum = np.sum(probs)
        if probs_sum > 0:
            probs /= probs_sum

        # Sample bitstrings using python random.choices
        choices = list(range(num_states))
        sampled_indices = rng.choices(choices, weights=probs.tolist(), k=self.shots)

        counts: Dict[str, int] = {}
        for idx in sampled_indices:
            b_str = format(idx, "08b")
            counts[b_str] = counts.get(b_str, 0) + 1

        return counts

    def _run_cudaq_native(self, h: np.ndarray, J: np.ndarray) -> Dict[str, int]:
        """Native CUDA-Q execution."""
        from qpsi_transition_search.cudaq_backend.qaoa_kernel import CudaQQaoaKernel
        from qpsi_transition_search.cudaq_backend.hamiltonian import CudaQHamiltonianBuilder

        hamiltonian = CudaQHamiltonianBuilder.build_hamiltonian(h, J)

        def cost_eval(params: np.ndarray) -> float:
            kernel = CudaQQaoaKernel.build_qaoa_circuit(8, self.p, params, h, J)
            val = cudaq.observe(kernel, hamiltonian).expectation()
            return float(val)

        optimizer = QaoaOptimizer(p=self.p, max_evals=60, seed=self.seed)
        opt_params, _, _ = optimizer.optimize(cost_eval)

        final_kernel = CudaQQaoaKernel.build_qaoa_circuit(8, self.p, opt_params, h, J)
        result = cudaq.sample(final_kernel, shots_count=self.shots)

        counts: Dict[str, int] = {}
        for b_str, cnt in result.items():
            counts[str(b_str)] = int(cnt)
        return counts
