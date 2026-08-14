# Q-Psi Scalable Classical Validation Benchmark Suite (100 → 1,000 Transitions)

## Purpose
Provides reproducible, deterministic scientific evidence for the **Q-Psi Classical Reference State Engine** under scaled workloads (100 to 1,000 state transitions), evaluating correctness, bit-exact replay integrity, restart recovery, and accepted-state equivalence.

---

## Explicit Scientific Disclosures & Guarantees

1. **No Quantum Advantage Claimed**: This benchmark evaluates classical persistent state engine scaling. No quantum advantage, production readiness, or commercial deployment is claimed.
2. **Intentional Contradiction Cases**: Adversarial validation workloads test invalid state transitions (e.g. non-existent objects, unknown actors, unconnected rooms, impossible inventory drops). Rejection of invalid commands is an **engine invariant success**, not an engine failure rate. Metrics measure **Scenario Validation Accuracy** (100% target).
3. **Accepted-State Equivalence**: In mixed workloads (interleaving valid and invalid transitions), rejected commands produce **zero state mutation**. The final canonical state digest of a mixed run matches bit-for-bit the digest of a run executing only the valid commands.
4. **Environment-Dependent Latency**: Transition latencies (`mean_transition_latency_ms`, `p50`, `p95`, `p99`) depend on host machine hardware. Bit-exact state verification relies on canonical SHA-256 state digests (`final_state_digest`).
5. **Two-Commit Reproducibility Model**: Evidence artifacts explicitly point back to `benchmark_code_commit_sha` (`490d89c7046d41d41770fba05da36d174c1099fd`), guaranteeing that benchmark code tested was 100% clean.

---

## Scenario Classes & Workload Composition

- **Happy-Path Continuity**: 100% valid state transitions. Verifies long sequences of state mutations remain coherent.
- **Adversarial Validation**: 100% intentionally invalid commands. Verifies engine validators consistently reject bad transitions.
- **Mixed Continuity**: 70% valid, 30% invalid transitions. Verifies state evolution under mixed input.

---

## Benchmark Results (Code Commit: `490d89c7`)

### 100-Transition Scale (`classical-benchmark-100-v1.json`)

| Scenario Class | Cases | Expected Match | Replay | Restart Recovery | Hash Integrity | Accepted-State Equivalence |
|---|---|---|---|---|---|---|
| **Happy-Path** | 100 | 100/100 (100%) | PASS | PASS | PASS | N/A |
| **Adversarial** | 100 | 100/100 (100%) | PASS | PASS | PASS | N/A |
| **Mixed** | 100 | 100/100 (100%) | PASS | PASS | PASS | **PASS** |

### 1,000-Transition Scale (`classical-benchmark-1000-v1.json`)

| Scenario Class | Cases | Expected Match | Replay | Restart Recovery | Hash Integrity | Accepted-State Equivalence |
|---|---|---|---|---|---|---|
| **Happy-Path** | 1000 | 1000/1000 (100%) | PASS | PASS | PASS | N/A |
| **Adversarial** | 1000 | 1000/1000 (100%) | PASS | PASS | PASS | N/A |
| **Mixed** | 1000 | 1000/1000 (100%) | PASS | PASS | PASS | **PASS** |

---

## Multi-Run Determinism Verification

3 consecutive runs of each benchmark scenario yielded **100% bit-for-bit identical final state digests**:
- `happy_path_100`: `ca15858cfd3d3876e537e224e756b10705f1f912e75eab3bdff037142aa7841c`
- `adversarial_100`: `2b167321f88ccfbe59dc8b8cb97883b880c34b862fce8a4377aacebb8f337a45`
- `mixed_100`: `668d89c1e90cc4cf557ba9533003884f3daefdf33e420487293b8deed350ab43`
- `happy_path_1000`: `cbfd50325d7efd29759bc430bfb9bf5cdfd7df5cc76dce2dd20bd58cfbc55a02`
- `adversarial_1000`: `b28dd1943eb6d5281736dc3230b05b38eddf30efadbbfeea7992fbcc4bd18171`
- `mixed_1000`: `21ab448a69e288ba2480909def56715fdf8b1a37c0ebcecf4bf099e2a87a2d48`

---

## Weights & Biases Remote Telemetry

Telemetry events published to project [`q-psi/qpsi-classical-baseline`](https://wandb.ai/q-psi/qpsi-classical-baseline):
- **Weave Trace Workspace**: [https://wandb.ai/q-psi/qpsi-classical-baseline/weave](https://wandb.ai/q-psi/qpsi-classical-baseline/weave)
- **1,000-Transition Adversarial Run**: [`run-b-adve-1000-fbdcfa`](https://wandb.ai/q-psi/qpsi-classical-baseline/runs/run-b-adve-1000-fbdcfa)
- **1,000-Transition Mixed Run**: [`run-b-mixe-1000-5ef10d`](https://wandb.ai/q-psi/qpsi-classical-baseline/runs/run-b-mixe-1000-5ef10d)
