'use client';

import React from 'react';
import { siteConfig } from '@/content/siteConfig';
import { ExpansionTimeline } from '../visualizations/ExpansionTimeline';
import { ShieldCheck } from 'lucide-react';

export function RoomToWorldSection() {
  return (
    <section id="expansion" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] border-b border-black/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-midGray block font-semibold">
            FROM ROOM TO WORLD
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-primaryWhite leading-tight whitespace-pre-line">
            {siteConfig.expansion.headline}
          </h2>
          <p className="text-base sm:text-lg text-softWhite leading-relaxed font-light whitespace-pre-line">
            {siteConfig.expansion.supportingCopy}
          </p>
        </div>

        {/* 8-Stage Interactive Stepper */}
        <ExpansionTimeline />

        {/* Permanent Original IP Clarification Notice */}
        <div className="p-6 border border-black/15 bg-white flex items-start space-x-4 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-black font-bold block">
              Permanent Intellectual Property & Format Clarification
            </span>
            <p className="text-xs font-mono text-midGray leading-relaxed">
              {siteConfig.expansion.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
