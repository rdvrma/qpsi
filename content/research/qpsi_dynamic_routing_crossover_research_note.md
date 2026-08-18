# Q-Psi Research Note: Physical IBM Heron Dynamic Routing Crossover Study

**Experiment Identifier**: `QPSI_DYNAMIC_ROUTING_CROSSOVER_V1`  
**Target Backend**: `ibm_marrakesh` (IBM Heron r2, 156 programmable qubits)  
**IBM Quantum Job ID**: `da1t22mg52gs73cm31i0`  
**Protocol Commit**: `4d7a59229525259a6ae4adcd4e85a22e41bb187f` (Frozen at `2026-08-18T03:27:01Z`)  
**Job Submission Timestamp**: `2026-08-18T03:27:02.529154Z`  
**Raw Results SHA256**: `6c8527a9854651585d5262b3c2399e612573906281ec030eef3be0005dbf83f0`  
**Total Physical Shots**: 18,432 (18 circuits $\times$ 1,024 shots)  
**Actual QPU Usage**: 10.5 seconds  
**Final Scientific Status**: `COMPILER_ROUTING_SIGNAL_SUPPORTED_WITH_QUALIFICATION`

---

## 1. Executive Summary & Research Question

In quantum circuit compilation for superconducting architectures with fixed nearest-neighbor connectivity, long-range multi-qubit entangling gates (such as a long-range CNOT between distant physical qubits) require non-local routing. Compilers traditionally implement non-local routing via **Unitary SWAP chains**, which consume multiple SWAP gates, substantially increasing two-qubit gate depth and accumulating two-qubit gate errors.

With modern dynamic circuit support, compilers can alternatively implement long-range entangling gates via **Dynamic Mid-Circuit Measurement (MCM) and Classical Feed-Forward**, using shared ancilla chains to teleport entanglement in constant two-qubit gate depth ($\text{depth} = 2$) regardless of topological distance.

### Research Question
Can a pre-QPU calibration-aware compiler decision model correctly predict whether unitary SWAP-based routing or dynamic feed-forward routing will yield higher physical Bell-state fidelity on current physical hardware across different distance cohorts?

---

## 2. Known Prior Art vs. Q-Psi Contribution Boundary

To ensure rigorous open-science integrity, we clearly demarcate the scientific boundary:

### What Q-Psi Does NOT Claim:
- Q-Psi does **not** claim invention of dynamic circuits, mid-circuit measurement, classical feed-forward, entanglement teleportation, measurement-based entangling gates, or SWAP routing algorithms. These are established concepts in quantum information literature.
- Q-Psi does **not** claim general quantum advantage or general predictive compiler superiority from this experiment.

### Q-Psi Contribution Under Evaluation:
- A frozen pre-QPU calibration-aware compiler routing decision model that predicts the winning implementation for long-range CNOT operations based on backend calibration snapshots.
- A physical-QPU hardware evaluation across three distance cohorts on a 156-qubit IBM Heron processor (`ibm_marrakesh`).

---

## 3. Two Routing Implementations & Circuit Depths

The experiment tested two distinct routing arms for executing a long-range CNOT gate between control qubit $Q_{\text{ctrl}}$ and target qubit $Q_{\text{tgt}}$ separated by $H$ physical hops along a linear coupling path on `ibm_marrakesh`:

1. **Unitary SWAP-Based Routing**:
   - Transpiled using sequential nearest-neighbor SWAP gates to move the control state to the target, execute the local CNOT, and SWAP back.
   - Two-qubit gate count and circuit depth scale linearly with physical separation:
     - **SHORT (3 hops)**: Two-qubit depth = **13**
     - **MEDIUM (7 hops)**: Two-qubit depth = **37**
     - **LONG (13 hops)**: Two-qubit depth = **73**

2. **Dynamic MCM / Feed-Forward Routing**:
   - Transpiled using ancilla qubits initialized in $|+\rangle$, parallel local CNOTs, mid-circuit $Z$-basis measurements, and classically conditioned single-qubit Pauli corrections ($X$ and $Z$).
   - Two-qubit gate depth is constant across all topological distances:
     - **SHORT (3 hops)**: Two-qubit depth = **2**
     - **MEDIUM (7 hops)**: Two-qubit depth = **2**
     - **LONG (13 hops)**: Two-qubit depth = **2**

---

## 4. Physical Hardware Measurements & Results

Each circuit prepared a physical Bell state $|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}$ between the separated control and target qubits. Physical Bell fidelity $F$ was evaluated through parity and Pauli correlation measurements with 1,024 shots per circuit (18 circuits, 18,432 total physical shots on `ibm_marrakesh`).

### Physical Bell Fidelities by Cohort

| Distance Cohort | Topological Hops | Unitary 2Q Depth | Unitary Bell Fidelity $F_U$ (95% CI) | Dynamic 2Q Depth | Dynamic Bell Fidelity $F_D$ (95% CI) | $\Delta F = F_D - F_U$ (95% CI) | Empirical Verdict |
|---|---|---|---|---|---|---|---|
| **SHORT** | 3 hops | 13 | **0.8618** [0.8462, 0.8770] | 2 | **0.8209** [0.8032, 0.8379] | **-0.0409** [-0.0635, -0.0181] | **UNITARY_WIN** |
| **MEDIUM** | 7 hops | 37 | **0.8135** [0.7959, 0.8311] | 2 | **0.7651** [0.7461, 0.7842] | **-0.0485** [-0.0747, -0.0225] | **UNITARY_WIN** |
| **LONG** | 13 hops | 73 | **0.6669** [0.6450, 0.6890] | 2 | **0.6356** [0.6128, 0.6582] | **-0.0314** [-0.0630, +0.0005] | **INCONCLUSIVE** |

