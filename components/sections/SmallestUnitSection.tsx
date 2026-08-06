'use client';

import React from 'react';
import { siteConfig } from '@/content/siteConfig';
import { RoomDiagram } from '../visualizations/RoomDiagram';
import { CheckCircle } from 'lucide-react';

export function SmallestUnitSection() {
  return (
    <section id="smallest-unit" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F5F2] text-bgBlack border-b border-white/14">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-[#555555] block font-semibold">
            THE SMALLEST REPEATABLE UNIT
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-bgBlack leading-tight whitespace-pre-line">
            {siteConfig.smallestUnit.headline}
          </h2>
          <p className="text-base sm:text-lg text-[#333333] leading-relaxed font-light">
            {siteConfig.smallestUnit.supportingText}
          </p>
        </div>

        {/* Interactive Room State Machine Diagram */}
        <RoomDiagram />

        {/* 10 Technical Proof Criteria */}
        <div className="space-y-6 pt-6 border-t border-black/10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-serif font-bold text-bgBlack">
              First Technical Proof Acceptance Criteria
            </h3>
            <span className="text-xs font-mono text-[#555555]">
              10 Mandatory Audit Benchmarks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {siteConfig.smallestUnit.proofCriteria.map((criterion, idx) => (
              <div
                key={idx}
                className="p-4 border border-black/10 bg-white flex items-start space-x-3 text-xs font-mono text-[#222222]"
              >
                <CheckCircle className="w-4 h-4 text-bgBlack flex-shrink-0 mt-0.5" />
                <span className="leading-normal">{criterion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="p-6 border-2 border-black bg-white text-center">
          <p className="font-serif text-xl sm:text-2xl font-bold text-bgBlack">
            “{siteConfig.smallestUnit.bottomStatement}”
          </p>
        </div>
      </div>
    </section>
  );
}
