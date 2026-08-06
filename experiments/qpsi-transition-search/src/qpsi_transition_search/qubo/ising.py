import numpy as np
from typing import Tuple

class IsingConverter:
    """Converts QUBO matrix Q and constant to Ising Hamiltonian (h, J, C_ising)."""

    @staticmethod
    def qubo_to_ising(Q: np.ndarray, C_qubo: float) -> Tuple[np.ndarray, np.ndarray, float]:
        """
        Converts QUBO x in {0,1}^n to Ising s in {-1,+1}^n via x_i = (1 - s_i)/2.
        Returns:
            h: 1D array of single-spin magnetic field coefficients
            J: 2D upper triangular matrix of 2-spin coupling interactions
            C_ising: constant scalar energy offset
        """
        n = Q.shape[0]
        h = np.zeros(n, dtype=np.float64)
        J = np.zeros((n, n), dtype=np.float64)

        # Ensure Q is upper-triangular or symmetric
        Q_sym = np.zeros((n, n), dtype=np.float64)
        for i in range(n):
            for j in range(n):
                if i == j:
                    Q_sym[i, i] = Q[i, i]
                elif i < j:
                    val = Q[i, j] + Q[j, i]
                    Q_sym[i, j] = val
                    Q_sym[j, i] = val

        # 1. Couplings J_ij for i < j
        for i in range(n):
            for j in range(i + 1, n):
                J[i, j] = Q_sym[i, j] / 4.0

        # 2. Local fields h_i
        for i in range(n):
            h_i = -Q_sym[i, i] / 2.0
            for j in range(n):
                if j != i:
                    h_i -= Q_sym[i, j] / 4.0
            h[i] = h_i

        # 3. Constant offset C_ising
        c_ising = C_qubo + np.sum(Q_sym.diagonal()) / 2.0
        for i in range(n):
            for j in range(i + 1, n):
                c_ising += Q_sym[i, j] / 4.0

        return h, J, float(c_ising)

    @staticmethod
    def compute_ising_energy(s: np.ndarray, h: np.ndarray, J: np.ndarray, C_ising: float) -> float:
        """Computes Ising energy E(s) = sum(h_i * s_i) + sum_{i<j}(J_ij * s_i * s_j) + C_ising."""
        energy = np.dot(h, s) + C_ising
        n = len(s)
        for i in range(n):
            for j in range(i + 1, n):
                energy += J[i, j] * s[i] * s[j]
        return float(energy)
