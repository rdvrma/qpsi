import { Metadata } from "next";
import Link from "next/link";
import { Shield, Download, FileText, Cpu, CheckCircle2, AlertTriangle, ArrowUpRight, BarChart2 } from "lucide-react";
import aggregateMetrics from "@/public/artifacts/research-transition-search/aggregate-metrics.json";
import manifestData from "@/public/artifacts/research-transition-search/MANIFEST.json";

export const metadata: Metadata = {
  title: "Q-Psi Research | Candidate-Transition Selection (CUDA-Q vs Classical)",
  description: "Reproducible simulator-based benchmark evaluating classical vs CUDA-Q QAOA candidate transition selection under strict validity and continuity constraints.",
};

export default function TransitionSearchResearchPage() {
  const metrics = aggregateMetrics;
  const manifest = manifestData.manifest || [];

  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F2] pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="border-b border-white/10 pb-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-white/60 font-bold">
            Q-PSI FRONTIER RESEARCH EXPERIMENT
          </span>
          <div className="flex flex-wrap gap-2 text-[11px] font-mono">
            <span className="bg-white/10 border border-white/10 px-2.5 py-0.5 rounded text-white">SIMULATOR-BASED RESEARCH</span>
            <span className="bg-white/10 border border-white/10 px-2.5 py-0.5 rounded text-white">CLASSICAL BASELINE REQUIRED</span>
            <span className="bg-white/10 border border-white/10 px-2.5 py-0.5 rounded text-white">NO QUANTUM ADVANTAGE CLAIM</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight mb-3">
          Classical vs. CUDA-Q QAOA Candidate-Transition Search
        </h1>
        <p className="text-sm font-mono text-[#777777] max-w-3xl leading-relaxed">
          Bounded research evaluating QAOA candidate action selection against exact classical exhaustive search ($2^8 = 256$ state space) in a 2-character persistent room.
        </p>
      </div>

      {/* Mandatory Scientific Disclosures Banner */}
      <div className="bg-[#111111] border border-amber-500/30 rounded-lg p-5 mb-8 font-mono text-xs text-amber-200/90 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-400 uppercase tracking-wider text-sm">
          <AlertTriangle className="w-4 h-4" />
          Mandatory Research Integrity Disclosures
        </div>
        <p>
          “This simulator-based experiment evaluates a small candidate-selection formulation. It does not demonstrate quantum advantage, quantum speedup, production-scale utility, or superiority over classical exhaustive search.”
        </p>
        <p className="text-white/70">
          “The classical Q-Psi validator remains authoritative. CUDA-Q output is treated only as a research candidate proposal.”
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 font-mono text-xs">
        <div className="bg-[#111111] border border-white/10 p-4 rounded-lg">
          <span className="text-[10px] text-[#777777] uppercase block mb-1">Scenarios Evaluated</span>
          <span className="text-xl text-white font-bold">{metrics.total_scenarios}</span>
        </div>

        <div className="bg-[#111111] border border-white/10 p-4 rounded-lg">
          <span className="text-[10px] text-[#777777] uppercase block mb-1">QAOA p=2 Optimum Agreement</span>
          <span className="text-xl text-emerald-400 font-bold">{(metrics.exact_optimum_agreement_p2 * 100).toFixed(1)}%</span>
        </div>

        <div className="bg-[#111111] border border-white/10 p-4 rounded-lg">
          <span className="text-[10px] text-[#777777] uppercase block mb-1">QAOA p=2 Validator Pass Rate</span>
          <span className="text-xl text-emerald-400 font-bold">{(metrics.classical_pass_rate_p2 * 100).toFixed(1)}%</span>
        </div>

        <div className="bg-[#111111] border border-white/10 p-4 rounded-lg">
          <span className="text-[10px] text-[#777777] uppercase block mb-1">Execution Baseline</span>
          <span className="text-xl text-white font-bold">qpp-cpu</span>
        </div>
      </div>

      {/* Detailed Benchmark Results Table */}
      <div className="bg-[#111111] border border-white/10 rounded-lg p-6 mb-8 font-mono text-xs">
        <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-4 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-white/70" />
          Aggregate Experimental Benchmarks (p=1 vs p=2)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/10 text-white/50 text-[11px]">
              <tr>
                <th className="py-2 px-3">Metric Name</th>
                <th className="py-2 px-3">Exhaustive Optimum</th>
                <th className="py-2 px-3">QAOA (p=1)</th>
                <th className="py-2 px-3">QAOA (p=2)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Exact Optimum Agreement Rate</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">100.0%</td>
                <td className="py-2.5 px-3">{(metrics.exact_optimum_agreement_p1 * 100).toFixed(1)}%</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">{(metrics.exact_optimum_agreement_p2 * 100).toFixed(1)}%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Classical Validator Pass Rate</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">100.0%</td>
                <td className="py-2.5 px-3">{(metrics.classical_pass_rate_p1 * 100).toFixed(1)}%</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">{(metrics.classical_pass_rate_p2 * 100).toFixed(1)}%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Mean Utility Regret</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">0.0000</td>
                <td className="py-2.5 px-3">{metrics.mean_utility_regret_p1.toFixed(4)}</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">{metrics.mean_utility_regret_p2.toFixed(4)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Exactly-One Bitstring Sampling Rate</td>
                <td className="py-2.5 px-3 text-white/50">N/A</td>
                <td className="py-2.5 px-3">{(metrics.exactly_one_bitstring_rate_p1 * 100).toFixed(1)}%</td>
                <td className="py-2.5 px-3 font-bold">{(metrics.exactly_one_bitstring_rate_p2 * 100).toFixed(1)}%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Invalid Selection Rate (Decoded)</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">0.0%</td>
                <td className="py-2.5 px-3">{(metrics.invalid_selection_rate_p1 * 100).toFixed(1)}%</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">{(metrics.invalid_selection_rate_p2 * 100).toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Reproducibility & Downloadable Artifacts */}
      <div className="bg-[#111111] border border-white/10 rounded-lg p-6 mb-8 font-mono text-xs">
        <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-3 flex items-center gap-2">
          <Download className="w-4 h-4 text-white/70" />
          Download Verifiable Result Artifacts & SHA-256 Manifest
        </h3>
        <p className="text-white/70 mb-4">
          All benchmark outputs are published deterministically with SHA-256 checksums recorded in <code className="bg-black/50 px-1 py-0.5 rounded text-white">MANIFEST.json</code>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <a
            href="/artifacts/research-transition-search/aggregate-metrics.json"
            download="aggregate-metrics.json"
            className="bg-[#050505] border border-white/10 hover:bg-white/10 p-3 rounded text-white flex items-center justify-between transition"
          >
            <span>aggregate-metrics.json</span>
            <Download className="w-3.5 h-3.5 text-white/60" />
          </a>

          <a
            href="/artifacts/research-transition-search/benchmark-results.csv"
            download="benchmark-results.csv"
            className="bg-[#050505] border border-white/10 hover:bg-white/10 p-3 rounded text-white flex items-center justify-between transition"
          >
            <span>benchmark-results.csv</span>
            <Download className="w-3.5 h-3.5 text-white/60" />
          </a>

          <a
            href="/artifacts/research-transition-search/MANIFEST.json"
            download="MANIFEST.json"
            className="bg-[#050505] border border-white/10 hover:bg-white/10 p-3 rounded text-white flex items-center justify-between transition"
          >
            <span>MANIFEST.json</span>
            <Download className="w-3.5 h-3.5 text-white/60" />
          </a>
        </div>
      </div>

      {/* Reproducibility Commands */}
      <div className="bg-[#111111] border border-white/10 rounded-lg p-6 font-mono text-xs space-y-3">
        <h3 className="font-bold text-sm uppercase tracking-wider text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-white/70" />
          Reproduce Experiment Locally
        </h3>
        <p className="text-white/70">
          Run the experiment on host or inside Docker container:
        </p>
        <pre className="bg-[#050505] border border-white/10 p-4 rounded text-emerald-400 overflow-x-auto text-[11px]">
          {`# Standard Python Execution
cd experiments/qpsi-transition-search
python -m qpsi_transition_search.cli --run-benchmarks --shots 1000 --seed 42

# Docker / Linux CUDA-Q Container Execution
docker-compose -f docker-compose.cudaq.yml up --build`}
        </pre>
      </div>
    </main>
  );
}
