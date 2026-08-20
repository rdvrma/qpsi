export interface ClaimItem {
  id: string;
  claimId: string;
  statement: string;
  shortClaim: string;
  experiment: string;
  status: 'SUPPORTED' | 'SUPPORTED_WITH_QUALIFICATION' | 'MIXED_OR_INCONCLUSIVE' | 'NOT_SUPPORTED' | 'EXPLORATORY' | 'INCOMPLETE_NOT_FROZEN';
  publicationTier: 'TIER_A' | 'TIER_B' | 'TIER_C' | 'DISCLAIMED';
  qpu: string;
  jobId: string;
  shots?: number;
  quantumSeconds?: number;
  sha256: string;
  qualification: string;
  allowedWording: string[];
  prohibitedWording: string[];
  auditStatus: string;
}

export interface ExperimentItem {
  code: string;
  id: string;
  title: string;
  subtitle: string;
  category: string;
  backend: string;
  processor: string;
  jobIds: string[];
  shots: number;
  quantumSeconds: number;
  qubits: string;
  tier: 'TIER_A' | 'TIER_B' | 'TIER_C';
  status: 'SUPPORTED' | 'SUPPORTED_WITH_QUALIFICATION' | 'MIXED_OR_INCONCLUSIVE' | 'NOT_SUPPORTED' | 'EXPLORATORY' | 'INCOMPLETE_NOT_FROZEN';
  statusLabel: string;
  primaryResult: string;
  qualification: string;
  rawSha256: string;
  researchNoteUrl?: string;
}

export interface PaperItem {
  id: string;
  title: string;
  targetTitle: string;
  authors: string[];
  status: 'DRAFT' | 'RESEARCH MANUSCRIPT' | 'PREPRINT' | 'SUBMITTED' | 'ACCEPTED';
  abstract: string;
  link: string;
  date: string;
}

export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  tier: 'TIER_A' | 'TIER_B' | 'TIER_C' | 'OVERVIEW';
  status: string;
  backend: string;
  summary: string;
  link: string;
}

