from typing import List, Optional
from sqlalchemy.orm import Session
from qpsi_engine.domain.event import Event
from qpsi_engine.infrastructure.models import EventLedgerModel


class EventRepository:
    def __init__(self, db: Session):
        self.db = db

    def save_event(self, event: Event) -> Event:
        model = EventLedgerModel(
            event_id=event.event_id,
            world_id=event.world_id,
            sequence_number=event.sequence_number,
            timestamp=event.timestamp,
            actor_id=event.actor_id,
            event_type=event.event_type,
            target_id=event.target_id,
            previous_state=event.previous_state,
            resulting_state=event.resulting_state,
            observer_ids=event.observer_ids,
            source=event.source,
            command_id=event.command_id,
            validation_result=event.validation_result,
            parent_event_id=event.parent_event_id,
            previous_event_hash=event.previous_event_hash,
            event_hash=event.event_hash,
        )
        self.db.add(model)
        self.db.commit()
        self.db.refresh(model)
        return event

    def delete_events(self, world_id: str) -> None:
        self.db.query(EventLedgerModel).filter(EventLedgerModel.world_id == world_id).delete()
        self.db.commit()

    def get_events(self, world_id: str) -> List[Event]:
        models = (
            self.db.query(EventLedgerModel)
            .filter(EventLedgerModel.world_id == world_id)
            .order_by(EventLedgerModel.sequence_number.asc())
            .all()
        )
        return [
            Event.from_dict({
                "event_id": m.event_id,
                "world_id": m.world_id,
                "sequence_number": m.sequence_number,
                "timestamp": m.timestamp,
                "actor_id": m.actor_id,
                "event_type": m.event_type,
                "target_id": m.target_id,
                "previous_state": m.previous_state,
                "resulting_state": m.resulting_state,
                "observer_ids": m.observer_ids,
                "source": m.source,
                "command_id": m.command_id,
                "validation_result": m.validation_result,
                "parent_event_id": m.parent_event_id,
                "previous_event_hash": m.previous_event_hash,
                "event_hash": m.event_hash,
            })
            for m in models
        ]

    def get_last_event(self, world_id: str) -> Optional[Event]:
        model = (
            self.db.query(EventLedgerModel)
            .filter(EventLedgerModel.world_id == world_id)
            .order_by(EventLedgerModel.sequence_number.desc())
            .first()
        )
        if not model:
            return None
        return Event.from_dict({
            "event_id": model.event_id,
            "world_id": model.world_id,
            "sequence_number": model.sequence_number,
            "timestamp": model.timestamp,
            "actor_id": model.actor_id,
            "event_type": model.event_type,
            "target_id": model.target_id,
            "previous_state": model.previous_state,
            "resulting_state": model.resulting_state,
            "observer_ids": model.observer_ids,
            "source": model.source,
            "command_id": model.command_id,
            "validation_result": model.validation_result,
            "parent_event_id": model.parent_event_id,
            "previous_event_hash": model.previous_event_hash,
            "event_hash": model.event_hash,
        })
