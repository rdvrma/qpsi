# Q-Psi — Persistent World Engine Monorepo

Official authoritative repository for **Q-Psi (Persistent World Engine)**, built for an ambitious deep-tech research initiative led by **Nishant Kumar Sinha** (Director, Darkcloud Infosystems Pvt. Ltd.).

This repository is the single authoritative monorepo containing:
1. The live Next.js Q-Psi website;
2. The **M1 Classical Reference State Engine** (`services/qpsi-engine`);
3. Technical documentation and acceptance evidence (`docs/prototype`);
4. Prototype automation scripts (`scripts/`);
5. Docker prototype orchestration (`docker-compose.prototype.yml`).

---

## Technical Stack & Services

### Website Frontend
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS + Vanilla CSS tokens (`#050505`, `#F5F5F2`, `#D8D8D2`, `#111111`)
- **Animation & Motion**: Framer Motion
- **Deployment**: Vercel (`https://qpsi.vercel.app`)

### Classical State Engine (`services/qpsi-engine`)
- **Framework**: Python 3.14 + FastAPI + Pydantic v2 + SQLAlchemy 2.0
- **Database**: Persistent SQLite (`qpsi_world.db`)
- **Ledger**: SHA-256 append-only cryptographic event hash chain
- **Testing**: `pytest` (20 automated tests) + `ruff` + `mypy`

---

## Quick Start — Running & Testing Engine

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

## Monorepo Directory Layout

```
├── app/                        # Next.js 15 Website Frontend
├── components/                 # UI & Visualization Components
├── content/                    # Structured Site Config & Copy
├── docs/                       # Monorepo Documentation & Prototype Proof Logs
│   └── prototype/              # Architecture, Limits, M1 Engine & Acceptance Evidence
├── lib/                        # Website utilities
├── public/                     # Static assets & Investor Deck PDF
├── scripts/                    # Engine launch & test automation scripts
├── services/
│   └── qpsi-engine/            # M1 Classical Reference State Engine Service
├── styles/                     # CSS design tokens & global styles
└── docker-compose.prototype.yml# Production container orchestration for engine
```

---

## Truthfulness & Disclosure Guidelines

- **Pre-Prototype Status**: Q-Psi is an idea-stage deep-tech research initiative. No working commercial Q-Psi product or paying customer is claimed today.
- **Quantum Claims**: Quantum methods are evaluated strictly as experimental candidate search backends against a mandatory classical baseline. No quantum advantage is claimed.
- **Founder Background**: Nishant Kumar Sinha has 10+ years of software-business execution experience at Darkcloud Infosystems Pvt. Ltd. He discontinued his CSE B.Tech in 3rd year (2009) to pursue technology entrepreneurship. He is not described as a quantum scientist or completed degree holder.

---

## License & Copyright

© 2026 Q-Psi / Darkcloud Infosystems Pvt. Ltd. All rights reserved.
