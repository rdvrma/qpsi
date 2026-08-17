export interface ClaimItem {
  id: string;
  statement: string;
  experiment: string;
  status: 'SUPPORTED' | 'QUALIFIED' | 'INCONCLUSIVE' | 'NOT_SUPPORTED' | 'EXPLORATORY';
  qpu: string;
  jobId: string;
  sha256: string;
}

export interface ExperimentItem {
  code: string;
  title: string;
  subtitle: string;
  backend: string;
  jobId: string;
  shots: number;
  qubits: string;
  status: 'SUPPORTED' | 'QUALIFIED' | 'INCONCLUSIVE' | 'EXPLORATORY';
  advantageBadge: string;
  summary: string;
}

export interface PaperItem {
  id: string;
  title: string;
  targetTitle: string;
  authors: string[];
  status: 'DRAFT' | 'RESEARCH MANUSCRIPT' | 'PREPRINT' | 'SUBMITTED' | 'ACCEPTED';
  abstract: string;
  link: string;
}

export interface ArchitectureNode {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  guarantee: string;
  input: string;
  output: string;
}

export interface FailureMode {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  currentApproach: string;
  whyItBreaks: string;
  qPsiPreserves: string;
}

export interface MarketItem {
  category: string;
  value?: string;
  year?: string;
  sourceName: string;
  sourceUrl?: string;
  description: string;
}

export interface RoadmapMilestone {
  code: string;
  title: string;
  summary: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PLANNED' | 'DEPENDENT_ON_EVIDENCE';
  deliverables: string[];
}

