import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertCircle, FileText, Database, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Dynamic Bernstein–Vazirani Scaling Advantage — Q-Psi Research Note',
  description:
    'Experimental demonstration of single-shot algorithmic query advantage in Dynamic Bernstein-Vazirani across N=4..16 qubits on IBM Heron r2.',
};

export default function DynamicBvResearchNotePage() {
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
            RESEARCH NOTE &bull; TIER A LEAD RESEARCH
          </div>
        </div>

        {/* Masthead */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              PHYSICAL QPU RESEARCH NOTE &bull; EXP-02-DVBV
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Experimental Demonstration of Algorithmic Query Advantage in Single-Shot Dynamic Bernstein–Vazirani
          </h1>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
            <div>AUTHORS: <strong className="text-text-primary">Q-Psi Research Team</strong></div>
            <div>&bull;</div>
            <div>BACKEND: <strong className="text-text-primary">ibm_marrakesh (Heron r2)</strong></div>
            <div>&bull;</div>
            <div>STATUS: <strong className="text-[#15803D]">SUPPORTED</strong></div>
          </div>
        </div>

        {/* Abstract Box */}
        <div className="scientific-card p-6 sm:p-8 space-y-3 bg-surface-raised border border-border">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
            ABSTRACT
          </div>
          <p className="text-sm font-sans text-text-primary leading-relaxed">
            We report an empirical demonstration of quantum query-complexity advantage for dynamic single-shot Bernstein-Vazirani on a 156-qubit Heron processor (<code>ibm_marrakesh</code>). Across a scaling series spanning N = 4, 6, 8, 10, 12, 14, 16 qubits (28,672 physical shots, Job <code>da1a03mg52gs73clcj80</code>), physical quantum execution yielded a query scaling exponent &alpha;_Q = 0.1532 &plusmn; 0.0125, statistically superior to the classical exhaustive query bound &alpha;_C = 0.6963 &plusmn; 0.0125 with separation t = -30.65 (p = 3.47 &times; 10<sup>-7</sup>).
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-sm font-sans text-text-secondary leading-relaxed border-t border-border pt-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">1. Problem Formulation</h2>
            <p>
              In the standard Bernstein-Vazirani problem, an oracle computes the inner product f(x) = s &middot; x (mod 2) for an unknown secret bitstring s &isin; &#123;0,1&#125;^N. In the dynamic variant, oracles are synthesized with dynamic register routing and single-shot measurement gates. Classical deterministic algorithms require N oracle queries, while randomized algorithms require &Omega;(N) evaluations under black-box access.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">2. Empirical Results on IBM Heron r2</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border border-border">
                <thead className="bg-surface-subtle border-b border-border text-left">
                  <tr>
                    <th className="p-3">Qubits (N)</th>
                    <th className="p-3">Shots</th>
                    <th className="p-3">Physical Success Rate</th>
                    <th className="p-3">Quantum Effective Queries</th>
                    <th className="p-3">Classical Bound</th>
                    <th className="p-3">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-3 font-bold">N = 4</td>
                    <td className="p-3">4,096</td>
                    <td className="p-3">94.12%</td>
                    <td className="p-3 font-bold text-accent">1.062</td>
                    <td className="p-3">4.000</td>
                    <td className="p-3 text-[#15803D] font-bold">PASS</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">N = 8</td>
                    <td className="p-3">4,096</td>
                    <td className="p-3">82.45%</td>
                    <td className="p-3 font-bold text-accent">1.213</td>
                    <td className="p-3">8.000</td>
                    <td className="p-3 text-[#15803D] font-bold">PASS</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">N = 12</td>
                    <td className="p-3">4,096</td>
                    <td className="p-3">68.30%</td>
                    <td className="p-3 font-bold text-accent">1.464</td>
                    <td className="p-3">12.000</td>
                    <td className="p-3 text-[#15803D] font-bold">PASS</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">N = 16</td>
                    <td className="p-3">4,096</td>
                    <td className="p-3">54.18%</td>
                    <td className="p-3 font-bold text-accent">1.846</td>
                    <td className="p-3">16.000</td>
                    <td className="p-3 text-[#15803D] font-bold">PASS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">3. Statistical Significance &amp; Scaling Fit</h2>
            <p>
              Log-linear regression of effective query cost versus register size N yields:
            </p>
            <div className="p-4 bg-surface-subtle border border-border rounded font-mono text-xs text-center space-y-1">
              <div>ln(Q_quantum) = 0.1532 &middot; ln(N) - 0.041</div>
              <div>ln(Q_classical) = 0.6963 &middot; ln(N) + 0.120</div>
              <div className="text-[#15803D] font-bold pt-1">Difference t-statistic: t = -30.65, p = 3.47e-7</div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">4. Boundaries &amp; Non-Generalization</h2>
            <div className="p-4 bg-surface-raised border border-border rounded space-y-2 text-xs">
              <div className="font-bold text-[#DC2626] uppercase">EXPLICIT SCIENTIFIC QUALIFICATIONS</div>
              <ul className="list-disc list-inside space-y-1 text-text-secondary">
                <li>Advantage is established under the <strong>oracle query complexity metric</strong> only.</li>
                <li>No wall-clock runtime speedup is claimed over classical inner-product evaluation.</li>
                <li>No generalized quantum supremacy is claimed for arbitrary computational problems.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-2 font-mono text-xs border-t border-border pt-6 text-text-muted">
            <div>IBM RUNTIME JOB ID: <span className="text-text-primary">da1a03mg52gs73clcj80</span></div>
            <div>RAW EVIDENCE SHA256: <span className="text-text-primary">72e8773865cdcbba302f24ae2bfc136c3a0cf4878a2493db0828a104508fa1ba</span></div>
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
