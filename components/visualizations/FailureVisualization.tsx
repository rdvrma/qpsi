'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig, FailureMode } from '@/content/siteConfig';
import { ShieldAlert, ShieldCheck, Cpu } from 'lucide-react';

export function FailureVisualization() {
  const [activeId, setActiveId] = useState<string>(siteConfig.problem.failureModes[0].id);
  const activeMode = siteConfig.problem.failureModes.find((m) => m.id === activeId) || siteConfig.problem.failureModes[0];

  return (
    <div className="w-full space-y-8">
      {/* Failure Mode Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {siteConfig.problem.failureModes.map((mode) => {
          const isActive = mode.id === activeId;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveId(mode.id)}
              onMouseEnter={() => setActiveId(mode.id)}
              className={`text-left p-5 border transition-all relative overflow-hidden ${
                isActive
                  ? 'border-white bg-white/[0.04]'
                  : 'border-white/14 bg-black/40 hover:border-white/30 hover:bg-white/[0.02]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFailureGlow"
                  className="absolute inset-0 border-b-2 border-white pointer-events-none"
                  transition={{ duration: 0.2 }}
                />
              )}
              <div className="text-[10px] font-mono tracking-widest uppercase text-midGray mb-2">
                {mode.subtitle}
              </div>
              <h4 className="text-lg font-serif font-bold text-primaryWhite mb-1">
                {mode.title}
              </h4>
              <p className="text-xs text-midGray line-clamp-2 leading-relaxed">
                {mode.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Interactive Detail Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="border border-white/20 bg-[#090909] p-6 sm:p-8 space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-midGray block mb-1">
                Failure Breakdown & Preservation Engine
              </span>
              <h3 className="text-2xl font-serif text-primaryWhite font-bold">
                {activeMode.title} — {activeMode.subtitle}
              </h3>
            </div>
            <div className="px-3 py-1.5 border border-white/20 text-xs font-mono uppercase tracking-wider text-softWhite bg-white/[0.02] self-start sm:self-auto">
              Interactive Diagnostic
            </div>
          </div>

          {/* 3 Column Diagnostic Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Column 1: Current Approach */}
            <div className="p-5 border border-white/10 bg-[#0E0E0E] space-y-3">
              <div className="flex items-center space-x-2 text-midGray">
                <Cpu className="w-4 h-4 text-midGray" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                  Current Industry Approach
                </span>
              </div>
              <p className="text-xs text-softWhite leading-relaxed">
                {activeMode.currentApproach}
              </p>
            </div>

            {/* Column 2: Why It Breaks */}
            <div className="p-5 border border-white/14 bg-[#110A0A] space-y-3">
              <div className="flex items-center space-x-2 text-midGray">
                <ShieldAlert className="w-4 h-4 text-white/70" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-white/80">
                  Why Stateless Generative AI Breaks
                </span>
              </div>
              <p className="text-xs text-softWhite leading-relaxed">
                {activeMode.whyItBreaks}
              </p>
            </div>

            {/* Column 3: What Q-Psi Preserves */}
            <div className="p-5 border border-white/30 bg-white/[0.03] space-y-3">
              <div className="flex items-center space-x-2 text-primaryWhite">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-white">
                  What Q-Psi Engine Preserves
                </span>
              </div>
              <p className="text-xs text-primaryWhite leading-relaxed">
                {activeMode.qPsiPreserves}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
