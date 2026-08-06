# M1 — Q-Psi Classical Reference State Engine

The **Q-Psi Classical Reference State Engine** is the foundational milestone (M1) proving the smallest repeatable Q-Psi persistent unit:
> **Two original fictional adult characters (Marcus & Elena) inside one persistent room (`main_room`) with canonical history that survives process restarts.**

---

## Key Achievements

1. **Deterministic Canonical Reality**:
   Authoritative world truth is stored independently of character perceptions or stochastic generation.
2. **Strict Observation & Belief Separation**:
   Characters learn events only if present or through direct inspection. Stale, false, or unknown beliefs exist without corrupting canonical reality.
3. **Cryptographic SHA-256 Event Ledger**:
   Append-only ledger with deterministic hash-chaining (`previous_event_hash` → `event_hash`).
4. **Bit-Exact Replay Engine**:
   Full state can be reconstructed from scratch by replaying events, matching active state digests bit-for-bit.
5. **Fail-Safe Contradiction Rejection**:
   Commands contradicting physical or historical commitments are rejected and produce zero state mutation.

---

## Quick Start & Commands

```bash
# Run tests
cd services/qpsi-engine
pytest

# Start API
python -m uvicorn qpsi_engine.api.main:app --reload --port 8000
```
