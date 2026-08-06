import uuid
from typing import Dict, Any
from sqlalchemy.orm import Session
from qpsi_engine.domain.command import Command
from qpsi_engine.application.world_service import WorldService
from qpsi_engine.infrastructure.database import SessionLocal


class DemoScenarioRunner:
    @staticmethod
    def run_full_demo(db: Session, world_id: str = "world-001") -> Dict[str, Any]:
        results: Dict[str, Any] = {"world_id": world_id, "steps": []}
        service = WorldService(db)

        # Step 1: Seed Initial World
        initial_state = service.seed_world(world_id)
        results["steps"].append({
            "step": 1,
            "title": "Seed Initial World",
            "description": "Seeded world with Marcus & Elena in main_room. Book on shelf.",
            "canonical_book_surface": initial_state.objects["book"].container_surface,
            "marcus_belief_book": initial_state.get_character_belief("marcus", "book", "location_surface"),
            "elena_belief_book": initial_state.get_character_belief("elena", "book", "location_surface"),
            "status": "PASS",
        })

        # Step 2: Elena Leaves main_room
        cmd_leave = Command(
            command_id=f"cmd-{uuid.uuid4().hex[:8]}",
            world_id=world_id,
            actor_id="elena",
            command_type="leave_room",
            source_location="main_room",
            destination_location="hallway",
        )
        val2, evt2 = service.execute_command(cmd_leave)
        state2 = service.get_world(world_id)
        assert state2 is not None
        results["steps"].append({
            "step": 2,
            "title": "Elena Leaves Room",
            "description": "Elena left main_room for hallway.",
            "elena_location": state2.characters["elena"].location_id,
            "marcus_location": state2.characters["marcus"].location_id,
            "status": "PASS" if val2.valid else "FAIL",
        })

        # Step 3: Marcus Moves Book from Shelf to Table (Elena is absent!)
        cmd_move = Command(
            command_id=f"cmd-{uuid.uuid4().hex[:8]}",
            world_id=world_id,
            actor_id="marcus",
            command_type="move_object",
            target_id="book",
            source_location="shelf",
            destination_location="table",
        )
        val3, evt3 = service.execute_command(cmd_move)
        state3 = service.get_world(world_id)
        assert state3 is not None
        results["steps"].append({
            "step": 3,
            "title": "Marcus Moves Book (Absent Observer)",
            "description": "Marcus moved book from shelf to table while Elena was in hallway.",
            "canonical_book_surface": state3.objects["book"].container_surface,
            "marcus_belief_book": state3.get_character_belief("marcus", "book", "location_surface"),
            "elena_belief_book": state3.get_character_belief("elena", "book", "location_surface"),
            "observer_ids": evt3.observer_ids if evt3 else [],
            "status": "PASS" if (
                state3.objects["book"].container_surface == "table" and
                state3.get_character_belief("marcus", "book", "location_surface") == "table" and
                state3.get_character_belief("elena", "book", "location_surface") == "shelf"
            ) else "FAIL",
        })

        # Step 4: Stop/Restart Process (Simulated Database Session Re-initialization)
        db.close()
        new_db = SessionLocal()
        new_service = WorldService(new_db)
        restarted_state = new_service.get_world(world_id)
        assert restarted_state is not None
        integrity_ok, errors = new_service.verify_integrity(world_id)
        results["steps"].append({
            "step": 4,
            "title": "Process Restart & State Persistence",
            "description": "Database session closed and re-opened. World restored from persistent SQLite storage.",
            "restarted_book_surface": restarted_state.objects["book"].container_surface,
            "event_count": len(new_service.get_events(world_id)),
            "hash_chain_integrity": integrity_ok,
            "status": "PASS" if (restarted_state.objects["book"].container_surface == "table" and integrity_ok) else "FAIL",
        })

        # Step 5: Attempt Marcus Picking Up Book from Shelf (Contradiction Test)
        cmd_contradict = Command(
            command_id=f"cmd-{uuid.uuid4().hex[:8]}",
            world_id=world_id,
            actor_id="marcus",
            command_type="pick_up_object",
            target_id="book",
            source_location="shelf",  # Contradicts canonical truth ("table")!
        )
        val5, evt5 = new_service.execute_command(cmd_contradict)
        state5 = new_service.get_world(world_id)
        assert state5 is not None
        results["steps"].append({
            "step": 5,
            "title": "Command Contradiction Rejection",
            "description": "Marcus attempted to pick up book from shelf, but book is canonically on table.",
            "validation_code": val5.code,
            "error_message": val5.error_message,
            "canonical_book_surface_unchanged": state5.objects["book"].container_surface,
            "event_committed": evt5 is not None,
            "status": "PASS" if (not val5.valid and val5.code == "STATE_CONTRADICTION" and evt5 is None) else "FAIL",
        })

        # Step 6: Elena Enters main_room & Inspects Book
        cmd_enter = Command(
            command_id=f"cmd-{uuid.uuid4().hex[:8]}",
            world_id=world_id,
            actor_id="elena",
            command_type="enter_room",
            destination_location="main_room",
        )
        new_service.execute_command(cmd_enter)

        cmd_inspect = Command(
            command_id=f"cmd-{uuid.uuid4().hex[:8]}",
            world_id=world_id,
            actor_id="elena",
            command_type="inspect_object",
            target_id="book",
        )
        val6, evt6 = new_service.execute_command(cmd_inspect)
        state6 = new_service.get_world(world_id)
        assert state6 is not None
        results["steps"].append({
            "step": 6,
            "title": "Elena Enters Room & Inspects Book",
            "description": "Elena returned to main_room and inspected the book.",
            "elena_location": state6.characters["elena"].location_id,
            "elena_updated_belief_book": state6.get_character_belief("elena", "book", "location_surface"),
            "status": "PASS" if state6.get_character_belief("elena", "book", "location_surface") == "table" else "FAIL",
        })

        # Step 7: Replay Event Ledger & Verify State Digest Equality
        replayed_state, matches, active_digest = new_service.replay_world(world_id)
        replayed_digest = replayed_state.calculate_digest()
        results["steps"].append({
            "step": 7,
            "title": "Event Ledger Replay & Bit-Exact Verification",
            "description": "Full event ledger replayed from seed state into fresh projection.",
            "active_state_digest": active_digest,
            "replayed_state_digest": replayed_digest,
            "digests_match": matches,
            "status": "PASS" if matches else "FAIL",
        })

        results["verdict"] = "ACCEPTED" if all(s["status"] == "PASS" for s in results["steps"]) else "REJECTED"
        new_db.close()
        return results
