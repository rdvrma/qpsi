'use client';

import React from 'react';
import { siteConfig } from '@/content/siteConfig';
import { CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

export function ResearchIntegritySection() {
  const allowed = siteConfig.claimsComparison.allowed;
  const notAllowed = siteConfig.claimsComparison.notAllowed;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] border-b border-white/14">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-midGray block font-semibold">
            RESEARCH INTEGRITY & DISCLOSURE POLICY
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-primaryWhite leading-tight whitespace-pre-line">
            {siteConfig.claimsComparison.heading}
          </h2>
          <p className="text-base sm:text-lg text-softWhite leading-relaxed font-light">
            Q-Psi strictly enforces a truth-in-technology policy. We refuse to manufacture artificial technical credibility or exaggerate current prototype readiness.
          </p>
        </div>

        {/* Dual Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1: Claims Allowed Today */}
          <div className="p-6 border border-white/20 bg-[#090909] space-y-6">
            <div className="flex items-center space-x-2 border-b border-white/10 pb-4">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <h3 className="text-xl font-serif font-bold text-primaryWhite">
                What We Claim Today (Truthful Baseline)
              </h3>
            </div>

            <ul className="space-y-3">
              {allowed.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-3 text-xs font-mono text-softWhite leading-relaxed"
                >
                  <span className="text-white font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Claims NOT Allowed Today */}
          <div className="p-6 border border-white/14 bg-[#0A0606] space-y-6">
            <div className="flex items-center space-x-2 border-b border-white/10 pb-4">
              <XCircle className="w-5 h-5 text-white/60" />
              <h3 className="text-xl font-serif font-bold text-primaryWhite">
                What We Do NOT Claim Today (No-Hype Policy)
              </h3>
            </div>

            <ul className="space-y-3">
              {notAllowed.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-3 text-xs font-mono text-midGray leading-relaxed"
                >
                  <span className="text-white/60 font-bold">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
