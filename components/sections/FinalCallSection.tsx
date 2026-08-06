'use client';

import React from 'react';
import { siteConfig } from '@/content/siteConfig';
import { ArrowUpRight, Mail } from 'lucide-react';

interface FinalCallSectionProps {
  onOpenModal: (type?: 'deck' | 'contact') => void;
}

export function FinalCallSection({ onOpenModal }: FinalCallSectionProps) {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#030303] text-primaryWhite min-h-[80vh] flex flex-col justify-center border-b border-white/14 relative overflow-hidden">
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 text-center relative z-10">
        {/* Large Closing Statement */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] whitespace-pre-line text-primaryWhite max-w-4xl mx-auto">
          {siteConfig.finalCallout.headline}
        </h2>

        {/* Founder Signoff */}
        <div className="space-y-2 pt-4 border-t border-white/10 max-w-xs mx-auto">
          <div className="font-serif text-2xl font-bold text-primaryWhite">
            {siteConfig.company.mark}
          </div>
          <div className="text-xs font-mono uppercase tracking-widest text-primaryWhite font-semibold">
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
            className="w-full sm:w-auto px-8 py-4 bg-primaryWhite text-bgBlack hover:bg-white transition-all font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 border border-primaryWhite"
          >
            <span>Request Investor Deck</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenModal('contact')}
            className="w-full sm:w-auto px-8 py-4 border border-white/20 bg-white/[0.02] text-primaryWhite hover:bg-white/10 hover:border-white transition-all font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Founder</span>
          </button>
        </div>
      </div>
    </section>
  );
}
