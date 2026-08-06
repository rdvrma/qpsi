import os
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from qpsi_engine.api.dependencies import get_db
from qpsi_engine.api.schemas import WorldStateResponse
from qpsi_engine.application.world_service import WorldService

router = APIRouter(prefix="/worlds", tags=["Worlds"])


@router.post("", response_model=WorldStateResponse, status_code=status.HTTP_201_CREATED)
def create_or_seed_world(world_id: str = "world-001", db: Session = Depends(get_db)) -> WorldStateResponse:
    service = WorldService(db)
    world_state = service.seed_world(world_id)

    beliefs_by_char = {}
    for cid in world_state.characters:
        beliefs_by_char[cid] = [
            b.to_dict() for b in world_state.beliefs if b.character_id == cid
        ]

    return WorldStateResponse(
        world_id=world_state.world_id,
        sequence_number=world_state.sequence_number,
        canonical_state={
            "characters": {cid: c.to_dict() for cid, c in world_state.characters.items()},
            "rooms": {rid: r.to_dict() for rid, r in world_state.rooms.items()},
            "objects": {oid: o.to_dict() for oid, o in world_state.objects.items()},
            "relationships": [r.to_dict() for r in world_state.relationships],
        },
        character_beliefs=beliefs_by_char,
        state_digest=world_state.calculate_digest(),
    )


@router.get("/{world_id}", response_model=WorldStateResponse)
def get_world(world_id: str, db: Session = Depends(get_db)) -> WorldStateResponse:
    service = WorldService(db)
    world_state = service.get_world(world_id)
    if not world_state:
        raise HTTPException(status_code=404, detail=f"World '{world_id}' not found.")

    beliefs_by_char = {}
    for cid in world_state.characters:
        beliefs_by_char[cid] = [
            b.to_dict() for b in world_state.beliefs if b.character_id == cid
        ]

    return WorldStateResponse(
        world_id=world_state.world_id,
        sequence_number=world_state.sequence_number,
        canonical_state={
            "characters": {cid: c.to_dict() for cid, c in world_state.characters.items()},
            "rooms": {rid: r.to_dict() for rid, r in world_state.rooms.items()},
            "objects": {oid: o.to_dict() for oid, o in world_state.objects.items()},
            "relationships": [r.to_dict() for r in world_state.relationships],
        },
        character_beliefs=beliefs_by_char,
        state_digest=world_state.calculate_digest(),
    )


@router.post("/{world_id}/reset", response_model=WorldStateResponse)
def reset_world(world_id: str, db: Session = Depends(get_db)) -> WorldStateResponse:
    enable_reset = os.environ.get("QPSI_ENABLE_RESET", "true").lower() in ["true", "1", "yes"]
    if not enable_reset:
        raise HTTPException(status_code=403, detail="Development reset functionality is disabled in this environment.")

    service = WorldService(db)
    world_state = service.seed_world(world_id)

    beliefs_by_char = {}
    for cid in world_state.characters:
        beliefs_by_char[cid] = [
            b.to_dict() for b in world_state.beliefs if b.character_id == cid
        ]

    return WorldStateResponse(
        world_id=world_state.world_id,
        sequence_number=world_state.sequence_number,
        canonical_state={
            "characters": {cid: c.to_dict() for cid, c in world_state.characters.items()},
            "rooms": {rid: r.to_dict() for rid, r in world_state.rooms.items()},
            "objects": {oid: o.to_dict() for oid, o in world_state.objects.items()},
            "relationships": [r.to_dict() for r in world_state.relationships],
        },
        character_beliefs=beliefs_by_char,
        state_digest=world_state.calculate_digest(),
    )
