def test_api_health(client):
    """Test 16: API GET /health returns 200 OK."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "qpsi-engine"


def test_api_readiness(client):
    """Test API GET /ready returns 200 OK and database_ready = True."""
    response = client.get("/ready")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ready"
    assert data["database_ready"] is True


def test_api_world_creation(client):
    """Test 17: API POST /worlds creates seeded world."""
    response = client.post("/worlds?world_id=w-api-1")
    assert response.status_code == 201
    data = response.json()
    assert data["world_id"] == "w-api-1"
    assert "marcus" in data["canonical_state"]["characters"]
    assert "elena" in data["canonical_state"]["characters"]
    assert "book" in data["canonical_state"]["objects"]


def test_api_command_execution(client):
    """Test 18: API POST /worlds/{world_id}/commands executes valid command."""
    client.post("/worlds?world_id=w-api-2")

    payload = {
        "actor_id": "marcus",
        "command_type": "move_object",
        "target_id": "book",
        "source_location": "shelf",
        "destination_location": "table",
        "parameters": {},
    }
    response = client.post("/worlds/w-api-2/commands", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["valid"] is True
    assert data["event_id"] is not None
    assert data["event_hash"] is not None


def test_api_event_retrieval(client):
    """Test 19: API GET /worlds/{world_id}/events retrieves ordered event log."""
    client.post("/worlds?world_id=w-api-3")

    payload = {
        "actor_id": "marcus",
        "command_type": "speak",
        "parameters": {"dialogue": "Hello Elena"},
    }
    client.post("/worlds/w-api-3/commands", json=payload)

    response = client.get("/worlds/w-api-3/events")
    assert response.status_code == 200
    events = response.json()
    assert len(events) >= 1
    assert events[0]["actor_id"] == "marcus"
    assert events[0]["event_type"] == "speak"


def test_api_replay_and_integrity_verification(client):
    """Test 20: API POST /worlds/{world_id}/replay and POST /worlds/{world_id}/verify-integrity."""
    client.post("/worlds?world_id=w-api-4")

    # Command 1: Move book
    client.post(
        "/worlds/w-api-4/commands",
        json={
            "actor_id": "marcus",
            "command_type": "move_object",
            "target_id": "book",
            "source_location": "shelf",
            "destination_location": "table",
        },
    )

    # Replay test
    replay_resp = client.post("/worlds/w-api-4/replay")
    assert replay_resp.status_code == 200
    replay_data = replay_resp.json()
    assert replay_data["digests_match"] is True

    # Integrity test
    integrity_resp = client.post("/worlds/w-api-4/verify-integrity")
    assert integrity_resp.status_code == 200
    integrity_data = integrity_resp.json()
    assert integrity_data["integrity_valid"] is True, f"Integrity errors: {integrity_data.get('errors')}"
    assert integrity_data["event_count"] >= 1
    assert len(integrity_data["errors"]) == 0


def test_api_demo_session_creation(client):
    """Test POST /sessions creates isolated session & seeded world."""
    response = client.post("/sessions")
    assert response.status_code == 200
    data = response.json()
    assert data["session_id"].startswith("sess_")
    assert data["world_id"].startswith("w_")
    assert data["is_new"] is True


def test_api_session_isolation(client):
    """Test two demo sessions receive different isolated worlds."""
    resp1 = client.post("/sessions")
    sess1 = resp1.json()

    resp2 = client.post("/sessions")
    sess2 = resp2.json()

    assert sess1["session_id"] != sess2["session_id"]
    assert sess1["world_id"] != sess2["world_id"]

    # Session 1 moves book
    client.post(
        f"/worlds/{sess1['world_id']}/commands",
        json={
            "actor_id": "marcus",
            "command_type": "move_object",
            "target_id": "book",
            "source_location": "shelf",
            "destination_location": "table",
        },
    )

    # World 1 book surface is table
    w1_resp = client.get(f"/worlds/{sess1['world_id']}")
    assert w1_resp.json()["canonical_state"]["objects"]["book"]["container_surface"] == "table"

    # World 2 book surface remains shelf (unaffected!)
    w2_resp = client.get(f"/worlds/{sess2['world_id']}")
    assert w2_resp.json()["canonical_state"]["objects"]["book"]["container_surface"] == "shelf"
