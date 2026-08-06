import os
from typing import Optional, Tuple
from sqlalchemy.orm import Session
from qpsi_engine.domain.demo_session import DemoSession
from qpsi_engine.infrastructure.session_repository import SessionRepository
from qpsi_engine.application.world_service import WorldService


class SessionManager:
    def __init__(self, db: Session):
        self.db = db
        self.repo = SessionRepository(db)
        self.world_service = WorldService(db)
        self.ttl_minutes = int(os.environ.get("QPSI_SESSION_TTL_MINUTES", "60"))

    def get_or_create_session(self, existing_session_id: Optional[str] = None) -> Tuple[DemoSession, bool]:
        """Gets active valid session or creates isolated session & seeds new world."""
        if existing_session_id:
            sess = self.repo.get_session(existing_session_id)
            if sess:
                if not sess.is_expired(self.ttl_minutes):
                    sess.touch()
                    self.repo.save_session(sess)
                    return sess, False
                else:
                    # Clean up expired session
                    self.repo.delete_session(existing_session_id)

        # Create new cryptographically random session & seed world
        new_sess = DemoSession.create_new()
        self.repo.save_session(new_sess)
        self.world_service.seed_world(new_sess.world_id)
        return new_sess, True

    def validate_session_access(self, session_id: str, world_id: str) -> bool:
        """Verifies session ownership over world_id."""
        sess = self.repo.get_session(session_id)
        if not sess:
            return False
        if sess.is_expired(self.ttl_minutes):
            return False
        return sess.world_id == world_id
