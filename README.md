# Q-Psi — Independent Quantum Research

Q-Psi is an independent quantum research initiative of The Oneness Project.

Focus areas:
- physical-QPU experiments
- quantum compiler research
- reproducible evidence
- algorithmic/query-complexity experiments
- publication of positive, negative and inconclusive results

---

## Current Q-Psi Research

Q-Psi investigates quantum computational architectures by executing transpiled and compiled quantum circuits directly on physical superconducting quantum processors (IBM Quantum Heron architecture: `ibm_marrakesh`, 156 programmable qubits).

### Quantum Claim Boundaries

All empirical claims are bound to explicit verification artifacts, cryptographic SHA256 hashes, and IBM Quantum job IDs:

- **Q-Psi State-Space Compiler + Grover (v1.1)**: **QUERY ADVANTAGE — SUPPORTED**
  - Demonstrated compiler-enabled quantum query advantage for candidate-state search on physical quantum hardware (`ibm_marrakesh`, 156 programmable qubits) under an opaque black-box verifier model across 9/9 individual cases and 3/3 problem sizes ($N=4, 8, 16$). At $N=16$, the 95% Wilson confidence interval upper bound on effective quantum queries ($7.360$) remained strictly below the classical expected search baseline of $8.5$ queries (IBM Job ID: `da1c7rkdedkc73eqs5mg`, 18,432 physical shots, SHA256: `8f65edbe0cea3ffdc16f3ff89b07beaf6ab111019a556c1cde56b274c0e18ff2`).
- **Dynamic Bernstein-Vazirani Oracle Experiment**: **QUERY ADVANTAGE — SUPPORTED**
  - Demonstrated bounded query-complexity advantage under single-shot Pokharel-Lidar sampling methodology on physical IBM quantum hardware ($\alpha_Q = 0.1532 \pm 0.0177$ vs classical baseline $\alpha_C = 0.6963$, $t = -30.65, p = 3.47 \times 10^{-7}$; IBM Job ID: `da1a03mg52gs73clcj80`, 28,672 physical shots).
- **Q-Psi State-Space Compiler (Stage-6F)**: **INTEROPERABILITY PASS**
  - Mapped discrete software repair interaction graphs from 8 programming ecosystems to QUBO/Ising Hamiltonians; recovered exact classical optimum on all tested instances with $N \le 10$ variables (4/4, 100%). Gate-depth noise degraded quality on $N \ge 18$. End-to-end runtime quantum advantage over classical software-repair pipelines is not claimed.
- **Restricted-Hamming-Weight Simon Experiment**: **SPEEDUP INCONCLUSIVE**
  - Constant-depth (15-16 layer) hardware-aware circuits executed across 16 to 56 physical qubits; exact period recovered on a subset of instances. Universal asymptotic speedup remains inconclusive on raw unmitigated hardware (IBM Job ID: `da1a0piein7c73bd5beg`, 24,576 physical shots).
- **Mantra State Encoding**: **EXPLORATORY**
  - Deterministic SHA256 parameter mapping of text inputs onto 16-qubit entangled states generating distinct measured output distributions (TVD ~0.98-0.99). Zero metaphysical, causal, or consciousness claims (IBM Job ID: `da19q86g52gs73clcd7g`, 8,192 physical shots).

*Note: Q-Psi does not claim general-purpose quantum computing supremacy, commercial advantage, or wall-clock runtime speedup.*

---

## Research Support & Funding Disclosures

- **Parent Initiative**: The Oneness Project
- **Sibling Initiative**: SattvaOS (Governed Intelligence / AI)
- **Founder-Funded Research to Date**: USD $9,850
- **Public Research Fund Goal**: USD $50,000
- **Authoritative Contact**: `aadisatv@sattvaos.tech`
- **Live Research Support**: [https://www.paypal.com/ncp/payment/8FW5GHBJGG9AA](https://www.paypal.com/ncp/payment/8FW5GHBJGG9AA)

---

## Prior Research: Persistent World Engine

Prior to expanding into physical-QPU compilation and query-complexity benchmarks, Q-Psi developed a classical reference state engine for persistent reality modeling (the "Persistent World Engine").

The reference engine prototype demonstrates canonical state persistence across process restarts using an append-only SQLite ledger with SHA256 event-hash chaining.

### Running the Historical Classical Engine

```bash
# 1. Run Classical Reference State Engine API (Port 8000)
powershell ./scripts/run-prototype.ps1
# bash ./scripts/run-prototype.sh

# 2. Run Automated Test Suite (20 tests, ruff, mypy)
powershell ./scripts/test-prototype.ps1
# bash ./scripts/test-prototype.sh

# 3. Docker Prototype Container Setup
docker-compose -f docker-compose.prototype.yml up --build
```

---

## Public Repository Layout

```
├── app/                        # Next.js 15 Quantum Research Website
├── components/                 # UI, Scientific Figures & Visualization Components
├── content/                    # Structured Research Config, Manuscripts & Evidence
├── docs/                       # Historical Prototype Proof Logs & Baseline Architecture
├── public/                     # Static Web Assets & Social Previews
├── scripts/                    # Historical engine launch & test automation scripts
├── services/
│   └── qpsi-engine/            # Classical Reference State Engine Service
└── styles/                     # Scientific Editorial CSS Tokens & Global Styles
```

---

## Founder Background & Execution

Q-Psi was founded by **Nishant Kumar Sinha** (10+ years of software-business operations and execution). B.Tech studies in Computer Science & Engineering were discontinued in 3rd year (2009) to focus on systems engineering and technology entrepreneurship.

---

## Correspondence & Collaboration

For research collaboration, academic access, compiler evaluation inquiries, or licensing correspondence:
**Email**: `aadisatv@sattvaos.tech`
