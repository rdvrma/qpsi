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
    <main className="min-h-screen bg-[#FAFAFA] text-[#09090B] pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="border-b border-black/10 pb-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#52525B] font-bold">
            Q-PSI FRONTIER RESEARCH EXPERIMENT
          </span>
          <div className="flex flex-wrap gap-2 text-[11px] font-mono">
            <span className="bg-black/5 border border-black/15 px-2.5 py-0.5 rounded text-black font-medium">SIMULATOR-BASED RESEARCH</span>
            <span className="bg-black/5 border border-black/15 px-2.5 py-0.5 rounded text-black font-medium">CLASSICAL BASELINE REQUIRED</span>
            <span className="bg-black/5 border border-black/15 px-2.5 py-0.5 rounded text-black font-medium">NO QUANTUM ADVANTAGE CLAIM</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif text-black font-bold tracking-tight mb-3">
          Classical vs. CUDA-Q QAOA Candidate-Transition Search
        </h1>
        <p className="text-sm font-mono text-[#52525B] max-w-3xl leading-relaxed font-medium">
          Bounded research evaluating QAOA candidate action selection against exact classical exhaustive search ($2^8 = 256$ state space) in a 2-character persistent room.
        </p>
      </div>

      {/* Mandatory Scientific Disclosures Banner */}
      <div className="bg-amber-50 border border-amber-300 rounded-lg p-5 mb-8 font-mono text-xs text-amber-950 space-y-2 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-amber-900 uppercase tracking-wider text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          Mandatory Research Integrity Disclosures
        </div>
        <p className="font-medium">
          “This simulator-based experiment evaluates a small candidate-selection formulation. It does not demonstrate quantum advantage, quantum speedup, production-scale utility, or superiority over classical exhaustive search.”
        </p>
        <p className="text-amber-900">
          “The classical Q-Psi validator remains authoritative. CUDA-Q output is treated only as a research candidate proposal.”
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 font-mono text-xs">
        <div className="bg-white border border-black/15 shadow-sm p-4 rounded-lg">
          <span className="text-[10px] text-[#52525B] uppercase block mb-1 font-medium">Scenarios Evaluated</span>
          <span className="text-xl text-black font-bold">{metrics.total_scenarios}</span>
        </div>

        <div className="bg-white border border-black/15 shadow-sm p-4 rounded-lg">
          <span className="text-[10px] text-[#52525B] uppercase block mb-1 font-medium">QAOA p=2 Optimum Agreement</span>
          <span className="text-xl text-emerald-700 font-bold">{(metrics.exact_optimum_agreement_p2 * 100).toFixed(1)}%</span>
        </div>

        <div className="bg-white border border-black/15 shadow-sm p-4 rounded-lg">
          <span className="text-[10px] text-[#52525B] uppercase block mb-1 font-medium">QAOA p=2 Validator Pass Rate</span>
          <span className="text-xl text-emerald-700 font-bold">{(metrics.classical_pass_rate_p2 * 100).toFixed(1)}%</span>
        </div>

        <div className="bg-white border border-black/15 shadow-sm p-4 rounded-lg">
          <span className="text-[10px] text-[#52525B] uppercase block mb-1 font-medium">Execution Baseline</span>
          <span className="text-xl text-black font-bold">qpp-cpu</span>
        </div>
      </div>

      {/* Detailed Benchmark Results Table */}
      <div className="bg-white border border-black/15 shadow-sm rounded-lg p-6 mb-8 font-mono text-xs text-black">
        <h3 className="font-bold text-sm uppercase tracking-wider text-black mb-4 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-black/70" />
          Aggregate Experimental Benchmarks (p=1 vs p=2)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-black/10 bg-[#F8F9FA] text-midGray text-[11px]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Metric Name</th>
                <th className="py-2.5 px-3 font-semibold">Exhaustive Optimum</th>
                <th className="py-2.5 px-3 font-semibold">QAOA (p=1)</th>
                <th className="py-2.5 px-3 font-semibold">QAOA (p=2)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 text-black font-medium">
              <tr>
                <td className="py-2.5 px-3 font-bold text-black">Exact Optimum Agreement Rate</td>
                <td className="py-2.5 px-3 text-emerald-700 font-bold">100.0%</td>
                <td className="py-2.5 px-3">{(metrics.exact_optimum_agreement_p1 * 100).toFixed(1)}%</td>
                <td className="py-2.5 px-3 text-emerald-700 font-bold">{(metrics.exact_optimum_agreement_p2 * 100).toFixed(1)}%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-black">Classical Validator Pass Rate</td>
                <td className="py-2.5 px-3 text-emerald-700 font-bold">100.0%</td>
                <td className="py-2.5 px-3">{(metrics.classical_pass_rate_p1 * 100).toFixed(1)}%</td>
                <td className="py-2.5 px-3 text-emerald-700 font-bold">{(metrics.classical_pass_rate_p2 * 100).toFixed(1)}%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-black">Mean Utility Regret</td>
                <td className="py-2.5 px-3 text-emerald-700 font-bold">0.0000</td>
                <td className="py-2.5 px-3">{metrics.mean_utility_regret_p1.toFixed(4)}</td>
                <td className="py-2.5 px-3 text-emerald-700 font-bold">{metrics.mean_utility_regret_p2.toFixed(4)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-black">Exactly-One Bitstring Sampling Rate</td>
                <td className="py-2.5 px-3 text-midGray">N/A</td>
                <td className="py-2.5 px-3">{(metrics.exactly_one_bitstring_rate_p1 * 100).toFixed(1)}%</td>
                <td className="py-2.5 px-3 font-bold">{(metrics.exactly_one_bitstring_rate_p2 * 100).toFixed(1)}%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-black">Invalid Selection Rate (Decoded)</td>
                <td className="py-2.5 px-3 text-emerald-700 font-bold">0.0%</td>
                <td className="py-2.5 px-3">{(metrics.invalid_selection_rate_p1 * 100).toFixed(1)}%</td>
                <td className="py-2.5 px-3 text-emerald-700 font-bold">{(metrics.invalid_selection_rate_p2 * 100).toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Reproducibility & Downloadable Artifacts */}
      <div className="bg-white border border-black/15 shadow-sm rounded-lg p-6 mb-8 font-mono text-xs text-black">
        <h3 className="font-bold text-sm uppercase tracking-wider text-black mb-3 flex items-center gap-2">
          <Download className="w-4 h-4 text-black/70" />
          Download Verifiable Result Artifacts & SHA-256 Manifest
        </h3>
        <p className="text-midGray mb-4">
          All benchmark outputs are published deterministically with SHA-256 checksums recorded in <code className="bg-[#F8F9FA] border border-black/15 px-1 py-0.5 rounded text-black font-semibold">MANIFEST.json</code>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <a
            href="/artifacts/research-transition-search/aggregate-metrics.json"
            download="aggregate-metrics.json"
            className="bg-[#F8F9FA] border border-black/15 hover:bg-black/5 p-3 rounded text-black font-semibold flex items-center justify-between transition"
          >
            <span>aggregate-metrics.json</span>
            <Download className="w-3.5 h-3.5 text-black/60" />
          </a>

          <a
            href="/artifacts/research-transition-search/benchmark-results.csv"
            download="benchmark-results.csv"
            className="bg-[#F8F9FA] border border-black/15 hover:bg-black/5 p-3 rounded text-black font-semibold flex items-center justify-between transition"
          >
            <span>benchmark-results.csv</span>
            <Download className="w-3.5 h-3.5 text-black/60" />
          </a>

          <a
            href="/artifacts/research-transition-search/MANIFEST.json"
            download="MANIFEST.json"
            className="bg-[#F8F9FA] border border-black/15 hover:bg-black/5 p-3 rounded text-black font-semibold flex items-center justify-between transition"
          >
            <span>MANIFEST.json</span>
            <Download className="w-3.5 h-3.5 text-black/60" />
          </a>
        </div>
      </div>

      {/* Reproducibility Commands */}
      <div className="bg-white border border-black/15 shadow-sm rounded-lg p-6 font-mono text-xs space-y-3 text-black">
        <h3 className="font-bold text-sm uppercase tracking-wider text-black flex items-center gap-2">
          <Cpu className="w-4 h-4 text-black/70" />
          Reproduce Experiment Locally
        </h3>
        <p className="text-midGray">
          Run the experiment on host or inside Docker container:
        </p>
        <pre className="bg-[#18181B] border border-black/20 p-4 rounded text-emerald-300 overflow-x-auto text-[11px]">
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
