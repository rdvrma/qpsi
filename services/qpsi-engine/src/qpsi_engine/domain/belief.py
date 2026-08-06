from dataclasses import dataclass
from typing import Dict, Any


@dataclass
class Belief:
    character_id: str
    entity_id: str
    property_name: str
    believed_value: Any
    updated_at_step: int = 0
    confidence: float = 1.0

    def to_dict(self) -> Dict[str, Any]:
        return {
            "character_id": self.character_id,
            "entity_id": self.entity_id,
            "property_name": self.property_name,
            "believed_value": self.believed_value,
            "updated_at_step": self.updated_at_step,
            "confidence": self.confidence,
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Belief":
        return cls(
            character_id=data["character_id"],
            entity_id=data["entity_id"],
            property_name=data["property_name"],
            believed_value=data["believed_value"],
            updated_at_step=data.get("updated_at_step", 0),
            confidence=data.get("confidence", 1.0),
        )
