'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Cpu } from 'lucide-react';
import { siteConfig } from '@/content/siteConfig';

interface NavbarProps {
  onOpenModal?: (defaultType?: 'deck' | 'contact') => void;
}

export function Navbar({ onOpenModal }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface-glass backdrop-blur-xl border-b border-border/80 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Mark & Title */}
        <Link href="/" className="flex items-center space-x-3 group">
          <span className="font-serif text-3xl font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors drop-shadow-[0_0_12px_rgba(0,240,255,0.3)]">
            {siteConfig.company.mark}
          </span>
          <div className="h-5 w-px bg-border/80 hidden sm:block" />
          <div className="flex flex-col">
            <span className="text-xs font-mono tracking-widest uppercase text-text-primary font-bold flex items-center space-x-1.5">
              <span>{siteConfig.company.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </span>
            <span className="text-[10px] text-text-secondary font-mono uppercase tracking-wider hidden md:block">
              {siteConfig.company.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-mono text-text-secondary hover:text-accent transition-colors uppercase tracking-wider font-semibold relative group py-1"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right Hardware Status & Primary CTA */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="hidden xl:flex items-center space-x-2 px-2.5 py-1 bg-surface-card border border-border/80 rounded text-[10px] font-mono text-text-secondary">
            <Cpu className="w-3 h-3 text-accent" />
            <span>QPU: <strong className="text-text-primary">ibm_marrakesh (156Q)</strong></span>
          </div>

          <a
            href={siteConfig.funding.payPalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-accent text-bgBlack hover:bg-accent-hover font-mono text-xs font-bold uppercase tracking-wider rounded transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
          >
            <span>SUPPORT Q-PSI</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-text-primary hover:text-accent transition-colors"
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
            className="lg:hidden bg-surface-card border-b border-border px-4 py-6 space-y-4 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col space-y-3">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-mono text-text-primary hover:text-accent font-semibold uppercase tracking-wider py-1.5 border-b border-border/40"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <a
                  href={siteConfig.funding.payPalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full py-3 bg-accent text-bgBlack font-mono font-bold text-xs uppercase tracking-wider rounded shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
                  SUPPORT Q-PSI RESEARCH
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
