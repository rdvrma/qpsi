'use client';

import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
            LEGAL COMPLIANCE
          </span>
          <h1 className="text-4xl font-serif font-bold text-primaryWhite">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-midGray">
            Effective Date: January 1, 2026 | Entity: {siteConfig.company.parentCompany}
          </p>
        </div>

        <div className="space-y-6 text-sm text-softWhite leading-relaxed border-t border-white/10 pt-6">
          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-primaryWhite">1. Information Collection</h2>
            <p>
              Q-Psi collects information provided voluntarily when you request our investor deck or submit an inquiry through our direct founder contact form. This includes your name, work email address, organization, and message contents.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-primaryWhite">2. Use of Information</h2>
            <p>
              Submitted contact details are used exclusively to deliver requested investor materials, coordinate direct technical communications with founder Nishant Kumar Sinha, and evaluate strategic partnership fit. We do not monetize or transfer personal contact information to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-primaryWhite">3. Analytics & Technical Logs</h2>
            <p>
              Our web infrastructure logs standard non-personally identifiable browser access metrics (IP subnets, user agents, page response times) to maintain network security and optimize website performance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-primaryWhite">4. Contact & Inquiries</h2>
            <p>
              For privacy requests or data inquiries, please email <a href="mailto:nishant@darkcloud.co.in" className="text-white underline">nishant@darkcloud.co.in</a>.
            </p>
          </section>
        </div>
      </div>

      <Footer onOpenModal={() => {}} />
    </main>
  );
}
