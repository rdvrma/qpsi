# M3 — Problem Formulation: QUBO & Ising Model

## Binary Decision Variables

For each scenario with 8 candidate transitions $C_0 \dots C_7$:
$$x_i \in \{0, 1\} \quad \text{for } i \in \{0, \dots, 7\}$$

Interpretation: $x_i = 1$ means candidate action $C_i$ is selected.

---

## Objective Function

$$E(x) = A \cdot \left(\sum_{i=0}^7 x_i - 1\right)^2 + \sum_{i=0}^7 \text{invalid\_penalty}_i \cdot x_i - B \cdot \sum_{i=0}^7 U_i \cdot x_i$$

Where:
- $A = 10.0$ (Dominating penalty for violating exactly-one constraint)
- $\text{invalid\_penalty}_i = 100.0$ if invalid, $0$ if valid
- $B = 1.0$ (Weight assigned to normalized soft utility score $U_i \in [0, 1]$)

---

## Ising Transformation

Variables are mapped via $x_i = \frac{1 - s_i}{2}$ to spin variables $s_i \in \{-1, +1\}$.
Energy equivalence is verified classically across all $2^8 = 256$ bitstrings ($E_{\text{QUBO}}(x) == E_{\text{Ising}}(s)$ within $10^{-6}$ numerical tolerance).
