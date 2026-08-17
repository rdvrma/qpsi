import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { CheckCircle2, ArrowRight, FileText, Database, Mail } from 'lucide-react';

export const metadata = {
  title: 'Thank You for Supporting Q-Psi Research — Q-Psi Independent Quantum Research',
  description: 'Thank you for supporting Q-Psi independent quantum software research and physical QPU experimentation.',
};

export default function SupportSuccessPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center sm:text-left">
        <div className="bg-surface-raised border border-border p-8 sm:p-12 rounded-lg space-y-8">
          <div className="flex items-center space-x-3 text-status-pass font-mono text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-5 h-5" />
            <span>RESEARCH SUPPORT RECEIVED</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
              Thank You for Supporting Q-Psi Research
            </h1>
            <p className="text-base text-text-secondary font-sans leading-relaxed max-w-2xl">
              Thank you for supporting Q-Psi through PayPal. Your voluntary support helps fund independent physical-QPU experiments, compute infrastructure, reproducibility engineering, and open science publication.
            </p>
          </div>

          <div className="p-4 bg-surface border border-border rounded-lg text-xs font-mono text-text-secondary space-y-1">
            <div>Support Confirmation: Processed via PayPal</div>
            <div>Authoritative Research Contact: <a href={`mailto:${siteConfig.contact.email}`} className="text-accent underline">{siteConfig.contact.email}</a></div>
          </div>

          {/* Primary Next Actions */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">
              PRIMARY NEXT ACTIONS
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <Link
                href="/research"
                className="p-5 bg-surface border border-border rounded-lg flex flex-col justify-between hover:border-accent transition-all group"
              >
                <div className="space-y-2">
                  <FileText className="w-5 h-5 text-accent" />
                  <div className="font-bold text-text-primary group-hover:text-accent">EXPLORE RESEARCH</div>
                  <p className="text-[11px] font-sans text-text-secondary">Read overview of physical QPU research programs.</p>
                </div>
                <div className="pt-3 inline-flex items-center space-x-1 text-accent font-bold text-[11px]">
                  <span>View Overview</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              <Link
                href="/evidence"
                className="p-5 bg-surface border border-border rounded-lg flex flex-col justify-between hover:border-accent transition-all group"
              >
                <div className="space-y-2">
                  <Database className="w-5 h-5 text-accent" />
                  <div className="font-bold text-text-primary group-hover:text-accent">VIEW EVIDENCE</div>
                  <p className="text-[11px] font-sans text-text-secondary">Inspect verified IBM job IDs &amp; SHA256 hashes.</p>
                </div>
                <div className="pt-3 inline-flex items-center space-x-1 text-accent font-bold text-[11px]">
                  <span>Inspect Evidence</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              <Link
                href="/contact"
                className="p-5 bg-surface border border-border rounded-lg flex flex-col justify-between hover:border-accent transition-all group"
              >
                <div className="space-y-2">
                  <Mail className="w-5 h-5 text-accent" />
                  <div className="font-bold text-text-primary group-hover:text-accent">CONTACT Q-PSI</div>
                  <p className="text-[11px] font-sans text-text-secondary">Correspond directly with the research team.</p>
                </div>
                <div className="pt-3 inline-flex items-center space-x-1 text-accent font-bold text-[11px]">
                  <span>Get in Touch</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
