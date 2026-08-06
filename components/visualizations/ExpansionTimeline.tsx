'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/content/siteConfig';
import { ChevronRight, ArrowRight, Layers } from 'lucide-react';

export function ExpansionTimeline() {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const stages = siteConfig.expansion.stages;
  const activeStage = stages[activeStageIndex];

  return (
    <div className="w-full space-y-8">
      {/* Horizontal Stage Selector / Progress Line */}
      <div className="relative pt-4">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/14 -translate-y-1/2 hidden md:block" />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 relative z-10">
          {stages.map((st, idx) => {
            const isActive = idx === activeStageIndex;
            const isPassed = idx < activeStageIndex;

            return (
              <button
                key={st.stage}
                onClick={() => setActiveStageIndex(idx)}
                className={`flex flex-col items-center p-3 text-center transition-all border ${
                  isActive
                    ? 'border-white bg-white/[0.08] text-primaryWhite scale-105 shadow-xl'
                    : isPassed
                    ? 'border-white/30 bg-white/[0.02] text-softWhite'
                    : 'border-white/10 bg-black/40 text-midGray hover:border-white/20'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-mono mb-2 ${
                    isActive
                      ? 'border-white bg-white text-bgBlack font-bold'
                      : isPassed
                      ? 'border-white/40 text-white'
                      : 'border-white/20 text-midGray'
                  }`}
                >
                  {st.stage}
                </div>
                <span className="text-[11px] font-mono tracking-tight font-semibold line-clamp-1">
                  {st.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.stage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="border border-white/20 bg-[#090909] p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-midGray uppercase tracking-widest mb-1">
                <Layers className="w-4 h-4 text-white/60" />
                <span>Expansion Sequence — Stage 0{activeStage.stage} of 08</span>
              </div>
              <h3 className="text-3xl font-serif text-primaryWhite font-bold">
                {activeStage.title}
              </h3>
            </div>
            <div className="px-4 py-2 border border-white/20 bg-white/[0.02] text-xs font-mono text-primaryWhite uppercase tracking-wider self-start md:self-auto font-semibold">
              {activeStage.metrics}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Description & Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-base text-softWhite leading-relaxed">
                {activeStage.description}
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-midGray">
                <span>Core Engine Focus: Persistence & Scalability</span>
                <button
                  onClick={() => setActiveStageIndex((prev) => (prev + 1) % stages.length)}
                  className="inline-flex items-center space-x-1 text-primaryWhite hover:text-white uppercase tracking-wider font-semibold"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Schematic Box */}
            <div className="lg:col-span-5 border border-white/14 bg-[#050505] p-6 space-y-3 font-mono text-xs">
              <div className="text-[10px] text-midGray uppercase tracking-widest border-b border-white/10 pb-2">
                Scale Metrics & Topological Scope
              </div>
              <div className="space-y-2 pt-1 text-softWhite">
                <div className="flex justify-between">
                  <span className="text-midGray">Spatial Units:</span>
                  <span>{activeStage.stage === 1 ? '1 Room (Isolated)' : activeStage.stage <= 3 ? `${activeStage.stage * 2} Interconnected Rooms` : 'Districts & Regions'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-midGray">Agent Count:</span>
                  <span>{activeStage.stage === 1 ? '2 Characters' : activeStage.stage <= 3 ? `${activeStage.stage * 3} Agents` : 'Unbounded Multi-agent'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-midGray">Memory Vector:</span>
                  <span>Canonical Graph Ledger</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-midGray">Validation Gate:</span>
                  <span>Zero Contradiction Threshold</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
