import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ArrowUpRight, AlertCircle, FileText, Database, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Negative Results Matter: Where Q-Psi Did Not Beat the Baseline — Q-Psi Blog',
  description:
    'Why preserving falsifying evidence and negative comparator studies is essential for open science in quantum computing.',
};

export default function ArticleNegativeResultsPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Research Notes &amp; Blog</span>
          </Link>
          <div className="text-xs font-mono text-text-muted">
            RESEARCH ARTICLE &bull; NEGATIVE EVIDENCE &amp; INTEGRITY
          </div>
        </div>

        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#DC2626]">
              OPEN SCIENCE &bull; PRESERVED NEGATIVE RESULTS
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Negative Results Matter: Where Q-Psi Did Not Beat the Baseline
          </h1>

          <div className="text-sm font-mono text-text-secondary">
            Why preserving falsifying evidence and negative comparator studies is essential for quantum science.
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
            <div>BY: <strong className="text-text-primary">Q-Psi Research Team</strong></div>
            <div>&bull;</div>
            <div>CAMPAIGNS COVERED: <strong className="text-text-primary">4 Preserved Studies</strong></div>
            <div>&bull;</div>
            <div>STATUS: <strong className="text-[#DC2626]">FALSIFYING EVIDENCE PRESERVED</strong></div>
          </div>
        </div>

        <div className="space-y-8 text-sm font-sans text-text-secondary leading-relaxed border-t border-border pt-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">1. Publication Bias in Quantum Computing</h2>
            <p>
              In contemporary quantum software research, negative or inconclusive results are routinely concealed. When a new heuristic fails to beat an industrial baseline, researchers often tune hyperparameters post-hoc until a positive graph is found.
            </p>
            <p>
              Q-Psi operates under a pre-registration protocol: hypotheses, compiler seeds, and verification metrics are committed to Git <em>before</em> QPU submission. When physical results falsify our initial hypothesis, the results are preserved in full.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">2. Four Preserved Negative &amp; Inconclusive Studies</h2>
            <div className="space-y-4">
              <div className="p-5 bg-surface-subtle border border-border rounded-lg space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <strong className="text-text-primary">1. Calibration-Aware Layout vs. Qiskit O3 Best-of-8</strong>
                  <span className="text-[#DC2626] font-bold">NOT SUPPORTED</span>
                </div>
                <p className="text-xs text-text-secondary">
                  We hypothesized that single-pass calibration graph weighting would outperform Qiskit stochastic layout search. Physical execution on IBM Marrakesh showed 1 win, 2 losses, and 3 inconclusive outcomes (mean delta \(-0.0106\)). Qiskit&apos;s multi-seed stochastic search remained superior or competitive.
                </p>
              </div>

              <div className="p-5 bg-surface-subtle border border-border rounded-lg space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <strong className="text-text-primary">2. Fractional Pulse Gate Lowering</strong>
                  <span className="text-[#64748B] font-bold">MIXED SIGNAL</span>
                </div>
                <p className="text-xs text-text-secondary">
                  Direct fractional pulse synthesis compressed schedule durations by up to 40%, but translated into physical fidelity wins on only 2 out of 6 circuits (4 cases were inconclusive).
                </p>
              </div>

              <div className="p-5 bg-surface-subtle border border-border rounded-lg space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <strong className="text-text-primary">3. Selective Pauli Twirling on Beta Hardware</strong>
                  <span className="text-[#64748B] font-bold">INCONCLUSIVE</span>
                </div>
                <p className="text-xs text-text-secondary">
                  Risk-mass layer selection successfully reduced twirled layers by 58.9%, but non-inferiority compared to full randomized compiling was not statistically established across 4 cases.
                </p>
              </div>

              <div className="p-5 bg-surface-subtle border border-border rounded-lg space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <strong className="text-text-primary">4. Constant-Depth Restricted Simon Scaling</strong>
                  <span className="text-[#64748B] font-bold">INCONCLUSIVE</span>
                </div>
                <p className="text-xs text-text-secondary">
                  Secret periods were recovered on 6/12 instances up to \(N=28\) (56 physical slots), but two-qubit gate error accumulation prevented establishing asymptotic physical speedup.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">3. The Scientific Value of Negative Baselines</h2>
            <p>
              Preserving negative comparators gives authentic meaning to positive results (such as our Grover candidate search and Dynamic BV advantages). A research program that only publishes positive graphs is indistinguishable from cherry-picking.
            </p>
          </section>

          <section className="space-y-2 font-mono text-xs border-t border-border pt-6 text-text-muted">
            <div>AUDIT METHODOLOGY: <Link href="/methodology" className="text-accent hover:underline">Methodology &amp; Scientific Freeze</Link></div>
            <div>EVIDENCE REGISTRY: <Link href="/evidence" className="text-accent hover:underline">Inspect Raw Hashes</Link></div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
