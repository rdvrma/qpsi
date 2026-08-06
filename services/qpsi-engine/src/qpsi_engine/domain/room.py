from dataclasses import dataclass, field
from typing import Dict, Any, List


@dataclass
class Room:
    id: str
    name: str
    connected_room_ids: List[str] = field(default_factory=list)
    properties: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "connected_room_ids": list(self.connected_room_ids),
            "properties": dict(self.properties),
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Room":
        return cls(
            id=data["id"],
            name=data["name"],
            connected_room_ids=list(data.get("connected_room_ids", [])),
            properties=dict(data.get("properties", {})),
        )
