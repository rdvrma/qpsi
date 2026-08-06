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
                  ? 'border-black bg-white shadow-md'
                  : 'border-black/10 bg-white hover:border-black/30'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFailureGlow"
                  className="absolute inset-0 border-b-2 border-black pointer-events-none"
                  transition={{ duration: 0.2 }}
                />
              )}
              <div className="text-[10px] font-mono tracking-widest uppercase text-midGray mb-2 font-medium">
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
          className="border border-black/15 bg-white p-6 sm:p-8 space-y-6 shadow-sm"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-black/10 gap-4">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-midGray block mb-1 font-medium">
                Failure Breakdown & Preservation Engine
              </span>
              <h3 className="text-2xl font-serif text-primaryWhite font-bold">
                {activeMode.title} — {activeMode.subtitle}
              </h3>
            </div>
            <div className="px-3 py-1.5 border border-black/20 text-xs font-mono uppercase tracking-wider text-primaryWhite bg-black/[0.03] self-start sm:self-auto font-medium">
              Interactive Diagnostic
            </div>
          </div>

          {/* 3 Column Diagnostic Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Column 1: Current Approach */}
            <div className="p-5 border border-black/10 bg-[#F8F9FA] space-y-3">
              <div className="flex items-center space-x-2 text-midGray">
                <Cpu className="w-4 h-4 text-black/70" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-black/80">
                  Current Industry Approach
                </span>
              </div>
              <p className="text-xs text-softWhite leading-relaxed">
                {activeMode.currentApproach}
              </p>
            </div>

            {/* Column 2: Why It Breaks */}
            <div className="p-5 border border-red-200 bg-[#FFF5F5] space-y-3">
              <div className="flex items-center space-x-2 text-red-700">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-red-900">
                  Why Stateless Generative AI Breaks
                </span>
              </div>
              <p className="text-xs text-red-950 leading-relaxed">
                {activeMode.whyItBreaks}
              </p>
            </div>

            {/* Column 3: What Q-Psi Preserves */}
            <div className="p-5 border border-emerald-300 bg-[#F0FDF4] space-y-3">
              <div className="flex items-center space-x-2 text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-emerald-900">
                  What Q-Psi Engine Preserves
                </span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                {activeMode.qPsiPreserves}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
