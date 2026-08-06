import pytest
import numpy as np
from qpsi_transition_search.domain.candidate import CandidateAction
from qpsi_transition_search.domain.scoring import ScoringModel
from qpsi_transition_search.qubo.formulation import QuboFormulation
from qpsi_transition_search.qubo.ising import IsingConverter
from qpsi_transition_search.qubo.verification import EnergyVerifier

def test_qubo_ising_256_state_equivalence() -> None:
    cands = [
        CandidateAction(candidate_id=f"C{i}", actor_id="marcus", command_type="inspect_object", target_id="book")
        for i in range(8)
    ]
    val_results = [{"valid": True} if i % 2 == 0 else {"valid": False} for i in range(8)]

    model = ScoringModel()
    evals = model.evaluate_candidates(cands, val_results, {})

    formulation = QuboFormulation()
    Q, C_qubo = formulation.build_matrix(evals)

    h, J, C_ising = IsingConverter.qubo_to_ising(Q, C_qubo)

    ver = EnergyVerifier.verify_all_256_states(Q, C_qubo, h, J, C_ising, tolerance=1e-6)

    assert ver["verified"] is True
    assert ver["total_states_checked"] == 256
    assert ver["mismatch_count"] == 0
    assert ver["max_difference"] < 1e-6
