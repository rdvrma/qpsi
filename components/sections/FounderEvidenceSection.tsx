'use client';

import React from 'react';
import { siteConfig } from '@/content/siteConfig';
import { ExternalLink, Layers, ShieldCheck } from 'lucide-react';

export function FounderEvidenceSection() {
  const ev = siteConfig.founderEvidence;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] border-b border-white/14">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-midGray block font-semibold">
            FOUNDER EXECUTION EVIDENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-primaryWhite leading-tight whitespace-pre-line">
            {ev.heading}
          </h2>
        </div>

        {/* 3 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ev.projects.map((proj, idx) => (
            <div
              key={idx}
              className="p-6 border border-white/14 bg-[#090909] space-y-4 flex flex-col justify-between hover:border-white/30 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono font-bold text-midGray">
                    {proj.subtitle}
                  </span>
                  {proj.url.startsWith('http') && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-white flex items-center space-x-1 hover:underline"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <h3 className="text-2xl font-serif font-bold text-primaryWhite">
                  {proj.title}
                </h3>
                <p className="text-xs text-softWhite leading-relaxed">
                  {proj.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Capital Efficiency Callout */}
        <div className="p-6 border border-white/20 bg-white/[0.02] flex items-start space-x-4">
          <ShieldCheck className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-primaryWhite font-bold block">
              {ev.resourcefulness.title}
            </span>
            <p className="text-xs font-mono text-midGray leading-relaxed">
              {ev.resourcefulness.statement}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
