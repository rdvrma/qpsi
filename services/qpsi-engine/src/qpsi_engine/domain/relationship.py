from dataclasses import dataclass, field
from typing import Dict, Any, List


@dataclass
class Relationship:
    actor_id: str
    target_character_id: str
    trust_score: float = 0.5
    grievance_score: float = 0.0
    shared_secrets: List[str] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "actor_id": self.actor_id,
            "target_character_id": self.target_character_id,
            "trust_score": self.trust_score,
            "grievance_score": self.grievance_score,
            "shared_secrets": list(self.shared_secrets),
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Relationship":
        return cls(
            actor_id=data["actor_id"],
            target_character_id=data["target_character_id"],
            trust_score=data.get("trust_score", 0.5),
            grievance_score=data.get("grievance_score", 0.0),
            shared_secrets=list(data.get("shared_secrets", [])),
        )
