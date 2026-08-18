import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowUpRight, Database, CheckCircle2, ShieldAlert, FileText, Cpu, Layers } from 'lucide-react';

export const metadata = {
  title: 'Scientific Blog — Q-Psi Independent Quantum Research',
  description: 'In-depth research reports, hardware campaign post-mortems, and open science publications by the Q-Psi Research Team.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              RESEARCH BLOG &bull; CAMPAIGN POST-MORTEMS
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Scientific Deep Dives &amp; Campaign Post-Mortems
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            Open science requires publishing positive demonstrations, negative findings, and mathematical audits with complete transparency.
          </p>
        </div>

        {/* Featured Article 1: Dynamic Routing Depth vs Fidelity */}
        <div className="scientific-card p-8 sm:p-12 space-y-6 bg-surface-raised border border-border">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text-muted">
              <span className="text-accent font-bold">NEW RESEARCH UPDATE</span>
              <span>&bull;</span>
              <span>AUGUST 18, 2026</span>
              <span>&bull;</span>
              <span>HARDWARE: IBM QUANTUM (ibm_marrakesh — 156Q)</span>
            </div>

            <h2 className="text-3xl font-serif font-bold text-text-primary">
              Why Constant Two-Qubit Depth Did Not Guarantee Better Physical Fidelity: Lessons from a 156-Qubit Hardware-Aware Routing Study
            </h2>

            <div className="text-xs font-mono text-text-secondary">
              Subtitle: <em>Evaluating Unitary SWAP routing vs. Dynamic MCM feed-forward routing across three physical separations on IBM Heron.</em>
            </div>
          </div>

          <div className="space-y-4 text-sm text-text-secondary font-sans leading-relaxed">
            <p>
              In quantum compiler design, reducing two-qubit gate depth is commonly assumed to directly improve physical circuit fidelity. We tested this assumption on IBM Quantum&apos;s 156-qubit Heron architecture (<code>ibm_marrakesh</code>, Job <code>da1t22mg52gs73cm31i0</code>) by comparing <strong>Unitary SWAP-based routing</strong> against <strong>Dynamic circuit feed-forward routing</strong> for long-range CNOT gates.
            </p>

            <div className="p-5 bg-surface-subtle border border-border rounded space-y-3 font-mono text-xs">
              <div className="font-bold text-text-primary uppercase tracking-wider">EXPERIMENTAL FINDINGS &amp; FIDELITY COMPARISON</div>
              <ul className="space-y-2 text-text-secondary">
                <li><strong className="text-text-primary">Constant Depth Maintained:</strong> Dynamic routing preserved a constant two-qubit depth of <strong>2</strong> across all distances (compared to unitary depths of <strong>13</strong>, <strong>37</strong>, and <strong>73</strong>).</li>
                <li><strong className="text-text-primary">Unitary Routing Won Conclusive Distances:</strong> Despite higher gate depth, unitary SWAP routing achieved statistically superior Bell fidelity on SHORT (3 hops: 0.8618 vs 0.8209) and MEDIUM (7 hops: 0.8135 vs 0.7651).</li>
                <li><strong className="text-text-primary">Inconclusive at 13 Hops:</strong> At LONG separation, fidelity difference remained inconclusive (0.6669 vs 0.6356, \(\Delta F\) 95% CI \([-0.0630, +0.0005]\)). The physical routing crossover was <em>not resolved</em>.</li>
                <li><strong className="text-text-primary">Pre-QPU Model Confirmation:</strong> Q-Psi&apos;s calibration cost model correctly predicted both conclusive winners (<strong>2/2 confirmed</strong>).</li>
                <li><strong className="text-text-primary">Methodological Sensitivity:</strong> Predictions relied on a predeclared feed-forward latency penalty (\(\lambda = 0.012\)); robustness is classified as <code>PARTIAL</code>.</li>
              </ul>
            </div>

            <p>
              We enforce strict scientific boundaries: <strong>no quantum advantage or general predictive compiler superiority is claimed</strong>, and no crossover point is interpolated beyond measured data.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/research/dynamic-routing-crossover"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover transition-colors shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Read Full Research Note</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/evidence"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-surface-subtle border border-border text-text-primary font-sans text-xs font-semibold rounded hover:border-border-hover transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-accent" />
              <span>Inspect Evidence Hashes (Job da1t22mg52gs73cm31i0)</span>
            </Link>
          </div>
        </div>

        {/* Major Article 2: Compiler Advantage Milestone */}
        <div className="scientific-card p-8 sm:p-12 space-y-6 bg-surface-raised border border-border">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text-muted">
              <span className="text-text-secondary font-bold">RESEARCH REPORT</span>
              <span>&bull;</span>
              <span>AUGUST 17, 2026</span>
              <span>&bull;</span>
              <span>HARDWARE: IBM QUANTUM (ibm_marrakesh — 156Q)</span>
            </div>

            <h2 className="text-3xl font-serif font-bold text-text-primary">
              Q-Psi Compiler Reaches Its First Quantum-Advantage Milestone
            </h2>

            <div className="text-xs font-mono text-text-secondary">
              Subtitle: <em>Nine compiler-derived search cases, three problem sizes, one frozen physical-QPU experiment, and an independent audit.</em>
            </div>
          </div>

          <div className="space-y-4 text-sm text-text-secondary font-sans leading-relaxed">
            <p>
              When Q-Psi initially evaluated the State-Space Compiler on IBM Quantum hardware in our Stage-6F campaign, we confirmed physical-QPU interoperability: our QUBO and Ising formulations successfully mapped onto 156-qubit Heron architecture and recovered exact classical global optima on 100% of small problem instances (N &le; 10). However, <strong>we explicitly did not claim quantum advantage at that time</strong>. NISQ gate depth and device noise degraded larger instances, and compiler-specific speedup remained unproven.
            </p>

            <p>
              To rigorously test whether compiler-generated state spaces can achieve a bounded quantum advantage, we designed a candidate-state search experiment combining the Q-Psi compiler with Grover&apos;s amplitude amplification.
            </p>

            <div className="p-5 bg-surface-subtle border border-border rounded space-y-3 font-mono text-xs">
              <div className="font-bold text-text-primary uppercase tracking-wider">THE SCIENTIFIC PROCESS: FROM FLAW IDENTIFICATION TO PHYSICAL VERIFICATION</div>
              <ol className="list-decimal list-inside space-y-2 text-text-secondary">
                <li><strong className="text-text-primary">Pre-QPU Fairness Review:</strong> An adversarial audit of protocol v1.0 revealed that candidate ordering correlated with compiler internal rankings. If left uncorrected, classical algorithms could exploit this side channel.</li>
                <li><strong className="text-text-primary">Protocol v1.1 Correction:</strong> We redesigned the protocol <em>before submitting QPU jobs</em>, applying answer-independent candidate permutations and an opaque black-box verifier contract with 100.0% mechanical equivalence.</li>
                <li><strong className="text-text-primary">Single Physical Execution:</strong> The frozen protocol was executed on <code>ibm_marrakesh</code> (Job ID: <code>da1c7rkdedkc73eqs5mg</code>, 18,432 physical shots).</li>
                <li><strong className="text-text-primary">Unanimous Advantage:</strong> 9 out of 9 individual cases and 3 out of 3 problem sizes (N=4, 8, 16) beat the classical expected query cost.</li>
                <li><strong className="text-text-primary">Statistical Rigor at N=16:</strong> The 95% Wilson confidence interval upper bound on quantum effective queries (\(7.360\)) remained strictly below the classical expectation (\(8.5\)).</li>
                <li><strong className="text-text-primary">Independent Audit:</strong> An independent adversarial audit verified the raw evidence seal (SHA256: <code>8f65edbe...ff2</code>) and delivered a final verdict of <strong>SUPPORTED</strong>.</li>
              </ol>
            </div>

            <p>
              We maintain strict scientific boundaries: this experiment demonstrates <strong>quantum query advantage under a black-box verifier model</strong>. It does not claim wall-clock runtime speedup or universal software-repair supremacy over all structure-aware classical heuristics.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/research/compiler-grover-query-advantage"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover transition-colors shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Read Full Research Note</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/evidence"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-surface-subtle border border-border text-text-primary font-sans text-xs font-semibold rounded hover:border-border-hover transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-accent" />
              <span>Inspect Raw Results &amp; Audit Seal</span>
            </Link>
          </div>
        </div>

        {/* Major Article 3: 4 Campaigns Post-Mortem */}
        <div className="scientific-card p-8 sm:p-12 space-y-6 bg-surface-raised border border-border">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text-muted">
              <span className="text-text-secondary font-bold">HISTORICAL RESEARCH REPORT</span>
              <span>&bull;</span>
              <span>AUGUST 17, 2026</span>
              <span>&bull;</span>
              <span>HARDWARE: IBM QUANTUM (ibm_marrakesh)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
              From Software-Repair Compilation to a Physical-QPU Quantum Advantage Experiment: What Q-Psi Tested, What Worked, and What Failed
            </h2>

            <div className="text-xs font-sans text-text-secondary">
              By the Q-Psi Research Team
            </div>
          </div>

          <p className="text-sm text-text-secondary font-sans leading-relaxed">
            A comprehensive overview of the four initial physical QPU campaigns on IBM Quantum&apos;s 156-qubit Heron processor, <code>ibm_marrakesh</code>: state-space software repair compilation (Stage-6F), single-shot dynamic Bernstein-Vazirani query advantage, constant-depth restricted Simon circuits, and exploratory mantra quantum state encoding.
          </p>

          <div className="pt-2 flex items-center justify-between">
            <Link
              href="/evidence"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-surface-subtle border border-border text-text-primary font-sans text-xs font-semibold rounded hover:border-border-hover transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-accent" />
              <span>View Evidence for this Report</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
