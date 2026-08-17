# Q-Psi Research Note: State Space Compiler QPU Execution (Stage-6F)

## 1. Overview & Mathematical Objective
The **Q-Psi State Space Compiler** compiles large software-repair search universes into discrete Hamiltonian optimization instances:
$$E_{\text{QUBO}}(x) = \sum_i c_i x_i + \sum_{i < j} Q_{ij} x_i x_j, \quad x_i \in \{0, 1\}$$
Using the exact bijective transformation $x_i = \frac{1 - Z_i}{2}$, each state space maps to an equivalent Ising Hamiltonian $H_{\text{Ising}}(Z) = \sum_i h_i Z_i + \sum_{i < j} J_{ij} Z_i Z_j + C_0$.

Under Milestone **Stage-6F**, authentic frozen compiled states from the 8-ecosystem hardware cohort were compiled to QAOA $p=1$ circuits and executed on real IBM Quantum hardware.

---

## 2. Hardware Execution & Job Details
- **Target Physical Backend**: `ibm_marrakesh` (156 Physical Qubits, Heron Architecture)
- **IBM Quantum Job ID**: `da16h8ug52gs73cl8uog`
- **Total Physical Shots**: 16,384 shots (2,048 shots $\times$ 8 ecosystem instances)
- **Raw Evidence Hash (SHA256)**: `3f3b4c3982a267aa7fbf297adc4171ded2c8b1e24226a379df94bcfc53ac2783`

---

## 3. Physical QPU Solution Quality & Subgroup Stratification

| Ecosystem | Repository | Logical Qubits ($N$) | Exact Classical Min $E$ | QPU Min $E$ | Energy Gap | QPU Feasible Rate | Hit Exact Classical Optimum | Comparison Outcome |
|---|---|---|---|---|---|---|---|---|
| **Go** | `tidwall/pretty` | 5 | -30.7000 | **-30.7000** | **+0.0000** | 98.3% | **YES** | `QPU_TIES_CLASSICAL_OPTIMUM` |
| **TypeScript** | `sindresorhus/open` | 8 | -28.4500 | **-28.4500** | **+0.0000** | 95.6% | **YES** | `QPU_TIES_CLASSICAL_OPTIMUM` |
| **Rust** | `smol-rs/blocking` | 9 | -16.7000 | **-16.7000** | **+0.0000** | 44.2% | **YES** | `QPU_TIES_CLASSICAL_OPTIMUM` |
| **Python** | `pytest-dev/pytest-timeout` | 10 | -21.4000 | **-21.4000** | **+0.0000** | 58.4% | **YES** | `QPU_TIES_CLASSICAL_OPTIMUM` |
| **C/C++** | `boostorg/circular_buffer` | 18 | -14.7500 | **-14.5000** | **+0.2500** | 7.9% | NO | `QPU_LOSES_CLASSICAL_OPTIMUM` |
| **PHP/Ruby** | `doctrine/persistence` | 25 | -13.0000 | **-10.5000** | **+2.5000** | 2.7% | NO | `QPU_LOSES_CLASSICAL_OPTIMUM` |
| **Java** | `FasterXML/jackson-annotations` | 25 | -19.0000 | **-12.5000** | **+6.5000** | 0.05% | NO | `QPU_LOSES_CLASSICAL_OPTIMUM` |
| **C#** | `nodatime/nodatime` | 25 | -17.5000 | **+inf** | **+inf** | 0.0% | NO | `QPU_LOSES_CLASSICAL_OPTIMUM` |

---

## 4. Key Findings & NISQ Boundary
1. **Exact Parity on Small Instances ($N \le 10$)**: On all four instances with $\le 10$ variables, the physical QPU recovered the exact global classical mathematical ground state (4/4, 100.0%).
2. **Degradation on Larger Instances ($N \ge 18$)**: On instances with 18 to 25 variables, two-qubit gate count and circuit depth increased substantially (up to 1,492 CNOT/ECR gates), leading to gate infidelity and decoherence that prevented recovery of feasible ground states.
3. **Full Cohort Verdict**: Standard median energy gap is **0.1250**. Full-cohort solution quality is `WORSE_THAN_EXACT_CLASSICAL`.
4. **Compiler Interoperability**: `PASS`. The software-repair compiler state space was successfully mapped, transpiled, executed, and decoded on physical quantum hardware.

---

## 5. Scope & Scientific Claim
- **Allowed Claim**:
  > *"Q-Psi compiler states were successfully mapped to QUBO/Ising Hamiltonians and executed on a physical IBM Quantum processor, recovering the exact classical optimum on all four tested instances with 10 or fewer logical variables."*
- **Explicit Boundary**: No quantum advantage is claimed for the Q-Psi compiler over classical optimization.
