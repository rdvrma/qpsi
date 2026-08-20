import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { EvidenceLine } from '@/components/ui/EvidenceLine';
import { ArrowUpRight, FileText, Database, ShieldCheck, Cpu, Sparkles, AlertCircle, XCircle } from 'lucide-react';

export const metadata = {
  title: 'Research Programs — Q-Psi Independent Quantum Research',
  description:
    'Overview of Q-Psi research programs: State-Space Compiler, Grover candidate search advantage, Dynamic Bernstein-Vazirani, MCM qubit reuse, Quantum Data Foundry, and MQT Bench comparisons.',
};

export default function ResearchPage() {
  const tierA = siteConfig.experiments.filter((e) => e.tier === 'TIER_A');
  const tierB = siteConfig.experiments.filter((e) => e.tier === 'TIER_B');
  const tierC = siteConfig.experiments.filter((e) => e.tier === 'TIER_C');

  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              RESEARCH OVERVIEW &bull; FROZEN EVIDENCE STATE
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Quantum Computing Research Programs
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            Q-Psi conducts open-science quantum compiler research, physical-QPU algorithm evaluation, and reproducible benchmark studies on real superconducting hardware (IBM Heron r2, 156 programmable qubits).
          </p>

          <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs text-text-muted">
            <div>TOTAL SHOTS: <strong className="text-text-primary">601,704</strong></div>
            <div>&bull;</div>
            <div>AUDITED FAMILIES: <strong className="text-text-primary">15</strong></div>
            <div>&bull;</div>
            <div>PRODUCTION JOBS: <strong className="text-text-primary">19</strong></div>
            <div>&bull;</div>
            <div>RUNTIME: <strong className="text-text-primary">288.38s</strong></div>
          </div>
        </div>

        {/* ================================================== */}
        {/* SECTION 1 — TIER A: LEAD RESEARCH                   */}
        {/* ================================================== */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TIER A &bull; LEAD RESEARCH PROGRAMS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
                Primary Physical-QPU Evidence
              </h2>
            </div>
            <span className="text-xs font-mono text-text-muted">5 AUDITED PROGRAMS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tierA.map((exp) => (
              <div
                key={exp.id}
                className="scientific-card p-8 space-y-5 bg-surface-raised border border-border flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-xs font-mono font-bold text-accent">{exp.code}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        exp.status === 'SUPPORTED'
                          ? 'bg-[#16A34A]/10 text-[#15803D] border-[#16A34A]/25'
                          : exp.status === 'SUPPORTED_WITH_QUALIFICATION'
                          ? 'bg-[#D97706]/10 text-[#B45309] border-[#D97706]/25'
                          : 'bg-[#64748B]/10 text-text-secondary border-[#64748B]/25'
                      }`}
                    >
                      {exp.statusLabel}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-text-primary">
                    {exp.title}
                  </h3>
                  <div className="text-xs font-mono text-text-secondary font-semibold">
                    {exp.subtitle}
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed font-sans pt-1">
                    {exp.primaryResult}
                  </p>

                  <div className="p-3 bg-surface-subtle border border-border rounded font-mono text-[11px] space-y-1 text-text-muted">
                    <div>BACKEND: <span className="text-text-primary font-semibold">{exp.backend}</span></div>
                    <div>SHOTS: <span className="text-text-primary font-semibold">{exp.shots.toLocaleString()}</span> ({exp.quantumSeconds}s runtime)</div>
                    <div>REGISTER: <span className="text-text-primary">{exp.qubits}</span></div>
                  </div>

                  <div className="text-[11px] font-sans text-text-muted italic">
                    <strong>Qualification:</strong> {exp.qualification}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  {exp.researchNoteUrl && (
                    <Link
                      href={exp.researchNoteUrl}
                      className="text-xs font-sans font-semibold text-accent hover:underline flex items-center space-x-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Read Formal Research Note</span>
                    </Link>
                  )}
                  <Link
                    href="/evidence"
                    className="text-xs font-sans text-text-muted hover:text-text-primary flex items-center space-x-1"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Evidence &rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 2 — TIER B: SECONDARY TECHNICAL            */}
        {/* ================================================== */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">
                TIER B &bull; SECONDARY TECHNICAL CONTRIBUTIONS
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
                Hardware-Aware Compiler Studies &amp; Baselines
              </h2>
            </div>
            <span className="text-xs font-mono text-text-muted">3 AUDITED STUDIES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tierB.map((exp) => (
              <div
                key={exp.id}
                className="scientific-card p-6 space-y-4 bg-surface-raised border border-border flex flex-col justify-between rounded"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between font-mono text-xs border-b border-border pb-2">
                    <span className="font-bold text-accent">{exp.code}</span>
                    <span className="text-[10px] font-bold text-[#D97706]">{exp.statusLabel}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-text-primary">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans">
                    {exp.primaryResult}
                  </p>
                  <div className="text-[11px] font-sans text-text-muted">
                    <strong>Qualification:</strong> {exp.qualification}
                  </div>
                </div>
                <div className="pt-3 border-t border-border flex items-center justify-between font-mono text-[11px]">
                  <span className="text-text-muted">{exp.shots.toLocaleString()} shots</span>
                  {exp.researchNoteUrl && (
                    <Link href={exp.researchNoteUrl} className="text-accent font-semibold hover:underline">
                      Note &rarr;
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 3 — TIER C: NEGATIVE & BOUNDARY RESULTS    */}
        {/* ================================================== */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#DC2626] flex items-center space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>TIER C &bull; NEGATIVE, MIXED &amp; BOUNDARY RESULTS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
                Preserving Negative &amp; Inconclusive Evidence
              </h2>
            </div>
            <span className="text-xs font-mono text-text-muted">7 STUDIES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tierC.map((exp) => (
              <div
                key={exp.id}
                className="scientific-card p-6 space-y-4 bg-surface-raised border border-border flex flex-col justify-between rounded"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between font-mono text-xs border-b border-border pb-2">
                    <span className="font-bold text-text-primary">{exp.code}</span>
                    <span
                      className={`text-[10px] font-bold ${
                        exp.status === 'NOT_SUPPORTED'
                          ? 'text-[#DC2626]'
                          : exp.status === 'INCOMPLETE_NOT_FROZEN'
                          ? 'text-text-muted'
                          : 'text-[#64748B]'
                      }`}
                    >
                      {exp.statusLabel}
                    </span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-text-primary">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans">
                    {exp.primaryResult}
                  </p>
                  <div className="text-[11px] font-sans text-text-muted">
                    <strong>Qualification:</strong> {exp.qualification}
                  </div>
                </div>
                <div className="pt-3 border-t border-border flex items-center justify-between font-mono text-[11px]">
                  <span className="text-text-muted">{exp.shots > 0 ? `${exp.shots.toLocaleString()} shots` : 'Protocol Only'}</span>
                  {exp.researchNoteUrl && (
                    <Link href={exp.researchNoteUrl} className="text-accent font-semibold hover:underline">
                      Note &rarr;
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 4 — METHODOLOGY & AUDIT CALLOUT            */}
        {/* ================================================== */}
        <section className="scientific-card p-8 bg-surface-raised border border-border rounded-lg space-y-4">
          <div className="flex items-center space-x-2 text-accent font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>RESEARCH METHODOLOGY &amp; SCIENTIFIC FREEZE</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-text-primary">
            Strict Pre-Registration &amp; Deterministic Reproducibility
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary font-sans leading-relaxed">
            All 14 completed physical campaigns were executed under strict pre-QPU protocol freezes, zero post-hoc parameter adjustments, and SHA-256 evidence hashing. 14/14 automated audit scripts reproduce all reported numbers with zero discrepancies.
          </p>
          <div className="pt-2 flex items-center space-x-4">
            <Link
              href="/methodology"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover transition-colors shadow-xs"
            >
              <span>Explore Research Methodology</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/evidence"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-surface-subtle border border-border text-text-primary font-sans text-xs font-semibold rounded hover:border-border-hover transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-accent" />
              <span>Inspect Evidence Registry</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
