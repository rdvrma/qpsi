import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { EvidenceLine } from '@/components/ui/EvidenceLine';
import { CheckCircle2, AlertCircle, HelpCircle, XCircle } from 'lucide-react';

export const metadata = {
  title: 'Verified Evidence Index — Q-Psi Independent Quantum Research',
  description: 'Machine-readable & human-readable verified evidence index, IBM Job IDs, SHA256 hashes, and physical QPU claim boundaries.',
};

export default function EvidencePage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              OPEN SCIENCE EVIDENCE INDEX
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Verified Evidence Index &amp; Claim Boundaries
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            Every public claim made by Q-Psi is bound to explicit scientific statuses, IBM Quantum runtime job IDs, physical QPU backends, and cryptographic evidence hashes.
          </p>
        </div>

        {/* Claims Table */}
        <div className="scientific-card overflow-hidden space-y-6 p-6 sm:p-8 bg-surface-raised border border-border">
          <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-xs">
            <span className="font-bold text-accent">INDEX VERSION 1.0.0</span>
            <span className="text-text-muted">FREEZE TIMESTAMP: 2026-08-17T06:00:00Z</span>
          </div>

          <div className="space-y-6">
            {siteConfig.claims.map((claim) => {
              return (
                <div
                  key={claim.id}
                  className="p-5 bg-surface-subtle border border-border rounded space-y-3 font-mono text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
                    <span className="font-bold text-text-primary">{claim.id}</span>
                    <span className="text-text-muted font-bold">
                      {claim.experiment}
                    </span>
                  </div>

                  <p className="text-sm font-sans font-semibold text-text-primary leading-relaxed">
                    {claim.statement}
                  </p>

                  {/* EvidenceLine Integration */}
                  <div className="pt-1">
                    <EvidenceLine
                      status={claim.status as any}
                      compact
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] text-text-muted">
                    <div>IBM JOB ID: <span className="text-text-primary font-semibold truncate">{claim.jobId}</span></div>
                    <div>PHYSICAL QPU: <span className="text-text-primary font-semibold">{claim.qpu.split(' ')[0]}</span></div>
                    <div>SHA256: <span className="text-text-primary font-mono text-[10px]">{claim.sha256.substring(0, 16)}...</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Allowed vs Forbidden Claims Disclosures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Authorized Claims */}
          <div className="scientific-card p-6 rounded space-y-4 font-mono text-xs bg-surface-raised border border-border">
            <div className="flex items-center space-x-2 text-[#15803D] font-bold uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>AUTHORIZED PUBLIC CLAIMS</span>
            </div>
            <ul className="space-y-3 font-sans text-xs text-text-secondary">
              <li className="p-3 bg-surface-subtle border border-border rounded">
                Q-Psi compiler states were successfully mapped to QUBO/Ising and executed on a physical IBM Quantum processor, recovering the exact classical optimum on all four tested instances with 10 or fewer variables.
              </li>
              <li className="p-3 bg-surface-subtle border border-border rounded">
                Q-Psi demonstrated quantum query-complexity advantage in a dynamic Bernstein-Vazirani oracle experiment on physical IBM quantum hardware using the audited Pokharel-Lidar-style single-shot methodology.
              </li>
              <li className="p-3 bg-surface-subtle border border-border rounded">
                Q-Psi executed constant-depth hardware-aware restricted Simon circuits on physical IBM quantum hardware and recovered the hidden period on a subset of instances up to 56 physical qubits. Universal asymptotic speedup on raw hardware results remained inconclusive.
              </li>
            </ul>
          </div>

          {/* Forbidden Claims */}
          <div className="scientific-card p-6 rounded space-y-4 font-mono text-xs bg-surface-raised border border-border">
            <div className="flex items-center space-x-2 text-[#DC2626] font-bold uppercase">
              <XCircle className="w-4 h-4" />
              <span>FORBIDDEN / EXCLUDED CLAIMS</span>
            </div>
            <ul className="space-y-3 font-sans text-xs text-text-secondary">
              <li className="p-3 bg-surface-subtle border border-border rounded">
                Q-Psi compiler demonstrates quantum advantage over classical software-repair solvers. (EXCLUDED)
              </li>
              <li className="p-3 bg-surface-subtle border border-border rounded">
                Q-Psi demonstrated proven universal algorithmic quantum advantage for Simon&apos;s problem on raw unmitigated hardware. (EXCLUDED)
              </li>
              <li className="p-3 bg-surface-subtle border border-border rounded">
                General-purpose, commercial, or computational supremacy over classical computing. (EXCLUDED)
              </li>
              <li className="p-3 bg-surface-subtle border border-border rounded">
                Metaphysical, spiritual, or consciousness claims from quantum state encoding. (EXCLUDED)
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
