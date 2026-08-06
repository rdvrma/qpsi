'use client';

import React from 'react';
import { siteConfig } from '@/content/siteConfig';
import { UserCheck, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface FounderSectionProps {
  onOpenModal: (type?: 'deck' | 'contact') => void;
}

export function FounderSection({ onOpenModal }: FounderSectionProps) {
  const f = siteConfig.founder;

  return (
    <section id="founder" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] border-b border-white/14">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-midGray block font-semibold">
            FOUNDER PROFILE & LEADERSHIP
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-primaryWhite leading-tight whitespace-pre-line">
            {f.headline}
          </h2>
        </div>

        {/* Profile Card & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Identity Card */}
          <div className="lg:col-span-5 border border-white/20 bg-[#090909] p-6 space-y-6">
            <div className="space-y-2 border-b border-white/10 pb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-midGray">
                Official Founder Identity
              </span>
              <h3 className="text-3xl font-serif font-bold text-primaryWhite">
                {f.officialIdentity.name}
              </h3>
              <p className="text-xs font-mono text-softWhite font-semibold">
                {f.officialIdentity.title}
              </p>
              <p className="text-xs font-mono text-midGray">
                {f.officialIdentity.corporateRole}
              </p>
            </div>

            {/* Education Record */}
            <div className="space-y-2 border-b border-white/10 pb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-midGray block">
                Education & Background Record
              </span>
              <p className="text-xs text-softWhite leading-relaxed font-mono">
                {f.education}
              </p>
              <div className="p-3 border border-white/10 bg-black/40 text-[11px] font-mono text-midGray">
                {f.educationTruthfulnessNotice}
              </div>
            </div>

            {/* Contact CTA */}
            <button
              onClick={() => onOpenModal('contact')}
              className="w-full py-3 border border-white bg-primaryWhite text-bgBlack hover:bg-white transition-colors text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <span>Connect with Nishant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Column: Bio, Philosophy & Operating Model */}
          <div className="lg:col-span-7 space-y-8">
            {/* Bio */}
            <div className="space-y-4">
              <h4 className="text-xl font-serif font-bold text-primaryWhite">
                Background & Executive Scope
              </h4>
              <p className="text-sm text-softWhite leading-relaxed whitespace-pre-line font-light">
                {f.bio}
              </p>
            </div>

            {/* Philosophy Quote */}
            <div className="p-6 border-l-2 border-white bg-white/[0.02] space-y-2">
              <p className="font-serif text-xl sm:text-2xl text-primaryWhite italic">
                {f.philosophyQuote}
              </p>
              <span className="text-xs font-mono text-midGray block uppercase tracking-widest">
                — Nishant Kumar Sinha
              </span>
            </div>

            {/* Operating Model */}
            <div className="space-y-3">
              <h4 className="text-sm font-mono uppercase tracking-wider font-bold text-primaryWhite">
                Founder Operating Model
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {f.operatingModel.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-white/10 bg-[#0A0A0A] flex items-center space-x-2.5 text-xs font-mono text-softWhite"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cofounder Statement */}
            <div className="p-6 border border-white/14 bg-[#080808] space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-primaryWhite font-bold block">
                Open Co-Founder Alignment Policy
              </span>
              <p className="text-xs font-mono text-softWhite leading-relaxed whitespace-pre-line">
                {f.cofounderStatement}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
