import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { Heart, ArrowUpRight, ShieldCheck, Cpu, HardDrive, Database, FileText, RefreshCw } from 'lucide-react';

export const metadata = {
  title: 'Support Q-Psi Research — General Research Fund',
  description: 'Support Q-Psi open quantum software research, physical QPU compute, reproducibility engineering, and open science publication.',
};

export default function SupportPage() {
  const goalUsd = siteConfig.funding.publicGoalUsd;
  const founderFundedUsd = siteConfig.funding.founderFundedUsd;
  const percentage = (founderFundedUsd / goalUsd) * 100;

  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-accent fill-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              OPEN QUANTUM SCIENCE FUND
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Q-PSI RESEARCH FUND
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            {siteConfig.funding.description}
          </p>
        </div>

        {/* Goal & Funding Meter Card */}
        <div className="scientific-card p-8 sm:p-12 space-y-10 bg-surface-raised border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-border pb-8 text-center md:text-left">
            <div>
              <div className="text-xs font-mono font-bold text-text-muted uppercase tracking-widest">
                NEXT RESEARCH CYCLE GOAL
              </div>
              <div className="text-4xl font-serif font-bold text-text-primary mt-1">
                ${goalUsd.toLocaleString()} <span className="text-sm font-sans font-normal text-text-secondary">USD</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono font-bold text-accent uppercase tracking-widest">
                FOUNDER-FUNDED RESEARCH TO DATE
              </div>
              <div className="text-4xl font-serif font-bold text-text-primary mt-1">
                ${founderFundedUsd.toLocaleString()} <span className="text-sm font-sans font-normal text-text-secondary">USD</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono font-bold text-text-muted uppercase tracking-widest">
                INITIAL RESEARCH FOUNDATION
              </div>
              <div className="text-4xl font-serif font-bold text-text-primary mt-1">
                {percentage.toFixed(1)}% <span className="text-sm font-sans font-normal text-text-secondary">FUNDED</span>
              </div>
            </div>
          </div>

          {/* Progress Meter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-text-muted uppercase font-semibold">
                PROGRESS: FOUNDER-FUNDED INITIAL CAPITAL ($9,850)
              </span>
              <span className="text-text-primary font-bold">
                ${founderFundedUsd.toLocaleString()} / ${goalUsd.toLocaleString()} ({percentage.toFixed(1)}%)
              </span>
            </div>

            <div className="w-full bg-border h-2 rounded-full overflow-hidden">
              <div
                className="bg-accent h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-sans text-text-muted">
              <span>Founder-funded research: $9,850 USD</span>
              <span>Public Research Goal: $50,000 USD</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-6">
            <a
              href={siteConfig.funding.payPalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover transition-colors shadow-xs w-full sm:w-auto"
            >
              <span>Support Independent Research via PayPal</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="text-xs font-sans text-text-secondary text-center sm:text-right max-w-md">
              Securely processed via PayPal-hosted checkout. You may enter any voluntary contribution amount on the hosted page.
            </div>
          </div>
        </div>

        {/* 5 Funding Pillars */}
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              Where Research Support Is Allocated
            </h2>
            <p className="text-xs font-sans text-text-secondary mt-1">
              Direct physical execution &amp; open science infrastructure allocations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="scientific-card p-5 space-y-3 bg-surface-raised border border-border">
              <Cpu className="w-5 h-5 text-accent" />
              <div className="text-xs font-mono font-bold text-text-primary uppercase">PHYSICAL QPU</div>
              <p className="text-xs font-sans text-text-secondary leading-relaxed">
                Superconducting quantum hardware shots and execution reservations on IBM Quantum backends.
              </p>
            </div>

            <div className="scientific-card p-5 space-y-3 bg-surface-raised border border-border">
              <HardDrive className="w-5 h-5 text-accent" />
              <div className="text-xs font-mono font-bold text-text-primary uppercase">COMPUTE</div>
              <p className="text-xs font-sans text-text-secondary leading-relaxed">
                Classical simulation, state space transpilation, and numerical verification servers.
              </p>
            </div>

            <div className="scientific-card p-5 space-y-3 bg-surface-raised border border-border">
              <Database className="w-5 h-5 text-accent" />
              <div className="text-xs font-mono font-bold text-text-primary uppercase">DATASETS</div>
              <p className="text-xs font-sans text-text-secondary leading-relaxed">
                Raw evidence dataset generation, cryptographic hashing, and public archiving.
              </p>
            </div>

            <div className="scientific-card p-5 space-y-3 bg-surface-raised border border-border">
              <RefreshCw className="w-5 h-5 text-accent" />
              <div className="text-xs font-mono font-bold text-text-primary uppercase">REPRODUCIBILITY</div>
              <p className="text-xs font-sans text-text-secondary leading-relaxed">
                Open-access execution scripts and automated validation suites for independent verification.
              </p>
            </div>

            <div className="scientific-card p-5 space-y-3 bg-surface-raised border border-border">
              <FileText className="w-5 h-5 text-accent" />
              <div className="text-xs font-mono font-bold text-text-primary uppercase">PUBLICATION</div>
              <p className="text-xs font-sans text-text-secondary leading-relaxed">
                Scientific paper drafting, peer-reviewed open access publishing fees, and research post-mortems.
              </p>
            </div>
          </div>
        </div>

        {/* Support Disclosures Box */}
        <div className="scientific-card p-6 space-y-2 text-xs font-mono text-text-secondary bg-surface-raised border border-border">
          <div className="flex items-center space-x-2 text-text-primary font-bold uppercase">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>SUPPORT CONDITIONS &amp; DISCLOSURE</span>
          </div>
          <p className="font-sans text-xs leading-relaxed text-text-secondary">
            {siteConfig.funding.disclaimer}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
