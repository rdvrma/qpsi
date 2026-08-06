# Q-Psi — Persistent World Engine

Official website repository for **Q-Psi (Persistent World Engine)**, built for an ambitious, idea-stage deep-tech research initiative led by **Nishant Kumar Sinha** (Director, Darkcloud Infosystems Pvt. Ltd.).

---

## Technical Stack & Frameworks

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Vanilla CSS design tokens (`#050505`, `#F5F5F2`, `#D8D8D2`, `#111111`, `#777777`, `rgba(255,255,255,0.14)`)
- **Animation & Motion**: [Framer Motion](https://www.framer.com/motion/) (Scroll-driven timelines, cinematic fragment disappearance, state ledger animation)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Vercel / Netlify / Node server

---

## Key Features & Visualizations

1. **Cinematic Hero Sequence**: Word fragment disappearance animation (`IDENTITY`, `MEMORY`, `RELATIONSHIPS`, `OBJECTS`, `HISTORY`, `CONSEQUENCES`), QΨ mark reveal, and live canonical ledger stream.
2. **Continuity Failure Matrix**: 4-mode diagnostic switcher (Identity Drift, Memory Failure, Environmental Reset, Narrative Reset) comparing stateless generative models vs. Q-Psi state OS.
3. **Two-Character Atom Simulator**: Interactive 1-room 2-character state machine with live "Commit Event" interactive simulator appending events to an immutable canonical ledger.
4. **8-Stage Expansion Stepper**: Interactive progression from 2-character room to persistent digital civilization.
5. **How Q-Psi Works**: 9-node system pipeline from Director Intent → AI Bridge → State Program → Candidate Futures → Runtime → Validator → Ledger → Memory → Materialization.
6. **Quantum Benchmark Matrix**: Toggle between Classical Baseline (deterministic reference) and Quantum Experiment (CUDA-Q simulation) with strict no-hype disclosures.
7. **8 Monetization Models**: Interactive cards with early B2B planning ranges ($1K–$10K/mo).
8. **Concentric Market Opportunity**: Source-backed market valuation table and concentric ring visualization.
9. **Execution Roadmap**: Dynamic milestones M0–M10 categorized by status (`COMPLETED`, `IN_PROGRESS`, `PLANNED`, `DEPENDENT_ON_EVIDENCE`).
10. **Research Integrity Matrix**: Dual-column disclosure ("What we claim today" vs "What we do NOT claim today").
11. **Investor Modals**: Accessible Deck Request and Founder Contact dialogs with client-side state handling.

---

## Project Structure

```
├── app/
│   ├── layout.tsx         # Root layout, metadata & OpenGraph tags
│   ├── page.tsx           # Long-form 17-section Homepage
│   ├── technology/        # Technical architecture deep dive
│   ├── research/          # Quantum simulation & benchmark disclosures
│   ├── founder/           # Founder Nishant Kumar Sinha profile & background
│   ├── investors/         # Pre-seed raise ($500K) & proof gates
│   ├── contact/           # Direct founder contact page
│   ├── privacy/           # Privacy policy
│   ├── legal/             # Legal disclaimer & claims disclosures
│   └── not-found.tsx      # Custom 404 page
├── components/
│   ├── sections/          # 17 Homepage section components
│   ├── visualizations/    # Failure, Room, Expansion, Architecture, Quantum & Market diagrams
│   └── ui/                # Navbar, Footer, Modal, CustomCursor, ScrollProgress
├── content/
│   └── siteConfig.ts      # Structured TypeScript copy, metrics & datasets
├── lib/
│   └── utils.ts           # Classnames utility & formatting functions
├── public/                # Static assets, SVG marks, OpenGraph card
└── styles/
    └── globals.css        # Monochrome CSS tokens & typography
```

---

## Local Development & Setup

1. **Clone Repository**:
   ```bash
   git clone https://github.com/rdvrma/qpsi.git
   cd qpsi
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Verify TypeScript & Production Build**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```

---

## Truthfulness & Disclosure Guidelines

- **Pre-Prototype Status**: Q-Psi is an idea-stage deep-tech research initiative. No working commercial Q-Psi product or paying customer is claimed today.
- **Quantum Claims**: Quantum methods are evaluated strictly as experimental candidate search backends against a mandatory classical baseline. No quantum advantage is claimed.
- **Founder Background**: Nishant Kumar Sinha has 10+ years of software-business execution experience at Darkcloud Infosystems Pvt. Ltd. He discontinued his CSE B.Tech in 3rd year (2009) to pursue technology entrepreneurship. He is not described as a quantum scientist or completed degree holder.

---

## License & Copyright

© 2026 Q-Psi / Darkcloud Infosystems Pvt. Ltd. All rights reserved.
