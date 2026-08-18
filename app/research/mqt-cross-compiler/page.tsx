import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ArrowUpRight, AlertCircle, FileText, Database, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: 'MQT Cross-Compiler Benchmark — Q-Psi Research Note',
  description:
    'Independent cross-compiler benchmark on IBM Heron: Q-Psi vs Qiskit O3 and TKET across 18 MQT Bench circuits.',
};

export default function MqtCrossCompilerResearchNotePage() {
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
              PHYSICAL QPU RESEARCH NOTE &bull; EXP-05-MQT-BENCH
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Cross-Compiler Benchmarking on IBM Heron: Q-Psi vs Qiskit O3 and TKET
          </h1>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
            <div>AUTHORS: <strong className="text-text-primary">Q-Psi Research Team</strong></div>
            <div>&bull;</div>
            <div>BACKEND: <strong className="text-text-primary">ibm_marrakesh (Heron r2)</strong></div>
            <div>&bull;</div>
            <div>STATUS: <strong className="text-text-primary">MIXED COMPETITIVENESS</strong></div>
          </div>
        </div>

        {/* Abstract Box */}
        <div className="scientific-card p-6 sm:p-8 space-y-3 bg-surface-raised border border-border">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
            ABSTRACT
          </div>
          <p className="text-sm font-sans text-text-primary leading-relaxed">
            We evaluate the Q-Psi State-Space Compiler against industrial compiler toolchains Qiskit O3 and TKET across the standard MQT Bench suite on IBM Heron (<code>ibm_marrakesh</code>, 156 programmable qubits, Job <code>da1ul7e3kjvs73877tag</code>, 36,864 shots). Q-Psi compiled all 18 benchmark circuits into valid QPU executables. Physical fidelity measurements demonstrated workload-dependent competitiveness: Qiskit O3 held a small aggregate advantage (mean delta \(-0.0067\)), while Q-Psi&apos;s apparent aggregate advantage over TKET (\(+0.0398\)) was driven entirely by a severe routing failure in TKET on <code>vqe_su2_n8</code> (\(+0.2696\) delta). Omitting <code>vqe_su2_n8</code> shifts the Q-Psi vs. TKET delta to \(-0.0062\).
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-sm font-sans text-text-secondary leading-relaxed border-t border-border pt-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">1. Experimental Setup &amp; Workload Suite</h2>
            <p>
              The benchmark suite comprised 6 standard algorithmic families from the Munich Quantum Toolkit (MQT Bench): <code>dj_n6</code>, <code>ghz_n8</code>, <code>qft_n6</code>, <code>graphstate_n8</code>, <code>vqe_su2_n8</code>, and <code>wstate_n6</code>. Each circuit was compiled by Q-Psi, Qiskit (Optimization Level 3), and TKET (Default Routing), producing 18 physical QPU circuits evaluated with 2,048 shots each.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">2. Physical Fidelity Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border border-border">
                <thead className="bg-surface-subtle border-b border-border text-left">
                  <tr>
                    <th className="p-3">Circuit</th>
                    <th className="p-3">Q-Psi Fidelity</th>
                    <th className="p-3">Qiskit O3 Fidelity</th>
                    <th className="p-3">TKET Fidelity</th>
                    <th className="p-3">&Delta;(Q-Psi - Qiskit)</th>
                    <th className="p-3">&Delta;(Q-Psi - TKET)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-3 font-bold">dj_n6</td>
                    <td className="p-3">0.9612</td>
                    <td className="p-3">0.9645</td>
                    <td className="p-3">0.9630</td>
                    <td className="p-3 text-text-muted">-0.0033</td>
                    <td className="p-3 text-text-muted">-0.0018</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">ghz_n8</td>
                    <td className="p-3">0.8840</td>
                    <td className="p-3">0.8912</td>
                    <td className="p-3">0.8890</td>
                    <td className="p-3 text-text-muted">-0.0072</td>
                    <td className="p-3 text-text-muted">-0.0050</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">qft_n6</td>
                    <td className="p-3">0.7120</td>
                    <td className="p-3">0.7315</td>
                    <td className="p-3">0.7240</td>
                    <td className="p-3 text-text-muted">-0.0195</td>
                    <td className="p-3 text-text-muted">-0.0120</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">graphstate_n8</td>
                    <td className="p-3">0.8410</td>
                    <td className="p-3">0.8450</td>
                    <td className="p-3">0.8435</td>
                    <td className="p-3 text-text-muted">-0.0040</td>
                    <td className="p-3 text-text-muted">-0.0025</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">vqe_su2_n8</td>
                    <td className="p-3 font-bold text-accent">0.6845</td>
                    <td className="p-3">0.6810</td>
                    <td className="p-3 font-bold text-[#DC2626]">0.4149</td>
                    <td className="p-3 text-[#15803D] font-bold">+0.0035</td>
                    <td className="p-3 text-[#15803D] font-bold">+0.2696</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">wstate_n6</td>
                    <td className="p-3">0.7950</td>
                    <td className="p-3">0.8045</td>
                    <td className="p-3">0.8050</td>
                    <td className="p-3 text-text-muted">-0.0095</td>
                    <td className="p-3 text-text-muted">-0.0100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">3. Leave-One-Out Sensitivity Analysis</h2>
            <div className="p-4 bg-surface-subtle border border-border rounded font-mono text-xs space-y-2">
              <div className="text-accent font-bold">AGGREGATE DELTA SENSITIVITY</div>
              <div className="flex justify-between">
                <span>Q-Psi vs Qiskit O3 (All 6):</span>
                <strong>-0.0067 [-0.0123, -0.0010]</strong>
              </div>
              <div className="flex justify-between">
                <span>Q-Psi vs TKET (All 6):</span>
                <strong>+0.0398 [+0.0329, +0.0457]</strong>
              </div>
              <div className="flex justify-between border-t border-border pt-1">
                <span>Q-Psi vs TKET (Excluding vqe_su2_n8):</span>
                <strong className="text-text-primary">-0.0062 [-0.0120, -0.0006]</strong>
              </div>
            </div>
            <p className="text-xs text-text-secondary">
              The sensitivity audit confirms that Q-Psi does not hold an aggregate advantage over TKET across general circuits; the positive delta was an artifact of TKET&apos;s heavy-hex routing layout on <code>vqe_su2_n8</code>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">4. Conclusion &amp; Boundary</h2>
            <div className="p-4 bg-surface-raised border border-border rounded space-y-2 text-xs">
              <div className="font-bold text-[#64748B] uppercase">FORMAL STATUS: MIXED COMPETITIVENESS</div>
              <p className="text-text-secondary leading-relaxed">
                Q-Psi demonstrates valid compilation and competitive execution across industrial benchmarks, but does NOT establish general superiority over Qiskit or TKET.
              </p>
            </div>
          </section>

          <section className="space-y-2 font-mono text-xs border-t border-border pt-6 text-text-muted">
            <div>IBM RUNTIME JOB ID: <span className="text-text-primary">da1ul7e3kjvs73877tag</span></div>
            <div>RAW EVIDENCE SHA256: <span className="text-text-primary">9d347393dd9f2b3c168ab706d2c4d55e0ff4ab1c65ea5091fb8b62527fc7e3e5</span></div>
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
