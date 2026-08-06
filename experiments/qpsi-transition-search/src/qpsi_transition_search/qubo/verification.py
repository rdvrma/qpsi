import numpy as np
from typing import Dict, Any
from qpsi_transition_search.qubo.formulation import QuboFormulation
from qpsi_transition_search.qubo.ising import IsingConverter

class EnergyVerifier:
    """Mandatory verification that E_QUBO(x) == E_Ising(s) across all 2^8 = 256 bitstrings."""

    @staticmethod
    def verify_all_256_states(
        Q: np.ndarray,
        C_qubo: float,
        h: np.ndarray,
        J: np.ndarray,
        C_ising: float,
        tolerance: float = 1e-6,
    ) -> Dict[str, Any]:
        n = Q.shape[0]
        if n != 8:
            raise ValueError(f"Energy verification requires 8 variables, got {n}")

        num_states = 1 << n  # 256
        max_diff = 0.0
        diff_count = 0

        formulation = QuboFormulation()

        for int_val in range(num_states):
            # Binary bitstring x in {0,1}^8
            x = np.array([(int_val >> (7 - b)) & 1 for b in range(8)], dtype=np.float64)
            # Spin bitstring s in {-1,+1}^8 (where x_i = (1 - s_i)/2 => s_i = 1 - 2*x_i)
            s = 1.0 - 2.0 * x

            e_qubo = formulation.compute_energy(x, Q, C_qubo)
            e_ising = IsingConverter.compute_ising_energy(s, h, J, C_ising)

            diff = abs(e_qubo - e_ising)
            if diff > max_diff:
                max_diff = diff
            if diff > tolerance:
                diff_count += 1

        is_valid = diff_count == 0
        return {
            "verified": is_valid,
            "total_states_checked": num_states,
            "mismatch_count": diff_count,
            "max_difference": float(max_diff),
            "tolerance": tolerance,
        }
