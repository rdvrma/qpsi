import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertCircle, Database, FileText, ShieldCheck, Cpu, Layers, Sparkles, Workflow } from 'lucide-react';

export const metadata = {
  title: 'Quantum-Assisted Data Foundry — Q-Psi Physical-QPU Research',
  description:
    'Physical-QPU state selection connected to executable software verification: 127.58 quantum seconds on IBM Heron r2 yielding 93 verified coding records.',
};

export default function DataFoundryPage() {
  const df = siteConfig.dataFoundry;

  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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
            TIER A LEAD RESEARCH &bull; EXPERIMENT V2 (120-QSEC)
          </div>
        </div>

        {/* Masthead */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              PHYSICAL-QPU DATA GENERATION PIPELINE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Quantum-Assisted Data Foundry
          </h1>
          <p className="text-lg text-text-secondary font-sans leading-relaxed">
            Physical-QPU state selection connected to executable software verification.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
            <div>CAMPAIGN: <strong className="text-text-primary">QPSI_QUANTUM_DATA_FOUNDRY_CODING_V2_120QSEC</strong></div>
            <div>&bull;</div>
            <div>BACKEND: <strong className="text-text-primary">ibm_marrakesh (Heron r2)</strong></div>
            <div>&bull;</div>
            <div>AUDIT STATUS: <strong className="text-[#15803D]">SUPPORTED WITH QUALIFICATION</strong></div>
          </div>
        </div>

        {/* Abstract & Summary Box */}
        <div className="scientific-card p-6 sm:p-8 space-y-4 bg-surface-raised border border-border">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>EXECUTIVE RESEARCH SUMMARY</span>
          </div>
          <p className="text-sm font-sans text-text-primary leading-relaxed">
            Q-Psi demonstrated a physical-QPU-assisted coding-data pipeline in which QPU measurement samples causally selected repository mutation states that were converted by executable software verifiers into <strong>93 unique verified repair records</strong>.
          </p>
          <p className="text-xs font-sans text-text-secondary leading-relaxed">
            The experiment demonstrates mechanical pipeline feasibility, not improved model quality or quantum advantage. Downstream LLM fine-tuning was not evaluated.
          </p>
        </div>

        {/* End-to-End Visual Pipeline */}
        <div className="scientific-card p-8 bg-surface-raised border border-border space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              SYSTEM ARCHITECTURE
            </div>
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              Data Foundry End-to-End Pipeline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 text-xs font-mono">
            <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5 flex flex-col justify-between">
              <div className="text-accent font-bold text-[10px]">1. REPOSITORY</div>
              <div className="font-bold text-text-primary text-[11px]">Source Universe</div>
              <div className="text-[10px] text-text-secondary font-sans">Multi-file software codebases</div>
            </div>

            <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5 flex flex-col justify-between">
              <div className="text-accent font-bold text-[10px]">2. STATE SPACE</div>
              <div className="font-bold text-text-primary text-[11px]">65,536 States</div>
              <div className="text-[10px] text-text-secondary font-sans">16 selector qubits</div>
            </div>

            <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5 flex flex-col justify-between">
              <div className="text-accent font-bold text-[10px]">3. QPU SAMPLER</div>
              <div className="font-bold text-text-primary text-[11px]">IBM Heron r2</div>
              <div className="text-[10px] text-text-secondary font-sans">332,768 shots &bull; 127.58s</div>
            </div>

            <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5 flex flex-col justify-between">
              <div className="text-accent font-bold text-[10px]">4. CANDIDATE QUEUE</div>
              <div className="font-bold text-text-primary text-[11px]">65,138 States</div>
              <div className="text-[10px] text-text-secondary font-sans">Unique sampled mutations</div>
            </div>

            <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5 flex flex-col justify-between">
              <div className="text-accent font-bold text-[10px]">5. VERIFIER</div>
              <div className="font-bold text-text-primary text-[11px]">Classical Tests</div>
              <div className="text-[10px] text-text-secondary font-sans">158 evaluated sandbox cases</div>
            </div>

            <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5 flex flex-col justify-between">
              <div className="text-accent font-bold text-[10px]">6. DATASET</div>
              <div className="font-bold text-text-primary text-[11px]">93 Positives</div>
              <div className="text-[10px] text-text-secondary font-sans">1.593 MB verified records</div>
            </div>
          </div>
        </div>

        {/* Audited Numerical Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="scientific-card p-5 bg-surface-raised border border-border rounded space-y-1">
            <div className="text-[10px] text-text-muted uppercase font-bold">STATE UNIVERSE</div>
            <div className="text-2xl font-serif font-bold text-text-primary">{df.universeSize.toLocaleString()}</div>
            <div className="text-[11px] text-text-secondary font-sans">Across 16 selector qubits</div>
          </div>

          <div className="scientific-card p-5 bg-surface-raised border border-border rounded space-y-1">
            <div className="text-[10px] text-text-muted uppercase font-bold">QPU SAMPLES (SHOTS)</div>
            <div className="text-2xl font-serif font-bold text-text-primary">{df.shots.toLocaleString()}</div>
            <div className="text-[11px] text-text-secondary font-sans">Across 4 production jobs</div>
          </div>

          <div className="scientific-card p-5 bg-surface-raised border border-border rounded space-y-1">
            <div className="text-[10px] text-text-muted uppercase font-bold">ACTIVE QUANTUM RUNTIME</div>
            <div className="text-2xl font-serif font-bold text-text-primary">{df.quantumSeconds}s</div>
            <div className="text-[11px] text-text-secondary font-sans">IBM Runtime quantum execution</div>
          </div>

          <div className="scientific-card p-5 bg-surface-raised border border-border rounded space-y-1">
            <div className="text-[10px] text-text-muted uppercase font-bold">VERIFIED POSITIVES</div>
            <div className="text-2xl font-serif font-bold text-[#15803D]">{df.verifiedPositiveRecords} Records</div>
            <div className="text-[11px] text-text-secondary font-sans">100.0% QPU provenance match</div>
          </div>
        </div>

        {/* Critical Qualification & Bottleneck Disclosures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bottleneck Disclosure */}
          <div className="scientific-card p-6 bg-surface-raised border-l-4 border-accent rounded-r-lg border-y border-r border-border space-y-3 font-sans">
            <div className="flex items-center space-x-2 text-accent font-mono text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>CURRENT SYSTEM BOTTLENECK</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-text-primary">
              Classical Verification Throughput
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Candidate-state supply exceeded current classical verifier throughput. In the 120-Qsec campaign, the physical QPU supplied <strong>65,138 unique candidate states</strong> within 127.58 seconds of quantum execution, while classical test execution sandboxes evaluated 158 candidates in 246.3 seconds.
            </p>
            <div className="font-mono text-xs text-text-muted pt-1">
              Supply: 65,138 QPU states &bull; Evaluated: 158 candidates &bull; Positives: 93
            </div>
          </div>

          {/* Claim Boundary */}
          <div className="scientific-card p-6 bg-surface-raised border-l-4 border-[#64748B] rounded-r-lg border-y border-r border-border space-y-3 font-sans">
            <div className="flex items-center space-x-2 text-[#64748B] font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>SCIENTIFIC BOUNDARIES</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-text-primary">
              What Was NOT Tested
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              {df.boundary}
            </p>
            <p className="text-xs text-text-secondary leading-relaxed">
              No claim is made that quantum-selected datasets produce superior model accuracy compared to classical data synthesis, or that language models trained on these records outperform baseline models.
            </p>
          </div>
        </div>

        {/* Campaign Execution Details */}
        <div className="scientific-card p-8 bg-surface-raised border border-border rounded-lg space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="font-bold text-text-primary uppercase tracking-wider">
              PRODUCTION EXECUTION AUDIT (IBM MARRAKESH &bull; HERON r2)
            </span>
            <span className="text-[#15803D] font-bold">100% PROVENANCE MATCH</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] text-text-secondary">
            <div className="space-y-1">
              <div>JOB 1: <code className="text-text-primary">da1vjh4dedkc73erijq0</code> (83,192 shots &bull; 31.90s)</div>
              <div>JOB 2: <code className="text-text-primary">da1vjmeg52gs73cm5us0</code> (83,192 shots &bull; 31.90s)</div>
              <div>JOB 3: <code className="text-text-primary">da1vk3mg52gs73cm607g</code> (83,192 shots &bull; 31.90s)</div>
              <div>JOB 4: <code className="text-text-primary">da1vke63kjvs738795og</code> (83,192 shots &bull; 31.88s)</div>
            </div>
            <div className="space-y-1">
              <div>DATASET SIZE: <strong className="text-text-primary">1.593 MB</strong> ({df.approxTokenEquivalent.toLocaleString()} token-eq)</div>
              <div>TRAINING SCHEMA VALIDATION: <strong className="text-[#15803D]">PASS</strong></div>
              <div>ONE-MINIBATCH SMOKE TEST: <strong className="text-[#15803D]">PASS</strong></div>
              <div>CAUSAL PROVENANCE CHECK: <strong className="text-[#15803D]">93 / 93 MATCH (100.0%)</strong></div>
            </div>
          </div>
        </div>

        {/* Links & Next Steps */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
          <Link
            href="/blog/127-quantum-seconds-65138-candidate-states-93-verified-coding-records"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover transition-colors shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Read Data Foundry Research Article</span>
          </Link>
          <Link
            href="/evidence"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-surface-subtle border border-border text-text-primary font-sans text-xs font-semibold rounded hover:border-border-hover transition-colors"
          >
            <Database className="w-3.5 h-3.5 text-accent" />
            <span>Inspect Evidence Registry</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
