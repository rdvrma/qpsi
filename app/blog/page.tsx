import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowUpRight, Database, CheckCircle2, AlertCircle, FileText, Cpu, Layers, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Research Notes & Scientific Blog — Q-Psi Independent Quantum Research',
  description:
    'In-depth research reports, hardware campaign post-mortems, and open science publications by the Q-Psi Research Team.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              RESEARCH BLOG &bull; SCIENTIFIC RETROSPECTIVES
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary">
            Scientific Deep Dives &amp; Research Notes
          </h1>
          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            Open science requires publishing positive demonstrations, negative findings, and mathematical audits with complete transparency across all 14 physical campaigns.
          </p>
        </div>

        {/* 6 Core Articles Grid */}
        <div className="space-y-8">
          {siteConfig.blogs.map((blog) => (
            <div
              key={blog.id}
              className="scientific-card p-8 sm:p-10 space-y-5 bg-surface-raised border border-border"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center space-x-2 text-text-muted">
                    <span className="text-accent font-bold">{blog.date}</span>
                    <span>&bull;</span>
                    <span>{blog.backend}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase ${
                      blog.tier === 'OVERVIEW'
                        ? 'bg-accent/10 text-accent border-accent/25'
                        : blog.tier === 'TIER_A'
                        ? 'bg-[#16A34A]/10 text-[#15803D] border-[#16A34A]/25'
                        : blog.tier === 'TIER_B'
                        ? 'bg-[#D97706]/10 text-[#B45309] border-[#D97706]/25'
                        : 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/25'
                    }`}
                  >
                    {blog.status}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
                  <Link href={blog.link} className="hover:text-accent transition-colors">
                    {blog.title}
                  </Link>
                </h2>

                <div className="text-xs font-mono text-text-secondary font-semibold">
                  {blog.subtitle}
                </div>
              </div>

              <p className="text-sm text-text-secondary font-sans leading-relaxed">
                {blog.summary}
              </p>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <Link
                  href={blog.link}
                  className="inline-flex items-center space-x-1.5 text-accent hover:underline font-semibold text-xs font-sans"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Read Full Research Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/evidence"
                  className="text-xs font-sans text-text-muted hover:text-text-primary"
                >
                  Evidence &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
