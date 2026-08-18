import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertCircle, FileText, Database, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Q-Psi After 564,840 Physical Quantum Shots — Q-Psi Research Retrospective',
  description:
    'A comprehensive retrospective of 14 audited physical-QPU campaigns on IBM Heron: what fourteen frozen hardware studies established — and what they did not.',
};

export default function ArticleOverviewPage() {
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
            PROGRAM RETROSPECTIVE &bull; 18 AUG 2026
          </div>
        </div>

        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              AUDITED RESEARCH RETROSPECTIVE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Q-Psi After 564,840 Physical Quantum Shots
          </h1>

          <div className="text-sm font-mono text-text-secondary">
            What fourteen frozen hardware studies established — and what they did not.
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
            <div>BY: <strong className="text-text-primary">Q-Psi Research Team</strong></div>
            <div>&bull;</div>
            <div>AUDITED SHOTS: <strong className="text-text-primary">564,840</strong></div>
            <div>&bull;</div>
            <div>HARDWARE: <strong className="text-text-primary">ibm_marrakesh (156Q Heron r2)</strong></div>
          </div>
        </div>

        <div className="space-y-8 text-sm font-sans text-text-secondary leading-relaxed border-t border-border pt-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">1. The Experimental Milestone</h2>
            <p>
              Over the course of 16 production quantum processor executions totaling 564,840 physical shots and 259.38 reported IBM runtime quantum seconds, Q-Psi investigated how compiler-synthesized state spaces behave when executed on real superconducting quantum hardware.
            </p>
            <p>
              Rather than treating quantum advantage as a vague marketing narrative, we formulated strict pre-registered hypotheses across 14 discrete campaign families, locked all raw execution bitstrings with SHA-256 evidence seals, and executed an independent mathematical and statistical audit.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">2. What Was Established (The Positive Evidence)</h2>
            <div className="space-y-3">
              <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5">
                <div className="font-bold text-text-primary">A. Bounded Quantum Query Advantage (Grover Candidate Search)</div>
                <p className="text-xs text-text-secondary">
                  Under an opaque black-box verifier contract, Q-Psi demonstrated physical query reduction factors of 2.43x (N=4), 1.73x (N=8), and 1.19x (N=16) across 9/9 cases and 3/3 problem sizes. At N=16, the 95% confidence interval upper bound on quantum queries (7.360) remained strictly below classical expectation (8.5).
                </p>
              </div>

              <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5">
                <div className="font-bold text-text-primary">B. Dynamic Bernstein–Vazirani Scaling Separation</div>
                <p className="text-xs text-text-secondary">
                  Physical single-shot execution across N=4..16 qubits demonstrated statistically significant query-complexity scaling advantage (&alpha;_Q = 0.1532 vs &alpha;_C = 0.6963, t = -30.65, p &lt; 10<sup>-6</sup>).
                </p>
              </div>

              <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5">
                <div className="font-bold text-text-primary">C. Mid-Circuit Measurement &amp; Qubit Reuse</div>
                <p className="text-xs text-text-secondary">
                  Compiler liveness analysis compressed physical register width by a median 78.1% (mapping 16 logical qubits onto 2 physical slots) while satisfying pre-registered non-inferiority margins across 6/6 streaming circuits.
                </p>
              </div>

              <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5">
                <div className="font-bold text-text-primary">D. Quantum Data Foundry Feasibility</div>
                <p className="text-xs text-text-secondary">
                  A 120-Qsec campaign sampled 65,138 candidate states from a 65,536-universe on IBM Heron, successfully producing 93 verified positive code repair records (1.593 MB, ~417k tokens) with 100% causal QPU provenance.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">3. What Was NOT Established (The Strict Boundaries)</h2>
            <div className="p-5 bg-surface-raised border border-border rounded-lg space-y-3 font-sans text-xs">
              <div className="font-bold text-[#DC2626] uppercase">MANDATORY SCIENTIFIC DISCLAIMERS</div>
              <ul className="list-disc list-inside space-y-1.5 text-text-secondary">
                <li><strong>No General Quantum Supremacy:</strong> Query reductions do not translate into end-to-end wall-clock speedup when compilation and QPU queuing times are included.</li>
                <li><strong>No General Compiler Superiority:</strong> Q-Psi does not outperform industrial compilers Qiskit and TKET universally; benchmark competitiveness is workload-dependent.</li>
                <li><strong>No Tested LLM Improvement:</strong> The Quantum Data Foundry demonstrated pipeline mechanics only; downstream LLM fine-tuning was not evaluated.</li>
                <li><strong>Preserved Negative Comparators:</strong> In Calibration-Aware Layout, Qiskit O3 best-of-8 layout search outperformed Q-Psi layout (mean delta \(-0.0106\)). This falsifying evidence is preserved.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-2 font-mono text-xs border-t border-border pt-6 text-text-muted">
            <div>AUDIT TASK ID: <span className="text-text-primary">QPSI_MASTER_EVIDENCE_AUDIT_AND_FREEZE_2026_08_18</span></div>
            <div>FREEZE COMMIT: <span className="text-text-primary">be74ad05187e148e2fc52309f4d7f57be3784157</span></div>
            <div className="pt-2">
              <Link href="/evidence" className="text-accent font-semibold hover:underline">
                Inspect Evidence Registry &rarr;
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
