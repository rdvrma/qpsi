import sys
import uuid
from pathlib import Path
from typing import Dict, Any

# Locate root directory containing services/qpsi-engine/src
current_file = Path(__file__).resolve()
repo_root = current_file
for p in current_file.parents:
    if (p / "services" / "qpsi-engine" / "src").exists():
        repo_root = p
        break

engine_src = repo_root / "services" / "qpsi-engine" / "src"
if str(engine_src) not in sys.path:
    sys.path.insert(0, str(engine_src))

from qpsi_engine.domain.world_state import WorldState
from qpsi_engine.domain.character import Character
from qpsi_engine.domain.room import Room
from qpsi_engine.domain.world_object import WorldObject
from qpsi_engine.domain.command import Command
from qpsi_engine.application.validator import CommandValidator

class ValidatorAdapter:
    """Adapter bridging research candidate actions to authoritative M1 Q-Psi classical validator."""

    def validate_action(
        self,
        world_state_dict: Dict[str, Any],
        actor_id: str,
        command_type: str,
        target_id: str | None = None,
        source_location: str | None = None,
        destination_location: str | None = None,
        parameters: Dict[str, Any] | None = None,
    ) -> Dict[str, Any]:
        # Build WorldState directly from world_state_dict
        characters: Dict[str, Character] = {}
        for cid, cdata in world_state_dict.get("characters", {}).items():
            characters[cid] = Character(
                id=cdata["id"],
                name=cdata["name"],
                location_id=cdata["location_id"],
                inventory=list(cdata.get("inventory", [])),
            )

        objects: Dict[str, WorldObject] = {}
        for oid, odata in world_state_dict.get("objects", {}).items():
            objects[oid] = WorldObject(
                id=odata["id"],
                name=odata["name"],
                location_id=odata["location_id"],
                container_surface=odata["container_surface"],
            )

        rooms = {
            "main_room": Room(id="main_room", name="Main Lounge", connected_room_ids=["hallway"]),
            "hallway": Room(id="hallway", name="Connecting Hallway", connected_room_ids=["main_room"]),
        }

        world_state = WorldState(
            world_id="w_research",
            sequence_number=world_state_dict.get("sequence_number", 1),
            characters=characters,
            rooms=rooms,
            objects=objects,
        )

        cmd = Command(
            command_id=f"cmd_{uuid.uuid4().hex[:8]}",
            world_id="w_research",
            actor_id=actor_id,
            command_type=command_type,
            target_id=target_id,
            source_location=source_location,
            destination_location=destination_location,
            parameters=parameters or {},
        )

        res = CommandValidator.validate(cmd, world_state)

        return {
            "valid": res.valid,
            "code": res.code,
            "error_message": res.error_message,
        }
