import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import { ShieldCheck, ArrowUpRight, CheckCircle2, AlertCircle, Database, FileText, Lock, GitBranch } from 'lucide-react';

export const metadata = {
  title: 'Research Methodology & Scientific Freeze — Q-Psi',
  description:
    'Detailed audit methodology, pre-QPU protocol freeze discipline, Jensen’s inequality statistical resolution, and 14/14 deterministic recomputation verification.',
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Masthead */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              AUDIT METHODOLOGY &bull; SCIENTIFIC INTEGRITY
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Research Methodology &amp; Scientific Freeze
          </h1>

          <p className="text-base text-text-secondary max-w-3xl font-sans leading-relaxed">
            The Q-Psi research program adheres to strict pre-registration discipline, cryptographic evidence sealing, independent statistical recomputation, and transparent preservation of negative comparator results.
          </p>

          <div className="p-4 bg-surface-raised border border-border rounded-lg flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="text-text-muted">FREEZE COMMIT: </span>
              <code className="text-text-primary font-semibold">be74ad05187e148e2fc52309f4d7f57be3784157</code>
            </div>
            <div>
              <span className="text-text-muted">RECOMPUTATION SUITE: </span>
              <strong className="text-[#15803D]">14/14 PASSED (0 FAILED)</strong>
            </div>
          </div>
        </div>

        {/* Section 1: Pre-Registration & Commit Discipline */}
        <section className="space-y-4 text-sm text-text-secondary leading-relaxed font-sans">
          <h2 className="text-2xl font-serif font-bold text-text-primary">
            1. Pre-Registration &amp; Two-Phase Commit Protocol
          </h2>
          <p>
            To prevent hypothesis drift, cherry-picking, or post-hoc parameter adjustments, every physical QPU experiment in the Q-Psi program followed a strict two-phase commit protocol:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>
              <strong className="text-text-primary">Pre-QPU Freeze Commit:</strong> Test definitions, circuit generation algorithms, hypothesis statements, analysis scripts, and seed controls were committed to Git prior to submitting jobs to IBM Quantum.
            </li>
            <li>
              <strong className="text-text-primary">Physical QPU Execution:</strong> Jobs were submitted to <code>ibm_marrakesh</code> (IBM Heron r2, 156 programmable qubits) using pre-registered parameters.
            </li>
            <li>
              <strong className="text-text-primary">Post-QPU Ingestion Commit:</strong> Raw measurement counts and execution manifests were ingested without modifying hypotheses, seeds, or evaluation functions.
            </li>
          </ol>

          <div className="p-4 bg-surface-subtle border border-border rounded font-mono text-xs space-y-1">
            <div className="text-accent font-bold">LINEAR COMMIT ANCESTRY</div>
            <div className="text-text-primary">
              origin/main &rarr; main &rarr; research/quantum-data-foundry-coding-v1 &rarr; research/quantum-data-foundry-coding-v2-120qsec &rarr; audit/qpsi-master-evidence-freeze-2026-08-18
            </div>
            <div className="text-text-muted text-[11px] pt-1">
              All commit timestamps chronologically precede QPU execution ingestion timestamps. Zero post-hoc parameter tuning was detected.
            </div>
          </div>
        </section>

        {/* Section 2: Independent Statistical Recomputation */}
        <section className="space-y-4 text-sm text-text-secondary leading-relaxed font-sans">
          <h2 className="text-2xl font-serif font-bold text-text-primary">
            2. Independent Deterministic Recomputation
          </h2>
          <p>
            Every physical experiment was evaluated through independent, deterministic Python recomputation scripts directly from raw counts. The consolidated test suite executes all 14 campaign verifications:
          </p>

          <div className="p-4 bg-[#101522] text-[#F0F4F8] border border-[#273248] rounded font-mono text-xs space-y-2">
            <div className="text-[#00AFC7]">$ python research/audit_2026_08_18/recompute/recompute_all_and_verify.py</div>
            <div className="text-[#94A3B8] space-y-0.5 text-[11px]">
              <div>[PASS] recompute_fractional_gate_lowering.py (6 cases verified)</div>
              <div>[PASS] recompute_calibration_aware_layout.py (6 cases vs Qiskit O3)</div>
              <div>[PASS] recompute_mcm_qubit_reuse.py (6 streaming cases, median 78.1% reduction)</div>
              <div>[PASS] recompute_directed_execution.py (4 cases under bootstrap)</div>
              <div>[PASS] recompute_mqt_cross_compiler.py (18 compilation + 6 physical cases)</div>
              <div>[PASS] recompute_mqt_sensitivity.py (leave-one-out sensitivity verified)</div>
              <div>[PASS] recompute_qwalk_investigation.py (NISQ decoherence floor verified)</div>
              <div>[PASS] recompute_dynamic_routing.py (18 circuits across 3 distances)</div>
              <div>[PASS] recompute_data_foundry_v1.py (14 records, 100% provenance)</div>
              <div>[PASS] recompute_data_foundry_v2.py (93 records, 127.58s runtime, 100% provenance)</div>
              <div>[PASS] recompute_grover_advantage.py (9 instances, 1.19x–2.43x query reduction)</div>
              <div>[PASS] recompute_dynamic_bv.py (N=4..16 scaling, slope 0.1532 vs 0.6963, t=-30.65)</div>
              <div>[PASS] recompute_restricted_simon.py (12 cases across k=2,3 and N=8..28)</div>
              <div>[PASS] recompute_stage6f.py (8 optimization instances verified)</div>
            </div>
            <div className="text-[#15803D] font-bold pt-1">
              CONSOLIDATED VERDICT: 14/14 PASSED, 0 DISCREPANCIES
            </div>
          </div>
        </section>

        {/* Section 3: Statistical Resolution (Jensen's Inequality) */}
        <section className="space-y-4 text-sm text-text-secondary leading-relaxed font-sans">
          <h2 className="text-2xl font-serif font-bold text-text-primary">
            3. Statistical Resolution: Finite-Sample Jensen&apos;s Bias
          </h2>
          <p>
            During the audit, certain marginal physical fidelity point estimates (F_obs) appeared slightly above the reported 95% bootstrap confidence interval [CI_low, CI_high]. An adversarial mathematical review resolved this mechanism:
          </p>

          <div className="p-5 bg-surface-raised border border-border rounded-lg space-y-3 font-sans text-xs">
            <h3 className="text-sm font-serif font-bold text-text-primary">
              Mathematical Mechanism: Concavity of Square-Root in Bhattacharyya Estimator
            </h3>
            <p className="leading-relaxed">
              The Bhattacharyya fidelity estimator is defined as F(p_hat, p_ideal) = (&sum;_x &radic;(p_hat(x) &middot; p_ideal(x)))&sup2;. Because the square-root function g(u) = &radic;u is strictly concave for u &gt; 0, by <strong>Jensen&apos;s Inequality</strong>:
            </p>
            <div className="p-3 bg-surface-subtle border border-border rounded font-mono text-center text-text-primary">
              E*[&radic;p_hat*(x)] &lt; &radic;E*[p_hat*(x)] = &radic;p_hat_obs(x)
            </div>
            <p className="leading-relaxed">
              In high-dimensional support distributions (e.g. 64–256 states), the cumulative variance shifts the unadjusted percentile bootstrap distribution downward by 0.005 to 0.030.
            </p>
            <p className="leading-relaxed">
              <strong>Invariance of Difference Estimators (&Delta;):</strong> Because the downward shift affects both comparison arms nearly identically (Bias(F_A*) &approx; Bias(F_B*)), the bias subtracts out completely:
            </p>
            <div className="p-3 bg-surface-subtle border border-border rounded font-mono text-center text-text-primary">
              E*[&Delta;*] = E*[F_A*] - E*[F_B*] &approx; F_A - F_B = &Delta;_obs
            </div>
            <p className="leading-relaxed font-semibold text-text-primary">
              Scientific Impact: ZERO. All hypothesis tests, non-inferiority margins, and case classifications were governed strictly by &Delta;, which remains mathematically sound and unbiased.
            </p>
          </div>
        </section>

        {/* Section 4: Negative Result Preservation */}
        <section className="space-y-4 text-sm text-text-secondary leading-relaxed font-sans">
          <h2 className="text-2xl font-serif font-bold text-text-primary">
            4. Negative Result Preservation Policy
          </h2>
          <p>
            Q-Psi explicitly preserves and publishes negative comparator results:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs">
            <li>
              <strong>No Rescue Runs:</strong> When Calibration-Aware Layout failed to outperform Qiskit O3 best-of-8 seeds (mean delta \(-0.0106\)), no post-hoc parameter tweaks were conducted to overturn the result.
            </li>
            <li>
              <strong>Inconclusive Boundaries:</strong> Studies with high noise floors (Restricted Simon secret recovery failures at \(N &gt; 16\), long-range dynamic routing crossover failure at 13 hops) are retained as inconclusive rather than interpolated.
            </li>
            <li>
              <strong>Incomplete Protocol Disclosure:</strong> The unexecuted multi-backend campaign is explicitly labeled <code>INCOMPLETE_NOT_FROZEN</code> rather than claimed.
            </li>
          </ul>
        </section>

        {/* Section 5: Freeze Manifesto */}
        <section className="p-6 bg-surface-raised border border-border rounded-lg space-y-3 font-mono text-xs">
          <div className="font-bold text-accent uppercase">RESEARCH PROGRAM FREEZE MANIFESTO</div>
          <ol className="list-decimal list-inside space-y-1 text-text-secondary">
            <li><strong className="text-text-primary">NO NEW QPU JOBS:</strong> The 14 audited physical campaigns constitute the final frozen research record.</li>
            <li><strong className="text-text-primary">IMMUTABILITY:</strong> All SHA-256 evidence seals are cryptographically locked.</li>
            <li><strong className="text-text-primary">CLAIM CONSERVATISM:</strong> All external reporting strictly reflects the allowed wording and explicit qualifications.</li>
          </ol>
        </section>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
          <Link
            href="/evidence"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover transition-colors shadow-xs"
          >
            <Database className="w-3.5 h-3.5" />
            <span>View Verified Evidence Registry</span>
          </Link>
          <Link
            href="/research"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-surface-subtle border border-border text-text-primary font-sans text-xs font-semibold rounded hover:border-border-hover transition-colors"
          >
            <span>Back to Research Overview</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
