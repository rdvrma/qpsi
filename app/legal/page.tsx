'use client';

import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export default function LegalPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-primaryWhite pt-28 pb-16">
      <Navbar onOpenModal={() => {}} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-mono text-midGray hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage Overview</span>
        </Link>

        <div className="space-y-3">
          <span className="text-xs font-mono tracking-widest uppercase text-midGray block">
            LEGAL & RESEARCH DISCLOSURES
          </span>
          <h1 className="text-4xl font-serif font-bold text-primaryWhite">
            Legal Disclaimer & Truthful Claims Policy
          </h1>
          <p className="text-xs font-mono text-midGray">
            Entity: {siteConfig.company.parentCompany} | Brand Initiative: {siteConfig.company.fullName}
          </p>
        </div>

        <div className="space-y-6 text-sm text-softWhite leading-relaxed border-t border-white/10 pt-6">
          <section className="p-5 border border-white/20 bg-[#090909] space-y-2">
            <div className="flex items-center space-x-2 text-white font-bold font-mono text-xs uppercase">
              <ShieldAlert className="w-4 h-4" />
              <span>Idea-Stage Research & Pre-Prototype Status Notice</span>
            </div>
            <p className="text-xs font-mono text-midGray leading-relaxed">
              Q-Psi is currently an idea-stage deep-tech research and product initiative. All technical architecture diagrams, milestone timelines, financial planning ranges, and simulator benchmarks represent proposed specifications and planned engineering goals. No statement on this website constitutes a promise of performance or guaranteed investment returns.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-primaryWhite">1. No False Quantum Advantage Claims</h2>
            <p>
              Q-Psi makes no claim of commercial quantum advantage today. Quantum algorithms and CUDA-Q state vector routines are evaluated strictly as experimental state-search backends against a mandatory classical baseline.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-primaryWhite">2. Ecosystem Program Disclosures</h2>
            <p>
              {siteConfig.recognition.disclosure}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-primaryWhite">3. Founder Background Factuality</h2>
            <p>
              {siteConfig.founder.education} {siteConfig.founder.educationTruthfulnessNotice}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-primaryWhite">4. Intellectual Property</h2>
            <p>
              All trademarks, product names, marks (QΨ), and original architecture concepts on this site are property of Nishant Kumar Sinha and {siteConfig.company.parentCompany}.
            </p>
          </section>
        </div>
      </div>

      <Footer onOpenModal={() => {}} />
    </main>
  );
}
