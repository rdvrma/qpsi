# M3 — Classical Baselines: Exhaustive & Random Search

## 1. Exhaustive Optimum (Authoritative Baseline)

- Evaluates all 8 candidates exhaustively against the M1 classical validator.
- Filters out hard-invalid actions.
- Selects the valid action with maximum normalized soft utility $U_i$.
- Compute cost for 8 candidates: $2^8 = 256$ computational states. Search is trivial and exact.

## 2. Uniform Random Baseline

- Selects one candidate uniformly at random among $C_0 \dots C_7$ using fixed seeds.

## 3. Valid-Only Random Baseline

- Selects one candidate uniformly at random among only valid candidates using fixed seeds.
