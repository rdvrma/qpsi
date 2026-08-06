'use client';

import React, { useState } from 'react';
import { siteConfig, RoadmapMilestone } from '@/content/siteConfig';
import { CheckCircle, Clock, AlertTriangle, Shield } from 'lucide-react';

export function RoadmapSection() {
  const milestones = siteConfig.roadmap.milestones;
  const [filter, setFilter] = useState<string>('ALL');

  const filtered = filter === 'ALL'
    ? milestones
    : milestones.filter((m) => m.status === filter);

  const getStatusBadge = (status: RoadmapMilestone['status']) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 border border-white text-bgBlack bg-white font-mono text-[10px] uppercase font-bold">
            <CheckCircle className="w-3 h-3" />
            <span>COMPLETED</span>
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 border border-white/40 text-primaryWhite bg-white/[0.08] font-mono text-[10px] uppercase font-bold">
            <Clock className="w-3 h-3 animate-pulse" />
            <span>IN PROGRESS</span>
          </span>
        );
      case 'PLANNED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 border border-white/20 text-midGray font-mono text-[10px] uppercase font-semibold">
            <span>PLANNED</span>
          </span>
        );
      case 'DEPENDENT_ON_EVIDENCE':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 border border-white/30 text-softWhite font-mono text-[10px] uppercase font-semibold">
            <AlertTriangle className="w-3 h-3 text-white" />
            <span>EVIDENCE GATED</span>
          </span>
        );
    }
  };

  return (
    <section id="roadmap" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] border-b border-white/14">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-midGray block font-semibold">
            EXECUTION ROADMAP & EVIDENCE GATES
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-primaryWhite leading-tight">
            {siteConfig.roadmap.headline}
          </h2>
          <p className="text-base sm:text-lg text-softWhite leading-relaxed font-light">
            {siteConfig.roadmap.subheadline}
          </p>
        </div>

        {/* Truthful Status Disclosure Box */}
        <div className="p-6 border border-white/20 bg-[#080808] space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-primaryWhite font-bold">
            <Shield className="w-4 h-4 text-white" />
            <span>Truthful Current Execution Status</span>
          </div>
          <p className="text-xs font-mono text-softWhite leading-relaxed">
            {siteConfig.roadmap.truthfulStatusCallout}
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          {['ALL', 'COMPLETED', 'IN_PROGRESS', 'PLANNED', 'DEPENDENT_ON_EVIDENCE'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider transition-colors ${
                filter === st
                  ? 'bg-primaryWhite text-bgBlack'
                  : 'text-midGray hover:text-white border border-white/10'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((m) => (
            <div
              key={m.code}
              className="p-6 border border-white/14 bg-[#090909] space-y-4 flex flex-col justify-between hover:border-white/30 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-sm font-mono font-bold text-primaryWhite">
                    {m.code}
                  </span>
                  {getStatusBadge(m.status)}
                </div>
                <h3 className="text-xl font-serif font-bold text-primaryWhite">
                  {m.title}
                </h3>
                <p className="text-xs text-midGray leading-relaxed">
                  {m.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-[11px] font-mono">
                <span className="text-midGray uppercase tracking-wider block">Deliverables & Proof:</span>
                <ul className="space-y-1 text-softWhite list-disc pl-4">
                  {m.deliverables.map((del, idx) => (
                    <li key={idx}>{del}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
