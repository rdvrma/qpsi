import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ArrowUpRight, AlertCircle, FileText, Database, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Fractional Gate Lowering — Q-Psi Research Note',
  description:
    'Pulse-level duration reduction vs physical fidelity on IBM Heron: 2 wins, 4 inconclusive cases supporting mixed physical signal.',
};

export default function FractionalGateLoweringResearchNotePage() {
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
            RESEARCH NOTE &bull; TIER C MIXED EVIDENCE
          </div>
        </div>

        {/* Masthead */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#64748B]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#64748B]">
              PHYSICAL QPU RESEARCH NOTE &bull; EXP-10-FRACTIONAL-GATES
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Pulse-Level Fractional Gate Lowering on IBM Heron
          </h1>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
            <div>AUTHORS: <strong className="text-text-primary">Q-Psi Research Team</strong></div>
            <div>&bull;</div>
            <div>BACKEND: <strong className="text-text-primary">ibm_marrakesh (Heron r2)</strong></div>
            <div>&bull;</div>
            <div>STATUS: <strong className="text-text-primary">MIXED / INCONCLUSIVE</strong></div>
          </div>
        </div>

        {/* Abstract Box */}
        <div className="scientific-card p-6 sm:p-8 space-y-3 bg-surface-raised border border-border">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
            ABSTRACT
          </div>
          <p className="text-sm font-sans text-text-primary leading-relaxed">
            We evaluate whether pulse-level fractional gate decomposition (synthesizing continuous R_ZZ(&theta;) pulses directly instead of decomposing into discrete CZ pairs) improves physical execution fidelity on IBM Heron (<code>ibm_marrakesh</code>, Job <code>da1tg6eg52gs73cm3gg0</code>, 24,576 shots). While pulse schedules achieved structural gate duration reductions of up to 40%, physical execution yielded 2/6 conclusive wins (<code>N4_B</code>, <code>N8_B</code>) and 4/6 inconclusive cases within noise margins. The technique is classified as a <strong>mixed physical signal</strong>.
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-sm font-sans text-text-secondary leading-relaxed border-t border-border pt-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">1. Motivation</h2>
            <p>
              Standard circuit compilation synthesizes arbitrary two-qubit interactions using discrete basis gates (such as CZ or CNOT). On physical superconducting qubits, direct calibrated fractional pulses can in theory reduce total microwave drive time and reduce decoherence.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">2. Empirical Results on IBM Heron r2</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border border-border">
                <thead className="bg-surface-subtle border-b border-border text-left">
                  <tr>
                    <th className="p-3">Case</th>
                    <th className="p-3">Qubits</th>
                    <th className="p-3">Fractional Fidelity</th>
                    <th className="p-3">Discrete CZ Fidelity</th>
                    <th className="p-3">&Delta;(F_frac - F_cz)</th>
                    <th className="p-3">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-3 font-bold">N4_A</td>
                    <td className="p-3">4</td>
                    <td className="p-3">0.9120</td>
                    <td className="p-3">0.9085</td>
                    <td className="p-3 text-text-muted">+0.0035</td>
                    <td className="p-3 text-text-muted">Inconclusive</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">N4_B</td>
                    <td className="p-3">4</td>
                    <td className="p-3 font-bold text-accent">0.8950</td>
                    <td className="p-3">0.8620</td>
                    <td className="p-3 text-[#15803D] font-bold">+0.0330</td>
                    <td className="p-3 text-[#15803D] font-bold">Physical Win</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">N6_A</td>
                    <td className="p-3">6</td>
                    <td className="p-3">0.7840</td>
                    <td className="p-3">0.7790</td>
                    <td className="p-3 text-text-muted">+0.0050</td>
                    <td className="p-3 text-text-muted">Inconclusive</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">N6_B</td>
                    <td className="p-3">6</td>
                    <td className="p-3">0.7610</td>
                    <td className="p-3">0.7580</td>
                    <td className="p-3 text-text-muted">+0.0030</td>
                    <td className="p-3 text-text-muted">Inconclusive</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">N8_A</td>
                    <td className="p-3">8</td>
                    <td className="p-3">0.6850</td>
                    <td className="p-3">0.6810</td>
                    <td className="p-3 text-text-muted">+0.0040</td>
                    <td className="p-3 text-text-muted">Inconclusive</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">N8_B</td>
                    <td className="p-3">8</td>
                    <td className="p-3 font-bold text-accent">0.6520</td>
                    <td className="p-3">0.6190</td>
                    <td className="p-3 text-[#15803D] font-bold">+0.0330</td>
                    <td className="p-3 text-[#15803D] font-bold">Physical Win</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">3. Conclusion &amp; Boundary</h2>
            <p>
              While fractional pulse lowering showed definite physical improvements on selected parameterized instances, 4 out of 6 cases remained within statistical noise bounds. Universal fidelity superiority is not claimed.
            </p>
          </section>

          <section className="space-y-2 font-mono text-xs border-t border-border pt-6 text-text-muted">
            <div>IBM RUNTIME JOB ID: <span className="text-text-primary">da1tg6eg52gs73cm3gg0</span></div>
            <div>RAW EVIDENCE SHA256: <span className="text-text-primary">8a5cb81cf1b069baed93926ab75fcd9dd37a589c6d220aa41455293f2ebc23ae</span></div>
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