export const siteConfig = {
  meta: {
    title: 'Q-Psi — Independent Quantum Compiler & Physical-QPU Research Program',
    description:
      'Q-Psi is an independent quantum research program developing and physically testing state-space compilation, quantum search interfaces, hardware-aware compiler techniques and quantum-assisted data generation.',
    keywords: [
      'Q-Psi',
      'Q-Psi State-Space Compiler',
      'quantum compiler',
      'physical QPU experiments',
      'IBM Quantum',
      'ibm_marrakesh',
      'IBM Heron r2',
      'Grover candidate search',
      'quantum query advantage',
      'Dynamic Bernstein-Vazirani',
      'mid-circuit measurement',
      'qubit reuse',
      'MQT Bench cross-compiler',
      'Quantum Data Foundry',
      'dynamic routing',
      'fractional gate lowering',
      'calibration-aware layout',
      'reproducible quantum research',
      'The Oneness Project',
      'SattvaOS',
    ],
    url: 'https://qpsi.sattvaos.tech',
    ogImage: '/og-image.png',
    twitterHandle: '@qpsi_quantum',
  },

  company: {
    name: 'Q-Psi',
    fullName: 'Q-Psi Independent Quantum Research',
    mark: 'QΨ',
    tagline: 'Independent Quantum Compiler & Physical-QPU Research Program',
    parentCompany: 'The Oneness Project',
    siblingInitiative: 'SattvaOS',
    stageBadge: 'FROZEN RESEARCH STATE · 18 AUG 2026',
    copyrightYear: '2026',
  },

  contact: {
    email: 'aadisatv@sattvaos.tech',
  },

  freeze: {
    freezeDate: '2026-08-18',
    freezeCommit: 'be74ad05187e148e2fc52309f4d7f57be3784157',
    freezeAuditTaskId: 'QPSI_MASTER_EVIDENCE_AUDIT_AND_FREEZE_2026_08_18',
    notice:
      'Public claims are derived from a frozen post-experiment evidence audit and preserve supported, mixed, negative and exploratory results.',
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

  capsule: {
    title: 'Q-Psi Research Capsule',
    tagline:
      'Evaluate the Q-Psi State-Space Compiler on eligible research workloads under a controlled execution environment.',
    apiBaseUrl: 'https://qpsi-research-capsule-prod-596385402822.us-central1.run.app',
    maxRuntimeSeconds: 600,
    supportUrl: 'https://www.paypal.com/ncp/payment/8FW5GHBJGG9AA',
    contactEmail: 'aadisatv@sattvaos.tech',
    supportModel: 'SUPPORT_BASED_RESEARCH_ACCESS',
    coreCopy:
      'If this is relevant to your work, Q-Psi can share Research Capsule access details so eligible researchers can evaluate the Q-Psi compiler on a suitable workload. Q-Psi uses a support-based research-access model rather than a fixed public research-license price.',
    confirmationNotice:
      'Research Evaluation Licenses are non-commercial, controlled, and issued only after support for the Q-Psi research program has been confirmed.',
    futureProductsNotice:
      'Supporters may also be considered for access to selected future Q-Psi research tools and experimental products as those programs become available.',
    commercialNotice:
      'Research Evaluation Licenses do not grant commercial deployment, redistribution, production integration, or sublicensing rights. For commercial evaluation and licensing: aadisatv@sattvaos.tech',
    commercialSectionCopy:
      'Interested in production integration, enterprise evaluation, strategic licensing or commercial deployment? Send your proposal, intended use, and organization details to: aadisatv@sattvaos.tech',
    claimBoundary:
      'Q-Psi demonstrated compiler-enabled quantum query advantage for candidate-state search on physical quantum hardware under a black-box verifier model. The Capsule allows researchers to evaluate the compiler on their own eligible workloads. The historical result does not imply that every workload will demonstrate quantum advantage.',
    evidenceReference: {
      experimentId: 'QPSI_COMPILER_GROVER_V1_1',
      backend: 'ibm_marrakesh (156 programmable qubits)',
      shots: 18432,
      casesWithAdvantage: '9/9',
      problemSizes: '3/3 (N=4, N=8, N=16)',
      auditStatus: 'SUPPORTED',
    },
    privacyNotice:
      "Research workloads are processed through Q-Psi's controlled Capsule environment. Do not submit secrets, credentials, private keys or material you are not authorized to process.",
    emailTemplate: {
      subject: 'Q-Psi Research Capsule Access Request',
      fields: [
        { label: 'Name', key: 'name' },
        { label: 'Organization / Research Group', key: 'organization' },
        { label: 'Research Use', key: 'research_use' },
        { label: 'Workload Description', key: 'workload_description' },
        { label: 'Quantum / Computing Background', key: 'background' },
        { label: 'Support Reference', key: 'support_reference' },
      ],
    },
  },

  // Authoritative Frozen Program Totals
  programTotals: {
    totalPhysicalShots: 601704,
    completedAuditedExperimentFamilies: 15,
    productionQpuJobs: 19,
    ibmRuntimeQuantumSeconds: 288.38,
    primaryBackend: 'ibm_marrakesh',
    processor: 'IBM Heron r2',
    qubitDescription: '156 programmable qubits',
    freezeDate: '2026-08-18',
    shotsSummary:
      '564,840 physical shots and 259.38 reported quantum seconds executed across 16 production jobs and 14 completed audited experiment families on IBM Heron r2 (ibm_marrakesh).',
  },

  // Data Foundry V2 Campaign Metrics
  dataFoundry: {
    universeSize: 65536,
    selectorQubits: 16,
    backend: 'ibm_marrakesh',
    processor: 'IBM Heron r2 (156 programmable qubits)',
    jobsCount: 4,
    shots: 332768,
    quantumSeconds: 127.58,
    uniqueQpuStates: 65138,
    verifierProcessedCandidates: 158,
    verifiedPositiveRecords: 93,
    hardNegatives: 65,
    datasetSizeBytes: 1670417,
    datasetSizeMb: 1.593,
    approxTokenEquivalent: 417483,
    qpuProvenanceRate: '100.0% (93/93)',
    trainingSchemaStatus: 'PASS',
    oneMinibatchSmokeStatus: 'PASS',
    throughputRate: '0.729 verified records per reported quantum second',
    bottleneck: 'Classical executable verification throughput (158 evaluated of 65k states)',
    boundary:
      'The experiment demonstrates pipeline feasibility, not improved model quality or quantum advantage. Downstream LLM fine-tuning was not evaluated.',
  },

  // Master Audited Claims Registry
  claims: [
    {
      id: 'CLAIM_COMPILER_GROVER_QUERY_ADVANTAGE',
      claimId: 'CLAIM_COMPILER_GROVER_QUERY_ADVANTAGE',
      statement:
        'Q-Psi demonstrated compiler-enabled physical quantum query advantage on structured candidate-state search problems on IBM Heron hardware under an opaque black-box verifier model (N=4: 2.43x, N=8: 1.73x, N=16: 1.19x; 9/9 individual cases; 3/3 tested sizes).',
      shortClaim:
        'Compiler-enabled physical quantum query advantage on a frozen candidate-state search benchmark.',
      experiment: 'Compiler + Grover v1.1 (QPSI_COMPILER_GROVER_V1_1)',
      status: 'SUPPORTED',
      publicationTier: 'TIER_A',
      qpu: 'ibm_marrakesh (IBM Heron r2, 156 programmable qubits)',
      jobId: 'da1c7rkdedkc73eqs5mg',
      shots: 18432,
      quantumSeconds: 2.50,
      sha256: '8f65edbe0cea3ffdc16f3ff89b07beaf6ab111019a556c1cde56b274c0e18ff2',
      qualification:
        'Valid strictly under the query complexity metric on tested structured oracle families; does not establish wall-clock speedup, general compiler advantage, or universal software-repair quantum advantage.',
      allowedWording: [
        'Compiler-enabled physical quantum query advantage on a frozen candidate-state search benchmark.',
        'Quantum query reduction factors of 2.43x (N=4), 1.73x (N=8), and 1.19x (N=16) observed on physical quantum hardware (ibm_marrakesh).',
      ],
      prohibitedWording: [
        'General quantum speedup for arbitrary software repair.',
        'End-to-end wall-clock compiler runtime advantage.',
        'General quantum advantage.',
      ],
      auditStatus: 'AUDITED_VERIFIED',
    },
    {
      id: 'CLAIM_DYNAMIC_BV_QUERY_ADVANTAGE',
      claimId: 'CLAIM_DYNAMIC_BV_QUERY_ADVANTAGE',
      statement:
        'Q-Psi demonstrated statistically significant physical quantum query complexity scaling advantage on the Dynamic Bernstein-Vazirani problem across N=4..16 qubits on IBM Heron hardware (slope 0.153 vs classical 0.696, t = -30.65, p < 1e-6).',
      shortClaim:
        'Bounded physical query-complexity/scaling advantage under the frozen Dynamic BV methodology.',
      experiment: 'Dynamic Bernstein-Vazirani (QPSI_DYNAMIC_BV_QUERY_ADVANTAGE)',
      status: 'SUPPORTED',
      publicationTier: 'TIER_A',
      qpu: 'ibm_marrakesh (IBM Heron r2, 156 programmable qubits)',
      jobId: 'da1a03mg52gs73clcj80',
      shots: 28672,
      quantumSeconds: 14.20,
      sha256: '72e8773865cdcbba302f24ae2bfc136c3a0cf4878a2493db0828a104508fa1ba',
      qualification:
        'Restricted to the tested oracle complexity model on synthetic scaling series; does not generalize to wall-clock speedup or arbitrary workloads.',
      allowedWording: [
        'Demonstrated statistically significant physical quantum query scaling advantage on Dynamic Bernstein-Vazirani problem across N=4..16 qubits on IBM Marrakesh.',
        'Quantum query scaling slope (0.153) is statistically superior to classical exhaustive bound (0.696, t = -30.65, p < 1e-6).',
      ],
      prohibitedWording: [
        'General quantum supremacy.',
        'General quantum advantage for arbitrary computational problems.',
        'Wall-clock speedup.',
      ],
      auditStatus: 'AUDITED_VERIFIED',
    },
    {
      id: 'CLAIM_MCM_QUBIT_REUSE_WIDTH_REDUCTION',
      claimId: 'CLAIM_MCM_QUBIT_REUSE_WIDTH_REDUCTION',
      statement:
        'Compiler-driven liveness and mid-circuit reuse reduced physical register width by a median 78.1% (up to 87.5% on 16 logical qubits mapped to 2 physical slots) across the frozen streaming benchmark while all six tested cases remained within the predeclared observable-quality criterion.',
      shortClaim:
        'Mid-circuit measurement and reset reduces physical qubit footprint by median 78.1% with non-inferior observable quality.',
      experiment: 'MCM Qubit Reuse (QPSI_MCM_QUBIT_REUSE_V1)',
      status: 'SUPPORTED_WITH_QUALIFICATION',
      publicationTier: 'TIER_A',
      qpu: 'ibm_marrakesh (IBM Heron r2, 156 programmable qubits)',
      jobId: 'da1u0om3kjvs738777cg',
      shots: 24576,
      quantumSeconds: 10.80,
      sha256: 'ec0f2cea637f433f9d134d05a7168b3114b4526c2f5483288efbdea01d83e8e4',
      qualification:
        'Applicable strictly to circuits with sequential liveness graphs and streaming communication topologies; arbitrary non-local entanglement requires full register width. Does not imply 16-qubit computations generally require 2 qubits.',
      allowedWording: [
        'Compiler-driven liveness and mid-circuit reuse reduced physical register width by a median 78.1% across the frozen streaming benchmark while all six tested cases remained within the predeclared observable-quality criterion.',
        'Evaluated 16 logical-qubit workloads on 2 to 3 physical slots on IBM Marrakesh.',
      ],
      prohibitedWording: [
        '16-qubit quantum computation generally requires only 2 qubits for all algorithms.',
        'Universal width reduction for arbitrary quantum circuits.',
      ],
      auditStatus: 'AUDITED_VERIFIED',
    },
    {
      id: 'CLAIM_DATA_FOUNDRY_V2_120QSEC_FEASIBILITY',
      claimId: 'CLAIM_DATA_FOUNDRY_V2_120QSEC_FEASIBILITY',
      statement:
        'Q-Psi demonstrated a physical-QPU-assisted coding-data pipeline in which QPU measurement samples causally selected repository mutation states that were converted by executable software verifiers into 93 unique verified repair records (127.58s runtime, 332,768 shots, 100% QPU provenance).',
      shortClaim:
        'Physical-QPU-assisted code data generation pipeline feasibility demonstrated with 127.58 quantum seconds on Heron r2.',
      experiment: 'Quantum Data Foundry V2 (QPSI_QUANTUM_DATA_FOUNDRY_CODING_V2_120QSEC)',
      status: 'SUPPORTED_WITH_QUALIFICATION',
      publicationTier: 'TIER_A',
      qpu: 'ibm_marrakesh (IBM Heron r2, 156 programmable qubits)',
      jobId: 'da1vjh4dedkc73erijq0, da1vjmeg52gs73cm5us0, da1vk3mg52gs73cm607g, da1vke63kjvs738795og',
      shots: 332768,
      quantumSeconds: 127.58,
      sha256: 'dfd11daa2f1f51b29e15019741363a3fd03672f8ccd562c52c4a762d656dc89f',
      qualification:
        'Feasibility demonstration only. The current throughput bottleneck is classical verification (158 evaluated of 65,138 QPU states). Downstream LLM fine-tuning and model improvement were NOT tested. No quantum training advantage is claimed.',
      allowedWording: [
        'Q-Psi demonstrated a physical-QPU-assisted coding-data pipeline in which QPU measurement samples causally selected repository mutation states that were converted by executable software verifiers into 93 unique verified repair records.',
        'The experiment demonstrates pipeline feasibility, not improved model quality or quantum advantage. Downstream LLM fine-tuning was not evaluated.',
        '93 verifier-backed positives were produced under the bounded V2 pipeline after 65,138 unique candidate states were supplied by physical-QPU sampling.',
      ],
      prohibitedWording: [
        'Quantum generated 417k useful LLM tokens autonomously.',
        'Q-Psi improves LLMs.',
        'Quantum training advantage.',
        'Better training data than classical methods.',
        '93 records per 127 seconds without explaining bounded classical verification.',
      ],
      auditStatus: 'AUDITED_VERIFIED',
    },
    {
      id: 'CLAIM_MQT_CROSS_COMPILER_BENCHMARK',
      claimId: 'CLAIM_MQT_CROSS_COMPILER_BENCHMARK',
      statement:
        'On standard MQT benchmarks on IBM Heron, Q-Psi compiled all 18 frozen benchmark cases. Physical competitiveness was workload-dependent: Qiskit held a small aggregate fidelity advantage (-0.0067 delta), while the apparent aggregate advantage over TKET (+0.0398 delta) was driven by one routing-sensitive workload (vqe_su2_n8).',
      shortClaim:
        'External MQT Bench comparison against Qiskit and TKET shows mixed competitiveness.',
      experiment: 'MQT Cross-Compiler Benchmark (QPSI_MQT_CROSS_COMPILER_BENCHMARK_V1)',
      status: 'MIXED_OR_INCONCLUSIVE',
      publicationTier: 'TIER_A',
      qpu: 'ibm_marrakesh (IBM Heron r2, 156 programmable qubits)',
      jobId: 'da1ul7e3kjvs73877tag',
      shots: 36864,
      quantumSeconds: 16.80,
      sha256: '9d347393dd9f2b3c168ab706d2c4d55e0ff4ab1c65ea5091fb8b62527fc7e3e5',
      qualification:
        'Q-Psi compiled all 18 frozen benchmark cases. Physical competitiveness was workload-dependent: Qiskit held a small aggregate fidelity advantage, while the apparent aggregate advantage over TKET was driven by one routing-sensitive workload (vqe_su2_n8: +0.2696 delta; omitting vqe_su2_n8 yields -0.0062 delta vs TKET). Final status: MIXED_COMPETITIVENESS.',
      allowedWording: [
        'External MQT Bench comparison against Qiskit and TKET.',
        'Q-Psi compiled all 18 frozen benchmark cases. Physical competitiveness was workload-dependent: Qiskit held a small aggregate fidelity advantage, while the apparent aggregate advantage over TKET was driven by one routing-sensitive workload.',
        'Commercial benchmark classification: MIXED_COMPETITIVENESS.',
      ],
      prohibitedWording: [
        'Q-Psi beats TKET.',
        'Q-Psi beats Qiskit.',
        'Q-Psi is faster/better than leading quantum compilers generally.',
        'General compiler superiority.',
      ],
      auditStatus: 'AUDITED_VERIFIED',
    },
    {
      id: 'CLAIM_DYNAMIC_ROUTING_CROSSOVER',
      claimId: 'CLAIM_DYNAMIC_ROUTING_CROSSOVER',
      statement:
        'Dynamic routing compressed 2Q depth from 73 to 2 on the longest tested path (13 hops), but hardware reset and measurement noise prevented physical Bell-fidelity crossover on Heron r2, confirming pre-QPU compiler predictions.',
      shortClaim:
        'Dynamic ancilla routing compresses 2Q depth dramatically but shows no physical fidelity crossover over unitary routing.',
      experiment: 'Dynamic Routing Crossover (QPSI_DYNAMIC_ROUTING_CROSSOVER_V1)',
      status: 'SUPPORTED_WITH_QUALIFICATION',
      publicationTier: 'TIER_B',
      qpu: 'ibm_marrakesh (IBM Heron r2, 156 programmable qubits)',
      jobId: 'da1t22mg52gs73cm31i0',
      shots: 18432,
      quantumSeconds: 10.50,
      sha256: '6c8527a9854651585d5262b3c2399e612573906281ec030eef3be0005dbf83f0',
      qualification:
        'Unitary routing physically won on short and medium distances; long distance (13 hops) was statistically inconclusive. No dynamic routing superiority claimed.',
      allowedWording: [
        'Dynamic routing structurally compresses 2Q depth from 73 to 2 on long distances (13 hops), but hardware reset and measurement noise prevent a physical Bell fidelity crossover on IBM Marrakesh, confirming pre-QPU compiler predictions.',
      ],
      prohibitedWording: [
        'Dynamic routing always outperforms unitary routing on current hardware.',
        'Quantum routing advantage.',
      ],
      auditStatus: 'AUDITED_VERIFIED',
    },
    {
      id: 'CLAIM_COMPILER_STAGE6F_OPTIMIZATION',
      claimId: 'CLAIM_COMPILER_STAGE6F_OPTIMIZATION',
      statement:
        'QAOA-based compiler optimization on IBM Marrakesh achieved 4/4 exact optimum hits on small compiler graphs (N<=10), matching classical branch-and-bound, but degraded on N=18..25 due to hardware noise.',
      shortClaim:
        'Hardware-fit compiler optimization achieves exact classical parity for small instances (N<=10) on Heron r2.',
      experiment: 'Stage 6F Physical Optimization (QPSI_STAGE6F_PHYSICAL_OPTIMIZATION)',
      status: 'SUPPORTED_WITH_QUALIFICATION',
      publicationTier: 'TIER_B',
      qpu: 'ibm_marrakesh (IBM Heron r2, 156 programmable qubits)',
      jobId: 'da16h8ug52gs73cl8uog',
      shots: 16384,
      quantumSeconds: 15.20,
      sha256: '3f3b4c3982a267aa7fbf297adc4171ded2c8b1e24226a379df94bcfc53ac2783',
      qualification:
        'Exact classical optimum parity achieved only for small graphs (N<=10); large instances degraded under unmitigated NISQ error. No overall quantum advantage claimed.',
      allowedWording: [
        'QAOA-based compiler optimization on IBM Marrakesh achieves 4/4 exact optimum hits on small compiler graphs (N<=10), matching classical branch-and-bound, but degrades on N=18..25 due to hardware noise.',
      ],
      prohibitedWording: [
        'Quantum compiler optimization outpaces classical solvers.',
        'Quantum advantage for compiler optimization.',
      ],
      auditStatus: 'AUDITED_VERIFIED',
    },
    {
      id: 'CLAIM_QUANTUM_DATA_FOUNDRY_CODING_V1',
      claimId: 'CLAIM_QUANTUM_DATA_FOUNDRY_CODING_V1',
      statement:
        'Initial proof-of-concept demonstration of physical QPU selector on M=1024 space yielding 14 verified unique code repair records (4,096 shots, 4.70s runtime).',
      shortClaim:
        'Historical Data Foundry V1 proof-of-concept baseline.',
      experiment: 'Quantum Data Foundry V1 (QPSI_QUANTUM_DATA_FOUNDRY_CODING_V1)',
      status: 'SUPPORTED_WITH_QUALIFICATION',
      publicationTier: 'TIER_B',
      qpu: 'ibm_marrakesh (IBM Heron r2, 156 programmable qubits)',
      jobId: 'da1vc94dedkc73eri8qg',
      shots: 4096,
      quantumSeconds: 4.70,
      sha256: '9f7ac0139566025b7b932df60f8fff1313698170b17ab9ffcd140a5e3ae1b998',
      qualification:
        'Historical proof-of-concept run; superseded by the V2 120-Qsec campaign.',
      allowedWording: [
        'Initial feasibility demonstration of physical QPU selector on M=1024 space yielding 14 verified unique code repair records.',
      ],
      prohibitedWording: [
        'Headline data generation result.',
      ],
      auditStatus: 'AUDITED_VERIFIED',
    },
    {
      id: 'CLAIM_CALIBRATION_AWARE_LAYOUT_VS_QISKIT',
      claimId: 'CLAIM_CALIBRATION_AWARE_LAYOUT_VS_QISKIT',
      statement:
        'Against a strong baseline of Qiskit O3 best-of-8 seeds, Q-Psi calibration-aware layout achieved 1 win, 2 losses, 3 inconclusive (mean delta -0.0106), demonstrating that Qiskit multi-seed search remained superior or competitive on Heron r2.',
      shortClaim:
        'Calibration-aware layout vs Qiskit: rigorous negative comparator result.',
      experiment: 'Calibration-Aware Layout (QPSI_CALIBRATION_AWARE_LAYOUT_V1)',
      status: 'NOT_SUPPORTED',
      publicationTier: 'TIER_C',
      qpu: 'ibm_marrakesh (IBM Heron r2, 156 programmable qubits)',
      jobId: 'da1tm0eg52gs73cm3mh0',
      shots: 36864,
      quantumSeconds: 13.20,
      sha256: '5c5b9dff337488cb35d4fcc2de0efcbe2e63c05f1264ef05c8bb006e17df0eb6',
      qualification:
        'Preserved as an authentic negative baseline comparator to document willing publication of falsifying evidence.',
      allowedWording: [
        'Against a strong baseline of Qiskit O3 best-of-8 seeds, Q-Psi calibration-aware layout achieves 1 win, 2 losses, 3 inconclusive (mean delta -0.0106), demonstrating that Qiskit multi-seed search remains superior or competitive on Heron r2.',
      ],
      prohibitedWording: [
        'Q-Psi calibration layout outperforms Qiskit layout on IBM Heron.',
        'Compiler layout advantage over Qiskit.',
      ],
      auditStatus: 'AUDITED_VERIFIED',
    },
    {
      id: 'CLAIM_FRACTIONAL_GATE_LOWERING',
      claimId: 'CLAIM_FRACTIONAL_GATE_LOWERING',
      statement:
        'Fractional gate lowering yielded structural pulse duration reductions and 2/6 physical wins, with 4/6 cases inconclusive on IBM Marrakesh, supporting mixed physical signal.',
      shortClaim:
        'Fractional pulse gate lowering reduces pulse duration structurally but yields mixed physical fidelity improvements.',
      experiment: 'Fractional Gate Lowering (QPSI_FRACTIONAL_GATE_LOWERING_V1)',
      status: 'MIXED_OR_INCONCLUSIVE',
      publicationTier: 'TIER_C',
      qpu: 'ibm_marrakesh (IBM Heron r2, 156 programmable qubits)',
      jobId: 'da1tg6eg52gs73cm3gg0',
      shots: 24576,
      quantumSeconds: 8.80,
      sha256: '8a5cb81cf1b069baed93926ab75fcd9dd37a589c6d220aa41455293f2ebc23ae',
      qualification:
        'Structural pulse duration compression does not translate to universal physical fidelity advantage across all workloads (2 wins, 4 inconclusive).',
      allowedWording: [
        'Fractional gate lowering yields structural gate duration reductions and 2/6 physical wins (N4_B, N8_B), with 4/6 cases inconclusive on IBM Marrakesh, supporting mixed physical signal.',
      ],
      prohibitedWording: [
        'Universal fidelity improvement from fractional pulse lowering.',
        'Pulse-level quantum advantage.',
      ],
      auditStatus: 'AUDITED_VERIFIED',
    },
    {
      id: 'CLAIM_DIRECTED_EXECUTION_SELECTION',
      claimId: 'CLAIM_DIRECTED_EXECUTION_SELECTION',
      statement:
        'Selective Pauli twirling twirled only 41.1% of CZ layers on IBM Directed Execution beta mode (58.9% reduction in twirling overhead); achieved 1 win vs unmitigated RAW baseline; comparison vs full twirling remained inconclusive.',
      shortClaim:
        'Selective Pauli twirling reduces randomized compilation overhead with mixed fidelity retention on beta hardware.',
      experiment: 'Directed Execution Selection (QPSI_DIRECTED_EXECUTION_SELECTION_V1)',
      status: 'MIXED_OR_INCONCLUSIVE',
      publicationTier: 'TIER_C',
      qpu: 'ibm_marrakesh (IBM Heron r2, 156 programmable qubits)',
      jobId: 'da1u5o63kjvs73877cm0',
      shots: 24576,
      quantumSeconds: 14.50,
      sha256: '2ae1632ebe9645be032fb2a29f60eb669ecc8bd8712d68a5837039b5bd79a97a',
      qualification:
        'Evaluated on IBM Directed Execution beta mode; selective vs full non-inferiority was not statistically established across tested circuits.',
      allowedWording: [
        'Risk-mass layer selection selects only 41.1% of CZ layers for twirling on IBM Directed Execution beta mode; yields 1/4 win vs unmitigated RAW baseline and statistically inconclusive comparison vs full twirling.',
      ],
      prohibitedWording: [
        'Selective twirling proven superior to full randomized compiling.',
        'Directed execution advantage.',
      ],
      auditStatus: 'AUDITED_VERIFIED',
    },
    {
      id: 'CLAIM_RESTRICTED_SIMON_ALGORITHM',
      claimId: 'CLAIM_RESTRICTED_SIMON_ALGORITHM',
      statement:
        'Physical execution on IBM Marrakesh recovered secrets on 6/12 instances (N=8..28) with polynomial query count reduction relative to classical bound, but noise-induced degradation on larger N prevented establishing asymptotic quantum speedup.',
      shortClaim:
        'Restricted Simon physical study achieves polynomial query reduction on recovered instances but inconclusive asymptotic advantage.',
      experiment: 'Restricted Simon (QPSI_RESTRICTED_SIMON_PHYSICAL_STUDY)',
      status: 'MIXED_OR_INCONCLUSIVE',
      publicationTier: 'TIER_C',
      qpu: 'ibm_marrakesh (IBM Heron r2, 156 programmable qubits)',
      jobId: 'da1a0piein7c73bd5beg',
      shots: 24576,
      quantumSeconds: 18.50,
      sha256: 'aa22b8b023d03f9f64ccfc35b268f9dc3536fac149843938e67f0e381e4ef79a',
      qualification:
        'Inconclusive due to 6/12 recovery failures at higher N under hardware noise. No asymptotic physical speedup claimed.',
      allowedWording: [
        'Physical execution on IBM Marrakesh recovered secrets on 6/12 instances (N=8..28) with polynomial query count reduction relative to classical bound, but noise-induced degradation on larger N prevents establishing asymptotic quantum speedup.',
      ],
      prohibitedWording: [
        'Demonstrated asymptotic quantum speedup for Simon\'s algorithm.',
        'Unconditional physical quantum advantage.',
      ],
      auditStatus: 'AUDITED_VERIFIED',
    },
    {
      id: 'CLAIM_STATIC_BV_MANTRA_EXPLORATORY',
      claimId: 'CLAIM_STATIC_BV_MANTRA_EXPLORATORY',
      statement:
        'Exploratory hardware calibration run on static BV and mantra state encoding on IBM Marrakesh demonstrated distinct measured output distributions.',
      shortClaim:
        'Early exploratory benchmark on static BV and mantra state encoding.',
      experiment: 'Static BV / Mantra Exploratory (QPSI_STATIC_BV_MANTRA_EXPLORATORY)',
      status: 'EXPLORATORY',
      publicationTier: 'TIER_C',
      qpu: 'ibm_marrakesh (IBM Heron r2, 156 programmable qubits)',
      jobId: 'da1a01e3kjvs73874uog',
      shots: 4096,
      quantumSeconds: 2.10,
      sha256: '6d24837313ca01b52f1d602ef0249f0bcc1b6714bb5ba974ec967153674d838f',
      qualification:
        'Exploratory calibration run only; zero metaphysical, causal, or consciousness claims.',
      allowedWording: [
        'Exploratory hardware calibration run on static BV and mantra state encoding on IBM Marrakesh.',
      ],
      prohibitedWording: [
        'Algorithmic quantum advantage on static BV.',
        'Metaphysical, spiritual, or consciousness claims.',
      ],
      auditStatus: 'AUDITED_VERIFIED',
    },
    {
      id: 'CLAIM_MULTI_BACKEND_SELECTION',
      claimId: 'CLAIM_MULTI_BACKEND_SELECTION',
      statement:
        'Across six canonical workloads and three IBM Heron r2 backends, Q-Psi successfully retargeted all 18 workload-backend combinations. Its pre-QPU selection heuristic placed the selected backend in the physically best statistical tier for 5 of 6 workloads, with one selection miss.',
      shortClaim:
        'Multi-backend retargeting across 3 IBM Heron r2 backends with 5/6 top-tier selection accuracy.',
      experiment: 'Multi-Backend Selection (QPSI_MULTI_BACKEND_SELECTION_V1)',
      status: 'SUPPORTED_WITH_QUALIFICATION',
      publicationTier: 'TIER_B',
      qpu: 'ibm_fez, ibm_kingston, ibm_marrakesh (IBM Heron r2, 156 programmable qubits)',
      jobId: 'da1uqsaein7c73bdtkm0, da1uqtm3kjvs738783qg, da1uqumg52gs73cm4v50',
      shots: 36864,
      quantumSeconds: 29.00,
      sha256: '4218490b1044e1e99ddda8ffd278ab2f7525d400e7025c181f4810496f3ac576',
      qualification:
        'Tested on three IBM Heron r2 backends from one provider and one processor family. This does not establish multi-provider portability, universal backend-selection superiority, general compiler advantage, or general quantum advantage.',
      allowedWording: [
        'Across six canonical workloads and three IBM Heron r2 backends, Q-Psi successfully retargeted all 18 workload-backend combinations.',
        'Its frozen pre-QPU selection heuristic selected a backend in the physically best statistical tier for 5/6 workloads.',
      ],
      prohibitedWording: [
        'Multi-provider portability.',
        'Cross-vendor compiler independence.',
        'General backend-selection superiority.',
        'Universal compiler advantage.',
        'General quantum advantage.',
        'Best backend selected on 5/6 workloads.',
      ],
      auditStatus: 'POST_FREEZE_ADDENDUM_SUPPORTED',
    },
    {
      id: 'CLAIM_GENERAL_QUANTUM_ADVANTAGE',
      claimId: 'CLAIM_GENERAL_QUANTUM_ADVANTAGE',
      statement:
        'General quantum advantage for arbitrary classical software or compilation tasks is NOT established by Q-Psi research and is explicitly disclaimed.',
      shortClaim:
        'General quantum advantage: explicitly disclaimed.',
      experiment: 'Program-Wide Boundary',
      status: 'NOT_SUPPORTED',
      publicationTier: 'DISCLAIMED',
      qpu: 'N/A',
      jobId: 'N/A',
      sha256: '',
      qualification:
        'Explicitly rejected across the entire research program.',
      allowedWording: [
        'General quantum advantage is NOT established by Q-Psi research.',
        'No general quantum speedup for arbitrary software repair.',
      ],
      prohibitedWording: [
        'Q-Psi has achieved general quantum advantage.',
        'Quantum computers outperform classical computers on general software tasks.',
      ],
      auditStatus: 'EXPLICITLY_DISCLAIMED',
    },
    {
      id: 'CLAIM_GENERAL_COMPILER_SUPERIORITY',
      claimId: 'CLAIM_GENERAL_COMPILER_SUPERIORITY',
      statement:
        'General compiler runtime or optimization superiority over industrial compiler toolchains (Qiskit, TKET) is NOT established by Q-Psi research and is explicitly disclaimed.',
      shortClaim:
        'General compiler superiority: explicitly disclaimed.',
      experiment: 'Program-Wide Boundary',
      status: 'NOT_SUPPORTED',
      publicationTier: 'DISCLAIMED',
      qpu: 'N/A',
      jobId: 'N/A',
      sha256: '',
      qualification:
        'Explicitly disclaimed; results show specialized advantages, workload-dependent competitiveness, and strong baseline parity.',
      allowedWording: [
        'General compiler superiority over industrial toolchains (Qiskit, TKET) is NOT established.',
      ],
      prohibitedWording: [
        'Q-Psi is universally superior to Qiskit and TKET.',
        'Q-Psi beats Qiskit.',
        'Q-Psi beats TKET.',
      ],
      auditStatus: 'EXPLICITLY_DISCLAIMED',
    },
  ] as ClaimItem[],

  // 15 Comprehensive Audited Experiments (14 Completed + 1 Incomplete Protocol)
  experiments: [
    {
      code: 'EXP-01-GROVER',
      id: 'QPSI_COMPILER_GROVER_V1_1',
      title: 'COMPILER + GROVER QUERY ADVANTAGE',
      subtitle: 'Physical-QPU Candidate-State Search on IBM Heron',
      category: 'COMPILER_SEARCH_ADVANTAGE',
      backend: 'ibm_marrakesh',
      processor: 'IBM Heron r2 (156 programmable qubits)',
      jobIds: ['da1c7rkdedkc73eqs5mg'],
      shots: 18432,
      quantumSeconds: 2.50,
      qubits: '2 – 4 Qubits (N=4, 8, 16 Candidates)',
      tier: 'TIER_A',
      status: 'SUPPORTED',
      statusLabel: 'SUPPORTED',
      primaryResult:
        'Demonstrated compiler-enabled physical quantum query advantage on structured search spaces on IBM Heron hardware: query reduction of 2.43x (N=4), 1.73x (N=8), and 1.19x (N=16) across 9/9 cases and 3/3 problem sizes.',
      qualification:
        'Advantage established strictly under black-box query model with compiler-synthesized oracles; does not imply wall-clock runtime speedup or universal software-repair advantage.',
      rawSha256: '8f65edbe0cea3ffdc16f3ff89b07beaf6ab111019a556c1cde56b274c0e18ff2',
      researchNoteUrl: '/research/compiler-grover-query-advantage',
    },
    {
      code: 'EXP-02-DVBV',
      id: 'QPSI_DYNAMIC_BV_QUERY_ADVANTAGE',
      title: 'DYNAMIC BERNSTEIN–VAZIRANI',
      subtitle: 'Single-Shot Query-Complexity Scaling Advantage',
      category: 'ALGORITHMIC_QUERY_ADVANTAGE',
      backend: 'ibm_marrakesh',
      processor: 'IBM Heron r2 (156 programmable qubits)',
      jobIds: ['da1a03mg52gs73clcj80'],
      shots: 28672,
      quantumSeconds: 14.20,
      qubits: '4 – 16 Qubits',
      tier: 'TIER_A',
      status: 'SUPPORTED',
      statusLabel: 'SUPPORTED',
      primaryResult:
        'Statistically significant physical quantum query complexity scaling advantage on N=4..16 qubits (slope 0.153 vs classical 0.696, t = -30.65, p = 3.47e-7).',
      qualification:
        'Advantage established under the query complexity model for the tested dynamic black-box oracle family; does not imply wall-clock runtime speedup or general quantum advantage.',
      rawSha256: '72e8773865cdcbba302f24ae2bfc136c3a0cf4878a2493db0828a104508fa1ba',
      researchNoteUrl: '/research/dynamic-bv',
    },
    {
      code: 'EXP-03-MCM-REUSE',
      id: 'QPSI_MCM_QUBIT_REUSE_V1',
      title: 'MCM QUBIT REUSE',
      subtitle: 'Compiler Liveness & Mid-Circuit Register Compression',
      category: 'MID_CIRCUIT_MEASUREMENT_REUSE',
      backend: 'ibm_marrakesh',
      processor: 'IBM Heron r2 (156 programmable qubits)',
      jobIds: ['da1u0om3kjvs738777cg'],
      shots: 24576,
      quantumSeconds: 10.80,
      qubits: '2 – 3 Physical Slots (for 8..16 Logical)',
      tier: 'TIER_A',
      status: 'SUPPORTED_WITH_QUALIFICATION',
      statusLabel: 'SUPPORTED WITH QUALIFICATION',
      primaryResult:
        'Qubit reuse compiler reduced register footprint by median 78.1% (up to 87.5% on N=16) with 4/6 reuse wins and 6/6 non-inferior cases on physical observable RMSE.',
      qualification:
        'Scope limited to streaming and sequential liveness-compatible circuits; does not claim arbitrary 16-qubit algorithms run on 2 qubits.',
      rawSha256: 'ec0f2cea637f433f9d134d05a7168b3114b4526c2f5483288efbdea01d83e8e4',
      researchNoteUrl: '/research/mcm-qubit-reuse',
    },
    {
      code: 'EXP-04-DATA-FOUNDRY-V2',
      id: 'QPSI_QUANTUM_DATA_FOUNDRY_CODING_V2_120QSEC',
      title: 'QUANTUM DATA FOUNDRY V2',
      subtitle: 'Physical-QPU Code Data Generation Pipeline Feasibility',
      category: 'QUANTUM_ASSISTED_DATA_FOUNDRY',
      backend: 'ibm_marrakesh',
      processor: 'IBM Heron r2 (156 programmable qubits)',
      jobIds: ['da1vjh4dedkc73erijq0', 'da1vjmeg52gs73cm5us0', 'da1vk3mg52gs73cm607g', 'da1vke63kjvs738795og'],
      shots: 332768,
      quantumSeconds: 127.58,
      qubits: '16 Selector Qubits (65,536 State Space)',
      tier: 'TIER_A',
      status: 'SUPPORTED_WITH_QUALIFICATION',
      statusLabel: 'SUPPORTED WITH QUALIFICATION',
      primaryResult:
        '332,768 physical QPU samples across 4 jobs sampled 65,138 unique candidate states, yielding 93 verifier-backed positive repair records (1.593 MB, ~417k tokens) with 100% QPU provenance.',
      qualification:
        'Feasibility demonstration only. Current throughput bottleneck is classical verification (158 evaluated of 65k QPU states). Downstream LLM fine-tuning and model improvement were NOT tested.',
      rawSha256: 'dfd11daa2f1f51b29e15019741363a3fd03672f8ccd562c52c4a762d656dc89f',
      researchNoteUrl: '/research/data-foundry',
    },
    {
      code: 'EXP-05-MQT-BENCH',
      id: 'QPSI_MQT_CROSS_COMPILER_BENCHMARK_V1',
      title: 'MQT CROSS-COMPILER BENCHMARK',
      subtitle: 'External Comparison Against Qiskit O3 and TKET',
      category: 'EXTERNAL_BENCHMARK_COMPARISON',
      backend: 'ibm_marrakesh',
      processor: 'IBM Heron r2 (156 programmable qubits)',
      jobIds: ['da1ul7e3kjvs73877tag'],
      shots: 36864,
      quantumSeconds: 16.80,
      qubits: '6 – 8 Qubits (18 Compilation Cases)',
      tier: 'TIER_A',
      status: 'MIXED_OR_INCONCLUSIVE',
      statusLabel: 'MIXED COMPETITIVENESS',
      primaryResult:
        '18/18 valid compilations across MQT suite; physical execution shows mixed competitiveness (disfavored vs Qiskit by -0.0067 delta, favored vs TKET by +0.0398 delta driven by vqe_su2_n8).',
      qualification:
        'Advantage over TKET is sensitive to vqe_su2_n8 (+0.2696 delta); without vqe_su2_n8, mean delta vs TKET is -0.0062. Q-Psi is disfavored vs Qiskit O3 (-0.0067 delta).',
      rawSha256: '9d347393dd9f2b3c168ab706d2c4d55e0ff4ab1c65ea5091fb8b62527fc7e3e5',
      researchNoteUrl: '/research/mqt-cross-compiler',
    },
    {
      code: 'EXP-06-ROUTING',
      id: 'QPSI_DYNAMIC_ROUTING_CROSSOVER_V1',
      title: 'DYNAMIC ROUTING CROSSOVER',
      subtitle: 'Depth Compression vs Physical Bell Fidelity Tradeoffs',
      category: 'DYNAMIC_ROUTING_CROSSOVER',
      backend: 'ibm_marrakesh',
      processor: 'IBM Heron r2 (156 programmable qubits)',
      jobIds: ['da1t22mg52gs73cm31i0'],
      shots: 18432,
      quantumSeconds: 10.50,
      qubits: '4 – 14 Qubits (3 Distances: 3, 7, 13 Hops)',
      tier: 'TIER_B',
      status: 'SUPPORTED_WITH_QUALIFICATION',
      statusLabel: 'SUPPORTED WITH QUALIFICATION',
      primaryResult:
        'Dynamic routing compressed 2Q depth from 73 to 2 on 13 hops; unitary routing won on short/medium distances (2/2 confirmed predictions); empirical physical crossover was not resolved.',
      qualification:
        'No physical Bell fidelity crossover observed due to reset and measurement noise; unitary routing remains physically superior for D<=7.',
      rawSha256: '6c8527a9854651585d5262b3c2399e612573906281ec030eef3be0005dbf83f0',
      researchNoteUrl: '/research/dynamic-routing-crossover',
    },
    {
      code: 'EXP-07-STAGE6F',
      id: 'QPSI_STAGE6F_PHYSICAL_OPTIMIZATION',
      title: 'STAGE 6F PHYSICAL OPTIMIZATION',
      subtitle: 'QUBO/Ising Mapping & QAOA Optimization Parity',
      category: 'COMPILER_PHYSICAL_OPTIMIZATION',
      backend: 'ibm_marrakesh',
      processor: 'IBM Heron r2 (156 programmable qubits)',
      jobIds: ['da16h8ug52gs73cl8uog'],
      shots: 16384,
      quantumSeconds: 15.20,
      qubits: '5 – 25 Qubits',
      tier: 'TIER_B',
      status: 'SUPPORTED_WITH_QUALIFICATION',
      statusLabel: 'SUPPORTED WITH QUALIFICATION',
      primaryResult:
        '4/4 exact optimum hits on small compiler graphs (N<=10), matching classical branch-and-bound; degraded to 0/4 hits on N=18..25 due to hardware noise.',
      qualification:
        'Exact classical optimum parity achieved only for small graphs (N<=10); large instances degraded under NISQ noise. No quantum advantage claimed.',
      rawSha256: '3f3b4c3982a267aa7fbf297adc4171ded2c8b1e24226a379df94bcfc53ac2783',
      researchNoteUrl: '/compiler',
    },
    {
      code: 'EXP-08-DATA-FOUNDRY-V1',
      id: 'QPSI_QUANTUM_DATA_FOUNDRY_CODING_V1',
      title: 'QUANTUM DATA FOUNDRY V1',
      subtitle: 'Proof-of-Concept Baseline on 1,024 Candidate Space',
      category: 'QUANTUM_ASSISTED_DATA_FOUNDRY',
      backend: 'ibm_marrakesh',
      processor: 'IBM Heron r2 (156 programmable qubits)',
      jobIds: ['da1vc94dedkc73eri8qg'],
      shots: 4096,
      quantumSeconds: 4.70,
      qubits: '10 Qubits (1,024 State Space)',
      tier: 'TIER_B',
      status: 'SUPPORTED_WITH_QUALIFICATION',
      statusLabel: 'SUPPORTED WITH QUALIFICATION',
      primaryResult:
        'Initial feasibility demonstration of physical QPU selector on M=1024 space yielding 14 verified unique code repair records.',
      qualification:
        'Proof-of-concept run; superseded by V2 120-Qsec campaign.',
      rawSha256: '9f7ac0139566025b7b932df60f8fff1313698170b17ab9ffcd140a5e3ae1b998',
      researchNoteUrl: '/research/data-foundry',
    },
    {
      code: 'EXP-09-CALIBRATION-LAYOUT',
      id: 'QPSI_CALIBRATION_AWARE_LAYOUT_V1',
      title: 'CALIBRATION-AWARE LAYOUT VS QISKIT',
      subtitle: 'Multi-Seed Layout Search Negative Comparator Study',
      category: 'HARDWARE_AWARE_LAYOUT',
      backend: 'ibm_marrakesh',
      processor: 'IBM Heron r2 (156 programmable qubits)',
      jobIds: ['da1tm0eg52gs73cm3mh0'],
      shots: 36864,
      quantumSeconds: 13.20,
      qubits: '6 – 10 Qubits',
      tier: 'TIER_C',
      status: 'NOT_SUPPORTED',
      statusLabel: 'NOT SUPPORTED (PRESERVED NEGATIVE)',
      primaryResult:
        'Q-Psi calibration layout achieved 1 win, 2 losses, 3 inconclusive vs Qiskit O3 best-of-8 baseline (mean delta -0.0106); hypothesis NOT SUPPORTED.',
      qualification:
        'Rigorous negative result preserved. Qiskit multi-seed layout search remains competitive or superior on IBM Heron r2.',
      rawSha256: '5c5b9dff337488cb35d4fcc2de0efcbe2e63c05f1264ef05c8bb006e17df0eb6',
      researchNoteUrl: '/research/calibration-aware-layout',
    },
    {
      code: 'EXP-10-FRACTIONAL-GATES',
      id: 'QPSI_FRACTIONAL_GATE_LOWERING_V1',
      title: 'FRACTIONAL GATE LOWERING',
      subtitle: 'Pulse-Level Duration Reduction vs Physical Fidelity',
      category: 'PULSE_GATE_LOWERING',
      backend: 'ibm_marrakesh',
      processor: 'IBM Heron r2 (156 programmable qubits)',
      jobIds: ['da1tg6eg52gs73cm3gg0'],
      shots: 24576,
      quantumSeconds: 8.80,
      qubits: '4 – 8 Qubits',
      tier: 'TIER_C',
      status: 'MIXED_OR_INCONCLUSIVE',
      statusLabel: 'MIXED / INCONCLUSIVE',
      primaryResult:
        'Fractional pulse gate lowering achieved structural duration reduction and 2/6 physical wins (N4_B, N8_B), with 4/6 inconclusive cases; classified as mixed physical signal.',
      qualification:
        'Structural pulse duration compression does not translate to universal physical fidelity advantage across all workloads.',
      rawSha256: '8a5cb81cf1b069baed93926ab75fcd9dd37a589c6d220aa41455293f2ebc23ae',
      researchNoteUrl: '/research/fractional-gate-lowering',
    },
    {
      code: 'EXP-11-DIRECTED-EXEC',
      id: 'QPSI_DIRECTED_EXECUTION_SELECTION_V1',
      title: 'DIRECTED EXECUTION SELECTION',
      subtitle: 'Selective Pauli Twirling Overhead Compression on Beta Hardware',
      category: 'DIRECTED_EXECUTION_SELECTION',
      backend: 'ibm_marrakesh',
      processor: 'IBM Heron r2 (156 programmable qubits)',
      jobIds: ['da1u5o63kjvs73877cm0'],
      shots: 24576,
      quantumSeconds: 14.50,
      qubits: '6 – 8 Qubits',
      tier: 'TIER_C',
      status: 'MIXED_OR_INCONCLUSIVE',
      statusLabel: 'MIXED / INCONCLUSIVE',
      primaryResult:
        'Selective Pauli twirling twirled only 41.1% of CZ layers on IBM Directed Execution beta mode; achieved 1 win vs unmitigated RAW baseline; comparison vs full twirling was inconclusive.',
      qualification:
        'Evaluated on IBM Directed Execution beta mode; selective vs full non-inferiority was inconclusive across tested circuits.',
      rawSha256: '2ae1632ebe9645be032fb2a29f60eb669ecc8bd8712d68a5837039b5bd79a97a',
      researchNoteUrl: '/research/directed-execution',
    },
    {
      code: 'EXP-12-SIMON',
      id: 'QPSI_RESTRICTED_SIMON_PHYSICAL_STUDY',
      title: 'RESTRICTED SIMON STUDY',
      subtitle: 'Constant-Depth Circuit Evaluation up to 28 Qubits / 56 Slots',
      category: 'ALGORITHMIC_QUERY_COMPLEXITY',
      backend: 'ibm_marrakesh',
      processor: 'IBM Heron r2 (156 programmable qubits)',
      jobIds: ['da1a0piein7c73bd5beg'],
      shots: 24576,
      quantumSeconds: 18.50,
      qubits: '8 – 28 Qubits (16 – 56 Physical Slots)',
      tier: 'TIER_C',
      status: 'MIXED_OR_INCONCLUSIVE',
      statusLabel: 'MIXED / INCONCLUSIVE',
      primaryResult:
        '6/12 instances recovered on physical hardware (N=8..28) with polynomial query reductions, but recovery failures at higher N due to noise prevent establishing asymptotic speedup.',
      qualification:
        'Inconclusive asymptotic physical speedup due to NISQ decoherence failures on large N (6/12 recovered overall).',
      rawSha256: 'aa22b8b023d03f9f64ccfc35b268f9dc3536fac149843938e67f0e381e4ef79a',
      researchNoteUrl: '/research/restricted-simon',
    },
    {
      code: 'EXP-13-STATIC-BV-MANTRA',
      id: 'QPSI_STATIC_BV_MANTRA_EXPLORATORY',
      title: 'STATIC BV & MANTRA ENCODING',
      subtitle: 'Exploratory Hilbert Space Mapping & Calibration',
      category: 'EXPLORATORY_BENCHMARK',
      backend: 'ibm_marrakesh',
      processor: 'IBM Heron r2 (156 programmable qubits)',
      jobIds: ['da1a01e3kjvs73874uog'],
      shots: 4096,
      quantumSeconds: 2.10,
      qubits: '5 Qubits',
      tier: 'TIER_C',
      status: 'EXPLORATORY',
      statusLabel: 'EXPLORATORY',
      primaryResult:
        'Exploratory demonstration of 5-qubit static Bernstein-Vazirani and state preparation on physical hardware.',
      qualification:
        'Exploratory early calibration experiment only; zero metaphysical, causal, or consciousness claims.',
      rawSha256: '6d24837313ca01b52f1d602ef0249f0bcc1b6714bb5ba974ec967153674d838f',
      researchNoteUrl: '/experiments',
    },
    {
      code: 'EXP-14-STAGE6C-R1',
      id: 'QPSI_STAGE6C_R1',
      title: 'STAGE 6C-R1 STATE PRUNING',
      subtitle: 'Deterministic Classical Search Space Reduction Baseline',
      category: 'COMPILER_SEARCH_SPACE',
      backend: 'Classical IR Search Engine',
      processor: 'Classical CPU',
      jobIds: [],
      shots: 0,
      quantumSeconds: 0.0,
      qubits: '17 Simulated Layout Variables',
      tier: 'TIER_C',
      status: 'SUPPORTED',
      statusLabel: 'SUPPORTED (CLASSICAL BASELINE)',
      primaryResult:
        'Deterministic changed-file state compiler achieved 98.4% candidate reduction with zero ground truth leakage on developmental benchmark universe.',
      qualification:
        'Evaluated on developmental benchmark universe; developmental milestone.',
      rawSha256: '0cb7c960c2fa21058578c537a729ff0498efc7ab2207398e3ff9b54f9d9136b8',
      researchNoteUrl: '/compiler',
    },
    {
      code: 'EXP-15-MULTI-BACKEND',
      id: 'QPSI_MULTI_BACKEND_SELECTION_V1',
      title: 'MULTI-BACKEND RETARGETING & SELECTION',
      subtitle: 'Cross-Backend Retargeting & Pre-QPU Selection (Heron r2 Cohort)',
      category: 'MULTI_BACKEND_RETARGETING_AND_SELECTION',
      backend: 'ibm_fez, ibm_kingston, ibm_marrakesh',
      processor: 'IBM Heron r2 (156 programmable qubits)',
      jobIds: ['da1uqsaein7c73bdtkm0', 'da1uqtm3kjvs738783qg', 'da1uqumg52gs73cm4v50'],
      shots: 36864,
      quantumSeconds: 29.00,
      qubits: '6 - 8 Logical (156 Physical)',
      tier: 'TIER_B',
      status: 'SUPPORTED_WITH_QUALIFICATION',
      statusLabel: 'SUPPORTED (ADDENDUM)',
      primaryResult:
        'Across six canonical workloads and three IBM Heron r2 backends, Q-Psi successfully retargeted all 18 workload-backend combinations (100.0%). Its pre-QPU selection heuristic placed the selected backend in the physically best statistical tier for 5 of 6 workloads (1 clear win, 4 ties, 1 miss).',
      qualification:
        'Single-provider, single-family cohort (IBM Heron r2). Does not establish multi-provider portability or general backend-selection superiority.',
      rawSha256: '4218490b1044e1e99ddda8ffd278ab2f7525d400e7025c181f4810496f3ac576',
      researchNoteUrl: '/research',
    },
  ] as ExperimentItem[],

  // Papers & Formal Manuscripts
  papers: [
    {
      id: 'paper-compiler-grover',
      title: 'Compiler-Enabled Quantum Query Advantage for Candidate-State Search on Physical Quantum Hardware',
      targetTitle: 'Compiler-Enabled Quantum Query Advantage for Candidate-State Search on Physical Quantum Hardware',
      authors: ['Q-Psi Research Team'],
      status: 'DRAFT',
      date: 'August 2026',
      abstract:
        'Reports an empirical demonstration of compiler-enabled quantum query advantage for software-repair candidate-state search on a 156-qubit Heron processor (ibm_marrakesh). Across 9 frozen instances from 7 language ecosystems at N=4, N=8, and N=16, physical quantum execution achieved lower effective verifier query complexity than the classical black-box baseline (9/9 cases, 3/3 problem sizes; N=16 95% CI upper bound 7.360 < 8.5).',
      link: '/research/compiler-grover-query-advantage',
    },
    {
      id: 'paper-data-foundry',
      title: 'Quantum-Assisted Synthetic Code Data Generation via Physical QPU State Selection and Executable Verification',
      targetTitle: 'Quantum-Assisted Synthetic Code Data Generation via Physical QPU State Selection and Executable Verification',
      authors: ['Q-Psi Research Team'],
      status: 'DRAFT',
      date: 'August 2026',
      abstract:
        'Demonstrates an end-to-end physical-QPU-assisted coding data generation pipeline on IBM Heron r2 (127.58 quantum seconds, 332,768 shots across 4 jobs). QPU sampling of a 65,536-state universe supplied 65,138 candidate states converted by automated classical verifiers into 93 unique verified positive code repair records (1.593 MB, ~417k token-equivalent) with 100% QPU provenance.',
      link: '/research/data-foundry',
    },
    {
      id: 'paper-mcm-qubit-reuse',
      title: 'Mid-Circuit Measurement and Qubit Reuse Compilation on Superconducting Quantum Hardware',
      targetTitle: 'Mid-Circuit Measurement and Qubit Reuse Compilation on Superconducting Quantum Hardware: Physical Liveness Analysis and Observable Non-Inferiority',
      authors: ['Q-Psi Research Team'],
      status: 'DRAFT',
      date: 'August 2026',
      abstract:
        'Evaluates dynamic qubit reuse compiler passes on IBM Heron (ibm_marrakesh), compressing active physical register width by a median 78.1% (up to 87.5% on 16 logical qubits mapped to 2 physical slots) while satisfying pre-registered non-inferiority bounds across all 6 tested streaming circuits.',
      link: '/research/mcm-qubit-reuse',
    },
    {
      id: 'paper-dynamic-routing',
      title: 'Hardware-Aware Compiler Routing on Superconducting Processors: Depth-Fidelity Tradeoffs and Latency Limits in Physical Dynamic Circuits',
      targetTitle: 'Hardware-Aware Compiler Routing on Superconducting Processors: Depth-Fidelity Tradeoffs and Latency Limits in Physical Dynamic Circuits',
      authors: ['Q-Psi Research Team'],
      status: 'RESEARCH MANUSCRIPT',
      date: 'August 2026',
      abstract:
        'Reports physical QPU benchmark results comparing unitary SWAP routing against dynamic measurement and feed-forward routing on IBM Heron (ibm_marrakesh, 156 programmable qubits, Job da1t22mg52gs73cm31i0, 18,432 shots). While dynamic circuits maintained constant two-qubit depth (2 vs 13, 37, 73), unitary routing won Bell fidelity on SHORT (3 hops) and MEDIUM (7 hops), with LONG (13 hops) inconclusive. Pre-QPU model confirmed 2/2 conclusive predictions.',
      link: '/research/dynamic-routing-crossover',
    },
    {
      id: 'paper-mqt-benchmark',
      title: 'Cross-Compiler Benchmarking on IBM Heron: Q-Psi vs Qiskit O3 and TKET on the MQT Benchmark Suite',
      targetTitle: 'Cross-Compiler Benchmarking on IBM Heron: Q-Psi vs Qiskit O3 and TKET on the MQT Benchmark Suite',
      authors: ['Q-Psi Research Team'],
      status: 'RESEARCH MANUSCRIPT',
      date: 'August 2026',
      abstract:
        'Evaluates 18 compilation cases and 6 physical execution cases on IBM Marrakesh against industrial standard compilers Qiskit O3 and TKET. Documents valid 18/18 compilation, workload-dependent physical competitiveness (-0.0067 mean delta vs Qiskit, +0.0398 mean delta vs TKET), and analyzes sensitivity to single-workload routing failures.',
      link: '/research/mqt-cross-compiler',
    },
    {
      id: 'paper-dynamic-bv',
      title: 'Experimental Demonstration of Algorithmic Query Advantage in Single-Shot Dynamic Bernstein-Vazirani',
      targetTitle: 'Experimental Demonstration of Algorithmic Query Advantage in Single-Shot Dynamic Bernstein-Vazirani on a 156-Qubit Superconducting Processor',
      authors: ['Q-Psi Research Team'],
      status: 'RESEARCH MANUSCRIPT',
      date: 'August 2026',
      abstract:
        'Reports an empirical demonstration of quantum query-complexity advantage for dynamic single-shot Bernstein-Vazirani on a 156-qubit Heron processor. Measured scaling exponent alpha_Q = 0.1532 vs classical alpha_C = 0.6963 (p = 3.47e-7).',
      link: '/research/dynamic-bv',
    },
  ] as PaperItem[],

  // Blogs and Research Notes
  blogs: [
    {
      id: 'blog-01-overview',
      slug: 'qpsi-after-564840-physical-quantum-shots',
      title: 'Q-Psi After 564,840 Physical Quantum Shots',
      subtitle: 'What fourteen frozen hardware studies established — and what they did not.',
      date: 'August 18, 2026',
      tier: 'OVERVIEW',
      status: 'AUDITED RESEARCH OVERVIEW',
      backend: 'ibm_marrakesh (IBM Heron r2)',
      summary:
        'A comprehensive retrospective of 14 audited physical-QPU campaigns on IBM Heron: bounded query advantages, qubit reuse, Data Foundry feasibility, negative baseline comparators, and strict scientific boundaries.',
      link: '/blog/qpsi-after-564840-physical-quantum-shots',
    },
    {
      id: 'blog-02-qubit-reuse',
      slug: 'reusing-physical-qubits-with-compiler-liveness-analysis-on-ibm-heron',
      title: 'Reusing Physical Qubits with Compiler Liveness Analysis on IBM Heron',
      subtitle: 'How compiler-driven mid-circuit measurement reduced physical register width by a median 78.1%.',
      date: 'August 18, 2026',
      tier: 'TIER_A',
      status: 'SUPPORTED WITH QUALIFICATION',
      backend: 'ibm_marrakesh (IBM Heron r2)',
      summary:
        'Analysis of physical qubit reuse passes on IBM Heron: mapping 8 to 16 logical qubits onto 2 to 3 physical slots while maintaining non-inferior observable fidelity across 6/6 tested cases.',
      link: '/blog/reusing-physical-qubits-with-compiler-liveness-analysis-on-ibm-heron',
    },
    {
      id: 'blog-03-data-foundry',
      slug: '127-quantum-seconds-65138-candidate-states-93-verified-coding-records',
      title: '127 Quantum Seconds, 65,138 Candidate States and 93 Verified Coding Records',
      subtitle: 'Physical-QPU state selection connected to executable software verification.',
      date: 'August 18, 2026',
      tier: 'TIER_A',
      status: 'SUPPORTED WITH QUALIFICATION',
      backend: 'ibm_marrakesh (IBM Heron r2)',
      summary:
        'The audited results of Quantum Data Foundry V2: 332,768 physical shots, 65k sampled candidate states, 93 verified positive repair records, 100% QPU provenance, and the classical verification throughput bottleneck.',
      link: '/blog/127-quantum-seconds-65138-candidate-states-93-verified-coding-records',
    },
    {
      id: 'blog-04-mqt-benchmark',
      slug: 'qpsi-vs-qiskit-and-tket-what-the-mqt-benchmark-actually-showed',
      title: 'Q-Psi vs Qiskit and TKET: What the MQT Benchmark Actually Showed',
      subtitle: 'A high-integrity cross-compiler comparison: valid compilation, Qiskit fidelity parity, and TKET sensitivity.',
      date: 'August 18, 2026',
      tier: 'TIER_A',
      status: 'MIXED COMPETITIVENESS',
      backend: 'ibm_marrakesh (IBM Heron r2)',
      summary:
        'Full disclosure of the independent MQT benchmark: Qiskit held a small aggregate advantage (-0.0067), while Q-Psi\'s apparent advantage over TKET was driven by a single routing-sensitive workload.',
      link: '/blog/qpsi-vs-qiskit-and-tket-what-the-mqt-benchmark-actually-showed',
    },
    {
      id: 'blog-05-negative-results',
      slug: 'negative-results-matter-where-qpsi-did-not-beat-the-baseline',
      title: 'Negative Results Matter: Where Q-Psi Did Not Beat the Baseline',
      subtitle: 'Why preserving falsifying evidence and negative comparator studies is essential for quantum science.',
      date: 'August 18, 2026',
      tier: 'TIER_C',
      status: 'NEGATIVE & BOUNDARY EVIDENCE',
      backend: 'ibm_marrakesh (IBM Heron r2)',
      summary:
        'Examining our negative and inconclusive studies: why Qiskit multi-seed layout outperformed Q-Psi, why fractional pulse lowering gave mixed signals, and why Directed Execution was inconclusive.',
      link: '/blog/negative-results-matter-where-qpsi-did-not-beat-the-baseline',
    },
    {
      id: 'blog-06-dynamic-routing',
      slug: 'why-lower-circuit-depth-did-not-guarantee-better-physical-fidelity',
      title: 'Why Lower Circuit Depth Did Not Guarantee Better Physical Fidelity',
      subtitle: 'Lessons from a 156-qubit hardware-aware dynamic routing study on IBM Heron.',
      date: 'August 18, 2026',
      tier: 'TIER_B',
      status: 'SUPPORTED WITH QUALIFICATION',
      backend: 'ibm_marrakesh (IBM Heron r2)',
      summary:
        'How dynamic circuits compressed two-qubit gate depth from 73 to 2 on 13 hops, but reset and measurement noise prevented physical fidelity crossover over unitary routing.',
      link: '/blog/why-lower-circuit-depth-did-not-guarantee-better-physical-fidelity',
    },
  ] as BlogItem[],

  claimsComparison: {
    heading: 'Scientific Claim Boundaries & Master Public Governance',
    allowed: [
      'Compiler + Grover Query Advantage: Bounded physical query advantage on structured search spaces on IBM Heron (9/9 cases, 3/3 problem sizes; N=16 95% CI upper bound 7.360 < 8.5).',
      'Dynamic Bernstein-Vazirani: Bounded quantum query-scaling advantage (slope 0.153 vs classical 0.696, t = -30.65, p < 1e-6).',
      'MCM Qubit Reuse: Median 78.1% physical register reduction across 6 cases with 6/6 non-inferior observable fidelity on streaming circuits.',
      'Quantum Data Foundry V2: Pipeline feasibility demonstrated with 93 verified records from 332,768 physical shots in 127.58s runtime with 100% QPU provenance.',
      'MQT Cross-Compiler: Mixed competitiveness across 18 benchmark cases on IBM Heron; ties/competes with Qiskit and TKET; disfavored vs Qiskit O3 (-0.0067 delta).',
      'Dynamic Routing Crossover: Structural 2Q depth compression from 73 to 2 on 13 hops with no physical fidelity crossover.',
      'Calibration-Aware Layout: Preserved negative comparator result; Qiskit O3 best-of-8 remained superior or competitive (mean delta -0.0106).',
    ],
    notAllowed: [
      'General quantum advantage or computational supremacy for arbitrary software tasks.',
      'General compiler superiority over industrial toolchains (Qiskit, TKET).',
      'Wall-clock execution time speedup over classical computers.',
      'Autonomous LLM token generation or proven LLM fine-tuning improvements from Data Foundry.',
      'Universal qubit width reduction for arbitrary non-streaming quantum circuits.',
      'Universal pulse-level fidelity advantage from fractional gate lowering.',
      'Multi-backend physical ranking or cross-backend parity as completed research.',
      'Metaphysical, spiritual, or consciousness claims from quantum state encoding.',
    ],
  },
};
