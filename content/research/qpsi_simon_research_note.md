# Q-Psi Research Note: Physical-QPU Restricted-Hamming-Weight Simon Experiment

## 1. Problem Formulation & Compilation
Following Singkanipa et al. (Phys. Rev. A / arXiv:2401.07934, 2024) and Singkanipa, Kasatkin & Lidar (arXiv:2604.27457), we implemented constant-depth hardware-aware Simon circuits on physical quantum hardware.

- **Problem**: Given a 2-to-1 function $f(x) = f(x \oplus s)$, determine the secret period $s$ where the Hamming weight is restricted to $w \in \{2, 3\}$.
- **Classical Lower Bound**: Finding a collision among a period subspace of size $\binom{n}{w}$ requires $Q_C(n, w) \ge \sqrt{\frac{2^n}{\binom{n}{w}}} \sim \mathcal{O}(2^{n/2})$.
- **Quantum Complexity**: Quantum measurements yield vectors $y$ with $y \cdot s \equiv 0 \pmod 2$. Collecting $n - 1$ linearly independent vectors solves $s$ via $\mathbb{F}_2$ Gaussian elimination in $Q_Q(n) = n + \mathcal{O}(1)$ queries.
- **Constant-Depth Circuit**: Using disjoint CNOT copies and reference-qubit phase entanglement, circuit depth is **15 layers** for $w=2$ and **16 layers** for $w=3$, independent of $n$ (from 16 to 56 physical qubits).

---

## 2. Hardware Execution & Job Details
- **Target Backend**: `ibm_marrakesh` (156 Physical Qubits, Heron Architecture)
- **IBM Quantum Job ID**: `da1a0piein7c73bd5beg`
- **Total Physical Shots**: 24,576 shots (12 circuits $\times$ 2,048 shots across $n \in [8, 28]$, using 16 to 56 physical qubits)

---

## 3. Physical Measurements & Period Recovery Audit

| Weight ($w$) | $n$ (Bits) | Physical Qubits ($2n$) | Transpiled Depth | Observed Queries | Classical Lower Bound ($Q_C$) | Period Recovery Status | Queries to Valid Solution |
|---|---|---|---|---|---|---|---|
| **$w = 2$** | 8 | 16 | 15 | 8 | 3.0 | `False` (Noise error) | **UNDEFINED** |
| **$w = 2$** | 12 | 24 | 15 | 14 | 7.9 | **`True` (Exact)** | **14** |
| **$w = 2$** | 16 | 32 | 15 | 16 | 23.4 | `False` (Noise error) | **UNDEFINED** |
| **$w = 2$** | 20 | 40 | 15 | 20 | 74.3 | `False` (Noise error) | **UNDEFINED** |
| **$w = 2$** | 24 | 48 | 15 | 24 | 246.6 | **`True` (Exact)** | **24** |
| **$w = 2$** | 28 | 56 | 15 | 27 | 842.7 | `False` (Noise error) | **UNDEFINED** |
| **$w = 3$** | 8 | 16 | 16 | 12 | 2.1 | **`True` (Exact)** | **12** |
| **$w = 3$** | 12 | 24 | 16 | 13 | 4.3 | **`True` (Exact)** | **13** |
| **$w = 3$** | 16 | 32 | 16 | 18 | 10.8 | **`True` (Exact)** | **18** |
| **$w = 3$** | 20 | 40 | 16 | 21 | 30.3 | `False` (Noise error) | **UNDEFINED** |
| **$w = 3$** | 24 | 48 | 16 | 23 | 91.0 | `False` (Noise error) | **UNDEFINED** |
| **$w = 3$** | 28 | 56 | 16 | 27 | 286.3 | **`True` (Exact)** | **27** |

---

## 4. Integrity Finding & Inconclusive Speedup Classification
- **Query Metric Integrity Finding**: In instances where Gaussian elimination failed to reconstruct the correct period $s$, the raw sample count at which matrix rank reached $n-1$ cannot scientifically represent "queries to solution". For failed instances, queries to solution is **undefined**.
- **Speedup Verdict**: `INCONCLUSIVE`. On raw unmitigated hardware, exact period recovery succeeded on 2/6 instances for $w=2$ and 4/6 instances for $w=3$. Because recovery was not achieved across all problem sizes, claiming universal asymptotic quantum advantage on this unmitigated run is scientifically unsupported.
- **Allowed Claim**:
  > *"Q-Psi executed constant-depth hardware-aware restricted Simon circuits on physical IBM quantum hardware and recovered the hidden period on a subset of instances up to 56 physical qubits. Universal asymptotic speedup on the raw hardware results remained inconclusive."*
