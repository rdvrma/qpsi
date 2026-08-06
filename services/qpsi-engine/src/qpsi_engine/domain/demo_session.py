import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone, timedelta
from typing import Dict, Any


@dataclass
class DemoSession:
    session_id: str
    world_id: str
    created_at: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    last_accessed_at: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

    def is_expired(self, ttl_minutes: int = 60) -> bool:
        created = datetime.fromisoformat(self.created_at)
        now = datetime.now(timezone.utc)
        return (now - created) > timedelta(minutes=ttl_minutes)

    def touch(self) -> None:
        self.last_accessed_at = datetime.now(timezone.utc).isoformat()

    def to_dict(self) -> Dict[str, Any]:
        return {
            "session_id": self.session_id,
            "world_id": self.world_id,
            "created_at": self.created_at,
            "last_accessed_at": self.last_accessed_at,
        }

    @classmethod
    def create_new(cls, prefix: str = "sess") -> "DemoSession":
        random_token = uuid.uuid4().hex
        session_id = f"{prefix}_{random_token[:16]}"
        world_id = f"w_{random_token[16:]}"
        return cls(session_id=session_id, world_id=world_id)
