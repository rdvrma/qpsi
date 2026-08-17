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
  ShieldAlert,
  Layers,
  Cpu,
  Lock,
} from 'lucide-react';

export default function HomePage() {
  const founderFundedUsd = siteConfig.funding.founderFundedUsd;
  const goalUsd = siteConfig.funding.publicGoalUsd;
  const percentage = Math.min(100, (founderFundedUsd / goalUsd) * 100);

  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 space-y-20">
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
                Physical-QPU experiments, compiler research and reproducible evidence. We publish supported, failed and inconclusive results.
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
                  href="/evidence"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-surface-raised border border-border hover:border-border-hover text-text-primary font-semibold text-xs rounded transition-colors"
                >
                  <Database className="w-3.5 h-3.5 text-accent" />
                  <span>View Evidence</span>
                </Link>

                <a
                  href={siteConfig.funding.payPalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 text-text-secondary hover:text-accent font-semibold text-xs transition-colors"
                >
                  <span>Support Q-Psi</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Institutional Provenance */}
              <div className="pt-4 border-t border-border flex items-center space-x-4 text-xs font-sans text-text-muted">
                <span>Parent Initiative: <strong className="text-text-primary font-medium">{siteConfig.company.parentCompany}</strong></span>
                <span>&bull;</span>
                <span>Hardware: <strong className="text-text-primary font-medium">ibm_marrakesh (156Q)</strong></span>
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
                  77,824
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
                  4
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                  HARDWARE CAMPAIGNS
                </div>
                <div className="text-[11px] text-text-secondary font-sans">
                  BV &bull; Compiler &bull; Simon &bull; Mantra
                </div>
              </div>

              <div className="space-y-1 sm:px-4 pt-4 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#15803D]">
                  SUPPORTED
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                  DYNAMIC BV QUERY ADVANTAGE
                </div>
                <div className="text-[11px] text-text-secondary font-sans">
                  &alpha;<sub>Q</sub> = 0.1532 vs &alpha;<sub>C</sub> = 0.6963 (p &lt; 10<sup>-6</sup>)
                </div>
              </div>

              <div className="space-y-1 sm:px-4 pt-4 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-text-muted">
                  PENDING
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                  COMPILER ADVANTAGE VALIDATION
                </div>
                <div className="text-[11px] text-text-secondary font-sans">
                  QPU Interoperability: PASS (N &le; 10)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 3 — FLAGSHIP SCIENTIFIC RESULT (DYNAMIC BV) */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scientific-card p-8 sm:p-12 space-y-8 bg-surface-raised border border-border">
            <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#16A34A]/10 text-[#15803D] border border-[#16A34A]/25 text-[11px] font-mono font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>SUPPORTED RESULT &bull; QUANTUM QUERY ADVANTAGE</span>
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
                  <EvidenceLine status="SUPPORTED" claimLabel="QUANTUM ADVANTAGE SUPPORTED" />
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
        {/* SECTION 4 — COMPILER RESEARCH PIPELINE            */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="scientific-card p-8 sm:p-12 space-y-8 bg-surface-raised border border-border">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                ACTIVE RESEARCH &bull; COMPILER ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">
                Q-Psi State-Space Compiler
              </h2>
              <p className="text-sm sm:text-base text-text-secondary font-sans leading-relaxed">
                The Q-Psi compiler maps multi-repository software-repair search spaces to binary quadratic Hamiltonians for physical execution on superconducting quantum processors.
              </p>
            </div>

            {/* Horizontal Pipeline Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 font-mono">
              <div className="p-4 bg-surface-subtle border border-border rounded">
                <div className="text-[10px] font-bold text-accent">STAGE 1</div>
                <div className="text-xs font-bold text-text-primary mt-1">Repository State Space</div>
                <div className="text-[10px] text-text-secondary mt-1">Multi-file dependency universe</div>
              </div>
              <div className="p-4 bg-surface-subtle border border-border rounded">
                <div className="text-[10px] font-bold text-accent">STAGE 2</div>
                <div className="text-xs font-bold text-text-primary mt-1">Candidate Compilation</div>
                <div className="text-[10px] text-text-secondary mt-1">Constraint graph filtering</div>
              </div>
              <div className="p-4 bg-surface-subtle border border-border rounded">
                <div className="text-[10px] font-bold text-accent">STAGE 3</div>
                <div className="text-xs font-bold text-text-primary mt-1">QUBO / Ising</div>
                <div className="text-[10px] text-text-secondary mt-1">x_i = (1 - Z_i)/2 mapping</div>
              </div>
              <div className="p-4 bg-surface-subtle border border-border rounded">
                <div className="text-[10px] font-bold text-accent">STAGE 4</div>
                <div className="text-xs font-bold text-text-primary mt-1">Physical QPU</div>
                <div className="text-[10px] text-text-secondary mt-1">QAOA p=1 on 156Q Heron</div>
              </div>
              <div className="p-4 bg-surface-subtle border border-border rounded">
                <div className="text-[10px] font-bold text-accent">STAGE 5</div>
                <div className="text-xs font-bold text-text-primary mt-1">Audited Result</div>
                <div className="text-[10px] text-text-secondary mt-1">Job ID &amp; SHA256 record</div>
              </div>
            </div>

            {/* Status Callout Strip */}
            <div className="p-4 bg-surface-subtle border border-border rounded flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono gap-3">
              <div>
                <span className="text-text-muted">HARDWARE INTEROPERABILITY STATUS: </span>
                <strong className="text-[#15803D]">PHYSICAL-QPU INTEROPERABILITY — PASS (N &le; 10)</strong>
              </div>
              <div>
                <span className="text-text-muted">COMPILER ADVANTAGE: </span>
                <strong className="text-text-muted">NOT YET ESTABLISHED</strong>
              </div>
            </div>
          </div>

          {/* Interactive Hardware Benchmark Visualizer */}
          <InteractiveEnergyGapChart />
        </section>

        {/* ================================================== */}
        {/* SECTION 5 — PUBLICATION-STYLE EXPERIMENT RECORDS  */}
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
        {/* SECTION 6 — MANUSCRIPTS & RESEARCH NOTES          */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                  <h3 className="text-lg font-serif font-bold text-text-primary leading-snug">
                    {paper.title}
                  </h3>

                  <p className="text-xs text-text-secondary leading-relaxed font-sans line-clamp-3">
                    {paper.abstract}
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>{paper.authors.join(', ')}</span>
                  <Link href="/papers" className="text-accent font-bold hover:underline">
                    READ OUTLINE &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Scientific Blog Report Banner */}
          <div className="scientific-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-surface-raised border border-border">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest">
                SCIENTIFIC REPORT SUMMARY
              </span>
              <h3 className="text-2xl font-serif font-bold text-text-primary">
                From Software-Repair Compilation to Physical-QPU Quantum Advantage
              </h3>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                Full experimental summary detailing what Q-Psi tested across 4 hardware campaigns, what worked, what failed, and exact physical measurements on IBM Quantum.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent text-white hover:bg-accent-hover font-sans text-xs font-semibold rounded transition-colors shrink-0 shadow-xs"
            >
              <span>View Research Report Overview</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 7 — DEEP-INK EVIDENCE ROOM (20% DARK SECTION) */}
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
                <div className="text-[10px] text-[#94A3B8]">IBM JOB ID (BV)</div>
                <div className="text-white font-bold text-sm truncate">da1a03mg52gs73clcj80</div>
                <div className="text-[10px] text-[#94A3B8]">28,672 shots &bull; ibm_marrakesh</div>
              </div>

              <div className="p-4 bg-[#182033] border border-[#273248] rounded space-y-2">
                <div className="text-[10px] text-[#94A3B8]">IBM JOB ID (COMPILER)</div>
                <div className="text-white font-bold text-sm truncate">da16h8ug52gs73cl8uog</div>
                <div className="text-[10px] text-[#94A3B8]">16,384 shots &bull; ibm_marrakesh</div>
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
              <div>RAW EVIDENCE INTEGRITY HASH (BV): <span className="text-white">72e8773865cdcbba302f24ae2bfc136c3a0cf4878a2493db0828a104508fa1ba</span></div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 8 — INSTITUTIONAL RESEARCH FUND SUPPORT    */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scientific-card p-8 sm:p-12 space-y-8 bg-surface-raised border border-border">
            <div className="flex flex-wrap items-center justify-between border-b border-border pb-6 gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                  INSTITUTIONAL RESEARCH SUPPORT
                </span>
                <h2 className="text-3xl font-serif font-bold text-text-primary mt-1">
                  {siteConfig.funding.displayTitle}
                </h2>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-text-muted">PUBLIC RESEARCH GOAL</div>
                <div className="text-2xl font-serif font-bold text-text-primary">
                  {siteConfig.funding.displayGoalText}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4 font-sans text-sm text-text-secondary leading-relaxed">
                <p>
                  {siteConfig.funding.description}
                </p>

                {/* Founder-Funded Disclosure Progress Bar */}
                <div className="p-4 bg-surface-subtle border border-border rounded space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-text-muted uppercase font-semibold">
                      {siteConfig.funding.founderFundedLabel}
                    </span>
                    <span className="text-text-primary font-bold">
                      {siteConfig.funding.founderFundedValueText} / ${goalUsd.toLocaleString()} ({percentage.toFixed(1)}%)
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
        {/* SECTION 9 — GOVERNANCE & SCIENTIFIC INTEGRITY     */}
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
