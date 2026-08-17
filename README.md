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

- **Dynamic Bernstein-Vazirani Oracle Experiment**: **SUPPORTED**
  - Demonstrated bounded query-complexity advantage under single-shot Pokharel-Lidar sampling methodology on physical IBM quantum hardware ($\alpha_Q = 0.1532 \pm 0.0177$ vs classical baseline $\alpha_C = 0.6963$, $t = -30.65, p = 3.47 \times 10^{-7}$).
- **Q-Psi State-Space Compiler (Stage-6F)**: **INTEROPERABILITY PASS / COMPILER ADVANTAGE NOT YET ESTABLISHED**
  - Mapped discrete software repair interaction graphs from 8 programming ecosystems to QUBO/Ising Hamiltonians; recovered exact classical optimum on all tested instances with $N \le 10$ variables (4/4, 100%). Gate-depth noise degraded quality on $N \ge 18$. Compiler-specific quantum advantage over classical solvers is not yet established.
- **Restricted-Hamming-Weight Simon Experiment**: **SPEEDUP INCONCLUSIVE**
  - Constant-depth (15-16 layer) hardware-aware circuits executed across 16 to 56 physical qubits; exact period recovered on a subset of instances. Universal asymptotic speedup remains inconclusive on raw unmitigated hardware.
- **Mantra State Encoding**: **EXPLORATORY**
  - Deterministic SHA256 parameter mapping of text inputs onto 16-qubit entangled states generating distinct measured output distributions (TVD ~0.98-0.99). Zero metaphysical, causal, or consciousness claims.

*Note: Q-Psi does not claim general-purpose quantum computing supremacy.*

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
├── components/                 # UI, 3D WebGL Bloch Sphere & Visualization Components
├── content/                    # Structured Research Config, Manuscripts & Evidence
├── docs/                       # Historical Prototype Proof Logs & Baseline Architecture
├── public/                     # Static Web Assets & Social Previews
├── scripts/                    # Historical engine launch & test automation scripts
├── services/
│   └── qpsi-engine/            # Classical Reference State Engine Service
└── styles/                     # Deep Quantum Obsidian CSS Tokens & Global Styles
```

---

## Founder Background & Execution

Q-Psi was founded by **Nishant Kumar Sinha** (10+ years of software-business operations and execution). B.Tech studies in Computer Science & Engineering were discontinued in 3rd year (2009) to focus on systems engineering and technology entrepreneurship.

---

## Correspondence & Collaboration

For research collaboration, academic access, compiler evaluation inquiries, or licensing correspondence:
**Email**: `aadisatv@sattvaos.tech`
