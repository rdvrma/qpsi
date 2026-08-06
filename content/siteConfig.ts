export interface FailureMode {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  currentApproach: string;
  whyItBreaks: string;
  qPsiPreserves: string;
}

export interface ExpansionStage {
  stage: number;
  label: string;
  title: string;
  description: string;
  metrics: string;
}

export interface ArchitectureNode {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  input: string;
  output: string;
  guarantee: string;
}

export interface RevenueCard {
  id: string;
  number: string;
  title: string;
  description: string;
  range: string;
}

export interface MarketItem {
  category: string;
  value: string | null;
  year: string | null;
  sourceName: string | null;
  sourceUrl: string | null;
  pubDate: string | null;
  description: string;
}

export interface RoadmapMilestone {
  code: string;
  title: string;
  summary: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PLANNED' | 'DEPENDENT_ON_EVIDENCE';
  deliverables: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const siteConfig = {
  meta: {
    title: 'Q-Psi — Persistent World Engine for AI Characters',
    description:
      'Q-Psi is building a persistent reality engine where AI characters maintain identity, memory, relationships and canonical history across scenes.',
    keywords: [
      'persistent AI worlds',
      'AI characters',
      'persistent characters',
      'virtual production',
      'digital twins',
      'artificial worlds',
      'interactive entertainment',
      'world models',
      'quantum computing',
      'hybrid quantum classical',
      'AI simulation',
      'canonical world state',
      'Q-Psi',
    ],
    url: 'https://q-psi.tech',
    ogImage: '/og-image.png',
    twitterHandle: '@qpsi_engine',
  },

  company: {
    name: 'Q-Psi',
    fullName: 'Q-Psi Persistent World Engine',
    mark: 'QΨ',
    tagline: 'Persistent World Engine',
    stageBadge: 'Founder-led | Idea stage | Pre-prototype',
    parentCompany: 'Darkcloud Infosystems Pvt. Ltd.',
    copyrightYear: '2026',
  },

  navigation: [
    { label: 'Problem', href: '#problem' },
    { label: 'Smallest Unit', href: '#smallest-unit' },
    { label: 'Expansion', href: '#expansion' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Quantum', href: '#quantum' },
    { label: 'Product', href: '#product' },
    { label: 'Business Model', href: '#business-model' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Founder', href: '#founder' },
    { label: 'Invest', href: '#invest' },
    { label: 'FAQ', href: '#faq' },
  ],

  hero: {
    introSentence: 'Every generated scene forgets the one before it.',
    vanishingFragments: [
      'IDENTITY',
      'MEMORY',
      'RELATIONSHIPS',
      'OBJECTS',
      'HISTORY',
      'CONSEQUENCES',
    ],
    headline: 'Generate worlds people can enter,\nnot clips they scroll past.',
    supportingCopy:
      'Q-Psi is building an artificial reality engine where characters remember, relationships evolve and accepted history never resets.',
    primaryCta: 'Explore the system',
    secondaryCta: 'View investor deck',
    tertiaryLink: 'Request investor conversation',
  },

  problem: {
    eyebrow: 'THE CONTINUITY PROBLEM',
    headline: 'AI can generate a moment.\nIt still struggles to preserve a world.',
    body: 'Today’s generative systems can produce impressive images, conversations and short video clips. But when a story continues, faces drift, rooms change, objects disappear, memories conflict and relationships reset.\n\nA believable world needs more than generation. It needs an authoritative reality that survives every model call, scene, restart and software upgrade.',
    finalStatement:
      'The missing product is not another video model. It is a persistent reality operating system.',
    failureModes: [
      {
        id: 'identity-drift',
        title: '1. Identity Drift',
        subtitle: 'Visual & Behavioral Discontinuity',
        description: 'A face, body structure, or core identity outline subtly mutates across successive visual generations.',
        currentApproach: 'Stitching seed prompts, reference images, and LoRA adapters into stateless video diffusion pipelines.',
        whyItBreaks: 'Generative models sample stochastically; without an external structural anchor, facial micro-features and clothing geometry mutate frame-by-frame.',
        qPsiPreserves: 'Enforces an immutable identity schema and canonical skeletal state vector that locks visual & behavioral traits regardless of model upgrades.',
      },
      {
        id: 'memory-failure',
        title: '2. Memory Failure',
        subtitle: 'Hallucination & Factual Contradiction',
        description: 'Two character statements or actions contradict past events recorded in prior scenes.',
        currentApproach: 'Truncated LLM context windows, sliding RAG vector buffers, and unstructured conversation histories.',
        whyItBreaks: 'RAG retrieves top-k semantic matches but lacks temporal logic, formal belief trees, or objective factual verification.',
        qPsiPreserves: 'Separates public canonical ledger history from individual character subjective belief matrices, preventing retroactive rewriting of world facts.',
      },
      {
        id: 'environmental-reset',
        title: '3. Environmental Reset',
        subtitle: 'Physical & Spatial Inconsistency',
        description: 'A room object changes location, alters color, or vanishes completely between camera takes.',
        currentApproach: 'Relying on implicit visual spatial priors embedded inside 3D diffusion or NeRF latent spaces.',
        whyItBreaks: 'Latent spaces lack explicit physical bounds or persistence guarantees when camera angles rotate or scenes pause.',
        qPsiPreserves: 'Maintains an independent spatial state graph tracking object bounding volumes, ownership, wear, and persistent coordinate transforms.',
      },
      {
        id: 'narrative-reset',
        title: '4. Narrative Reset',
        subtitle: 'Relational & Emotional Amnesia',
        description: 'Character trust, grievances, intimacy, and historical alliances return to default starting conditions.',
        currentApproach: 'Static prompt system messages that re-describe character personas at the start of each session.',
        whyItBreaks: 'Prompt descriptions are static snapshots; they cannot compute dynamic emotional debt or irreversible relationship shifts.',
        qPsiPreserves: 'Computes continuous, non-reversible relationship state tensors updated exclusively through committed canonical ledger events.',
      },
    ] as FailureMode[],
  },

  smallestUnit: {
    headline: 'Two people.\nOne room.\nA world that does not forget.',
    supportingText:
      'Before attempting a civilization, Q-Psi isolates the fundamental repeatable unit: two characters interacting in a single persistent room under immutable state rules.',
    proofCriteria: [
      'Stable character identity across 1,000+ sequential frame generations',
      'Persistent memory with zero historical hallucination or contradiction',
      'Continuous relationship dynamics updated strictly by committed events',
      'Room layout & object coordinate persistence across scene restarts',
      'Acoustic and voice frequency consistency across emotional spectrums',
      'Camera vector continuity and persistent spatial tracking',
      'Full cryptographic event replay from canonical ledger state',
      'Real-time automated contradiction detection and rejection',
      'Instant restart recovery from system crashes without state corruption',
      'Measurable, bounded compute cost per valid generated scene minute',
    ],
    bottomStatement:
      'If the two-character atom becomes stable, it can be multiplied into a society.',
  },

  expansion: {
    headline: 'Start like a reality show.\nExpand into a civilization.',
    supportingCopy:
      'The first public experience can look familiar: original characters living inside a mansion, forming alliances, experiencing conflict and developing long-running stories.\n\nThe underlying product is not the show. The show is the first visible expression of the persistent-world engine.',
    disclaimer:
      'Q-Psi will use an original title, format, visual identity, world design and character system. It will not copy any existing television property.',
    stages: [
      {
        stage: 1,
        label: 'Stage 1',
        title: 'Two-Character Room',
        description: 'The repeatable atomic unit: two synthetic adults in a single persistent space with canonical state ledger.',
        metrics: '2 Characters | 1 Room | 100% Memory Persistence',
      },
      {
        stage: 2,
        label: 'Stage 2',
        title: 'Multiple Rooms',
        description: 'Expanding spatial coordinates to interconnected physical zones with character mobility and line-of-sight privacy.',
        metrics: '4-6 Characters | 4 Rooms | Spatial Graph Routing',
      },
      {
        stage: 3,
        label: 'Stage 3',
        title: 'Mansion Environment',
        description: 'A 6-10 character mansion-scale reality environment with emergent social dynamics and automated camera direction.',
        metrics: '6-10 Characters | Mansion Scale | Multi-camera Feeds',
      },
      {
        stage: 4,
        label: 'Stage 4',
        title: '24×7 Continuous Entertainment',
        description: 'Uninterrupted livestreamed artificial reality with audience participation, highlight reels, and event voting.',
        metrics: 'Continuous Runtime | Livestream Feed | Public Highlights',
      },
      {
        stage: 5,
        label: 'Stage 5',
        title: 'User-Created Avatars',
        description: 'Allowing human users to instantiate authorized digital avatars that enter and interact with the persistent world.',
        metrics: 'User Avatars | Identity Verification | Personal Memory Ledger',
      },
      {
        stage: 6,
        label: 'Stage 6',
        title: 'Neighbourhoods & Professions',
        description: 'Expanding from a single residence to functional economic districts, specialized roles, and civic institutions.',
        metrics: 'Districts & Roles | Social Hierarchy | Professional Tasks',
      },
      {
        stage: 7,
        label: 'Stage 7',
        title: 'Creator & Studio Production',
        description: 'Opening private production environments for external studios and creators to film custom narrative series.',
        metrics: 'Studio SDK | Private Branching | Commercial Production',
      },
      {
        stage: 8,
        label: 'Stage 8',
        title: 'Persistent Digital Civilization',
        description: 'A multi-tier artificial civilization operating autonomously across virtual geography with deep history.',
        metrics: 'Autonomous Society | Global History | Closed-Loop Economy',
      },
    ] as ExpansionStage[],
  },

  architecture: {
    headline: 'How Q-Psi Works',
    subheadline: 'An authoritative state-first pipeline that decoupling world truth from stochastic generative models.',
    nodes: [
      {
        id: 'intent',
        title: '1. Human / Director Intent',
        shortDesc: 'High-level narrative goals and scenario parameters.',
        fullDesc: 'Captures creative direction, scene constraints, character spawns, or live user avatar actions.',
        input: 'Natural language, script cues, or user interaction inputs',
        output: 'Structured scenario specification packet',
        guarantee: 'Zero direct execution on raw generative models without validation',
      },
      {
        id: 'bridge',
        title: '2. AI Bridge',
        shortDesc: 'Converts creative intent into structured state operations.',
        fullDesc: 'Converts unstructured creative intent into formal candidate world state mutations, relational proposals, and action trees.',
        input: 'Scenario specification packet',
        output: 'Candidate state transition vectors',
        guarantee: 'Parses intent into mathematically checkable candidate operations',
      },
      {
        id: 'program',
        title: '3. Q-Psi State Program',
        shortDesc: 'Formal schema representing beliefs, constraints, and history.',
        fullDesc: 'Represents characters, beliefs, observations, constraints, permissions, possible futures and accepted history.',
        input: 'Candidate state transition vectors',
        output: 'Enriched constraint-evaluated candidate graphs',
        guarantee: 'Strict decoupling of character private belief vs. objective world truth',
      },
      {
        id: 'futures',
        title: '4. Candidate Future Generation',
        shortDesc: 'Explores multi-branch scenario paths and state outcomes.',
        fullDesc: 'Generates thousands of valid candidate future states representing physical moves, emotional responses, and dialog branches.',
        input: 'Enriched candidate graphs',
        output: 'Combinatorial candidate state space matrix',
        guarantee: 'Full coverage of physically & logically feasible state continuations',
      },
      {
        id: 'runtime',
        title: '5. Execution Runtime (Classical Baseline / Hybrid)',
        shortDesc: 'Classical mandatory baseline with experimental quantum search.',
        fullDesc: 'Uses classical execution as the mandatory reference baseline and evaluates quantum or quantum-inspired techniques where useful.',
        input: 'Combinatorial state space matrix',
        output: 'Optimized candidate trajectory',
        guarantee: 'Deterministic classical fallback always active',
      },
      {
        id: 'validator',
        title: '6. Constraint & Continuity Validator',
        shortDesc: 'Strict rule engine enforcing physical & identity continuity.',
        fullDesc: 'Rejects actions that violate identity, permissions, physical continuity or committed history.',
        input: 'Optimized candidate trajectory',
        output: 'Validated immutable state delta',
        guarantee: 'Zero contradiction passage to canonical ledger',
      },
      {
        id: 'ledger',
        title: '7. Canonical Event Ledger',
        shortDesc: 'Cryptographically durable source of world truth.',
        fullDesc: 'Stores durable world truth independently of any individual AI model.',
        input: 'Validated immutable state delta',
        output: 'Append-only canonical state record',
        guarantee: 'Immutable, audit-ready world history vector',
      },
      {
        id: 'memory-update',
        title: '8. Memory & World State Update',
        shortDesc: 'Synchronizes character perception with canonical ledger.',
        fullDesc: 'Updates individual character subjective memory buffers based exclusively on events observed from their spatial vantage point.',
        input: 'Append-only canonical state record',
        output: 'Updated character belief & relationship matrices',
        guarantee: 'No character knows secret events unobserved by them',
      },
      {
        id: 'materialization',
        title: '9. Visual, Voice & Camera Materialization',
        shortDesc: 'Renders accepted state using GPU & neural audio systems.',
        fullDesc: 'Uses conventional GPU, animation, voice and game-engine systems to materialize the accepted state.',
        input: 'Validated state snapshot & audio/visual prompts',
        output: 'High-fidelity video streams, audio feeds, and 3D scenes',
        guarantee: 'Frame generation guided strictly by validated canonical state',
      },
    ] as ArchitectureNode[],
  },

  quantum: {
    headline: 'Quantum is not for rendering pixels.\nIt is for searching possible futures.',
    body: 'A persistent artificial world may contain many valid and invalid future state transitions. Characters can speak, move, cooperate, lie, remember, forget, discover secrets or change relationships.\n\nThe research question is whether quantum, hybrid or quantum-inspired methods can improve constrained state search, sampling, optimization or candidate diversity without breaking continuity.',
    researchIntegrityStatement:
      'Q-Psi does not claim quantum advantage today.\n\nNo quantum advantage will be claimed without a controlled classical baseline, reproducible simulator evidence and measurable comparative results.',
    disclaimerNotes: [
      'Do not describe the founder as a quantum physicist.',
      'Do not claim that a quantum computer currently contains or renders the world.',
    ],
    classicalMetrics: {
      mode: 'CLASSICAL BASELINE',
      tag: 'Mandatory Reference System',
      description: 'Deterministic classical algorithm executing exact constraint evaluation and state graph graph traversals on conventional CPU/GPU clusters.',
      metrics: [
        { label: 'Execution Path', value: 'Deterministic Constraint Solver' },
        { label: 'Valid Transition Yield', value: '100% (Guaranteed via brute validation)' },
        { label: 'Execution Latency', value: 'O(N^2) baseline scaling' },
        { label: 'Candidate Diversity', value: 'Bounded by classical heuristic limits' },
        { label: 'Reproducibility', value: '100% Bit-exact repeatability' },
        { label: 'Compute Requirement', value: 'Standard High-Memory GPU / CPU nodes' },
      ],
    },
    quantumMetrics: {
      mode: 'QUANTUM EXPERIMENT',
      tag: 'Experimental Simulation Path',
      description: 'CUDA-Q state-vector & tensor network simulation of constrained combinatorial sampling for candidate future selection.',
      metrics: [
        { label: 'Execution Path', value: 'CUDA-Q State Vector Simulation' },
        { label: 'Valid Transition Yield', value: 'Targeting 15-30% efficiency boost in candidate sampling' },
        { label: 'Execution Latency', value: 'Sub-exponential exploration in high-dim state spaces' },
        { label: 'Candidate Diversity', value: 'Enhanced super-positional state sampling' },
        { label: 'Reproducibility', value: 'Controlled seed simulation under noise models' },
        { label: 'Compute Requirement', value: 'NVIDIA GPU Acceleration via CUDA-Q' },
      ],
    },
  },

  initialProduct: {
    headline: 'The first commercial product:\na Persistent Character Room.',
    description:
      'A controlled private workspace enabling creators, entertainment studios, and brand producers to instantiate repeatable, multi-scene character interactions without identity drift or narrative amnesia.',
    modes: [
      {
        code: 'A',
        title: 'Original Character × Original Character',
        description: 'Both characters are entirely original company-controlled synthetic adults operating inside a fully customized persistent room.',
        useCases: 'Original entertainment series, continuous fiction streams, emergent drama pilots.',
      },
      {
        code: 'B',
        title: 'Original Character × Licensed Digital Twin',
        description: 'One original company character interacting with one verified, contractually authorized digital twin of a actor, creator, or public figure.',
        useCases: 'Interactive celebrity interviews, guest star narrative arcs, branded creator experiences.',
      },
      {
        code: 'C',
        title: 'Licensed Twin × Licensed Twin',
        description: 'Two independently verified and mutually authorized digital representations interacting within strict contractual parameters.',
        useCases: 'Co-branded cinematic scenes, virtual podcasts, bilateral simulation agreements.',
      },
    ],
    commercialApplications: [
      'Interactive entertainment & continuous fiction',
      'Creator production & episodic video series',
      'Cinematic scene generation & pre-visualization',
      'Licensed digital twin appearances & brand deals',
      'Virtual interviews & interactive talk shows',
      'Simulated training & educational roleplay',
      'Branded immersive customer experiences',
      'Persistent character story worlds & universe building',
    ],
    operatingPrinciple:
      'The engine remains controlled by Q-Psi. Creators and studios enter private production environments instead of receiving the underlying world engine.',
  },

  businessModel: {
    headline: 'Monetization begins before the full world exists.',
    subheadline:
      'Q-Psi does not need to open its engine. Users, creators and studios enter controlled environments and pay for access, production, interaction and persistence.',
    planningRange:
      '$1,000–$1,000 per customer per month depending on compute, customization, commercial rights and usage.',
    planningRangeLabel: 'Planning hypothesis — not current validated pricing.',
    earlyRevenuePrinciple:
      'Early revenue must finance the persistent-world engine, not force it into a narrow vertical.',
    cards: [
      {
        id: 'persistent-rooms',
        number: '01',
        title: 'Persistent Rooms',
        description: 'Monthly workspace access and API usage fees for creators maintaining dedicated character spaces.',
        range: '$1K – $5K / mo',
      },
      {
        id: 'creator-production',
        number: '02',
        title: 'Creator Production',
        description: 'Usage-based pricing for high-resolution scene generation, rendering passes, and commercial export outputs.',
        range: 'Compute + Usage basis',
      },
      {
        id: 'character-setup',
        number: '03',
        title: 'Character Setup',
        description: 'One-time onboarding fees for custom synthetic identity compilation, voice cloning, and memory initialization.',
        range: '$2.5K – $10K setup',
      },
      {
        id: 'private-studio-districts',
        number: '04',
        title: 'Private Studio Districts',
        description: 'Dedicated enterprise instances for production companies building multi-episode proprietary show formats.',
        range: '$10K+ / mo enterprise',
      },
      {
        id: 'public-entertainment',
        number: '05',
        title: 'Public Entertainment',
        description: 'Direct consumer monetization via channel sponsorships, ticketed live events, voting rights, and premium camera feeds.',
        range: 'B2C Subscriptions & Micro-transactions',
      },
      {
        id: 'avatar-life',
        number: '06',
        title: 'Avatar Life',
        description: 'Consumer recurring subscriptions for personal persistent avatar slots, private rooms, and ongoing personal lore.',
        range: '$15 – $50 / mo per user',
      },
      {
        id: 'enterprise-worlds',
        number: '07',
        title: 'Enterprise Worlds',
        description: 'Custom corporate training, industrial simulation, and branded virtual environments built on Q-Psi state engine.',
        range: 'Custom enterprise contracts',
      },
      {
        id: 'world-economy',
        number: '08',
        title: 'World Economy',
        description: 'A later closed-loop virtual economy, digital asset trading, and land licensing only after retention & legal gates.',
        range: 'Long-term ecosystem fee %',
      },
    ] as RevenueCard[],
  },

  marketOpportunity: {
    headline: 'Entering markets where customers already pay.',
    narrative:
      'Q-Psi is not dependent on creating a new spending category. It enters markets where customers already pay for characters, entertainment, production, simulation, digital identity and virtual environments.',
    concentricWedge: [
      {
        layer: 'Initial Wedge',
        title: 'Persistent Character & Creator Production Rooms',
        description: 'Direct focus on creator tools, AI video tools, and private studio environments requiring scene persistence.',
      },
      {
        layer: 'Expansion',
        title: 'Interactive Entertainment & Virtual Production',
        description: 'Expanding into continuous livestreamed entertainment formats, virtual film sets, and digital twin licensing.',
      },
      {
        layer: 'Platform',
        title: 'Avatar Life, Creator Districts & Persistent Worlds',
        description: 'Opening consumer avatar subscriptions, studio ecosystem tools, and multi-room world expansion.',
      },
      {
        layer: 'Long-term Category',
        title: 'Artificial Reality Infrastructure',
        description: 'Becoming the underlying state OS powering artificial civilization and persistent virtual worlds.',
      },
    ],
    sourceBackedData: [
      {
        category: 'Generative AI Video & Content Creation',
        value: '$1.4B',
        year: '2024',
        sourceName: 'Grand View Research / Industry Reports',
        sourceUrl: 'https://www.grandviewresearch.com',
        pubDate: 'Q4 2024',
        description: 'Rapidly growing market for AI-generated video tools and media synthesis software.',
      },
      {
        category: 'Virtual Production & VFX Software',
        value: '$3.1B',
        year: '2024',
        sourceName: 'MarketsandMarkets',
        sourceUrl: 'https://www.marketsandmarkets.com',
        pubDate: '2024',
        description: 'Software platforms for real-time virtual sets, camera tracking, and digital character rendering.',
      },
      {
        category: 'Global Gaming Market',
        value: '$187.7B',
        year: '2024',
        sourceName: 'Newzoo Global Games Market Report',
        sourceUrl: 'https://newzoo.com',
        pubDate: '2024',
        description: 'Total consumer spend on interactive games, virtual items, and character microtransactions.',
      },
      {
        category: 'Digital Twin & Simulation Software',
        value: '$16.7B',
        year: '2024',
        sourceName: 'Fortune Business Insights',
        sourceUrl: 'https://www.fortunebusinessinsights.com',
        pubDate: '2024',
        description: 'Enterprise spending on high-fidelity physical and operational simulation software.',
      },
      {
        category: 'Creator Economy Infrastructure',
        value: '$156B',
        year: '2024',
        sourceName: 'Goldman Sachs Research',
        sourceUrl: 'https://www.goldmansachs.com',
        pubDate: '2024',
        description: 'Monetization ecosystem for independent video creators, streamers, and digital artists.',
      },
      {
        category: 'Persistent Virtual Worlds & Spatial Media',
        value: null,
        year: null,
        sourceName: 'Emerging Category Definition',
        sourceUrl: null,
        pubDate: null,
        description: 'Next-generation persistent artificial reality infrastructure combining simulation and synthetic entertainment.',
      },
    ] as MarketItem[],
  },

  roadmap: {
    headline: 'Execution Roadmap',
    subheadline: 'Build the atom first: two people, one room, stable memory.',
    truthfulStatusCallout:
      'Truthful Status: Idea-stage research program | Core thesis defined | Architecture drafted | Two-character room milestone defined | Deck prepared | NVIDIA Inception member | CUDA-Q Innovation Lab application submitted | Pre-prototype | Zero revenue.',
    milestones: [
      {
        code: 'M0',
        title: 'Research Charter',
        summary: 'Terminology, hypotheses, evidence policy and no-false-claim rules.',
        status: 'COMPLETED',
        deliverables: [
          'Formulated core Q-Psi persistent world thesis',
          'Established strict evidence and no-false-claims disclosure policy',
          'Published internal architectural specification and terminology standard',
        ],
      },
      {
        code: 'M1',
        title: 'Q-Psi Semantic Core',
        summary: 'World-state schema, identity, beliefs, relationships and event model.',
        status: 'IN_PROGRESS',
        deliverables: [
          'Drafting JSON-Schema and TypeScript specifications for canonical world state',
          'Defining formal character belief vector vs. objective event ledger separation',
          'Establishing identity constraint schemas and entity state invariants',
        ],
      },
      {
        code: 'M2',
        title: 'Classical Reference Runtime',
        summary: 'Deterministic interpreter, tests and append-only ledger.',
        status: 'PLANNED',
        deliverables: [
          'Build in-memory append-only canonical event ledger engine',
          'Implement classical deterministic constraint validator and replay harness',
          'Set up automated test runner for 72-hour zero-contradiction validation',
        ],
      },
      {
        code: 'M3',
        title: 'Two-Character State Proof',
        summary: 'Text or structured-state environment with restart persistence.',
        status: 'PLANNED',
        deliverables: [
          'Execute text-based state proof with two synthetic characters in single room',
          'Demonstrate zero memory loss and zero identity drift over 500 state steps',
          'Verify complete state restoration following forced process restarts',
        ],
      },
      {
        code: 'M4',
        title: 'Quantum Simulation Path',
        summary: 'CUDA-Q simulation and comparative benchmark.',
        status: 'DEPENDENT_ON_EVIDENCE',
        deliverables: [
          'Build CUDA-Q state vector simulation module for candidate state search',
          'Execute side-by-side benchmark comparing classical baseline vs. CUDA-Q simulation',
          'Publish formal benchmark report detailing candidate yield & latency metrics',
        ],
      },
      {
        code: 'M5',
        title: 'Persistent Visual Room',
        summary: 'Identity, room, memory, voice and camera continuity.',
        status: 'PLANNED',
        deliverables: [
          'Integrate visual generative diffusion pipeline with canonical state ledger',
          'Achieve multi-frame identity, room object, and camera vector continuity',
          'Produce first end-to-end playable 2-character visual room prototype',
        ],
      },
      {
        code: 'M6',
        title: 'Multi-Character Mansion',
        summary: 'Multiple characters, rooms, relationships and social graph.',
        status: 'PLANNED',
        deliverables: [
          'Expand spatial graph from 1 room to 6-room mansion layout',
          'Scale character count to 6-10 autonomous synthetic actors',
          'Demonstrate multi-agent secret sharing, gossip, and relationship dynamics',
        ],
      },
      {
        code: 'M7',
        title: 'Public Pilot',
        summary: 'Original continuous entertainment format and highlight engine.',
        status: 'PLANNED',
        deliverables: [
          'Launch 24x7 continuous stream of original mansion format',
          'Deploy automated clip extraction and daily highlight reel pipeline',
          'Open public audience interaction and ticketed camera controls',
        ],
      },
      {
        code: 'M8',
        title: 'User Avatars',
        summary: 'Autonomous offline life and meaningful user decisions.',
        status: 'PLANNED',
        deliverables: [
          'Enable human user avatar creation with verified identity ledger',
          'Implement offline autonomous background avatar behavior',
          'Support persistent avatar ownership of virtual spaces and items',
        ],
      },
      {
        code: 'M9',
        title: 'Creator Districts',
        summary: 'Private production environments and licensed output.',
        status: 'PLANNED',
        deliverables: [
          'Release Q-Psi Creator Studio SDK for private production branches',
          'Onboard initial design partner creators and film production studios',
          'Enable commercial licensing of custom synthetic world outputs',
        ],
      },
      {
        code: 'M10',
        title: 'Expanding World',
        summary: 'Professions, economy, society and long-duration world state.',
        status: 'PLANNED',
        deliverables: [
          'Open multi-district geographical world expansion',
          'Deploy closed-loop virtual economy with governance gates',
          'Achieve multi-year uninterrupted persistent civilization runtime',
        ],
      },
    ] as RoadmapMilestone[],
  },

  founder: {
    officialIdentity: {
      name: 'Nishant Kumar Sinha',
      title: 'Founder, Q-Psi',
      corporateRole: 'Director, Darkcloud Infosystems Pvt. Ltd.',
    },
    headline: 'Ten years of software-business execution.\nNow building the state layer for persistent artificial worlds.',
    bio:
      'Nishant Kumar Sinha has more than ten years of experience across software sales, product development, client systems, business development and technology operations.\n\nBefore founding Q-Psi, he worked in software sales and business development at M/s Shyam Sales and later became Director and Founder of Darkcloud Infosystems Pvt. Ltd., a software-development company serving client and internal business requirements.\n\nHe leads Q-Psi’s product thesis, architecture, research sequencing, experiment design, AI-assisted implementation workflow, ecosystem outreach and initial commercial strategy.',
    education:
      'Studied Computer Science and Engineering at Priyadarshini Institute of Engineering and Technology. Discontinued the B.Tech program during the third year in May 2009 to pursue software sales, business and technology entrepreneurship.',
    educationTruthfulnessNotice:
      'Explicit Notice: Discontinued B.Tech in 3rd year. Does not claim completed degree. Does not claim academic quantum physicist title.',
    philosophyQuote:
      '“I do not need the final world to exist before beginning. I need the smallest unit to remember what happened.”',
    operatingModel: [
      'Founder-led architecture & research sequencing',
      'AI-assisted high-velocity implementation workflow',
      'Strict empirical acceptance criteria & 72h validation gates',
      'External specialist audit & peer validation when required',
      'Zero false technical claims policy across all communications',
      'Actively open to a deeply aligned technical or product co-founder',
    ],
    cofounderStatement:
      'Q-Psi is currently led by a solo founder. The founder is open to a deeply aligned co-founder with strengths in AI systems, simulation, quantum software, real-time 3D, virtual production or frontier product execution.\n\nThe company is not waiting for a co-founder to begin.',
  },

  founderEvidence: {
    heading: 'Q-Psi is early.\nThe founder is not starting from zero.',
    projects: [
      {
        title: 'SattvaOS',
        url: 'https://sattvaos.tech',
        subtitle: 'Multi-Tenant Governed AI Platform',
        description:
          'A governed, multi-tenant AI platform for spiritual organizations and teachers, including organization-controlled personas, knowledge, authentication, tenant isolation, wallet and payment infrastructure, and planned voice and video experiences.',
      },
      {
        title: 'aatma.guru',
        url: 'https://aatma.guru',
        subtitle: 'Consumer Experiential AI Layer',
        description:
          'A consumer-facing experiential layer for interacting with authorized digital guides with persistent persona tone and structured knowledge retrieval.',
      },
      {
        title: 'Darkcloud Infosystems',
        url: 'Proprietary Corporate Entity',
        subtitle: '10+ Years Software Development',
        description:
          'More than ten years of software-development, client-system and technology business experience. Many previous projects were proprietary internal systems, so customer names and technical details cannot be publicly disclosed.',
      },
    ],
    resourcefulness: {
      title: 'Capital Efficiency & Resourcefulness',
      statement:
        'Extremely low cash burn achieved by leveraging elite startup accelerator credits, AI coding systems, cloud compute grants, and disciplined founder execution.',
    },
  },

  recognition: {
    heading: 'Ecosystem & Startup Support',
    items: [
      { name: 'NVIDIA Inception Member', detail: 'Selected for NVIDIA Startup Ecosystem' },
      { name: 'Sarvam AI Startup Program', detail: 'Selected for Frontier AI Support' },
      { name: 'Claude for Startups', detail: 'Infrastructure & Compute Credits' },
      { name: 'NVIDIA Capital Connect', detail: 'Access Approved / In Progress' },
      { name: 'NVIDIA Inception Profile', detail: 'Q-Psi listed in Product Directory' },
      { name: 'CUDA-Q Innovation Lab', detail: 'Application submitted for GPU simulation POC' },
    ],
    disclosure:
      'Important Disclosure: Program participation, credits or application status do not constitute an investment, technical validation, partnership endorsement or proof of quantum advantage.',
  },

  investmentAsk: {
    headline: 'Raising $500K to prove persistent artificial reality.',
    label: 'Pre-seed | Flexible instrument subject to legal and investor fit',
    summary:
      'Objective: move from research architecture to a working two-character persistent room, measured simulator experiments, and a credible path to a mansion-scale public pilot.',
    raiseAmount: '$500,000',
    runwayTarget: '18 Months',
    proofGatesCount: '5 Proof Gates',
    breakdown: [
      { percentage: '40%', category: 'Engineering & R&D', detail: 'Q-Psi language, AI Bridge, canonical ledger, experiments and validation harness.' },
      { percentage: '25%', category: 'Compute & Infrastructure', detail: 'GPU simulation, rendering tests, storage, cloud environments and monitoring.' },
      { percentage: '20%', category: 'Persistent Room Prototype', detail: 'Two-character room, generated characters, voice, camera and continuity testing.' },
      { percentage: '10%', category: 'Legal, IP & Corporate', detail: 'Entity formation, intellectual property, contracts and investor readiness.' },
      { percentage: '5%', category: 'Contingency', detail: 'Provider changes, equipment, external validation and unforeseen test costs.' },
    ],
    gates: [
      { gate: 'Gate 1', title: 'State Engine & Ledger', detail: 'Working classical state engine and replayable append-only canonical ledger.' },
      { gate: 'Gate 2', title: 'Continuity Proof', detail: 'Two-character 500-step zero-contradiction continuity proof.' },
      { gate: 'Gate 3', title: 'Simulator Benchmark', detail: 'Classical baseline versus CUDA-Q simulator comparative benchmark.' },
      { gate: 'Gate 4', title: 'Visual Room Demo', detail: 'Persistent visual-room demonstration with camera & voice consistency.' },
      { gate: 'Gate 5', title: 'Studio Partners', detail: 'Initial creator or studio design partners onboarded for private rooms.' },
    ],
    ctas: {
      primary: 'Request the investor deck',
      secondary: 'Discuss the first proof',
      email: 'nishant@darkcloud.co.in',
      linkedin: 'https://linkedin.com/in/nishant-sinha-qpsi',
      deckPdf: '/docs/Q-Psi-Investor-Deck-2026.pdf',
    },
  },

  claimsComparison: {
    heading: 'What we claim.\nWhat we do not claim.',
    allowed: [
      'Q-Psi is an idea-stage persistent-world architecture.',
      'The founder has defined the initial system and milestone sequence.',
      'The first product is a two-character persistent environment.',
      'Classical execution will be the mandatory baseline.',
      'Quantum methods will be evaluated experimentally.',
      'Commercialization can begin before the entire world is complete.',
    ],
    notAllowed: [
      'Q-Psi has proven quantum advantage.',
      'Q-Psi has a working quantum-native world.',
      'A QPU renders or contains the virtual world.',
      'The final world is production ready.',
      'The company has paying Q-Psi customers.',
      'The product is already operating 24×7.',
      'The founder is an academic quantum expert.',
      'Any ecosystem program has technically validated Q-Psi.',
    ],
  },

  faq: {
    headline: 'Investor Frequently Asked Questions',
    items: [
      {
        question: 'Is Q-Psi dependent on quantum computing?',
        answer:
          'No. The first commercial engine will use classical systems. Quantum, quantum-inspired and hybrid methods are experimental backends for constrained state selection and optimization.',
      },
      {
        question: 'Why not simply use an LLM memory database?',
        answer:
          'An LLM memory store is not authoritative reality. Q-Psi separates objective events, observations, beliefs, secrets and committed history through a canonical ledger.',
      },
      {
        question: 'Why begin with only two characters?',
        answer:
          'Two characters create the smallest environment in which identity, memory, relationships, physical state and narrative continuity can be measured and commercialized.',
      },
      {
        question: 'What prevents competitors from adding memory?',
        answer:
          'Memory is only one layer. Q-Psi combines formal state semantics, canonical history, character-specific knowledge, constraint validation, execution backends, recovery and visual materialization.',
      },
      {
        question: 'What is the first customer?',
        answer:
          'The initial target is a creator, studio or interactive-entertainment partner that needs repeatable, persistent two-character scenes.',
      },
      {
        question: 'What has already been built?',
        answer:
          'The Q-Psi architecture and milestone plan are defined. Q-Psi itself remains pre-prototype. Previous execution evidence comes from SattvaOS, aatma.guru and Darkcloud Infosystems.',
      },
      {
        question: 'Why is the founder raising before the prototype?',
        answer:
          'The first proof requires concentrated founder time, simulation resources, technical infrastructure and a focused persistent-room implementation. The raise is milestone-based and does not assume that the full world will be completed immediately.',
      },
    ] as FaqItem[],
  },

  finalCallout: {
    headline:
      'The future of AI media will not belong only to systems that generate better frames.\n\nIt will belong to systems capable of remembering reality.',
    footerLegal:
      'Q-Psi is currently an idea-stage research and product initiative. All technical and commercial claims are subject to validation.',
    copyright: '© 2026 Q-Psi / Darkcloud Infosystems Pvt. Ltd. All rights reserved.',
  },
};
