from typing import Tuple, Optional, List
from sqlalchemy.orm import Session
from qpsi_engine.domain.character import Character
from qpsi_engine.domain.room import Room
from qpsi_engine.domain.world_object import WorldObject
from qpsi_engine.domain.relationship import Relationship
from qpsi_engine.domain.world_state import WorldState
from qpsi_engine.domain.command import Command
from qpsi_engine.domain.event import Event
from qpsi_engine.application.validator import ValidationResult
from qpsi_engine.application.command_handler import CommandHandler
from qpsi_engine.application.replay_engine import ReplayEngine
from qpsi_engine.infrastructure.world_repository import WorldRepository
from qpsi_engine.infrastructure.event_repository import EventRepository


class WorldService:
    def __init__(self, db: Session):
        self.db = db
        self.world_repo = WorldRepository(db)
        self.event_repo = EventRepository(db)

    def seed_world(self, world_id: str = "world-001") -> WorldState:
        """Seeds the mandatory M1 reference world with Marcus, Elena, main_room, book, key, glass."""
        marcus = Character(id="marcus", name="Marcus", location_id="main_room", inventory=[])
        elena = Character(id="elena", name="Elena", location_id="main_room", inventory=[])

        main_room = Room(id="main_room", name="Main Lounge", connected_room_ids=["hallway"])
        hallway = Room(id="hallway", name="Connecting Hallway", connected_room_ids=["main_room"])

        book = WorldObject(id="book", name="Antique Leather Journal", location_id="main_room", container_surface="shelf")
        key = WorldObject(id="key", name="Encrypted Passkey", location_id="main_room", container_surface="desk")
        glass = WorldObject(id="glass", name="Water Glass", location_id="main_room", container_surface="table")

        rel_marcus_elena = Relationship(actor_id="marcus", target_character_id="elena", trust_score=0.85)
        rel_elena_marcus = Relationship(actor_id="elena", target_character_id="marcus", trust_score=0.85)

        world_state = WorldState(
            world_id=world_id,
            sequence_number=0,
            characters={"marcus": marcus, "elena": elena},
            rooms={"main_room": main_room, "hallway": hallway},
            objects={"book": book, "key": key, "glass": glass},
            beliefs=[],
            relationships=[rel_marcus_elena, rel_elena_marcus],
        )

        # Initial observations: both Marcus & Elena observe objects in main_room
        for cid in ["marcus", "elena"]:
            world_state.set_character_belief(cid, "marcus", "location_id", "main_room")
            world_state.set_character_belief(cid, "elena", "location_id", "main_room")
            world_state.set_character_belief(cid, "book", "location_surface", "shelf")
            world_state.set_character_belief(cid, "key", "location_surface", "desk")
            world_state.set_character_belief(cid, "glass", "location_surface", "table")

        # Clear old events if re-seeding this world_id
        self.event_repo.delete_events(world_id)

        # Save active state and initial seed snapshot
        self.world_repo.save_world(world_state, initial_seed_state=world_state)
        return world_state

    def get_world(self, world_id: str) -> Optional[WorldState]:
        return self.world_repo.get_world(world_id)

    def execute_command(self, command: Command) -> Tuple[ValidationResult, Optional[Event]]:
        world_state = self.world_repo.get_world(command.world_id)
        if not world_state:
            val_res = ValidationResult(
                valid=False,
                code="WORLD_NOT_FOUND",
                error_message=f"World '{command.world_id}' does not exist.",
            )
            return val_res, None

        last_event = self.event_repo.get_last_event(command.world_id)
        last_hash = last_event.event_hash if last_event else "0" * 64

        val_result, event = CommandHandler.handle_command(command, world_state, last_event_hash=last_hash)

        if val_result.valid and event:
            # Save committed event to ledger and update canonical world state
            self.event_repo.save_event(event)
            self.world_repo.save_world(world_state)

        return val_result, event

    def get_events(self, world_id: str) -> List[Event]:
        return self.event_repo.get_events(world_id)

    def replay_world(self, world_id: str) -> Tuple[WorldState, bool, str]:
        """Reconstructs state from scratch from initial seed + event ledger, returning (replayed_state, matches, active_digest)."""
        active_state = self.world_repo.get_world(world_id)
        if not active_state:
            raise ValueError(f"World '{world_id}' not found.")

        seed_state = self.world_repo.get_initial_seed(world_id)
        if not seed_state:
            seed_state = self.seed_world(world_id)

        events = self.event_repo.get_events(world_id)
        replayed_state = ReplayEngine.replay_events(seed_state, events)

        active_digest = active_state.calculate_digest()
        replayed_digest = replayed_state.calculate_digest()
        matches = (active_digest == replayed_digest)

        return replayed_state, matches, active_digest

    def verify_integrity(self, world_id: str) -> Tuple[bool, List[str]]:
        events = self.event_repo.get_events(world_id)
        return ReplayEngine.verify_integrity(events)
