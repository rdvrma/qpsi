from dataclasses import dataclass, field
from typing import Dict, Any


@dataclass
class WorldObject:
    id: str
    name: str
    location_id: str  # room_id, character_id, or parent_object_id
    container_surface: str = "shelf"  # e.g., "shelf", "desk", "table", "inventory"
    properties: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "location_id": self.location_id,
            "container_surface": self.container_surface,
            "properties": dict(self.properties),
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "WorldObject":
        return cls(
            id=data["id"],
            name=data["name"],
            location_id=data["location_id"],
            container_surface=data.get("container_surface", "shelf"),
            properties=dict(data.get("properties", {})),
        )
