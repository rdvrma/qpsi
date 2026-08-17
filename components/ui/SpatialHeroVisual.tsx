'use client';

import React, { useState, useEffect, useRef } from 'react';

export function SpatialHeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const transformStyle = reducedMotion
    ? {}
    : {
        transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
        transition: 'transform 0.15s ease-out',
      };

  const pipelineStages = [
    { code: '01', title: 'RAW STATE SPACE', label: 'Software Repair Search' },
    { code: '02', title: 'COMPILER', label: 'Bijective Ising Mapping' },
    { code: '03', title: 'QUBO / ISING', label: 'H_Ising(Z) Formulation' },
    { code: '04', title: 'PHYSICAL QPU', label: 'ibm_marrakesh (156Q)' },
    { code: '05', title: 'EVIDENCE', label: 'SHA256 Audit Trail' },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 select-none"
    >
      <div
        style={transformStyle}
        className="relative bg-surface-raised border border-border p-6 sm:p-8 rounded-lg shadow-sm backdrop-blur-sm overflow-hidden"
      >
        {/* Subtle Perspective Grid Overlay */}
        <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#1638D4_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Top Header Label */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-text-secondary font-semibold">
              PHYSICAL COMPILATION PIPELINE
            </span>
          </div>
          <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider hidden sm:block">
            HERON 156Q SUPERCONDUCTING ARCHITECTURE
          </div>
        </div>

        {/* Pipeline Stage Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative z-10">
          {pipelineStages.map((stage, idx) => (
            <div
              key={stage.code}
              className="relative group p-3.5 bg-surface border border-border hover:border-accent hover:bg-accent-subtle/30 transition-all duration-200 rounded"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-accent">
                  [{stage.code}]
                </span>
                {idx < pipelineStages.length - 1 && (
                  <span className="text-[10px] font-mono text-text-muted hidden sm:inline">→</span>
                )}
              </div>
              <div className="text-xs font-mono font-bold text-text-primary tracking-tight group-hover:text-accent transition-colors">
                {stage.title}
              </div>
              <div className="text-[10px] font-mono text-text-secondary mt-1 line-clamp-1">
                {stage.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Hardware Reference Bar */}
        <div className="mt-6 pt-4 border-t border-border flex flex-wrap items-center justify-between text-[11px] font-mono text-text-muted gap-2">
          <div>
            TARGET: <span className="text-text-primary font-semibold">ibm_marrakesh</span>
          </div>
          <div>
            JOB ID: <span className="text-text-primary">da16h8ug52gs73cl8uog</span>
          </div>
          <div>
            VERIFICATION: <span className="text-status-pass font-semibold">SHA256 MATCHED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
