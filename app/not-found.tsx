'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { siteConfig } from '@/content/siteConfig';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] text-primaryWhite flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="font-serif text-6xl font-bold text-white">
        404
      </div>
      <div className="font-serif text-2xl text-softWhite">
        State Coordinates Not Found in Canonical Ledger
      </div>
      <p className="text-xs font-mono text-midGray max-w-md leading-relaxed">
        The requested path does not exist in Q-Psi’s canonical event history. Return to the primary engine overview.
      </p>
      <Link
        href="/"
        className="inline-flex items-center space-x-2 px-6 py-3 bg-primaryWhite text-bgBlack font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Q-Psi Home</span>
      </Link>
    </main>
  );
}
