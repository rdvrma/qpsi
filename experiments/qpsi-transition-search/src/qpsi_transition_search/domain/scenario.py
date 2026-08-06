from dataclasses import dataclass
from typing import List, Dict, Any
from qpsi_transition_search.domain.candidate import CandidateAction

@dataclass
class ResearchScenario:
    scenario_id: str
    title: str
    description: str
    initial_world_state: Dict[str, Any]
    candidates: List[CandidateAction]  # Must contain exactly 8 candidates (C0..C7)

    def __post_init__(self) -> None:
        if len(self.candidates) != 8:
            raise ValueError(f"Scenario {self.scenario_id} must have exactly 8 candidates, got {len(self.candidates)}")
