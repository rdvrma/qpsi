'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Layers, GitBranch, Cpu, Database, CheckCircle2, ArrowRight } from 'lucide-react';

interface PipelineStep {
  id: string;
  stage: string;
  name: string;
  math: string;
  description: string;
  nodes: { x: number; y: number; label: string; active?: boolean }[];
  connections: [number, number][];
}

const pipelineSteps: PipelineStep[] = [
  {
    id: 'raw',
    stage: 'STAGE 01',
    name: 'Raw Search Space',
    math: 'S = {s_1, s_2, ..., s_N} in 2^N',
    description: 'Multi-repository code dependency graphs and discrete candidate state universe.',
    nodes: [
      { x: 60, y: 70, label: 's₁' },
      { x: 120, y: 40, label: 's₂' },
      { x: 180, y: 85, label: 's₃' },
      { x: 90, y: 140, label: 's₄' },
      { x: 160, y: 160, label: 's₅' },
      { x: 230, y: 120, label: 's₆' },
    ],
    connections: [
      [0, 1], [1, 2], [0, 3], [3, 4], [2, 5], [4, 5], [1, 3]
    ],
  },
  {
    id: 'candidate',
    stage: 'STAGE 02',
    name: 'Candidate Subspace',
    math: 'C = {s in S | sum A_{ki} s_i <= b_k}',
    description: 'Linear semantic and structural validity constraints eliminate unreachable states.',
    nodes: [
      { x: 60, y: 70, label: 's₁', active: false },
      { x: 120, y: 40, label: 'c₁', active: true },
      { x: 180, y: 85, label: 'c₂', active: true },
      { x: 90, y: 140, label: 's₄', active: false },
      { x: 160, y: 160, label: 'c₃', active: true },
      { x: 230, y: 120, label: 'c₄', active: true },
    ],
    connections: [
      [1, 2], [2, 5], [4, 5], [1, 4]
    ],
  },
  {
    id: 'qubo',
    stage: 'STAGE 03',
    name: 'QUBO Quadratic Matrix',
    math: 'E(x) = sum_i Q_{ii} x_i + sum_{i<j} Q_{ij} x_i x_j',
    description: 'Quadratic Unconstrained Binary Optimization form with penalty weight multipliers.',
    nodes: [
      { x: 100, y: 50, label: 'x₁', active: true },
      { x: 200, y: 50, label: 'x₂', active: true },
      { x: 100, y: 150, label: 'x₃', active: true },
      { x: 200, y: 150, label: 'x₄', active: true },
    ],
    connections: [
      [0, 1], [0, 2], [1, 3], [2, 3], [0, 3]
    ],
  },
  {
    id: 'hamiltonian',
    stage: 'STAGE 04',
    name: 'Ising Hamiltonian',
    math: 'H_P = sum_i h_i Z_i + sum_{i<j} J_{ij} Z_i Z_j',
    description: 'Spin-1/2 Pauli-Z mapping x_i = (I - Z_i)/2 generating target problem Hamiltonian.',
    nodes: [
      { x: 80, y: 60, label: 'Z₁', active: true },
      { x: 220, y: 60, label: 'Z₂', active: true },
      { x: 80, y: 140, label: 'Z₃', active: true },
      { x: 220, y: 140, label: 'Z₄', active: true },
    ],
    connections: [
      [0, 1], [0, 2], [1, 3], [2, 3], [0, 3], [1, 2]
    ],
  },
  {
    id: 'qpu',
    stage: 'STAGE 05',
    name: 'Physical QPU (ibm_marrakesh)',
    math: '|psi(gamma, beta)> = U_B(beta) U_P(gamma) |+>^N',
    description: 'QAOA p=1 pulse schedules executed on 156-qubit Heron superconducting processor.',
    nodes: [
      { x: 70, y: 100, label: 'Q₁', active: true },
      { x: 120, y: 70, label: 'Q₂', active: true },
      { x: 170, y: 100, label: 'Q₃', active: true },
      { x: 220, y: 70, label: 'Q₄', active: true },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3]
    ],
  },
  {
    id: 'evidence',
    stage: 'STAGE 06',
    name: 'Audited Evidence',
    math: 'P(x^*) = 1.00 (N <= 10), Delta = 0.1250',
    description: 'Ground state recovery verification, job ID record and cryptographic SHA256 audit digest.',
    nodes: [
      { x: 80, y: 100, label: 'JOB', active: true },
      { x: 150, y: 100, label: 'HASH', active: true },
      { x: 220, y: 100, label: 'AUDIT', active: true },
    ],
    connections: [
      [0, 1], [1, 2]
    ],
  },
];

