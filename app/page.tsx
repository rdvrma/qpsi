'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { QuantumStateSpaceFigure } from '@/components/ui/QuantumStateSpaceFigure';
import { EvidenceLine } from '@/components/ui/EvidenceLine';
import { siteConfig } from '@/content/siteConfig';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  XCircle,
  Database,
  FileText,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Lock,
  Compass,
} from 'lucide-react';

export default function HomePage() {
  const founderFundedUsd = siteConfig.funding.founderFundedUsd;
  const goalUsd = siteConfig.funding.publicGoalUsd;
  const percentage = Math.min(100, (founderFundedUsd / goalUsd) * 100);

  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 space-y-16 sm:space-y-20">
        {/* ================================================== */}
        {/* AUDITED EVIDENCE FREEZE BANNER                      */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="p-3.5 bg-surface-raised border border-border rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-bold text-text-primary">
                Research state frozen 18 Aug 2026
              </span>
              <span className="text-text-muted hidden md:inline">&bull;</span>
              <span className="text-text-secondary hidden md:inline">
                {siteConfig.freeze.notice}
              </span>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <Link
                href="/methodology"
                className="text-accent hover:underline font-semibold flex items-center space-x-1"
              >
                <span>Audit Methodology</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/evidence"
                className="text-text-secondary hover:text-text-primary font-semibold flex items-center space-x-1"
              >
                <span>Evidence Index</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 1 — EDITORIAL HERO (SPLIT LAYOUT)          */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Proposition */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
                  Q-PSI &bull; INDEPENDENT QUANTUM RESEARCH PROGRAM
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-serif font-bold text-text-primary tracking-tight leading-[1.15]">
                Quantum compilation tested on physical hardware.
              </h1>

              <p className="text-base sm:text-lg text-text-secondary font-sans leading-relaxed max-w-xl">
                Compiler research, physical-QPU experiments and frozen evidence across quantum search, hardware-aware compilation, qubit reuse and quantum-assisted data generation.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 font-sans">
                <Link
                  href="/research"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent text-white hover:bg-accent-hover font-semibold text-xs rounded transition-colors shadow-xs"
                >
                  <span>Explore Research</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/compiler"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-surface-raised border border-border hover:border-border-hover text-text-primary font-semibold text-xs rounded transition-colors"
                >
                  <Cpu className="w-3.5 h-3.5 text-accent" />
                  <span>State-Space Compiler</span>
                </Link>

                <Link
                  href="/evidence"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-surface-subtle border border-border hover:border-border-hover text-text-secondary hover:text-text-primary font-semibold text-xs rounded transition-colors"
                >
                  <Database className="w-3.5 h-3.5 text-accent" />
                  <span>Evidence Registry</span>
                </Link>

                <Link
                  href="/capsule"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 text-text-secondary hover:text-accent font-semibold text-xs rounded transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Research Capsule</span>
                </Link>
              </div>

              {/* Restrained Hardware Context */}
              <div className="p-3.5 bg-surface-raised border border-border rounded-lg space-y-2 font-mono text-xs">
                <div className="text-[10px] uppercase font-bold text-text-muted tracking-wider flex items-center justify-between">
                  <span>PRIMARY PHYSICAL PROCESSOR</span>
                  <span className="text-text-primary font-semibold">IBM Heron r2 (ibm_marrakesh)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                  <div className="p-2 bg-surface-subtle border border-border rounded">
                    <span className="text-[10px] text-text-muted block font-bold">CAPACITY</span>
                    <span className="text-text-primary font-bold">156 programmable qubits</span>
                  </div>
                  <div className="p-2 bg-surface-subtle border border-border rounded">
                    <span className="text-[10px] text-text-muted block font-bold">ACTIVE QUANTUM TIME</span>
                    <span className="text-text-primary font-bold">259.38 seconds</span>
                  </div>
                  <div className="p-2 bg-surface-subtle border border-border rounded">
                    <span className="text-[10px] text-text-muted block font-bold">AUDIT STATUS</span>
                    <span className="text-[#15803D] font-bold">100% REPRODUCED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: State-Space Figure */}
            <div className="lg:col-span-6">
              <QuantumStateSpaceFigure />
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 2 — AUTHORITATIVE METRIC STRIP              */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface-raised border border-border rounded-lg p-6 sm:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border">
              <div className="space-y-1 sm:px-4 first:pl-0">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">
                  {siteConfig.programTotals.totalPhysicalShots.toLocaleString()}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                  PHYSICAL SHOTS
                </div>
                <div className="text-[11px] text-text-secondary font-sans">
                  Executed on IBM Heron r2
                </div>
              </div>

              <div className="space-y-1 sm:px-4 pt-4 sm:pt-0">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">
                  {siteConfig.programTotals.completedAuditedExperimentFamilies}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                  AUDITED FAMILIES
                </div>
                <div className="text-[11px] text-text-secondary font-sans">
                  Completed &amp; frozen protocols
                </div>
              </div>

              <div className="space-y-1 sm:px-4 pt-4 sm:pt-0">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">
                  {siteConfig.programTotals.productionQpuJobs}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                  PRODUCTION JOBS
                </div>
                <div className="text-[11px] text-text-secondary font-sans">
                  ibm_marrakesh executions
                </div>
              </div>

              <div className="space-y-1 sm:px-4 pt-4 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-accent">
                  HERON r2
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                  PRIMARY PROCESSOR
                </div>
                <div className="text-[11px] text-text-secondary font-sans">
                  156 programmable qubits
                </div>
              </div>

              <div className="space-y-1 sm:px-4 pt-4 sm:pt-0 col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
                  {siteConfig.programTotals.ibmRuntimeQuantumSeconds}s
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                  QUANTUM RUNTIME
                </div>
                <div className="text-[11px] text-text-secondary font-sans">
                  Reported IBM execution seconds
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 3 — TIER A: LEAD RESEARCH PROGRAMS          */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="border-b border-border pb-4 space-y-1">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-accent">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TIER A &bull; LEAD RESEARCH PROGRAMS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">
              Lead Empirical Findings on IBM Heron
            </h2>
            <p className="text-sm text-text-secondary font-sans">
              Five primary research programs evaluated on physical quantum processors under pre-registered hypotheses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Lead 1: Compiler + Grover */}
            <div className="scientific-card p-8 space-y-6 bg-surface-raised border border-border flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-xs font-mono font-bold text-accent">PROGRAM 01</span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-[#16A34A]/10 text-[#15803D] border border-[#16A34A]/25">
                    SUPPORTED
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-text-primary">
                  Compiler-Enabled Quantum Query Advantage
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Q-Psi demonstrated compiler-enabled physical quantum query advantage on structured candidate-state search problems on IBM Heron hardware under an opaque black-box verifier model. Query reduction factors of <strong>2.43x</strong> (N=4), <strong>1.73x</strong> (N=8), and <strong>1.19x</strong> (N=16) were verified across 9/9 individual cases and 3/3 tested problem sizes.
                </p>
                <div className="p-3.5 bg-surface-subtle border border-border rounded font-mono text-xs space-y-1 text-text-muted">
                  <div className="flex justify-between">
                    <span>IBM Job ID:</span>
                    <strong className="text-text-primary">da1c7rkdedkc73eqs5mg</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Physical Shots &bull; QPU:</span>
                    <span className="text-text-primary">18,432 &bull; ibm_marrakesh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>N=16 95% CI Upper:</span>
                    <span className="text-[#15803D] font-bold">7.360 &lt; 8.5 classical</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Link
                  href="/research/compiler-grover-query-advantage"
                  className="text-xs font-sans font-semibold text-accent hover:underline flex items-center space-x-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Read Formal Research Note</span>
                </Link>
                <Link href="/evidence" className="text-xs font-sans text-text-muted hover:text-text-primary">
                  Evidence &rarr;
                </Link>
              </div>
            </div>

            {/* Lead 2: Dynamic BV */}
            <div className="scientific-card p-8 space-y-6 bg-surface-raised border border-border flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-xs font-mono font-bold text-accent">PROGRAM 02</span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-[#16A34A]/10 text-[#15803D] border border-[#16A34A]/25">
                    SUPPORTED
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-text-primary">
                  Dynamic Bernstein–Vazirani Scaling Advantage
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Demonstrated bounded physical query-complexity and scaling advantage under single-shot Pokharel-Lidar-style sampling across N=4..16 qubits on <code>ibm_marrakesh</code>. Quantum scaling slope &alpha;_Q = 0.1532 proved statistically superior to the classical exhaustive bound &alpha;_C = 0.6963 (t = -30.65, p &lt; 10<sup>-6</sup>).
                </p>
                <div className="p-3.5 bg-surface-subtle border border-border rounded font-mono text-xs space-y-1 text-text-muted">
                  <div className="flex justify-between">
                    <span>IBM Job ID:</span>
                    <strong className="text-text-primary">da1a03mg52gs73clcj80</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Physical Shots &bull; QPU:</span>
                    <span className="text-text-primary">28,672 &bull; ibm_marrakesh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Statistical Separation:</span>
                    <span className="text-[#15803D] font-bold">t = -30.65, p = 3.47e-7</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Link
                  href="/research/dynamic-bv"
                  className="text-xs font-sans font-semibold text-accent hover:underline flex items-center space-x-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Read Formal Research Note</span>
                </Link>
                <Link href="/evidence" className="text-xs font-sans text-text-muted hover:text-text-primary">
                  Evidence &rarr;
                </Link>
              </div>
            </div>

            {/* Lead 3: MCM Qubit Reuse */}
            <div className="scientific-card p-8 space-y-6 bg-surface-raised border border-border flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-xs font-mono font-bold text-accent">PROGRAM 03</span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-[#D97706]/10 text-[#B45309] border border-[#D97706]/25">
                    SUPPORTED WITH QUALIFICATION
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-text-primary">
                  Compiler-Driven MCM Qubit Reuse
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Compiler-driven liveness and mid-circuit reuse reduced physical register width by a median <strong>78.1%</strong> (up to 87.5% on 16 logical qubits mapped to 2 physical slots) across the frozen streaming benchmark while all six tested cases remained within the predeclared observable-quality criterion (6/6 non-inferior cases).
                </p>
                <div className="p-3.5 bg-surface-subtle border border-border rounded font-mono text-xs space-y-1 text-text-muted">
                  <div className="flex justify-between">
                    <span>IBM Job ID:</span>
                    <strong className="text-text-primary">da1u0om3kjvs738777cg</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Physical Shots:</span>
                    <span className="text-text-primary">24,576 shots</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Scope Qualification:</span>
                    <span className="text-text-primary">Streaming / sequential liveness only</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Link
                  href="/research/mcm-qubit-reuse"
                  className="text-xs font-sans font-semibold text-accent hover:underline flex items-center space-x-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Read Formal Research Note</span>
                </Link>
                <Link href="/evidence" className="text-xs font-sans text-text-muted hover:text-text-primary">
                  Evidence &rarr;
                </Link>
              </div>
            </div>

            {/* Lead 4: Quantum Data Foundry V2 */}
            <div className="scientific-card p-8 space-y-6 bg-surface-raised border border-border flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-xs font-mono font-bold text-accent">PROGRAM 04</span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-[#D97706]/10 text-[#B45309] border border-[#D97706]/25">
                    SUPPORTED WITH QUALIFICATION
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-text-primary">
                  Quantum-Assisted Data Foundry V2
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Q-Psi demonstrated a physical-QPU-assisted coding-data pipeline in which QPU measurement samples causally selected repository mutation states that were converted by executable software verifiers into <strong>93 unique verified repair records</strong> (127.58s runtime, 332,768 shots, 100% QPU provenance). Current bottleneck is classical verification. Downstream LLM fine-tuning was not evaluated.
                </p>
                <div className="p-3.5 bg-surface-subtle border border-border rounded font-mono text-xs space-y-1 text-text-muted">
                  <div className="flex justify-between">
                    <span>QPU State Universe:</span>
                    <strong className="text-text-primary">65,536 (16 selector qubits)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Unique QPU States:</span>
                    <span className="text-text-primary">65,138 sampled states</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verified Positive Records:</span>
                    <span className="text-accent font-bold">93 records (1.59 MB)</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Link
                  href="/research/data-foundry"
                  className="text-xs font-sans font-semibold text-accent hover:underline flex items-center space-x-1"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Explore Data Foundry Pipeline</span>
                </Link>
                <Link href="/evidence" className="text-xs font-sans text-text-muted hover:text-text-primary">
                  Evidence &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Lead 5: MQT Cross-Compiler Benchmark (Full Width Card with distinct MIXED treatment) */}
          <div className="scientific-card p-8 sm:p-10 bg-surface-raised border border-border space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#64748B]/10 text-text-secondary border border-[#64748B]/25 text-[11px] font-mono font-bold uppercase tracking-wider">
                  <AlertCircle className="w-3.5 h-3.5 text-accent" />
                  <span>COMMERCIAL BENCHMARK &bull; MIXED COMPETITIVENESS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary mt-1">
                  External MQT Bench Comparison Against Qiskit O3 and TKET
                </h3>
              </div>
              <div className="text-xs font-mono text-text-muted">
                EXPERIMENT: <strong className="text-text-primary">QPSI_MQT_CROSS_COMPILER_BENCHMARK_V1</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3 text-xs sm:text-sm text-text-secondary font-sans leading-relaxed">
                <p>
                  Q-Psi compiled all 18 frozen benchmark cases from the standard MQT suite. Physical execution on IBM Heron demonstrated that competitiveness was workload-dependent:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li><strong>Vs. Qiskit O3:</strong> Qiskit held a small aggregate physical fidelity advantage (mean delta <strong>-0.0067</strong>, 95% CI: [-0.0123, -0.0010]).</li>
                  <li><strong>Vs. TKET:</strong> Q-Psi held an apparent aggregate advantage (+0.0398 delta), but this was heavily driven by TKET&apos;s mapping failure on <code>vqe_su2_n8</code> (+0.2696 delta).</li>
                  <li><strong>Sensitivity Audit:</strong> When <code>vqe_su2_n8</code> is omitted, Q-Psi vs. TKET mean delta shifts to <strong>-0.0062</strong>.</li>
                </ul>
                <p className="text-xs font-mono text-text-primary font-bold pt-1">
                  Universal compiler superiority is explicitly disclaimed.
                </p>
              </div>

              <div className="lg:col-span-5 bg-surface-subtle p-5 rounded-lg border border-border font-mono text-xs space-y-3">
                <div className="text-[10px] text-text-muted uppercase tracking-widest font-bold border-b border-border pb-1">
                  AUDITED FIDELITY DELTAS
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Valid Compilations:</span>
                    <strong className="text-text-primary">18 / 18 (100%)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Q-Psi vs Qiskit O3:</span>
                    <span className="text-text-primary font-bold">-0.0067 [-0.0123, -0.0010]</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Q-Psi vs TKET (All):</span>
                    <span className="text-text-primary font-bold">+0.0398 [+0.0329, +0.0457]</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Q-Psi vs TKET (Excl. VQE):</span>
                    <span className="text-text-primary font-bold">-0.0062 [-0.0120, -0.0006]</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 text-[10px]">
                    <span className="text-text-muted">IBM Job ID:</span>
                    <code className="text-text-primary">da1ul7e3kjvs73877tag</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-border">
              <Link
                href="/research/mqt-cross-compiler"
                className="text-xs font-sans font-semibold text-accent hover:underline flex items-center space-x-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Read Full Cross-Compiler Sensitivity Audit</span>
              </Link>
              <Link href="/evidence" className="text-xs font-sans text-text-muted hover:text-text-primary">
                Inspect Raw Evidence &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 4 — TIER B: SECONDARY TECHNICAL FINDINGS   */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b border-border pb-4 space-y-1">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">
              TIER B &bull; SECONDARY TECHNICAL CONTRIBUTIONS
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
              Hardware-Aware Compiler Studies &amp; Baselines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
            {/* Dynamic Routing */}
            <div className="scientific-card p-6 bg-surface-raised border border-border rounded space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-accent">ROUTING CROSSOVER</span>
                  <span className="text-[#D97706] font-bold">QUALIFIED</span>
                </div>
                <h4 className="text-base font-serif font-bold text-text-primary">
                  Dynamic Routing Crossover Study
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  Dynamic ancilla routing compressed 2Q depth from 73 to 2 on 13 hops, but reset and measurement noise prevented physical Bell fidelity crossover on Heron r2.
                </p>
              </div>
              <div className="pt-3 border-t border-border flex items-center justify-between font-mono text-[11px]">
                <span className="text-text-muted">Job: da1t22mg...</span>
                <Link href="/research/dynamic-routing-crossover" className="text-accent font-semibold hover:underline">
                  Note &rarr;
                </Link>
              </div>
            </div>

            {/* Stage 6F Optimization */}
            <div className="scientific-card p-6 bg-surface-raised border border-border rounded space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-accent">STAGE 6F OPTIMIZATION</span>
                  <span className="text-[#D97706] font-bold">QUALIFIED</span>
                </div>
                <h4 className="text-base font-serif font-bold text-text-primary">
                  QUBO/Ising Hardware Parity
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  QAOA-based compiler optimization on IBM Marrakesh achieved 4/4 exact optimum hits on small compiler graphs (N&le;10), degrading on N=18..25 due to hardware noise.
                </p>
              </div>
              <div className="pt-3 border-t border-border flex items-center justify-between font-mono text-[11px]">
                <span className="text-text-muted">Job: da16h8ug...</span>
                <Link href="/compiler" className="text-accent font-semibold hover:underline">
                  Compiler &rarr;
                </Link>
              </div>
            </div>

            {/* Data Foundry V1 */}
            <div className="scientific-card p-6 bg-surface-raised border border-border rounded space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-accent">DATA FOUNDRY V1</span>
                  <span className="text-[#D97706] font-bold">QUALIFIED</span>
                </div>
                <h4 className="text-base font-serif font-bold text-text-primary">
                  V1 Proof-of-Concept Baseline
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  Initial feasibility demonstration of physical QPU selector on M=1024 space yielding 14 verified unique code repair records (superseded by V2 120-Qsec campaign).
                </p>
              </div>
              <div className="pt-3 border-t border-border flex items-center justify-between font-mono text-[11px]">
                <span className="text-text-muted">Job: da1vc94d...</span>
                <Link href="/research/data-foundry" className="text-accent font-semibold hover:underline">
                  Foundry &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 5 — TIER C: NEGATIVE & BOUNDARY RESULTS     */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b border-border pb-4 space-y-1">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#DC2626]">
              TIER C &bull; NEGATIVE, MIXED &amp; BOUNDARY RESULTS
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
              Preserving Falsifying Evidence &amp; Inconclusive Studies
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary font-sans">
              Scientific credibility requires publishing where ideas failed or where hardware noise prevented conclusive advantage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans text-xs">
            {/* Negative Layout */}
            <div className="scientific-card p-6 bg-surface-raised border border-border rounded space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-text-primary">LAYOUT VS QISKIT</span>
                  <span className="text-[#DC2626] font-bold">NOT SUPPORTED</span>
                </div>
                <h4 className="text-sm font-serif font-bold text-text-primary">
                  Calibration-Aware Layout
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  Against Qiskit O3 best-of-8 seeds, Q-Psi layout achieved 1 win, 2 losses, 3 inconclusive (mean delta -0.0106). Preserved as a negative comparator.
                </p>
              </div>
              <div className="pt-2 border-t border-border font-mono text-[10px] text-text-muted">
                Job: da1tm0eg &bull; 36,864 shots
              </div>
            </div>

            {/* Fractional Gate Lowering */}
            <div className="scientific-card p-6 bg-surface-raised border border-border rounded space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-text-primary">PULSE LOWERING</span>
                  <span className="text-[#64748B] font-bold">MIXED</span>
                </div>
                <h4 className="text-sm font-serif font-bold text-text-primary">
                  Fractional Gate Lowering
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  Pulse duration compression yielded 2 physical wins and 4 inconclusive cases on IBM Heron, supporting mixed physical signal.
                </p>
              </div>
              <div className="pt-2 border-t border-border font-mono text-[10px] text-text-muted">
                Job: da1tg6eg &bull; 24,576 shots
              </div>
            </div>

            {/* Directed Execution */}
            <div className="scientific-card p-6 bg-surface-raised border border-border rounded space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-text-primary">DIRECTED EXECUTION</span>
                  <span className="text-[#64748B] font-bold">INCONCLUSIVE</span>
                </div>
                <h4 className="text-sm font-serif font-bold text-text-primary">
                  Selective Pauli Twirling
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  Reduced twirling overhead by 58.9% on beta hardware; selective-vs-full non-inferiority was inconclusive.
                </p>
              </div>
              <div className="pt-2 border-t border-border font-mono text-[10px] text-text-muted">
                Job: da1u5o63 &bull; 24,576 shots
              </div>
            </div>

            {/* Restricted Simon */}
            <div className="scientific-card p-6 bg-surface-raised border border-border rounded space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-text-primary">RESTRICTED SIMON</span>
                  <span className="text-[#64748B] font-bold">INCONCLUSIVE</span>
                </div>
                <h4 className="text-sm font-serif font-bold text-text-primary">
                  56-Slot Simon Circuits
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  Polynomial query reduction on 6/12 instances, but noise-induced degradation on larger N prevented asymptotic speedup.
                </p>
              </div>
              <div className="pt-2 border-t border-border font-mono text-[10px] text-text-muted">
                Job: da1a0pie &bull; 24,576 shots
              </div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 6 — DEEP-INK EVIDENCE ROOM                 */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#101522] text-[#F0F4F8] border border-[#273248] rounded-xl p-8 sm:p-12 space-y-8">
            <div className="flex flex-wrap items-center justify-between border-b border-[#273248] pb-6 gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                  <Database className="w-3.5 h-3.5 text-[#00AFC7]" />
                  <span>PUBLIC EVIDENCE ROOM &bull; FROZEN REGISTRY</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-white mt-2">
                  Cryptographic Evidence &amp; IBM Quantum Execution Provenance
                </h2>
              </div>
              <Link
                href="/evidence"
                className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#00AFC7] hover:underline font-semibold"
              >
                <span>OPEN VERIFIED EVIDENCE REGISTRY</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Evidence Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#182033] border border-[#273248] rounded space-y-2">
                <div className="text-[10px] text-[#94A3B8]">GROVER ADVANTAGE JOB</div>
                <div className="text-white font-bold text-sm truncate">da1c7rkdedkc73eqs5mg</div>
                <div className="text-[10px] text-[#94A3B8]">18,432 shots &bull; 2.50s runtime</div>
              </div>

              <div className="p-4 bg-[#182033] border border-[#273248] rounded space-y-2">
                <div className="text-[10px] text-[#94A3B8]">DATA FOUNDRY V2 JOBS</div>
                <div className="text-white font-bold text-sm truncate">4 Jobs (da1vjh4d...)</div>
                <div className="text-[10px] text-[#94A3B8]">332,768 shots &bull; 127.58s runtime</div>
              </div>

              <div className="p-4 bg-[#182033] border border-[#273248] rounded space-y-2">
                <div className="text-[10px] text-[#94A3B8]">MQT BENCHMARK JOB</div>
                <div className="text-white font-bold text-sm truncate">da1ul7e3kjvs73877tag</div>
                <div className="text-[10px] text-[#94A3B8]">36,864 shots &bull; 16.80s runtime</div>
              </div>

              <div className="p-4 bg-[#182033] border border-[#273248] rounded space-y-2">
                <div className="text-[10px] text-[#94A3B8]">DYNAMIC BV JOB</div>
                <div className="text-white font-bold text-sm truncate">da1a03mg52gs73clcj80</div>
                <div className="text-[10px] text-[#94A3B8]">28,672 shots &bull; 14.20s runtime</div>
              </div>
            </div>

            <div className="p-4 bg-[#161D2E] border border-[#273248] rounded text-xs font-mono space-y-1 text-[#94A3B8]">
              <div>PUBLIC EVIDENCE POLICY: IBM job IDs, cryptographic evidence hashes, audited metrics and claim boundaries are published for independent verification.</div>
              <div>FREEZE COMMIT: <span className="text-white">be74ad05187e148e2fc52309f4d7f57be3784157</span> &bull; 14/14 Automated Audits Passed</div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 7 — INSTITUTIONAL RESEARCH FUND SUPPORT    */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scientific-card p-8 sm:p-12 space-y-8 bg-surface-raised border border-border">
            <div className="flex flex-wrap items-center justify-between border-b border-border pb-6 gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                  INSTITUTIONAL RESEARCH SUPPORT
                </span>
                <h2 className="text-3xl font-serif font-bold text-text-primary mt-1">
                  Q-Psi Research Support Fund
                </h2>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-text-muted">PUBLIC RESEARCH GOAL</div>
                <div className="text-2xl font-serif font-bold text-text-primary">
                  ${goalUsd.toLocaleString()} USD
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4 font-sans text-sm text-text-secondary leading-relaxed">
                <p>
                  {siteConfig.funding.description}
                </p>

                {/* Milestone Achieved Callout */}
                <div className="p-3 bg-surface-subtle border border-border rounded flex items-center justify-between text-xs font-mono">
                  <span className="text-text-muted font-semibold uppercase">FROZEN RESEARCH STATE</span>
                  <span className="text-[#15803D] font-bold">14 Audited Campaigns &bull; 564,840 Physical Shots PASS</span>
                </div>

                {/* Founder-Funded Disclosure Progress Bar */}
                <div className="p-4 bg-surface-subtle border border-border rounded space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-text-muted uppercase font-semibold">
                      FOUNDER-FUNDED RESEARCH TO DATE
                    </span>
                    <span className="text-text-primary font-bold">
                      ${founderFundedUsd.toLocaleString()} / ${goalUsd.toLocaleString()} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-accent h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-text-muted font-sans italic">
                  {siteConfig.funding.disclaimer}
                </p>
              </div>

              <div className="md:col-span-5 bg-surface-subtle p-6 rounded-lg border border-border space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                    DIRECT CONTRIBUTION
                  </div>
                  <h3 className="text-xl font-serif font-bold text-text-primary">
                    Support Independent Quantum Research
                  </h3>
                  <p className="text-xs text-text-secondary font-sans">
                    Contributions fund physical-QPU compute hours on IBM Quantum processors, evidence archiving, and open-access scientific publication.
                  </p>
                </div>

                <a
                  href={siteConfig.funding.payPalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover transition-colors shadow-xs"
                >
                  <span>Support Independent Research via PayPal</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <div className="text-[11px] font-sans text-text-muted text-center">
                  Payments handled on PayPal-hosted pages &bull; No card data stored on site
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
