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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Research', href: '/research' },
    { label: 'Compiler', href: '/compiler' },
    { label: 'Capsule', href: '/capsule' },
    { label: 'Experiments', href: '/experiments' },
    { label: 'Papers', href: '/papers' },
    { label: 'Evidence', href: '/evidence' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-surface-raised/95 backdrop-blur-md border-b border-border shadow-xs py-3'
          : 'bg-surface/90 backdrop-blur-sm border-b border-border/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Masthead: QΨ / Q-Psi */}
        <Link href="/" className="flex items-center space-x-3 group">
          <span className="font-serif text-3xl font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors">
            {siteConfig.company.mark}
          </span>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="text-sm font-sans font-bold text-text-primary">
                {siteConfig.company.name}
              </span>
              <span className="text-xs text-text-muted font-sans hidden md:inline">
                &bull; Independent Quantum Research
              </span>
            </div>
            <span className="text-[11px] text-text-secondary font-sans hidden lg:block">
              A research initiative of {siteConfig.company.parentCompany}
            </span>
          </div>
        </Link>

        {/* Clean Sans Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-sans text-text-secondary hover:text-accent font-medium transition-colors py-1 relative group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right Action: Clean Support Button */}
        <div className="hidden sm:flex items-center space-x-4">
          <a
            href={siteConfig.funding.payPalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-accent text-white hover:bg-accent-hover font-sans text-xs font-semibold rounded transition-colors shadow-xs"
          >
            <span>Support Q-Psi</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-text-primary hover:text-accent transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface-raised border-b border-border px-4 py-6 space-y-4 shadow-lg"
          >
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-sans text-text-primary hover:text-accent font-medium py-1"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-border space-y-3">
              <a
                href={siteConfig.funding.payPalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-accent text-white font-sans text-xs font-semibold rounded"
              >
                <span>Support Q-Psi Research</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <div className="text-[11px] font-sans text-text-muted text-center">
                A research initiative of {siteConfig.company.parentCompany}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
