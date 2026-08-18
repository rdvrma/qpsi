import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertCircle, FileText, Database, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Reusing Physical Qubits with Compiler Liveness Analysis on IBM Heron — Q-Psi Blog',
  description:
    'How compiler-driven mid-circuit measurement and dynamic reset reduced physical register width by a median 78.1% on IBM Heron with non-inferior observable fidelity.',
};

export default function ArticleQubitReusePage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Research Notes &amp; Blog</span>
          </Link>
          <div className="text-xs font-mono text-text-muted">
            RESEARCH ARTICLE &bull; TIER A FINDINGS
          </div>
        </div>

        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D97706]">
              COMPILER LIVENESS RESEARCH &bull; EXP-03-MCM-REUSE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Reusing Physical Qubits with Compiler Liveness Analysis on IBM Heron
          </h1>

          <div className="text-sm font-mono text-text-secondary">
            How compiler-driven mid-circuit measurement reduced physical register width by a median 78.1%.
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
            <div>BY: <strong className="text-text-primary">Q-Psi Research Team</strong></div>
            <div>&bull;</div>
            <div>HARDWARE: <strong className="text-text-primary">ibm_marrakesh (IBM Heron r2)</strong></div>
            <div>&bull;</div>
            <div>JOB ID: <code className="text-text-primary">da1u0om3kjvs738777cg</code></div>
          </div>
        </div>

        <div className="space-y-8 text-sm font-sans text-text-secondary leading-relaxed border-t border-border pt-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">1. The Register Width Problem in NISQ Hardware</h2>
            <p>
              In quantum algorithm design, logical qubits are traditionally assumed to persist for the entire duration of a circuit. However, on physical quantum hardware, maintaining idle qubits incurs continuous decoherence ($T_1/T_2$ decay) and spectator cross-talk errors.
            </p>
            <p>
              By performing static liveness analysis on the compiler&apos;s intermediate representation, the Q-Psi compiler identifies when a logical qubit&apos;s information has been fully extracted or measured. The physical slot is then reset ($|0\rangle$) and reassigned to a new logical wire.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">2. Experimental Execution on IBM Marrakesh</h2>
            <p>
              We evaluated 6 streaming benchmark circuits on IBM Heron r2 (24,576 shots total). Logical register requirements ranged from 8 to 16 qubits:
            </p>
            <div className="p-4 bg-surface-subtle border border-border rounded font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span>16 Logical Qubits (STREAM_16_A):</span>
                <strong className="text-accent">Compressed to 2 Physical Slots (87.5% reduction)</strong>
              </div>
              <div className="flex justify-between">
                <span>16 Logical Qubits (STREAM_16_B):</span>
                <strong className="text-accent">Compressed to 3 Physical Slots (81.3% reduction)</strong>
              </div>
              <div className="flex justify-between">
                <span>12 Logical Qubits (STREAM_12_A):</span>
                <strong className="text-accent">Compressed to 2 Physical Slots (83.3% reduction)</strong>
              </div>
              <div className="flex justify-between">
                <span>8 Logical Qubits (STREAM_8_A):</span>
                <strong className="text-accent">Compressed to 2 Physical Slots (75.0% reduction)</strong>
              </div>
              <div className="flex justify-between border-t border-border pt-1">
                <span>Median Physical Width Reduction:</span>
                <strong className="text-[#15803D]">78.1% Reduction</strong>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">3. Non-Inferiority Verification</h2>
            <p>
              Reducing physical register width is only useful if observable output fidelity is preserved. In 4 out of 6 cases, the reused circuit achieved <em>strictly lower</em> observable RMSE than the uncompressed circuit, because eliminating idle qubits reduced cumulative $T_1$ decoherence. All 6 cases satisfied the pre-declared non-inferiority margin ($\epsilon = 0.05$).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">4. Structural Claim Boundary</h2>
            <div className="p-4 bg-surface-raised border border-border rounded space-y-2 text-xs">
              <div className="font-bold text-[#D97706] uppercase">EXPLICIT SCIENTIFIC SCOPE</div>
              <p className="text-text-secondary leading-relaxed">
                Qubit reuse is mathematically bounded by the treewidth and sequential liveness graph of the workload. Workloads with all-to-all simultaneous entanglement cannot be compressed without swapping overhead. We do not claim 16-qubit quantum computing generally runs on 2 qubits.
              </p>
            </div>
          </section>

          <section className="space-y-2 font-mono text-xs border-t border-border pt-6 text-text-muted">
            <div>RESEARCH NOTE LINK: <Link href="/research/mcm-qubit-reuse" className="text-accent hover:underline">Mid-Circuit Measurement Research Note</Link></div>
            <div>RAW RESULTS SHA256: <span className="text-text-primary">ec0f2cea637f433f9d134d05a7168b3114b4526c2f5483288efbdea01d83e8e4</span></div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
