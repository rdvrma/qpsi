# M2 — Live Persistent-State Prototype Documentation

## Executive Overview

Milestone 2 (**M2 — Live Persistent-State Prototype**) connects the verified M1 classical reference state engine to the Q-Psi Next.js web application. It delivers a live, interactive, public/preview prototype interface accessible at `/prototype`.

---

## Key Features & Capabilities

1. **Isolated Visitor Sessions**:
   - Every visitor receives a cryptographically random, opaque session ID (`sess_<token>`) linking to an isolated demo world (`w_<token>`).
   - Actions taken by one visitor do not contaminate or mutate another visitor's state or event ledger.

2. **3-Panel Canonical Dashboard**:
   - **Marcus Panel**: Location, inventory, and subjective belief matrix.
   - **Persistent Room Panel**: Canonical object surfaces (`book`, `key`, `glass`), sequence number, and state digest.
   - **Elena Panel**: Location, inventory, and subjective belief matrix.

3. **60-Second Automated Proof Suite**:
   - Executes the 7-step validation sequence against real backend API endpoints step-by-step.
   - Shows live state updates, contradiction rejection, reload from persistence, event replay, and SHA-256 hash-chain integrity verification.

4. **Zero Fake Events or Hard-coded Fallbacks**:
   - The interface renders real API responses exclusively. If the engine backend is offline, the interface displays an honest offline status without mock data.

5. **PostgreSQL & Container Readiness**:
   - Database layer supports `DATABASE_URL` environment variables for PostgreSQL deployments, while retaining in-memory SQLite support for local unit tests.
