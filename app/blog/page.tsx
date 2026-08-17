import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowUpRight, Database } from 'lucide-react';

export const metadata = {
  title: 'Scientific Blog — Q-Psi Independent Quantum Research',
  description: 'In-depth research reports, hardware campaign post-mortems, and open science publications by the Q-Psi Research Team.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              RESEARCH BLOG &amp; REPORTS
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Scientific Deep Dives &amp; Campaign Post-Mortems
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            Open science requires publishing positive demonstrations, negative findings, and mathematical audits with complete transparency.
          </p>
        </div>

        {/* Major Article Card */}
        <div className="scientific-card p-8 sm:p-12 space-y-6 bg-surface-raised border border-border">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text-muted">
              <span className="text-accent font-bold">MAJOR RESEARCH REPORT</span>
              <span>&bull;</span>
              <span>AUGUST 17, 2026</span>
              <span>&bull;</span>
              <span>HARDWARE: IBM QUANTUM (ibm_marrakesh)</span>
            </div>

            <h2 className="text-3xl font-serif font-bold text-text-primary">
              From Software-Repair Compilation to a Physical-QPU Quantum Advantage Experiment: What Q-Psi Tested, What Worked, and What Failed
            </h2>

            <div className="text-xs font-sans text-text-secondary">
              By the Q-Psi Research Team
            </div>
          </div>

          <p className="text-sm text-text-secondary font-sans leading-relaxed">
            Over the past week, we executed four distinct experimental campaigns on IBM Quantum&apos;s 156-qubit Heron processor, <code>ibm_marrakesh</code>. We evaluated state-space software repair compilation, single-shot dynamic Bernstein-Vazirani query advantage, constant-depth restricted Simon circuits, and exploratory mantra quantum state encoding.
          </p>

          <div className="p-4 bg-surface-subtle border border-border rounded space-y-3 font-mono text-xs">
            <div className="font-bold text-text-primary">ARTICLE CONTENTS SUMMARY</div>
            <ul className="space-y-1 text-text-secondary">
              <li>1. Original Q-Psi Research: State-Space Compiler on Physical Hardware (Job ID: da16h8ug52gs73cl8uog)</li>
              <li>2. Independent Experiment: Dynamic Bernstein-Vazirani Query Advantage (Job ID: da1a03mg52gs73clcj80)</li>
              <li>3. Follow-Up Research: Constant-Depth Restricted Simon Experiment (Job ID: da1a0piein7c73bd5beg)</li>
              <li>4. Exploratory Study: Mantra Quantum State Encoding (Job ID: da19q86g52gs73clcd7g)</li>
            </ul>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Link
              href="/evidence"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover transition-colors shadow-xs"
            >
              <Database className="w-3.5 h-3.5" />
              <span>View Evidence for this Report</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
