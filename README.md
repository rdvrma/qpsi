# Q-Psi

**Independent quantum compiler and physical-QPU research program.**

Q-Psi is an independent quantum research program conducting physical-QPU experiments, state-space compiler research, and reproducible evidence audits on superconducting quantum processors.

- **Compiler Provenance Record**: [Cryptographic Provenance Receipt (V1.1)](docs/provenance/QPSI_COMPILER_PROVENANCE_V1_1_2026_08_18.md) | [Machine-Readable JSON](public/research/qpsi_compiler_provenance_v1_1.json) | [Historical V1 Receipt](docs/provenance/QPSI_COMPILER_PROVENANCE_2026_08_18.md)

- **Primary Physical Backend**: `ibm_marrakesh` (IBM Heron r2, 156 programmable qubits)
- **Authoritative Research Freeze**: `2026-08-18` (Commit `be74ad05187e148e2fc52309f4d7f57be3784157`)
- **Public Research Website**: [https://qpsi.sattvaos.tech](https://qpsi.sattvaos.tech)
- **Parent Initiative**: The Oneness Project

---

## What Q-Psi Investigates

Q-Psi investigates how classical computational problems are compiled into quantum-executable representations and evaluated on physical quantum hardware:

- **Compiler-Generated State Spaces**: Translating discrete search universes and multi-file interaction graphs into candidate quantum representations.
- **Quantum-Ready Search Representations**: Formulating black-box oracle interfaces and Grover amplitude amplification circuits with zero rank bias or ground-truth leakage.
- **Physical-QPU Validation**: Executing transpiled and pulse-scheduled circuits directly on superconducting QPUs without post-hoc cherry-picking.
- **Hardware-Aware Compilation**: Evaluating dynamic vs. unitary routing, calibration-aware qubit placement, and pulse-level fractional gate lowering on heavy-hex processor topologies.
- **Mid-Circuit Measurement & Qubit Reuse**: Exploiting temporal program liveness to execute larger logical algorithms on compact physical register subsets.
- **Execution Policy Optimization**: Selective Pauli twirling and mitigation-overhead management on beta hardware features.
- **Quantum-Assisted Data Generation**: Sampling structured combinatorial spaces on physical QPUs and filtering candidates through classical executable verifiers to generate verified datasets.

---

## Research at a Glance

All metrics are derived from the frozen master evidence audit:

| Metric | Audited Value | Note |
|---|---|---|
| **Total Physical Shots** | **564,840** | Executed across all audited physical campaigns |
| **Production QPU Jobs** | **16** | Audited on IBM Quantum physical infrastructure |
| **Completed Audited Families** | **14** | Formally frozen with independent statistical reproduction |
| **Primary Processor** | **IBM Heron r2** | `ibm_marrakesh` (156 programmable qubits) |
| **Cumulative Quantum Runtime** | **259.38 seconds** | Active QPU execution time reported by IBM Runtime |
| **Cryptographic Seal Integrity** | **100.0%** | All raw results locked with SHA-256 digests |

*Note: Reported quantum seconds reflect cumulative hardware execution time, not a metric of algorithmic quality or scientific advantage.*

---

## Lead Evidence

| Research Program | Claim ID | Audited Status | Physical Evidence (Heron r2) | Bounded Result | Evidence Link |
|---|---|---|---|---|---|
| **Compiler + Grover Query Advantage** | `CLAIM_COMPILER_GROVER_QUERY_ADVANTAGE` | **SUPPORTED** | 18,432 shots<br>Job `da1c7rkdedkc73eqs5mg` | Physical query reduction of **2.43x** ($N=4$), **1.73x** ($N=8$), and **1.19x** ($N=16$) across 9/9 cases and 3/3 sizes under a black-box verifier model. | [Research Note](https://qpsi.sattvaos.tech/research/compiler-grover-query-advantage) |
| **Dynamic Bernstein–Vazirani** | `CLAIM_DYNAMIC_BV_QUERY_ADVANTAGE` | **SUPPORTED** | 28,672 shots<br>Job `da1a03mg52gs73clcj80` | Scaling exponent $\alpha_Q = 0.1532$ vs classical $\alpha_C = 0.6963$ ($t = -30.65, p < 10^{-6}$) across $N=4..16$ qubits. | [Research Note](https://qpsi.sattvaos.tech/research/dynamic-bv) |
| **MCM Qubit Reuse** | `CLAIM_MCM_QUBIT_REUSE_WIDTH_REDUCTION` | **SUPPORTED WITH QUALIFICATION** | 24,576 shots<br>Job `da1u0om3kjvs738777cg` | Median **78.1%** physical register width reduction (up to 87.5% on 16 logical qubits mapped to 2 physical slots) with 6/6 non-inferior observable fidelity on streaming circuits. | [Research Note](https://qpsi.sattvaos.tech/research/mcm-qubit-reuse) |
| **Quantum Data Foundry V2** | `CLAIM_DATA_FOUNDRY_V2_120QSEC_FEASIBILITY` | **SUPPORTED WITH QUALIFICATION** | 332,768 shots<br>4 QPU Jobs (127.58s) | 65,138 unique QPU-selected candidate states converted by executable verifiers into **93 unique verified repair records** (1.59 MB, ~417k token-equivalent) with 100% QPU provenance. | [Data Foundry Page](https://qpsi.sattvaos.tech/research/data-foundry) |
| **MQT Cross-Compiler Benchmark** | `CLAIM_MQT_CROSS_COMPILER_BENCHMARK` | **MIXED COMPETITIVENESS** | 36,864 shots<br>Job `da1ul7e3kjvs73877tag` | 18/18 valid compilations. Qiskit held small aggregate fidelity advantage ($-0.0067$ delta); apparent TKET aggregate advantage ($+0.0398$ delta) was driven by `vqe_su2_n8` (shifts to $-0.0062$ when omitted). | [Research Note](https://qpsi.sattvaos.tech/research/mqt-cross-compiler) |

---

## What Has NOT Been Established

Scientific integrity requires stating explicit negative boundaries:

- **No General Quantum Advantage**: Q-Psi has NOT established universal quantum advantage or computational supremacy for arbitrary software repair or general-purpose classical computing.
- **No General Compiler Superiority**: Q-Psi has NOT demonstrated universal compiler superiority over established industrial toolchains (Qiskit, TKET).
- **No Wall-Clock Runtime Speedup**: Measured query advantages do not imply end-to-end wall-clock speedup when classical compilation, network latency, and QPU queue times are included.
- **No Tested LLM Fine-Tuning Improvements**: The Quantum Data Foundry V2 experiment demonstrated pipeline feasibility. Downstream LLM fine-tuning, benchmark evaluation, and code repair accuracy improvements were **NOT TESTED**.
- **No Completed Multi-Backend Ranking**: The planned multi-backend retargeting study (`QPSI_MULTI_BACKEND_SELECTION_V1`) was prepared as a protocol but was not executed on physical hardware; it is excluded from completed campaign totals.

---

## Secondary & Negative Technical Findings

Q-Psi publishes and preserves negative, mixed, and boundary comparator results:

- **Calibration-Aware Layout vs. Qiskit (`NOT SUPPORTED`)**: Against Qiskit O3 best-of-8 seeds, Q-Psi layout achieved 1 win, 2 losses, 3 inconclusive (mean delta $-0.0106$). Preserved as a negative comparator baseline.
- **Dynamic Routing Crossover (`SUPPORTED WITH QUALIFICATION`)**: Dynamic ancilla routing compressed two-qubit gate depth from 73 to 2 on 13 hops, but reset and measurement noise prevented a physical Bell-fidelity crossover over unitary routing.
- **Fractional Gate Lowering (`MIXED / INCONCLUSIVE`)**: Structural pulse duration reduction yielded 2 physical wins and 4 inconclusive cases on IBM Heron.
- **Directed Execution Selection (`MIXED / INCONCLUSIVE`)**: Reduced randomized compilation overhead by 58.9% with 1 win vs. raw baseline, but selective-vs-full non-inferiority was inconclusive.
- **Restricted Simon Algorithm (`MIXED / INCONCLUSIVE`)**: Secret periods recovered on 6/12 instances ($N=8..28$) with polynomial query reductions, but decoherence on larger registers prevented establishing asymptotic physical speedup.
- **Stage 6F Physical Optimization (`SUPPORTED WITH QUALIFICATION`)**: Achieved 4/4 exact classical optimum hits on small compiler graphs ($N \le 10$), degrading on $N=18..25$ under unmitigated NISQ error.

---

## State-Space Compiler

The **Q-Psi State-Space Compiler** operates in three layers:

```
┌────────────────────────────────────────────────────────┐
│ 1. State-Space Construction                            │
│    Extracts discrete candidate state universes from    │
│    complex multi-file repository interaction graphs.   │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. Quantum-Ready Search & Oracle Interface             │
│    Maps state spaces to permutation-invariant black-box│
│    verifier interfaces and Grover/QAOA representations.│
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ 3. Hardware-Aware Execution Research                   │
│    Applies qubit reuse, dynamic routing, pulse lowering│
│    and selective twirling for physical QPU execution.  │
└────────────────────────────────────────────────────────┘
```

*The core Q-Psi State-Space Compiler implementation remains proprietary and closed-source.* Independent researchers evaluate the compiler via the **Q-Psi Research Capsule**.

---

## Quantum Data Foundry

The **Quantum Data Foundry** tests whether physical quantum processors can act as structured state selectors for generating verified software datasets:

$$\text{Repository Bug Universe } (2^{16} = 65,536) \xrightarrow{\text{QPU Sampling}} 65,138 \text{ States} \xrightarrow{\text{Classical Verifiers}} 93 \text{ Verified Records}$$

- **Current Bottleneck**: **Classical verification throughput** (158 evaluated of 65k QPU states).
- **Provenance**: 100.0% (93/93) records exhibit exact cryptographic and bitstring match to QPU physical measurement samples.
- **Scope**: Proof-of-concept pipeline feasibility only; no training advantage claimed.

---

## Research Capsule Access

Researchers, academic laboratories, and quantum computing groups may request access to evaluate the Q-Psi compiler on their own eligible workloads:

- **Access Model**: Support-based research access rather than a fixed public research-license price.
- **Evaluation Licenses**: Non-commercial, controlled, and issued only after research support is confirmed.
- **Commercial Licensing**: Enterprise deployment, integration, and commercial licensing inquiries: `aadisatv@sattvaos.tech`

---

## Reproducibility & Scientific Evidence

All public claims are anchored to immutable cryptographic artifacts:

1. **Pre-QPU Freeze**: Protocols, circuit definitions, and analysis scripts were committed to Git prior to QPU submission.
2. **Raw Result Sealing**: Raw IBM Quantum execution manifests and bitstring counts are sealed with SHA-256 checksums.
3. **Automated Recomputation**: 14/14 automated Python verification scripts deterministically reproduce all reported values from raw data.
4. **Negative Result Preservation**: Falsifying comparator results are published alongside positive findings.

Public audit registries:
- [`public/research/qpsi_public_claims_v2.json`](https://qpsi.sattvaos.tech/research/qpsi_public_claims_v2.json)
- [`public/research/qpsi_master_evidence_registry.json`](https://qpsi.sattvaos.tech/research/qpsi_master_evidence_registry.json)

---

## Research Notes & Publications

- [Compiler-Enabled Quantum Query Advantage on Physical Quantum Hardware](https://qpsi.sattvaos.tech/research/compiler-grover-query-advantage)
- [Dynamic Bernstein–Vazirani Single-Shot Advantage](https://qpsi.sattvaos.tech/research/dynamic-bv)
- [Mid-Circuit Measurement and Qubit Reuse Compilation](https://qpsi.sattvaos.tech/research/mcm-qubit-reuse)
- [Quantum-Assisted Data Foundry Architecture](https://qpsi.sattvaos.tech/research/data-foundry)
- [MQT Bench Cross-Compiler Evaluation](https://qpsi.sattvaos.tech/research/mqt-cross-compiler)
- [Hardware-Aware Dynamic Routing on IBM Heron](https://qpsi.sattvaos.tech/research/dynamic-routing-crossover)
- [Fractional Pulse Gate Lowering on Heron r2](https://qpsi.sattvaos.tech/research/fractional-gate-lowering)
- [Calibration-Aware Layout Negative Comparator Study](https://qpsi.sattvaos.tech/research/calibration-aware-layout)
- [Directed Execution & Selective Twirling](https://qpsi.sattvaos.tech/research/directed-execution)
- [Restricted Simon Constant-Depth Physical Study](https://qpsi.sattvaos.tech/research/restricted-simon)

---

## Research Support & Funding

- **Founder-Funded Research to Date**: USD $9,850
- **Public Research Fund Goal**: USD $50,000
- **Direct Research Support**: [PayPal Support Link](https://www.paypal.com/ncp/payment/8FW5GHBJGG9AA)
- **Correspondence**: `aadisatv@sattvaos.tech`

---

## Proprietary / Source Boundary

- **Public Repository (`rdvrma/qpsi`)**: Contains the public research website, scientific figures, formal research notes, verified evidence indices, public claims registries, and open-science documentation.
- **Private Compiler (`qpsi-data-compiler`)**: Contains the proprietary Q-Psi State-Space Compiler engine, internal heuristics, raw calibration pipelines, and private datasets.
