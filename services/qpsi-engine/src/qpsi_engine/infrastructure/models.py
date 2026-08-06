from sqlalchemy import Column, String, Integer, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from qpsi_engine.infrastructure.database import Base


class WorldModel(Base):  # type: ignore[misc]
    __tablename__ = "worlds"

    world_id = Column(String, primary_key=True, index=True)
    sequence_number = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    state_json = Column(JSON, nullable=False)
    initial_seed_json = Column(JSON, nullable=False)


class EventLedgerModel(Base):  # type: ignore[misc]
    __tablename__ = "event_ledger"

    event_id = Column(String, primary_key=True, index=True)
    world_id = Column(String, ForeignKey("worlds.world_id"), index=True, nullable=False)
    sequence_number = Column(Integer, index=True, nullable=False)
    timestamp = Column(String, nullable=False)
    actor_id = Column(String, index=True, nullable=False)
    event_type = Column(String, index=True, nullable=False)
    target_id = Column(String, nullable=True)
    previous_state = Column(JSON, nullable=False)
    resulting_state = Column(JSON, nullable=False)
    observer_ids = Column(JSON, nullable=False)
    source = Column(String, nullable=False)
    command_id = Column(String, nullable=False)
    validation_result = Column(JSON, nullable=False)
    parent_event_id = Column(String, nullable=True)
    previous_event_hash = Column(String, nullable=False)
    event_hash = Column(String, nullable=False, unique=True)


class SnapshotModel(Base):  # type: ignore[misc]
    __tablename__ = "snapshots"

    snapshot_id = Column(String, primary_key=True, index=True)
    world_id = Column(String, ForeignKey("worlds.world_id"), index=True, nullable=False)
    sequence_number = Column(Integer, nullable=False)
    state_digest = Column(String, nullable=False)
    snapshot_json = Column(JSON, nullable=False)
    created_at = Column(DateTime, server_default=func.now())


class DemoSessionModel(Base):  # type: ignore[misc]
    __tablename__ = "demo_sessions"

    session_id = Column(String, primary_key=True, index=True)
    world_id = Column(String, nullable=False, index=True)
    created_at = Column(String, nullable=False)
    last_accessed_at = Column(String, nullable=False)
