'use client';

import React from 'react';
import { siteConfig } from '@/content/siteConfig';
import { QuantumToggle } from '../visualizations/QuantumToggle';
import { AlertCircle } from 'lucide-react';

export function QuantumSection() {
  return (
    <section id="quantum" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] border-b border-black/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-midGray block font-semibold">
            QUANTUM: REAL ROLE, NO HYPE
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-primaryWhite leading-tight whitespace-pre-line">
            {siteConfig.quantum.headline}
          </h2>
          <p className="text-base sm:text-lg text-softWhite leading-relaxed font-light whitespace-pre-line">
            {siteConfig.quantum.body}
          </p>
        </div>

        {/* Benchmark Toggle Matrix */}
        <QuantumToggle />

        {/* Strict Disclaimers */}
        <div className="p-6 border border-black/15 bg-white space-y-3 font-mono text-xs text-midGray shadow-sm">
          <div className="flex items-center space-x-2 text-black font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-black" />
            <span>Strict Truthfulness Disclosures</span>
          </div>
          <ul className="space-y-1 pl-6 list-disc text-black/80 font-medium">
            {siteConfig.quantum.disclaimerNotes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
