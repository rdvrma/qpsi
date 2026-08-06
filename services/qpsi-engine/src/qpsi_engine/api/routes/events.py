from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from qpsi_engine.api.dependencies import get_db
from qpsi_engine.api.schemas import (
    EventResponse,
    ReplayResponse,
    IntegrityCheckResponse,
    DemoResponse,
)
from qpsi_engine.application.world_service import WorldService
from qpsi_engine.application.demo_scenario import DemoScenarioRunner

router = APIRouter(prefix="/worlds/{world_id}", tags=["Events & Replay"])


@router.get("/events", response_model=List[EventResponse])
def get_events(world_id: str, db: Session = Depends(get_db)) -> List[EventResponse]:
    service = WorldService(db)
    events = service.get_events(world_id)
    return [EventResponse(**e.to_dict()) for e in events]


@router.post("/demo", response_model=DemoResponse)
def run_demo(world_id: str = "world-001", db: Session = Depends(get_db)) -> DemoResponse:
    results = DemoScenarioRunner.run_full_demo(db, world_id=world_id)
    return DemoResponse(**results)


@router.post("/replay", response_model=ReplayResponse)
def replay_world(world_id: str, db: Session = Depends(get_db)) -> ReplayResponse:
    service = WorldService(db)
    try:
        replayed_state, matches, active_digest = service.replay_world(world_id)
        return ReplayResponse(
            world_id=world_id,
            replayed_sequence_number=replayed_state.sequence_number,
            active_digest=active_digest,
            replayed_digest=replayed_state.calculate_digest(),
            digests_match=matches,
            replayed_state=replayed_state.to_dict(),
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/verify-integrity", response_model=IntegrityCheckResponse)
def verify_integrity(world_id: str, db: Session = Depends(get_db)) -> IntegrityCheckResponse:
    service = WorldService(db)
    valid, errors = service.verify_integrity(world_id)
    events = service.get_events(world_id)
    return IntegrityCheckResponse(
        world_id=world_id,
        integrity_valid=valid,
        event_count=len(events),
        errors=errors,
    )
