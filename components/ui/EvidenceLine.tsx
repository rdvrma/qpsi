'use client';

import React from 'react';
import { Check, AlertCircle, HelpCircle, ArrowRight, CircleDot } from 'lucide-react';

export type EvidenceStatus =
  | 'SUPPORTED'
  | 'QUALIFIED'
  | 'INCONCLUSIVE'
  | 'EXPLORATORY'
  | 'NOT_SUPPORTED'
  | 'PENDING';

interface EvidenceLineProps {
  status: EvidenceStatus;
  claimLabel?: string;
  compact?: boolean;
  className?: string;
}

export function EvidenceLine({
  status,
  claimLabel,
  compact = false,
  className = '',
}: EvidenceLineProps) {
  const isSupported = status === 'SUPPORTED' || status === 'QUALIFIED';
  const isInconclusive = status === 'INCONCLUSIVE';
  const isExploratory = status === 'EXPLORATORY';
  const isNotSupported = status === 'NOT_SUPPORTED';
  const isPending = status === 'PENDING';

  // Badge styles
  const getBadgeStyle = () => {
    if (isSupported) return 'bg-[#16A34A]/10 text-[#15803D] border-[#16A34A]/30';
    if (isInconclusive) return 'bg-[#D97706]/10 text-[#B45309] border-[#D97706]/30';
    if (isExploratory) return 'bg-[#7C3AED]/10 text-[#6D28D9] border-[#7C3AED]/30';
    if (isNotSupported) return 'bg-[#DC2626]/10 text-[#B91C1C] border-[#DC2626]/30';
    return 'bg-[#64748B]/10 text-[#475467] border-[#64748B]/30';
  };

  const getStatusText = () => {
    if (claimLabel) return claimLabel;
    if (status === 'SUPPORTED') return 'SUPPORTED';
    if (status === 'QUALIFIED') return 'SUPPORTED (SCOPED)';
    if (status === 'INCONCLUSIVE') return 'INCONCLUSIVE';
    if (status === 'EXPLORATORY') return 'EXPLORATORY';
    if (status === 'NOT_SUPPORTED') return 'NOT ESTABLISHED';
    return 'VALIDATION PENDING';
  };

  const stages = [
    { label: 'HYPOTHESIS', step: '01' },
    { label: 'PROTOCOL', step: '02' },
    { label: 'PHYSICAL EXECUTION', step: '03' },
    { label: 'AUDIT', step: '04' },
    { label: 'CLAIM', step: '05' },
  ];

  if (compact) {
    return (
      <div className={`flex items-center space-x-2 font-mono text-[11px] ${className}`}>
        <div className="flex items-center space-x-1.5 text-text-muted">
          <span>HYPOTHESIS</span>
          <span>&rarr;</span>
          <span>EXECUTION</span>
          <span>&rarr;</span>
          <span>AUDIT</span>
          <span>&rarr;</span>
        </div>
        <span
          className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${getBadgeStyle()}`}
        >
          {getStatusText()}
        </span>
      </div>
    );
  }

  return (
    <div className={`space-y-2 font-mono text-xs ${className}`}>
      <div className="flex items-center justify-between text-[10px] text-text-muted uppercase tracking-widest font-semibold pb-1">
        <span>EVIDENCE PIPELINE</span>
        <span
          className={`px-2 py-0.5 rounded border text-[10px] font-bold tracking-wider ${getBadgeStyle()}`}
        >
          {getStatusText()}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {stages.map((stg, idx) => {
          const isFinal = idx === 4;
          return (
            <div
              key={stg.label}
              className={`p-2 rounded border text-center transition-colors ${
                isFinal
                  ? getBadgeStyle()
                  : 'bg-surface-subtle border-border text-text-secondary'
              }`}
            >
              <div className="text-[9px] text-text-muted font-bold">{stg.step}</div>
              <div className="text-[10px] font-bold mt-0.5 truncate">{stg.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
