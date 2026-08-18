import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ArrowUpRight, AlertCircle, FileText, Database, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Directed Execution Selection — Q-Psi Research Note',
  description:
    'Evaluating selective Pauli twirling on IBM Directed Execution beta mode: 58.9% overhead reduction with inconclusive fidelity non-inferiority.',
};

export default function DirectedExecutionResearchNotePage() {
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
            RESEARCH NOTE &bull; TIER C INCONCLUSIVE EVIDENCE
          </div>
        </div>

        {/* Masthead */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#64748B]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#64748B]">
              PHYSICAL QPU RESEARCH NOTE &bull; EXP-11-DIRECTED-EXEC
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Directed Execution &amp; Selective Pauli Twirling on Beta Hardware
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
            We evaluate whether risk-mass layer selection can reduce randomized compiling overhead on IBM Directed Execution beta mode without fidelity degradation (<code>ibm_marrakesh</code>, Job <code>da1u5o63kjvs73877cm0</code>, 24,576 shots). Selective twirling twirled only 41.1% of CZ layers (a 58.9% reduction in twirling overhead) and achieved 1 win against unmitigated raw circuits. However, non-inferiority compared to full Pauli twirling remained statistically inconclusive across 4 tested circuits.
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-sm font-sans text-text-secondary leading-relaxed border-t border-border pt-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">1. Protocol &amp; Motivation</h2>
            <p>
              Full Pauli twirling inserts random single-qubit gates before and after every two-qubit gate layer, requiring multiple randomized circuit variants. Our selective twirling algorithm prioritizes twirling on high-risk gate layers while executing low-risk layers deterministically.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">2. Empirical Status</h2>
            <p>
              While overhead reduction was mathematically verified (58.9% fewer twirled layers), physical fidelity non-inferiority was inconclusive due to high variance across randomized compilation runs on the beta execution endpoint.
            </p>
          </section>

          <section className="space-y-2 font-mono text-xs border-t border-border pt-6 text-text-muted">
            <div>IBM RUNTIME JOB ID: <span className="text-text-primary">da1u5o63kjvs73877cm0</span></div>
            <div>RAW EVIDENCE SHA256: <span className="text-text-primary">2ae1632ebe9645be032fb2a29f60eb669ecc8bd8712d68a5837039b5bd79a97a</span></div>
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
