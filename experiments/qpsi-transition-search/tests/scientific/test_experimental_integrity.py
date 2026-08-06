import pytest
from qpsi_transition_search.benchmarks.scenarios import BenchmarkScenarioGenerator
from qpsi_transition_search.classical.exhaustive import ExhaustiveOptimizer
from qpsi_transition_search.classical.random_baseline import RandomBaselines
from qpsi_transition_search.domain.scoring import ScoringModel
from qpsi_transition_search.classical.validator_adapter import ValidatorAdapter

def test_no_direct_canonical_event_commit() -> None:
    """Verifies research experiment is strictly read-only and never commits events to production worlds."""
    scenarios = BenchmarkScenarioGenerator.generate_all_scenarios()
    scen = scenarios[0]
    initial_seq = scen.initial_world_state["sequence_number"]

    # Running validation does NOT increment sequence number or mutate initial_world_state
    adapter = ValidatorAdapter()
    for cand in scen.candidates:
        adapter.validate_action(
            world_state_dict=scen.initial_world_state,
            actor_id=cand.actor_id,
            command_type=cand.command_type,
            target_id=cand.target_id,
        )

    assert scen.initial_world_state["sequence_number"] == initial_seq

def test_fixed_seed_reproducibility() -> None:
    scenarios = BenchmarkScenarioGenerator.generate_all_scenarios()
    scen = scenarios[0]
    adapter = ValidatorAdapter()
    val_results = [
        adapter.validate_action(scen.initial_world_state, c.actor_id, c.command_type, c.target_id)
        for c in scen.candidates
    ]
    evals = ScoringModel().evaluate_candidates(scen.candidates, val_results, {})

    sel1 = RandomBaselines.select_uniform_random(evals, seed=42)
    sel2 = RandomBaselines.select_uniform_random(evals, seed=42)

    assert sel1.candidate_id == sel2.candidate_id
