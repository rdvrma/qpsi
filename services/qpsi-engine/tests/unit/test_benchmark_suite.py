from unittest.mock import patch
from qpsi_engine.experiments.benchmark_suite import (
    generate_deterministic_workload,
    run_benchmark_scenario,
)


def test_workload_generator_is_deterministic():
    wl1 = generate_deterministic_workload("w1", "mixed", 100, seed=42)
    wl2 = generate_deterministic_workload("w1", "mixed", 100, seed=42)

    assert len(wl1) == 100
    assert len(wl2) == 100

    for (cmd1, exp1), (cmd2, exp2) in zip(wl1, wl2):
        assert cmd1.command_id == cmd2.command_id
        assert cmd1.command_type == cmd2.command_type
        assert cmd1.actor_id == cmd2.actor_id
        assert exp1 == exp2


def test_workload_lengths_and_composition():
    wl_100_happy = generate_deterministic_workload("w1", "happy_path", 100)
    wl_1000_happy = generate_deterministic_workload("w1", "happy_path", 1000)
    wl_100_adv = generate_deterministic_workload("w1", "adversarial", 100)
    wl_100_mixed = generate_deterministic_workload("w1", "mixed", 100)

    assert len(wl_100_happy) == 100
    assert len(wl_1000_happy) == 1000

    # Happy path: 100% expected valid
    assert all(expected for _, expected in wl_100_happy)

    # Adversarial path: 100% expected invalid
    assert all(not expected for _, expected in wl_100_adv)

    # Mixed path: mix of valid and invalid
    mixed_valid_count = sum(1 for _, expected in wl_100_mixed if expected)
    mixed_invalid_count = sum(1 for _, expected in wl_100_mixed if not expected)
    assert mixed_valid_count > 0
    assert mixed_invalid_count > 0
    assert mixed_valid_count + mixed_invalid_count == 100


def test_benchmark_scenario_100_cases_executes_offline():
    metrics = run_benchmark_scenario("mixed", 100, enable_telemetry=False)

    assert metrics["experiment_schema_version"] == "1.0.0"
    assert metrics["benchmark_suite_version"] == "1.0.0"
    assert metrics["scenario_class"] == "mixed"
    assert metrics["workload_size"] == 100
    assert metrics["total_transition_cases"] == 100
    assert metrics["expected_outcome_match_count"] == 100
    assert metrics["expected_outcome_match_rate"] == 1.0
    assert metrics["scenario_validation_accuracy"] == 1.0
    assert metrics["unexpected_accept_count"] == 0
    assert metrics["unexpected_reject_count"] == 0
    assert metrics["replay_success"] is True
    assert metrics["restart_recovery_success"] is True
    assert metrics["integrity_success"] is True
    assert metrics["digest_match"] is True
    assert metrics["accepted_state_equivalence_success"] is True
    assert len(metrics["final_state_digest"]) == 64


def test_accepted_state_equivalence_mixed_vs_valid_only():
    """Verifies that rejected adversarial commands produce ZERO state mutation.

    The state digest after executing full mixed workload (Path A) MUST match
    the state digest after executing only valid commands (Path B).
    """
    mixed_metrics = run_benchmark_scenario("mixed", 100, enable_telemetry=False)
    assert mixed_metrics["accepted_state_equivalence_success"] is True


def test_telemetry_failure_does_not_affect_benchmark():
    with patch("weave.init") as mock_weave_init:
        mock_weave_init.side_effect = RuntimeError("Remote telemetry offline")
        metrics = run_benchmark_scenario("mixed", 100, enable_telemetry=True)

        assert metrics["expected_outcome_match_rate"] == 1.0
        assert metrics["replay_success"] is True
        assert metrics["digest_match"] is True
