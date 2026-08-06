'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Modal } from '@/components/ui/Modal';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, Mail, Linkedin, Globe } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(true);
  const [modalType, setModalType] = useState<'deck' | 'contact'>('contact');

  return (
    <main className="bg-[#050505] min-h-screen text-primaryWhite pt-28 pb-16">
      <Navbar onOpenModal={(t) => { setModalType(t || 'contact'); setModalOpen(true); }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-mono text-midGray hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage Overview</span>
        </Link>

        <div className="space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-midGray block">
            DIRECT FOUNDER DIALOGUE
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-primaryWhite">
            Contact Nishant Kumar Sinha
          </h1>
          <p className="text-base text-softWhite leading-relaxed font-light">
            Founder, Q-Psi Persistent World Engine | Director, Darkcloud Infosystems Pvt. Ltd.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-5 border border-white/14 bg-[#080808] space-y-2">
            <Mail className="w-4 h-4 text-white" />
            <div className="text-midGray uppercase">Direct Email</div>
            <a href="mailto:nishant@darkcloud.co.in" className="text-primaryWhite hover:underline font-semibold block">
              nishant@darkcloud.co.in
            </a>
          </div>

          <div className="p-5 border border-white/14 bg-[#080808] space-y-2">
            <Linkedin className="w-4 h-4 text-white" />
            <div className="text-midGray uppercase">Professional Network</div>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primaryWhite hover:underline font-semibold block">
              LinkedIn Profile
            </a>
          </div>

          <div className="p-5 border border-white/14 bg-[#080808] space-y-2">
            <Globe className="w-4 h-4 text-white" />
            <div className="text-midGray uppercase">Corporate Entity</div>
            <span className="text-primaryWhite font-semibold block">
              Darkcloud Infosystems Pvt. Ltd.
            </span>
          </div>
        </div>

        <div className="pt-6">
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-4 bg-primaryWhite text-bgBlack font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-all"
          >
            Open Interactive Contact Form
          </button>
        </div>
      </div>

      <Footer onOpenModal={(t) => { setModalType(t || 'contact'); setModalOpen(true); }} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultType={modalType} />
    </main>
  );
}
