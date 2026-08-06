# M3 — Classical vs CUDA-Q Candidate-Transition Research Acceptance Evidence Log

**Milestone Name**: M3 — Classical vs CUDA-Q Candidate-Transition Research  
**Authoritative Monorepo**: `https://github.com/rdvrma/qpsi.git`  
**Git Branch**: `feature/qpsi-cudaq-transition-research`  
**Base Commit**: `ea3ef0707023c7bc49005474f80c5997bcab1f51`  
**Date of Execution**: August 6, 2026  

---

## 1. Experimental Environment

- **OS**: Windows 11 / WSL2 Linux container environment
- **Python Version**: 3.14.5 (Host) / 3.12-slim (Container)
- **CUDA-Q Target**: `qpp-cpu` (CPU simulator baseline)
- **GPU Availability**: False (CPU simulator baseline verified)
- **QAOA Depths**: $p=1$ and $p=2$
- **Shots**: 1,000 shots
- **Fixed Seed**: 42

---

## 2. Test Verification Summary

- **M1 Backend Baseline**: 23/23 pytest passed (`services/qpsi-engine`)
- **M2 Frontend Baseline**: 12/12 static Next.js pages compiled (`npm run build`)
- **M2 Playwright E2E**: 3/3 tests passed (`npx playwright test`)
- **M3 Research Package Tests**: 7/7 pytest passed (`experiments/qpsi-transition-search`)
- **QUBO / Ising 256-State Equivalence**: 256/256 states verified ($100\%$ match within $10^{-6}$ tolerance)

---

## 3. Benchmark Execution Summary

- **Scenarios Evaluated**: 20 deterministic synthetic scenarios
- **QAOA p=1 Exact Optimum Agreement**: 15.0%
- **QAOA p=2 Exact Optimum Agreement**: 85.0%
- **QAOA p=1 Classical Pass Rate**: 30.0%
- **QAOA p=2 Classical Pass Rate**: 100.0%
- **Mean Utility Regret (p=1)**: 0.4600
- **Mean Utility Regret (p=2)**: 0.1333
- **Execution Time**: 5.90 seconds
- **SHA-256 Checksum Manifest**: `artifacts/MANIFEST.json`

---

## Acceptance Gate Verdict

> **MILESTONE M3 ACCEPTED — SIMULATOR RESEARCH VERIFIED**  
> All 35 acceptance criteria satisfied, 20 scenarios evaluated across $p=1$ and $p=2$, 256 state QUBO/Ising equivalence verified, zero quantum advantage claims made, M1/M2 regression suites clean.
