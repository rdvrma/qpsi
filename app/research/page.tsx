import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { EvidenceLine } from '@/components/ui/EvidenceLine';
import { ArrowUpRight, FileText, Database } from 'lucide-react';

export const metadata = {
  title: 'Research Programs — Q-Psi Independent Quantum Research',
  description: 'Overview of Q-Psi research programs: State-Space Compiler, Dynamic Bernstein-Vazirani, Restricted Simon, and Persistent World baseline.',
};

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              RESEARCH OVERVIEW &bull; ACTIVE STREAMS
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
          {/* Stream 1: Flagship Compiler Grover Query Advantage */}
          <div className="scientific-card p-8 space-y-5 bg-surface-raised border border-border flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-mono font-bold text-accent">STREAM 01</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#16A34A]/10 text-[#15803D] rounded border border-[#16A34A]/25">
                  QUERY ADVANTAGE SUPPORTED
                </span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">
                Compiler-Enabled Quantum Query Advantage (v1.1)
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                Authentic software-repair candidate spaces mapped to Grover amplitude amplification on <code>ibm_marrakesh</code> (Job da1c7rkdedkc73eqs5mg). Quantum effective queries beat classical expected cost across 9/9 cases and 3/3 problem sizes (N=4, 8, 16; 95% CI upper bound 7.360 &lt; 8.5).
              </p>
              <div className="pt-2">
                <EvidenceLine status="SUPPORTED" claimLabel="COMPILER QUERY ADVANTAGE SUPPORTED" />
              </div>
            </div>
            <div className="pt-4 border-t border-border flex items-center space-x-4">
              <Link href="/research/compiler-grover-query-advantage" className="text-xs font-sans font-semibold text-accent hover:underline flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Read Research Note</span>
              </Link>
              <Link href="/compiler" className="text-xs font-sans font-semibold text-text-secondary hover:text-text-primary flex items-center space-x-1">
                <span>Compiler Details &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Stream 2: Dynamic BV Query Advantage */}
          <div className="scientific-card p-8 space-y-5 bg-surface-raised border border-border flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-mono font-bold text-accent">STREAM 02</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#16A34A]/10 text-[#15803D] rounded border border-[#16A34A]/25">
                  QUERY ADVANTAGE SUPPORTED
                </span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">
                Dynamic Bernstein-Vazirani Experiment
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                Single-shot dynamic oracle experiment evaluating time-to-solution scaling on <code>ibm_marrakesh</code>. Measured quantum scaling exponent \(\alpha_Q = 0.1532\) vs classical \(\alpha_C = 0.6963\) (\(t = -30.65, p = 3.47 \times 10^{-7}\)), demonstrating quantum query-complexity advantage.
              </p>
              <div className="pt-2">
                <EvidenceLine status="SUPPORTED" claimLabel="QUANTUM ADVANTAGE SUPPORTED" />
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <Link href="/experiments" className="text-xs font-sans font-semibold text-accent hover:underline flex items-center space-x-1">
                <span>View Dynamic BV Benchmarks</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Stream 3: Restricted Simon Experiment */}
          <div className="scientific-card p-8 space-y-5 bg-surface-raised border border-border flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-mono font-bold text-accent">STREAM 03</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#D97706]/10 text-[#B45309] rounded border border-[#D97706]/25">
                  56-QUBIT EXECUTION VALID
                </span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">
                Restricted-Hamming-Weight Simon Experiment
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                Constant-depth (15-16 layers) circuit execution across 16 to 56 physical qubits on <code>ibm_marrakesh</code>. Exact period recovered on a subset of instances. Universal asymptotic speedup on raw unmitigated hardware remains inconclusive.
              </p>
              <div className="pt-2">
                <EvidenceLine status="INCONCLUSIVE" claimLabel="SPEEDUP INCONCLUSIVE" />
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <Link href="/experiments" className="text-xs font-sans font-semibold text-accent hover:underline flex items-center space-x-1">
                <span>View Simon Results</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Stream 4: State-Space Compiler Stage-6F Interoperability */}
          <div className="scientific-card p-8 space-y-5 bg-surface-raised border border-border flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-mono font-bold text-accent">STREAM 04</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#16A34A]/10 text-[#15803D] rounded border border-[#16A34A]/25">
                  INTEROPERABILITY PASS
                </span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">
                State-Space Compiler (Stage-6F)
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                Compiles multi-repository software-repair search spaces into discrete QUBO/Ising Hamiltonians executed on physical IBM Quantum processors. Exact classical parity achieved on instances with N &le; 10. NISQ gate-depth boundaries evaluated for N &ge; 18.
              </p>
              <div className="pt-2">
                <EvidenceLine status="SUPPORTED" claimLabel="INTEROPERABILITY PASS" />
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <Link href="/compiler" className="text-xs font-sans font-semibold text-accent hover:underline flex items-center space-x-1">
                <span>Explore Compiler Architecture</span>
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
