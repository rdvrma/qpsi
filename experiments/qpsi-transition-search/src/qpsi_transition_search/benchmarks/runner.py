import time
import numpy as np
from pathlib import Path
from typing import List, Dict, Any
from qpsi_transition_search.benchmarks.scenarios import BenchmarkScenarioGenerator
from qpsi_transition_search.classical.validator_adapter import ValidatorAdapter
from qpsi_transition_search.classical.exhaustive import ExhaustiveOptimizer
from qpsi_transition_search.classical.random_baseline import RandomBaselines
from qpsi_transition_search.domain.scoring import ScoringModel
from qpsi_transition_search.domain.result import ScenarioResult
from qpsi_transition_search.qubo.formulation import QuboFormulation
from qpsi_transition_search.qubo.ising import IsingConverter
from qpsi_transition_search.qubo.verification import EnergyVerifier
from qpsi_transition_search.cudaq_backend.runner import CudaQExperimentRunner
from qpsi_transition_search.benchmarks.metrics import MetricAggregator
from qpsi_transition_search.benchmarks.exporter import BenchmarkExporter

class BenchmarkRunner:
    """Executes full benchmark suite across all scenarios and QAOA depths."""

    def __init__(self, output_dir: Path):
        self.output_dir = output_dir
        self.validator_adapter = ValidatorAdapter()
        self.scoring_model = ScoringModel()

    def run_all(self, shots: int = 1000, seed: int = 42) -> Dict[str, Any]:
        start_time = time.time()
        scenarios = BenchmarkScenarioGenerator.generate_all_scenarios()

        scenario_results: List[ScenarioResult] = []
        raw_scenarios_data: List[Dict[str, Any]] = []

        qaoa_runner_p1 = CudaQExperimentRunner(p=1, shots=shots, seed=seed)
        qaoa_runner_p2 = CudaQExperimentRunner(p=2, shots=shots, seed=seed)

        for scen in scenarios:
            # 1. Classical validation for each candidate
            val_results = []
            for cand in scen.candidates:
                v = self.validator_adapter.validate_action(
                    world_state_dict=scen.initial_world_state,
                    actor_id=cand.actor_id,
                    command_type=cand.command_type,
                    target_id=cand.target_id,
                    source_location=cand.source_location,
                    destination_location=cand.destination_location,
                    parameters=cand.parameters,
                )
                val_results.append(v)

            # 2. Evaluate candidates via versioned scoring model
            evaluations = self.scoring_model.evaluate_candidates(
                candidates=scen.candidates,
                validation_results=val_results,
                scenario_context=scen.initial_world_state,
            )

            # 3. Exhaustive optimum
            opt_eval = ExhaustiveOptimizer.find_optimum(evaluations)
            opt_id = opt_eval.candidate_id if opt_eval else "C0"
            opt_utility = opt_eval.normalized_utility if opt_eval else 0.0

            # 4. Random baselines
            unif_eval = RandomBaselines.select_uniform_random(evaluations, seed=seed)
            valid_rand_eval = RandomBaselines.select_valid_only_random(evaluations, seed=seed)

            # 5. Build QUBO & Verify 256 states
            formulation = QuboFormulation()
            Q, C_qubo = formulation.build_matrix(evaluations)
            h, J, C_ising = IsingConverter.qubo_to_ising(Q, C_qubo)

            ver_res = EnergyVerifier.verify_all_256_states(Q, C_qubo, h, J, C_ising)
            if not ver_res["verified"]:
                raise RuntimeError(f"QUBO/Ising energy mismatch in scenario {scen.scenario_id}")

            # 6. Run QAOA p=1 and p=2
            res_p1 = qaoa_runner_p1.run_experiment(evaluations, Q, C_qubo)
            res_p2 = qaoa_runner_p2.run_experiment(evaluations, Q, C_qubo)

            # Record scenario result
            s_result = ScenarioResult(
                scenario_id=scen.scenario_id,
                initial_digest=str(scen.initial_world_state.get("sequence_number", 0)),
                candidates_count=len(scen.candidates),
                valid_candidates_count=sum(1 for e in evaluations if e.is_valid),
                exhaustive_optimum_id=opt_id,
                exhaustive_optimum_utility=opt_utility,
                uniform_random_selected_id=unif_eval.candidate_id,
                uniform_random_valid=unif_eval.is_valid,
                uniform_random_utility=unif_eval.normalized_utility,
                valid_random_selected_id=valid_rand_eval.candidate_id if valid_rand_eval else "C0",
                valid_random_utility=valid_rand_eval.normalized_utility if valid_rand_eval else 0.0,
                qaoa_p1_selected_id=res_p1["selected_candidate_id"],
                qaoa_p1_valid=res_p1["is_valid"],
                qaoa_p1_utility=res_p1["normalized_utility"],
                qaoa_p1_matches_optimum=(res_p1["selected_candidate_id"] == opt_id),
                qaoa_p1_exactly_one_rate=res_p1["exactly_one_rate"],
                qaoa_p1_invalid_rate=res_p1["invalid_selection_rate"],
                qaoa_p2_selected_id=res_p2["selected_candidate_id"],
                qaoa_p2_valid=res_p2["is_valid"],
                qaoa_p2_utility=res_p2["normalized_utility"],
                qaoa_p2_matches_optimum=(res_p2["selected_candidate_id"] == opt_id),
                qaoa_p2_exactly_one_rate=res_p2["exactly_one_rate"],
                qaoa_p2_invalid_rate=res_p2["invalid_selection_rate"],
            )

            scenario_results.append(s_result)
            raw_scenarios_data.append(
                {
                    "scenario_id": scen.scenario_id,
                    "title": scen.title,
                    "description": scen.description,
                    "candidates": [c.candidate_id for c in scen.candidates],
                }
            )

        elapsed = time.time() - start_time
        metrics = MetricAggregator.aggregate(scenario_results, elapsed)

        qaoa_params = {
            "p_layers": [1, 2],
            "optimizer": "COBYLA",
            "shots": shots,
            "seed": seed,
            "qubo_coefficients": {
                "penalty_exactly_one": formulation.A,
                "penalty_invalid_candidate": formulation.P_invalid,
                "weight_utility": formulation.B,
            },
        }

        # Export artifacts
        exporter = BenchmarkExporter(self.output_dir)
        export_summary = exporter.export_all(scenario_results, metrics, raw_scenarios_data, qaoa_params)

        return {
            "metrics": metrics,
            "export_summary": export_summary,
        }
