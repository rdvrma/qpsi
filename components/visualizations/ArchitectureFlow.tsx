'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig, ArchitectureNode } from '@/content/siteConfig';
import { ArrowDown, CheckCircle2, ChevronRight, Cpu, HardDrive, Layers, Lock } from 'lucide-react';

export function ArchitectureFlow() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(siteConfig.architecture.nodes[0].id);
  const selectedNode = siteConfig.architecture.nodes.find((n) => n.id === selectedNodeId) || siteConfig.architecture.nodes[0];

  return (
    <div className="w-full space-y-8">
      {/* 9-Node Architecture Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {siteConfig.architecture.nodes.map((node, idx) => {
          const isSelected = node.id === selectedNodeId;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className={`text-left p-5 border transition-all relative overflow-hidden group ${
                isSelected
                  ? 'border-black bg-white shadow-md font-bold'
                  : 'border-black/10 bg-white hover:border-black/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-midGray font-medium">
                  Layer 0{idx + 1}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                )}
              </div>
              <h4 className="text-base font-serif font-bold text-primaryWhite mb-1 group-hover:text-black transition-colors">
                {node.title}
              </h4>
              <p className="text-xs text-midGray leading-relaxed line-clamp-2">
                {node.shortDesc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Node Technical Specs Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="border border-black/15 bg-white p-6 sm:p-8 space-y-6 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-black/10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-midGray block mb-1 font-medium">
                Architecture Component Specification
              </span>
              <h3 className="text-2xl font-serif text-primaryWhite font-bold">
                {selectedNode.title}
              </h3>
            </div>
            <div className="px-3 py-1.5 border border-black/20 bg-black/[0.03] text-xs font-mono uppercase text-black self-start sm:self-auto font-medium">
              Q-Psi Engine Core Layer
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 space-y-4">
              <p className="text-sm text-softWhite leading-relaxed">
                {selectedNode.fullDesc}
              </p>
              <div className="p-4 border border-black/10 bg-[#F8F9FA] space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-midGray font-medium">
                  Strict Architectural Invariant Guarantee:
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-black font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                  <span>{selectedNode.guarantee}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 border border-black/12 bg-[#F8F9FA] p-5 space-y-3 font-mono text-xs">
              <div>
                <span className="text-[10px] text-midGray uppercase tracking-widest block mb-1 font-medium">Input Interface:</span>
                <span className="text-black font-medium">{selectedNode.input}</span>
              </div>
              <div className="pt-2 border-t border-black/10">
                <span className="text-[10px] text-midGray uppercase tracking-widest block mb-1 font-medium">Output Artifact:</span>
                <span className="text-black font-medium">{selectedNode.output}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
