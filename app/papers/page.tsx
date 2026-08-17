import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowUpRight, FileText } from 'lucide-react';

export const metadata = {
  title: 'Research Papers & Outlines — Q-Psi Independent Quantum Research',
  description: 'Publication-oriented paper outlines, preprints, and scientific manuscripts produced by Q-Psi.',
};

export default function PapersPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              PUBLICATIONS &amp; PREPRINTS
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Research Papers &amp; Outlines
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            Q-Psi prepares formal scientific papers documenting quantum compilation architectures, physical QPU benchmark results, and oracle query-complexity advantages.
          </p>
        </div>

        <div className="space-y-8">
          {siteConfig.papers.map((paper) => (
            <div
              key={paper.id}
              className="bg-surface-raised border border-border p-6 sm:p-8 rounded-lg space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-accent">PAPER OUTLINE</span>
                  <h2 className="text-2xl font-serif font-bold text-text-primary mt-1">{paper.title}</h2>
                  <div className="text-xs font-mono text-text-secondary mt-1">
                    Target Title: <em>{paper.targetTitle}</em>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-surface border border-border rounded text-text-primary uppercase">
                    STATUS: {paper.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                {paper.abstract}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-border text-xs font-mono text-text-muted">
                <div>AUTHORS: <span className="text-text-primary font-semibold">{paper.authors.join(', ')}</span></div>
                <div className="text-accent font-bold">PRE-SUBMISSION WORKING DRAFT</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
