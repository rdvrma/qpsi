# Short Paper Outline: Physical Demonstration of Algorithmic Query Advantage in Dynamic Bernstein-Vazirani

**Target Title**: *Experimental Demonstration of Algorithmic Query Advantage in Single-Shot Dynamic Bernstein-Vazirani on a 156-Qubit Superconducting Processor*  
**Authors**: Q-Psi Research Team  
**Status**: Publication-Oriented Outline (Pre-Submission Working Draft)

---

## Abstract
We present an experimental demonstration of an algorithmic quantum speedup for the dynamic single-shot Bernstein-Vazirani problem on IBM Quantum's 156-qubit Heron superconducting processor (`ibm_marrakesh`). By evaluating problem sizes $n \in [4, 16]$ with CPMG dynamical decoupling, we observe a measured Time-to-Solution scaling exponent of $\alpha_Q = 0.1532 \pm 0.0177$, compared to the theoretical classical lower bound of $\alpha_C = \ln 2 \approx 0.69315$. The scaling difference is statistically significant ($t = -30.6510, p = 3.468 \times 10^{-7}$), demonstrating a genuine oracle query-complexity advantage on physical hardware without relying on unproven complexity-theoretic conjectures.

---

## 1. Introduction
- Oracle query complexity as a foundational benchmark for algorithmic quantum advantage.
- The dynamic single-shot Bernstein-Vazirani problem formulation (Pokharel & Lidar, *Phys. Rev. Lett.* 130, 210602, 2023).

## 2. Experimental Design & Hardware Implementation
- Circuit construction: $n$ query qubits and 1 ancilla qubit in state $|-\rangle$.
- CPMG Dynamical Decoupling: $X - X$ pulse sequences applied to idle durations during multiqubit gates.
- Target hardware: `ibm_marrakesh` (156 Physical Qubits, Job ID `da1a03mg52gs73clcj80`).

## 3. Results & Scaling Analysis
- Scaling series: $n = 4, 6, 8, 10, 12, 14, 16$.
- Single-shot success probability $P_Q(n)$ with and without dynamical decoupling.
- Time-to-Solution $R_{99}(n) = \lceil \frac{\ln 0.01}{\ln(1 - P_Q(n))} \rceil$.
- Linear regression of $\ln(R_{99})$ vs. $n$:
  - Classical: $\alpha_C = 0.6963 \pm 0.0005$
  - Quantum (NO_DD): $\alpha_Q = 0.2086 \pm 0.0182$
  - Quantum (WITH_DD): $\alpha_Q = 0.1532 \pm 0.0177$
- Statistical hypothesis testing ($p = 3.468 \times 10^{-7}$).

## 4. Discussion & Scope
- Significance of physical demonstration on 156-qubit architecture.
- Oracle vs. practical computational speedup boundaries.

## 5. Data Availability
- Fully reproducible dataset and execution scripts.
