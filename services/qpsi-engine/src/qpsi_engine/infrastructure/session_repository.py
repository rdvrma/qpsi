from typing import Optional, Any
from sqlalchemy.orm import Session
from qpsi_engine.domain.demo_session import DemoSession
from qpsi_engine.infrastructure.models import DemoSessionModel


class SessionRepository:
    def __init__(self, db: Session):
        self.db = db

    def save_session(self, session: DemoSession) -> DemoSession:
        model: Any = self.db.query(DemoSessionModel).filter(DemoSessionModel.session_id == session.session_id).first()
        if not model:
            model = DemoSessionModel(
                session_id=session.session_id,
                world_id=session.world_id,
                created_at=session.created_at,
                last_accessed_at=session.last_accessed_at,
            )
            self.db.add(model)
        else:
            model.last_accessed_at = session.last_accessed_at

        self.db.commit()
        return session

    def get_session(self, session_id: str) -> Optional[DemoSession]:
        model: Any = self.db.query(DemoSessionModel).filter(DemoSessionModel.session_id == session_id).first()
        if not model:
            return None
        return DemoSession(
            session_id=model.session_id,
            world_id=model.world_id,
            created_at=model.created_at,
            last_accessed_at=model.last_accessed_at,
        )

    def delete_session(self, session_id: str) -> None:
        self.db.query(DemoSessionModel).filter(DemoSessionModel.session_id == session_id).delete()
        self.db.commit()
