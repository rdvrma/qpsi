import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — Q-Psi Independent Quantum Research',
  description: 'Privacy Policy for Q-Psi Independent Quantum Research initiative under parent umbrella The Oneness Project.',
};

export default function PrivacyPage() {
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
              POLICY &amp; PRIVACY
            </span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-text-primary">
            Privacy Policy
          </h1>
          <p className="text-xs font-sans text-text-muted">
            Effective Date: January 1, 2026 &bull; Parent Initiative: {siteConfig.company.parentCompany}
          </p>
        </div>

        <div className="space-y-6 text-sm text-text-secondary leading-relaxed border-t border-border pt-6 font-sans">
          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-text-primary">1. Information Collection</h2>
            <p>
              Q-Psi collects information provided voluntarily when you submit a research collaboration inquiry, future compiler-access inquiry, or contact message. This includes your name, institutional email address, organization, and message contents.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-text-primary">2. Use of Information</h2>
            <p>
              Submitted contact details are used exclusively to evaluate research collaboration requests, coordinate future compiler-access inquiries, and deliver requested scientific correspondence. We do not monetize or transfer personal contact information to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-text-primary">3. Research Support Payments</h2>
            <p>
              General research-support payments are processed on PayPal-hosted pages. Q-Psi does not receive or store payment-card details through this website.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-text-primary">4. Open Science &amp; Telemetry Data</h2>
            <p>
              All published quantum hardware benchmark datasets, IBM Quantum runtime job IDs, and cryptographic SHA256 hashes are strictly non-personal execution logs generated on physical quantum processors.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-text-primary">5. Contact &amp; Inquiries</h2>
            <p>
              For privacy requests or data inquiries, please email <a href={`mailto:${siteConfig.contact.email}`} className="text-accent underline font-semibold">{siteConfig.contact.email}</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
