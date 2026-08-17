'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Key, ShieldCheck, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { siteConfig } from '@/content/siteConfig';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function LicenseModal({ isOpen, onClose, onSuccess }: LicenseModalProps) {
  const router = useRouter();
  const [licenseKey, setLicenseKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseKey.trim()) {
      setError('Please enter your Q-Psi Research Evaluation License key.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/capsule/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey: licenseKey.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.authenticated) {
        setError(data.message || 'Invalid or inactive research license key.');
        setLoading(false);
        return;
      }

      setLoading(false);
      onClose();
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/capsule/workspace');
      }
    } catch {
      setError('Connection to session proxy failed. Please verify your network.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-surface-raised border border-border rounded-lg shadow-xl overflow-hidden font-sans"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-license-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h2 id="modal-license-title" className="text-base font-serif font-bold text-text-primary">
                Enter Research License
              </h2>
              <p className="text-[11px] font-mono text-text-muted">
                AUTHENTICATE RESEARCH CAPSULE SESSION
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-text-muted hover:text-text-primary rounded-sm transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <label htmlFor="license-input" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-secondary">
              Research Evaluation License Key
            </label>
            <div className="relative">
              <input
                id="license-input"
                type="password"
                autoComplete="off"
                placeholder="Enter issued license key..."
                value={licenseKey}
                onChange={(e) => {
                  setLicenseKey(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded text-sm font-mono text-text-primary placeholder:text-text-muted/60 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                disabled={loading}
              />
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              License keys are issued manually by email after confirming support for the Q-Psi research program.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded flex items-start space-x-2 text-xs text-red-800 animate-in fade-in duration-100">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="leading-snug">{error}</div>
            </div>
          )}

          <div className="p-3 bg-surface border border-border rounded text-[11px] font-mono text-text-secondary space-y-1">
            <div className="flex items-center space-x-1.5 text-text-primary font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>SECURITY BOUNDARY:</span>
            </div>
            <div>
              Your license key is verified via an encrypted server-side session and is never persisted in browser storage or logs.
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="#support-access"
              onClick={onClose}
              className="text-xs font-sans text-accent hover:underline font-medium"
            >
              Need a license key? Request access
            </a>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-sans font-medium text-text-secondary hover:text-text-primary transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !licenseKey.trim()}
                className="inline-flex items-center space-x-1.5 px-5 py-2 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Validating...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
