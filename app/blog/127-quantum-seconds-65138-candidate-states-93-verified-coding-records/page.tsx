import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertCircle, FileText, Database, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: '127 Quantum Seconds, 65,138 Candidate States & 93 Verified Records — Q-Psi Blog',
  description:
    'Physical-QPU state selection connected to executable software verification: 127.58 quantum seconds on IBM Heron yielding 93 verified coding records.',
};

export default function ArticleDataFoundryPage() {
  const df = siteConfig.dataFoundry;

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
              QUANTUM-ASSISTED DATA FOUNDRY &bull; EXP-04-DATA-FOUNDRY-V2
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            127 Quantum Seconds, 65,138 Candidate States and 93 Verified Coding Records
          </h1>

          <div className="text-sm font-mono text-text-secondary">
            Physical-QPU state selection connected to executable software verification.
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
            <div>BY: <strong className="text-text-primary">Q-Psi Research Team</strong></div>
            <div>&bull;</div>
            <div>RUNTIME: <strong className="text-text-primary">{df.quantumSeconds}s (332,768 shots)</strong></div>
            <div>&bull;</div>
            <div>PROVENANCE: <strong className="text-[#15803D]">100.0% (93/93)</strong></div>
          </div>
        </div>

        <div className="space-y-8 text-sm font-sans text-text-secondary leading-relaxed border-t border-border pt-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">1. The Research Question</h2>
            <p>
              Can a physical quantum processor act as a causal combinatorial state selector to explore complex repository mutation universes, with classical executable test suites acting as automated ground-truth filters?
            </p>
            <p>
              In our Data Foundry V2 campaign, we tested this end-to-end architecture on IBM Heron r2 (<code>ibm_marrakesh</code>).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">2. The 120-Quantum-Second Campaign Numbers</h2>
            <div className="p-5 bg-surface-subtle border border-border rounded-lg font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span>State Space Size (16 Selector Qubits):</span>
                <strong>{df.universeSize.toLocaleString()} discrete states</strong>
              </div>
              <div className="flex justify-between">
                <span>Physical Shots Executed:</span>
                <strong>{df.shots.toLocaleString()} shots</strong>
              </div>
              <div className="flex justify-between">
                <span>Active Quantum Execution Seconds:</span>
                <strong>{df.quantumSeconds} seconds (4 production jobs)</strong>
              </div>
              <div className="flex justify-between">
                <span>Unique Candidate States Sampled:</span>
                <strong>{df.uniqueQpuStates.toLocaleString()} states (99.4% coverage)</strong>
              </div>
              <div className="flex justify-between">
                <span>Classical Sandbox Verifications:</span>
                <strong>{df.verifierProcessedCandidates} candidates evaluated</strong>
              </div>
              <div className="flex justify-between border-t border-border pt-1">
                <span>Verified Positive Code Records:</span>
                <strong className="text-[#15803D]">{df.verifiedPositiveRecords} unique repair records</strong>
              </div>
              <div className="flex justify-between">
                <span>Total Verified Dataset Size:</span>
                <strong>{df.datasetSizeMb} MB (~{df.approxTokenEquivalent.toLocaleString()} token-equivalent)</strong>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">3. The Classical Verification Throughput Bottleneck</h2>
            <p>
              A critical empirical discovery from this campaign is that <strong>candidate-state supply from the physical QPU exceeded classical verifier throughput</strong>.
            </p>
            <p>
              The quantum processor sampled 65,138 candidate states in 127.58 seconds of quantum execution. However, compiling and running full regression suites in isolated sandboxes evaluated 158 candidates in 246.3 seconds. Thus, scaling synthetic code data generation is bounded not by quantum sampling throughput, but by the parallel execution throughput of classical compilers and test runners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">4. Strict Scientific Boundaries</h2>
            <div className="p-4 bg-surface-raised border border-border rounded space-y-2 text-xs">
              <div className="font-bold text-[#D97706] uppercase">WHAT WAS NOT TESTED</div>
              <p className="text-text-secondary leading-relaxed">
                The experiment demonstrates mechanical pipeline feasibility only. Downstream LLM fine-tuning, benchmark evaluation, and code repair accuracy comparisons were <strong>NOT EVALUATED</strong>. No claim of quantum training advantage or superior model quality is made.
              </p>
            </div>
          </section>

          <section className="space-y-2 font-mono text-xs border-t border-border pt-6 text-text-muted">
            <div>DATA FOUNDRY PAGE: <Link href="/research/data-foundry" className="text-accent hover:underline">Quantum Data Foundry</Link></div>
            <div>RAW SAMPLE SHA256: <span className="text-text-primary">{df.boundary ? 'dfd11daa2f1f51b29e15019741363a3fd03672f8ccd562c52c4a762d656dc89f' : ''}</span></div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
