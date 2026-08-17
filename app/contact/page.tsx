import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, Mail, Globe } from 'lucide-react';

export const metadata = {
  title: 'Contact & Collaboration — Q-Psi Independent Quantum Research',
  description: 'Contact Q-Psi for research collaboration, academic access, compiler evaluation, or project inquiries.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>

        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              SCIENTIFIC CORRESPONDENCE
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Research Collaboration &amp; Inquiries
          </h1>
          <p className="text-base text-text-secondary font-sans leading-relaxed">
            Q-Psi welcomes collaboration with quantum computing laboratories, universities, independent researchers, and industry partners.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
          <div className="scientific-card p-6 space-y-3 bg-surface-raised border border-border">
            <Mail className="w-5 h-5 text-accent" />
            <div className="text-text-muted uppercase font-bold text-[10px]">AUTHORITATIVE RESEARCH CONTACT</div>
            <a href={`mailto:${siteConfig.contact.email}`} className="text-text-primary hover:text-accent font-bold text-sm block">
              {siteConfig.contact.email}
            </a>
            <p className="text-[11px] font-sans text-text-secondary">
              Use for research inquiries, manuscript correspondence, future compiler inquiries, or licensing terms.
            </p>
          </div>

          <div className="scientific-card p-6 space-y-3 bg-surface-raised border border-border">
            <Globe className="w-5 h-5 text-accent" />
            <div className="text-text-muted uppercase font-bold text-[10px]">ORGANIZATIONAL HIERARCHY</div>
            <div className="text-text-primary font-bold text-sm block">
              The Oneness Project
            </div>
            <p className="text-[11px] font-sans text-text-secondary">
              Mother initiative. Q-Psi operates as an independent quantum research initiative. Sibling: SattvaOS.
            </p>
          </div>
        </div>

        <div className="scientific-card p-8 space-y-4 bg-surface-raised border border-border">
          <h2 className="text-2xl font-serif font-bold text-text-primary">
            Inquiry Guidance
          </h2>
          <div className="space-y-3 text-xs font-sans text-text-secondary">
            <div>
              <strong className="text-text-primary font-semibold">Future Compiler Evaluation Access:</strong> Include your research organization, intended evaluation workload, and target backend requirements.
            </div>
            <div>
              <strong className="text-text-primary font-semibold">Academic Collaboration:</strong> For co-authoring physical QPU benchmarks or testing new oracle query protocols.
            </div>
            <div>
              <strong className="text-text-primary font-semibold">Commercial Licensing:</strong> For enterprise state-space compiler integration terms.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
