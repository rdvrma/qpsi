'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/content/siteConfig';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  defaultType?: 'deck' | 'contact';
}

export function Modal({ isOpen, onClose, title, defaultType = 'deck' }: ModalProps) {
  const [type, setType] = useState<'deck' | 'contact'>(defaultType);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setOrganization('');
    setNote('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/20 rounded-none p-6 sm:p-8 shadow-2xl z-10 text-primaryWhite overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-midGray hover:text-primaryWhite transition-colors p-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Tabs */}
            <div className="flex border-b border-white/10 mb-6 pb-2 space-x-6">
              <button
                onClick={() => setType('deck')}
                className={`text-sm font-mono tracking-wider uppercase transition-colors pb-2 ${
                  type === 'deck'
                    ? 'border-b-2 border-white text-primaryWhite font-semibold'
                    : 'text-midGray hover:text-white'
                }`}
              >
                Request Deck
              </button>
              <button
                onClick={() => setType('contact')}
                className={`text-sm font-mono tracking-wider uppercase transition-colors pb-2 ${
                  type === 'contact'
                    ? 'border-b-2 border-white text-primaryWhite font-semibold'
                    : 'text-midGray hover:text-white'
                }`}
              >
                Contact Founder
              </button>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mx-auto text-primaryWhite">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif tracking-tight">Request Received</h3>
                <p className="text-sm text-softWhite max-w-xs mx-auto leading-relaxed">
                  {type === 'deck'
                    ? 'Thank you for your interest in Q-Psi. The private investor presentation deck and data-room link will be sent to your email shortly.'
                    : 'Your message has been sent directly to Nishant Kumar Sinha (Founder, Q-Psi). We will respond within 24 hours.'}
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-2.5 bg-primaryWhite text-bgBlack text-xs font-mono tracking-widest uppercase hover:bg-white transition-colors"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-2xl font-serif tracking-tight">
                    {title || (type === 'deck' ? 'Request Investor Deck' : 'Direct Founder Dialogue')}
                  </h3>
                  <p className="text-xs text-midGray mt-1 font-mono">
                    {type === 'deck'
                      ? 'Pre-seed round | Confidential research & financial overview'
                      : 'Nishant Kumar Sinha — Founder, Q-Psi'}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-midGray mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-[#111111] border border-white/14 px-3 py-2 text-sm text-primaryWhite focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-midGray mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="eleanor@venturecapital.com"
                      className="w-full bg-[#111111] border border-white/14 px-3 py-2 text-sm text-primaryWhite focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-midGray mb-1">
                        Organization
                      </label>
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="Fund / Studio"
                        className="w-full bg-[#111111] border border-white/14 px-3 py-2 text-sm text-primaryWhite focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-midGray mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Partner / Founder"
                        className="w-full bg-[#111111] border border-white/14 px-3 py-2 text-sm text-primaryWhite focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-midGray mb-1">
                      Note / Context (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder={
                        type === 'deck'
                          ? 'Specific areas of interest (e.g. quantum simulator baseline, persistent room proof)...'
                          : 'Share your background or question...'
                      }
                      className="w-full bg-[#111111] border border-white/14 px-3 py-2 text-sm text-primaryWhite focus:outline-none focus:border-white transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <p className="text-[11px] text-midGray font-mono">
                    Confidential | No spam guarantee
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-primaryWhite text-bgBlack text-xs font-mono font-semibold tracking-wider uppercase hover:bg-white transition-all disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Transmitting...' : type === 'deck' ? 'Send Request' : 'Submit Message'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
