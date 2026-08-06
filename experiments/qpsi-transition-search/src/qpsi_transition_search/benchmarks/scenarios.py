from typing import List, Dict, Any
from qpsi_transition_search.domain.candidate import CandidateAction
from qpsi_transition_search.domain.scenario import ResearchScenario

class BenchmarkScenarioGenerator:
    """Generates 20+ deterministic synthetic research scenarios."""

    @staticmethod
    def generate_all_scenarios() -> List[ResearchScenario]:
        scenarios: List[ResearchScenario] = []

        for s_idx in range(1, 21):
            s_id = f"scenario_{s_idx:02d}"
            
            # Seed state variations
            marcus_loc = "main_room" if s_idx % 2 != 0 else "hallway"
            elena_loc = "main_room" if s_idx % 3 != 0 else "hallway"
            book_surface = "table" if s_idx % 4 != 0 else "shelf"

            initial_state = {
                "sequence_number": s_idx,
                "characters": {
                    "marcus": {"id": "marcus", "name": "Marcus", "location_id": marcus_loc, "inventory": []},
                    "elena": {"id": "elena", "name": "Elena", "location_id": elena_loc, "inventory": []},
                },
                "objects": {
                    "book": {"id": "book", "name": "Ancient Codex", "location_id": "main_room", "container_surface": book_surface},
                    "key": {"id": "key", "name": "Brass Key", "location_id": "main_room", "container_surface": "desk"},
                    "glass": {"id": "glass", "name": "Water Glass", "location_id": "main_room", "container_surface": "table"},
                },
                "beliefs": {
                    "marcus": {"book": {"target_id": "book", "believed_location": book_surface, "last_observed_sequence": s_idx}},
                    "elena": {"book": {"target_id": "book", "believed_location": "shelf", "last_observed_sequence": 1}},
                },
            }

            # Exactly 8 candidates C0..C7
            candidates = [
                CandidateAction(
                    candidate_id="C0",
                    actor_id="marcus",
                    command_type="move_object",
                    target_id="key",
                    source_location="desk",
                    destination_location="table",
                    parameters={"novelty": 0.8, "relationship": 0.2, "info_gain": 0.5, "repetition_penalty": 0.0},
                    description="Marcus moves key from desk to table",
                ),
                CandidateAction(
                    candidate_id="C1",  # Invalid (contradiction)
                    actor_id="marcus",
                    command_type="pick_up_object",
                    target_id="book",
                    source_location="shelf" if book_surface == "table" else "desk",
                    parameters={"novelty": 0.9, "relationship": 0.1, "info_gain": 0.2, "repetition_penalty": 0.0},
                    description="Marcus attempts to pick up book from incorrect location",
                ),
                CandidateAction(
                    candidate_id="C2",
                    actor_id="elena",
                    command_type="inspect_object",
                    target_id="book",
                    parameters={"novelty": 0.7, "relationship": 0.6, "info_gain": 0.8, "repetition_penalty": 0.1},
                    description="Elena inspects book",
                ),
                CandidateAction(
                    candidate_id="C3",
                    actor_id="elena",
                    command_type="leave_room",
                    source_location=elena_loc,
                    destination_location="hallway" if elena_loc == "main_room" else "garden",
                    parameters={"novelty": 0.4, "relationship": 0.1, "info_gain": 0.1, "repetition_penalty": 0.0},
                    description="Elena leaves room",
                ),
                CandidateAction(
                    candidate_id="C4",  # Invalid (possession constraint)
                    actor_id="marcus",
                    command_type="give_object",
                    target_id="key",
                    parameters={"novelty": 0.95, "relationship": 0.9, "info_gain": 0.3, "repetition_penalty": 0.0},
                    description="Marcus gives key without possessing it",
                ),
                CandidateAction(
                    candidate_id="C5",
                    actor_id="marcus",
                    command_type="speak",
                    parameters={"novelty": 0.6, "relationship": 0.7, "info_gain": 0.6, "repetition_penalty": 0.0},
                    description="Marcus speaks to Elena about the key",
                ),
                CandidateAction(
                    candidate_id="C6",  # Invalid (entity does not exist)
                    actor_id="elena",
                    command_type="move_object",
                    target_id="nonexistent_item",
                    parameters={"novelty": 1.0, "relationship": 0.0, "info_gain": 0.0, "repetition_penalty": 0.0},
                    description="Elena moves non-existent entity",
                ),
                CandidateAction(
                    candidate_id="C7",  # Valid but repetition penalty
                    actor_id="marcus",
                    command_type="inspect_object",
                    target_id="glass",
                    parameters={"novelty": 0.2, "relationship": 0.1, "info_gain": 0.1, "repetition_penalty": 0.5},
                    description="Marcus repeats inspection of glass",
                ),
            ]

            scenarios.append(
                ResearchScenario(
                    scenario_id=s_id,
                    title=f"Synthetic Research Scenario #{s_idx:02d}",
                    description=f"Bounded 2-character transition selection scenario #{s_idx}",
                    initial_world_state=initial_state,
                    candidates=candidates,
                )
            )

        return scenarios
