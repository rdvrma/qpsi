'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Modal } from '@/components/ui/Modal';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SmallestUnitSection } from '@/components/sections/SmallestUnitSection';
import { RoomToWorldSection } from '@/components/sections/RoomToWorldSection';
import { ArchitectureSection } from '@/components/sections/ArchitectureSection';
import { QuantumSection } from '@/components/sections/QuantumSection';
import { InitialProductSection } from '@/components/sections/InitialProductSection';
import { BusinessModelSection } from '@/components/sections/BusinessModelSection';
import { MarketSection } from '@/components/sections/MarketSection';
import { RoadmapSection } from '@/components/sections/RoadmapSection';
import { FounderSection } from '@/components/sections/FounderSection';
import { FounderEvidenceSection } from '@/components/sections/FounderEvidenceSection';
import { RecognitionSection } from '@/components/sections/RecognitionSection';
import { InvestmentAskSection } from '@/components/sections/InvestmentAskSection';
import { ResearchIntegritySection } from '@/components/sections/ResearchIntegritySection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCallSection } from '@/components/sections/FinalCallSection';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'deck' | 'contact'>('deck');

  const handleOpenModal = (type: 'deck' | 'contact' = 'deck') => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <main className="relative bg-[#FAFAFA] min-h-screen text-primaryWhite selection:bg-bgBlack selection:text-white overflow-x-hidden">
      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Sticky Header Navigation */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* 17 Detailed Homepage Sections */}
      <HeroSection onOpenModal={handleOpenModal} />
      <ProblemSection />
      <SmallestUnitSection />
      <RoomToWorldSection />
      <ArchitectureSection />
      <QuantumSection />
      <InitialProductSection />
      <BusinessModelSection />
      <MarketSection />
      <RoadmapSection />
      <FounderSection onOpenModal={handleOpenModal} />
      <FounderEvidenceSection />
      <RecognitionSection />
      <InvestmentAskSection onOpenModal={handleOpenModal} />
      <ResearchIntegritySection />
      <FaqSection />
      <FinalCallSection onOpenModal={handleOpenModal} />

      {/* Footer */}
      <Footer onOpenModal={handleOpenModal} />

      {/* Global Interactive Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultType={modalType}
      />
    </main>
  );
}
