import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowUpRight, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Research Programs — Q-Psi Independent Quantum Research',
  description: 'Overview of Q-Psi research programs: State-Space Compiler, Dynamic Bernstein-Vazirani, Restricted Simon, and Persistent World baseline.',
};

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              RESEARCH OVERVIEW
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Quantum Computing Research Programs
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            Q-Psi conducts open-science quantum software compilation research, physical-QPU algorithm evaluation, and reproducible benchmark studies on real superconducting hardware.
          </p>
        </div>

        {/* Research Streams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stream 1 */}
          <div className="bg-surface-raised border border-border p-8 rounded-lg space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-mono font-bold text-accent">STREAM 01</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-status-pass-bg text-status-pass rounded">
                QPU INTEROPERABILITY PASS
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              State-Space Compiler (Stage-6F)
            </h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Compiles large software-repair search spaces into discrete QUBO/Ising Hamiltonians executed on physical IBM Quantum processors. Exact classical parity achieved on instances with N &le; 10. NISQ gate-depth boundaries evaluated for N &ge; 18.
            </p>
            <div className="pt-2">
              <Link href="/compiler" className="text-xs font-mono font-bold text-accent hover:underline flex items-center space-x-1">
                <span>EXPLORE COMPILER DETAILS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Stream 2 */}
          <div className="bg-surface-raised border border-border p-8 rounded-lg space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-mono font-bold text-accent">STREAM 02</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-status-pass-bg text-status-pass rounded">
                QUERY ADVANTAGE SUPPORTED
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              Dynamic Bernstein-Vazirani Experiment
            </h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Single-shot dynamic oracle experiment evaluating time-to-solution scaling. Measured quantum scaling exponent alpha_Q = 0.1532 vs classical alpha_C = 0.6963 (p = 3.47e-7), proving genuine oracle query-complexity advantage.
            </p>
            <div className="pt-2">
              <Link href="/experiments" className="text-xs font-mono font-bold text-accent hover:underline flex items-center space-x-1">
                <span>VIEW DYNAMIC BV BENCHMARKS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Stream 3 */}
          <div className="bg-surface-raised border border-border p-8 rounded-lg space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-mono font-bold text-accent">STREAM 03</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-status-inconclusive-bg text-status-inconclusive rounded">
                56-QUBIT EXECUTION VALID
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              Restricted-Hamming-Weight Simon Experiment
            </h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Constant-depth (15-16 layers) circuit execution across 16 to 56 physical qubits on ibm_marrakesh. Exact period recovered on a subset of instances. Universal asymptotic speedup on raw unmitigated hardware remains inconclusive.
            </p>
            <div className="pt-2">
              <Link href="/experiments" className="text-xs font-mono font-bold text-accent hover:underline flex items-center space-x-1">
                <span>VIEW SIMON RESULTS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Stream 4 — Prior Baseline */}
          <div className="bg-surface-raised border border-border p-8 rounded-lg space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-mono font-bold text-text-muted">PRIOR BASELINE WORK</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-surface border border-border rounded text-text-primary">
                PROTOTYPE Baseline
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              Persistent World Engine Baseline
            </h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Q-Psi prior baseline classical state persistence engine. Demonstrates two-character canonical state persistence, replayable event history, and bit-exact state recovery across restarts.
            </p>
            <div className="pt-2">
              <Link href="/prototype" className="text-xs font-mono font-bold text-accent hover:underline flex items-center space-x-1">
                <span>RUN CLASSICAL PROTOTYPE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
