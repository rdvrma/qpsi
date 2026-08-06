'use client';

import React from 'react';
import { siteConfig } from '@/content/siteConfig';
import { ArrowUpRight, CheckCircle2, Shield } from 'lucide-react';

interface InvestmentAskSectionProps {
  onOpenModal: (type?: 'deck' | 'contact') => void;
}

export function InvestmentAskSection({ onOpenModal }: InvestmentAskSectionProps) {
  const ask = siteConfig.investmentAsk;

  return (
    <section id="invest" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] text-primaryWhite border-b border-black/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono tracking-widest uppercase text-midGray font-semibold">
              INVESTMENT OPPORTUNITY
            </span>
            <span className="px-2 py-0.5 border border-black/20 text-[10px] font-mono text-black uppercase font-medium bg-black/[0.03]">
              {ask.label}
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-primaryWhite leading-tight">
            {ask.headline}
          </h2>
          <p className="text-base sm:text-lg text-softWhite leading-relaxed font-light">
            {ask.summary}
          </p>
        </div>

        {/* 5 Use of Funds Breakdown Cards */}
        <div className="space-y-4">
          <h3 className="text-2xl font-serif font-bold text-primaryWhite">
            Use of Capital Allocation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ask.breakdown.map((item, idx) => (
              <div
                key={idx}
                className="p-5 border border-black/15 bg-white space-y-2 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-1">
                  <div className="text-3xl font-serif font-bold text-black">
                    {item.percentage}
                  </div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                    {item.category}
                  </div>
                </div>
                <p className="text-[11px] text-midGray font-mono leading-relaxed pt-2 border-t border-black/10">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Milestone-Based Capital Gates */}
        <div className="space-y-4 pt-6 border-t border-black/10">
          <h3 className="text-2xl font-serif font-bold text-primaryWhite">
            Milestone-Based Proof Gates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ask.gates.map((g, idx) => (
              <div
                key={idx}
                className="p-4 border border-black/10 bg-white space-y-2 font-mono text-xs shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-black/10 pb-2">
                  <span className="font-bold text-black">{g.gate}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-midGray" />
                </div>
                <div className="font-bold text-black">{g.title}</div>
                <p className="text-[11px] text-midGray leading-relaxed">{g.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="p-8 border border-black/20 bg-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-2xl font-serif font-bold text-black">
              Request Confidential Deck & Technical Proof Specifications
            </h4>
            <p className="text-xs font-mono text-midGray">
              Direct contact with founder Nishant Kumar Sinha
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href="/QPsi_Investor_Deck_Final_10_Pages.pdf"
              download="QPsi_Investor_Deck_Final_10_Pages.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-black text-white hover:bg-black/85 transition-all font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 text-center border border-black shadow-sm"
            >
              <span>Download PDF Deck</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => onOpenModal('deck')}
              className="w-full sm:w-auto px-8 py-4 border border-black/20 text-black hover:bg-black/5 transition-all font-mono text-xs font-bold uppercase tracking-widest"
            >
              Request Access
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
