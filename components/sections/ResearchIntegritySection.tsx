'use client';

import React from 'react';
import { siteConfig } from '@/content/siteConfig';
import { CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

export function ResearchIntegritySection() {
  const allowed = siteConfig.claimsComparison.allowed;
  const notAllowed = siteConfig.claimsComparison.notAllowed;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] border-b border-black/10">
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
          <div className="p-6 border border-emerald-300 bg-emerald-50/50 space-y-6 shadow-xs">
            <div className="flex items-center space-x-2 border-b border-emerald-200 pb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-800" />
              <h3 className="text-xl font-serif font-bold text-emerald-950">
                What We Claim Today (Truthful Baseline)
              </h3>
            </div>

            <ul className="space-y-3">
              {allowed.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-3 text-xs font-mono text-emerald-950 leading-relaxed font-medium"
                >
                  <span className="text-emerald-800 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Claims NOT Allowed Today */}
          <div className="p-6 border border-red-200 bg-red-50/50 space-y-6 shadow-xs">
            <div className="flex items-center space-x-2 border-b border-red-200 pb-4">
              <XCircle className="w-5 h-5 text-red-800" />
              <h3 className="text-xl font-serif font-bold text-red-950">
                What We Do NOT Claim Today (No-Hype Policy)
              </h3>
            </div>

            <ul className="space-y-3">
              {notAllowed.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-3 text-xs font-mono text-red-950 leading-relaxed font-medium"
                >
                  <span className="text-red-800 font-bold">✕</span>
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
