import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { EvidenceLine } from '@/components/ui/EvidenceLine';
import { ArrowUpRight, Cpu, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'State-Space Compiler — Q-Psi Independent Quantum Research',
  description: 'Q-Psi State-Space Compiler research: mapping software repair search universes into QUBO/Ising Hamiltonians for physical QPU execution.',
};

export default function CompilerPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              COMPILER RESEARCH
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Q-Psi State-Space Compiler
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            The Q-Psi compiler automates the translation of discrete software-repair search universes into binary quadratic optimization Hamiltonians mapped for physical superconducting quantum hardware.
          </p>
        </div>

        {/* Technical Pipeline Overview */}
        <div className="scientific-card p-8 space-y-6 bg-surface-raised border border-border">
          <h2 className="text-2xl font-serif font-bold text-text-primary">
            Mathematical Compilation Pipeline
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
            <div className="p-4 bg-surface-subtle border border-border rounded space-y-2">
              <div className="text-accent font-bold">1. STATE FORMULATION</div>
              <p className="text-text-secondary font-sans leading-relaxed">
                Formulates candidate repair state spaces from 8 programming language ecosystems into linear and quadratic cost matrices.
              </p>
            </div>
            <div className="p-4 bg-surface-subtle border border-border rounded space-y-2">
              <div className="text-accent font-bold">2. ISING TRANSFORMATION</div>
              <p className="text-text-secondary font-sans leading-relaxed">
                Applies exact analytical bijection x_i = (1 - Z_i)/2 to map binary decision variables onto spin-1/2 Pauli Z Hamiltonians.
              </p>
            </div>
            <div className="p-4 bg-surface-subtle border border-border rounded space-y-2">
              <div className="text-accent font-bold">3. PHYSICAL QPU ROUTING</div>
              <p className="text-text-secondary font-sans leading-relaxed">
                Transpiles interaction graphs into QAOA p=1 circuits optimized for IBM Quantum 156-qubit heavy-hex coupling topologies.
              </p>
            </div>
          </div>

          <div className="p-4 bg-surface-subtle border border-border rounded text-xs font-mono space-y-2">
            <div className="flex flex-wrap items-center justify-between text-text-primary font-bold gap-2">
              <span>PHYSICAL QPU BENCHMARK RESULT (ibm_marrakesh — 156 programmable qubits)</span>
              <span className="text-status-pass font-bold px-2 py-0.5 bg-[#16A34A]/10 text-[#15803D] rounded border border-[#16A34A]/25">
                INTEROPERABILITY PASS (COMPILER ADVANTAGE: NOT YET ESTABLISHED)
              </span>
            </div>
            <p className="text-text-secondary leading-relaxed font-sans text-xs">
              Recovered exact global classical optimum on 100% of small instances (N &le; 10). Characterized NISQ gate-depth scaling boundary on larger instances (N &ge; 18). Full cohort standard median energy gap: 0.1250. <strong>Compiler-specific quantum advantage is not yet proven over classical solvers.</strong>
            </p>
          </div>

          <div className="pt-2">
            <EvidenceLine status="SUPPORTED" claimLabel="INTEROPERABILITY PASS" />
          </div>
        </div>

        {/* Compiler Evaluation Access Flow */}
        <div className="scientific-card p-8 sm:p-12 space-y-8 bg-surface-raised border border-border">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center space-x-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>COMPILER ACCESS BOUNDARY &amp; RESEARCH STATUS</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-text-primary">
              Compiler External Access Status
            </h2>
            <p className="text-sm text-text-secondary font-sans leading-relaxed">
              Public evaluation access to the Q-Psi State-Space Compiler is currently closed. Q-Psi will first conduct the compiler-specific quantum-advantage validation stage. Proprietary compiler source code is preserved securely outside public web repositories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Box A: Evaluation Access Status */}
            <div className="p-6 bg-surface-subtle border border-border rounded space-y-4">
              <div className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider flex items-center justify-between">
                <span>1. RESEARCH EVALUATION ACCESS</span>
                <span className="text-[#B45309] font-bold px-2 py-0.5 bg-[#D97706]/10 rounded border border-[#D97706]/25 text-[10px]">
                  NOT YET OPEN
                </span>
              </div>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                Evaluation access is paused pending completion of the compiler-specific quantum-advantage validation campaign.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center space-x-2 px-4 py-2 bg-surface-raised border border-border text-text-secondary font-mono text-xs font-bold uppercase tracking-wider rounded">
                  <span>COMPILER ACCESS — COMING AFTER NEXT VALIDATION STAGE</span>
                </span>
              </div>
            </div>

            {/* Box B: Research Inquiries & Licensing */}
            <div className="p-6 bg-surface-subtle border border-border rounded space-y-4">
              <div className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider">
                2. FUTURE RESEARCH &amp; LICENSING INQUIRIES
              </div>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                Academic laboratories, quantum computing groups, and industrial partners may direct future research collaboration and licensing inquiries to the research team.
              </p>
              <ul className="text-xs font-sans text-text-muted space-y-1.5">
                <li>&bull; Future QPU backend integration terms</li>
                <li>&bull; Academic quantum compilation research partnerships</li>
                <li>&bull; Direct correspondence with founder</li>
              </ul>
              <div className="pt-2 text-xs font-sans text-text-primary">
                Contact: <a href={`mailto:${siteConfig.contact.email}`} className="text-accent font-semibold hover:underline">{siteConfig.contact.email}</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
