'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/siteConfig';

interface NavbarProps {
  onOpenModal: (defaultType?: 'deck' | 'contact') => void;
}

export function Navbar({ onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Mark & Title */}
        <Link href="/" className="flex items-center space-x-3 group">
          <span className="font-serif text-2xl font-bold tracking-tight text-primaryWhite group-hover:opacity-80 transition-opacity">
            {siteConfig.company.mark}
          </span>
          <div className="h-4 w-px bg-white/20 hidden sm:block" />
          <div className="flex flex-col">
            <span className="text-xs font-mono tracking-widest uppercase text-primaryWhite font-semibold">
              {siteConfig.company.name}
            </span>
            <span className="text-[10px] text-midGray font-mono uppercase tracking-wider hidden md:block">
              {siteConfig.company.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {siteConfig.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-mono text-midGray hover:text-primaryWhite transition-colors uppercase tracking-wider"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Status & Actions */}
        <div className="hidden sm:flex items-center space-x-3">
          <Link
            href="/prototype"
            className="px-3.5 py-2 bg-white text-black hover:bg-white/90 transition-all text-xs font-mono font-bold uppercase tracking-wider border border-white"
          >
            RUN PROTOTYPE
          </Link>

          <button
            onClick={() => onOpenModal('deck')}
            className="inline-flex items-center space-x-1.5 px-4 py-2 border border-white/20 bg-white/[0.02] text-primaryWhite hover:bg-white/10 transition-all text-xs font-mono font-semibold uppercase tracking-wider"
          >
            <span>Deck (PDF)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-primaryWhite hover:text-midGray transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0A0A0A] border-b border-white/14 px-4 py-6 space-y-4"
          >
            <div className="flex flex-col space-y-3">
              {siteConfig.navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-mono text-softWhite hover:text-primaryWhite py-1 border-b border-white/5 uppercase tracking-wider"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="text-[10px] font-mono text-midGray uppercase tracking-widest">
                {siteConfig.company.stageBadge}
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal('deck');
                }}
                className="w-full text-center px-4 py-3 bg-primaryWhite text-bgBlack text-xs font-mono font-semibold uppercase tracking-wider"
              >
                Request Investor Deck
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
