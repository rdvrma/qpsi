import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from qpsi_engine.api.dependencies import get_db
from qpsi_engine.api.schemas import CommandRequest, CommandResponse
from qpsi_engine.domain.command import Command
from qpsi_engine.application.world_service import WorldService

router = APIRouter(prefix="/worlds/{world_id}/commands", tags=["Commands"])


@router.post("", response_model=CommandResponse)
def execute_command(world_id: str, req: CommandRequest, db: Session = Depends(get_db)) -> CommandResponse:
    service = WorldService(db)

    cmd = Command(
        command_id=f"cmd-{uuid.uuid4().hex[:8]}",
        world_id=world_id,
        actor_id=req.actor_id,
        command_type=req.command_type,
        target_id=req.target_id,
        source_location=req.source_location,
        destination_location=req.destination_location,
        parameters=req.parameters,
    )

    val_res, evt = service.execute_command(cmd)

    return CommandResponse(
        valid=val_res.valid,
        code=val_res.code,
        error_message=val_res.error_message,
        event_id=evt.event_id if evt else None,
        event_hash=evt.event_hash if evt else None,
        sequence_number=evt.sequence_number if evt else None,
    )
