from qpsi_engine.domain.command import Command
from qpsi_engine.application.world_service import WorldService
from qpsi_engine.infrastructure.database import create_engine, sessionmaker, Base


def test_initial_seeded_state(db_session):
    """Test 1: Verify Marcus, Elena, main_room, book, key, glass in initial seeded state."""
    service = WorldService(db_session)
    state = service.seed_world("w-test-1")

    assert "marcus" in state.characters
    assert "elena" in state.characters
    assert "main_room" in state.rooms
    assert "book" in state.objects
    assert "key" in state.objects
    assert "glass" in state.objects

    assert state.objects["book"].container_surface == "shelf"
    assert state.objects["key"].container_surface == "desk"
    assert state.objects["glass"].container_surface == "table"


def test_valid_object_movement(db_session):
    """Test 2: Marcus moves book from shelf to table."""
    service = WorldService(db_session)
    service.seed_world("w-test-2")

    cmd = Command(
        command_id="cmd-mov-1",
        world_id="w-test-2",
        actor_id="marcus",
        command_type="move_object",
        target_id="book",
        source_location="shelf",
        destination_location="table",
    )
    val_res, evt = service.execute_command(cmd)

    assert val_res.valid is True
    assert evt is not None
    assert evt.event_type == "move_object"

    updated = service.get_world("w-test-2")
    assert updated.objects["book"].container_surface == "table"


def test_absent_observer_does_not_gain_knowledge(db_session):
    """Test 3: Elena leaves room, Marcus moves book. Elena does NOT gain knowledge of move."""
    service = WorldService(db_session)
    service.seed_world("w-test-3")

    # Elena leaves main_room
    cmd_leave = Command(
        command_id="cmd-lve-1",
        world_id="w-test-3",
        actor_id="elena",
        command_type="leave_room",
        destination_location="hallway",
    )
    service.execute_command(cmd_leave)

    # Marcus moves book from shelf to table
    cmd_move = Command(
        command_id="cmd-mov-2",
        world_id="w-test-3",
        actor_id="marcus",
        command_type="move_object",
        target_id="book",
        source_location="shelf",
        destination_location="table",
    )
    val_res, evt = service.execute_command(cmd_move)

    assert val_res.valid is True
    assert evt is not None
    assert "elena" not in evt.observer_ids
    assert "marcus" in evt.observer_ids


def test_observer_belief_update(db_session):
    """Test 4: Observer belief update for Marcus when he observes move."""
    service = WorldService(db_session)
    service.seed_world("w-test-4")

    cmd_move = Command(
        command_id="cmd-mov-3",
        world_id="w-test-4",
        actor_id="marcus",
        command_type="move_object",
        target_id="book",
        source_location="shelf",
        destination_location="table",
    )
    service.execute_command(cmd_move)

    state = service.get_world("w-test-4")
    assert state.get_character_belief("marcus", "book", "location_surface") == "table"


def test_canonical_state_and_belief_separation(db_session):
    """Test 5: Canonical book surface is table, but absent Elena's belief remains shelf."""
    service = WorldService(db_session)
    service.seed_world("w-test-5")

    # Elena leaves to hallway
    cmd_leave = Command(
        command_id="cmd-lve-2",
        world_id="w-test-5",
        actor_id="elena",
        command_type="leave_room",
        destination_location="hallway",
    )
    service.execute_command(cmd_leave)

    # Marcus moves book to table
    cmd_move = Command(
        command_id="cmd-mov-4",
        world_id="w-test-5",
        actor_id="marcus",
        command_type="move_object",
        target_id="book",
        source_location="shelf",
        destination_location="table",
    )
    service.execute_command(cmd_move)

    state = service.get_world("w-test-5")
    # Canonical reality
    assert state.objects["book"].container_surface == "table"
    # Marcus belief
    assert state.get_character_belief("marcus", "book", "location_surface") == "table"
    # Elena stale belief remains shelf!
    assert state.get_character_belief("elena", "book", "location_surface") == "shelf"


def test_command_contradiction_rejection(db_session):
    """Test 6: Attempting to pick up book from shelf when book is on table returns STATE_CONTRADICTION."""
    service = WorldService(db_session)
    service.seed_world("w-test-6")

    # Marcus moves book to table
    cmd_move = Command(
        command_id="cmd-mov-5",
        world_id="w-test-6",
        actor_id="marcus",
        command_type="move_object",
        target_id="book",
        source_location="shelf",
        destination_location="table",
    )
    service.execute_command(cmd_move)

    # Marcus attempts to pick up book from shelf (contradicting table location!)
    cmd_invalid = Command(
        command_id="cmd-pick-1",
        world_id="w-test-6",
        actor_id="marcus",
        command_type="pick_up_object",
        target_id="book",
        source_location="shelf",
    )
    val_res, evt = service.execute_command(cmd_invalid)

    assert val_res.valid is False
    assert val_res.code == "STATE_CONTRADICTION"
    assert evt is None


def test_failed_command_does_not_mutate_state(db_session):
    """Test 7: Failed command produces no event commit and leaves canonical state unchanged."""
    service = WorldService(db_session)
    service.seed_world("w-test-7")

    initial_events = len(service.get_events("w-test-7"))

    cmd_invalid = Command(
        command_id="cmd-pick-2",
        world_id="w-test-7",
        actor_id="marcus",
        command_type="pick_up_object",
        target_id="book",
        source_location="nonexistent_surface",
    )
    val_res, evt = service.execute_command(cmd_invalid)

    assert val_res.valid is False
    assert evt is None
    assert len(service.get_events("w-test-7")) == initial_events
    state = service.get_world("w-test-7")
    assert state.objects["book"].container_surface == "shelf"


