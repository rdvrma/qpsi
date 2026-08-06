'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Modal } from '@/components/ui/Modal';
import { siteConfig } from '@/content/siteConfig';
import { ArchitectureFlow } from '@/components/visualizations/ArchitectureFlow';
import { RoomDiagram } from '@/components/visualizations/RoomDiagram';
import { ArrowLeft, HardDrive, Shield } from 'lucide-react';
import Link from 'next/link';

export default function TechnologyPage() {
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
            DEEP-TECH TECHNICAL ARCHITECTURE
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-primaryWhite">
            Q-Psi State Language & Canonical Ledger
          </h1>
          <p className="text-base sm:text-lg text-softWhite leading-relaxed font-light">
            Detailed breakdown of how Q-Psi decouples objective world state truth from stochastic generative AI models to guarantee zero identity drift and zero memory hallucination.
          </p>
        </div>

        <ArchitectureFlow />

        <div className="pt-12 border-t border-white/10 space-y-8">
          <h2 className="text-3xl font-serif font-bold text-primaryWhite">
            The Two-Character Atom State Machine Demonstration
          </h2>
          <RoomDiagram />
        </div>
      </div>

      <Footer onOpenModal={(t) => { setModalType(t || 'deck'); setModalOpen(true); }} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultType={modalType} />
    </main>
  );
}
