# Q-Psi Experimental Observability & Reproducibility Benchmark

## Purpose
Provides reproducible, telemetry-backed scientific evidence for classical state-engine execution, event replay, restart recovery, and future candidate-state-search experiments using Weights & Biases Weave.

---

## Explicit Scientific Disclosures & Guarantees

1. **Not Canonical State**: W&B / Weave telemetry is strictly an external experiment-observability layer. It is **NOT** part of canonical world truth or event history.
2. **Optional & Fail-Safe**: Telemetry is **OFF by default** (`QPSI_WEAVE_ENABLED=false`). Absence of API keys, network outages, or telemetry initialization failures will **NEVER** block, break, or corrupt Q-Psi canonical engine operations.
3. **No Quantum Advantage Claimed**: Telemetry in the initial project (`q-psi/qpsi-classical-baseline`) records exact classical baseline performance. Future quantum or quantum-inspired search experiments must be evaluated against this mandatory classical baseline.
4. **Intentionally Rejected Contradiction Cases**: In the baseline workload, intentionally invalid/adversarial transitions (e.g. non-existent objects, unknown actors, unconnected rooms) are tested to verify that the engine correctly enforces physical state validity rules. Rejection of invalid transitions is an **engine invariant success**, not an engine failure. Metrics report **Expected Outcome Match Rate** (100% target).
5. **Environment-Dependent Latency**: Recorded transition latencies (`mean_transition_latency_ms`, `p95_transition_latency_ms`) are host-environment dependent. Deterministic state verification relies on bit-exact state digest matching (`final_state_digest`).
6. **Triple Reproducibility**: Bit-exact state determinism requires matching `scenario_id`, `engine_version`, and `git_commit_sha`.

---

## Local Setup & Benchmark Execution

### 1. Install Dependencies
```bash
cd services/qpsi-engine
pip install -e ".[dev]"
```

### 2. Authenticate (Optional)
Authenticate locally via W&B CLI or environment variable:
```bash
wandb login
# OR export WANDB_API_KEY="your_api_key"
```

### 3. Enable Telemetry & Configure Project (Optional)
Set environment variables:
```bash
export QPSI_WEAVE_ENABLED=true
export QPSI_WEAVE_PROJECT=q-psi/qpsi-classical-baseline
```
*(In PowerShell: `$env:QPSI_WEAVE_ENABLED="true"`, `$env:QPSI_WEAVE_PROJECT="q-psi/qpsi-classical-baseline"`)*

### 4. Run Classical Baseline Benchmark
```bash
python -m qpsi_engine.experiments.classical_baseline
```

---

## Benchmark Evidence & Metrics Schema (`classical-baseline-v1`)

- **Experiment & Scenario Schema**: `experiment_schema_version`, `scenario_id`, `scenario_version`, `engine_version`, `git_commit_sha`, `git_dirty`.
- **Validation Accuracy**: `total_transition_cases`, `expected_accept_count`, `expected_reject_count`, `actual_accept_count`, `actual_reject_count`, `unexpected_accept_count`, `unexpected_reject_count`, `expected_outcome_match_count`, `expected_outcome_match_rate`.
- **Engine Integrity & Determinism**: `replay_success`, `restart_recovery_success`, `integrity_success`, `digest_match`, `final_sequence_number`, `final_state_digest`.
- **Latency & Performance**: `total_runtime_ms`, `mean_transition_latency_ms`, `p95_transition_latency_ms` (environment-dependent).
