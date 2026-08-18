import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ArrowUpRight, AlertCircle, FileText, Database, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Calibration-Aware Layout vs Qiskit — Q-Psi Research Note',
  description:
    'Negative comparator study evaluating Q-Psi calibration-aware layout against strong Qiskit O3 best-of-8 seeds on IBM Heron r2.',
};

export default function CalibrationLayoutResearchNotePage() {
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
            RESEARCH NOTE &bull; TIER C PRESERVED NEGATIVE EVIDENCE
          </div>
        </div>

        {/* Masthead */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#DC2626]">
              PRESERVED NEGATIVE COMPARATOR &bull; EXP-09-CALIBRATION-LAYOUT
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Calibration-Aware Layout vs Qiskit O3 Best-of-8 Seeds
          </h1>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
            <div>AUTHORS: <strong className="text-text-primary">Q-Psi Research Team</strong></div>
            <div>&bull;</div>
            <div>BACKEND: <strong className="text-text-primary">ibm_marrakesh (Heron r2)</strong></div>
            <div>&bull;</div>
            <div>STATUS: <strong className="text-[#DC2626]">NOT SUPPORTED</strong></div>
          </div>
        </div>

        {/* Abstract Box */}
        <div className="scientific-card p-6 sm:p-8 space-y-3 bg-surface-raised border border-border">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
            ABSTRACT
          </div>
          <p className="text-sm font-sans text-text-primary leading-relaxed">
            We report empirical findings evaluating a graph-based calibration-aware qubit placement pass against a strong industrial baseline of Qiskit Optimization Level 3 evaluated across best-of-8 random layout seeds (<code>ibm_marrakesh</code>, 156 programmable qubits, Job <code>da1tm0eg52gs73cm3mh0</code>, 36,864 shots). Across 6 benchmark instances, Q-Psi achieved 1 win, 2 losses, and 3 inconclusive outcomes (aggregate mean fidelity delta \(-0.0106\)). The hypothesis that single-pass calibration-aware layout outperforms multi-seed search is <strong>NOT SUPPORTED</strong>. This result is preserved and published in full to document authentic open science.
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-sm font-sans text-text-secondary leading-relaxed border-t border-border pt-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">1. Hypothesis &amp; Motivation</h2>
            <p>
              Hardware calibration parameters (single-qubit readout error, two-qubit CZ gate error, and T1/T2 coherence times) fluctuate across heavy-hex QPU fabrics. We hypothesized that a deterministic graph placement engine weighting physical calibration graphs would consistently outperform classical stochastic layout search.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">2. Empirical Results on IBM Heron r2</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border border-border">
                <thead className="bg-surface-subtle border-b border-border text-left">
                  <tr>
                    <th className="p-3">Workload</th>
                    <th className="p-3">Qubits</th>
                    <th className="p-3">Q-Psi Calibration Fidelity</th>
                    <th className="p-3">Qiskit O3 Best-of-8 Fidelity</th>
                    <th className="p-3">&Delta;(Q-Psi - Qiskit)</th>
                    <th className="p-3">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-3 font-bold">CASE_01_BV8</td>
                    <td className="p-3">8</td>
                    <td className="p-3">0.9120</td>
                    <td className="p-3">0.9105</td>
                    <td className="p-3 text-[#15803D] font-bold">+0.0015</td>
                    <td className="p-3 text-text-muted">Inconclusive</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">CASE_02_GHZ8</td>
                    <td className="p-3">8</td>
                    <td className="p-3">0.8650</td>
                    <td className="p-3">0.8840</td>
                    <td className="p-3 text-[#DC2626] font-bold">-0.0190</td>
                    <td className="p-3 text-[#DC2626]">Loss</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">CASE_03_QFT6</td>
                    <td className="p-3">6</td>
                    <td className="p-3">0.7210</td>
                    <td className="p-3">0.7420</td>
                    <td className="p-3 text-[#DC2626] font-bold">-0.0210</td>
                    <td className="p-3 text-[#DC2626]">Loss</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">CASE_04_RAND6</td>
                    <td className="p-3">6</td>
                    <td className="p-3">0.8350</td>
                    <td className="p-3">0.8120</td>
                    <td className="p-3 text-[#15803D] font-bold">+0.0230</td>
                    <td className="p-3 text-[#15803D]">Win</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">CASE_05_VQE8</td>
                    <td className="p-3">8</td>
                    <td className="p-3">0.6720</td>
                    <td className="p-3">0.6890</td>
                    <td className="p-3 text-text-muted">-0.0170</td>
                    <td className="p-3 text-text-muted">Inconclusive</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">CASE_06_GRAPH10</td>
                    <td className="p-3">10</td>
                    <td className="p-3">0.7810</td>
                    <td className="p-3">0.7930</td>
                    <td className="p-3 text-text-muted">-0.0120</td>
                    <td className="p-3 text-text-muted">Inconclusive</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">3. Why Preserving Negative Evidence Matters</h2>
            <p>
              In quantum computing literature, negative results against industrial toolchains are often discarded or &quot;fixed&quot; through unrecorded post-hoc tweaks. Q-Psi retains this experiment in the public record to document that strong stochastic baselines (Qiskit O3 best-of-8 seeds) remain highly effective on IBM Heron r2.
            </p>
          </section>

          <section className="space-y-2 font-mono text-xs border-t border-border pt-6 text-text-muted">
            <div>IBM RUNTIME JOB ID: <span className="text-text-primary">da1tm0eg52gs73cm3mh0</span></div>
            <div>RAW EVIDENCE SHA256: <span className="text-text-primary">5c5b9dff337488cb35d4fcc2de0efcbe2e63c05f1264ef05c8bb006e17df0eb6</span></div>
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
