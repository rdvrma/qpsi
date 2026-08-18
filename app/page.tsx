'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { QuantumStateSpaceFigure } from '@/components/ui/QuantumStateSpaceFigure';
import { InteractiveEnergyGapChart } from '@/components/ui/InteractiveEnergyGapChart';
import { EvidenceLine } from '@/components/ui/EvidenceLine';
import { siteConfig } from '@/content/siteConfig';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Database,
  FileText,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
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
        {/* SECTION 1 — EDITORIAL HERO (SPLIT LAYOUT)          */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Editorial Proposition */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
                  Q-PSI &bull; INDEPENDENT QUANTUM RESEARCH
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-serif font-bold text-text-primary tracking-tight leading-[1.15]">
                Testing where quantum computation actually outperforms classical methods.
              </h1>

              <p className="text-base sm:text-lg text-text-secondary font-sans leading-relaxed max-w-xl">
                Physical-QPU experiments, compiler research and reproducible evidence. Two independently audited physical-QPU query-advantage experiments.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2 font-sans">
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
                  <span>Evidence Index</span>
                </Link>
              </div>

              {/* Restrained Institutional Evidence Status Line beneath hero */}
              <div className="p-3.5 bg-surface-raised border border-border rounded-lg space-y-2 font-mono text-xs">
                <div className="text-[10px] uppercase font-bold text-text-muted tracking-wider flex items-center justify-between">
                  <span>PHYSICAL QPU RESEARCH &bull; REPRODUCIBLE BENCHMARK AUDIT</span>
                  <span className="text-text-primary font-semibold">ibm_marrakesh (156Q)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="p-2 bg-surface-subtle border border-border rounded flex flex-col justify-between">
                    <span className="text-[10px] text-text-muted font-bold">DYNAMIC BV</span>
                    <span className="text-[11px] text-[#15803D] font-bold">QUERY ADVANTAGE &bull; SUPPORTED</span>
                  </div>
                  <div className="p-2 bg-surface-subtle border border-border rounded flex flex-col justify-between">
                    <span className="text-[10px] text-text-muted font-bold">Q-PSI COMPILER</span>
                    <span className="text-[11px] text-[#15803D] font-bold">QUERY ADVANTAGE &bull; SUPPORTED</span>
                  </div>
                  <div className="p-2 bg-surface-subtle border border-border rounded flex flex-col justify-between">
                    <span className="text-[10px] text-text-muted font-bold">RESTRICTED SIMON</span>
                    <span className="text-[11px] text-[#B45309] font-bold">INCONCLUSIVE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Restrained Scientific State-Space / Hamiltonian Figure */}
            <div className="lg:col-span-6">
              <QuantumStateSpaceFigure />
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 2 — RESEARCH EVIDENCE METRIC STRIP        */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface-raised border border-border rounded-lg p-6 sm:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border">
              <div className="space-y-1 sm:px-4 first:pl-0">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">
                  {siteConfig.quantumSummary.totalPhysicalShots.toLocaleString()}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                  PHYSICAL SHOTS
                </div>
                <div className="text-[11px] text-text-secondary font-sans">
                  Executed on ibm_marrakesh (156Q)
                </div>
              </div>

              <div className="space-y-1 sm:px-4 pt-4 sm:pt-0">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">
                  {siteConfig.quantumSummary.campaignsCount}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                  HARDWARE CAMPAIGNS
                </div>
                <div className="text-[11px] text-text-secondary font-sans">
                  BV &bull; Compiler Grover &bull; Dynamic Routing &bull; 6F &bull; Simon &bull; Mantra
                </div>
              </div>

              <div className="space-y-1 sm:px-4 pt-4 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#15803D]">
                  SUPPORTED
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                  DYNAMIC BV ADVANTAGE
                </div>
                <div className="text-[11px] text-text-secondary font-sans">
                  &alpha;<sub>Q</sub> = 0.1532 vs &alpha;<sub>C</sub> = 0.6963 (p &lt; 10<sup>-6</sup>)
                </div>
              </div>

              <div className="space-y-1 sm:px-4 pt-4 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#15803D]">
                  SUPPORTED
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                  COMPILER QUERY ADVANTAGE
                </div>
                <div className="text-[11px] text-text-secondary font-sans">
                  9/9 Cases &bull; 3/3 Sizes &bull; N=16 95% CI Preserved
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 3A — FLAGSHIP 1: COMPILER QUERY ADVANTAGE  */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scientific-card p-8 sm:p-12 space-y-8 bg-surface-raised border border-border">
            <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#16A34A]/10 text-[#15803D] border border-[#16A34A]/25 text-[11px] font-mono font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>SUPPORTED RESULT &bull; COMPILER-ENABLED QUANTUM QUERY ADVANTAGE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary mt-2">
                  Q-Psi State-Space Compiler: Compiler-Enabled Quantum Query Advantage
                </h2>
              </div>
              <div className="text-xs font-mono text-text-muted">
                IDENTIFIER: <strong className="text-text-primary">QPSI-EXP-CGQA-01</strong> (v1.1)
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 font-sans text-sm text-text-secondary leading-relaxed">
                <p className="text-base text-text-primary font-medium">
                  Q-Psi compiled authentic software-repair candidate-state spaces and executed a frozen Grover-search experiment on physical IBM quantum hardware. Under the audited black-box verifier model, the quantum arm required fewer effective verifier queries than the frozen classical expected search cost at N=4, N=8 and N=16.
                </p>
                <p>
                  Across 9 frozen candidate spaces drawn from 7 programming language ecosystems, physical quantum execution on <code>ibm_marrakesh</code> (18,432 physical shots) demonstrated quantum query advantage in <strong>9 out of 9 individual cases</strong> and across <strong>3 out of 3 problem sizes</strong>. At N=16, the upper bound of the 95% Wilson confidence interval on effective quantum queries (<strong>7.360</strong>) remained strictly below the classical expected baseline of <strong>8.5</strong> queries.
                </p>

                {/* Evidence Pipeline Integration */}
                <div className="pt-2">
                  <EvidenceLine status="SUPPORTED" claimLabel="COMPILER QUERY ADVANTAGE SUPPORTED" />
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-sans">
                  <Link
                    href="/research/compiler-grover-query-advantage"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-accent text-white font-semibold rounded hover:bg-accent-hover transition-colors shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Read Research Note</span>
                  </Link>
                  <Link
                    href="/compiler"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-surface-raised border border-border text-text-primary font-semibold rounded hover:border-border-hover transition-colors"
                  >
                    <Cpu className="w-3.5 h-3.5 text-accent" />
                    <span>Compiler Details &amp; Access</span>
                  </Link>
                  <Link
                    href="/evidence"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-surface-subtle border border-border text-text-primary font-semibold rounded hover:border-border-hover transition-colors"
                  >
                    <Database className="w-3.5 h-3.5 text-accent" />
                    <span>Inspect Evidence (Job da1c7rkdedkc73eqs5mg)</span>
                  </Link>
                </div>
              </div>

              {/* Right: Key Result Metric Box */}
              <div className="lg:col-span-5 bg-surface-subtle p-6 rounded-lg border border-border space-y-4 font-mono text-xs">
                <div className="text-[10px] text-text-muted uppercase tracking-widest font-bold border-b border-border pb-2 flex items-center justify-between">
                  <span>AUDITED HARDWARE BENCHMARK</span>
                  <span className="text-[#15803D] font-bold">9 / 9 ADVANTAGE</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Cases with Advantage:</span>
                    <span className="text-[#15803D] font-bold text-sm">9 / 9 (100%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Problem Sizes with Advantage:</span>
                    <span className="text-[#15803D] font-bold text-sm">3 / 3 (N=4, 8, 16)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">N=16 Quantum Q_effective:</span>
                    <span className="text-accent font-bold text-sm">7.144 queries</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">N=16 Classical Expected:</span>
                    <span className="text-text-primary font-bold text-sm">8.5 queries</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">N=16 95% CI Upper Bound:</span>
                    <span className="text-[#15803D] font-bold text-sm">7.360 (&lt; 8.5)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Physical QPU &bull; Total Shots:</span>
                    <span className="text-text-primary font-bold">ibm_marrakesh &bull; 18,432</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border text-[10px] text-text-muted space-y-1">
                  <div>IBM JOB ID: <code className="text-text-primary font-semibold">da1c7rkdedkc73eqs5mg</code></div>
                  <div>RAW EVIDENCE SHA256: <code className="text-text-secondary">8f65edbe...ff2</code></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 3B — FLAGSHIP 2: DYNAMIC BERNSTEIN-VAZIRANI */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scientific-card p-8 sm:p-12 space-y-8 bg-surface-raised border border-border">
            <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#16A34A]/10 text-[#15803D] border border-[#16A34A]/25 text-[11px] font-mono font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>SUPPORTED RESULT &bull; ORACLE QUERY-COMPLEXITY ADVANTAGE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary mt-2">
                  Dynamic Bernstein–Vazirani Single-Shot Advantage
                </h2>
              </div>
              <div className="text-xs font-mono text-text-muted">
                IDENTIFIER: <strong className="text-text-primary">QPSI-EXP-DVBV</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 font-sans text-sm text-text-secondary leading-relaxed">
                <p>
                  Q-Psi demonstrated quantum query-complexity advantage in a Dynamic Bernstein-Vazirani oracle experiment on physical IBM quantum hardware using the audited Pokharel-Lidar-style single-shot methodology.
                </p>
                <p>
                  Across qubit registers \(n \in [4, 16]\), single-shot sampling measured a quantum scaling exponent of <strong>&alpha;<sub>Q</sub> = 0.1532 &plusmn; 0.0177</strong> compared against the optimal classical oracle query complexity of <strong>&alpha;<sub>C</sub> = 0.6963</strong> (\(t = -30.65, p = 3.47 \times 10^{-7}\)).
                </p>

                {/* Evidence Pipeline Integration */}
                <div className="pt-2">
                  <EvidenceLine status="SUPPORTED" claimLabel="QUANTUM QUERY ADVANTAGE SUPPORTED" />
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-sans">
                  <Link
                    href="/papers"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-accent text-white font-semibold rounded hover:bg-accent-hover transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Read Manuscript Outline</span>
                  </Link>
                  <Link
                    href="/evidence"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-surface-subtle border border-border text-text-primary font-semibold rounded hover:border-border-hover transition-colors"
                  >
                    <Database className="w-3.5 h-3.5 text-accent" />
                    <span>Inspect Evidence (Job da1a03mg52gs73clcj80)</span>
                  </Link>
                </div>
              </div>

              {/* Right: Key Result Metric Box */}
              <div className="lg:col-span-5 bg-surface-subtle p-6 rounded-lg border border-border space-y-4 font-mono text-xs">
                <div className="text-[10px] text-text-muted uppercase tracking-widest font-bold border-b border-border pb-2">
                  AUDITED NUMERICAL RESULTS
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Quantum Exponent (&alpha;<sub>Q</sub>):</span>
                    <span className="text-accent font-bold text-sm">0.1532 &plusmn; 0.0177</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Classical Exponent (&alpha;<sub>C</sub>):</span>
                    <span className="text-text-primary font-bold text-sm">0.6963</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">T-Statistic:</span>
                    <span className="text-[#15803D] font-bold text-sm">t = -30.65</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">P-Value:</span>
                    <span className="text-[#15803D] font-bold text-sm">p = 3.47 &times; 10<sup>-7</sup></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Physical QPU Shots:</span>
                    <span className="text-text-primary font-bold">28,672 shots</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border text-[10px] text-text-muted">
                  SHA256: <code className="text-text-secondary">72e87738...ba</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 4 — RESEARCH INTEGRITY CALLOUT             */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 bg-surface-raised border-l-4 border-accent rounded-r-lg border-y border-r border-border space-y-2">
            <div className="flex items-center space-x-2 text-accent font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>RESEARCH INTEGRITY COMMITMENT</span>
            </div>
            <p className="text-sm font-sans text-text-primary font-medium leading-relaxed">
              &ldquo;Q-Psi does not promote a quantum-advantage claim until its experiment, evidence and claim boundary have been independently audited.&rdquo;
            </p>
            <p className="text-xs font-sans text-text-secondary leading-relaxed">
              All physical hardware executions are preserved with raw shot bitstrings, IBM Quantum runtime job IDs, and immutable SHA256 checksums prior to publication.
            </p>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 5 — COMPILER PIPELINE OVERVIEW            */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="scientific-card p-8 sm:p-12 space-y-8 bg-surface-raised border border-border">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                MATHEMATICAL COMPILATION &bull; SYSTEM ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">
                Q-Psi State-Space Compiler Architecture
              </h2>
              <p className="text-sm sm:text-base text-text-secondary font-sans leading-relaxed">
                Translating multi-repository software-repair search spaces into discrete Hamiltonians and query-bounded quantum circuits for superconducting hardware.
              </p>
            </div>

            {/* Horizontal Pipeline Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 pt-2 font-mono">
              <div className="p-4 bg-surface-subtle border border-border rounded">
                <div className="text-[10px] font-bold text-accent">STEP 1</div>
                <div className="text-xs font-bold text-text-primary mt-1">Software Problem</div>
                <div className="text-[10px] text-text-secondary mt-1">Authentic bug repair corpus</div>
              </div>
              <div className="p-4 bg-surface-subtle border border-border rounded">
                <div className="text-[10px] font-bold text-accent">STEP 2</div>
                <div className="text-xs font-bold text-text-primary mt-1">Candidate Space</div>
                <div className="text-[10px] text-text-secondary mt-1">Compiler-derived subspace</div>
              </div>
              <div className="p-4 bg-surface-subtle border border-border rounded">
                <div className="text-[10px] font-bold text-accent">STEP 3</div>
                <div className="text-xs font-bold text-text-primary mt-1">Opaque Interface</div>
                <div className="text-[10px] text-text-secondary mt-1">Black-box verifier contract</div>
              </div>
              <div className="p-4 bg-surface-subtle border border-border rounded">
                <div className="text-[10px] font-bold text-accent">STEP 4</div>
                <div className="text-xs font-bold text-text-primary mt-1">Quantum Circuit</div>
                <div className="text-[10px] text-text-secondary mt-1">Grover / QAOA synthesis</div>
              </div>
              <div className="p-4 bg-surface-subtle border border-border rounded">
                <div className="text-[10px] font-bold text-accent">STEP 5</div>
                <div className="text-xs font-bold text-text-primary mt-1">Physical QPU</div>
                <div className="text-[10px] text-text-secondary mt-1">ibm_marrakesh execution</div>
              </div>
              <div className="p-4 bg-surface-subtle border border-border rounded">
                <div className="text-[10px] font-bold text-accent">STEP 6</div>
                <div className="text-xs font-bold text-text-primary mt-1">Independent Audit</div>
                <div className="text-[10px] text-text-secondary mt-1">Claim boundary freeze</div>
              </div>
            </div>

            {/* Status Callout Strip */}
            <div className="p-4 bg-surface-subtle border border-border rounded flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono gap-3">
              <div>
                <span className="text-text-muted">COMPILER QUERY ADVANTAGE: </span>
                <strong className="text-[#15803D]">SUPPORTED (9/9 Cases &bull; Job da1c7rkdedkc73eqs5mg)</strong>
              </div>
              <div>
                <span className="text-text-muted">GENERAL COMPILER RUNTIME ADVANTAGE: </span>
                <strong className="text-text-muted">NOT ESTABLISHED</strong>
              </div>
            </div>
          </div>

          {/* Interactive Hardware Benchmark Visualizer */}
          <InteractiveEnergyGapChart />
        </section>

        {/* ================================================== */}
        {/* SECTION 6 — PUBLICATION-STYLE EXPERIMENT RECORDS  */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-wrap items-end justify-between border-b border-border pb-4 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                RESEARCH CAMPAIGN ABSTRACTS
              </span>
              <h2 className="text-3xl font-serif font-bold text-text-primary mt-1">
                Physical QPU Experiments
              </h2>
            </div>
            <Link
              href="/experiments"
              className="text-xs font-sans font-semibold text-accent hover:underline flex items-center space-x-1"
            >
              <span>View All Experiments</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteConfig.experiments.map((exp) => {
              return (
                <div
                  key={exp.code}
                  className="scientific-card p-6 sm:p-8 space-y-5 flex flex-col justify-between bg-surface-raised border border-border"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <span className="text-xs font-mono font-bold text-accent">
                        {exp.code}
                      </span>
                      <span className="text-xs font-mono text-text-muted">
                        {exp.qubits}
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-text-primary">
                      {exp.title}
                    </h3>
                    <div className="text-xs font-mono text-text-secondary font-semibold">
                      {exp.subtitle}
                    </div>

                    <p className="text-xs text-text-secondary leading-relaxed font-sans pt-1">
                      {exp.summary}
                    </p>

                    {/* Integrated Signature Evidence Line */}
                    <div className="pt-2">
                      <EvidenceLine
                        status={exp.status as any}
                        claimLabel={exp.advantageBadge}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between text-[11px] font-mono text-text-muted">
                    <div>
                      BACKEND: <span className="text-text-primary font-semibold">{exp.backend.split(' ')[0]}</span>
                    </div>
                    <div>
                      SHOTS: <span className="text-text-primary font-semibold">{exp.shots.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 7 — MANUSCRIPTS & RESEARCH NOTES          */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-wrap items-end justify-between border-b border-border pb-4 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                PUBLICATIONS &amp; WORKING PAPERS
              </span>
              <h2 className="text-3xl font-serif font-bold text-text-primary mt-1">
                Manuscripts &amp; Research Notes
              </h2>
            </div>
            <Link
              href="/papers"
              className="text-xs font-sans font-semibold text-accent hover:underline flex items-center space-x-1"
            >
              <span>View All Manuscripts</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.papers.map((paper) => (
              <div
                key={paper.id}
                className="scientific-card p-6 space-y-4 flex flex-col justify-between bg-surface-raised border border-border"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-[10px] font-mono text-text-muted uppercase font-bold">MANUSCRIPT</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-surface-subtle border border-border rounded text-text-primary">
                      {paper.status}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-text-primary leading-snug">
                    {paper.title}
                  </h3>

                  <p className="text-xs text-text-secondary leading-relaxed font-sans line-clamp-3">
                    {paper.abstract}
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span className="truncate">{paper.authors[0]}</span>
                  <Link href={paper.link} className="text-accent font-bold hover:underline shrink-0">
                    READ &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Scientific Blog Report Banner */}
          <div className="scientific-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-surface-raised border border-border">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest">
                SCIENTIFIC REPORT &bull; LATEST BLOG PUBLICATION
              </span>
              <h3 className="text-2xl font-serif font-bold text-text-primary">
                Q-Psi Compiler Reaches Its First Quantum-Advantage Milestone
              </h3>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                Nine compiler-derived search cases, three problem sizes, one frozen physical-QPU experiment on ibm_marrakesh, and an independent audit.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent text-white hover:bg-accent-hover font-sans text-xs font-semibold rounded transition-colors shrink-0 shadow-xs"
            >
              <span>Read Full Report</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 8 — DEEP-INK EVIDENCE ROOM (20% DARK SECTION) */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#101522] text-[#F0F4F8] border border-[#273248] rounded-xl p-8 sm:p-12 space-y-8">
            <div className="flex flex-wrap items-center justify-between border-b border-[#273248] pb-6 gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                  <Database className="w-3.5 h-3.5 text-[#00AFC7]" />
                  <span>PUBLIC EVIDENCE ROOM &bull; OPEN REPRODUCIBILITY</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-white mt-2">
                  Cryptographic Evidence &amp; IBM Quantum Execution Logs
                </h2>
              </div>
              <Link
                href="/evidence"
                className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#00AFC7] hover:underline font-semibold"
              >
                <span>OPEN VERIFIED EVIDENCE INDEX</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Evidence Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#182033] border border-[#273248] rounded space-y-2">
                <div className="text-[10px] text-[#94A3B8]">IBM JOB ID (COMPILER GROVER)</div>
                <div className="text-white font-bold text-sm truncate">da1c7rkdedkc73eqs5mg</div>
                <div className="text-[10px] text-[#94A3B8]">18,432 shots &bull; ibm_marrakesh</div>
              </div>

              <div className="p-4 bg-[#182033] border border-[#273248] rounded space-y-2">
                <div className="text-[10px] text-[#94A3B8]">IBM JOB ID (BV)</div>
                <div className="text-white font-bold text-sm truncate">da1a03mg52gs73clcj80</div>
                <div className="text-[10px] text-[#94A3B8]">28,672 shots &bull; ibm_marrakesh</div>
              </div>

              <div className="p-4 bg-[#182033] border border-[#273248] rounded space-y-2">
                <div className="text-[10px] text-[#94A3B8]">IBM JOB ID (SIMON)</div>
                <div className="text-white font-bold text-sm truncate">da1a0piein7c73bd5beg</div>
                <div className="text-[10px] text-[#94A3B8]">24,576 shots &bull; ibm_marrakesh</div>
              </div>

              <div className="p-4 bg-[#182033] border border-[#273248] rounded space-y-2">
                <div className="text-[10px] text-[#94A3B8]">IBM JOB ID (MANTRA)</div>
                <div className="text-white font-bold text-sm truncate">da19q86g52gs73clcd7g</div>
                <div className="text-[10px] text-[#94A3B8]">8,192 shots &bull; ibm_marrakesh</div>
              </div>
            </div>

            <div className="p-4 bg-[#161D2E] border border-[#273248] rounded text-xs font-mono space-y-1 text-[#94A3B8]">
              <div>PUBLIC EVIDENCE POLICY: IBM job IDs, cryptographic evidence hashes, audited metrics and claim boundaries are published for independent verification.</div>
              <div>COMPILER GROVER RAW EVIDENCE SHA256: <span className="text-white">8f65edbe0cea3ffdc16f3ff89b07beaf6ab111019a556c1cde56b274c0e18ff2</span></div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 9 — INSTITUTIONAL RESEARCH FUND SUPPORT    */}
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
                  <span className="text-text-muted font-semibold uppercase">CURRENT MILESTONE ACHIEVED</span>
                  <span className="text-[#15803D] font-bold">Compiler-Enabled Query Advantage &bull; Physical QPU Audit PASS</span>
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
                    Support Independent Research
                  </h3>
                  <p className="text-xs text-text-secondary font-sans">
                    Contributions fund physical-QPU compute hours, evidence archiving, and open-access publication.
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

        {/* ================================================== */}
        {/* SECTION 10 — GOVERNANCE & SCIENTIFIC INTEGRITY     */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div className="md:col-span-6 scientific-card p-6 sm:p-8 space-y-4 bg-surface-raised border border-border">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                PARENT INITIATIVE &amp; GOVERNANCE
              </div>
              <h3 className="text-2xl font-serif font-bold text-text-primary">
                Independent Quantum Research
              </h3>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                Q-Psi operates as an independent quantum research initiative under <strong>The Oneness Project</strong>. Sibling initiative <strong>SattvaOS</strong> focuses on governed artificial intelligence and is separate from Q-Psi quantum research.
              </p>
              <div className="pt-2 font-mono text-xs text-text-muted space-y-1">
                <div>AUTHORITATIVE CONTACT: <a href={`mailto:${siteConfig.contact.email}`} className="text-accent font-semibold hover:underline">{siteConfig.contact.email}</a></div>
              </div>
            </div>

            <div className="md:col-span-6 scientific-card p-6 sm:p-8 space-y-4 bg-surface-raised border border-border">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                SCIENTIFIC INTEGRITY COMMITMENT
              </div>
              <ul className="space-y-2.5 text-xs font-sans text-text-secondary">
                <li className="flex items-start space-x-2">
                  <span className="text-accent font-bold">&bull;</span>
                  <span><strong>Zero Fabricated Claims:</strong> We never claim quantum advantage where data is inconclusive or unsupported.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent font-bold">&bull;</span>
                  <span><strong>Public Evidence:</strong> IBM job IDs, cryptographic evidence hashes, audited metrics and claim boundaries are published for independent verification.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent font-bold">&bull;</span>
                  <span><strong>Publication of Negative Results:</strong> Failed or noisy hardware runs are published with full transparency.</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="text-xs font-sans font-semibold text-accent hover:underline flex items-center space-x-1"
                >
                  <span>Read About Q-Psi Integrity Policy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
