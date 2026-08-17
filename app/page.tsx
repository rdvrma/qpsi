import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { SpatialHeroVisual } from '@/components/ui/SpatialHeroVisual';
import { siteConfig } from '@/content/siteConfig';
import { ArrowUpRight, CheckCircle2, AlertCircle, HelpCircle, FileText, FlaskConical, Cpu, Layers } from 'lucide-react';

export const metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
};

export default function HomePage() {
  const goalUsd = siteConfig.funding.publicGoalUsd;
  const founderFundedUsd = siteConfig.funding.founderFundedUsd;
  const percentage = (founderFundedUsd / goalUsd) * 100;

  return (
    <div className="min-h-screen bg-surface text-text-primary selection:bg-accent selection:text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-24 space-y-24 pb-20">
        {/* ================================================== */}
        {/* SECTION 1 — HERO                                  */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 text-center space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              {siteConfig.company.eyebrow}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-text-primary max-w-4xl mx-auto leading-[1.08]">
            We test what quantum hardware can actually do.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-xl text-text-secondary max-w-2xl mx-auto font-sans leading-relaxed">
            Q-Psi conducts physical-QPU experiments, compiler research and reproducible quantum-computing studies. Results are published with their evidence — including failed and inconclusive experiments.
          </p>

          {/* Parent Relationship Line */}
          <div className="text-xs font-mono text-text-muted uppercase tracking-wider">
            A research initiative of <span className="text-text-primary font-semibold">{siteConfig.company.parentCompany}</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/research"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider rounded shadow-xs hover:bg-accent-hover transition-all"
            >
              <span>EXPLORE RESEARCH</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/compiler"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-surface-raised border border-border text-text-primary font-mono text-xs font-semibold uppercase tracking-wider rounded hover:border-border-hover transition-all"
            >
              <span>EXPLORE COMPILER RESEARCH</span>
            </Link>

            <a
              href={siteConfig.funding.payPalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-surface-subtle border border-border text-text-primary font-mono text-xs font-semibold uppercase tracking-wider rounded hover:bg-surface-raised transition-all"
            >
              <span>SUPPORT Q-PSI</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Spatial 3D Hero Visual */}
          <div className="pt-4">
            <SpatialHeroVisual />
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 2 — LIVE RESEARCH RECORD                 */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface-raised border border-border rounded-lg p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                  LIVE EVIDENCE LOG
                </span>
                <h2 className="text-xl font-serif font-bold text-text-primary mt-1">
                  Physical QPU Verification Record
                </h2>
              </div>
              <div className="text-xs font-mono text-text-muted">
                HARDWARE: <span className="text-text-primary font-semibold">{siteConfig.hardwareSummary.backend} ({siteConfig.hardwareSummary.qubitDescription})</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="p-4 bg-surface border border-border rounded space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-text-muted">HARDWARE</span>
                  <span className="inline-flex items-center text-[10px] font-mono font-bold text-status-pass">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> VERIFIED
                  </span>
                </div>
                <div className="text-xs font-mono font-bold text-text-primary">
                  PHYSICAL IBM QPU
                </div>
                <p className="text-[11px] font-mono text-text-secondary">
                  {siteConfig.hardwareSummary.shotsSummary}
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 bg-surface border border-border rounded space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-text-muted">DYNAMIC BV</span>
                  <span className="inline-flex items-center text-[10px] font-mono font-bold text-status-pass">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> SUPPORTED
                  </span>
                </div>
                <div className="text-xs font-mono font-bold text-text-primary">
                  QUANTUM ADVANTAGE — SUPPORTED
                </div>
                <p className="text-[11px] font-mono text-text-secondary">
                  Single-shot oracle query complexity advantage (alpha_Q = 0.1532 vs alpha_C = 0.6963, p &lt; 10⁻⁶).
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-4 bg-surface border border-border rounded space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-text-muted">COMPILER 6F</span>
                  <span className="inline-flex items-center text-[10px] font-mono font-bold text-status-pass">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> PASS (N ≤ 10)
                  </span>
                </div>
                <div className="text-xs font-mono font-bold text-text-primary">
                  INTEROPERABILITY PASS
                </div>
                <p className="text-[11px] font-mono text-text-secondary">
                  End-to-end QUBO/Ising execution. Compiler-specific advantage NOT YET ESTABLISHED.
                </p>
              </div>

              {/* Card 4 */}
              <div className="p-4 bg-surface border border-border rounded space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-text-muted">RESTRICTED SIMON</span>
                  <span className="inline-flex items-center text-[10px] font-mono font-bold text-status-inconclusive">
                    <AlertCircle className="w-3 h-3 mr-1" /> INCONCLUSIVE
                  </span>
                </div>
                <div className="text-xs font-mono font-bold text-text-primary">
                  SPEEDUP INCONCLUSIVE
                </div>
                <p className="text-[11px] font-mono text-text-secondary">
                  Constant-depth 56-qubit circuits valid; universal unmitigated speedup inconclusive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 3 — FEATURED EXPERIMENTS                   */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-wrap items-end justify-between border-b border-border pb-4 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                FEATURED RESEARCH CAMPAIGNS
              </span>
              <h2 className="text-3xl font-serif font-bold text-text-primary mt-1">
                Physical Hardware Experiments
              </h2>
            </div>
            <Link
              href="/experiments"
              className="text-xs font-mono font-bold text-accent hover:underline flex items-center space-x-1"
            >
              <span>VIEW ALL EXPERIMENTS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteConfig.experiments.map((exp) => {
              const isPass = exp.status === 'SUPPORTED';
              const isInconclusive = exp.status === 'INCONCLUSIVE';
              const isExploratory = exp.status === 'EXPLORATORY';

              return (
                <div
                  key={exp.code}
                  className="bg-surface-raised border border-border p-6 rounded-lg space-y-4 hover:border-border-hover transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between border-b border-border pb-3 gap-2">
                      <span className="text-xs font-mono font-bold text-accent">
                        {exp.code}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                          isPass
                            ? 'bg-status-pass-bg text-status-pass'
                            : isInconclusive
                            ? 'bg-status-inconclusive-bg text-status-inconclusive'
                            : isExploratory
                            ? 'bg-status-exploratory-bg text-status-exploratory'
                            : 'bg-status-fail-bg text-status-fail'
                        }`}
                      >
                        {exp.advantageBadge}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-text-primary">
                      {exp.title}
                    </h3>
                    <div className="text-xs font-mono text-text-secondary font-semibold">
                      {exp.subtitle}
                    </div>

                    <p className="text-xs text-text-secondary leading-relaxed font-sans">
                      {exp.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between text-[11px] font-mono text-text-muted">
                    <div>
                      BACKEND: <span className="text-text-primary font-semibold">{exp.backend}</span>
                    </div>
                    <div>
                      SHOTS: <span className="text-text-primary">{exp.shots.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 4 — Q-PSI COMPILER                        */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface-raised border border-border rounded-lg p-8 sm:p-12 space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                STATE-SPACE COMPILER RESEARCH
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">
                Compiling Search Universes to Physical Quantum Processing Units
              </h2>
              <p className="text-sm sm:text-base text-text-secondary font-sans leading-relaxed">
                The Q-Psi State-Space Compiler transforms discrete software-repair interaction graphs into binary quadratic Hamiltonians suitable for execution on superconducting quantum hardware.
              </p>
            </div>

            {/* Pipeline Step Display */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
              <div className="p-3.5 bg-surface border border-border rounded">
                <div className="text-[10px] font-mono text-accent font-bold">STAGE 1</div>
                <div className="text-xs font-mono font-bold text-text-primary mt-1">Raw Search Space</div>
                <div className="text-[10px] font-mono text-text-secondary mt-1">Multi-repository files</div>
              </div>
              <div className="p-3.5 bg-surface border border-border rounded">
                <div className="text-[10px] font-mono text-accent font-bold">STAGE 2</div>
                <div className="text-xs font-mono font-bold text-text-primary mt-1">Candidate State</div>
                <div className="text-[10px] font-mono text-text-secondary mt-1">Interaction graph</div>
              </div>
              <div className="p-3.5 bg-surface border border-border rounded">
                <div className="text-[10px] font-mono text-accent font-bold">STAGE 3</div>
                <div className="text-xs font-mono font-bold text-text-primary mt-1">Ising Mapping</div>
                <div className="text-[10px] font-mono text-text-secondary mt-1">x_i = (1 - Z_i)/2</div>
              </div>
              <div className="p-3.5 bg-surface border border-border rounded">
                <div className="text-[10px] font-mono text-accent font-bold">STAGE 4</div>
                <div className="text-xs font-mono font-bold text-text-primary mt-1">Physical QPU</div>
                <div className="text-[10px] font-mono text-text-secondary mt-1">QAOA p=1 on 156Q</div>
              </div>
              <div className="p-3.5 bg-surface border border-border rounded">
                <div className="text-[10px] font-mono text-accent font-bold">STAGE 5</div>
                <div className="text-xs font-mono font-bold text-text-primary mt-1">Evidence Audit</div>
                <div className="text-[10px] font-mono text-text-secondary mt-1">SHA256 &amp; Job ID</div>
              </div>
            </div>

            {/* Approved Metrics & Boundary Note */}
            <div className="p-4 bg-surface border border-border rounded text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-text-primary font-bold">
                <span>AUDITED NISQ BOUNDARY RESULT (STAGE-6F)</span>
                <span className="text-status-pass">INTEROPERABILITY PASS</span>
              </div>
              <p className="text-text-secondary leading-relaxed font-sans text-xs">
                Physical QPU recovered exact classical ground state on 100% of small instances (N &le; 10). On larger instances (N &ge; 18), gate-depth noise degraded quality. Standard median energy gap: 0.1250. <strong>Compiler-specific quantum advantage is NOT YET ESTABLISHED over classical solvers.</strong>
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/compiler"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-accent-hover transition-all"
              >
                <span>EXPLORE COMPILER RESEARCH</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 5 — PAPERS + RESEARCH NOTES               */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-wrap items-end justify-between border-b border-border pb-4 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                PUBLICATIONS &amp; PREPRINTS
              </span>
              <h2 className="text-3xl font-serif font-bold text-text-primary mt-1">
                Papers &amp; Scientific Research Notes
              </h2>
            </div>
            <Link
              href="/papers"
              className="text-xs font-mono font-bold text-accent hover:underline flex items-center space-x-1"
            >
              <span>VIEW ALL PAPERS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteConfig.papers.map((paper) => (
              <div
                key={paper.id}
                className="bg-surface-raised border border-border p-6 rounded-lg space-y-4 flex flex-col justify-between hover:border-border-hover transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-[10px] font-mono text-text-muted uppercase">MANUSCRIPT</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-surface border border-border rounded text-text-primary">
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
                    READ OUTLINE →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Main Blog Callout Banner */}
          <div className="bg-surface-raised border border-border p-6 sm:p-8 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest">
                FEATURED SCIENTIFIC BLOG DEEP DIVE
              </span>
              <h3 className="text-2xl font-serif font-bold text-text-primary">
                From Software-Repair Compilation to Physical-QPU Quantum Advantage
              </h3>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                Full experimental report detailing what Q-Psi tested across 4 hardware campaigns, what worked, what failed, and exact physical measurements on IBM Quantum.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 px-5 py-3 bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider rounded shadow-xs hover:bg-accent-hover transition-all shrink-0"
            >
              <span>READ FULL REPORT</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 6 — Q-PSI RESEARCH FUND                   */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface-raised border border-border rounded-lg p-8 sm:p-12 space-y-8">
            <div className="flex flex-wrap items-center justify-between border-b border-border pb-6 gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                  SUPPORT OPEN QUANTUM SCIENCE
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
              <div className="md:col-span-7 space-y-4">
                <p className="text-sm text-text-secondary font-sans leading-relaxed">
                  {siteConfig.funding.description}
                </p>

                {/* Truthful Founder Funded Disclosure */}
                <div className="p-4 bg-surface border border-border rounded space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-text-muted uppercase font-semibold">
                      {siteConfig.funding.founderFundedLabel}
                    </span>
                    <span className="text-text-primary font-bold">
                      {siteConfig.funding.founderFundedValueText} / ${goalUsd.toLocaleString()} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-surface-subtle h-2.5 rounded-full overflow-hidden border border-border">
                    <div
                      className="bg-accent h-full rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-text-muted">
                    Founder-funded research to date: $9,850.
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 bg-surface border border-border p-6 rounded-lg space-y-4 text-center">
                <div className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider">
                  VOLUNTARY RESEARCH SUPPORT
                </div>
                <p className="text-xs text-text-secondary font-sans">
                  Support Q-Psi research with any amount. No preset support requirements.
                </p>
                <a
                  href={siteConfig.funding.payPalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 w-full py-3 bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider rounded shadow-xs hover:bg-accent-hover transition-all"
                >
                  <span>SUPPORT THE NEXT EXPERIMENT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <div className="text-[10px] font-mono text-text-muted">
                  Supports open-source quantum software research &amp; physical QPU benchmark publication.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION 7 — ABOUT / PARENT RESEARCH ECOSYSTEM    */}
        {/* ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="border-b border-border pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
              PARENT RESEARCH ECOSYSTEM
            </span>
            <h2 className="text-3xl font-serif font-bold text-text-primary mt-1">
              The Oneness Project
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 space-y-4">
              <p className="text-sm text-text-secondary font-sans leading-relaxed">
                Q-Psi operates as an independent quantum research initiative under <strong>The Oneness Project</strong>. We adhere strictly to open-science integrity: publishing raw evidence, IBM job IDs, physical QPU metrics, and explicit claim boundaries.
              </p>

              <div className="p-4 bg-surface-raised border border-border rounded space-y-3 font-mono text-xs">
                <div className="text-text-primary font-bold uppercase tracking-wider">
                  ORGANIZATIONAL HIERARCHY
                </div>
                <div className="space-y-2 text-text-secondary">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-text-primary" />
                    <span className="font-bold text-text-primary">THE ONENESS PROJECT</span>
                    <span className="text-[10px] text-text-muted">(Mother Initiative)</span>
                  </div>
                  <div className="pl-4 border-l-2 border-border space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="font-bold text-accent">Q-PSI</span>
                      <span className="text-[10px] text-text-muted">(Independent Quantum Research)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                      <span className="font-bold text-text-primary">SATTVAOS</span>
                      <span className="text-[10px] text-text-muted">(Governed Intelligence / AI)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-6 bg-surface-raised border border-border p-6 sm:p-8 rounded-lg space-y-4">
              <div className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
                SCIENTIFIC INTEGRITY COMMITMENT
              </div>
              <ul className="space-y-3 text-xs font-mono text-text-secondary">
                <li className="flex items-start space-x-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Zero Fabricated Claims:</strong> We never claim quantum advantage where data is inconclusive or unsupported.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Open Data:</strong> All IBM job IDs and raw SHA256 hashes are published for independent post-hoc verification.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Publication of Negative Results:</strong> Failed or noisy hardware runs are published with full transparency.</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="text-xs font-mono font-bold text-accent hover:underline flex items-center space-x-1"
                >
                  <span>READ ABOUT Q-PSI INTEGRITY POLICY</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
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
