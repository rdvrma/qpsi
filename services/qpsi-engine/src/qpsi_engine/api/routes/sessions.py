from typing import Optional
from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session
from qpsi_engine.api.dependencies import get_db
from qpsi_engine.api.schemas import SessionResponse
from qpsi_engine.application.session_manager import SessionManager

router = APIRouter(prefix="/sessions", tags=["Public Demo Sessions"])


@router.post("", response_model=SessionResponse)
def create_or_resume_session(
    x_demo_session_id: Optional[str] = Header(None),
    db: Session = Depends(get_db)
) -> SessionResponse:
    manager = SessionManager(db)
    sess, is_new = manager.get_or_create_session(x_demo_session_id)
    return SessionResponse(
        session_id=sess.session_id,
        world_id=sess.world_id,
        created_at=sess.created_at,
        is_new=is_new,
    )
