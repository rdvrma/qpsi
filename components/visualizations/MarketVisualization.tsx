'use client';

import React from 'react';
import { siteConfig, MarketItem } from '@/content/siteConfig';
import { ExternalLink, PieChart } from 'lucide-react';

export function MarketVisualization() {
  const wedge = siteConfig.marketOpportunity.concentricWedge;
  const sources = siteConfig.marketOpportunity.sourceBackedData;

  return (
    <div className="w-full space-y-12">
      {/* Concentric Wedge Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Ring Diagram Graphic */}
        <div className="lg:col-span-5 flex justify-center py-6">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-black/20 flex items-center justify-center p-6 bg-white shadow-sm">
            {/* Outer Ring 4 */}
            <div className="absolute inset-2 rounded-full border border-black/10 flex items-center justify-center">
              {/* Ring 3 */}
              <div className="absolute inset-8 rounded-full border border-black/15 flex items-center justify-center">
                {/* Ring 2 */}
                <div className="absolute inset-14 rounded-full border border-black/25 flex items-center justify-center">
                  {/* Center Core Wedge */}
                  <div className="w-24 h-24 rounded-full bg-black text-white flex flex-col items-center justify-center p-2 text-center shadow-xl">
                    <span className="text-[9px] font-mono uppercase tracking-widest font-bold">
                      INITIAL WEDGE
                    </span>
                    <span className="text-[11px] font-serif font-bold leading-tight mt-0.5">
                      Persistent Rooms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Concentric Layer Explanations */}
        <div className="lg:col-span-7 space-y-4">
          {wedge.map((layer, idx) => (
            <div
              key={idx}
              className="p-4 border border-black/15 bg-white space-y-1 hover:border-black/30 transition-colors shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase text-midGray font-medium">
                  Phase 0{idx + 1} — {layer.layer}
                </span>
                <span className="text-[10px] font-mono text-black font-semibold">
                  {idx === 0 ? 'Current Wedge' : `Expansion Layer ${idx}`}
                </span>
              </div>
              <h4 className="text-base font-serif font-bold text-primaryWhite">
                {layer.title}
              </h4>
              <p className="text-xs text-midGray leading-relaxed">
                {layer.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Source-Backed Data Table */}
      <div className="space-y-4 pt-6 border-t border-black/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h4 className="text-lg font-serif font-bold text-primaryWhite">
            Source-Backed & Verified Category Valuation Table
          </h4>
          <span className="text-xs font-mono text-midGray">
            Strict verification rule: No invented market estimates
          </span>
        </div>

        <div className="border border-black/15 bg-white overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-black/10 bg-[#F8F9FA] text-midGray uppercase tracking-wider text-[11px]">
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Value</th>
                <th className="p-4 font-semibold">Year</th>
                <th className="p-4 font-semibold">Source Name</th>
                <th className="p-4 font-semibold">Definition & Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 text-softWhite">
              {sources.map((item, idx) => (
                <tr key={idx} className="hover:bg-black/[0.02] transition-colors">
                  <td className="p-4 font-semibold text-black">{item.category}</td>
                  <td className="p-4 font-bold text-black">{item.value ? item.value : 'N/A (Category)'}</td>
                  <td className="p-4 text-midGray">{item.year ? item.year : '—'}</td>
                  <td className="p-4 text-midGray">
                    {item.sourceUrl ? (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 hover:text-black underline decoration-black/30"
                      >
                        <span>{item.sourceName}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span>{item.sourceName}</span>
                    )}
                  </td>
                  <td className="p-4 text-midGray max-w-xs leading-relaxed">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
