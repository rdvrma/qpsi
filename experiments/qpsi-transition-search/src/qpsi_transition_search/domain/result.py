from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional

@dataclass
class ScenarioResult:
    scenario_id: str
    initial_digest: str
    candidates_count: int
    valid_candidates_count: int
    exhaustive_optimum_id: str
    exhaustive_optimum_utility: float
    
    uniform_random_selected_id: str
    uniform_random_valid: bool
    uniform_random_utility: float
    
    valid_random_selected_id: str
    valid_random_utility: float
    
    qaoa_p1_selected_id: Optional[str]
    qaoa_p1_valid: bool
    qaoa_p1_utility: float
    qaoa_p1_matches_optimum: bool
    qaoa_p1_exactly_one_rate: float
    qaoa_p1_invalid_rate: float
    
    qaoa_p2_selected_id: Optional[str]
    qaoa_p2_valid: bool
    qaoa_p2_utility: float
    qaoa_p2_matches_optimum: bool
    qaoa_p2_exactly_one_rate: float
    qaoa_p2_invalid_rate: float

@dataclass
class MetricSummary:
    total_scenarios: int
    classical_pass_rate_p1: float
    classical_pass_rate_p2: float
    exact_optimum_agreement_p1: float
    exact_optimum_agreement_p2: float
    mean_utility_regret_p1: float
    mean_utility_regret_p2: float
    invalid_selection_rate_p1: float
    invalid_selection_rate_p2: float
    exactly_one_bitstring_rate_p1: float
    exactly_one_bitstring_rate_p2: float
    execution_time_seconds: float
