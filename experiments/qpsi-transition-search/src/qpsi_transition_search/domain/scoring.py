from dataclasses import dataclass
from typing import Dict, Any, List
from qpsi_transition_search.domain.candidate import CandidateAction

SCORING_MODEL_VERSION = "qpsi-transition-score-v1"

@dataclass
class CandidateEvaluation:
    candidate_id: str
    is_valid: bool
    validation_code: str
    validation_error: str
    
    # Soft utility breakdown
    narrative_novelty: float
    relationship_relevance: float
    information_gain: float
    repetition_penalty: float
    
    raw_utility: float
    normalized_utility: float  # In [0.0, 1.0]

class ScoringModel:
    """Versioned scoring model qpsi-transition-score-v1."""

    def __init__(self, version: str = SCORING_MODEL_VERSION):
        self.version = version

    def evaluate_candidates(
        self,
        candidates: List[CandidateAction],
        validation_results: List[Dict[str, Any]],
        scenario_context: Dict[str, Any],
    ) -> List[CandidateEvaluation]:
        evaluations: List[CandidateEvaluation] = []
        raw_utilities: List[float] = []

        # 1. Compute raw utilities & hard validation flags
        for cand, val in zip(candidates, validation_results):
            is_valid = bool(val.get("valid", False))
            val_code = str(val.get("code", "OK" if is_valid else "VALIDATION_FAILED"))
            val_error = str(val.get("error_message", ""))

            # Soft factors (deterministic heuristics based on scenario context & parameters)
            novelty = float(cand.parameters.get("novelty", 0.5))
            relationship = float(cand.parameters.get("relationship", 0.3))
            info_gain = float(cand.parameters.get("info_gain", 0.4))
            repetition = float(cand.parameters.get("repetition_penalty", 0.0))

            raw_u = novelty + relationship + info_gain - repetition
            raw_utilities.append(raw_u)

            evaluations.append(
                CandidateEvaluation(
                    candidate_id=cand.candidate_id,
                    is_valid=is_valid,
                    validation_code=val_code,
                    validation_error=val_error,
                    narrative_novelty=novelty,
                    relationship_relevance=relationship,
                    information_gain=info_gain,
                    repetition_penalty=repetition,
                    raw_utility=raw_u,
                    normalized_utility=0.0,  # Will normalize below
                )
            )

        # 2. Normalize raw utilities to [0, 1] across candidates
        min_u = min(raw_utilities) if raw_utilities else 0.0
        max_u = max(raw_utilities) if raw_utilities else 1.0
        rng = (max_u - min_u) if max_u > min_u else 1.0

        for ev in evaluations:
            ev.normalized_utility = round((ev.raw_utility - min_u) / rng, 4)

        return evaluations
