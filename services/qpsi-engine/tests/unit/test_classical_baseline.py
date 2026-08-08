from qpsi_engine.experiments.classical_baseline import run_classical_baseline


def test_classical_baseline_runner_executes_offline():
    metrics = run_classical_baseline(db_url="sqlite:///:memory:", enable_telemetry=False)

    assert "run_id" in metrics
    assert metrics["experiment_schema_version"] == "1.0.0"
    assert metrics["engine_version"] == "0.2.0"
    assert metrics["scenario_id"] == "classical-baseline-v1"
    assert metrics["scenario_version"] == "1.0.0"
    assert metrics["total_transition_cases"] == 10
    assert metrics["expected_accept_count"] == 6
    assert metrics["expected_reject_count"] == 4
    assert metrics["actual_accept_count"] == 6
    assert metrics["actual_reject_count"] == 4
    assert metrics["unexpected_accept_count"] == 0
    assert metrics["unexpected_reject_count"] == 0
    assert metrics["expected_outcome_match_count"] == 10
    assert metrics["expected_outcome_match_rate"] == 1.0
    assert metrics["scenario_validation_accuracy"] == 1.0
    assert metrics["replay_success"] is True
    assert metrics["restart_recovery_success"] is True
    assert metrics["integrity_success"] is True
    assert metrics["digest_match"] is True
    assert metrics["total_runtime_ms"] > 0.0
    assert len(metrics["final_state_digest"]) == 64  # SHA-256 hex digest length
