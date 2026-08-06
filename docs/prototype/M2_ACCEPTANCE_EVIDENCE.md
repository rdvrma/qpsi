# M2 — Live Persistent-State Prototype Acceptance Evidence Log

**Milestone Name**: M2 — Live Persistent-State Prototype  
**Authoritative Monorepo**: `https://github.com/rdvrma/qpsi.git`  
**Git Branch**: `feature/qpsi-live-prototype`  
**Date of Execution**: August 6, 2026  

---

## Environment & Tool Verification

| Environment / Component | Version / Status |
| :--- | :--- |
| **OS** | Windows 11 Home (x64) |
| **Python Runtime** | Python 3.14.5 (Target container: Python 3.12-slim) |
| **Node.js** | v24.16.0 |
| **Next.js** | v15.5.22 |
| **FastAPI / SQLAlchemy** | FastAPI 0.115.6, SQLAlchemy 2.0.51 |
| **Test Suites** | Pytest (23 tests passing), Next.js Build (11/11 static pages) |
| **Code Verification** | Ruff (0 errors), Mypy (0 errors in 36 source files) |

---

## 1. Backend Verification Log

```bash
$ $env:PYTHONPATH="src"; python -m ruff check src tests; python -m mypy src; python -m pytest
All checks passed!
Success: no issues found in 36 source files
============================= test session starts =============================
collected 23 items

tests\integration\test_api.py ........                                   [ 34%]
tests\unit\test_engine_core.py ...............                           [100%]

======================== 23 passed, 1 warning in 0.85s ========================
```

---

## 2. Frontend Build Verification Log

```bash
$ npm run build
   ▲ Next.js 15.5.22
   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of types
 ✓ Generating static pages (11/11)
```

---

## 3. Playwright / End-to-End Verification

- Prototype Route `/prototype`: Accessible & functional.
- 60-Second Proof Scenario: Executed via `QPsiApiClient.runProof()` with verdict `ACCEPTED`.
- Contradiction Rejection: Verified (`STATE_CONTRADICTION`, 0 state mutation).
- Session Isolation: Verified (2 independent browser sessions receive distinct isolated worlds; action in Session 1 does not alter Session 2 state).
- Hash Chain Integrity & Event Replay: Verified.

---

## Acceptance Gate Verdict

> **MILESTONE M2 ACCEPTED**  
> All 23 backend tests passed, static analysis clean, session isolation verified, 60-second proof scenario executed live against FastAPI backend, Next.js build compiled 11/11 pages cleanly, remote Git URL clean of secrets.
