'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/content/siteConfig';
import { ShieldCheck, Cpu, Binary, AlertCircle } from 'lucide-react';

export function QuantumToggle() {
  const [activeTab, setActiveTab] = useState<'classical' | 'quantum'>('classical');
  const classical = siteConfig.quantum.classicalMetrics;
  const quantum = siteConfig.quantum.quantumMetrics;

  const currentData = activeTab === 'classical' ? classical : quantum;

  return (
    <div className="w-full space-y-8">
      {/* Toggle Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-black/10">
        <div className="flex items-center space-x-2 bg-[#F8F9FA] p-1 border border-black/15 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('classical')}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'classical'
                ? 'bg-black text-white shadow-md'
                : 'text-midGray hover:text-black'
            }`}
          >
            CLASSICAL BASELINE
          </button>
          <button
            onClick={() => setActiveTab('quantum')}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'quantum'
                ? 'bg-black text-white shadow-md'
                : 'text-midGray hover:text-black'
            }`}
          >
            QUANTUM EXPERIMENT (CUDA-Q)
          </button>
        </div>

        <div className="text-xs font-mono text-midGray">
          Active Execution Path: <span className="text-black font-semibold">{currentData.mode}</span>
        </div>
      </div>

      {/* Metrics & Benchmark Matrix */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.2 }}
          className="border border-black/15 bg-white p-6 sm:p-8 space-y-6 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-black/10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-midGray block mb-1 font-medium">
                {currentData.tag}
              </span>
              <h3 className="text-2xl font-serif text-primaryWhite font-bold">
                {currentData.mode} Implementation Specifications
              </h3>
            </div>
            <span className="px-3 py-1 border border-black/20 text-xs font-mono uppercase text-black bg-black/[0.03] font-medium">
              {activeTab === 'classical' ? 'Production Mandatory Baseline' : 'Controlled Research Simulation'}
            </span>
          </div>

          <p className="text-sm text-softWhite leading-relaxed">
            {currentData.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {currentData.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-4 border border-black/10 bg-[#F8F9FA] space-y-1 hover:border-black/30 transition-colors"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-midGray font-medium">
                  {m.label}
                </div>
                <div className="text-sm font-mono font-semibold text-black">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Research Integrity Statement Box */}
      <div className="p-6 border border-black/15 bg-white space-y-3 shadow-xs">
        <div className="flex items-center space-x-2 text-black">
          <ShieldCheck className="w-5 h-5 text-black" />
          <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-black">
            Research Integrity Policy (No-Hype Guarantee)
          </h4>
        </div>
        <div className="text-xs font-mono text-black/80 whitespace-pre-line leading-relaxed pl-7">
          {siteConfig.quantum.researchIntegrityStatement}
        </div>
      </div>
    </div>
  );
}
