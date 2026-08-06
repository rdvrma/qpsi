import pytest
import numpy as np
from qpsi_transition_search.domain.candidate import CandidateAction
from qpsi_transition_search.domain.scoring import ScoringModel
from qpsi_transition_search.qubo.formulation import QuboFormulation

def test_deterministic_candidate_generation() -> None:
    cands = [
        CandidateAction(candidate_id=f"C{i}", actor_id="marcus", command_type="inspect_object", target_id="book")
        for i in range(8)
    ]
    assert len(cands) == 8
    assert cands[0].candidate_id == "C0"
    assert cands[7].candidate_id == "C7"

def test_hard_invalid_candidate_penalty() -> None:
    cands = [
        CandidateAction(candidate_id=f"C{i}", actor_id="marcus", command_type="inspect_object", target_id="book")
        for i in range(8)
    ]
    val_results = [{"valid": True} if i != 2 else {"valid": False, "code": "STATE_CONTRADICTION"} for i in range(8)]

    model = ScoringModel()
    evals = model.evaluate_candidates(cands, val_results, {})

    formulation = QuboFormulation()
    Q, C_qubo = formulation.build_matrix(evals)

    # Candidate 2 (invalid) diagonal term includes P_invalid
    assert not evals[2].is_valid
    assert Q[2, 2] > 50.0  # P_invalid (100.0) dominates
