'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Modal } from '@/components/ui/Modal';
import { QuantumToggle } from '@/components/visualizations/QuantumToggle';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ResearchPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'deck' | 'contact'>('deck');

  return (
    <main className="bg-[#050505] min-h-screen text-primaryWhite pt-28 pb-16">
      <Navbar onOpenModal={(t) => { setModalType(t || 'deck'); setModalOpen(true); }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-mono text-midGray hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage Overview</span>
        </Link>

        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono tracking-widest uppercase text-midGray block">
            FRONTIER RESEARCH & QUANTUM SIMULATION
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-primaryWhite">
            Quantum State Search & Controlled Baselines
          </h1>
          <p className="text-base sm:text-lg text-softWhite leading-relaxed font-light">
            Q-Psi evaluates quantum and hybrid simulation backends strictly as candidate future search engines. Classical execution remains our mandatory baseline.
          </p>
        </div>

        <QuantumToggle />

        <div className="p-8 border border-white/20 bg-[#070707] space-y-4">
          <h3 className="text-2xl font-serif font-bold text-primaryWhite">
            Research Non-Disclosure & Integrity Standard
          </h3>
          <p className="text-xs font-mono text-softWhite leading-relaxed whitespace-pre-line">
            {siteConfig.quantum.researchIntegrityStatement}
          </p>
        </div>
      </div>

      <Footer onOpenModal={(t) => { setModalType(t || 'deck'); setModalOpen(true); }} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultType={modalType} />
    </main>
  );
}
