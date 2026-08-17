'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/siteConfig';

interface NavbarProps {
  onOpenModal?: (defaultType?: 'deck' | 'contact') => void;
}

export function Navbar({ onOpenModal }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-md border-b border-border py-3 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Mark & Title */}
        <Link href="/" className="flex items-center space-x-3 group">
          <span className="font-serif text-2xl font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors">
            {siteConfig.company.mark}
          </span>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div className="flex flex-col">
            <span className="text-xs font-mono tracking-widest uppercase text-text-primary font-bold">
              {siteConfig.company.name}
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
              className="text-xs font-mono text-text-secondary hover:text-text-primary hover:underline transition-colors uppercase tracking-wider font-semibold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Status & Primary CTA */}
        <div className="hidden sm:flex items-center space-x-3">
          <Link
            href="/support"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-accent text-white hover:bg-accent-hover transition-all text-xs font-mono font-bold uppercase tracking-wider rounded shadow-xs"
          >
            <span>SUPPORT Q-PSI</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-text-primary hover:text-text-secondary transition-colors"
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
            className="lg:hidden bg-surface-raised border-b border-border px-4 py-6 space-y-4 shadow-lg"
          >
            <div className="flex flex-col space-y-3">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-mono text-text-primary hover:text-accent font-semibold uppercase tracking-wider py-1 border-b border-border/40"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  href="/support"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full py-2.5 bg-accent text-white font-mono font-bold text-xs uppercase tracking-wider rounded"
                >
                  SUPPORT Q-PSI
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
