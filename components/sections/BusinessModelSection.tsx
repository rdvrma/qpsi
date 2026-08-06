'use client';

import React from 'react';
import { siteConfig } from '@/content/siteConfig';
import { ShieldAlert, DollarSign } from 'lucide-react';

export function BusinessModelSection() {
  const cards = siteConfig.businessModel.cards;

  return (
    <section id="business-model" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] border-b border-black/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-midGray block font-semibold">
            COMMERCIAL MONETIZATION MODEL
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-primaryWhite leading-tight">
            {siteConfig.businessModel.headline}
          </h2>
          <p className="text-base sm:text-lg text-softWhite leading-relaxed font-light">
            {siteConfig.businessModel.subheadline}
          </p>
        </div>

        {/* Planning Range Banner */}
        <div className="p-6 border border-black/15 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-midGray block mb-1 font-medium">
              Early B2B Planning Hypothesis Range
            </span>
            <div className="text-2xl font-serif font-bold text-primaryWhite">
              {siteConfig.businessModel.planningRange}
            </div>
          </div>
          <span className="px-3 py-1.5 border border-black/20 text-[11px] font-mono uppercase text-black bg-black/[0.03] self-start sm:self-auto font-medium">
            {siteConfig.businessModel.planningRangeLabel}
          </span>
        </div>

        {/* 8 Revenue Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="p-6 border border-black/15 bg-white space-y-4 flex flex-col justify-between hover:border-black/30 transition-all group shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <span className="text-xs font-mono font-bold text-midGray group-hover:text-black transition-colors">
                    {card.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-black border border-black/15 px-2 py-0.5 font-medium">
                    {card.range}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-primaryWhite">
                  {card.title}
                </h3>
                <p className="text-xs text-softWhite leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 text-[11px] font-mono text-midGray">
                <span className="text-black font-medium">{card.range}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Disclaimer */}
        <div className="p-4 border border-black/10 bg-[#F8F9FA] flex items-center space-x-3 text-xs font-mono text-midGray">
          <ShieldAlert className="w-4 h-4 text-black flex-shrink-0" />
          <span>{siteConfig.businessModel.earlyRevenuePrinciple}</span>
        </div>
      </div>
    </section>
  );
}
