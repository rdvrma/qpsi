import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowUpRight, Database, FileText, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Physical QPU Experiments & Benchmarks — Q-Psi',
  description:
    'Complete inventory of 14 audited physical quantum hardware experiments on IBM Quantum Heron r2 (ibm_marrakesh) with job IDs, shot counts, quantum seconds, and cryptographic evidence seals.',
};

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              PHYSICAL QPU LOGS &bull; 14 AUDITED CAMPAIGNS
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Physical Quantum Hardware Experiments
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            Every physical experiment executed by Q-Psi is bound to IBM Quantum Job IDs, physical shot counts, active quantum runtime, cryptographic SHA-256 evidence seals, and explicit scientific claim boundaries.
          </p>

          <div className="p-4 bg-surface-raised border border-border rounded-lg grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div>
              <div className="text-[10px] text-text-muted font-bold">TOTAL PHYSICAL SHOTS</div>
              <div className="text-lg font-bold text-text-primary mt-0.5">564,840</div>
            </div>
            <div>
              <div className="text-[10px] text-text-muted font-bold">PRODUCTION QPU JOBS</div>
              <div className="text-lg font-bold text-text-primary mt-0.5">16 Jobs</div>
            </div>
            <div>
              <div className="text-[10px] text-text-muted font-bold">IBM RUNTIME QUANTUM TIME</div>
              <div className="text-lg font-bold text-text-primary mt-0.5">259.38s</div>
            </div>
            <div>
              <div className="text-[10px] text-text-muted font-bold">PRIMARY HARDWARE</div>
              <div className="text-lg font-bold text-accent mt-0.5">IBM Heron r2</div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {siteConfig.experiments.map((exp) => (
            <div
              key={exp.id}
              className="scientific-card p-6 sm:p-8 space-y-6 bg-surface-raised border border-border"
            >
              <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 gap-4">
                <div>
                  <div className="flex items-center space-x-2 font-mono text-xs">
                    <span className="font-bold text-accent">{exp.code}</span>
                    <span className="text-text-muted">&bull;</span>
                    <span className="text-text-muted">{exp.id}</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-text-primary mt-1">{exp.title}</h2>
                  <div className="text-xs font-mono text-text-secondary mt-0.5">{exp.subtitle}</div>
                </div>
                <div>
                  <span
                    className={`text-xs font-mono font-bold px-3 py-1 border rounded uppercase ${
                      exp.status === 'SUPPORTED'
                        ? 'bg-[#16A34A]/10 text-[#15803D] border-[#16A34A]/25'
                        : exp.status === 'SUPPORTED_WITH_QUALIFICATION'
                        ? 'bg-[#D97706]/10 text-[#B45309] border-[#D97706]/25'
                        : exp.status === 'NOT_SUPPORTED'
                        ? 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/25'
                        : exp.status === 'INCOMPLETE_NOT_FROZEN'
                        ? 'bg-surface-subtle text-text-muted border-border'
                        : 'bg-[#64748B]/10 text-text-secondary border-[#64748B]/25'
                    }`}
                  >
                    STATUS: {exp.statusLabel}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-3 bg-surface-subtle border border-border rounded">
                  <div className="text-text-muted text-[10px]">PHYSICAL BACKEND</div>
                  <div className="text-text-primary font-bold mt-1 truncate">{exp.backend}</div>
                </div>
                <div className="p-3 bg-surface-subtle border border-border rounded">
                  <div className="text-text-muted text-[10px]">IBM JOB ID(S)</div>
                  <div className="text-text-primary font-bold mt-1 truncate">
                    {exp.jobIds.length > 0 ? exp.jobIds.join(', ') : 'N/A (Protocol Only)'}
                  </div>
                </div>
                <div className="p-3 bg-surface-subtle border border-border rounded">
                  <div className="text-text-muted text-[10px]">REGISTER / SEARCH SIZE</div>
                  <div className="text-text-primary font-bold mt-1 truncate">{exp.qubits}</div>
                </div>
                <div className="p-3 bg-surface-subtle border border-border rounded">
                  <div className="text-text-muted text-[10px]">SHOTS &bull; QUANTUM SECONDS</div>
                  <div className="text-text-primary font-bold mt-1">
                    {exp.shots > 0 ? `${exp.shots.toLocaleString()} shots (${exp.quantumSeconds}s)` : '0 shots'}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <p className="text-text-primary font-medium leading-relaxed">
                  <strong>Audited Finding:</strong> {exp.primaryResult}
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>Qualification &amp; Scope:</strong> {exp.qualification}
                </p>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-between border-t border-border gap-4 font-mono text-xs">
                <div className="text-[11px] text-text-muted truncate max-w-md">
                  RAW EVIDENCE SHA256: <code className="text-text-secondary">{exp.rawSha256 ? `${exp.rawSha256.substring(0, 20)}...` : 'N/A'}</code>
                </div>

                <div className="flex items-center space-x-4">
                  {exp.researchNoteUrl && (
                    <Link
                      href={exp.researchNoteUrl}
                      className="text-xs font-sans font-semibold text-accent hover:underline flex items-center space-x-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Research Note</span>
                    </Link>
                  )}
                  <Link href="/evidence" className="text-xs font-sans font-semibold text-text-secondary hover:text-text-primary flex items-center space-x-1">
                    <Database className="w-3.5 h-3.5" />
                    <span>Evidence Index</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
