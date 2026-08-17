import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { EvidenceLine } from '@/components/ui/EvidenceLine';
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertCircle, FileText, Database, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Compiler-Enabled Quantum Query Advantage on Physical Quantum Hardware — Q-Psi Research Note',
  description: 'Formal scientific research note documenting compiler-enabled quantum query advantage for candidate-state search on a 156-qubit IBM Quantum processor.',
};

export default function CompilerGroverResearchNotePage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/research"
            className="inline-flex items-center space-x-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Research Overview</span>
          </Link>
          <div className="text-xs font-mono text-text-muted">
            RESEARCH NOTE &bull; QPSI-NOTE-2026-02
          </div>
        </div>

        {/* Paper Masthead */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              PHYSICAL QPU RESEARCH NOTE &bull; EXPERIMENT V1.1
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Compiler-Enabled Quantum Query Advantage for Candidate-State Search on Physical Quantum Hardware
          </h1>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
            <div>AUTHORS: <strong className="text-text-primary">Q-Psi Research Team</strong></div>
            <div>&bull;</div>
            <div>DATE: <strong className="text-text-primary">August 17, 2026</strong></div>
            <div>&bull;</div>
            <div>BACKEND: <strong className="text-text-primary">ibm_marrakesh (156Q)</strong></div>
          </div>
        </div>

        {/* Abstract Box */}
        <div className="scientific-card p-6 sm:p-8 space-y-3 bg-surface-raised border border-border">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
            ABSTRACT
          </div>
          <p className="text-sm font-sans text-text-primary leading-relaxed">
            We report an empirical demonstration of compiler-enabled quantum query advantage for software-repair candidate-state search on a 156-qubit superconducting quantum processor (<code>ibm_marrakesh</code>). Across 9 frozen instances drawn from 7 distinct programming language ecosystems at N=4, N=8, and N=16, physical quantum execution under a strictly verified black-box oracle model achieved lower effective verifier queries than the classical expected black-box search cost across 9/9 individual cases and 3/3 problem sizes. At N=16, the 95% Wilson confidence interval upper bound on effective quantum queries (7.360) remains strictly below the classical expected baseline of 8.5 queries. All protocol specifications, pre-execution fairness audits, raw execution bitstrings, and adversarial independent audits are published under open science principles.
          </p>
        </div>

        {/* Article Body */}
        <div className="space-y-10 text-sm font-sans text-text-secondary leading-relaxed border-t border-border pt-8">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              1. Research Question
            </h2>
            <p>
              Can authentic search state spaces derived by a software-repair compiler participate in a bounded quantum query advantage experiment on physical quantum hardware without ground-truth leakage or side-channel rank bias?
            </p>
            <p>
              While theoretical quantum search algorithms (such as Grover&apos;s algorithm and amplitude amplification) guarantee asymptotic query speedups on unstructured databases, real-world compilation pipelines often introduce heuristic ordering or structural correlations that could trivialize classical search if exposed. This work evaluates whether a rigorous black-box search interface preserves demonstrable quantum query advantage on physical NISQ hardware when operating on real-world compiler outputs.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              2. Q-Psi State-Space Compiler
            </h2>
            <p>
              The Q-Psi compiler translates discrete multi-file software bug state spaces into structured candidate subspaces. In this experiment, candidate sets of size N &in; &#123;4, 8, 16&#125; were extracted from 9 real software repair problems spanning Python, Go, Java, Rust, TypeScript, PHP, Ruby, and C/C++.
            </p>
          </section>

          {/* Section 3 & 4 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              3. Why Black-Box Fairness Matters &amp; Pre-QPU Correction
            </h2>
            <p>
              In our initial v1.0 design, candidate state indices correlated with compiler rank scores, creating potential side-channel information. An independent adversarial audit identified this issue <em>before</em> physical hardware execution.
            </p>
            <p>
              Protocol v1.1 resolved this vulnerability by enforcing:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs font-mono text-text-primary bg-surface-subtle p-4 rounded border border-border">
              <li>Deterministic answer-independent candidate permutations (seeded by candidate hashes).</li>
              <li>Strictly opaque candidate IDs (0 to N-1) presented symmetrically to classical and quantum arms.</li>
              <li>100.0% mechanical truth-table verification between classical and quantum oracle evaluators.</li>
            </ul>
          </section>

          {/* Section 5 & 6 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              4. Physical IBM Quantum Execution &amp; Frozen Protocol
            </h2>
            <p>
              Execution was performed on IBM Quantum&apos;s 156-qubit Heron processor, <code>ibm_marrakesh</code>, under runtime Job ID <code>da1c7rkdedkc73eqs5mg</code>. Each of the 9 frozen circuits was executed with 2,048 physical shots (18,432 physical shots total).
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              5. Experimental Results
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border border-border">
                <thead className="bg-surface-subtle border-b border-border text-left">
                  <tr>
                    <th className="p-3">Problem Size (N)</th>
                    <th className="p-3">Qubits</th>
                    <th className="p-3">Grover k</th>
                    <th className="p-3">Physical P_succ</th>
                    <th className="p-3">Quantum Q_eff</th>
                    <th className="p-3">Classical Q_class</th>
                    <th className="p-3">Advantage</th>
                    <th className="p-3">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-3 font-bold">N = 4</td>
                    <td className="p-3">2</td>
                    <td className="p-3">1</td>
                    <td className="p-3">97.09%</td>
                    <td className="p-3 font-bold text-accent">1.030</td>
                    <td className="p-3">2.500</td>
                    <td className="p-3 font-bold text-[#15803D]">2.43x</td>
                    <td className="p-3 font-bold text-[#15803D]">PASS</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">N = 8</td>
                    <td className="p-3">3</td>
                    <td className="p-3">2</td>
                    <td className="p-3">77.08%</td>
                    <td className="p-3 font-bold text-accent">2.595</td>
                    <td className="p-3">4.500</td>
                    <td className="p-3 font-bold text-[#15803D]">1.73x</td>
                    <td className="p-3 font-bold text-[#15803D]">PASS</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">N = 16</td>
                    <td className="p-3">4</td>
                    <td className="p-3">3</td>
                    <td className="p-3">41.99%</td>
                    <td className="p-3 font-bold text-accent">7.144</td>
                    <td className="p-3">8.500</td>
                    <td className="p-3 font-bold text-[#15803D]">1.19x</td>
                    <td className="p-3 font-bold text-[#15803D]">PASS</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-text-muted">
              Note: Classical baseline Q_class = (N+1)/2 represents the exact expected number of black-box verifier queries for classical random sampling without replacement. Quantum effective queries Q_eff = k / P_succ.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              6. Statistical Confidence Analysis
            </h2>
            <p>
              At N=16, physical measurement yielded 2,580 successful shots out of 6,144 total shots (P_succ = 41.99%). The two-sided 95% Wilson score confidence interval is [40.76%, 43.23%]. Inverting this interval yields a 95% confidence bound on effective quantum queries:
            </p>
            <div className="p-4 bg-surface-subtle border border-border rounded font-mono text-xs text-center">
              Q_eff(95% high) = 3 / 0.4076 = 7.360 &lt; 8.500
            </div>
            <p>
              Because 7.360 &lt; 8.5, the frozen statistical decision gate is fully satisfied.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              7. What This Demonstrates &amp; What It Does NOT Demonstrate
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-surface-subtle border border-border rounded space-y-2 text-xs">
                <div className="font-bold text-[#15803D] uppercase flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>WHAT THIS DEMONSTRATES</span>
                </div>
                <ul className="space-y-1 list-disc list-inside text-text-secondary">
                  <li>Compiler-enabled quantum query advantage on physical superconducting hardware.</li>
                  <li>Opaque black-box verifier contract integrity without ground truth leakage.</li>
                  <li>Advantage across 9/9 individual cases and 3/3 problem sizes up to N=16.</li>
                </ul>
              </div>

              <div className="p-4 bg-surface-subtle border border-border rounded space-y-2 text-xs">
                <div className="font-bold text-[#DC2626] uppercase flex items-center space-x-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>WHAT THIS DOES NOT DEMONSTRATE</span>
                </div>
                <ul className="space-y-1 list-disc list-inside text-text-secondary">
                  <li>No end-to-end wall-clock speedup over classical computers.</li>
                  <li>No general computational supremacy or commercial advantage.</li>
                  <li>No advantage over every structure-aware heuristic algorithm.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              8. Evidence &amp; Reproducibility
            </h2>
            <div className="p-4 bg-surface-subtle border border-border rounded font-mono text-xs space-y-1.5 text-text-muted">
              <div>IBM RUNTIME JOB ID: <span className="text-text-primary font-bold">da1c7rkdedkc73eqs5mg</span></div>
              <div>RAW RESULTS SHA256: <span className="text-text-primary">8f65edbe0cea3ffdc16f3ff89b07beaf6ab111019a556c1cde56b274c0e18ff2</span></div>
              <div>PROTOCOL FREEZE COMMIT: <span className="text-text-primary">1bf15b85f7fd206fb985f037845ee6f0d9188e7f</span></div>
              <div>INDEPENDENT AUDIT COMMIT: <span className="text-text-primary">e8efd49b28ceca86a281b59455b45c27775857e0</span></div>
            </div>
            <div className="pt-2">
              <Link
                href="/evidence"
                className="inline-flex items-center space-x-1.5 text-accent font-semibold hover:underline text-xs"
              >
                <span>Inspect Evidence Registry &rarr;</span>
              </Link>
            </div>
          </section>

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              9. Citation
            </h2>
            <pre className="p-4 bg-surface-subtle border border-border rounded font-mono text-[11px] text-text-secondary overflow-x-auto">
{`@techreport{qpsi2026compilergrover,
  title = {Compiler-Enabled Quantum Query Advantage for Candidate-State Search on Physical Quantum Hardware},
  author = {{Q-Psi Research Team}},
  institution = {Q-Psi Independent Quantum Research, The Oneness Project},
  year = {2026},
  month = {August},
  number = {QPSI-NOTE-2026-02},
  url = {https://qpsi.vercel.app/research/compiler-grover-query-advantage}
}`}
            </pre>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
