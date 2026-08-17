import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Legal & Open Science Disclosures — Q-Psi Independent Quantum Research',
  description: 'Legal disclaimers, open science integrity policies, evaluation access terms, and research boundaries for Q-Psi.',
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>

        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              DISCLOSURES &amp; POLICY
            </span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-text-primary">
            Legal &amp; Open Science Disclosures
          </h1>
          <p className="text-xs font-sans text-text-muted">
            Parent Initiative: {siteConfig.company.parentCompany} &bull; Initiative: {siteConfig.company.fullName}
          </p>
        </div>

        <div className="space-y-6 text-sm text-text-secondary leading-relaxed border-t border-border pt-6 font-sans">
          <section className="scientific-card p-5 space-y-2 bg-surface-raised border border-border">
            <div className="flex items-center space-x-2 text-text-primary font-bold font-mono text-xs uppercase">
              <ShieldAlert className="w-4 h-4 text-accent" />
              <span>Experimental Quantum Software &amp; Open Science Disclaimer</span>
            </div>
            <p className="text-xs font-sans text-text-secondary leading-relaxed">
              Q-Psi quantum research software, compiler outputs, and physical QPU benchmarks are provided for research and evaluation purposes. Experiments identified as physical-QPU experiments were executed on real quantum hardware (IBM Quantum ibm_marrakesh) and published under open-science principles.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-text-primary">1. Scientific Claim Integrity Policy</h2>
            <p>
              Q-Psi strictly distinguishes between proven oracle query-complexity advantages (such as single-shot dynamic Bernstein-Vazirani under Pokharel-Lidar methodology) and general-purpose computational supremacy. We make no claim of general quantum advantage for software repair solvers, nor do we claim universal speedup on unmitigated raw hardware where data is inconclusive.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-text-primary">2. Research Evaluation Access Terms</h2>
            <p>
              When external compiler evaluation access is opened, evaluation access will allow researchers to test compiled benchmarks under designated evaluation agreements. Evaluation access does NOT grant source code ownership, intellectual property transfer, or commercial production rights. Full commercial project licenses are handled via separate agreements with the research team.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-text-primary">3. Voluntary Support Fund Disclosures</h2>
            <p>
              Voluntary contributions to the Q-Psi Research Support Fund directly support open physical QPU execution, dataset hosting, and research publication. Contributions do not purchase priority compiler access, commercial ownership, or guaranteed benchmark outcomes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-text-primary">4. Intellectual Property &amp; Correspondence</h2>
            <p>
              Q-Psi research materials, compiler technology, marks and unpublished implementation materials remain proprietary unless explicitly released under a stated public license. Legal ownership and licensing terms are defined in the applicable agreement.
            </p>
            <p className="text-xs font-sans text-text-muted">
              For scientific licensing or inquiry correspondence: <a href={`mailto:${siteConfig.contact.email}`} className="text-accent font-semibold hover:underline">{siteConfig.contact.email}</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