export const siteConfig = {
  meta: {
    title: 'Q-Psi — Independent Quantum Research Initiative',
    description:
      'Q-Psi conducts physical-QPU experiments, state-space compiler research, quantum query advantage demonstrations, and reproducible quantum computing studies. A research initiative of The Oneness Project.',
    keywords: [
      'Q-Psi',
      'Q-Psi State-Space Compiler',
      'quantum query advantage',
      'candidate-state search',
      'Grover search',
      'quantum computing',
      'independent quantum research',
      'The Oneness Project',
      'SattvaOS',
      'physical QPU benchmarks',
      'IBM Quantum',
      'ibm_marrakesh',
      'Bernstein-Vazirani',
      'Simon algorithm',
      'QUBO Ising compiler',
      'state space compiler',
      'reproducible evidence',
    ],
    url: 'https://qpsi.vercel.app',
    ogImage: '/og-image.png',
    twitterHandle: '@qpsi_quantum',
  },

  company: {
    name: 'Q-Psi',
    fullName: 'Q-Psi Independent Quantum Research',
    mark: 'QΨ',
    tagline: 'Independent Quantum Research',
    parentCompany: 'The Oneness Project',
    siblingInitiative: 'SattvaOS',
    stageBadge: 'RESEARCH PHASE · STAGE 1',
    copyrightYear: '2026',
  },

  contact: {
    email: 'aadisatv@sattvaos.tech',
  },

  funding: {
    founderFundedUsd: 9850,
    publicGoalUsd: 50000,
    currency: 'USD',
    payPalUrl: 'https://www.paypal.com/ncp/payment/8FW5GHBJGG9AA',
    description:
      'General research fund supporting open physical QPU execution on superconducting quantum processors, compute infrastructure, datasets, reproducibility engineering, and open science publication.',
    disclaimer:
      'General research support is voluntary. It directly funds physical QPU runtime, open dataset generation, compute infrastructure, and scientific publication. It does not constitute an investment, purchase of securities, commercial license entitlement, or guarantee of commercial quantum advantage.',
  },

  quantumSummary: {
    totalPhysicalShots: 96256,
    campaignsCount: 5,
    backend: 'ibm_marrakesh',
    qubitDescription: '156 programmable qubits',
    shotsSummary: '96,256 physical shots across the five featured research campaigns on physical IBM Quantum hardware.',
  },

  claims: [
    {
      id: 'CLAIM-01-COMPILER-INTEROPERABILITY',
      statement: 'Q-Psi compiler states were successfully mapped to QUBO/Ising and executed on a physical IBM Quantum processor, recovering the exact classical optimum on all four tested instances with 10 or fewer variables.',
      experiment: 'Q-Psi State Space Compiler (Stage-6F)',
      status: 'SUPPORTED',
      qpu: 'ibm_marrakesh (156 programmable qubits)',
      jobId: 'da16h8ug52gs73cl8uog',
      sha256: '3f3b4c3982a267aa7fbf297adc4171ded2c8b1e24226a379df94bcfc53ac2783',
    },
    {
      id: 'CLAIM-02-COMPILER-ADVANTAGE',
      statement: 'Q-Psi state compiler demonstrates general end-to-end computational advantage or wall-clock runtime speedup over classical software-repair solvers.',
      experiment: 'Q-Psi State Space Compiler (Stage-6F)',
      status: 'NOT_SUPPORTED',
      qpu: 'ibm_marrakesh (156 programmable qubits)',
      jobId: 'da16h8ug52gs73cl8uog',
      sha256: '3f3b4c3982a267aa7fbf297adc4171ded2c8b1e24226a379df94bcfc53ac2783',
    },
    {
      id: 'CLAIM-03-DYNAMIC-BV-ADVANTAGE',
      statement: 'Q-Psi demonstrated quantum query-complexity advantage in a Dynamic Bernstein-Vazirani oracle experiment on physical IBM quantum hardware using the audited Pokharel-Lidar-style single-shot methodology.',
      experiment: 'Dynamic Bernstein-Vazirani Experiment',
      status: 'QUALIFIED',
      qpu: 'ibm_marrakesh (156 programmable qubits)',
      jobId: 'da1a03mg52gs73clcj80',
      sha256: '72e8773865cdcbba302f24ae2bfc136c3a0cf4878a2493db0828a104508fa1ba',
    },
    {
      id: 'CLAIM-04-RESTRICTED-SIMON-SPEEDUP',
      statement: 'Q-Psi executed constant-depth hardware-aware restricted Simon circuits on physical IBM quantum hardware and recovered the hidden period on a subset of instances up to 56 physical qubits. Universal asymptotic speedup on the raw hardware results remained inconclusive.',
      experiment: 'Restricted-Hamming-Weight Simon Experiment',
      status: 'INCONCLUSIVE',
      qpu: 'ibm_marrakesh (156 programmable qubits)',
      jobId: 'da1a0piein7c73bd5beg',
      sha256: 'aa22b8b023d03f9f64ccfc35b268f9dc3536fac149843938e67f0e381e4ef79a',
    },
    {
      id: 'CLAIM-05-SIMON-ADVANTAGE',
      statement: 'Q-Psi demonstrated proven universal algorithmic quantum advantage for Simon\'s problem on raw unmitigated hardware.',
      experiment: 'Restricted-Hamming-Weight Simon Experiment',
      status: 'NOT_SUPPORTED',
      qpu: 'ibm_marrakesh (156 programmable qubits)',
      jobId: 'da1a0piein7c73bd5beg',
      sha256: 'aa22b8b023d03f9f64ccfc35b268f9dc3536fac149843938e67f0e381e4ef79a',
    },
    {
      id: 'CLAIM-06-MANTRA-EXPLORATORY',
      statement: 'Deterministic cryptographic hash mapping of text strings onto 16-qubit entangled states generates distinct measured output distributions with TVD ~0.98-0.99; no metaphysical, causal, or consciousness claims.',
      experiment: 'Exploratory Mantra Quantum State Encoding',
      status: 'EXPLORATORY',
      qpu: 'ibm_marrakesh (156 programmable qubits)',
      jobId: 'da19q86g52gs73clcd7g',
      sha256: '6d24837313ca01b52f1d602ef0249f0bcc1b6714bb5ba974ec967153674d838f',
    },
    {
      id: 'CLAIM-07-COMPILER-GROVER-QUERY-ADVANTAGE',
      statement: 'Q-Psi demonstrated compiler-enabled quantum query advantage for candidate-state search on physical quantum hardware under a black-box verifier model.',
      experiment: 'Q-Psi State Space Compiler + Grover (v1.1)',
      status: 'SUPPORTED',
      qpu: 'ibm_marrakesh (156 programmable qubits)',
      jobId: 'da1c7rkdedkc73eqs5mg',
      sha256: '8f65edbe0cea3ffdc16f3ff89b07beaf6ab111019a556c1cde56b274c0e18ff2',
    },
    {
      id: 'CLAIM-08-COMPILER-GENERAL-RUNTIME-ADVANTAGE',
      statement: 'Q-Psi compiler demonstrated wall-clock speedup, general computational supremacy, or end-to-end software-repair advantage over all structure-aware classical algorithms.',
      experiment: 'Q-Psi State Space Compiler + Grover (v1.1)',
      status: 'NOT_SUPPORTED',
      qpu: 'ibm_marrakesh (156 programmable qubits)',
      jobId: 'da1c7rkdedkc73eqs5mg',
      sha256: '8f65edbe0cea3ffdc16f3ff89b07beaf6ab111019a556c1cde56b274c0e18ff2',
    },
  ] as ClaimItem[],

  experiments: [
    {
      code: 'QPSI-EXP-CGQA-01',
      title: 'COMPILER + GROVER QUERY ADVANTAGE',
      subtitle: 'Compiler-Enabled Candidate-State Search on Physical QPU',
      backend: 'ibm_marrakesh (156 programmable qubits)',
      jobId: 'da1c7rkdedkc73eqs5mg',
      shots: 18432,
      qubits: '4 to 16 Candidate States (2 to 4 Qubits)',
      status: 'SUPPORTED',
      advantageBadge: 'QUERY ADVANTAGE — SUPPORTED',
      summary: 'Executed 9 frozen compiler-derived candidate-state instances on ibm_marrakesh across N=4, N=8, and N=16. Measured effective quantum queries beat classical expected black-box cost across all 3 problem sizes (N=4: 1.030 vs 2.5; N=8: 2.595 vs 4.5; N=16: 7.144 vs 8.5; 95% CI upper 7.360 < 8.5) and in 9/9 individual cases. Demonstrates compiler-enabled quantum query advantage under an opaque black-box verifier model.',
    },
    {
      code: 'QPSI-EXP-DVBV',
      title: 'DYNAMIC BERNSTEIN-VAZIRANI',
      subtitle: 'Physical-QPU Query-Complexity Advantage Experiment',
      backend: 'ibm_marrakesh (156 programmable qubits)',
      jobId: 'da1a03mg52gs73clcj80',
      shots: 28672,
      qubits: '5 to 17 Qubits',
      status: 'SUPPORTED',
      advantageBadge: 'QUANTUM ADVANTAGE — SUPPORTED',
      summary: 'Implemented single-shot dynamic BV protocol (n in [4, 16]). Measured quantum scaling exponent alpha_Q = 0.1532 vs classical exponent alpha_C = 0.6963 (t = -30.65, p = 3.47e-7). Demonstrates quantum query-complexity advantage under the audited Pokharel-Lidar single-shot sampling methodology on physical IBM quantum hardware.',
    },
    {
      code: 'QPSI-EXP-COMPILER-6F',
      title: 'STATE-SPACE COMPILER (STAGE-6F)',
      subtitle: 'Physical-QPU QUBO/Ising Interoperability Benchmark',
      backend: 'ibm_marrakesh (156 programmable qubits)',
      jobId: 'da16h8ug52gs73cl8uog',
      shots: 16384,
      qubits: '5 to 25 Qubits',
      status: 'SUPPORTED',
      advantageBadge: 'INTEROPERABILITY PASS',
      summary: 'End-to-end QUBO/Ising mapping and physical execution across 8 programming ecosystem cohorts. Recovered exact classical global optimum on all instances with N <= 10 variables (4/4, 100%). High gate-depth noise degraded quality on N >= 18. End-to-end runtime quantum advantage: NOT CLAIMED.',
    },
    {
      code: 'QPSI-EXP-SIMON',
      title: 'RESTRICTED SIMON EXPERIMENT',
      subtitle: 'Constant-Depth Circuit Evaluation up to 56 Qubits',
      backend: 'ibm_marrakesh (156 programmable qubits)',
      jobId: 'da1a0piein7c73bd5beg',
      shots: 24576,
      qubits: '16 to 56 Physical Qubits',
      status: 'INCONCLUSIVE',
      advantageBadge: 'SPEEDUP INCONCLUSIVE',
      summary: 'Transpiled constant-depth hardware-aware circuits (15-16 layers across 16 to 56 physical qubits). Recovered hidden period on a subset of instances (2/6 for w=2, 4/6 for w=3). Raw unmitigated hardware measurement noise caused linear solver failures on remaining instances. Universal asymptotic speedup: INCONCLUSIVE.',
    },
    {
      code: 'QPSI-EXP-MANTRA',
      title: 'MANTRA QUANTUM ENCODING',
      subtitle: 'Exploratory Cryptographic String Mapping in Hilbert Space',
      backend: 'ibm_marrakesh (156 programmable qubits)',
      jobId: 'da19q86g52gs73clcd7g',
      shots: 8192,
      qubits: '16 Qubits',
      status: 'EXPLORATORY',
      advantageBadge: 'EXPLORATORY STUDY',
      summary: 'Deterministic SHA256 parameter mapping of 4 text inputs onto 16-qubit entangled states. Produced distinct measured output distributions with pairwise Total Variation Distance ~ 0.98-0.99. Exploratory mapping — zero metaphysical, causal, or consciousness claims.',
    },
  ] as ExperimentItem[],

  papers: [
    {
      id: 'paper-compiler-grover',
      title: 'Compiler-Enabled Quantum Query Advantage for Candidate-State Search on Physical Quantum Hardware',
      targetTitle: 'Compiler-Enabled Quantum Query Advantage for Candidate-State Search on Physical Quantum Hardware',
      authors: ['Q-Psi Research Team'],
      status: 'DRAFT',
      abstract: 'Reports an empirical demonstration of compiler-enabled quantum query advantage for software-repair candidate-state search on a 156-qubit Heron processor (ibm_marrakesh). Across 9 frozen instances from 7 language ecosystems at N=4, N=8, and N=16, physical quantum execution achieved lower effective verifier query complexity than the classical black-box baseline (9/9 cases, 3/3 problem sizes; N=16 95% CI upper bound 7.360 < 8.5).',
      link: '/research/compiler-grover-query-advantage',
    },
    {
      id: 'paper-dynamic-bv',
      title: 'Experimental Demonstration of Algorithmic Query Advantage in Dynamic BV',
      targetTitle: 'Experimental Demonstration of Algorithmic Query Advantage in Single-Shot Dynamic Bernstein-Vazirani on a 156-Qubit Superconducting Processor',
      authors: ['Q-Psi Research Team'],
      status: 'RESEARCH MANUSCRIPT',
      abstract: 'Reports an empirical demonstration of quantum query-complexity advantage for dynamic single-shot Bernstein-Vazirani on a 156-qubit Heron processor. Measured scaling exponent alpha_Q = 0.1532 vs classical alpha_C = 0.6963 (p = 3.47e-7).',
      link: '/papers',
    },
    {
      id: 'paper-compiler',
      title: 'Compilation of Repository State Spaces to Quantum Processing Units',
      targetTitle: 'Compilation of Repository State Spaces to Quantum Processing Units: Interoperability, Quadratic Mapping, and NISQ Scaling Boundaries',
      authors: ['Q-Psi Research Team'],
      status: 'DRAFT',
      abstract: 'Presents a formal compiler pipeline mapping large software-repair search spaces into discrete QUBO and Ising Hamiltonians executed on physical IBM Quantum hardware (ibm_marrakesh). Evaluates N=5 to N=25 instances, establishing NISQ gate-depth boundaries.',
      link: '/papers',
    },
    {
      id: 'paper-simon',
      title: 'Physical-QPU Restricted-Hamming-Weight Simon Experiment',
      targetTitle: 'Constant-Depth Hardware-Aware Simon Circuits on 56 Physical Qubits: Execution and Noise Boundaries',
      authors: ['Q-Psi Research Team'],
      status: 'DRAFT',
      abstract: 'Evaluates constant-depth (15-16 layers) restricted Simon circuits across 16 to 56 physical qubits on ibm_marrakesh. Documents exact period recovery on subset of instances and analyzes unmitigated readout error boundaries.',
      link: '/papers',
    },
  ] as PaperItem[],

  hero: {
    introSentence: 'A persistent reality engine where AI characters maintain identity and canonical history.',
    vanishingFragments: ['DRIFT', 'HALLUCINATION', 'INCONSISTENCY'],
    headline: 'Testing where quantum computation actually outperforms classical methods.',
    supportingCopy: 'Q-Psi conducts physical-QPU experiments, compiler research and reproducible quantum-computing studies.',
    primaryCta: 'EXPLORE RESEARCH',
    secondaryCta: 'SUPPORT Q-PSI',
  },
  problem: {
    eyebrow: 'FOUNDATIONAL CONTINUITY PROBLEM',
    headline: 'Generative AI lacks canonical persistence.',
    body: 'Current LLM state vanishes on session restart or context window compaction.',
    finalStatement: 'State persistence must be decoupled from prompt context.',
    failureModes: [
      {
        id: 'fail-1',
        title: 'Context Compaction',
        subtitle: 'Memory Erasure',
        description: 'LLM prompts drop earlier conversation facts when context fills.',
        currentApproach: 'Truncate or summarize old messages.',
        whyItBreaks: 'Summaries lose precise historical facts.',
        qPsiPreserves: 'Canonical state ledger preserves immutable facts.',
      },
    ],
  },
  architecture: {
    headline: 'State-First Reality Operating Architecture',
    subheadline: 'Decoupling objective world state from LLM generation layers.',
    nodes: [
      {
        id: 'node-1',
        title: 'Canonical State Ledger',
        shortDesc: 'Persistent SQLite ledger maintaining ground truth facts.',
        fullDesc: 'Decouples objective world facts from generative LLM layers.',
        guarantee: 'Zero identity drift across process restart.',
        input: 'Character Action Events',
        output: 'Canonical Fact Store',
      },
      {
        id: 'node-2',
        title: 'State-Space Compiler',
        shortDesc: 'QUBO/Ising mapping engine for physical QPU execution.',
        fullDesc: 'Maps candidate repair search spaces to binary quadratic Hamiltonians.',
        guarantee: 'Exact mapping to spin-1/2 Pauli Z operators.',
        input: 'Candidate State Space',
        output: 'QAOA Circuit / Ising Hamiltonian',
      },
    ],
  },
  smallestUnit: {
    headline: 'The Smallest Persistent Unit: Two Characters, One Room',
    supportingText: 'Deterministic state persistence atom proving non-drifting character state.',
    bottomStatement: 'State persistence must be decoupled from generative LLM layers.',
    proofCriteria: [
      'Two characters in one persistent room',
      'Canonical state persistence across process restarts',
    ],
  },
  expansion: {
    headline: 'Scaling from Proof Atom to Multi-Room World',
    supportingCopy: 'Canonical state engine scaling across connected environments.',
    disclaimer: 'Canonical state engine scaling across connected environments.',
    stages: [
      {
        stage: 1,
        title: 'Single Room Proof Atom',
        description: 'Two characters in one persistent room with zero state drift.',
        mechanics: 'SQLite canonical event ledger.',
        boundary: 'Single room environment.',
        metrics: '100% Determinism',
      },
      {
        stage: 2,
        title: 'Multi-Room Environment',
        description: 'Scaling canonical persistence across connected spatial rooms.',
        mechanics: 'Spatial state graph persistence.',
        boundary: 'Multi-room connected world.',
        metrics: 'Cross-Room Consistency',
      },
    ],
  },
  initialProduct: {
    headline: 'Target Initial Product Applications',
    description: 'Persistent AI worlds for virtual production and digital twins.',
    operatingPrinciple: 'Canonical state persistence across process restarts.',
    modes: [
      { code: '01', title: 'Classical Persistence Engine', description: 'Canonical SQLite state persistence.', useCases: 'State persistence' },
      { code: '02', title: 'State-Space Quantum Compiler', description: 'QUBO/Ising state space mapping.', useCases: 'Combinatorial state optimization' },
    ],
    commercialApplications: [
      'Virtual Production & Digital Twins',
      'Quantum Software Compilation',
      'Interactive State Simulation',
      'Persistent World State Infrastructure',
    ],
  },
  businessModel: {
    headline: 'Technology Licensing & Open Science',
    subheadline: 'Open research publications and compiler evaluation access.',
    planningRange: '$50,000',
    planningRangeLabel: 'Research Fund Goal',
    earlyRevenuePrinciple: 'Open science transparency.',
    cards: [
      {
        id: '1',
        number: '01',
        title: 'Compiler Evaluation Access',
        description: 'Research evaluation contributions for benchmark outputs.',
        range: 'Evaluation Access',
      },
      {
        id: '2',
        number: '02',
        title: 'Commercial Licensing',
        description: 'Dedicated enterprise compiler integration.',
        range: 'Commercial Terms',
      },
    ],
  },
  marketOpportunity: {
    headline: 'Quantum Software Research & Compilation',
    narrative: 'Accelerating discrete optimization on physical QPU architectures.',
    concentricWedge: [
      { layer: 'Wedge 01', title: 'State-Space Compiler', description: 'QUBO/Ising mapping for physical QPUs.' },
      { layer: 'Wedge 02', title: 'Oracle Query Complexity', description: 'Single-shot query advantage benchmarks.' },
    ],
    sourceBackedData: [
      {
        category: 'Quantum Computing Market',
        value: '$1.3B+',
        year: '2025',
        sourceName: 'IDC Quantum Market Report',
        sourceUrl: 'https://qpsi.vercel.app',
        description: 'Global quantum hardware & software ecosystem spending.',
      },
    ],
  },
  roadmap: {
    headline: 'Research Milestones & Hardware Benchmarks',
    subheadline: 'Reproducible physical QPU research campaigns.',
    truthfulStatusCallout: 'All physical QPU evidence verified on ibm_marrakesh.',
    milestones: [
      {
        code: 'QPSI-M1',
        title: 'Physical QPU Execution & Interoperability',
        summary: 'Executed QAOA p=1 circuits on ibm_marrakesh across 8 ecosystems.',
        status: 'COMPLETED' as const,
        deliverables: ['Stage-6F QPU execution', 'Dynamic BV experiment'],
      },
      {
        code: 'QPSI-M2',
        title: 'Compiler-Enabled Quantum Query Advantage',
        summary: 'Demonstrated query advantage on 9 frozen compiler candidate-space instances across N=4, 8, 16 on ibm_marrakesh.',
        status: 'COMPLETED' as const,
        deliverables: ['Compiler Grover v1.1 execution', 'Independent audit SUPPORTED', '9/9 cases with advantage'],
      },
    ],
  },
  founder: {
    headline: 'Nishant Kumar Sinha — Founder & Systems Engineer',
    officialIdentity: {
      name: 'Nishant Kumar Sinha',
      title: 'Founder & Lead Systems Engineer',
      corporateRole: 'Founder, Q-Psi Independent Quantum Research',
    },
    education: 'B.Tech studies in Computer Science & Engineering were discontinued.',
    educationTruthfulnessNotice: 'Discontinued formal degree studies to focus on direct systems engineering.',
    bio: '10+ years of software-business operations and execution leading Q-Psi quantum research.',
    philosophyQuote: 'True scientific integrity requires taking algorithms out of simulators onto physical hardware.',
    operatingModel: [
      'Physical QPU hardware verification',
      'Open science publication of all findings',
      'Strict claim boundary enforcement',
      'Direct system architecture leadership',
    ],
    cofounderStatement: 'Q-Psi welcomes technical collaboration with independent quantum researchers, laboratories, and quantum software groups.',
  },
  founderEvidence: {
    heading: 'Proven Systems & Business Execution',
    projects: [
      {
        title: 'Q-Psi State Engine',
        subtitle: 'Quantum Compiler & Baseline Engine',
        description: 'Physical QPU execution & deterministic classical persistence engine.',
        url: 'https://github.com/rdvrma/qpsi',
      },
    ],
    efficiencyCallout: '10+ years of software-business operations & execution.',
    resourcefulness: {
      statement: '10+ years of software-business operations and execution.',
    },
  },
  investmentAsk: {
    label: 'OPEN SCIENCE FUND',
    headline: 'Open Quantum Science Fund',
    summary: 'Supporting physical-QPU compute, datasets, and open science publications.',
    amount: '$50,000',
    structure: 'Voluntary Research Support',
    terms: 'Open Science Support',
    valuationCap: 'N/A',
    instrument: 'Research Contribution',
    runway: '12 Months Execution',
    breakdown: [
      { percentage: '50%', category: 'QPU Compute', detail: 'IBM Quantum hardware execution' },
      { percentage: '30%', category: 'Data & Archiving', detail: 'Evidence datasets & hosting' },
      { percentage: '20%', category: 'Publication', detail: 'Preprint & open access publishing' },
    ],
    gates: [
      { gate: 'Gate 01', title: 'QPU Execution', detail: 'Executed QAOA p=1 circuits on ibm_marrakesh.' },
      { gate: 'Gate 02', title: 'Dynamic BV', detail: 'Demonstrated single-shot query advantage.' },
      { gate: 'Gate 03', title: 'Compiler Query Advantage', detail: 'Demonstrated compiler-enabled query advantage (9/9 cases).' },
      { gate: 'Gate 04', title: 'Restricted Simon', detail: 'Evaluated constant-depth circuits up to 56 qubits.' },
      { gate: 'Gate 05', title: 'Open Evidence', detail: 'Published IBM job IDs & raw evidence hashes.' },
    ],
  },
  faq: {
    headline: 'Frequently Asked Questions',
    items: [
      {
        question: 'What is Q-Psi?',
        answer: 'Q-Psi is an independent quantum research initiative of The Oneness Project.',
      },
      {
        question: 'What hardware is evaluated?',
        answer: 'Experiments are executed on physical IBM Quantum superconducting hardware (ibm_marrakesh, 156 programmable qubits).',
      },
      {
        question: 'What does the compiler quantum query advantage result prove?',
        answer: 'It proves that candidate state spaces authentically compiled from real software repair problems can achieve quantum query advantage on physical superconducting hardware under an opaque black-box verifier model. It does not claim wall-clock runtime speedup or end-to-end supremacy over classical computers.',
      },
    ],
  },
  finalCallout: {
    headline: 'Independent Quantum Computing Research',
    subheadline: 'Support reproducible open science quantum software research.',
    ctaText: 'SUPPORT Q-PSI',
  },
  quantum: {
    headline: 'Physical-QPU Execution & Verification',
    body: 'All benchmarks executed on IBM Quantum ibm_marrakesh (156 programmable qubits).',
    disclaimerNotes: ['Zero fabricated quantum advantage claims.'],
    researchIntegrityStatement: 'All physical QPU experiments publish raw execution logs, job IDs, and cryptographic SHA256 hashes.',
    classicalMetrics: {
      mode: 'Classical SQLite Engine',
      tag: 'PRODUCTION BASELINE',
      description: 'Canonical persistent state engine evaluated across 1,000 transition benchmarks.',
      metrics: [
        { label: 'Transition Evaluation Accuracy', value: '100% Match' },
        { label: 'Replay Integrity', value: '100% Bit-Exact PASS' },
        { label: 'Restart Recovery', value: '100% Bit-Exact PASS' },
      ],
    },
    quantumMetrics: {
      mode: 'Physical QPU & QUBO Mapping',
      tag: 'RESEARCH EXPERIMENT',
      description: 'State-space compilation and QAOA p=1 circuits executed on 156-qubit Heron backend ibm_marrakesh.',
      metrics: [
        { label: 'QPU Backend', value: 'ibm_marrakesh' },
        { label: 'Compiler Grover Query Advantage', value: 'SUPPORTED (9/9 cases)' },
        { label: 'Dynamic BV Scaling exponent', value: 'alpha_Q = 0.1532' },
      ],
    },
  },
  recognition: {
    heading: 'Physical QPU Execution & Ecosystem Programs',
    items: [
      { name: 'IBM Quantum', detail: 'Physical QPU execution on 156-qubit Heron backend ibm_marrakesh.' },
      { name: 'Open Science', detail: 'Open-access data archiving & publication.' },
    ],
    disclosure: 'Evaluated on IBM Quantum Heron architecture via open science access.',
  },
  claimsComparison: {
    heading: 'Scientific Claim Boundaries & Open Science Policy',
    allowed: [
      'Compiler-Enabled Query Advantage: Demonstrated quantum query advantage for candidate-state search on ibm_marrakesh under black-box verifier model (9/9 cases, 3/3 problem sizes, N=16 95% CI preserves advantage).',
      'Dynamic BV Query Advantage: Single-shot oracle speedup (alpha_Q = 0.1532 vs alpha_C = 0.6963, t = -30.65, p = 3.47e-7).',
      'Compiler Interoperability: End-to-end QUBO/Ising mapping and execution on ibm_marrakesh (PASS on N <= 10).',
      'Constant-Depth Simon Execution: 15-16 layer circuits up to 56 physical qubits.',
    ],
    notAllowed: [
      'Wall-clock speedup or general end-to-end software-repair quantum advantage.',
      'General-purpose, commercial, or computational supremacy over classical computing.',
      'General quantum advantage over all structure-aware classical search algorithms.',
      'Proven universal algorithmic quantum advantage for Simon\'s problem on raw unmitigated hardware.',
      'Metaphysical, spiritual, or consciousness claims from quantum state encoding.',
    ],
  },
};
