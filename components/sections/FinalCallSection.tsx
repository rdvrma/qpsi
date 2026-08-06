'use client';

import React from 'react';
import { siteConfig } from '@/content/siteConfig';
import { ArrowUpRight, Mail } from 'lucide-react';

interface FinalCallSectionProps {
  onOpenModal: (type?: 'deck' | 'contact') => void;
}

export function FinalCallSection({ onOpenModal }: FinalCallSectionProps) {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white text-primaryWhite min-h-[80vh] flex flex-col justify-center border-b border-black/10 relative overflow-hidden">
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 text-center relative z-10">
        {/* Large Closing Statement */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] whitespace-pre-line text-primaryWhite max-w-4xl mx-auto">
          {siteConfig.finalCallout.headline}
        </h2>

        {/* Founder Signoff */}
        <div className="space-y-2 pt-4 border-t border-black/10 max-w-xs mx-auto">
          <div className="font-serif text-2xl font-bold text-black">
            {siteConfig.company.mark}
          </div>
          <div className="text-xs font-mono uppercase tracking-widest text-black font-bold">
            {siteConfig.company.fullName}
          </div>
          <div className="text-xs font-mono text-midGray">
            Nishant Kumar Sinha — Founder & Director
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button
            onClick={() => onOpenModal('deck')}
            className="w-full sm:w-auto px-8 py-4 bg-black text-white hover:bg-black/85 transition-all font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 border border-black shadow-md"
          >
            <span>Request Investor Deck</span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={() => onOpenModal('contact')}
            className="w-full sm:w-auto px-8 py-4 border border-black/20 bg-black/[0.03] text-primaryWhite hover:bg-black/10 hover:border-black transition-all font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2"
          >
            <Mail className="w-4 h-4 text-black" />
            <span>Contact Founder</span>
          </button>
        </div>
      </div>
    </section>
  );
}
