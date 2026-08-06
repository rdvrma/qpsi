# M3 — Research Charter: Candidate-Transition Selection

## Hypothesis & Null Hypothesis

- **Hypothesis**: “A bounded QAOA implementation may produce valid or high-utility candidate samples for a small transition-selection QUBO.”
- **Null Hypothesis**: “The CUDA-Q method provides no meaningful quality or performance improvement over simple classical methods for this bounded problem.”

---

## Scope & Bounded Question

“Given several possible next actions for two characters in one persistent room, can a CUDA-Q QAOA-based experiment produce useful candidate samples under explicit continuity and validity constraints?”

---

## Scientific Principles & Non-Goals

1. **No Quantum Advantage Claim**: The experiment does NOT claim quantum speedup, quantum supremacy, or superiority over classical exhaustive search.
2. **Authority of Classical Validator**: CUDA-Q outputs are treated exclusively as candidate proposals. The classical Q-Psi validator remains the sole authority for committing events to canonical history.
3. **No Direct Ledger Commits**: CUDA-Q results never directly mutate canonical world state.
