# Q-Psi Persistent World Engine — v0.1 Prototype Release Notes

Release Date: August 6, 2026  
Monorepo Tag: `v0.1.0-prototype`  

---

## What's Included

1. **M1 — Classical Reference State Engine**:
   - Deterministic canonical state engine with 3-level state separation (Canonical State, Belief Matrices, Relationship Graph).
   - Append-only SHA-256 event ledger and deterministic event replay engine.
   - Idempotent command processing and contradiction rejection.

2. **M2 — Live Persistent-State Prototype**:
   - Production Next.js 15 interface at `/prototype`.
   - 3-panel dashboard (Marcus, Persistent Room, Elena) showing real canonical state.
   - Isolated public demo visitor sessions (`sess_*` & `w_*`).
   - 60-second automated proof scenario with live step execution.
   - SHA-256 hash-chain integrity verification.

3. **M3 — Classical vs CUDA-Q Candidate-Transition Research**:
   - Reproducible research experiment package in `experiments/qpsi-transition-search`.
   - QUBO energy formulation ($A=10.0, B=1.0$) and Ising transformation.
   - Verified 256/256 computational bitstring energy equivalence ($100\%$ match within $10^{-6}$).
   - Classical baselines (exhaustive search, uniform random, valid-only random).
   - CUDA-Q QAOA kernel ($p=1, p=2$) with CPU simulator baseline (`qpp-cpu`).
   - Static research page at `/research/transition-search`.

4. **M4 — Security Audit & Release Hardening**:
   - Revoked compromised PAT, 0 secrets in repository history.
   - CI workflows for frontend, classical engine, and manual CUDA-Q container dispatch.
