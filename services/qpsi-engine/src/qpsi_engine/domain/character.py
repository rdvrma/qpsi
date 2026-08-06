from dataclasses import dataclass, field
from typing import Dict, Any


@dataclass
class Character:
    id: str
    name: str
    location_id: str
    inventory: list[str] = field(default_factory=list)
    attributes: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "location_id": self.location_id,
            "inventory": list(self.inventory),
            "attributes": dict(self.attributes),
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Character":
        return cls(
            id=data["id"],
            name=data["name"],
            location_id=data["location_id"],
            inventory=list(data.get("inventory", [])),
            attributes=dict(data.get("attributes", {})),
        )
