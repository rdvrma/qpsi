import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { CheckCircle2, AlertCircle, HelpCircle, XCircle, FileText, ArrowUpRight, ShieldCheck, Database, Lock } from 'lucide-react';

export const metadata = {
  title: 'Verified Evidence Registry — Q-Psi Independent Quantum Research',
  description:
    'Machine-readable & human-readable verified evidence index, IBM Job IDs, SHA-256 hashes, and physical QPU claim boundaries.',
};

export default function EvidencePage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              OPEN SCIENCE EVIDENCE REGISTRY &bull; FROZEN AUDIT 2026-08-18
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Verified Evidence Registry &amp; Claim Boundaries
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            Every public claim made by Q-Psi is bound to explicit scientific statuses, IBM Quantum runtime job IDs, physical QPU backends, and cryptographic SHA-256 evidence seals.
          </p>

          <div className="p-4 bg-surface-raised border border-border rounded-lg flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="text-text-muted">FREEZE COMMIT: </span>
              <code className="text-text-primary font-semibold">be74ad05187e148e2fc52309f4d7f57be3784157</code>
            </div>
            <div>
              <span className="text-text-muted">TOTAL AUDITED EXPERIMENTS: </span>
              <strong className="text-text-primary">14 Completed / 1 Incomplete</strong>
            </div>
            <div>
              <span className="text-text-muted">RAW SEAL INTEGRITY: </span>
              <strong className="text-[#15803D]">100.0% VERIFIED</strong>
            </div>
          </div>
        </div>

        {/* Master Claims Registry */}
        <div className="scientific-card overflow-hidden space-y-6 p-6 sm:p-8 bg-surface-raised border border-border">
          <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 font-mono text-xs gap-2">
            <span className="font-bold text-accent">PUBLIC CLAIMS REGISTRY V2.0</span>
            <div className="flex items-center space-x-3">
              <a
                href="/research/qpsi_public_claims_v2.json"
                target="_blank"
                className="text-accent hover:underline flex items-center space-x-1 font-semibold"
              >
                <span>Download Claims JSON</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="/research/qpsi_master_evidence_registry.json"
                target="_blank"
                className="text-text-secondary hover:text-text-primary flex items-center space-x-1 font-semibold"
              >
                <span>Download Evidence Registry JSON</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            {siteConfig.claims.map((claim) => {
              return (
                <div
                  key={claim.id}
                  className="p-5 bg-surface-subtle border border-border rounded space-y-3 font-mono text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-text-primary">{claim.claimId}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-surface border border-border rounded text-text-muted">
                        {claim.publicationTier}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase ${
                          claim.status === 'SUPPORTED'
                            ? 'bg-[#16A34A]/10 text-[#15803D] border-[#16A34A]/25'
                            : claim.status === 'SUPPORTED_WITH_QUALIFICATION'
                            ? 'bg-[#D97706]/10 text-[#B45309] border-[#D97706]/25'
                            : claim.status === 'NOT_SUPPORTED'
                            ? 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/25'
                            : claim.status === 'INCOMPLETE_NOT_FROZEN'
                            ? 'bg-surface text-text-muted border-border'
                            : 'bg-[#64748B]/10 text-text-secondary border-[#64748B]/25'
                        }`}
                      >
                        STATUS: {claim.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] text-text-muted font-bold uppercase">
                      EXPERIMENT: {claim.experiment}
                    </div>
                    <p className="text-sm font-sans font-semibold text-text-primary leading-relaxed">
                      {claim.statement}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] text-text-muted">
                    <div>IBM JOB ID: <span className="text-text-primary font-semibold truncate">{claim.jobId || 'N/A'}</span></div>
                    <div>PHYSICAL QPU: <span className="text-text-primary font-semibold">{claim.qpu}</span></div>
                    <div>RAW SHA256: <span className="text-text-secondary font-mono text-[10px]">{claim.sha256 ? `${claim.sha256.substring(0, 16)}...` : 'N/A'}</span></div>
                  </div>

                  {claim.qualification && (
                    <div className="p-3 bg-surface border border-border rounded font-sans text-xs text-text-secondary">
                      <strong className="text-text-primary font-mono text-[11px]">AUDITED SCOPE &amp; QUALIFICATION:</strong> {claim.qualification}
                    </div>
                  )}

                  {claim.allowedWording && claim.allowedWording.length > 0 && (
                    <div className="space-y-1 font-sans text-xs text-text-secondary pt-1">
                      <span className="font-mono text-[10px] text-text-muted font-bold uppercase">AUTHORIZED STATEMENTS:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] text-text-secondary pl-1">
                        {claim.allowedWording.map((w, idx) => (
                          <li key={idx}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {claim.prohibitedWording && claim.prohibitedWording.length > 0 && (
                    <div className="space-y-1 font-sans text-xs text-text-secondary">
                      <span className="font-mono text-[10px] text-[#DC2626] font-bold uppercase">PROHIBITED STATEMENTS:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] text-text-muted pl-1">
                        {claim.prohibitedWording.map((pw, idx) => (
                          <li key={idx}>{pw}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Master Claim Boundaries (Allowed vs Excluded) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Authorized Claims */}
          <div className="scientific-card p-6 rounded-lg space-y-4 font-mono text-xs bg-surface-raised border border-border">
            <div className="flex items-center space-x-2 text-[#15803D] font-bold uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>AUTHORIZED PUBLIC CLAIMS SUMMARY</span>
            </div>
            <ul className="space-y-3 font-sans text-xs text-text-secondary">
              {siteConfig.claimsComparison.allowed.map((item, idx) => (
                <li key={idx} className="p-3 bg-surface-subtle border border-border rounded">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Forbidden Claims */}
          <div className="scientific-card p-6 rounded-lg space-y-4 font-mono text-xs bg-surface-raised border border-border">
            <div className="flex items-center space-x-2 text-[#DC2626] font-bold uppercase">
              <XCircle className="w-4 h-4" />
              <span>EXPLICITLY PROHIBITED &amp; DISCLAIMED CLAIMS</span>
            </div>
            <ul className="space-y-3 font-sans text-xs text-text-secondary">
              {siteConfig.claimsComparison.notAllowed.map((item, idx) => (
                <li key={idx} className="p-3 bg-surface-subtle border border-border rounded">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
