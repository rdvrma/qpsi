import hashlib
import json
from dataclasses import dataclass
from typing import Dict, Any, List, Optional


@dataclass
class Event:
    event_id: str
    world_id: str
    sequence_number: int
    timestamp: str
    actor_id: str
    event_type: str
    target_id: Optional[str]
    previous_state: Dict[str, Any]
    resulting_state: Dict[str, Any]
    observer_ids: List[str]
    source: str
    command_id: str
    validation_result: Dict[str, Any]
    parent_event_id: Optional[str] = None
    previous_event_hash: str = "0000000000000000000000000000000000000000000000000000000000000000"
    event_hash: str = ""

    def calculate_hash(self) -> str:
        """Calculates deterministic SHA-256 hash over canonical serialized event payload."""
        payload = {
            "event_id": self.event_id,
            "world_id": self.world_id,
            "sequence_number": self.sequence_number,
            "timestamp": self.timestamp,
            "actor_id": self.actor_id,
            "event_type": self.event_type,
            "target_id": self.target_id,
            "previous_state": self.previous_state,
            "resulting_state": self.resulting_state,
            "observer_ids": sorted(self.observer_ids),
            "source": self.source,
            "command_id": self.command_id,
            "validation_result": self.validation_result,
            "parent_event_id": self.parent_event_id,
            "previous_event_hash": self.previous_event_hash,
        }
        serialized = json.dumps(payload, sort_keys=True, ensure_ascii=True)
        return hashlib.sha256(serialized.encode("utf-8")).hexdigest()

    def finalize(self) -> "Event":
        """Computes and assigns event_hash if not set."""
        if not self.event_hash:
            self.event_hash = self.calculate_hash()
        return self

    def to_dict(self) -> Dict[str, Any]:
        return {
            "event_id": self.event_id,
            "world_id": self.world_id,
            "sequence_number": self.sequence_number,
            "timestamp": self.timestamp,
            "actor_id": self.actor_id,
            "event_type": self.event_type,
            "target_id": self.target_id,
            "previous_state": self.previous_state,
            "resulting_state": self.resulting_state,
            "observer_ids": list(self.observer_ids),
            "source": self.source,
            "command_id": self.command_id,
            "validation_result": self.validation_result,
            "parent_event_id": self.parent_event_id,
            "previous_event_hash": self.previous_event_hash,
            "event_hash": self.event_hash,
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Event":
        evt = cls(
            event_id=data["event_id"],
            world_id=data["world_id"],
            sequence_number=data["sequence_number"],
            timestamp=data["timestamp"],
            actor_id=data["actor_id"],
            event_type=data["event_type"],
            target_id=data.get("target_id"),
            previous_state=dict(data.get("previous_state", {})),
            resulting_state=dict(data.get("resulting_state", {})),
            observer_ids=list(data.get("observer_ids", [])),
            source=data.get("source", "system"),
            command_id=data.get("command_id", ""),
            validation_result=dict(data.get("validation_result", {"valid": True})),
            parent_event_id=data.get("parent_event_id"),
            previous_event_hash=data.get("previous_event_hash", "0" * 64),
            event_hash=data.get("event_hash", ""),
        )
        if not evt.event_hash:
            evt.finalize()
        return evt
