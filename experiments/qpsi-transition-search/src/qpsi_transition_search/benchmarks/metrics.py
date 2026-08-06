import numpy as np
from typing import List, Dict, Any
from qpsi_transition_search.domain.result import ScenarioResult, MetricSummary

class MetricAggregator:
    """Aggregates primary scientific benchmark metrics across scenarios."""

    @staticmethod
    def aggregate(scenario_results: List[ScenarioResult], total_time: float) -> MetricSummary:
        n = len(scenario_results)
        if n == 0:
            return MetricSummary(
                total_scenarios=0,
                classical_pass_rate_p1=0.0,
                classical_pass_rate_p2=0.0,
                exact_optimum_agreement_p1=0.0,
                exact_optimum_agreement_p2=0.0,
                mean_utility_regret_p1=0.0,
                mean_utility_regret_p2=0.0,
                invalid_selection_rate_p1=0.0,
                invalid_selection_rate_p2=0.0,
                exactly_one_bitstring_rate_p1=0.0,
                exactly_one_bitstring_rate_p2=0.0,
                execution_time_seconds=0.0,
            )

        pass_p1 = sum(1 for r in scenario_results if r.qaoa_p1_valid) / n
        pass_p2 = sum(1 for r in scenario_results if r.qaoa_p2_valid) / n

        agree_p1 = sum(1 for r in scenario_results if r.qaoa_p1_matches_optimum) / n
        agree_p2 = sum(1 for r in scenario_results if r.qaoa_p2_matches_optimum) / n

        regret_p1 = sum(max(0.0, r.exhaustive_optimum_utility - r.qaoa_p1_utility) for r in scenario_results) / n
        regret_p2 = sum(max(0.0, r.exhaustive_optimum_utility - r.qaoa_p2_utility) for r in scenario_results) / n

        invalid_p1 = sum(r.qaoa_p1_invalid_rate for r in scenario_results) / n
        invalid_p2 = sum(r.qaoa_p2_invalid_rate for r in scenario_results) / n

        one_p1 = sum(r.qaoa_p1_exactly_one_rate for r in scenario_results) / n
        one_p2 = sum(r.qaoa_p2_exactly_one_rate for r in scenario_results) / n

        return MetricSummary(
            total_scenarios=n,
            classical_pass_rate_p1=round(pass_p1, 4),
            classical_pass_rate_p2=round(pass_p2, 4),
            exact_optimum_agreement_p1=round(agree_p1, 4),
            exact_optimum_agreement_p2=round(agree_p2, 4),
            mean_utility_regret_p1=round(regret_p1, 4),
            mean_utility_regret_p2=round(regret_p2, 4),
            invalid_selection_rate_p1=round(invalid_p1, 4),
            invalid_selection_rate_p2=round(invalid_p2, 4),
            exactly_one_bitstring_rate_p1=round(one_p1, 4),
            exactly_one_bitstring_rate_p2=round(one_p2, 4),
            execution_time_seconds=round(total_time, 4),
        )
