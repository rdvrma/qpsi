import pytest
import numpy as np
from qpsi_transition_search.domain.candidate import CandidateAction
from qpsi_transition_search.domain.scoring import ScoringModel
from qpsi_transition_search.qubo.formulation import QuboFormulation
from qpsi_transition_search.cudaq_backend.runner import CudaQExperimentRunner
from qpsi_transition_search.cudaq_backend.environment import CudaQEnvironment

def test_environment_detection() -> None:
    info = CudaQEnvironment.get_info()
    assert "operating_system" in info
    assert "selected_target" in info

def test_qaoa_runner_execution() -> None:
    cands = [
        CandidateAction(candidate_id=f"C{i}", actor_id="marcus", command_type="inspect_object", target_id="book")
        for i in range(8)
    ]
    val_results = [{"valid": True} if i == 0 else {"valid": False} for i in range(8)]

    model = ScoringModel()
    evals = model.evaluate_candidates(cands, val_results, {})

    formulation = QuboFormulation()
    Q, C_qubo = formulation.build_matrix(evals)

    runner = CudaQExperimentRunner(p=1, shots=500, seed=42)
    res = runner.run_experiment(evals, Q, C_qubo)

    assert "selected_candidate_id" in res
    assert "exactly_one_rate" in res
    assert res["total_shots"] == 500
