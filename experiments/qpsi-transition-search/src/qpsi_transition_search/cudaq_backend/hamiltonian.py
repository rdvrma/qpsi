import numpy as np
from typing import Any
from qpsi_transition_search.cudaq_backend.environment import HAS_CUDA_Q, cudaq

class CudaQHamiltonianBuilder:
    """Constructs CUDA-Q spin Hamiltonian from Ising coefficients (h, J)."""

    @staticmethod
    def build_hamiltonian(h: np.ndarray, J: np.ndarray) -> Any:
        if not HAS_CUDA_Q or cudaq is None:
            return None

        n = len(h)
        # Initialize zero spin operator
        hamiltonian = 0.0 * cudaq.spin.z(0)

        # Single spin Z_i terms
        for i in range(n):
            if abs(h[i]) > 1e-9:
                hamiltonian += float(h[i]) * cudaq.spin.z(i)

        # Two-spin Z_i Z_j coupling terms
        for i in range(n):
            for j in range(i + 1, n):
                if abs(J[i, j]) > 1e-9:
                    hamiltonian += float(J[i, j]) * (cudaq.spin.z(i) * cudaq.spin.z(j))

        return hamiltonian
