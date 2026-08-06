'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/content/siteConfig';
import { FailureVisualization } from '../visualizations/FailureVisualization';

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] border-b border-black/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-midGray block font-semibold">
            {siteConfig.problem.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-primaryWhite leading-tight whitespace-pre-line">
            {siteConfig.problem.headline}
          </h2>
          <p className="text-base sm:text-lg text-softWhite leading-relaxed font-light whitespace-pre-line">
            {siteConfig.problem.body}
          </p>
        </div>

        {/* 4-Part Interactive Failure Diagnostic Matrix */}
        <FailureVisualization />

        {/* Closing Thesis Statement */}
        <div className="p-8 border border-black/15 bg-white text-center space-y-2 shadow-sm">
          <p className="font-serif text-xl sm:text-2xl font-bold text-primaryWhite">
            “{siteConfig.problem.finalStatement}”
          </p>
          <p className="text-xs font-mono text-midGray uppercase tracking-widest font-medium">
            State OS &gt; Generative Model Sampling
          </p>
        </div>
      </div>
    </section>
  );
}
