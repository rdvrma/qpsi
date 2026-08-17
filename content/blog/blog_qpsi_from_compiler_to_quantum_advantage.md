# From Software-Repair Compilation to a Physical-QPU Quantum Advantage Experiment: What Q-Psi Tested, What Worked, and What Failed

**By the Q-Psi Research Team**  
*Published: August 17, 2026*  
*Hardware Platform: IBM Quantum (`ibm_marrakesh`, 156 Physical Qubits)*

---

## Introduction: Why Real Hardware Matters

At Q-Psi, our primary goal is developing automated state-space compilers for large-scale software repair. But in modern computer science, true scientific integrity requires taking algorithms out of idealized simulators and testing them directly on real, physical quantum hardware.

Over the past week, we executed four distinct experimental campaigns on IBM Quantum's 156-qubit Heron processor, **`ibm_marrakesh`**. We believe in radical transparency: in this public report, we share our exact measurements, mathematical audits, successes, and failure points.

---

## 1. Original Q-Psi Research: The State-Space Compiler on Physical Hardware

**IBM Quantum Job ID**: `da16h8ug52gs73cl8uog`  
**Raw Evidence SHA256**: `3f3b4c3982a267aa7fbf297adc4171ded2c8b1e24226a379df94bcfc53ac2783`  
**Physical Setup**: 8 ecosystem hardware cohort ($N = 5$ to $N = 25$ logical qubits), QAOA $p=1$, 16,384 total physical shots.

