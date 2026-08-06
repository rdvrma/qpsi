from fastapi import APIRouter
from qpsi_engine.api.schemas import HealthResponse

router = APIRouter(tags=["Health"])


@router.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    return HealthResponse(status="ok", service="qpsi-engine", version="0.1.0")
