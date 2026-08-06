'use client';

import React from 'react';
import { siteConfig } from '@/content/siteConfig';
import { ShieldAlert, DollarSign } from 'lucide-react';

export function BusinessModelSection() {
  const cards = siteConfig.businessModel.cards;

  return (
    <section id="business-model" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] border-b border-white/14">
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
        <div className="p-6 border border-white/20 bg-white/[0.03] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-midGray block mb-1">
              Early B2B Planning Hypothesis Range
            </span>
            <div className="text-2xl font-serif font-bold text-primaryWhite">
              {siteConfig.businessModel.planningRange}
            </div>
          </div>
          <span className="px-3 py-1.5 border border-white/20 text-[11px] font-mono uppercase text-midGray bg-black/40 self-start sm:self-auto">
            {siteConfig.businessModel.planningRangeLabel}
          </span>
        </div>

        {/* 8 Revenue Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="p-6 border border-white/14 bg-[#090909] space-y-4 flex flex-col justify-between hover:border-white/30 hover:bg-white/[0.02] transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono font-bold text-midGray group-hover:text-white transition-colors">
                    {card.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-midGray border border-white/10 px-2 py-0.5">
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
            </div>
          ))}
        </div>

        {/* Operating Principle Callout */}
        <div className="p-6 border border-white/14 bg-[#080808] text-center">
          <p className="font-serif text-lg sm:text-xl font-bold text-primaryWhite">
            “{siteConfig.businessModel.earlyRevenuePrinciple}”
          </p>
        </div>
      </div>
    </section>
  );
}
