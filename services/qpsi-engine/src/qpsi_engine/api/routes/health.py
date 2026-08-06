import os
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from qpsi_engine.api.dependencies import get_db
from qpsi_engine.api.schemas import HealthResponse, ReadyResponse
from qpsi_engine.infrastructure.database import check_database_ready

router = APIRouter(tags=["Health & Readiness"])


@router.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    return HealthResponse(status="ok", service="qpsi-engine", version="0.1.0")


@router.get("/ready", response_model=ReadyResponse)
def readiness_check(db: Session = Depends(get_db)) -> ReadyResponse:
    db_ok = check_database_ready()
    demo_enabled = os.environ.get("QPSI_PUBLIC_DEMO_ENABLED", "true").lower() in ["true", "1", "yes"]

    if not db_ok:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection ping failed.",
        )

    return ReadyResponse(
        status="ready",
        service="qpsi-engine",
        database_ready=db_ok,
        public_demo_enabled=demo_enabled,
    )
