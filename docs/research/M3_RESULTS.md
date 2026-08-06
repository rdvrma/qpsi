# M3 — Benchmark Results Summary

## Summary of Results (20 Scenarios, 1000 Shots, Seed 42)

| Metric | Exhaustive Baseline | QAOA (p=1) | QAOA (p=2) |
| :--- | :--- | :--- | :--- |
| **Exact Optimum Agreement Rate** | **100.0%** | 15.0% | **85.0%** |
| **Classical Validator Pass Rate** | **100.0%** | 30.0% | **100.0%** |
| **Mean Utility Regret** | **0.0000** | 0.4600 | **0.1333** |
| **Exactly-One Bitstring Rate** | N/A | 14.1% | **18.0%** |
| **Invalid Selection Rate** | **0.0%** | 70.0% | **0.0%** |

---

## Observations

1. **Depth Sensitivity**: QAOA $p=2$ drastically outperforms $p=1$, reaching 85.0% exact optimum agreement and 100.0% classical validator pass rate.
2. **Constraint Enforcement**: At depth $p=2$, hard invalid candidate selection drops to 0.0%, demonstrating the effectiveness of penalty coefficient $A=10.0$ and $P_{\text{invalid}}=100.0$.
3. **No Quantum Advantage**: Classical exhaustive search requires evaluating only $2^8 = 256$ states in $<0.01\text{s}$, whereas QAOA simulation requires parameter optimization over multiple sampling steps. QAOA is evaluated purely for candidate sampling research.
