import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertCircle, FileText, Database, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Why Lower Circuit Depth Did Not Guarantee Better Physical Fidelity — Q-Psi Blog',
  description:
    'Lessons from a 156-qubit hardware-aware routing study on IBM Heron: unitary SWAP routing vs dynamic feed-forward routing.',
};

export default function ArticleDynamicRoutingPage() {
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
            RESEARCH ARTICLE &bull; TIER B FINDINGS
          </div>
        </div>

        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D97706]">
              ROUTING RESEARCH &bull; EXP-06-ROUTING
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Why Lower Circuit Depth Did Not Guarantee Better Physical Fidelity
          </h1>

          <div className="text-sm font-mono text-text-secondary">
            Lessons from a 156-qubit hardware-aware dynamic routing study on IBM Heron.
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
            <div>BY: <strong className="text-text-primary">Q-Psi Research Team</strong></div>
            <div>&bull;</div>
            <div>HARDWARE: <strong className="text-text-primary">ibm_marrakesh (156Q Heron r2)</strong></div>
            <div>&bull;</div>
            <div>JOB ID: <code className="text-text-primary">da1t22mg52gs73cm31i0</code></div>
          </div>
        </div>

        <div className="space-y-8 text-sm font-sans text-text-secondary leading-relaxed border-t border-border pt-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">1. The Depth Reduction Hypothesis</h2>
            <p>
              In quantum circuit compilation, long-range entangling operations typically require linear chains of SWAP gates, expanding two-qubit gate depth as \(O(D)\) where \(D\) is the physical distance on the processor lattice. Dynamic feed-forward circuits, by contrast, use mid-circuit measurement and classical feed-forward to execute teleportation-style routing in constant \(O(1)\) two-qubit gate depth regardless of distance.
            </p>
            <p>
              We tested whether this constant-depth advantage translates to superior physical Bell-state fidelity on IBM Quantum&apos;s 156-qubit Heron architecture (<code>ibm_marrakesh</code>, 18,432 shots).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">2. Empirical Findings Across 3 Distances</h2>
            <div className="p-5 bg-surface-subtle border border-border rounded-lg font-mono text-xs space-y-3">
              <div className="space-y-1">
                <div className="text-accent font-bold">SHORT DISTANCE (3 HOPS): UNITARY WON</div>
                <div className="text-text-secondary font-sans text-xs">
                  Unitary SWAP fidelity: <strong>0.8618</strong> vs. Dynamic feed-forward: <strong>0.8209</strong> (&Delta; = -0.0409, p &lt; 0.001). Unitary routing physically won.
                </div>
              </div>

              <div className="space-y-1 border-t border-border pt-2">
                <div className="text-accent font-bold">MEDIUM DISTANCE (7 HOPS): UNITARY WON</div>
                <div className="text-text-secondary font-sans text-xs">
                  Unitary SWAP fidelity: <strong>0.8135</strong> vs. Dynamic feed-forward: <strong>0.7651</strong> (&Delta; = -0.0484, p &lt; 0.001). Unitary routing physically won.
                </div>
              </div>

              <div className="space-y-1 border-t border-border pt-2">
                <div className="text-accent font-bold">LONG DISTANCE (13 HOPS): INCONCLUSIVE</div>
                <div className="text-text-secondary font-sans text-xs">
                  Dynamic routing preserved 2Q depth of <strong>2</strong> vs. unitary depth of <strong>73</strong>. However, measured Bell fidelity difference remained inconclusive (0.6669 vs 0.6356, &Delta; = -0.0314, 95% CI: [-0.0630, +0.0005]).
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">3. Physical Takeaway: Measurement &amp; Reset Latency</h2>
            <p>
              Mid-circuit measurement and qubit reset on superconducting hardware are significantly slower and noisier than single-qubit microwave gates. On IBM Heron r2, the error penalty of dynamic ancilla operations exceeded the cumulative decoherence of up to 7 SWAP gates.
            </p>
            <p>
              Q-Psi&apos;s pre-QPU calibration cost model correctly predicted both conclusive outcomes (<strong>2/2 confirmed</strong>).
            </p>
          </section>

          <section className="space-y-2 font-mono text-xs border-t border-border pt-6 text-text-muted">
            <div>FORMAL RESEARCH NOTE: <Link href="/research/dynamic-routing-crossover" className="text-accent hover:underline">Dynamic Routing Research Note</Link></div>
            <div>RAW RESULTS SHA256: <span className="text-text-primary">6c8527a9854651585d5262b3c2399e612573906281ec030eef3be0005dbf83f0</span></div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
