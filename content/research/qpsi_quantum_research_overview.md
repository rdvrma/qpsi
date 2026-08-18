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
| **4. Compiler-Enabled Grover Query Advantage (v1.1)** | `ibm_marrakesh` (156Q) | `da1c7rkdedkc73eqs5mg` | 4 to 16 States (2 to 4 Qubits) | Candidate-state search executed across 9 frozen software repair cases at N=4, 8, 16. Quantum effective queries beat classical expected cost in 9/9 cases and 3/3 problem sizes. N=16 95% CI upper bound 7.360 < 8.5. | **Compiler Query Advantage: SUPPORTED**<br>(Black-box verifier query model)<br>General Runtime Advantage: **NOT ESTABLISHED** |
| **5. Hardware-Aware Dynamic Routing Study (v1.0)** | `ibm_marrakesh` (156Q) | `da1t22mg52gs73cm31i0` | 3 Physical Distances (3, 7, 13 Hops) | Evaluated unitary SWAP routing vs dynamic MCM feed-forward routing. Dynamic maintained constant 2Q depth (depth=2 vs 13, 37, 73), but unitary won Bell fidelity on SHORT (0.8618 vs 0.8209) and MEDIUM (0.8135 vs 0.7651). LONG was inconclusive (0.6669 vs 0.6356). Pre-QPU model correctly predicted 2/2 conclusive distances. | **Compiler Routing Signal: SUPPORTED WITH QUALIFICATION**<br>(Predeclared latency heuristic; Crossover not resolved)<br>Quantum Advantage: **NO** |
| **6. Exploratory Mantra Quantum Encoding** | `ibm_marrakesh` (156Q) | `da19q86g52gs73clcd7g` | 16 Qubits | Deterministic SHA256 parameter mapping of 4 distinct text inputs onto 16-qubit entangled states. Pairwise TVD $\approx 0.98 - 0.99$. | **Label: EXPLORATORY / FOR FUN**<br>No metaphysical or causal claims |

---

## 2. Scientific Claim Boundaries

### Supported Public Claims
1. **Compiler Interoperability**: *"Q-Psi compiler states were successfully mapped to QUBO/Ising Hamiltonians and executed on a physical IBM Quantum processor, recovering the exact classical optimum on all four tested instances with $\le 10$ variables."*
2. **Dynamic BV Query Advantage**: *"Q-Psi demonstrated quantum query-complexity advantage in a dynamic Bernstein-Vazirani oracle experiment on physical IBM quantum hardware using the adopted Pokharel-Lidar-style single-shot methodology."*
3. **Simon Constant-Depth Execution**: *"Q-Psi executed constant-depth hardware-aware restricted Simon circuits on physical IBM quantum hardware and recovered the hidden period on a subset of instances up to 56 physical qubits. Universal asymptotic speedup on the raw hardware results remained inconclusive."*
4. **Compiler-Enabled Grover Query Advantage**: *"Q-Psi demonstrated compiler-enabled quantum query advantage for candidate-state search on physical quantum hardware under a black-box verifier model."*
5. **Hardware-Aware Compiler Routing Signal**: *"On a frozen three-distance physical IBM Heron benchmark, Q-Psi's pre-QPU routing model correctly predicted the winning long-range CNOT implementation on both statistically conclusive tested distances (SHORT and MEDIUM). The dynamic implementation maintained constant two-qubit depth, but did not achieve higher Bell-state fidelity within the tested cohort."*

### Explicitly Excluded Claims
- **NO Compiler General Runtime Advantage**: The Q-Psi state compiler does not claim wall-clock speedup or general end-to-end software-repair advantage over classical algorithms.
- **NO Simon Quantum Advantage**: The restricted Simon run on raw unmitigated hardware does not constitute a proven quantum advantage due to inconclusive scaling on noisy instances.
- **NO Dynamic Circuit Superiority**: Dynamic circuits did not outperform unitary SWAP routing in measured physical Bell-state fidelity on current hardware.
- **NO Commercial or General Supremacy**: Oracle query-complexity separations are structural computational properties and do not imply commercial or general-purpose compute supremacy.
