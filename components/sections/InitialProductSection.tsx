'use client';

import React from 'react';
import { siteConfig } from '@/content/siteConfig';
import { ShieldCheck, CheckCircle2, UserCheck } from 'lucide-react';

export function InitialProductSection() {
  const modes = siteConfig.initialProduct.modes;
  const applications = siteConfig.initialProduct.commercialApplications;

  return (
    <section id="product" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] border-b border-white/14">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-midGray block font-semibold">
            INITIAL PRODUCT OFFERING
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-primaryWhite leading-tight whitespace-pre-line">
            {siteConfig.initialProduct.headline}
          </h2>
          <p className="text-base sm:text-lg text-softWhite leading-relaxed font-light">
            {siteConfig.initialProduct.description}
          </p>
        </div>

        {/* 3 Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map((m) => (
            <div
              key={m.code}
              className="p-6 border border-white/14 bg-[#090909] space-y-4 flex flex-col justify-between hover:border-white/30 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono font-bold text-bgBlack bg-primaryWhite px-2.5 py-1">
                    MODE {m.code}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-midGray">
                    Vertical-Neutral
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-primaryWhite">
                  {m.title}
                </h3>
                <p className="text-xs text-softWhite leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-midGray">
                <span className="text-primaryWhite font-semibold block mb-1">Target Commercial Output:</span>
                <span>{m.useCases}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial Applications List */}
        <div className="p-8 border border-white/14 bg-[#080808] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-serif font-bold text-primaryWhite">
              General Commercial & Enterprise Applications
            </h3>
            <span className="text-xs font-mono text-midGray">
              Broad applicability across media, creator, and corporate simulation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {applications.map((app, idx) => (
              <div
                key={idx}
                className="p-4 border border-white/10 bg-[#0C0C0C] flex items-center space-x-3 text-xs font-mono text-softWhite"
              >
                <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                <span>{app}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center space-x-3 text-xs font-mono text-midGray">
            <ShieldCheck className="w-4 h-4 text-white flex-shrink-0" />
            <span>{siteConfig.initialProduct.operatingPrinciple}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
