import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowUpRight, Cpu, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'State-Space Compiler — Q-Psi Independent Quantum Research',
  description: 'Q-Psi State-Space Compiler research: mapping software repair search universes into QUBO/Ising Hamiltonians for physical QPU execution.',
};

export default function CompilerPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
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
        <div className="bg-surface-raised border border-border p-8 rounded-lg space-y-6">
          <h2 className="text-2xl font-serif font-bold text-text-primary">
            Mathematical Compilation Pipeline
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
            <div className="p-4 bg-surface border border-border rounded space-y-2">
              <div className="text-accent font-bold">1. STATE FORMULATION</div>
              <p className="text-text-secondary font-sans leading-relaxed">
                Formulates candidate repair state spaces from 8 programming language ecosystems into linear and quadratic cost matrices.
              </p>
            </div>
            <div className="p-4 bg-surface border border-border rounded space-y-2">
              <div className="text-accent font-bold">2. ISING TRANSFORMATION</div>
              <p className="text-text-secondary font-sans leading-relaxed">
                Applies exact analytical bijection x_i = (1 - Z_i)/2 to map binary decision variables onto spin-1/2 Pauli Z Hamiltonians.
              </p>
            </div>
            <div className="p-4 bg-surface border border-border rounded space-y-2">
              <div className="text-accent font-bold">3. PHYSICAL QPU ROUTING</div>
              <p className="text-text-secondary font-sans leading-relaxed">
                Transpiles interaction graphs into QAOA p=1 circuits optimized for IBM Quantum 156-qubit heavy-hex coupling topologies.
              </p>
            </div>
          </div>

          <div className="p-4 bg-surface border border-border rounded text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-text-primary font-bold">
              <span>PHYSICAL QPU BENCHMARK RESULT (ibm_marrakesh)</span>
              <span className="text-status-pass">INTEROPERABILITY PASS</span>
            </div>
            <p className="text-text-secondary leading-relaxed font-sans text-xs">
              Recovered exact global classical optimum on 100% of small instances (N &le; 10). Characterized NISQ gate-depth scaling boundary on larger instances (N &ge; 18). Full cohort standard median energy gap: 0.1250. <strong>No quantum advantage is claimed for the compiler over classical solvers.</strong>
            </p>
          </div>
        </div>

        {/* Compiler Evaluation Access Flow */}
        <div className="bg-surface-raised border border-border p-8 sm:p-12 rounded-lg space-y-8">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center space-x-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>RESEARCH ACCESS &amp; EVALUATION MODEL</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-text-primary">
              Compiler Research Evaluation Access
            </h2>
            <p className="text-sm text-text-secondary font-sans leading-relaxed">
              Proprietary compiler source code is preserved securely outside the public website repository. Academic labs, quantum software groups, and corporate researchers may request evaluation access following research contribution guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Box A: Evaluation Access */}
            <div className="p-6 bg-surface border border-border rounded-lg space-y-4">
              <div className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider">
                1. RESEARCH EVALUATION ACCESS
              </div>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                For researchers wanting to test compiled benchmarks or evaluate Q-Psi compiler output on custom search spaces.
              </p>
              <ul className="text-xs font-mono text-text-muted space-y-2">
                <li>• Includes benchmark evaluation binaries &amp; test outputs</li>
                <li>• Does NOT convey IP rights or source code ownership</li>
                <li>• Includes 24-hour setup response guarantee</li>
              </ul>
              <div className="pt-2">
                <a
                  href={`mailto:${siteConfig.contact.email}?subject=Q-Psi%20Compiler%20Research%20Evaluation%20Access`}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-accent-hover transition-all"
                >
                  <span>REQUEST EVALUATION ACCESS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Box B: Full Commercial License */}
            <div className="p-6 bg-surface border border-border rounded-lg space-y-4">
              <div className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider">
                2. FULL PROJECT / COMMERCIAL LICENSE
              </div>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                For industrial deployment, enterprise software repair integration, or dedicated quantum compiler licensing.
              </p>
              <ul className="text-xs font-mono text-text-muted space-y-2">
                <li>• Dedicated commercial licensing &amp; architecture terms</li>
                <li>• Custom QPU backend integration (IBM, Rigetti, IonQ)</li>
                <li>• Handled via direct correspondence with founder</li>
              </ul>
              <div className="pt-2 text-xs font-mono text-text-primary">
                Contact: <a href={`mailto:${siteConfig.contact.email}`} className="text-accent font-bold hover:underline">{siteConfig.contact.email}</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
