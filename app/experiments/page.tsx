import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { CheckCircle2, AlertCircle, HelpCircle, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Physical QPU Experiments & Benchmarks — Q-Psi',
  description: 'Detailed logs and verified measurements for Q-Psi physical quantum hardware experiments on IBM Quantum ibm_marrakesh.',
};

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              PHYSICAL QPU LOGS
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Physical Quantum Hardware Experiments
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            Every experiment executed by Q-Psi is linked directly to IBM Quantum Job IDs, raw measurement datasets, cryptographic SHA256 hashes, and verified claim boundaries.
          </p>
        </div>

        <div className="space-y-8">
          {siteConfig.experiments.map((exp) => (
            <div
              key={exp.code}
              className="bg-surface-raised border border-border p-6 sm:p-8 rounded-lg space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-accent">{exp.code}</span>
                  <h2 className="text-2xl font-serif font-bold text-text-primary mt-1">{exp.title}</h2>
                  <div className="text-xs font-mono text-text-secondary mt-0.5">{exp.subtitle}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-surface border border-border rounded text-text-primary uppercase">
                    STATUS: {exp.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-3 bg-surface border border-border rounded">
                  <div className="text-text-muted">PHYSICAL BACKEND</div>
                  <div className="text-text-primary font-bold mt-1">{exp.backend}</div>
                </div>
                <div className="p-3 bg-surface border border-border rounded">
                  <div className="text-text-muted">IBM JOB ID</div>
                  <div className="text-text-primary font-bold mt-1">{exp.jobId}</div>
                </div>
                <div className="p-3 bg-surface border border-border rounded">
                  <div className="text-text-muted">REGISTER SIZE</div>
                  <div className="text-text-primary font-bold mt-1">{exp.qubits}</div>
                </div>
                <div className="p-3 bg-surface border border-border rounded">
                  <div className="text-text-muted">PHYSICAL SHOTS</div>
                  <div className="text-text-primary font-bold mt-1">{exp.shots.toLocaleString()}</div>
                </div>
              </div>

              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                {exp.summary}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-border">
                <Link href="/evidence" className="text-xs font-mono font-bold text-accent hover:underline flex items-center space-x-1">
                  <span>VERIFY IN EVIDENCE INDEX</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
