'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/content/siteConfig';

interface FooterProps {
  onOpenModal?: (type?: 'deck' | 'contact') => void;
}

export function Footer({ onOpenModal }: FooterProps = {}) {
  return (
    <footer className="bg-surface-raised border-t border-border pt-16 pb-12 text-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Parent Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="font-serif text-3xl font-bold tracking-tight text-text-primary">
                {siteConfig.company.mark}
              </span>
              <div className="h-5 w-px bg-border" />
              <span className="text-sm font-mono tracking-widest uppercase font-bold text-text-primary">
                {siteConfig.company.name}
              </span>
            </div>
            <p className="text-xs text-text-secondary max-w-sm leading-relaxed">
              Q-Psi is an independent quantum research initiative conducting physical-QPU experiments, compiler research, and reproducible quantum computing studies.
            </p>
            <div className="text-[11px] font-mono text-text-muted space-y-1">
              <div>
                Parent Initiative: <span className="text-text-primary font-semibold">{siteConfig.company.parentCompany}</span>
              </div>
              <div>
                Sibling Initiative: <span className="text-text-primary font-semibold">{siteConfig.company.siblingCompany}</span>
              </div>
              <div>
                Authoritative Contact: <a href={`mailto:${siteConfig.contact.email}`} className="text-accent hover:underline">{siteConfig.contact.email}</a>
              </div>
            </div>
          </div>

          {/* Research & Experiments Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-text-secondary font-bold">
              Research &amp; Papers
            </div>
            <ul className="space-y-2 text-xs font-mono text-text-secondary">
              <li>
                <Link href="/research" className="hover:text-accent transition-colors">
                  Research Overview
                </Link>
              </li>
              <li>
                <Link href="/experiments" className="hover:text-accent transition-colors">
                  Physical QPU Benchmarks
                </Link>
              </li>
              <li>
                <Link href="/compiler" className="hover:text-accent transition-colors">
                  State Space Compiler
                </Link>
              </li>
              <li>
                <Link href="/papers" className="hover:text-accent transition-colors">
                  Manuscripts &amp; Research Notes
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">
                  Scientific Blog &amp; Deep Dives
                </Link>
              </li>
              <li>
                <Link href="/evidence" className="hover:text-accent transition-colors">
                  Verified Evidence Index
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional & Legal Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-text-secondary font-bold">
              Organization &amp; Support
            </div>
            <ul className="space-y-2 text-xs font-mono text-text-secondary">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About &amp; Parent Ecosystem
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-accent transition-colors">
                  Q-Psi Research Support Fund
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.funding.payPalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center space-x-1"
                >
                  <span>Support via PayPal (Direct)</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Research Collaboration &amp; Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-accent transition-colors">
                  Legal &amp; Open Science Disclosures
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights & Disclaimer */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-text-muted space-y-4 sm:space-y-0">
          <div>
            © {siteConfig.company.copyrightYear} {siteConfig.company.fullName}. All research published under open science disclaimers.
          </div>
          <div className="flex items-center space-x-4">
            <span>IBM Quantum Hardware: <strong className="text-text-primary">ibm_marrakesh</strong></span>
            <span>Parent: <strong className="text-text-primary">The Oneness Project</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
