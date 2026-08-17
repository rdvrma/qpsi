'use client';

import React, { useState } from 'react';
import { Activity, BarChart2, CheckCircle2, Zap } from 'lucide-react';

export function InteractiveEnergyGapChart() {
  const [activeTab, setActiveTab] = useState<'bv' | 'compiler'>('bv');

  return (
    <div className="bg-surface-card border border-border/80 rounded-xl p-6 sm:p-8 space-y-6 glass-panel glow-box-cyan">
      <div className="flex flex-wrap items-center justify-between border-b border-border/60 pb-4 gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest">
            PHYSICAL QPU HARDWARE BENCHMARK VISUALIZER
          </span>
          <h3 className="text-2xl font-serif font-bold text-text-primary mt-1">
            Empirical Hardware Metrics (ibm_marrakesh)
          </h3>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center space-x-2 bg-surface p-1 border border-border rounded-lg font-mono text-xs">
          <button
            onClick={() => setActiveTab('bv')}
            className={`px-3 py-1.5 rounded transition-all font-bold uppercase ${
              activeTab === 'bv'
                ? 'bg-accent text-bgBlack shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            DYNAMIC BV QUERY COMPLEXITY
          </button>
          <button
            onClick={() => setActiveTab('compiler')}
            className={`px-3 py-1.5 rounded transition-all font-bold uppercase ${
              activeTab === 'compiler'
                ? 'bg-accent text-bgBlack shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            COMPILER 6F ENERGY GAP
          </button>
        </div>
      </div>

      {activeTab === 'bv' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
              <div className="text-text-muted">QUANTUM SCALING EXPONENT</div>
              <div className="text-2xl font-serif font-bold text-accent">&alpha;<sub>Q</sub> = 0.1532</div>
              <div className="text-[10px] text-text-secondary">stderr &plusmn; 0.0177 (Single-Shot DD)</div>
            </div>

            <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
              <div className="text-text-muted">CLASSICAL SCALING EXPONENT</div>
              <div className="text-2xl font-serif font-bold text-text-primary">&alpha;<sub>C</sub> = 0.6963</div>
              <div className="text-[10px] text-text-secondary">Classical Oracle Baseline</div>
            </div>

            <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
              <div className="text-text-muted">STATISTICAL SIGNIFICANCE</div>
              <div className="text-2xl font-serif font-bold text-status-pass">t = -30.65</div>
              <div className="text-[10px] text-status-pass">p = 3.47 &times; 10<sup>-7</sup> (SUPPORTED)</div>
            </div>
          </div>

          {/* Interactive SVG Curve Visualization */}
          <div className="p-6 bg-surface border border-border/80 rounded-lg space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>ORACLE QUERY COMPLEXITY Q(n) vs QUBIT REGISTER SIZE n</span>
              <span className="text-accent font-bold">156-QUBIT HERON PROCESSOR</span>
            </div>

            <div className="relative h-56 w-full pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                {/* Grid Lines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="40" y1="70" x2="480" y2="70" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="40" y1="120" x2="480" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.1)" />

                {/* Y Axis Labels */}
                <text x="10" y="25" fill="#64748B" fontSize="10">2.0</text>
                <text x="10" y="75" fill="#64748B" fontSize="10">1.5</text>
                <text x="10" y="125" fill="#64748B" fontSize="10">1.0</text>
                <text x="10" y="175" fill="#64748B" fontSize="10">0.5</text>

                {/* X Axis Labels */}
                <text x="50" y="192" fill="#64748B" fontSize="10">n=4</text>
                <text x="150" y="192" fill="#64748B" fontSize="10">n=8</text>
                <text x="260" y="192" fill="#64748B" fontSize="10">n=12</text>
                <text x="370" y="192" fill="#64748B" fontSize="10">n=16</text>

                {/* Classical Curve (Orange steep slope) */}
                <path
                  d="M 50 160 Q 200 110 470 30"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                />

                {/* Quantum Curve (Laser Cyan flat slope) */}
                <path
                  d="M 50 165 Q 200 155 470 142"
                  fill="none"
                  stroke="#00F0FF"
                  strokeWidth="3.5"
                  className="animate-laser-glow"
                />

                {/* Quantum Dots */}
                <circle cx="50" cy="165" r="4" fill="#00F0FF" />
                <circle cx="150" cy="159" r="4" fill="#00F0FF" />
                <circle cx="260" cy="151" r="4" fill="#00F0FF" />
                <circle cx="370" cy="144" r="4" fill="#00F0FF" />
                <circle cx="470" cy="142" r="4" fill="#00F0FF" />
              </svg>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs pt-2 border-t border-border/60 gap-2">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center text-accent font-bold">
                  <span className="w-3 h-0.5 bg-accent mr-1.5 inline-block" /> QUANTUM SINGLE-SHOT DVBV (&alpha;<sub>Q</sub> = 0.1532)
                </span>
                <span className="flex items-center text-status-inconclusive font-bold">
                  <span className="w-3 h-0.5 bg-status-inconclusive mr-1.5 inline-block" /> CLASSICAL ORACLE (&alpha;<sub>C</sub> = 0.6963)
                </span>
              </div>
              <span className="text-[10px] text-text-muted">POKHAREL-LIDAR SAMPLING MODEL</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
              <div className="text-text-muted">N &le; 10 OPTIMUM RECOVERY</div>
              <div className="text-2xl font-serif font-bold text-status-pass">100% PASS (4/4)</div>
              <div className="text-[10px] text-text-secondary">Exact Classical Ground State Matched</div>
            </div>

            <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
              <div className="text-text-muted">FULL COHORT MEDIAN GAP</div>
              <div className="text-2xl font-serif font-bold text-accent">&Delta; = 0.1250</div>
              <div className="text-[10px] text-text-secondary">Energy Gap to Ground State</div>
            </div>

            <div className="p-4 bg-surface border border-border rounded-lg space-y-1">
              <div className="text-text-muted">COMPILER ADVANTAGE CLAIM</div>
              <div className="text-2xl font-serif font-bold text-text-muted">NOT CLAIMED</div>
              <div className="text-[10px] text-text-muted">Classical Solvers Faster on NISQ</div>
            </div>
          </div>

          <div className="p-4 bg-surface border border-border/80 rounded-lg text-xs leading-relaxed space-y-2 font-sans text-text-secondary">
            <div className="font-mono font-bold text-text-primary uppercase text-xs">
              AUDITED COMPILER STAGE-6F NISQ EXECUTION BOUNDARY
            </div>
            <p>
              The state-space compiler maps candidate software repair interaction universes into binary quadratic Hamiltonians executed via QAOA p=1 circuits on physical IBM Quantum hardware. Exact ground state recovery succeeds on small registers (N &le; 10), but unmitigated gate-depth readout noise degrades solution quality on larger registers (N &ge; 18).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
