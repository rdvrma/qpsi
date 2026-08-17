'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/content/siteConfig';

interface FooterProps {
  onOpenModal?: (type?: 'deck' | 'contact') => void;
}

export function Footer({ onOpenModal }: FooterProps = {}) {
  return (
    <footer className="bg-surface-raised border-t border-border pt-14 pb-12 text-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-border">
          {/* Brand Identity */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5">
              <span className="font-serif text-2xl font-bold tracking-tight text-text-primary">
                {siteConfig.company.mark}
              </span>
              <span className="font-sans text-base font-bold text-text-primary">
                {siteConfig.company.name}
              </span>
              <span className="text-xs text-text-muted font-sans hidden sm:inline">
                &bull; Independent Quantum Research
              </span>
            </div>
            <p className="text-xs text-text-secondary font-sans">
              A research initiative of <strong className="text-text-primary font-semibold">{siteConfig.company.parentCompany}</strong>
            </p>
          </div>

          {/* Contact Details */}
          <div className="text-xs font-sans text-text-secondary">
            <span>Research Correspondence: </span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-accent font-semibold hover:underline"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </div>

        {/* Minimal Navigation Links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-sans text-text-secondary">
          <Link href="/research" className="hover:text-accent transition-colors">
            Research
          </Link>
          <Link href="/experiments" className="hover:text-accent transition-colors">
            Experiments
          </Link>
          <Link href="/compiler" className="hover:text-accent transition-colors">
            Compiler
          </Link>
          <Link href="/capsule" className="hover:text-accent transition-colors">
            Research Capsule
          </Link>
          <Link href="/papers" className="hover:text-accent transition-colors">
            Papers
          </Link>
          <Link href="/blog" className="hover:text-accent transition-colors">
            Blog
          </Link>
          <Link href="/evidence" className="hover:text-accent transition-colors">
            Evidence
          </Link>
          <Link href="/support" className="hover:text-accent transition-colors">
            Support
          </Link>
          <Link href="/about" className="hover:text-accent transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-accent transition-colors">
            Contact
          </Link>
          <Link href="/legal" className="hover:text-accent transition-colors">
            Legal &amp; Disclosures
          </Link>
          <Link href="/privacy" className="hover:text-accent transition-colors">
            Privacy Policy
          </Link>
        </div>

        {/* Bottom Disclosures */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-sans text-text-muted gap-3">
          <div>
            &copy; {siteConfig.company.copyrightYear} {siteConfig.company.fullName}. All research published under open-science principles.
          </div>
          <div className="font-mono text-[10px] text-text-muted">
            PHYSICAL HARDWARE: IBM QUANTUM (ibm_marrakesh &bull; 156Q)
          </div>
        </div>
      </div>
    </footer>
  );
}