def test_process_repository_restart_persistence():
    """Test 8: Database restart persistence test using file SQLite database."""
    test_db_url = "sqlite:///./test_restart.db"
    test_engine = create_engine(test_db_url, connect_args={"check_same_thread": False})
    TestSession = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

    Base.metadata.create_all(bind=test_engine)

    try:
        # Session 1: Execute command
        db1 = TestSession()
        service1 = WorldService(db1)
        service1.seed_world("w-restart-1")

        cmd = Command(
            command_id="cmd-rst-1",
            world_id="w-restart-1",
            actor_id="marcus",
            command_type="move_object",
            target_id="book",
            source_location="shelf",
            destination_location="table",
        )
        service1.execute_command(cmd)
        db1.close()

        # Session 2: Process restart simulation
        db2 = TestSession()
        service2 = WorldService(db2)
        restored_state = service2.get_world("w-restart-1")

        assert restored_state is not None
        assert restored_state.objects["book"].container_surface == "table"
        assert len(service2.get_events("w-restart-1")) == 1
        db2.close()

    finally:
        Base.metadata.drop_all(bind=test_engine)
        test_engine.dispose()
        import os
        if os.path.exists("./test_restart.db"):
            os.remove("./test_restart.db")


def test_full_event_replay(db_session):
    """Test 9: Replay event ledger from seed state."""
    service = WorldService(db_session)
    service.seed_world("w-test-9")

    cmd1 = Command(
        command_id="cmd-r1",
        world_id="w-test-9",
        actor_id="marcus",
        command_type="move_object",
        target_id="book",
        source_location="shelf",
        destination_location="table",
    )
    service.execute_command(cmd1)

    replayed_state, matches, active_digest = service.replay_world("w-test-9")
    assert replayed_state.objects["book"].container_surface == "table"


def test_replayed_state_equality(db_session):
    """Test 10: Replayed state digest equals active state digest."""
    service = WorldService(db_session)
    service.seed_world("w-test-10")

    cmd1 = Command(
        command_id="cmd-r2",
        world_id="w-test-10",
        actor_id="elena",
        command_type="leave_room",
        destination_location="hallway",
    )
    service.execute_command(cmd1)

    cmd2 = Command(
        command_id="cmd-r3",
        world_id="w-test-10",
        actor_id="marcus",
        command_type="move_object",
        target_id="book",
        source_location="shelf",
        destination_location="table",
    )
    service.execute_command(cmd2)

    replayed_state, matches, active_digest = service.replay_world("w-test-10")
    assert matches is True
    assert active_digest == replayed_state.calculate_digest()


def test_event_hash_chain_integrity(db_session):
    """Test 11: SHA-256 hash chain verification over event stream."""
    service = WorldService(db_session)
    service.seed_world("w-test-11")

    for i in range(3):
        cmd = Command(
            command_id=f"cmd-hc-{i}",
            world_id="w-test-11",
            actor_id="marcus",
            command_type="speak",
            parameters={"dialogue": f"Testing line {i}"},
        )
        service.execute_command(cmd)

    valid, errors = service.verify_integrity("w-test-11")
    assert valid is True
    assert len(errors) == 0


def test_duplicate_command_idempotency(db_session):
    """Test 12: Duplicate command handled safely."""
    service = WorldService(db_session)
    service.seed_world("w-test-12")

    cmd = Command(
        command_id="cmd-dup-1",
        world_id="w-test-12",
        actor_id="marcus",
        command_type="move_object",
        target_id="book",
        source_location="shelf",
        destination_location="table",
    )
    val1, evt1 = service.execute_command(cmd)
    assert val1.valid is True

    # Second identical command should fail because book is now on table, not shelf
    val2, evt2 = service.execute_command(cmd)
    assert val2.valid is False
    assert val2.code == "STATE_CONTRADICTION"


def test_invalid_actor_rejection(db_session):
    """Test 13: Unknown actor ID rejected."""
    service = WorldService(db_session)
    service.seed_world("w-test-13")

    cmd = Command(
        command_id="cmd-unk-actor",
        world_id="w-test-13",
        actor_id="ghost_character",
        command_type="move_object",
        target_id="book",
    )
    val_res, evt = service.execute_command(cmd)
    assert val_res.valid is False
    assert val_res.code == "ACTOR_NOT_FOUND"


def test_invalid_object_rejection(db_session):
    """Test 14: Unknown object ID rejected."""
    service = WorldService(db_session)
    service.seed_world("w-test-14")

    cmd = Command(
        command_id="cmd-unk-obj",
        world_id="w-test-14",
        actor_id="marcus",
        command_type="move_object",
        target_id="nonexistent_magic_wand",
    )
    val_res, evt = service.execute_command(cmd)
    assert val_res.valid is False
    assert val_res.code == "OBJECT_NOT_FOUND"


def test_actor_not_in_room_rejection(db_session):
    """Test 15: Action on object in room where actor is not present is rejected."""
    service = WorldService(db_session)
    service.seed_world("w-test-15")

    # Move Marcus to hallway
    cmd_leave = Command(
        command_id="cmd-lve-m",
        world_id="w-test-15",
        actor_id="marcus",
        command_type="leave_room",
        destination_location="hallway",
    )
    service.execute_command(cmd_leave)

    # Marcus attempts to move book in main_room while he is in hallway
    cmd_remote = Command(
        command_id="cmd-remote",
        world_id="w-test-15",
        actor_id="marcus",
        command_type="move_object",
        target_id="book",
        source_location="shelf",
        destination_location="table",
    )
    val_res, evt = service.execute_command(cmd_remote)
    assert val_res.valid is False
    assert val_res.code == "OBJECT_NOT_IN_ROOM"