### What We Tested
We compiled authentic multi-repository repair search spaces from 8 major programming ecosystems (Python, TypeScript, Go, Rust, C/C++, Java, C#, PHP/Ruby) into discrete QUBO and Ising Hamiltonians:
$$E_{\text{QUBO}}(x) = \sum_i c_i x_i + \sum_{i < j} Q_{ij} x_i x_j$$
We then transpiled these Hamiltonians into QAOA $p=1$ circuits and executed them on `ibm_marrakesh`.

### What Worked
- **End-to-End Interoperability**: The complete compilation, bijective Ising mapping, QPU execution, and bitstring decoding pipeline succeeded across all 8 ecosystems (`PASS`).
- **Exact Parity on Small Instances ($N \le 10$)**: On all four instances with $\le 10$ variables (Go, TypeScript, Rust, Python), the physical QPU recovered the **exact global classical mathematical ground state** ($4/4$, 100.0%).

### What Failed & Why
- **Degradation at Scale ($N \ge 18$)**: On larger instances ($N = 18, 25$), dense candidate interaction graphs required up to 1,492 two-qubit CNOT/ECR gates during physical routing. On noisy intermediate-scale quantum (NISQ) hardware, accumulated gate infidelity and decoherence diluted the ground state probability.
- **Full Cohort Verdict**: Standard median energy gap across all 8 instances was **0.1250**. Full-cohort solution quality is classified as `WORSE_THAN_EXACT_CLASSICAL`.
- **Claim Boundary**: **No quantum advantage is claimed for the Q-Psi compiler.**

---

## 2. Independent Experiment: Dynamic Bernstein-Vazirani Query Advantage

**IBM Quantum Job ID**: `da1a03mg52gs73clcj80`  
**Reference**: B. Pokharel & D. A. Lidar, *Phys. Rev. Lett.* 130, 210602 (2023) [arXiv:2207.07647]  
**Physical Setup**: $n \in [4, 16]$ bits, 14 circuits, 28,672 physical shots.

### What We Tested
To independently evaluate physical algorithmic quantum speedup under a rigorous methodology, we implemented the single-shot dynamic Bernstein-Vazirani problem. In this setting, the hidden secret string $s^{(t)}$ updates on every single query.
- Classically, 1 query reveals 1 bit of parity, so the probability of guessing an $n$-bit string in 1 trial is $P_C(n) = 2^{-(n-1)}$, requiring $R_{99}^C(n) \propto 2^n = e^{n \ln 2}$ trials ($\alpha_C \approx 0.69315$).
- Quantumly, 1 query in uniform superposition evaluates all $n$ bits simultaneously. We protected the quantum circuits with CPMG Dynamical Decoupling ($X - X$ pulse padding on idle delays).

### Empirical Results

| $n$ | Secret String | Quantum WITH_DD Success Rate | Quantum $R_{99}^Q$ | Classical $R_{99}^C$ (Theory) |
|---|---|---|---|---|
| 4 | `1011` | **94.38%** | **2** | 35 |
| 6 | `110100` | **93.31%** | **2** | 146 |
| 8 | `10110010` | **79.88%** | **3** | 588 |
| 10 | `1101011001` | **64.89%** | **5** | 2,356 |
| 12 | `110100101011` | **48.63%** | **7** | 9,430 |
| 14 | `10110100110101` | **39.26%** | **10** | 37,724 |
| 16 | `1010110011010001` | **42.53%** | **9** | 150,900 |

### What We Observed
- **Classical Exponent**: $\alpha_C = \mathbf{0.6963} \pm 0.0005$
- **Quantum WITH_DD Exponent**: $\alpha_Q = \mathbf{0.1532} \pm 0.0177$ ($R^2 = 0.9373$)
- **Statistical Significance**: $t$-statistic = **$-30.6510$**, $p$-value = **$3.468 \times 10^{-7} \ll 0.001$**.
- **Public Claim**:
  > *"Q-Psi demonstrated quantum query-complexity advantage in a dynamic Bernstein-Vazirani oracle experiment on physical IBM quantum hardware using the adopted Pokharel-Lidar-style single-shot methodology."*

---

## 3. Follow-Up Research: Constant-Depth Restricted Simon Experiment

**IBM Quantum Job ID**: `da1a0piein7c73bd5beg`  
**Reference**: P. Singkanipa et al. (*Phys. Rev. A* / arXiv:2401.07934, 2024), arXiv:2604.27457  
**Physical Setup**: $n \in [8, 28]$ bits ($16$ to $56$ physical qubits), weights $w=2$ and $w=3$, 24,576 physical shots.

### What We Tested
We implemented constant-depth hardware-aware Simon circuits on registers up to 56 physical qubits to evaluate whether the classical exponential query lower bound $Q_C \ge \sqrt{2^n / \binom{n}{w}}$ could be beaten on raw hardware.

### What Happened (The Honest Truth)
- **Constant Depth Achieved**: On `ibm_marrakesh`, transpiled circuit depth was held constant at **15 layers** ($w=2$) and **16 layers** ($w=3$) across all 56 qubits.
- **Partial Period Recovery**: The classical $\mathbb{F}_2$ Gaussian elimination solver successfully recovered the exact hidden period on a subset of instances:
  - $w=2$: Exact recovery on $n=12, 24$ (Failed on $n=8, 16, 20, 28$).
  - $w=3$: Exact recovery on $n=8, 12, 16, 28$ (Failed on $n=20, 24$).
- **Integrity Finding**: Because noise caused linear solver failures on some instances, assigning a finite query count to failed instances was identified as a methodological defect during our post-hoc audit.
- **Verdict**: **INCONCLUSIVE**. Universal asymptotic speedup on raw unmitigated hardware is unsupported without measurement error mitigation.
- **Claim Boundary**: **No quantum advantage is claimed for Simon's problem on this unmitigated run.**

---

## 4. Exploratory Study: Mantra Quantum State Encoding

**IBM Quantum Job ID**: `da19q86g52gs73clcd7g`  
**Setup**: 16-qubit parameterized state encoding, 4 text inputs, 2,048 shots each.

We evaluated deterministic SHA-256 parameter mapping of four text inputs (`"OM MANI PADME HUM"`, shuffled control, random text, and empty control) onto 16-qubit entangled states. All four inputs produced nearly orthogonal probability distributions ($\text{Total Variation Distance} \approx 0.98 - 0.99$), demonstrating standard non-linear cryptographic parameter dispersion in Hilbert space.  
*Classification: Exploratory / For Fun. No metaphysical or consciousness claims.*

---

## Summary of Completed QPU Hardware Runs

| Experiment | Target QPU | Job ID | Qubits | Physical Shots | Outcome |
|---|---|---|---|---|---|
| **State Compiler (Stage-6F)** | `ibm_marrakesh` | `da16h8ug52gs73cl8uog` | 5–25 | 16,384 | Interoperability PASS ($N \le 10$ Parity) |
| **Dynamic Bernstein-Vazirani** | `ibm_marrakesh` | `da1a03mg52gs73clcj80` | 5–17 | 28,672 | Algorithmic Query Advantage ($p < 10^{-6}$) |
| **Restricted Simon** | `ibm_marrakesh` | `da1a0piein7c73bd5beg` | 16–56 | 24,576 | Execution Valid; Speedup Inconclusive |
| **Mantra State Encoding** | `ibm_marrakesh` | `da19q86g52gs73clcd7g` | 16 | 8,192 | Exploratory Mapping ($\text{TVD} \approx 0.99$) |

---

## Support the Q-Psi Research Fund

Q-Psi is an independent quantum research initiative of The Oneness Project. We publish what we test, including failed and inconclusive experiments. Our public research goal is **$50,000** to support physical-QPU experiments, compute, datasets, reproducibility work and research publication.

If you believe this work is worth continuing, support Q-Psi with any amount you consider appropriate.

### [SUPPORT Q-PSI RESEARCH](/support)

*(Contributions support open-source, reproducible quantum software research. Contributions do not purchase priority access, ownership, or guaranteed quantum advantage claims.)*
