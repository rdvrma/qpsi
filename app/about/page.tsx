import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ShieldCheck, CheckCircle2, ArrowUpRight, Clock } from 'lucide-react';

export const metadata = {
  title: 'About Q-Psi & The Oneness Project — International Quantum Research',
  description: 'Organizational structure of Q-Psi under parent initiative The Oneness Project, sibling SattvaOS, scientific integrity policy, and leadership.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              ORGANIZATIONAL STRUCTURE &bull; RESEARCH PROGRESS
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            About Q-Psi &amp; The Oneness Project
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            Q-Psi is an international-facing independent quantum research initiative operating under the parent umbrella of <strong>The Oneness Project</strong>.
          </p>
        </div>

        {/* Hierarchy Section */}
        <div className="scientific-card p-8 sm:p-12 space-y-8 bg-surface-raised border border-border">
          <h2 className="text-2xl font-serif font-bold text-text-primary">
            Authoritative Organizational Hierarchy
          </h2>

          <div className="p-6 bg-surface-subtle border border-border rounded space-y-6 font-mono text-xs">
            <div className="flex items-center space-x-3 text-text-primary">
              <span className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-base font-bold">THE ONENESS PROJECT</span>
              <span className="text-xs text-text-muted font-sans">(Mother / Parent Initiative)</span>
            </div>

            <div className="pl-6 border-l-2 border-accent space-y-6">
              {/* Child 1: Q-Psi */}
              <div className="p-4 bg-surface-raised border border-border rounded space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-accent text-sm">1. Q-PSI</span>
                  <span className="text-[10px] bg-accent/10 text-accent font-bold px-2 py-0.5 rounded border border-accent/25">
                    CURRENT INITIATIVE
                  </span>
                </div>
                <div className="text-xs font-bold text-text-primary">
                  Independent Quantum Research Initiative
                </div>
                <p className="text-xs text-text-secondary font-sans leading-relaxed">
                  Focuses on physical-QPU experimentation, state-space quantum compilation, oracle query-complexity benchmarks, and open-science publication.
                </p>
              </div>

              {/* Child 2: SattvaOS */}
              <div className="p-4 bg-surface-raised border border-border rounded space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-text-primary text-sm">2. SATTVAOS</span>
                  <span className="text-[10px] bg-surface-subtle border border-border text-text-muted font-bold px-2 py-0.5 rounded">
                    SIBLING INITIATIVE
                  </span>
                </div>
                <div className="text-xs font-bold text-text-primary">
                  Governed Intelligence &amp; AI Operating Systems
                </div>
                <p className="text-xs text-text-secondary font-sans leading-relaxed">
                  Separate AI and governed intelligence research initiative under The Oneness Project. SattvaOS product claims are strictly separate from Q-Psi quantum scientific claims.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Research Progress Timeline */}
        <div className="scientific-card p-8 sm:p-12 space-y-6 bg-surface-raised border border-border">
          <div className="flex items-center space-x-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>PROGRESS &bull; HARDWARE MILESTONES</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-text-primary">
            Q-Psi Research Progress Timeline
          </h2>

          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary">1. STATE-SPACE COMPILATION</span>
                <span className="text-[#15803D] font-bold px-2 py-0.5 bg-[#16A34A]/10 rounded border border-[#16A34A]/25 text-[10px]">PASS</span>
              </div>
              <p className="text-xs font-sans text-text-secondary">
                Authentic multi-repository software bug state space extraction across 8 programming language ecosystems.
              </p>
            </div>

            <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary">2. PHYSICAL-QPU INTEROPERABILITY (Stage-6F)</span>
                <span className="text-[#15803D] font-bold px-2 py-0.5 bg-[#16A34A]/10 rounded border border-[#16A34A]/25 text-[10px]">PASS (N &le; 10)</span>
              </div>
              <p className="text-xs font-sans text-text-secondary">
                Exact classical optimum recovery on 100% of tested small instances on <code>ibm_marrakesh</code>. End-to-end runtime quantum advantage not claimed.
              </p>
            </div>

            <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary">3. DYNAMIC BERNSTEIN-VAZIRANI EXPERIMENT</span>
                <span className="text-[#15803D] font-bold px-2 py-0.5 bg-[#16A34A]/10 rounded border border-[#16A34A]/25 text-[10px]">SUPPORTED</span>
              </div>
              <p className="text-xs font-sans text-text-secondary">
                Single-shot dynamic oracle query advantage on physical hardware (\(\alpha_Q = 0.1532\) vs \(\alpha_C = 0.6963\), \(p = 3.47 \times 10^{-7}\)).
              </p>
            </div>

            <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary">4. COMPILER + GROVER QUERY ADVANTAGE (v1.1)</span>
                <span className="text-[#15803D] font-bold px-2 py-0.5 bg-[#16A34A]/10 rounded border border-[#16A34A]/25 text-[10px]">SUPPORTED</span>
              </div>
              <p className="text-xs font-sans text-text-secondary">
                Demonstrated compiler-enabled quantum query advantage for candidate-state search on <code>ibm_marrakesh</code> across 9/9 cases and 3/3 sizes (N=4, 8, 16).
              </p>
            </div>

            <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary">5. RESTRICTED SIMON EXPERIMENT</span>
                <span className="text-[#B45309] font-bold px-2 py-0.5 bg-[#D97706]/10 rounded border border-[#D97706]/25 text-[10px]">INCONCLUSIVE</span>
              </div>
              <p className="text-xs font-sans text-text-secondary">
                Constant-depth circuits up to 56 physical qubits. Universal speedup on raw unmitigated hardware remains inconclusive due to readout error.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership & Truthful Background */}
        <div className="scientific-card p-8 sm:p-12 space-y-6 bg-surface-raised border border-border">
          <h2 className="text-2xl font-serif font-bold text-text-primary">
            Leadership &amp; Founder Background
          </h2>
          <p className="text-xs text-text-secondary font-sans leading-relaxed max-w-3xl">
            Q-Psi was founded by <strong>Nishant Kumar Sinha</strong> to advance independent, evidence-first quantum software research. In accordance with strict truthfulness policies:
          </p>

          <div className="p-4 bg-surface-subtle border border-border rounded space-y-2 font-mono text-xs text-text-secondary">
            <div className="font-bold text-text-primary">VERIFIED BACKGROUND &amp; EXECUTION HISTORY</div>
            <ul className="space-y-1.5 font-sans">
              <li>&bull; B.Tech studies in Computer Science &amp; Engineering were discontinued.</li>
              <li>&bull; 10+ years of software-business operations and execution.</li>
              <li>&bull; Founder-funded research to date: <strong>$9,850 USD</strong>.</li>
            </ul>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="scientific-card p-8 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-surface-raised border border-border">
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-text-primary">
              Scientific Collaboration &amp; Inquiries
            </h3>
            <p className="text-xs text-text-secondary font-sans">
              Direct contact: <a href={`mailto:${siteConfig.contact.email}`} className="text-accent underline font-semibold">{siteConfig.contact.email}</a>
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover transition-colors shadow-xs"
          >
            <span>Contact Research Team</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
