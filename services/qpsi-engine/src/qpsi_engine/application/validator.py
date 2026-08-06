from dataclasses import dataclass
from typing import Optional, Dict, Any
from qpsi_engine.domain.command import Command
from qpsi_engine.domain.world_state import WorldState


@dataclass
class ValidationResult:
    valid: bool
    code: str
    error_message: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "valid": self.valid,
            "code": self.code,
            "error_message": self.error_message,
        }


class CommandValidator:
    @staticmethod
    def validate(command: Command, state: WorldState) -> ValidationResult:
        # 1. Actor Existence Check
        if command.actor_id not in state.characters:
            return ValidationResult(
                valid=False,
                code="ACTOR_NOT_FOUND",
                error_message=f"Actor '{command.actor_id}' does not exist in world state.",
            )

        actor = state.characters[command.actor_id]

        # 2. Command specific validations
        if command.command_type == "move_object":
            return CommandValidator._validate_move_object(command, state, actor)
        elif command.command_type == "pick_up_object":
            return CommandValidator._validate_pick_up_object(command, state, actor)
        elif command.command_type == "put_down_object":
            return CommandValidator._validate_put_down_object(command, state, actor)
        elif command.command_type == "enter_room":
            return CommandValidator._validate_enter_room(command, state, actor)
        elif command.command_type == "leave_room":
            return CommandValidator._validate_leave_room(command, state, actor)
        elif command.command_type == "inspect_object":
            return CommandValidator._validate_inspect_object(command, state, actor)
        elif command.command_type == "speak":
            return CommandValidator._validate_speak(command, state, actor)
        elif command.command_type == "update_relationship":
            return CommandValidator._validate_update_relationship(command, state, actor)
        else:
            return ValidationResult(
                valid=False,
                code="UNKNOWN_COMMAND_TYPE",
                error_message=f"Command type '{command.command_type}' is not supported.",
            )

    @staticmethod
    def _validate_move_object(command: Command, state: WorldState, actor: Any) -> ValidationResult:
        target_id = command.target_id
        if not target_id or target_id not in state.objects:
            return ValidationResult(
                valid=False,
                code="OBJECT_NOT_FOUND",
                error_message=f"Target object '{target_id}' does not exist.",
            )

        obj = state.objects[target_id]

        # Target object must be in actor's current room
        if obj.location_id != actor.location_id:
            return ValidationResult(
                valid=False,
                code="OBJECT_NOT_IN_ROOM",
                error_message=f"Object '{obj.name}' is at location '{obj.location_id}', not in actor's room '{actor.location_id}'.",
            )

        # Expected source location check if provided (Contradiction check)
        if command.source_location and obj.container_surface != command.source_location:
            return ValidationResult(
                valid=False,
                code="STATE_CONTRADICTION",
                error_message=f"Contradiction: Object '{obj.name}' is on '{obj.container_surface}', but command expected source '{command.source_location}'.",
            )

        destination = command.destination_location or command.parameters.get("destination_surface")
        if not destination:
            return ValidationResult(
                valid=False,
                code="MISSING_DESTINATION",
                error_message="Destination surface location is required for move_object.",
            )

        return ValidationResult(valid=True, code="OK")

    @staticmethod
    def _validate_pick_up_object(command: Command, state: WorldState, actor: Any) -> ValidationResult:
        target_id = command.target_id
        if not target_id or target_id not in state.objects:
            return ValidationResult(
                valid=False,
                code="OBJECT_NOT_FOUND",
                error_message=f"Target object '{target_id}' does not exist.",
            )

        obj = state.objects[target_id]
        if obj.location_id != actor.location_id:
            return ValidationResult(
                valid=False,
                code="OBJECT_NOT_IN_ROOM",
                error_message=f"Object '{obj.name}' is not in room '{actor.location_id}'.",
            )

        if command.source_location and obj.container_surface != command.source_location:
            return ValidationResult(
                valid=False,
                code="STATE_CONTRADICTION",
                error_message=f"Contradiction: Object '{obj.name}' is on '{obj.container_surface}', but expected '{command.source_location}'.",
            )

        return ValidationResult(valid=True, code="OK")

    @staticmethod
    def _validate_put_down_object(command: Command, state: WorldState, actor: Any) -> ValidationResult:
        target_id = command.target_id
        if not target_id or target_id not in actor.inventory:
            return ValidationResult(
                valid=False,
                code="OBJECT_NOT_IN_INVENTORY",
                error_message=f"Actor '{actor.name}' does not possess object '{target_id}'.",
            )
        return ValidationResult(valid=True, code="OK")

    @staticmethod
    def _validate_enter_room(command: Command, state: WorldState, actor: Any) -> ValidationResult:
        target_room_id = command.destination_location or command.target_id
        if not target_room_id or target_room_id not in state.rooms:
            return ValidationResult(
                valid=False,
                code="ROOM_NOT_FOUND",
                error_message=f"Target room '{target_room_id}' does not exist.",
            )
        if actor.location_id == target_room_id:
            return ValidationResult(
                valid=False,
                code="ALREADY_IN_ROOM",
                error_message=f"Actor is already in room '{target_room_id}'.",
            )
        return ValidationResult(valid=True, code="OK")

    @staticmethod
    def _validate_leave_room(command: Command, state: WorldState, actor: Any) -> ValidationResult:
        source_room_id = command.source_location or command.target_id
        if source_room_id and actor.location_id != source_room_id:
            return ValidationResult(
                valid=False,
                code="STATE_CONTRADICTION",
                error_message=f"Actor is in room '{actor.location_id}', not '{source_room_id}'.",
            )
        dest_room_id = command.destination_location
        if dest_room_id and dest_room_id not in state.rooms:
            return ValidationResult(
                valid=False,
                code="ROOM_NOT_FOUND",
                error_message=f"Destination room '{dest_room_id}' does not exist.",
            )
        return ValidationResult(valid=True, code="OK")

    @staticmethod
    def _validate_inspect_object(command: Command, state: WorldState, actor: Any) -> ValidationResult:
        target_id = command.target_id
        if not target_id or target_id not in state.objects:
            return ValidationResult(
                valid=False,
                code="OBJECT_NOT_FOUND",
                error_message=f"Object '{target_id}' not found.",
            )
        obj = state.objects[target_id]
        if obj.location_id != actor.location_id and obj.location_id != actor.id:
            return ValidationResult(
                valid=False,
                code="OBJECT_NOT_ACCESSIBLE",
                error_message=f"Object '{obj.name}' is not accessible in actor's location.",
            )
        return ValidationResult(valid=True, code="OK")

    @staticmethod
    def _validate_speak(command: Command, state: WorldState, actor: Any) -> ValidationResult:
        return ValidationResult(valid=True, code="OK")

    @staticmethod
    def _validate_update_relationship(command: Command, state: WorldState, actor: Any) -> ValidationResult:
        target_id = command.target_id
        if not target_id or target_id not in state.characters:
            return ValidationResult(
                valid=False,
                code="TARGET_CHARACTER_NOT_FOUND",
                error_message=f"Target character '{target_id}' does not exist.",
            )
        return ValidationResult(valid=True, code="OK")
