'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/content/siteConfig';

interface FooterProps {
  onOpenModal: (type?: 'deck' | 'contact') => void;
}

export function Footer({ onOpenModal }: FooterProps) {
  return (
    <footer className="bg-[#030303] border-t border-white/14 pt-16 pb-12 text-primaryWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="font-serif text-3xl font-bold tracking-tight">
                {siteConfig.company.mark}
              </span>
              <span className="text-sm font-mono tracking-widest uppercase font-semibold">
                {siteConfig.company.name}
              </span>
            </div>
            <p className="text-xs text-midGray max-w-sm leading-relaxed">
              {siteConfig.company.fullName} is an idea-stage deep-tech research initiative developing an authoritative state-first reality operating system for persistent AI worlds.
            </p>
            <div className="text-[11px] font-mono text-midGray">
              Parent Entity: <span className="text-softWhite">{siteConfig.company.parentCompany}</span>
            </div>
          </div>

          {/* Nav Column 1 */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-midGray font-semibold">
              Architecture & Research
            </div>
            <ul className="space-y-2 text-xs font-mono text-softWhite">
              <li>
                <a href="#problem" className="hover:text-primaryWhite transition-colors">
                  Continuity Problem
                </a>
              </li>
              <li>
                <a href="#smallest-unit" className="hover:text-primaryWhite transition-colors">
                  Two-Character Proof Atom
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-primaryWhite transition-colors">
                  State Engine Architecture
                </a>
              </li>
              <li>
                <a href="#quantum" className="hover:text-primaryWhite transition-colors">
                  Quantum & CUDA-Q Baseline
                </a>
              </li>
              <li>
                <Link href="/research" className="hover:text-primaryWhite transition-colors">
                  Research Papers & Claims
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-midGray font-semibold">
              Company & Investment
            </div>
            <ul className="space-y-2 text-xs font-mono text-softWhite">
              <li>
                <a href="#founder" className="hover:text-primaryWhite transition-colors">
                  Founder Background (Nishant Kumar Sinha)
                </a>
              </li>
              <li>
                <a href="#invest" className="hover:text-primaryWhite transition-colors">
                  Pre-Seed Raise ($500K Structure)
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('deck')}
                  className="hover:text-primaryWhite transition-colors text-left"
                >
                  Request Private Deck PDF
                </button>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primaryWhite transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-primaryWhite transition-colors">
                  Legal & Research Disclosures
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 border border-white/10 bg-white/[0.01] text-[11px] font-mono text-midGray leading-relaxed">
          <p>{siteConfig.finalCallout.footerLegal}</p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-midGray gap-4">
          <div>{siteConfig.finalCallout.copyright}</div>
          <div className="flex items-center space-x-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primaryWhite transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://sattvaos.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primaryWhite transition-colors"
            >
              SattvaOS
            </a>
            <a
              href="https://aatma.guru"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primaryWhite transition-colors"
            >
              aatma.guru
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
