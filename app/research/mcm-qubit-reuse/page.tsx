import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertCircle, FileText, Database, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: 'MCM Qubit Reuse Compilation — Q-Psi Research Note',
  description:
    'Evaluating compiler liveness analysis and mid-circuit measurement qubit reuse on IBM Heron: median 78.1% width reduction with non-inferior observable fidelity.',
};

export default function McmQubitReuseResearchNotePage() {
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
              PHYSICAL QPU RESEARCH NOTE &bull; EXP-03-MCM-REUSE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Mid-Circuit Measurement &amp; Qubit Reuse Compilation on Superconducting Quantum Hardware
          </h1>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
            <div>AUTHORS: <strong className="text-text-primary">Q-Psi Research Team</strong></div>
            <div>&bull;</div>
            <div>BACKEND: <strong className="text-text-primary">ibm_marrakesh (Heron r2)</strong></div>
            <div>&bull;</div>
            <div>STATUS: <strong className="text-[#D97706]">SUPPORTED WITH QUALIFICATION</strong></div>
          </div>
        </div>

        {/* Abstract Box */}
        <div className="scientific-card p-6 sm:p-8 space-y-3 bg-surface-raised border border-border">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
            ABSTRACT
          </div>
          <p className="text-sm font-sans text-text-primary leading-relaxed">
            We evaluate compiler-driven mid-circuit measurement and dynamic qubit reset on IBM Heron (<code>ibm_marrakesh</code>, 156 programmable qubits, Job <code>da1u0om3kjvs738777cg</code>, 24,576 shots). Across 6 streaming and bounded-treewidth circuits, qubit reuse passes reduced active physical register width by a median <strong>78.1%</strong> (up to 87.5% for 16 logical qubits compressed to 2 physical slots). Physical observable fidelity remained non-inferior to static uncompressed circuits across all 6 cases (4/6 direct reuse wins; 6/6 within pre-declared non-inferiority margin \(\epsilon = 0.05\)).
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-sm font-sans text-text-secondary leading-relaxed border-t border-border pt-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">1. Liveness-Driven Register Compression</h2>
            <p>
              Quantum circuits with temporal liveness structures (where qubits carry state for only a fraction of circuit depth) can be compressed onto smaller physical registers by inserting mid-circuit measurements (M), resets (|0&rang;), and dynamic wire reassignments.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">2. Empirical Results on IBM Heron r2</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border border-border">
                <thead className="bg-surface-subtle border-b border-border text-left">
                  <tr>
                    <th className="p-3">Workload</th>
                    <th className="p-3">Logical Qubits</th>
                    <th className="p-3">Physical Slots</th>
                    <th className="p-3">Width Reduction</th>
                    <th className="p-3">Observable RMSE Delta</th>
                    <th className="p-3">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-3 font-bold">STREAM_8_A</td>
                    <td className="p-3">8</td>
                    <td className="p-3">2</td>
                    <td className="p-3 font-bold text-accent">75.0%</td>
                    <td className="p-3 text-[#15803D] font-bold">-0.0124 (Win)</td>
                    <td className="p-3 text-[#15803D] font-bold">NON-INFERIOR</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">STREAM_8_B</td>
                    <td className="p-3">8</td>
                    <td className="p-3">3</td>
                    <td className="p-3 font-bold text-accent">62.5%</td>
                    <td className="p-3 text-[#15803D] font-bold">-0.0089 (Win)</td>
                    <td className="p-3 text-[#15803D] font-bold">NON-INFERIOR</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">STREAM_12_A</td>
                    <td className="p-3">12</td>
                    <td className="p-3">2</td>
                    <td className="p-3 font-bold text-accent">83.3%</td>
                    <td className="p-3 text-[#15803D] font-bold">-0.0156 (Win)</td>
                    <td className="p-3 text-[#15803D] font-bold">NON-INFERIOR</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">STREAM_12_B</td>
                    <td className="p-3">12</td>
                    <td className="p-3">3</td>
                    <td className="p-3 font-bold text-accent">75.0%</td>
                    <td className="p-3 text-[#15803D] font-bold">-0.0042 (Win)</td>
                    <td className="p-3 text-[#15803D] font-bold">NON-INFERIOR</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">STREAM_16_A</td>
                    <td className="p-3">16</td>
                    <td className="p-3">2</td>
                    <td className="p-3 font-bold text-accent">87.5%</td>
                    <td className="p-3 text-text-secondary">+0.0182 (Loss within margin)</td>
                    <td className="p-3 text-[#15803D] font-bold">NON-INFERIOR</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">STREAM_16_B</td>
                    <td className="p-3">16</td>
                    <td className="p-3">3</td>
                    <td className="p-3 font-bold text-accent">81.3%</td>
                    <td className="p-3 text-text-secondary">+0.0110 (Loss within margin)</td>
                    <td className="p-3 text-[#15803D] font-bold">NON-INFERIOR</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">3. Scope &amp; Structural Qualifications</h2>
            <div className="p-4 bg-surface-raised border border-border rounded space-y-2 text-xs">
              <div className="font-bold text-[#D97706] uppercase">AUDITED CLAIM BOUNDARY</div>
              <p className="text-text-secondary leading-relaxed">
                Qubit reuse is strictly applicable to circuits with sequential liveness graphs and streaming communication topologies. Highly entangled algorithms requiring simultaneous multi-qubit coherence cannot be compressed onto a 2-qubit register. Q-Psi explicitly rejects claims that 16-qubit quantum computation universally requires only 2 qubits.
              </p>
            </div>
          </section>

          <section className="space-y-2 font-mono text-xs border-t border-border pt-6 text-text-muted">
            <div>IBM RUNTIME JOB ID: <span className="text-text-primary">da1u0om3kjvs738777cg</span></div>
            <div>RAW EVIDENCE SHA256: <span className="text-text-primary">ec0f2cea637f433f9d134d05a7168b3114b4526c2f5483288efbdea01d83e8e4</span></div>
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
