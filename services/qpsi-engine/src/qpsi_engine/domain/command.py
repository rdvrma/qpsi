from dataclasses import dataclass, field
from typing import Dict, Any, Optional
from datetime import datetime, timezone


@dataclass
class Command:
    command_id: str
    world_id: str
    actor_id: str
    command_type: str  # move_object, pick_up_object, put_down_object, enter_room, leave_room, inspect_object, speak, update_relationship
    target_id: Optional[str] = None
    source_location: Optional[str] = None
    destination_location: Optional[str] = None
    parameters: Dict[str, Any] = field(default_factory=dict)
    timestamp: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    source: str = "api"
    expected_state: Optional[Dict[str, Any]] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "command_id": self.command_id,
            "world_id": self.world_id,
            "actor_id": self.actor_id,
            "command_type": self.command_type,
            "target_id": self.target_id,
            "source_location": self.source_location,
            "destination_location": self.destination_location,
            "parameters": dict(self.parameters),
            "timestamp": self.timestamp,
            "source": self.source,
            "expected_state": self.expected_state,
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Command":
        return cls(
            command_id=data["command_id"],
            world_id=data["world_id"],
            actor_id=data["actor_id"],
            command_type=data["command_type"],
            target_id=data.get("target_id"),
            source_location=data.get("source_location"),
            destination_location=data.get("destination_location"),
            parameters=dict(data.get("parameters", {})),
            timestamp=data.get("timestamp", datetime.now(timezone.utc).isoformat()),
            source=data.get("source", "api"),
            expected_state=data.get("expected_state"),
        )