export function QuantumStateSpaceFigure() {
  const [selectedIdx, setSelectedIdx] = useState(2); // Default to QUBO
  const currentStep = pipelineSteps[selectedIdx];
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle interactive parallax on hover (respects prefers-reduced-motion)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 6, y: y * 6 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="scientific-card p-6 sm:p-8 space-y-6 bg-surface-raised border border-border"
    >
      {/* Figure Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent">
            FIGURE 1.0 — SCIENTIFIC STATE-SPACE PIPELINE
          </span>
          <h3 className="text-xl font-serif font-bold text-text-primary mt-0.5">
            Discrete State Mapping to Quantum Processing Units
          </h3>
        </div>
        <div className="text-xs font-mono text-text-muted">
          Q-PSI COMPILER ARCHITECTURE
        </div>
      </div>

      {/* Stage Selector Tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 font-mono text-xs">
        {pipelineSteps.map((step, idx) => {
          const isSelected = idx === selectedIdx;
          return (
            <button
              key={step.id}
              onClick={() => setSelectedIdx(idx)}
              className={`p-2.5 rounded border text-left transition-all ${
                isSelected
                  ? 'bg-accent/10 border-accent text-accent font-bold shadow-xs'
                  : 'bg-surface-subtle border-border text-text-secondary hover:text-text-primary hover:border-border-hover'
              }`}
            >
              <div className="text-[9px] text-text-muted">{step.stage}</div>
              <div className="text-[11px] truncate mt-0.5">{step.name}</div>
            </button>
          );
        })}
      </div>

      {/* Main Diagram Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
        {/* Left: Interactive Graphite Lattice SVG */}
        <div className="md:col-span-6 bg-surface-subtle/50 border border-border rounded-lg p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[220px]">
          <svg
            className="w-full h-48 overflow-visible"
            viewBox="0 0 300 200"
            style={{
              transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            {/* Grid Pattern Background */}
            <defs>
              <pattern id="figure-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D8DCE3" strokeWidth="0.5" strokeOpacity="0.6" />
              </pattern>
            </defs>
            <rect width="300" height="200" fill="url(#figure-grid)" />

            {/* Connecting Edges */}
            {currentStep.connections.map(([fromIdx, toIdx], cIdx) => {
              const fromNode = currentStep.nodes[fromIdx];
              const toNode = currentStep.nodes[toIdx];
              if (!fromNode || !toNode) return null;
              return (
                <line
                  key={`edge-${cIdx}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="#667085"
                  strokeWidth="1.2"
                  strokeOpacity="0.5"
                />
              );
            })}

            {/* Nodes */}
            {currentStep.nodes.map((node, nIdx) => {
              const isActive = node.active !== false;
              return (
                <g key={`node-${nIdx}`} className="cursor-pointer">
                  {/* Node Outer Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? 12 : 9}
                    fill={isActive ? '#FFFFFF' : '#EAECE8'}
                    stroke={isActive ? '#2447D8' : '#8B949E'}
                    strokeWidth={isActive ? '1.8' : '1'}
                  />
                  {/* Node Label */}
                  <text
                    x={node.x}
                    y={node.y + 3.5}
                    textAnchor="middle"
                    fill={isActive ? '#10131A' : '#8B949E'}
                    fontSize="10"
                    fontFamily="'JetBrains Mono', monospace"
                    fontWeight="bold"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-2 right-3 text-[9px] font-mono text-text-muted">
            Interactive Scientific Lattice &bull; Pointer Inspected
          </div>
        </div>

        {/* Right: Formulation & Description */}
        <div className="md:col-span-6 space-y-3 font-sans">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-accent/10 text-accent font-mono text-[10px] font-bold">
            <span>{currentStep.stage}</span>
            <span>&bull;</span>
            <span>{currentStep.name}</span>
          </div>

          <div className="p-3 bg-surface-subtle border border-border rounded font-mono text-xs text-text-primary">
            <code>{currentStep.math}</code>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">
            {currentStep.description}
          </p>

          <div className="pt-2 border-t border-border flex items-center justify-between text-xs font-mono text-text-muted">
            <span>AUDITED STATUS:</span>
            <span className="text-text-primary font-bold">PHYSICAL QPU INTEROPERABLE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
