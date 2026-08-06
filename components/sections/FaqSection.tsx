'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/content/siteConfig';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = siteConfig.faq.items;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] border-b border-white/14">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Block */}
        <div className="space-y-3 text-center">
          <span className="text-xs font-mono tracking-widest uppercase text-midGray block font-semibold">
            INVESTOR FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-primaryWhite">
            {siteConfig.faq.headline}
          </h2>
          <p className="text-sm text-softWhite max-w-xl mx-auto">
            Direct answers regarding technical architecture, execution sequence, quantum dependency, and pre-seed rationale.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-white/14 bg-[#080808] transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <span className="font-serif text-xl font-bold text-primaryWhite">
                    {item.question}
                  </span>
                  <div className="p-1 border border-white/20 text-midGray">
                    {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-softWhite font-mono leading-relaxed border-t border-white/10">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
