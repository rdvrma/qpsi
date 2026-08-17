# Q-Psi Quantum Research Overview: Physical-QPU Evidence & Benchmark Suite

## Executive Summary
This document provides a comprehensive, evidence-backed overview of the physical Quantum Processing Unit (QPU) research conducted by the **Q-Psi Initiative**. All experiments were executed on real superconducting quantum hardware via **IBM Quantum** (specifically the 156-qubit Heron-architecture backend **`ibm_marrakesh`**).

In accordance with strict open-science integrity principles, we publish all raw measurement hashes, IBM runtime job IDs, audit trails, and negative/inconclusive findings alongside positive demonstrations.

---

## 1. Research Streams Summary

| Research Stream | Physical Backend | IBM Job ID | Physical Register | Primary Outcome | Formal Status / Claim |
|---|---|---|---|---|---|
| **1. Q-Psi State Space Compiler (Stage-6F)** | `ibm_marrakesh` (156Q) | `da16h8ug52gs73cl8uog` | 5 to 25 Qubits | End-to-end QUBO/Ising mapping and physical execution across 8 ecosystems. Exact classical ground state matched on 4/4 instances for $N \le 10$. High gate-depth noise degraded quality on $N \ge 18$. Full cohort standard median energy gap: 0.1250. | **QPU Interoperability: PASS**<br>Full-Cohort Quality: WORSE_THAN_EXACT_CLASSICAL<br>Compiler Quantum Advantage: **NO** |
| **2. Dynamic Bernstein-Vazirani Experiment** | `ibm_marrakesh` (156Q) | `da1a03mg52gs73clcj80` | 5 to 17 Qubits | Implemented single-shot dynamic BV protocol ($n \in [4, 16]$). Classical scaling exponent $\alpha_C = 0.6963$, Quantum WITH_DD exponent $\alpha_Q = 0.1532$ ($t = -30.6510, p = 3.468 \times 10^{-7}$). | **Algorithmic Query Advantage: SUPPORTED**<br>(Adopted Pokharel-Lidar single-shot sampling methodology) |
| **3. Restricted-Hamming-Weight Simon Experiment** | `ibm_marrakesh` (156Q) | `da1a0piein7c73bd5beg` | 16 to 56 Qubits | Constant-depth hardware-aware circuits ($w=2, 3$). Recovered hidden periods on a subset of instances up to 56 physical qubits ($n=28$). Unmitigated measurement noise caused linear solver failures on remaining instances. | **Physical Execution: VALID**<br>Query Metric on Failed Runs: INVALID<br>Universal Speedup: **INCONCLUSIVE**<br>Simon Quantum Advantage: **NO** |
| **4. Exploratory Mantra Quantum Encoding** | `ibm_marrakesh` (156Q) | `da19q86g52gs73clcd7g` | 16 Qubits | Deterministic SHA256 parameter mapping of 4 distinct text inputs onto 16-qubit entangled states. Pairwise TVD $\approx 0.98 - 0.99$. | **Label: EXPLORATORY / FOR FUN**<br>No metaphysical or causal claims |

---

## 2. Scientific Claim Boundaries

### Supported Public Claims
1. **Compiler Interoperability**: *"Q-Psi compiler states were successfully mapped to QUBO/Ising Hamiltonians and executed on a physical IBM Quantum processor, recovering the exact classical optimum on all four tested instances with $\le 10$ variables."*
2. **Dynamic BV Query Advantage**: *"Q-Psi demonstrated quantum query-complexity advantage in a dynamic Bernstein-Vazirani oracle experiment on physical IBM quantum hardware using the adopted Pokharel-Lidar-style single-shot methodology."*
3. **Simon Constant-Depth Execution**: *"Q-Psi executed constant-depth hardware-aware restricted Simon circuits on physical IBM quantum hardware and recovered the hidden period on a subset of instances up to 56 physical qubits. Universal asymptotic speedup on the raw hardware results remained inconclusive."*

### Explicitly Excluded Claims
- **NO Compiler Quantum Advantage**: The Q-Psi state compiler does not claim quantum speedup over classical solvers for software repair.
- **NO Simon Quantum Advantage**: The restricted Simon run on raw unmitigated hardware does not constitute a proven quantum advantage due to inconclusive scaling on noisy instances.
- **NO Commercial or General Supremacy**: Oracle query-complexity separations are structural computational properties and do not imply commercial or general-purpose compute supremacy.
