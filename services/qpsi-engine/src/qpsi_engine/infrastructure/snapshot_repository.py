import uuid
from typing import Optional, Any, Dict, cast
from sqlalchemy.orm import Session
from qpsi_engine.domain.world_state import WorldState
from qpsi_engine.infrastructure.models import SnapshotModel


class SnapshotRepository:
    def __init__(self, db: Session):
        self.db = db

    def save_snapshot(self, world_state: WorldState) -> SnapshotModel:
        model = SnapshotModel(
            snapshot_id=f"snap-{uuid.uuid4().hex[:8]}",
            world_id=world_state.world_id,
            sequence_number=world_state.sequence_number,
            state_digest=world_state.calculate_digest(),
            snapshot_json=world_state.to_dict(),
        )
        self.db.add(model)
        self.db.commit()
        self.db.refresh(model)
        return model

    def get_latest_snapshot(self, world_id: str) -> Optional[WorldState]:
        model: Any = (
            self.db.query(SnapshotModel)
            .filter(SnapshotModel.world_id == world_id)
            .order_by(SnapshotModel.sequence_number.desc())
            .first()
        )
        if not model or not model.snapshot_json:
            return None
        return WorldState.from_dict(cast(Dict[str, Any], model.snapshot_json))
