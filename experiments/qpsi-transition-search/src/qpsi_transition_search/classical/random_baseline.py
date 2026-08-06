import random
from typing import List, Optional
from qpsi_transition_search.domain.scoring import CandidateEvaluation

class RandomBaselines:
    """Fixed-seed uniform random and valid-only random candidate selection baselines."""

    @staticmethod
    def select_uniform_random(evaluations: List[CandidateEvaluation], seed: int = 42) -> CandidateEvaluation:
        rng = random.Random(seed)
        return rng.choice(evaluations)

    @staticmethod
    def select_valid_only_random(evaluations: List[CandidateEvaluation], seed: int = 42) -> Optional[CandidateEvaluation]:
        valid_evals = [e for e in evaluations if e.is_valid]
        if not valid_evals:
            return None
        rng = random.Random(seed)
        return rng.choice(valid_evals)
