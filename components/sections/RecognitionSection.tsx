'use client';

import React from 'react';
import { siteConfig } from '@/content/siteConfig';
import { ShieldAlert, Award } from 'lucide-react';

export function RecognitionSection() {
  const rec = siteConfig.recognition;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#040404] border-b border-white/14">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-midGray block font-semibold">
              ECOSYSTEM SUPPORT & ACCELERATOR MEMBERSHIPS
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-primaryWhite">
              {rec.heading}
            </h2>
          </div>
          <span className="text-xs font-mono text-midGray">
            Strict Text-Only Compliance Representation
          </span>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rec.items.map((item, idx) => (
            <div
              key={idx}
              className="p-5 border border-white/10 bg-[#090909] space-y-2 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center space-x-2 text-primaryWhite">
                <Award className="w-4 h-4 text-white" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider">
                  {item.name}
                </h3>
              </div>
              <p className="text-xs text-midGray font-mono pl-6">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Important Disclosure Box */}
        <div className="p-6 border border-white/20 bg-[#090909] space-y-2 text-xs font-mono text-midGray">
          <div className="flex items-center space-x-2 text-white font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-white" />
            <span>Important Ecosystem Participation Disclosure</span>
          </div>
          <p className="text-softWhite leading-relaxed pl-6">
            {rec.disclosure}
          </p>
        </div>
      </div>
    </section>
  );
}
