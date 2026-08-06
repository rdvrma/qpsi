from typing import List, Optional
from qpsi_transition_search.domain.candidate import CandidateAction
from qpsi_transition_search.domain.scoring import CandidateEvaluation

class ExhaustiveOptimizer:
    """Evaluates all 8 candidates exhaustively and returns the valid candidate with highest utility."""

    @staticmethod
    def find_optimum(evaluations: List[CandidateEvaluation]) -> Optional[CandidateEvaluation]:
        valid_evals = [e for e in evaluations if e.is_valid]
        if not valid_evals:
            return None
        # Sort by normalized utility descending, candidate_id ascending for deterministic tie breaking
        valid_evals.sort(key=lambda e: (-e.normalized_utility, e.candidate_id))
        return valid_evals[0]
