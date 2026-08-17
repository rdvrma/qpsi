# Paper Outline: Compilation of Repository State Spaces to Quantum Processing Units

**Target Title**: *Compilation of Repository State Spaces to Quantum Processing Units: Interoperability, Quadratic Mapping, and NISQ Scaling Boundaries*  
**Authors**: Q-Psi Research Team  
**Status**: Publication-Oriented Outline (Pre-Submission Working Draft)

---

## Abstract
We present a formal compiler pipeline that maps large software-repair search spaces into discrete quadratic unconstrained binary optimization (QUBO) and Ising Hamiltonians suitable for execution on physical Quantum Processing Units (QPUs). We evaluate the compiler across an 8-ecosystem cohort on IBM Quantum's 156-qubit Heron superconducting processor (`ibm_marrakesh`). We demonstrate successful end-to-end execution and exact ground-state recovery on instances with $\le 10$ logical variables, while characterizing the NISQ scaling boundary where physical gate-depth noise degrades solution quality on instances with 18–25 variables.

---

## 1. Introduction & Related Work
- The software repair state space explosion problem.
- Mapping combinatorial search problems to Ising spin glasses and QUBO formulations.
- Prior work on QAOA, VQE, and NISQ benchmarking.

## 2. Compiler Architecture & State-Space Formulation
- State representation: Candidate files, interaction evidence, and linear/quadratic cost derivation.
- Mathematical mapping: Analytical bijection $x_i = \frac{1 - Z_i}{2}$ and Hamiltonian construction.
- Anti-leakage quarantine and compiler determinism.

## 3. Physical QPU Execution & Transpilation
- Target architecture: IBM Quantum 156-qubit heavy-hex coupling topology (`ibm_marrakesh`).
- Transpilation strategies: Routing dense 25-variable interaction graphs onto heavy-hex layouts.
- Parameter optimization: Classical COBYLA optimization of QAOA $(\gamma, \beta)$ angles on noiseless simulators prior to hardware execution.

## 4. Empirical Evaluation & Hardware Results
- 8-ecosystem hardware cohort ($N = 5$ to $N = 25$ logical variables).
- Exact classical ground state reference computed via deterministic branch-and-bound.
- Sub-cohort stratification:
  - Small instances ($N \le 10$): Exact classical parity ($4/4$ instances, $100.0\%$ ground state recovery).
  - Larger instances ($N \ge 18$): Quality degradation and energy gap analysis.
- Full cohort standard median energy gap: $0.1250$.

## 5. Discussion & Future Work
- The role of compiler-aware graph decomposition in reducing two-qubit gate depth.
- Next-generation error mitigation and error-suppressed compilation (Stage-6G).

## 6. Data Availability
- Full raw measurement files, cryptographic hashes, and verification scripts available openly in the Q-Psi repository.
