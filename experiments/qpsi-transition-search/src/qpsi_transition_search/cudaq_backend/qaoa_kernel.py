import numpy as np
from typing import Dict, Any, Tuple
from qpsi_transition_search.cudaq_backend.environment import HAS_CUDA_Q, cudaq

class CudaQQaoaKernel:
    """QAOA ansatz kernel for 8-qubit candidate selection problem."""

    @staticmethod
    def build_qaoa_circuit(num_qubits: int, p: int, params: np.ndarray, h: np.ndarray, J: np.ndarray) -> Any:
        if not HAS_CUDA_Q or cudaq is None:
            return None

        # Build parameterized CUDA-Q kernel using make_kernel
        kernel, params_var = cudaq.make_kernel(list)
        qubits = kernel.qalloc(num_qubits)

        # Initial superposition H^N
        for i in range(num_qubits):
            kernel.h(qubits[i])

        # QAOA layers: p layers of (Cost, Mixer)
        gammas = params[:p]
        betas = params[p : 2 * p]

        for layer in range(p):
            gamma = gammas[layer]
            beta = betas[layer]

            # 1. Cost Hamiltonian evolution: exp(-i * gamma * H_cost)
            for i in range(num_qubits):
                if abs(h[i]) > 1e-9:
                    kernel.rz(2.0 * gamma * float(h[i]), qubits[i])

            for i in range(num_qubits):
                for j in range(i + 1, num_qubits):
                    if abs(J[i, j]) > 1e-9:
                        kernel.cx(qubits[i], qubits[j])
                        kernel.rz(2.0 * gamma * float(J[i, j]), qubits[j])
                        kernel.cx(qubits[i], qubits[j])

            # 2. Mixer Hamiltonian evolution: exp(-i * beta * H_mixer) = RX(2*beta)
            for i in range(num_qubits):
                kernel.rx(2.0 * beta, qubits[i])

        # Measurement
        kernel.mz(qubits)
        return kernel
