import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ArrowUpRight, AlertCircle, FileText, Database, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Q-Psi vs Qiskit and TKET: What the MQT Benchmark Actually Showed — Q-Psi Blog',
  description:
    'A high-integrity cross-compiler comparison: valid compilation, Qiskit fidelity parity, and TKET sensitivity on IBM Heron.',
};

export default function ArticleMqtBenchmarkPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Research Notes &amp; Blog</span>
          </Link>
          <div className="text-xs font-mono text-text-muted">
            RESEARCH ARTICLE &bull; CROSS-COMPILER AUDIT
          </div>
        </div>

        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#64748B]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#64748B]">
              CROSS-COMPILER BENCHMARK &bull; EXP-05-MQT-BENCH
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Q-Psi vs Qiskit and TKET: What the MQT Benchmark Actually Showed
          </h1>

          <div className="text-sm font-mono text-text-secondary">
            A high-integrity cross-compiler comparison: valid compilation, Qiskit fidelity parity, and TKET sensitivity.
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
            <div>BY: <strong className="text-text-primary">Q-Psi Research Team</strong></div>
            <div>&bull;</div>
            <div>STATUS: <strong className="text-text-primary">MIXED COMPETITIVENESS</strong></div>
            <div>&bull;</div>
            <div>JOB ID: <code className="text-text-primary">da1ul7e3kjvs73877tag</code></div>
          </div>
        </div>

        <div className="space-y-8 text-sm font-sans text-text-secondary leading-relaxed border-t border-border pt-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">1. The Need for Honest Cross-Compiler Benchmarking</h2>
            <p>
              In quantum software literature, new compilers frequently claim universal superiority over established tools like Qiskit or TKET by selectively publishing favorable benchmarks or running unoptimized competitor baselines.
            </p>
            <p>
              In our MQT Benchmark campaign, Q-Psi compared its compiler against Qiskit O3 and TKET on IBM Heron r2 (<code>ibm_marrakesh</code>, 36,864 shots) across 6 standard MQT algorithms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">2. The Headline vs. The Reality</h2>
            <div className="space-y-3">
              <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5 font-mono text-xs">
                <div className="text-accent font-bold">1. QISKIT COMPARISON: STRONG PARITY</div>
                <p className="font-sans text-text-secondary text-xs">
                  Across all 6 physical algorithms, Qiskit O3 held a small aggregate advantage (mean delta \(-0.0067\), 95% CI: \([-0.0123, -0.0010]\)). Q-Psi tied or closely matched Qiskit on simple circuits but was disfavored on deep circuits like <code>qft_n6</code>.
                </p>
              </div>

              <div className="p-4 bg-surface-subtle border border-border rounded space-y-1.5 font-mono text-xs">
                <div className="text-accent font-bold">2. TKET COMPARISON: SENSITIVITY TO ONE OUTLIER</div>
                <p className="font-sans text-text-secondary text-xs">
                  A naive aggregate calculation suggests Q-Psi &quot;beat&quot; TKET with a \(+0.0398\) delta. However, sensitivity analysis reveals that this aggregate positive delta was caused by a single workload: <code>vqe_su2_n8</code>, where TKET&apos;s heavy-hex routing suffered a severe layout failure (\(+0.2696\) delta for Q-Psi).
                </p>
                <div className="pt-1 font-mono text-[11px] text-text-primary">
                  Omitting <code>vqe_su2_n8</code> shifts the aggregate delta to <strong>-0.0062</strong> ([-0.0120, -0.0006]).
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">3. Why Claims of General Superiority Are Prohibited</h2>
            <p>
              Claiming &quot;Q-Psi outperforms TKET&quot; without disclosing the single-workload sensitivity would be scientifically misleading. Q-Psi classifies this result as <strong>MIXED COMPETITIVENESS</strong> and explicitly disclaims universal compiler superiority.
            </p>
          </section>

          <section className="space-y-2 font-mono text-xs border-t border-border pt-6 text-text-muted">
            <div>FULL AUDIT NOTE: <Link href="/research/mqt-cross-compiler" className="text-accent hover:underline">MQT Benchmark Research Note</Link></div>
            <div>RAW RESULTS SHA256: <span className="text-text-primary">9d347393dd9f2b3c168ab706d2c4d55e0ff4ab1c65ea5091fb8b62527fc7e3e5</span></div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
