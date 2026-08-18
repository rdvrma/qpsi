import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ArrowUpRight, AlertCircle, FileText, Database, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Restricted Simon Physical Study — Q-Psi Research Note',
  description:
    'Constant-depth circuit evaluation up to 28 qubits / 56 physical slots on IBM Heron: 6/12 recovered instances and noise-induced decoherence boundaries.',
};

export default function RestrictedSimonResearchNotePage() {
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
              PHYSICAL QPU RESEARCH NOTE &bull; EXP-12-SIMON
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Restricted Simon Algorithm on 56-Slot Physical Circuits
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
            We evaluate the scalability of constant-depth Simon oracles on IBM Heron across register sizes up to \(N = 28\) qubits (requiring up to 56 physical slots, Job <code>da1a0piein7c73bd5beg</code>, 24,576 shots). Physical measurement recovered secret periods on 6/12 instances with polynomial query reductions relative to classical sampling. However, two-qubit gate error accumulation at larger register sizes caused secret recovery failures on the remaining 6 instances. The hypothesis of asymptotic physical quantum speedup is <strong>INCONCLUSIVE</strong>.
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-sm font-sans text-text-secondary leading-relaxed border-t border-border pt-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">1. Protocol &amp; Physical Results</h2>
            <p>
              Secret reconstruction succeeded consistently on smaller registers (\(N=8, 12\)), achieving \(O(N)\) linear system reconstruction with high confidence. For \(N \ge 18\), multi-qubit cross-talk and measurement errors degraded the orthogonal subspace sampling purity below classical solvability thresholds.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">2. Scientific Boundaries</h2>
            <div className="p-4 bg-surface-raised border border-border rounded space-y-2 text-xs">
              <div className="font-bold text-[#64748B] uppercase">PRESERVED INCONCLUSIVE FINDING</div>
              <p className="text-text-secondary leading-relaxed">
                Asymptotic quantum advantage for Simon&apos;s algorithm on physical NISQ hardware requires fault-tolerant error correction or active mitigation. Unconditional asymptotic advantage is not claimed.
              </p>
            </div>
          </section>

          <section className="space-y-2 font-mono text-xs border-t border-border pt-6 text-text-muted">
            <div>IBM RUNTIME JOB ID: <span className="text-text-primary">da1a0piein7c73bd5beg</span></div>
            <div>RAW EVIDENCE SHA256: <span className="text-text-primary">aa22b8b023d03f9f64ccfc35b268f9dc3536fac149843938e67f0e381e4ef79a</span></div>
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