### Key Modern-Hardware Findings:
1. **Constant Two-Qubit Depth Did Not Guarantee Higher Fidelity**: Although dynamic routing preserved a constant two-qubit depth of 2 (compared to depth 73 in unitary at 13 hops), unitary routing achieved statistically superior Bell-state fidelity on both SHORT and MEDIUM distances.
2. **Crossover Remained Unresolved**: At 13 hops (LONG), the fidelity difference $\Delta F = -0.0314$ has a 95% confidence interval spanning zero ($[-0.0630, +0.0005]$). The physical routing crossover was **NOT RESOLVED**. We do not interpolate or assume an untested crossover point.

---

## 5. Pre-QPU Model Predictions & Confirmation

The compiler evaluated a pre-QPU cost model using backend calibration data prior to job submission.

- **Frozen Pre-QPU Predictions**:
  - SHORT (3 hops): **UNITARY**
  - MEDIUM (7 hops): **UNITARY**
  - LONG (13 hops): **UNITARY**
- **Physical Conclusive Results**:
  - SHORT: **UNITARY_WIN** (Confirmed)
  - MEDIUM: **UNITARY_WIN** (Confirmed)
  - LONG: **INCONCLUSIVE** (Not counted)
- **Model Confirmation Score**: **2 / 2 statistically conclusive tested distances**

---

## 6. Critical Qualification: Feed-Forward Latency Provenance & Sensitivity

A critical methodological qualification must be stated transparently:

The pre-QPU routing cost model included an explicit feed-forward latency penalty coefficient:
$$\lambda = 0.012 \text{ per ancilla}$$
- **Audit Classification**: `PREDECLARED_HEURISTIC`
- **Provenance**: The coefficient was pre-declared and frozen before physical execution, but was not directly exposed as an authoritative real-time calibration field from the backend API.

### Post-Hoc Sensitivity Analysis
To assess how sensitive the pre-QPU predictions were to this parameter, we evaluated the model across a wide spectrum of $\lambda$ values:

| Latency Coefficient $\lambda$ | SHORT (3 Hops) Prediction | MEDIUM (7 Hops) Prediction | LONG (13 Hops) Prediction |
|---|---|---|---|
| $\lambda = 0.000$ (Zero penalty) | DYNAMIC | DYNAMIC | DYNAMIC |
| $\lambda = 0.003$ | DYNAMIC | DYNAMIC | DYNAMIC |
| $\lambda = 0.006$ | DYNAMIC | DYNAMIC | UNITARY |
| $\lambda = 0.009$ | DYNAMIC | UNITARY | UNITARY |
| $\lambda = 0.012$ (**Frozen Benchmark Model**) | **UNITARY** | **UNITARY** | **UNITARY** |
| $\lambda = 0.015$ | UNITARY | UNITARY | UNITARY |
| $\lambda = 0.020$ | UNITARY | UNITARY | UNITARY |

- **Sensitivity Verdict**: `PARTIAL ROBUSTNESS`. The predictive success on the conclusive distances relied on the presence of a non-zero mid-circuit latency penalty ($\lambda \ge 0.012$).

---

## 7. Freeze & Audit Integrity

- **Protocol Freeze Commit**: `4d7a59229525259a6ae4adcd4e85a22e41bb187f` (`2026-08-18T03:27:01Z`)
- **QPU Submission Timestamp**: `2026-08-18T03:27:02.529154Z`
- **Audit Verification Results**:
  - `RAW_SEAL_VALID`: **YES**
  - `PROTOCOL_PRE_QPU_FROZEN`: **YES**
  - `PRE_QPU_PREDICTIONS_FROZEN`: **YES**
  - `POST_FREEZE_SCIENTIFIC_MUTATION`: **NO**

---

## 8. Authorized Public Claim & Scientific Boundaries

### Authorized Public Claim:
> *"On a frozen three-distance physical IBM Heron benchmark, Q-Psi's pre-QPU routing model correctly predicted the winning long-range CNOT implementation on both statistically conclusive tested distances. The dynamic implementation maintained constant two-qubit depth, but did not achieve higher Bell-state fidelity within the tested cohort. The routing crossover remained unresolved, and the predictive result depends partly on a predeclared mid-circuit latency heuristic; no general predictive-compiler or quantum-advantage claim is made."*

### Explicitly Excluded Claims:
- **NO Quantum Advantage**: This study does not demonstrate or claim quantum advantage.
- **NO Dynamic Circuit Superiority**: Dynamic circuits did not outperform unitary SWAP routing within the tested physical cohort.
- **NO Crossover Claim**: A physical crossover was not resolved on the tested hardware.
- **NO General Predictive Compiler Claim**: The model is evaluated on a targeted three-distance benchmark and requires further calibration integration.
