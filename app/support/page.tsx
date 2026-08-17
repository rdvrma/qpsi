import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { Heart, ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Support Q-Psi Research — General Research Fund',
  description: 'Support Q-Psi open quantum software research, physical QPU compute, reproducibility engineering, and open science publication.',
};

export default function SupportPage() {
  const goalUsd = siteConfig.funding.publicGoalUsd;
  const founderFundedUsd = siteConfig.funding.founderFundedUsd;
  const percentage = Math.round((founderFundedUsd / goalUsd) * 100);

  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full">
            <Heart className="w-3.5 h-3.5 text-accent fill-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              OPEN QUANTUM SCIENCE FUND
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Support Q-Psi Research
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            Q-Psi is an independent quantum research initiative of The Oneness Project. Voluntary research support funds physical-QPU compute, datasets, reproducibility engineering, and open research publication.
          </p>
        </div>

        {/* Goal & Funding Meter Card */}
        <div className="bg-surface-raised border border-border rounded-lg p-8 sm:p-12 space-y-8">
          <div className="flex flex-wrap items-center justify-between border-b border-border pb-6 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                {siteConfig.funding.displayTitle}
              </span>
              <h2 className="text-3xl font-serif font-bold text-text-primary mt-1">
                Public Research Support Goal
              </h2>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-text-muted">PUBLIC GOAL</div>
              <div className="text-3xl font-serif font-bold text-text-primary">
                ${goalUsd.toLocaleString()} USD
              </div>
            </div>
          </div>

          {/* Truthful Progress Meter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-text-muted uppercase font-semibold">
                {siteConfig.funding.founderFundedLabel}
              </span>
              <span className="text-text-primary font-bold">
                ${founderFundedUsd.toLocaleString()} / ${goalUsd.toLocaleString()} ({percentage}%)
              </span>
            </div>

            <div className="w-full bg-surface h-3 rounded-full overflow-hidden border border-border">
              <div
                className="bg-accent h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
              <span>Truthful disclosure: Founder personal investment to date</span>
              <span>Open Science Fund</span>
            </div>
          </div>

          {/* Direct Support Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
            <div className="md:col-span-7 space-y-4 text-xs font-sans text-text-secondary leading-relaxed">
              <h3 className="text-lg font-serif font-bold text-text-primary">
                Why Voluntary Research Support Matters
              </h3>
              <p>
                Physical quantum hardware execution on 156-qubit Heron processors requires significant compute credits and execution time. Your voluntary support enables Q-Psi to maintain independent, un-compromised research — publishing full evidence logs for both positive breakthroughs and negative NISQ boundaries.
              </p>
              <div className="p-4 bg-surface border border-border rounded space-y-2 font-mono text-xs text-text-primary">
                <div className="font-bold text-accent">WHAT YOUR SUPPORT FUNDS:</div>
                <ul className="space-y-1 text-text-secondary">
                  <li>• Physical IBM Quantum QPU execution shots &amp; job reservations</li>
                  <li>• Open-source dataset generation &amp; cryptographic evidence archiving</li>
                  <li>• Pre-print publication &amp; peer-reviewed journal submission costs</li>
                  <li>• Open-access reproducibility scripts for the global community</li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-5 bg-surface border border-border p-6 sm:p-8 rounded-lg space-y-4 text-center">
              <div className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider">
                CONTRIBUTE TO Q-PSI RESEARCH
              </div>
              <p className="text-xs text-text-secondary font-sans">
                Supporters may enter any amount. Voluntary research support is separate from compiler evaluation access.
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}?subject=Q-Psi%20Research%20Fund%20Support`}
                className="block w-full py-3 bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider rounded shadow-xs hover:bg-accent-hover transition-all text-center"
              >
                CONTRIBUTE VIA PAYPAL / DIRECT
              </a>
              <div className="text-[10px] font-mono text-text-muted leading-tight">
                For research fund inquiries or direct transfer details, contact <a href={`mailto:${siteConfig.contact.email}`} className="text-accent underline">{siteConfig.contact.email}</a>.
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
