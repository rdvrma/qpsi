import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowUpRight, Cpu, Lock, CheckCircle2, AlertCircle, ShieldCheck, Mail, FileText, Database, Layers, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'State-Space Compiler — Q-Psi Independent Quantum Research',
  description:
    'Q-Psi State-Space Compiler architecture: state-space construction, quantum-ready search representations, and hardware-aware execution research on superconducting processors.',
};

export default function CompilerPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              COMPILER ARCHITECTURE &bull; THREE-LAYER SYSTEM
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Q-Psi State-Space Compiler
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            The Q-Psi compiler automates the translation of discrete software search universes into structured candidate state spaces and physical circuits for superconducting quantum hardware.
          </p>
        </div>

        {/* 3-Level Architecture Cards */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
              COMPILER SPECIFICATION
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary mt-1">
              Three Levels of Compiler Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
            {/* Level 1 */}
            <div className="scientific-card p-6 sm:p-8 bg-surface-raised border border-border rounded space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-accent">LEVEL 01</div>
                <h3 className="text-xl font-serif font-bold text-text-primary">
                  State-Space Construction
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Extracts discrete candidate state universes from multi-file repository interaction graphs. Identifies search spaces spanning thousands of discrete mutation combinations while pruning irrelevant subgraphs.
                </p>
                <div className="p-3 bg-surface-subtle border border-border rounded font-mono text-[11px] text-text-muted space-y-1">
                  <div>INPUT: Multi-file repository corpus</div>
                  <div>OUTPUT: Discrete candidate state universe</div>
                  <div>BASELINE: Stage 6C-R1 (98.4% reduction)</div>
                </div>
              </div>
              <div className="font-mono text-[10px] text-text-muted border-t border-border pt-3">
                STATE-SPACE REDUCTION ENGINE
              </div>
            </div>

            {/* Level 2 */}
            <div className="scientific-card p-6 sm:p-8 bg-surface-raised border border-border rounded space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-accent">LEVEL 02</div>
                <h3 className="text-xl font-serif font-bold text-text-primary">
                  Quantum-Ready Search &amp; Oracle Representation
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Maps candidate spaces into permutation-invariant black-box oracle interfaces and Grover amplitude amplification circuits without leaking ground truth or introducing rank-order side channels.
                </p>
                <div className="p-3 bg-surface-subtle border border-border rounded font-mono text-[11px] text-text-muted space-y-1">
                  <div>PROTOCOL: Opaque verifier contract</div>
                  <div>ALGORITHM: Grover v1.1 search</div>
                  <div>FINDING: 1.19x–2.43x query reduction</div>
                </div>
              </div>
              <div className="font-mono text-[10px] text-text-muted border-t border-border pt-3">
                BOUNDED QUERY ADVANTAGE INTERFACE
              </div>
            </div>

            {/* Level 3 */}
            <div className="scientific-card p-6 sm:p-8 bg-surface-raised border border-border rounded space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-accent">LEVEL 03</div>
                <h3 className="text-xl font-serif font-bold text-text-primary">
                  Hardware-Aware Execution Research
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Evaluates physical execution strategies on heavy-hex QPUs: temporal liveness qubit reuse, dynamic vs. unitary routing, pulse-level fractional gate lowering, and selective twirling.
                </p>
                <div className="p-3 bg-surface-subtle border border-border rounded font-mono text-[11px] text-text-muted space-y-1">
                  <div>REUSE: 78.1% median width reduction</div>
                  <div>ROUTING: Depth 73 &rarr; 2 compression</div>
                  <div>BENCHMARK: MQT cross-compiler audit</div>
                </div>
              </div>
              <div className="font-mono text-[10px] text-text-muted border-t border-border pt-3">
                PHYSICAL QPU COMPILATION PASSES
              </div>
            </div>
          </div>
        </section>

        {/* Compiler Research Findings Matrix */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">
              EMPIRICAL RESULTS ON IBM HERON
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary mt-1">
              Compiler Research Campaigns
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans text-xs">
            {/* Grover */}
            <div className="scientific-card p-6 bg-surface-raised border border-border rounded space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-accent">GROVER QUERY SEARCH</span>
                  <span className="text-[#15803D] font-bold">SUPPORTED</span>
                </div>
                <h4 className="text-base font-serif font-bold text-text-primary">
                  Compiler + Grover (v1.1)
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  2.43x (N=4), 1.73x (N=8), and 1.19x (N=16) physical query reduction on IBM Marrakesh across 9/9 cases.
                </p>
              </div>
              <Link href="/research/compiler-grover-query-advantage" className="text-accent font-semibold hover:underline pt-2 border-t border-border">
                Read Note &rarr;
              </Link>
            </div>

            {/* Qubit Reuse */}
            <div className="scientific-card p-6 bg-surface-raised border border-border rounded space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-accent">MCM QUBIT REUSE</span>
                  <span className="text-[#D97706] font-bold">SUPPORTED (QUALIFIED)</span>
                </div>
                <h4 className="text-base font-serif font-bold text-text-primary">
                  Liveness &amp; Qubit Reuse
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  78.1% median register reduction on streaming circuits with 6/6 non-inferior observable cases.
                </p>
              </div>
              <Link href="/research/mcm-qubit-reuse" className="text-accent font-semibold hover:underline pt-2 border-t border-border">
                Read Note &rarr;
              </Link>
            </div>

            {/* MQT Benchmark */}
            <div className="scientific-card p-6 bg-surface-raised border border-border rounded space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-accent">MQT BENCHMARK</span>
                  <span className="text-[#64748B] font-bold">MIXED COMPETITIVENESS</span>
                </div>
                <h4 className="text-base font-serif font-bold text-text-primary">
                  MQT Cross-Compiler Audit
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  18/18 valid compilations; disfavored vs Qiskit O3 (-0.0067 delta); sensitive to VQE workload vs TKET.
                </p>
              </div>
              <Link href="/research/mqt-cross-compiler" className="text-accent font-semibold hover:underline pt-2 border-t border-border">
                Read Note &rarr;
              </Link>
            </div>

            {/* Dynamic Routing */}
            <div className="scientific-card p-6 bg-surface-raised border border-border rounded space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-accent">DYNAMIC ROUTING</span>
                  <span className="text-[#D97706] font-bold">SUPPORTED (QUALIFIED)</span>
                </div>
                <h4 className="text-base font-serif font-bold text-text-primary">
                  Dynamic Ancilla Routing
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  Depth compressed 73 &rarr; 2 on 13 hops; reset and measurement noise prevented Bell fidelity crossover.
                </p>
              </div>
              <Link href="/research/dynamic-routing-crossover" className="text-accent font-semibold hover:underline pt-2 border-t border-border">
                Read Note &rarr;
              </Link>
            </div>

            {/* Fractional Lowering */}
            <div className="scientific-card p-6 bg-surface-raised border border-border rounded space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-accent">PULSE LOWERING</span>
                  <span className="text-[#64748B] font-bold">MIXED SIGNAL</span>
                </div>
                <h4 className="text-base font-serif font-bold text-text-primary">
                  Fractional Gate Lowering
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  Structural duration reduction yielded 2 physical wins and 4 inconclusive cases on IBM Heron.
                </p>
              </div>
              <Link href="/research/fractional-gate-lowering" className="text-accent font-semibold hover:underline pt-2 border-t border-border">
                Read Note &rarr;
              </Link>
            </div>

            {/* Calibration Layout (Negative) */}
            <div className="scientific-card p-6 bg-surface-raised border border-border rounded space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-accent">LAYOUT VS QISKIT</span>
                  <span className="text-[#DC2626] font-bold">NOT SUPPORTED</span>
                </div>
                <h4 className="text-base font-serif font-bold text-text-primary">
                  Calibration-Aware Layout
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  Qiskit O3 multi-seed layout outperformed Q-Psi layout (mean delta -0.0106). Preserved negative baseline.
                </p>
              </div>
              <Link href="/research/calibration-aware-layout" className="text-accent font-semibold hover:underline pt-2 border-t border-border">
                Read Note &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Source Boundary & Research Capsule Access */}
        <section className="scientific-card p-8 sm:p-12 bg-surface-raised border border-border rounded-lg space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>PROPRIETARY COMPILER / RESEARCH CAPSULE BOUNDARY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
              Accessing the Q-Psi State-Space Compiler
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary font-sans leading-relaxed">
              The core Q-Psi State-Space Compiler source code and optimization heuristics remain closed-source and proprietary. Eligible researchers, laboratories, and quantum computing groups can evaluate compiler performance on their own workloads through the <strong>Q-Psi Research Capsule</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-sans text-xs">
            <div className="p-5 bg-surface-subtle border border-border rounded space-y-3">
              <div className="font-mono font-bold text-text-primary uppercase">RESEARCH ACCESS MODEL</div>
              <p className="text-text-secondary leading-relaxed">
                {siteConfig.capsule.coreCopy}
              </p>
              <div className="pt-2">
                <Link
                  href="/capsule"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover transition-colors shadow-xs"
                >
                  <span>Open Q-Psi Research Capsule</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="p-5 bg-surface-subtle border border-border rounded space-y-3">
              <div className="font-mono font-bold text-text-primary uppercase">COMMERCIAL LICENSING</div>
              <p className="text-text-secondary leading-relaxed">
                {siteConfig.capsule.commercialSectionCopy}
              </p>
              <div className="pt-2 font-mono text-[11px] text-text-muted">
                Contact: <a href={`mailto:${siteConfig.contact.email}`} className="text-accent font-semibold hover:underline">{siteConfig.contact.email}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
