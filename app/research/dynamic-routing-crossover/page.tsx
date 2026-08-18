import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { EvidenceLine } from '@/components/ui/EvidenceLine';
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertCircle, FileText, Database, ShieldCheck, Cpu, Layers } from 'lucide-react';

export const metadata = {
  title: 'Hardware-Aware Dynamic Routing on IBM Heron — Q-Psi Research Note',
  description: 'Physical QPU study evaluating unitary SWAP routing vs dynamic circuit feed-forward routing on a 156-qubit IBM Heron processor.',
};

export default function DynamicRoutingResearchNotePage() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/research"
            className="inline-flex items-center space-x-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Research Overview</span>
          </Link>
          <div className="text-xs font-mono text-text-muted">
            RESEARCH NOTE &bull; QPSI-NOTE-2026-03
          </div>
        </div>

        {/* Paper Masthead */}
        <div className="border-b border-border pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-raised border border-border rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-secondary">
              PHYSICAL QPU RESEARCH NOTE &bull; EXPERIMENT V1.0
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-tight">
            Hardware-Aware Compiler Routing on Superconducting Processors: Depth-Fidelity Tradeoffs and Latency Limits in Physical Dynamic Circuits
          </h1>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
            <div>AUTHORS: <strong className="text-text-primary">Q-Psi Research Team</strong></div>
            <div>&bull;</div>
            <div>DATE: <strong className="text-text-primary">August 18, 2026</strong></div>
            <div>&bull;</div>
            <div>BACKEND: <strong className="text-text-primary">ibm_marrakesh (156Q)</strong></div>
          </div>
        </div>

        {/* Abstract Box */}
        <div className="scientific-card p-6 sm:p-8 space-y-3 bg-surface-raised border border-border">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
            ABSTRACT
          </div>
          <p className="text-sm font-sans text-text-primary leading-relaxed">
            We evaluate whether a pre-QPU calibration-aware compiler decision model can accurately predict the winning implementation for long-range two-qubit entangling gates on current superconducting hardware. Testing across three physical distance cohorts (3, 7, and 13 hops) on a 156-qubit IBM Heron processor (<code>ibm_marrakesh</code>, Job ID <code>da1t22mg52gs73cm31i0</code>, 18,432 physical shots), we compare unitary SWAP-based routing against dynamic mid-circuit measurement and classical feed-forward routing. While dynamic routing maintained a strictly constant two-qubit gate depth (depth = 2 vs unitary depths of 13, 37, and 73), unitary routing achieved higher Bell-state fidelity on SHORT (0.8618 vs 0.8209) and MEDIUM (0.8135 vs 0.7651) separations. At 13 hops (LONG), the fidelity difference was statistically inconclusive (0.6669 vs 0.6356, 95% CI [-0.0630, +0.0005]), leaving the physical routing crossover unresolved. The frozen pre-QPU cost model correctly predicted both conclusive routing winners (2/2) based partly on a predeclared feed-forward latency penalty heuristic (&lambda; = 0.012). We present comprehensive numerical audits, sensitivity analyses, and strict scientific claim boundaries.
          </p>
        </div>

        {/* Evidence Status Callout */}
        <div className="p-6 bg-surface-subtle border border-border rounded-lg space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="font-bold text-text-primary">FORMAL SCIENTIFIC STATUS</span>
            <span className="px-2.5 py-0.5 rounded border bg-[#D97706]/10 text-[#B45309] border-[#D97706]/30 font-bold uppercase">
              SUPPORTED WITH QUALIFICATION
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-text-muted">
            <div>PHYSICAL BACKEND: <span className="text-text-primary font-semibold">ibm_marrakesh (156Q)</span></div>
            <div>IBM JOB ID: <span className="text-text-primary font-semibold">da1t22mg52gs73cm31i0</span></div>
            <div>RAW SHA256: <span className="text-text-secondary font-mono text-[10px]">6c8527a985465158...</span></div>
          </div>
          <div className="pt-1">
            <EvidenceLine status="QUALIFIED" claimLabel="ROUTING SIGNAL SUPPORTED WITH QUALIFICATION" />
          </div>
        </div>

        {/* Article Body */}
        <div className="space-y-10 text-sm font-sans text-text-secondary leading-relaxed border-t border-border pt-8">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              1. Research Question
            </h2>
            <p>
              In planar superconducting quantum architectures with restricted nearest-neighbor coupling topologies (such as the heavy-hex lattice of IBM Heron processors), executing long-range entangling operations between distant qubits is a primary source of circuit overhead.
            </p>
            <p>
              Quantum compilers have two primary paradigms for non-local routing:
            </p>
            <ol className="list-decimal list-inside space-y-1 pl-2">
              <li><strong>Unitary SWAP-Based Routing:</strong> Sequentially swapping quantum states along a physical coupling path. Gate depth and two-qubit error accumulation scale linearly with physical separation.</li>
              <li><strong>Dynamic Circuit Routing (MCM + Feed-Forward):</strong> Using an ancilla chain with mid-circuit measurements and classical feed-forward corrections to teleport entanglement in constant two-qubit gate depth (depth = 2) regardless of distance.</li>
            </ol>
            <p>
              <strong>Core Research Question:</strong> Can a pre-QPU calibration-aware compiler decision model choose between unitary SWAP routing and dynamic feed-forward routing to maximize physical Bell-state fidelity on current NISQ hardware across different topological distances?
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              2. Known Prior Art &amp; Scientific Claim Boundaries
            </h2>
            <p>
              To maintain scientific integrity and prevent exaggerated claims, we explicitly delineate the boundary between established prior art and Q-Psi&apos;s evaluated contribution:
            </p>
            <div className="p-4 bg-surface-raised border border-border rounded space-y-2 text-xs font-sans">
              <div className="font-bold text-text-primary font-mono uppercase">PRIOR ART BOUNDARY</div>
              <p>
                Q-Psi does <strong>not</strong> claim invention of dynamic circuits, mid-circuit measurement, classical feed-forward, gate teleportation, measurement-based entangling gates, or SWAP routing algorithms.
              </p>
              <div className="font-bold text-text-primary font-mono uppercase pt-2">Q-PSI EVALUATED CONTRIBUTION</div>
              <p>
                The contribution evaluated in this study is a <em>frozen compiler-oriented routing-decision protocol</em> that combines active calibration metrics with a mid-circuit latency model, along with its empirical physical-QPU validation across a 3-distance cohort on IBM Heron hardware.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              3. Hardware Setup &amp; Two Routing Implementations
            </h2>
            <p>
              The experiment was executed on <strong><code>ibm_marrakesh</code></strong> (IBM Heron r2, 156 programmable qubits) under Job ID <code>da1t22mg52gs73cm31i0</code>, consuming 10.5 seconds of physical QPU runtime across 18 distinct circuits (1,024 shots each; 18,432 total physical shots).
            </p>
            <p>
              We evaluated three topological separations along an authentic linear coupling chain on the processor:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong>SHORT:</strong> 3 physical hops</li>
              <li><strong>MEDIUM:</strong> 7 physical hops</li>
              <li><strong>LONG:</strong> 13 physical hops</li>
            </ul>

            <div className="pt-2">
              <h3 className="text-lg font-serif font-bold text-text-primary">Depth Comparison</h3>
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-xs font-mono border-collapse border border-border">
                  <thead>
                    <tr className="bg-surface-subtle text-text-primary">
                      <th className="border border-border p-2.5 text-left">Separation Cohort</th>
                      <th className="border border-border p-2.5 text-center">Topological Hops</th>
                      <th className="border border-border p-2.5 text-center">Unitary 2Q Depth</th>
                      <th className="border border-border p-2.5 text-center">Dynamic 2Q Depth</th>
                      <th className="border border-border p-2.5 text-center">Depth Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-2.5 font-bold">SHORT</td>
                      <td className="border border-border p-2.5 text-center">3 hops</td>
                      <td className="border border-border p-2.5 text-center">13</td>
                      <td className="border border-border p-2.5 text-center font-bold text-accent">2</td>
                      <td className="border border-border p-2.5 text-center text-accent">6.5&times; reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2.5 font-bold">MEDIUM</td>
                      <td className="border border-border p-2.5 text-center">7 hops</td>
                      <td className="border border-border p-2.5 text-center">37</td>
                      <td className="border border-border p-2.5 text-center font-bold text-accent">2</td>
                      <td className="border border-border p-2.5 text-center text-accent">18.5&times; reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2.5 font-bold">LONG</td>
                      <td className="border border-border p-2.5 text-center">13 hops</td>
                      <td className="border border-border p-2.5 text-center">73</td>
                      <td className="border border-border p-2.5 text-center font-bold text-accent">2</td>
                      <td className="border border-border p-2.5 text-center text-accent">36.5&times; reduction</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              4. Physical Bell Fidelity &amp; Empirical Results
            </h2>
            <p>
              Each circuit prepared a target Bell state |&Phi;<sup>+</sup>&rang; = (|00&rang; + |11&rang;) / &radic;2 between the distant control and target qubits. State fidelity was measured via quantum state tomography and parity observables.
            </p>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-xs font-mono border-collapse border border-border">
                <thead>
                  <tr className="bg-surface-subtle text-text-primary">
                    <th className="border border-border p-2.5 text-left">Cohort</th>
                    <th className="border border-border p-2.5 text-center">Unitary Bell Fidelity (95% CI)</th>
                    <th className="border border-border p-2.5 text-center">Dynamic Bell Fidelity (95% CI)</th>
                    <th className="border border-border p-2.5 text-center">&Delta;F = F_D - F_U (95% CI)</th>
                    <th className="border border-border p-2.5 text-center">Hardware Winner</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-2.5 font-bold">SHORT (3H)</td>
                    <td className="border border-border p-2.5 text-center font-bold text-text-primary">0.8618 [0.8462, 0.8770]</td>
                    <td className="border border-border p-2.5 text-center">0.8209 [0.8032, 0.8379]</td>
                    <td className="border border-border p-2.5 text-center font-bold text-[#DC2626]">-0.0409 [-0.0635, -0.0181]</td>
                    <td className="border border-border p-2.5 text-center font-bold text-text-primary">UNITARY_WIN</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2.5 font-bold">MEDIUM (7H)</td>
                    <td className="border border-border p-2.5 text-center font-bold text-text-primary">0.8135 [0.7959, 0.8311]</td>
                    <td className="border border-border p-2.5 text-center">0.7651 [0.7461, 0.7842]</td>
                    <td className="border border-border p-2.5 text-center font-bold text-[#DC2626]">-0.0485 [-0.0747, -0.0225]</td>
                    <td className="border border-border p-2.5 text-center font-bold text-text-primary">UNITARY_WIN</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2.5 font-bold">LONG (13H)</td>
                    <td className="border border-border p-2.5 text-center">0.6669 [0.6450, 0.6890]</td>
                    <td className="border border-border p-2.5 text-center">0.6356 [0.6128, 0.6582]</td>
                    <td className="border border-border p-2.5 text-center font-bold text-[#D97706]">-0.0314 [-0.0630, +0.0005]</td>
                    <td className="border border-border p-2.5 text-center font-bold text-[#D97706]">INCONCLUSIVE</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-surface-subtle border border-border rounded space-y-2 text-xs">
              <div className="font-bold text-text-primary font-mono uppercase">Key Modern Hardware Takeaways</div>
              <ul className="list-disc list-inside space-y-1 text-text-secondary">
                <li><strong>Constant Depth Is Not Automatically Better Fidelity:</strong> Even though dynamic circuits maintained depth 2 across all cohorts, unitary SWAP routing achieved statistically superior Bell fidelity at 3 and 7 hops on current Heron hardware.</li>
                <li><strong>Physical Crossover Remained Unresolved:</strong> At 13 hops, the 95% confidence interval for &Delta;F spans zero. The physical crossover was <em>not resolved</em>, and we do not extrapolate an untested crossover distance.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              5. Pre-QPU Model Predictions &amp; Confirmation Score
            </h2>
            <p>
              Prior to QPU execution, the calibration-aware cost model evaluated the target coupling paths using frozen calibration snapshots.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border-collapse border border-border">
                <thead>
                  <tr className="bg-surface-subtle text-text-primary">
                    <th className="border border-border p-2 text-left">Distance Cohort</th>
                    <th className="border border-border p-2 text-center">Frozen Pre-QPU Prediction</th>
                    <th className="border border-border p-2 text-center">Physical Conclusive Outcome</th>
                    <th className="border border-border p-2 text-center">Prediction Confirmed?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-2 font-bold">SHORT (3 hops)</td>
                    <td className="border border-border p-2 text-center font-bold">UNITARY</td>
                    <td className="border border-border p-2 text-center text-[#15803D] font-bold">UNITARY_WIN</td>
                    <td className="border border-border p-2 text-center text-[#15803D] font-bold">CONFIRMED</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2 font-bold">MEDIUM (7 hops)</td>
                    <td className="border border-border p-2 text-center font-bold">UNITARY</td>
                    <td className="border border-border p-2 text-center text-[#15803D] font-bold">UNITARY_WIN</td>
                    <td className="border border-border p-2 text-center text-[#15803D] font-bold">CONFIRMED</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2 font-bold">LONG (13 hops)</td>
                    <td className="border border-border p-2 text-center font-bold">UNITARY</td>
                    <td className="border border-border p-2 text-center text-[#B45309] font-bold">INCONCLUSIVE</td>
                    <td className="border border-border p-2 text-center text-text-muted font-bold">NOT COUNTED</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs font-mono text-text-secondary">
              <strong>Model Prediction Confirmation Score:</strong> <span className="text-[#15803D] font-bold">2 / 2 statistically conclusive tested distances</span> (LONG is inconclusive and excluded from confirmation count).
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              6. Critical Qualification: Feedforward Latency Heuristic &amp; Sensitivity
            </h2>
            <div className="p-5 bg-surface-raised border border-border rounded space-y-3 text-xs">
              <div className="flex items-center space-x-2 text-[#D97706] font-bold font-mono uppercase">
                <AlertCircle className="w-4 h-4" />
                <span>METHODOLOGICAL QUALIFICATION: PREDECLARED LATENCY HEURISTIC</span>
              </div>
              <p>
                The pre-QPU cost model incorporated an explicit mid-circuit feed-forward latency penalty coefficient:
              </p>
              <div className="font-mono text-center text-sm font-bold text-text-primary py-1">
                &lambda; = 0.012 per ancilla
              </div>
              <p>
                <strong>Audit Classification:</strong> <code>PREDECLARED_HEURISTIC</code>. While frozen prior to physical execution, this parameter was not directly extracted from an active real-time backend API calibration field.
              </p>
            </div>

            <h3 className="text-base font-serif font-bold text-text-primary pt-2">Sensitivity Analysis Across &lambda;</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border-collapse border border-border">
                <thead>
                  <tr className="bg-surface-subtle text-text-primary">
                    <th className="border border-border p-2 text-left">Latency Penalty (&lambda;)</th>
                    <th className="border border-border p-2 text-center">SHORT (3H)</th>
                    <th className="border border-border p-2 text-center">MEDIUM (7H)</th>
                    <th className="border border-border p-2 text-center">LONG (13H)</th>
                    <th className="border border-border p-2 text-center">Model Decision</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-2">&lambda; = 0.000 (Zero penalty)</td>
                    <td className="border border-border p-2 text-center">DYNAMIC</td>
                    <td className="border border-border p-2 text-center">DYNAMIC</td>
                    <td className="border border-border p-2 text-center">DYNAMIC</td>
                    <td className="border border-border p-2 text-center text-text-muted">Uncalibrated baseline</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">&lambda; = 0.003</td>
                    <td className="border border-border p-2 text-center">DYNAMIC</td>
                    <td className="border border-border p-2 text-center">DYNAMIC</td>
                    <td className="border border-border p-2 text-center">DYNAMIC</td>
                    <td className="border border-border p-2 text-center text-text-muted">Dynamic preferred</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">&lambda; = 0.006</td>
                    <td className="border border-border p-2 text-center">DYNAMIC</td>
                    <td className="border border-border p-2 text-center">DYNAMIC</td>
                    <td className="border border-border p-2 text-center">UNITARY</td>
                    <td className="border border-border p-2 text-center text-text-muted">Partial shift</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">&lambda; = 0.009</td>
                    <td className="border border-border p-2 text-center">DYNAMIC</td>
                    <td className="border border-border p-2 text-center">UNITARY</td>
                    <td className="border border-border p-2 text-center">UNITARY</td>
                    <td className="border border-border p-2 text-center text-text-muted">Partial shift</td>
                  </tr>
                  <tr className="bg-surface-subtle font-bold">
                    <td className="border border-border p-2 text-accent">&lambda; = 0.012 (Frozen Model)</td>
                    <td className="border border-border p-2 text-center text-accent">UNITARY</td>
                    <td className="border border-border p-2 text-center text-accent">UNITARY</td>
                    <td className="border border-border p-2 text-center text-accent">UNITARY</td>
                    <td className="border border-border p-2 text-center text-accent">2/2 Conclusive Matches</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">&lambda; = 0.015</td>
                    <td className="border border-border p-2 text-center">UNITARY</td>
                    <td className="border border-border p-2 text-center">UNITARY</td>
                    <td className="border border-border p-2 text-center">UNITARY</td>
                    <td className="border border-border p-2 text-center text-text-muted">Stable Unitary</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">&lambda; = 0.020</td>
                    <td className="border border-border p-2 text-center">UNITARY</td>
                    <td className="border border-border p-2 text-center">UNITARY</td>
                    <td className="border border-border p-2 text-center">UNITARY</td>
                    <td className="border border-border p-2 text-center text-text-muted">Stable Unitary</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-secondary font-sans">
              <strong>Robustness Classification:</strong> <code>PARTIAL</code>. The model successfully matches physical outcomes when &lambda; &ge; 0.012, demonstrating that modeling mid-circuit measurement and classical feed-forward latency is essential on modern hardware.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              7. Cryptographic Audit &amp; Freeze Integrity
            </h2>
            <div className="p-4 bg-surface-subtle border border-border rounded space-y-2 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-text-secondary">
                <div>PROTOCOL FREEZE COMMIT: <span className="text-text-primary font-bold">4d7a59229525259a6ae4adcd4e85a22e41bb187f</span></div>
                <div>FREEZE TIMESTAMP: <span className="text-text-primary font-bold">2026-08-18T03:27:01Z</span></div>
                <div>QPU SUBMISSION: <span className="text-text-primary font-bold">2026-08-18T03:27:02.529154Z</span></div>
                <div>RAW SEAL VALID: <span className="text-[#15803D] font-bold">YES</span></div>
                <div>PRE-QPU PREDICTIONS FROZEN: <span className="text-[#15803D] font-bold">YES</span></div>
                <div>POST-FREEZE SCIENTIFIC MUTATION: <span className="text-[#15803D] font-bold">NO</span></div>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-text-primary">
              8. Authorized Public Claim &amp; Excluded Statements
            </h2>
            <div className="p-5 bg-surface-raised border border-border rounded space-y-4 text-xs font-sans">
              <div>
                <div className="text-[11px] font-mono font-bold text-[#15803D] uppercase tracking-wider">
                  AUTHORIZED PUBLIC CLAIM
                </div>
                <p className="mt-1 text-text-primary font-medium italic">
                  &ldquo;On a frozen three-distance physical IBM Heron benchmark, Q-Psi&apos;s pre-QPU routing model correctly predicted the winning long-range CNOT implementation on both statistically conclusive tested distances. The dynamic implementation maintained constant two-qubit depth, but did not achieve higher Bell-state fidelity within the tested cohort. The routing crossover remained unresolved, and the predictive result depends partly on a predeclared mid-circuit latency heuristic; no general predictive-compiler or quantum-advantage claim is made.&rdquo;
                </p>
              </div>

              <div className="border-t border-border pt-3">
                <div className="text-[11px] font-mono font-bold text-[#DC2626] uppercase tracking-wider">
                  EXPLICITLY EXCLUDED CLAIMS
                </div>
                <ul className="mt-1 list-disc list-inside space-y-1 text-text-secondary">
                  <li><strong>NO Quantum Advantage:</strong> This experiment does not claim quantum advantage.</li>
                  <li><strong>NO Dynamic Circuit Superiority:</strong> Dynamic circuits did not outperform unitary SWAP routing in measured physical fidelity.</li>
                  <li><strong>NO Crossover Resolution:</strong> The physical crossover was not observed or resolved.</li>
                  <li><strong>NO General Predictive Compiler:</strong> Findings are bounded to the tested three-distance benchmark.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Action Links */}
        <div className="pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/experiments"
            className="inline-flex items-center space-x-2 text-xs font-sans font-semibold text-accent hover:underline"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>View All Physical Experiments</span>
          </Link>
          <Link
            href="/evidence"
            className="inline-flex items-center space-x-2 text-xs font-sans font-semibold text-accent hover:underline"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Inspect Raw Results &amp; Audit Hashes (Job da1t22mg52gs73cm31i0)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
