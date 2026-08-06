# Q-Psi Classical Reference State Engine — Milestone 1 (M1)

The **Q-Psi Classical Reference State Engine** is a deterministic, restart-persistent, append-only event ledger state machine written in Python 3.12, FastAPI, and SQLAlchemy 2.0.

It proves the smallest repeatable Q-Psi unit:
> **Two original fictional adult characters (Marcus & Elena) inside one persistent room (`main_room`) with canonical history that survives process restarts.**

---

## Technical Highlights

- **Authoritative Canonical Ledger**: Append-only event ledger with cryptographic SHA-256 hash chaining (`previous_event_hash` → `event_hash`).
- **Strict Observer & Belief Decoupling**: Canonical world state truth is strictly separated from individual character subjective belief matrices (`beliefs["book.location"]`). An absent character does NOT observe unobserved events!
- **State Replay & Digest Verification**: Full world state can be reconstructed from scratch by replaying the event ledger, computing an exact bit-equivalent state digest.
- **Fail-Safe Command Validation**: Commands that violate identity, room boundaries, physical location, or historical commitments are rejected and DO NOT mutate canonical reality.
- **Zero LLM & Zero Quantum Dependency**: Fully deterministic classical reference baseline.

---

## Local Setup & Quick Start

1. **Install Dependencies**:
   ```bash
   cd services/qpsi-engine
   pip install -e ".[dev]"
   ```

2. **Run Tests**:
   ```bash
   pytest
   ```

3. **Start Local API Server**:
   ```bash
   python -m uvicorn qpsi_engine.api.main:app --reload --port 8000
   ```

4. **Run Deterministic Demonstration Scenario**:
   ```bash
   curl -X POST http://localhost:8000/worlds/world-001/demo
   ```
