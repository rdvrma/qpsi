# Why Constant Two-Qubit Depth Did Not Guarantee Better Physical Fidelity: Lessons from a 156-Qubit Hardware-Aware Routing Study

**By the Q-Psi Research Team**  
*Published: August 18, 2026*  
*Hardware Platform: IBM Quantum (`ibm_marrakesh`, 156 Physical Qubits — Heron r2)*  
*IBM Quantum Job ID: `da1t22mg52gs73cm31i0`*  
*Raw Evidence Hash (SHA256): `6c8527a9854651585d5262b3c2399e612573906281ec030eef3be0005dbf83f0`*

---

## Executive Summary

In quantum circuit architecture, an intuitive design rule has guided dynamic circuit compiler optimizations: *reducing two-qubit gate depth should yield higher physical state fidelity*.

To test this assumption on state-of-the-art superconducting hardware, Q-Psi conducted a frozen hardware-aware routing experiment on IBM Quantum's 156-qubit Heron processor, **`ibm_marrakesh`**. We evaluated two competing implementations of a long-range CNOT gate across three physical distance cohorts:
1. **Unitary SWAP-based routing** (where two-qubit depth grew linearly: $13 \to 37 \to 73$)
2. **Dynamic mid-circuit measurement (MCM) & feed-forward routing** (where two-qubit depth remained constant: $\text{depth} = 2$ across all distances)

The empirical outcome provides an instructive lesson for quantum compilers: **despite a $36.5\times$ reduction in two-qubit depth at 13 hops, the dynamic implementation did not achieve higher Bell-state fidelity on current hardware**.

---

## The Two Routing Paradigms

When two entangled qubits are separated across a planar coupling lattice, a compiler must route quantum information across intervening physical qubits:

- **Unitary SWAP Routing**: Sequentially swaps quantum states along the coupling path. While conceptually simple, it incurs substantial gate depth:
  - **SHORT (3 hops)**: 2Q Depth = 13
  - **MEDIUM (7 hops)**: 2Q Depth = 37
  - **LONG (13 hops)**: 2Q Depth = 73
- **Dynamic MCM + Feed-Forward**: Utilizes ancilla qubits initialized in $|+\rangle$, parallel entangling gates, mid-circuit $Z$-basis measurements, and classically conditioned single-qubit corrections ($X$ and $Z$). Its two-qubit depth is constant:
  - **SHORT (3 hops)**: 2Q Depth = 2
  - **MEDIUM (7 hops)**: 2Q Depth = 2
  - **LONG (13 hops)**: 2Q Depth = 2

---

## Physical Measurements & Results

We executed 18 circuits with 1,024 shots each (18,432 physical shots, 10.5 seconds QPU runtime) to measure the resulting Bell-state fidelity $F$:

| Separation | Unitary 2Q Depth | Unitary Bell Fidelity $F_U$ | Dynamic 2Q Depth | Dynamic Bell Fidelity $F_D$ | $\Delta F = F_D - F_U$ (95% CI) | Empirical Winner |
|---|---|---|---|---|---|---|
| **SHORT (3H)** | 13 | **0.8618** | 2 | 0.8209 | **-0.0409** [-0.0635, -0.0181] | **UNITARY_WIN** |
| **MEDIUM (7H)** | 37 | **0.8135** | 2 | 0.7651 | **-0.0485** [-0.0747, -0.0225] | **UNITARY_WIN** |
| **LONG (13H)** | 73 | 0.6669 | 2 | 0.6356 | **-0.0314** [-0.0630, +0.0005] | **INCONCLUSIVE** |

### Why Did Unitary Routing Win?
Dynamic circuits replace two-qubit gates with mid-circuit readout and real-time classical feed-forward. On current physical architectures:
1. Mid-circuit measurement operations have non-negligible duration relative to qubit coherence times ($T_1, T_2$).
2. Idle spectator qubits incur dephasing during classical communication and branch latency.
3. Measurement readout infidelity directly corrupts classical feed-forward correction decisions.

As a result, the physical noise introduced by mid-circuit measurement exceeded the noise accumulated across 13 to 37 unitary two-qubit gates on the Heron architecture.

---

## Pre-QPU Calibration Modeling & Predictions

Prior to execution, Q-Psi's compiler evaluated a pre-QPU cost model incorporating backend calibration data and a pre-declared feed-forward latency penalty coefficient ($\lambda = 0.012$ per ancilla).

- **Pre-QPU Frozen Predictions**: SHORT $\to$ UNITARY, MEDIUM $\to$ UNITARY, LONG $\to$ UNITARY
- **Empirical Confirmation**: **2 / 2 statistically conclusive distances confirmed** (SHORT and MEDIUM; LONG was inconclusive and not counted).

---

## Critical Methodological Qualification

In accordance with our open-science commitments, we explicitly disclose that the latency coefficient $\lambda = 0.012$ was classified as a `PREDECLARED_HEURISTIC`. Post-hoc sensitivity analysis reveals:
- When $\lambda = 0$ (idealized zero-latency assumption), the model incorrectly predicts DYNAMIC wins across all distances.
- When $\lambda \ge 0.012$, the model correctly captures the physical penalty and predicts UNITARY wins.

The predictive success is therefore classified as **PARTIALLY ROBUST**, highlighting the necessity of calibrating real-time measurement duration in quantum compilation pipelines.

---

## Scientific Boundaries

1. **No Crossover Claimed**: The routing crossover was **NOT RESOLVED** at 13 hops. We do not interpolate an untested crossover distance.
2. **No Quantum Advantage Claimed**: This study is an empirical analysis of compiler routing tradeoffs on NISQ hardware.
3. **Prior Art Boundary**: Q-Psi evaluates compiler decision protocols and does not claim invention of dynamic circuit primitives.
