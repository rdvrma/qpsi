'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Modal } from '@/components/ui/Modal';
import { InvestmentAskSection } from '@/components/sections/InvestmentAskSection';
import { BusinessModelSection } from '@/components/sections/BusinessModelSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function InvestorsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'deck' | 'contact'>('deck');

  return (
    <main className="bg-[#050505] min-h-screen text-primaryWhite pt-28 pb-16">
      <Navbar onOpenModal={(t) => { setModalType(t || 'deck'); setModalOpen(true); }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-mono text-midGray hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage Overview</span>
        </Link>

        <InvestmentAskSection onOpenModal={(t) => { setModalType(t || 'deck'); setModalOpen(true); }} />
        <BusinessModelSection />
        <FaqSection />
      </div>

      <Footer onOpenModal={(t) => { setModalType(t || 'deck'); setModalOpen(true); }} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultType={modalType} />
    </main>
  );
}
