from typing import Optional, Any, Dict, cast
from sqlalchemy.orm import Session
from qpsi_engine.domain.world_state import WorldState
from qpsi_engine.infrastructure.models import WorldModel


class WorldRepository:
    def __init__(self, db: Session):
        self.db = db

    def save_world(self, world_state: WorldState, initial_seed_state: Optional[WorldState] = None) -> WorldState:
        model: Any = self.db.query(WorldModel).filter(WorldModel.world_id == world_state.world_id).first()
        state_dict = world_state.to_dict()

        if not model:
            seed_dict = initial_seed_state.to_dict() if initial_seed_state else state_dict
            model = WorldModel(
                world_id=world_state.world_id,
                sequence_number=world_state.sequence_number,
                state_json=state_dict,
                initial_seed_json=seed_dict,
            )
            self.db.add(model)
        else:
            model.sequence_number = world_state.sequence_number
            model.state_json = state_dict
            if initial_seed_state:
                model.initial_seed_json = initial_seed_state.to_dict()

        self.db.commit()
        self.db.refresh(model)
        return world_state

    def get_world(self, world_id: str) -> Optional[WorldState]:
        model: Any = self.db.query(WorldModel).filter(WorldModel.world_id == world_id).first()
        if not model or not model.state_json:
            return None
        return WorldState.from_dict(cast(Dict[str, Any], model.state_json))

    def get_initial_seed(self, world_id: str) -> Optional[WorldState]:
        model: Any = self.db.query(WorldModel).filter(WorldModel.world_id == world_id).first()
        if not model or not model.initial_seed_json:
            return None
        return WorldState.from_dict(cast(Dict[str, Any], model.initial_seed_json))
