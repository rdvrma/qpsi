'use client';

import React, { useState } from 'react';
import { Activity, BarChart2, CheckCircle2, Zap } from 'lucide-react';

export function InteractiveEnergyGapChart() {
  const [activeTab, setActiveTab] = useState<'bv' | 'compiler'>('bv');

  return (
    <div className="scientific-card p-6 sm:p-8 space-y-6 bg-surface-raised border border-border">
      <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">
            HARDWARE BENCHMARK VISUALIZER (ibm_marrakesh)
          </span>
          <h3 className="text-xl font-serif font-bold text-text-primary mt-0.5">
            Empirical Physical-QPU Measurements
          </h3>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center space-x-1.5 bg-surface-subtle p-1 border border-border rounded font-mono text-xs">
          <button
            onClick={() => setActiveTab('bv')}
            className={`px-3 py-1.5 rounded transition-all font-semibold uppercase text-[11px] ${
              activeTab === 'bv'
                ? 'bg-surface-raised text-accent border border-border shadow-xs font-bold'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Dynamic BV Query Complexity
          </button>
          <button
            onClick={() => setActiveTab('compiler')}
            className={`px-3 py-1.5 rounded transition-all font-semibold uppercase text-[11px] ${
              activeTab === 'compiler'
                ? 'bg-surface-raised text-accent border border-border shadow-xs font-bold'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Compiler 6F Energy Gap
          </button>
        </div>
      </div>

      {activeTab === 'bv' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-surface border border-border rounded space-y-1">
              <div className="text-text-muted text-[10px]">QUANTUM SCALING EXPONENT</div>
              <div className="text-2xl font-serif font-bold text-accent">&alpha;<sub>Q</sub> = 0.1532</div>
              <div className="text-[10px] text-text-secondary">stderr &plusmn; 0.0177 (Single-Shot DD)</div>
            </div>

            <div className="p-4 bg-surface border border-border rounded space-y-1">
              <div className="text-text-muted text-[10px]">CLASSICAL SCALING EXPONENT</div>
              <div className="text-2xl font-serif font-bold text-text-primary">&alpha;<sub>C</sub> = 0.6963</div>
              <div className="text-[10px] text-text-secondary">Classical Oracle Baseline</div>
            </div>

            <div className="p-4 bg-surface border border-border rounded space-y-1">
              <div className="text-text-muted text-[10px]">STATISTICAL SIGNIFICANCE</div>
              <div className="text-2xl font-serif font-bold text-status-pass">t = -30.65</div>
              <div className="text-[10px] text-status-pass font-semibold">p = 3.47 &times; 10<sup>-7</sup> (SUPPORTED)</div>
            </div>
          </div>

          {/* Interactive SVG Curve Visualization */}
          <div className="p-6 bg-surface border border-border rounded space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>ORACLE QUERY COMPLEXITY Q(n) vs QUBIT REGISTER SIZE n</span>
              <span className="text-text-primary font-bold">156-QUBIT HERON PROCESSOR</span>
            </div>

            <div className="relative h-56 w-full pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                {/* Grid Lines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="#D8DCE3" strokeDasharray="4 4" />
                <line x1="40" y1="70" x2="480" y2="70" stroke="#D8DCE3" strokeDasharray="4 4" />
                <line x1="40" y1="120" x2="480" y2="120" stroke="#D8DCE3" strokeDasharray="4 4" />
                <line x1="40" y1="170" x2="480" y2="170" stroke="#B8C0CC" />

                {/* Y Axis Labels */}
                <text x="10" y="25" fill="#667085" fontSize="10">2.0</text>
                <text x="10" y="75" fill="#667085" fontSize="10">1.5</text>
                <text x="10" y="125" fill="#667085" fontSize="10">1.0</text>
                <text x="10" y="175" fill="#667085" fontSize="10">0.5</text>

                {/* X Axis Labels */}
                <text x="50" y="192" fill="#667085" fontSize="10">n=4</text>
                <text x="150" y="192" fill="#667085" fontSize="10">n=8</text>
                <text x="260" y="192" fill="#667085" fontSize="10">n=12</text>
                <text x="370" y="192" fill="#667085" fontSize="10">n=16</text>

                {/* Classical Curve (Orange steep slope) */}
                <path
                  d="M 50 160 Q 200 110 470 30"
                  fill="none"
                  stroke="#D97706"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />

                {/* Quantum Single-Shot Dynamic BV Curve (Cobalt sublinear) */}
                <path
                  d="M 50 165 Q 200 150 470 135"
                  fill="none"
                  stroke="#2447D8"
                  strokeWidth="2.5"
                />

                {/* Data Points */}
                <circle cx="50" cy="165" r="4" fill="#2447D8" />
                <circle cx="150" cy="158" r="4" fill="#2447D8" />
                <circle cx="260" cy="148" r="4" fill="#2447D8" />
                <circle cx="370" cy="140" r="4" fill="#2447D8" />
                <circle cx="470" cy="135" r="4" fill="#2447D8" />

                {/* Legend */}
                <g transform="translate(260, 30)">
                  <rect x="0" y="0" width="210" height="46" fill="#FFFFFF" stroke="#D8DCE3" rx="4" />
                  <line x1="12" y1="16" x2="36" y2="16" stroke="#D97706" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="44" y="20" fill="#10131A" fontSize="10">Classical Baseline (&alpha;=0.6963)</text>
                  <line x1="12" y1="32" x2="36" y2="32" stroke="#2447D8" strokeWidth="2.5" />
                  <text x="44" y="36" fill="#2447D8" fontSize="10" fontWeight="bold">Single-Shot Quantum (&alpha;=0.1532)</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-surface border border-border rounded space-y-1">
              <div className="text-text-muted text-[10px]">SMALL INSTANCE ACCURACY (N &le; 10)</div>
              <div className="text-2xl font-serif font-bold text-status-pass">100% (4/4)</div>
              <div className="text-[10px] text-text-secondary">Exact Classical Ground State</div>
            </div>

            <div className="p-4 bg-surface border border-border rounded space-y-1">
              <div className="text-text-muted text-[10px]">STANDARD MEDIAN ENERGY GAP</div>
              <div className="text-2xl font-serif font-bold text-text-primary">&Delta; = 0.1250</div>
              <div className="text-[10px] text-text-secondary">QAOA p=1 Spectrum Partition</div>
            </div>

            <div className="p-4 bg-surface border border-border rounded space-y-1">
              <div className="text-text-muted text-[10px]">COMPILER QUANTUM ADVANTAGE</div>
              <div className="text-2xl font-serif font-bold text-text-muted">NOT YET ESTABLISHED</div>
              <div className="text-[10px] text-text-muted">Interoperability Pass (Stage-6F)</div>
            </div>
          </div>

          {/* Compiler Histogram */}
          <div className="p-6 bg-surface border border-border rounded space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>ENERGY GAP DISTRIBUTION ACROSS 8 ECOSYSTEM COHORTS</span>
              <span className="text-text-primary font-bold">16,384 SHOTS &bull; ibm_marrakesh</span>
            </div>

            <div className="grid grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-surface-raised border border-border rounded text-center">
                <div className="text-xs text-text-muted">N=5 (Node.js)</div>
                <div className="text-lg font-serif font-bold text-status-pass mt-1">&Delta; = 0.2500</div>
                <div className="text-[10px] text-text-secondary">Ground State: 100%</div>
              </div>
              <div className="p-3 bg-surface-raised border border-border rounded text-center">
                <div className="text-xs text-text-muted">N=8 (Python)</div>
                <div className="text-lg font-serif font-bold text-status-pass mt-1">&Delta; = 0.1875</div>
                <div className="text-[10px] text-text-secondary">Ground State: 100%</div>
              </div>
              <div className="p-3 bg-surface-raised border border-border rounded text-center">
                <div className="text-xs text-text-muted">N=10 (Rust)</div>
                <div className="text-lg font-serif font-bold text-status-pass mt-1">&Delta; = 0.1250</div>
                <div className="text-[10px] text-text-secondary">Ground State: 100%</div>
              </div>
              <div className="p-3 bg-surface-raised border border-border rounded text-center">
                <div className="text-xs text-text-muted">N=18+ (C++)</div>
                <div className="text-lg font-serif font-bold text-status-inconclusive mt-1">&Delta; = 0.0420</div>
                <div className="text-[10px] text-status-inconclusive">Noise Degraded</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
