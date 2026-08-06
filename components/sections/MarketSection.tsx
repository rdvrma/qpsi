'use client';

import React from 'react';
import { siteConfig } from '@/content/siteConfig';
import { MarketVisualization } from '../visualizations/MarketVisualization';

export function MarketSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] border-b border-white/14">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-midGray block font-semibold">
            TARGET MARKET OPPORTUNITY
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-primaryWhite leading-tight">
            {siteConfig.marketOpportunity.headline}
          </h2>
          <p className="text-base sm:text-lg text-softWhite leading-relaxed font-light">
            {siteConfig.marketOpportunity.narrative}
          </p>
        </div>

        {/* Concentric Market Visualizer & Source Table */}
        <MarketVisualization />
      </div>
    </section>
  );
}
