import uuid
from typing import Tuple, Dict, Any, Optional
from datetime import datetime, timezone
from qpsi_engine.domain.command import Command
from qpsi_engine.domain.event import Event
from qpsi_engine.domain.world_state import WorldState
from qpsi_engine.application.validator import CommandValidator, ValidationResult
from qpsi_engine.application.observation_engine import ObservationEngine
from qpsi_engine.application.belief_engine import BeliefEngine


class CommandHandler:
    @staticmethod
    def handle_command(
        command: Command,
        state: WorldState,
        last_event_hash: str = "0" * 64
    ) -> Tuple[ValidationResult, Optional[Event]]:
        # 1. Validate Command
        val_result = CommandValidator.validate(command, state)
        if not val_result.valid:
            # Failed command produces a ValidationResult but NO canonical event commit!
            return val_result, None

        # 2. Determine Observers
        observers = ObservationEngine.get_observers(command, state)

        # 3. Compute State Mutation & Apply to Canonical State
        prev_state_summary: Dict[str, Any] = {}
        res_state_summary: Dict[str, Any] = {}

        state.sequence_number += 1
        actor = state.characters[command.actor_id]

        if command.command_type == "move_object":
            target_id = command.target_id
            assert target_id is not None
            obj = state.objects[target_id]

            prev_state_summary = {
                "object_id": target_id,
                "location_id": obj.location_id,
                "container_surface": obj.container_surface,
            }

            dest_surface = command.destination_location or command.parameters.get("destination_surface", "table")
            obj.container_surface = dest_surface

            res_state_summary = {
                "object_id": target_id,
                "location_id": obj.location_id,
                "container_surface": obj.container_surface,
            }

        elif command.command_type == "pick_up_object":
            target_id = command.target_id
            assert target_id is not None
            obj = state.objects[target_id]

            prev_state_summary = {
                "object_id": target_id,
                "location_id": obj.location_id,
                "container_surface": obj.container_surface,
            }

            obj.location_id = actor.id
            obj.container_surface = "inventory"
            if target_id not in actor.inventory:
                actor.inventory.append(target_id)

            res_state_summary = {
                "object_id": target_id,
                "location_id": obj.location_id,
                "container_surface": obj.container_surface,
                "actor_inventory": list(actor.inventory),
            }

        elif command.command_type == "put_down_object":
            target_id = command.target_id
            assert target_id is not None
            obj = state.objects[target_id]

            prev_state_summary = {
                "object_id": target_id,
                "location_id": obj.location_id,
                "container_surface": obj.container_surface,
            }

            if target_id in actor.inventory:
                actor.inventory.remove(target_id)
            obj.location_id = actor.location_id
            obj.container_surface = command.destination_location or "table"

            res_state_summary = {
                "object_id": target_id,
                "location_id": obj.location_id,
                "container_surface": obj.container_surface,
            }

        elif command.command_type == "enter_room":
            target_room = command.destination_location or command.target_id
            assert target_room is not None

            prev_state_summary = {
                "actor_id": actor.id,
                "location_id": actor.location_id,
            }

            actor.location_id = target_room

            res_state_summary = {
                "actor_id": actor.id,
                "location_id": actor.location_id,
            }

        elif command.command_type == "leave_room":
            dest_room = command.destination_location or "hallway"

            prev_state_summary = {
                "actor_id": actor.id,
                "location_id": actor.location_id,
            }

            actor.location_id = dest_room

            res_state_summary = {
                "actor_id": actor.id,
                "location_id": actor.location_id,
            }

        elif command.command_type == "inspect_object":
            target_id = command.target_id
            assert target_id is not None
            obj = state.objects[target_id]
            prev_state_summary = {"inspected": False}
            res_state_summary = {
                "inspected": True,
                "object_id": target_id,
                "container_surface": obj.container_surface,
                "location_id": obj.location_id,
            }

        elif command.command_type == "speak":
            prev_state_summary = {}
            res_state_summary = {"dialogue": command.parameters.get("dialogue", "")}

        elif command.command_type == "update_relationship":
            prev_state_summary = {}
            res_state_summary = command.parameters

        # 4. Construct & Finalize SHA-256 Event
        event = Event(
            event_id=f"evt-{uuid.uuid4().hex[:8]}",
            world_id=state.world_id,
            sequence_number=state.sequence_number,
            timestamp=datetime.now(timezone.utc).isoformat(),
            actor_id=command.actor_id,
            event_type=command.command_type,
            target_id=command.target_id,
            previous_state=prev_state_summary,
            resulting_state=res_state_summary,
            observer_ids=observers,
            source=command.source,
            command_id=command.command_id,
            validation_result=val_result.to_dict(),
            previous_event_hash=last_event_hash,
        )
        event.finalize()

        # 5. Update Subjective Beliefs for Observers
        BeliefEngine.update_beliefs_from_event(event, state)

        return val_result, event
