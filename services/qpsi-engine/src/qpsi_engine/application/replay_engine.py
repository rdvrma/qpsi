from typing import List, Tuple
from qpsi_engine.domain.event import Event
from qpsi_engine.domain.world_state import WorldState
from qpsi_engine.application.belief_engine import BeliefEngine


class ReplayEngine:
    @staticmethod
    def replay_events(initial_seed_state: WorldState, events: List[Event]) -> WorldState:
        """Reconstructs full WorldState from scratch by replaying the append-only event ledger."""
        # Create a fresh clone of initial seed state
        reconstructed = WorldState.from_dict(initial_seed_state.to_dict())

        # Sort events by sequence number
        sorted_events = sorted(events, key=lambda e: e.sequence_number)

        for event in sorted_events:
            if not event.validation_result.get("valid", False):
                continue

            reconstructed.sequence_number = event.sequence_number
            actor = reconstructed.characters.get(event.actor_id)
            res_state = event.resulting_state

            if event.event_type == "move_object" and event.target_id:
                obj = reconstructed.objects.get(event.target_id)
                if obj and "container_surface" in res_state:
                    obj.container_surface = res_state["container_surface"]

            elif event.event_type == "pick_up_object" and event.target_id and actor:
                obj = reconstructed.objects.get(event.target_id)
                if obj:
                    obj.location_id = actor.id
                    obj.container_surface = "inventory"
                    if event.target_id not in actor.inventory:
                        actor.inventory.append(event.target_id)

            elif event.event_type == "put_down_object" and event.target_id and actor:
                obj = reconstructed.objects.get(event.target_id)
                if obj:
                    if event.target_id in actor.inventory:
                        actor.inventory.remove(event.target_id)
                    obj.location_id = actor.location_id
                    obj.container_surface = res_state.get("container_surface", "table")

            elif event.event_type in ["enter_room", "leave_room"] and actor:
                if "location_id" in res_state:
                    actor.location_id = res_state["location_id"]

            # Update observer beliefs for replayed event
            BeliefEngine.update_beliefs_from_event(event, reconstructed)

        return reconstructed

    @staticmethod
    def verify_integrity(events: List[Event]) -> Tuple[bool, List[str]]:
        """Verifies sequence numbers, previous hashes, and SHA-256 event hashes across the ledger."""
        errors: List[str] = []
        if not events:
            return True, []

        sorted_events = sorted(events, key=lambda e: e.sequence_number)

        for idx, evt in enumerate(sorted_events):
            # Check sequence sequence
            if idx > 0 and evt.sequence_number != sorted_events[idx - 1].sequence_number + 1:
                errors.append(
                    f"Sequence gap at index {idx}: expected sequence {sorted_events[idx - 1].sequence_number + 1}, got {evt.sequence_number}"
                )

            # Check previous event hash match
            if idx > 0 and evt.previous_event_hash != sorted_events[idx - 1].event_hash:
                errors.append(
                    f"Previous hash mismatch at sequence #{evt.sequence_number}: expected {sorted_events[idx - 1].event_hash[:10]}..., got {evt.previous_event_hash[:10]}..."
                )

            # Check self hash calculation match
            calculated_hash = evt.calculate_hash()
            if evt.event_hash != calculated_hash:
                errors.append(
                    f"Event hash mismatch at sequence #{evt.sequence_number}: stored {evt.event_hash[:10]}..., calculated {calculated_hash[:10]}..."
                )

        return len(errors) == 0, errors
