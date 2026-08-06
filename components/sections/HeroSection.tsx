'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/content/siteConfig';
import { ArrowDown, ArrowUpRight, Shield } from 'lucide-react';
import { LedgerTimeline } from '../visualizations/LedgerTimeline';

interface HeroSectionProps {
  onOpenModal: (type?: 'deck' | 'contact') => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [phase, setPhase] = useState<'intro' | 'fragments' | 'reveal'>('intro');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase('fragments');
    }, 2400);

    const timer2 = setTimeout(() => {
      setPhase('reveal');
    }, 5600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section className="relative min-w-full min-h-screen bg-[#FAFAFA] flex flex-col justify-between pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-black/10 overflow-hidden">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Cinematic Intro Animation Sequence */}
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="my-auto text-center py-32 space-y-4"
          >
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-softWhite font-light tracking-wide max-w-2xl mx-auto italic">
              “{siteConfig.hero.introSentence}”
            </p>
          </motion.div>
        )}

        {phase === 'fragments' && (
          <motion.div
            key="fragments"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="my-auto py-32 flex flex-wrap items-center justify-center gap-6 sm:gap-12 max-w-4xl mx-auto"
          >
            {siteConfig.hero.vanishingFragments.map((frag, idx) => (
              <motion.span
                key={frag}
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{
                  opacity: [0, 1, 0.4, 1],
                  scale: [0.8, 1, 0.95, 1],
                  filter: ['blur(10px)', 'blur(0px)', 'blur(2px)', 'blur(0px)'],
                }}
                transition={{ duration: 2, delay: idx * 0.25 }}
                className="font-mono text-sm sm:text-lg tracking-widest text-black/80 border border-black/10 px-4 py-2 bg-black/[0.03]"
              >
                {frag}
              </motion.span>
            ))}
          </motion.div>
        )}

        {phase === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto my-auto space-y-10 pt-8"
          >
            {/* Top Stage Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center space-x-2 px-3 py-1 border border-black/15 bg-black/[0.03] text-xs font-mono text-softWhite uppercase tracking-widest font-medium">
                <Shield className="w-3.5 h-3.5 text-black" />
                <span>{siteConfig.company.stageBadge}</span>
              </span>
              <span className="text-xs font-mono text-midGray">
                Primary Architecture Proof Target: Two-Character Room
              </span>
            </div>

            {/* QΨ Mark & Brand Title */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-black">
                  {siteConfig.company.mark}
                </span>
                <div className="h-10 w-px bg-black/20" />
                <div>
                  <h2 className="text-xl font-mono uppercase font-bold tracking-widest text-primaryWhite">
                    {siteConfig.company.name}
                  </h2>
                  <span className="text-xs font-mono uppercase tracking-wider text-midGray font-medium">
                    {siteConfig.company.tagline}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-primaryWhite leading-[1.08] whitespace-pre-line">
              {siteConfig.hero.headline}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-xl text-softWhite max-w-3xl leading-relaxed font-sans font-light">
              {siteConfig.hero.supportingCopy}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <a
                href="/prototype"
                className="px-8 py-4 bg-black text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-black/85 transition-all text-center border border-black shadow-lg flex items-center justify-center gap-2"
              >
                <span>RUN LIVE PROTOTYPE</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </a>

              <a
                href="#problem"
                className="px-8 py-4 border border-black/20 bg-black/[0.03] text-primaryWhite hover:bg-black/10 transition-all font-mono text-xs font-semibold uppercase tracking-widest text-center"
              >
                {siteConfig.hero.primaryCta}
              </a>

              <a
                href="/QPsi_Investor_Deck_Final_10_Pages.pdf"
                download="QPsi_Investor_Deck_Final_10_Pages.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 border border-black/20 bg-black/[0.03] text-primaryWhite hover:bg-black/10 hover:border-black transition-all font-mono text-xs font-semibold uppercase tracking-widest text-center"
              >
                <span>{siteConfig.hero.secondaryCta} (PDF)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Founder Proof Strip */}
            <div className="bg-white border border-black/12 rounded p-3 font-mono text-xs text-black/80 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] shadow-sm">
              <span className="text-black font-bold">FOUNDER PROOF STRIP:</span>
              <span className="text-emerald-700 font-semibold">✓ Classical state engine verified</span>
              <span className="text-black/30">•</span>
              <span className="text-emerald-700 font-semibold">✓ Append-only ledger</span>
              <span className="text-black/30">•</span>
              <span className="text-emerald-700 font-semibold">✓ Belief separation</span>
              <span className="text-black/30">•</span>
              <span className="text-emerald-700 font-semibold">✓ Contradiction rejection</span>
              <span className="text-black/30">•</span>
              <span className="text-emerald-700 font-semibold">✓ Deterministic replay</span>
            </div>

            {/* Live Ledger Micro Stream */}
            <div className="pt-8">
              <LedgerTimeline />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Scroll Cue */}
      <div className="flex items-center justify-between text-xs font-mono text-midGray border-t border-black/10 pt-4">
        <span>Q-Psi Persistent World Engine</span>
        <a href="#problem" className="flex items-center space-x-1 hover:text-black transition-colors">
          <span>Scroll down</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
