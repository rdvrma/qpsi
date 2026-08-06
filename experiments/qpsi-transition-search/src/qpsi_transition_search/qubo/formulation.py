import numpy as np
from typing import List, Tuple
from qpsi_transition_search.domain.scoring import CandidateEvaluation
from qpsi_transition_search.qubo.coefficients import (
    PENALTY_EXACTLY_ONE,
    PENALTY_INVALID_CANDIDATE,
    WEIGHT_UTILITY,
)

class QuboFormulation:
    """Builds QUBO matrix Q (8x8) and constant offset for 8-candidate selection."""

    def __init__(
        self,
        a_penalty: float = PENALTY_EXACTLY_ONE,
        p_invalid: float = PENALTY_INVALID_CANDIDATE,
        b_weight: float = WEIGHT_UTILITY,
    ):
        self.A = a_penalty
        self.P_invalid = p_invalid
        self.B = b_weight

    def build_matrix(self, evaluations: List[CandidateEvaluation]) -> Tuple[np.ndarray, float]:
        """
        Builds 8x8 symmetric upper triangular QUBO matrix Q and constant C.
        E(x) = x^T Q x + C
        """
        n = len(evaluations)
        if n != 8:
            raise ValueError(f"QUBO formulation requires exactly 8 candidates, got {n}")

        Q = np.zeros((n, n), dtype=np.float64)

        for i in range(n):
            ev = evaluations[i]
            inv_p = 0.0 if ev.is_valid else self.P_invalid
            u_i = ev.normalized_utility

            # Diagonal: A * (1 - 2) + inv_p - B * u_i = -A + inv_p - B * u_i
            Q[i, i] = -self.A + inv_p - (self.B * u_i)

            # Off-diagonal: 2 * A
            for j in range(i + 1, n):
                Q[i, j] = 2.0 * self.A

        constant = self.A
        return Q, constant

    def compute_energy(self, x: np.ndarray, Q: np.ndarray, constant: float) -> float:
        """Computes E(x) = x^T Q x + constant for binary bitstring x in {0,1}^8."""
        return float(x.T @ Q @ x + constant)
