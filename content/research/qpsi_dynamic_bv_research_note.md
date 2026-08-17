# Q-Psi Research Note: Physical-QPU Dynamic Bernstein-Vazirani Experiment

## 1. Problem Formulation & Methodology
In the single-shot dynamic Bernstein-Vazirani problem (Pokharel & Lidar, *Phys. Rev. Lett.* 130, 210602, 2023), an unknown $n$-bit secret string $s \in \{0, 1\}^n$ updates after every single oracle query.

- **Classical Complexity**: A classical player querying 1 bit of parity per round has success probability bounded by $P_C(n) = 2^{-(n-1)}$. The number of trials required to achieve 99% confidence is $R_{99}^C(n) = \lceil \frac{\ln 0.01}{\ln(1 - 2^{-(n-1)})} \rceil \approx 4.605 \times 2^{n-1} \propto 2^n = e^{n \ln 2}$, with theoretical scaling slope $\alpha_C = \ln 2 \approx 0.69315$.
- **Quantum Complexity**: A single quantum query evaluates all $n$ bits simultaneously in superposition. On noisy physical hardware, success probability decays as $P_Q(n) \approx (1 - \epsilon)^n \approx e^{-cn}$, yielding $R_{99}^Q(n) = \lceil \frac{\ln 0.01}{\ln(1 - P_Q(n))} \rceil \propto e^{cn}$.
- **Algorithmic Quantum Advantage**: Defined by a statistically significant difference in scaling slopes: $\alpha_Q < \alpha_C$.

---

## 2. Hardware Execution & Setup
- **Target Backend**: `ibm_marrakesh` (156 Physical Qubits, Heron Architecture)
- **IBM Quantum Job ID**: `da1a03mg52gs73clcj80`
- **Total Physical Shots**: 28,672 shots (14 circuits $\times$ 2,048 shots across $n \in [4, 16]$)
- **Error Mitigation**: CPMG Dynamical Decoupling ($X - X$ pulse sequence on idle intervals)

---

## 3. Physical Measurements & Time-to-Solution Data

| $n$ (Bits) | Secret String | Quantum NO_DD ($P_Q$) | Quantum WITH_DD ($P_Q$) | Quantum WITH_DD $R_{99}^Q$ | Classical $P_C = 2^{-(n-1)}$ | Classical $R_{99}^C$ Repetitions |
|---|---|---|---|---|---|---|
| **$n = 4$** | `1011` | 91.55% | **94.38%** | **2** | $1.250 \times 10^{-1}$ | 35 |
| **$n = 6$** | `110100` | 82.32% | **93.31%** | **2** | $3.125 \times 10^{-2}$ | 146 |
| **$n = 8$** | `10110010` | 71.48% | **79.88%** | **3** | $7.813 \times 10^{-3}$ | 588 |
| **$n = 10$** | `1101011001` | 54.69% | **64.89%** | **5** | $1.953 \times 10^{-3}$ | 2,356 |
| **$n = 12$** | `110100101011` | 38.87% | **48.63%** | **7** | $4.883 \times 10^{-4}$ | 9,430 |
| **$n = 14$** | `10110100110101` | 24.51% | **39.26%** | **10** | $1.221 \times 10^{-4}$ | 37,724 |
| **$n = 16$** | `1010110011010001` | 15.23% | **42.53%** | **9** | $3.052 \times 10^{-5}$ | 150,900 |

---

## 4. Regression & Statistical Analysis
- **Classical Scaling**: $\alpha_C = \mathbf{0.6963} \pm 0.0005$ ($\approx \ln 2$)
- **Quantum NO_DD Scaling**: $\alpha_Q(\text{NO\_DD}) = \mathbf{0.2086} \pm 0.0182$ ($R^2 = 0.9635$)
- **Quantum WITH_DD Scaling**: $\alpha_Q(\text{WITH\_DD}) = \mathbf{0.1532} \pm 0.0177$ ($R^2 = 0.9373$)
- **Statistical Significance ($t$-test vs Classical)**:
  - $t$-statistic = **$-30.6510$**
  - $p$-value = **$3.468 \times 10^{-7} \ll 0.001$**

---

## 5. Scope & Scientific Boundaries
- **Protocol Qualification**: In hardware batch execution, single-shot success probabilities were evaluated over 2,048 single-shot samples on representative pre-frozen random secret strings per size.
- **Allowed Claim**:
  > *"Q-Psi demonstrated quantum query-complexity advantage in a dynamic Bernstein-Vazirani oracle experiment on physical IBM quantum hardware using the adopted Pokharel-Lidar-style single-shot methodology."*
