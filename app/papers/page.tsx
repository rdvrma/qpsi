import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowUpRight, FileText } from 'lucide-react';

export const metadata = {
  title: 'Manuscripts & Research Notes — Q-Psi Independent Quantum Research',
  description: 'Publication-oriented manuscripts, draft outlines, and scientific research notes produced by Q-Psi.',
};

export default function PapersPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              MANUSCRIPTS &amp; RESEARCH NOTES
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Manuscripts &amp; Research Notes
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            Q-Psi prepares formal scientific manuscripts documenting quantum compilation architectures, physical QPU benchmark results, and oracle query-complexity advantages.
          </p>
        </div>

        <div className="space-y-8">
          {siteConfig.papers.map((paper) => (
            <div
              key={paper.id}
              className="scientific-card p-6 sm:p-8 space-y-5 bg-surface-raised border border-border"
            >
              <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-accent">MANUSCRIPT</span>
                  <h2 className="text-2xl font-serif font-bold text-text-primary mt-1">{paper.title}</h2>
                  <div className="text-xs font-mono text-text-secondary mt-1">
                    Target Title: <em>{paper.targetTitle}</em>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-surface-subtle border border-border rounded text-text-primary uppercase">
                    STATUS: {paper.status}
                  </span>
                </div>
              </div>

              <div className="paper-abstract">
                <p className="text-xs text-text-secondary font-sans leading-relaxed">
                  {paper.abstract}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-border text-xs font-mono text-text-muted">
                <div>AUTHORS: <span className="text-text-primary font-semibold">{paper.authors.join(', ')}</span></div>
                <div className="text-accent font-semibold">PRE-SUBMISSION WORKING DRAFT</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
