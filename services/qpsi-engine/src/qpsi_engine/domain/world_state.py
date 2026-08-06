import hashlib
import json
from dataclasses import dataclass, field
from typing import Dict, Any, List
from qpsi_engine.domain.character import Character
from qpsi_engine.domain.room import Room
from qpsi_engine.domain.world_object import WorldObject
from qpsi_engine.domain.belief import Belief
from qpsi_engine.domain.relationship import Relationship


@dataclass
class WorldState:
    world_id: str
    sequence_number: int = 0
    characters: Dict[str, Character] = field(default_factory=dict)
    rooms: Dict[str, Room] = field(default_factory=dict)
    objects: Dict[str, WorldObject] = field(default_factory=dict)
    beliefs: List[Belief] = field(default_factory=list)
    relationships: List[Relationship] = field(default_factory=list)

    def calculate_digest(self) -> str:
        """Calculates deterministic SHA-256 state digest across all canonical entities."""
        canonical_representation = {
            "world_id": self.world_id,
            "sequence_number": self.sequence_number,
            "characters": {cid: c.to_dict() for cid, c in sorted(self.characters.items())},
            "rooms": {rid: r.to_dict() for rid, r in sorted(self.rooms.items())},
            "objects": {oid: o.to_dict() for oid, o in sorted(self.objects.items())},
            "relationships": sorted(
                [rel.to_dict() for rel in self.relationships],
                key=lambda x: (x["actor_id"], x["target_character_id"]),
            ),
        }
        serialized = json.dumps(canonical_representation, sort_keys=True, ensure_ascii=True)
        return hashlib.sha256(serialized.encode("utf-8")).hexdigest()

    def get_character_belief(self, character_id: str, entity_id: str, property_name: str) -> Any:
        for b in reversed(self.beliefs):
            if b.character_id == character_id and b.entity_id == entity_id and b.property_name == property_name:
                return b.believed_value
        return None

    def set_character_belief(self, character_id: str, entity_id: str, property_name: str, value: Any) -> None:
        # Remove old belief for same triple if exists
        self.beliefs = [
            b for b in self.beliefs
            if not (b.character_id == character_id and b.entity_id == entity_id and b.property_name == property_name)
        ]
        self.beliefs.append(
            Belief(
                character_id=character_id,
                entity_id=entity_id,
                property_name=property_name,
                believed_value=value,
                updated_at_step=self.sequence_number,
            )
        )

    def to_dict(self) -> Dict[str, Any]:
        return {
            "world_id": self.world_id,
            "sequence_number": self.sequence_number,
            "characters": {cid: c.to_dict() for cid, c in self.characters.items()},
            "rooms": {rid: r.to_dict() for rid, r in self.rooms.items()},
            "objects": {oid: o.to_dict() for oid, o in self.objects.items()},
            "beliefs": [b.to_dict() for b in self.beliefs],
            "relationships": [r.to_dict() for r in self.relationships],
            "state_digest": self.calculate_digest(),
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "WorldState":
        characters = {cid: Character.from_dict(cdata) for cid, cdata in data.get("characters", {}).items()}
        rooms = {rid: Room.from_dict(rdata) for rid, rdata in data.get("rooms", {}).items()}
        objects = {oid: WorldObject.from_dict(odata) for oid, odata in data.get("objects", {}).items()}
        beliefs = [Belief.from_dict(bdata) for bdata in data.get("beliefs", [])]
        relationships = [Relationship.from_dict(rdata) for rdata in data.get("relationships", [])]
        return cls(
            world_id=data["world_id"],
            sequence_number=data.get("sequence_number", 0),
            characters=characters,
            rooms=rooms,
            objects=objects,
            beliefs=beliefs,
            relationships=relationships,
        )
