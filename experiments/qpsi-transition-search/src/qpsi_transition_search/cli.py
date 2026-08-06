import argparse
import sys
from pathlib import Path
from qpsi_transition_search.benchmarks.runner import BenchmarkRunner

def main() -> None:
    parser = argparse.ArgumentParser(description="Q-Psi Classical vs CUDA-Q Experiment CLI")
    parser.add_argument("--run-benchmarks", action="store_true", help="Run full 20+ scenario benchmark suite")
    parser.add_argument("--shots", type=int, default=1000, help="Number of shots per quantum measurement")
    parser.add_argument("--seed", type=int, default=42, help="Fixed random seed")
    parser.add_argument("--output-dir", type=str, default="artifacts", help="Artifact output directory")

    args = parser.parse_args()

    output_path = Path(args.output_dir)
    runner = BenchmarkRunner(output_dir=output_path)

    print("===============================================================")
    print("Q-Psi Classical vs CUDA-Q Candidate-Transition Research Kernel")
    print("===============================================================")
    print(f"Running 20 scenarios with shots={args.shots}, seed={args.seed}...")

    res = runner.run_all(shots=args.shots, seed=args.seed)
    metrics = res["metrics"]

    print("\n--- BENCHMARK RESULTS SUMMARY ---")
    print(f"Total Scenarios Tested: {metrics.total_scenarios}")
    print(f"QAOA p=1 Exact Optimum Agreement: {metrics.exact_optimum_agreement_p1 * 100:.1f}%")
    print(f"QAOA p=2 Exact Optimum Agreement: {metrics.exact_optimum_agreement_p2 * 100:.1f}%")
    print(f"QAOA p=1 Classical Pass Rate:     {metrics.classical_pass_rate_p1 * 100:.1f}%")
    print(f"QAOA p=2 Classical Pass Rate:     {metrics.classical_pass_rate_p2 * 100:.1f}%")
    print(f"Exactly-One Bitstring Rate (p=1): {metrics.exactly_one_bitstring_rate_p1 * 100:.1f}%")
    print(f"Exactly-One Bitstring Rate (p=2): {metrics.exactly_one_bitstring_rate_p2 * 100:.1f}%")
    print(f"Mean Utility Regret (p=1):        {metrics.mean_utility_regret_p1:.4f}")
    print(f"Mean Utility Regret (p=2):        {metrics.mean_utility_regret_p2:.4f}")
    print(f"Total Execution Time:             {metrics.execution_time_seconds:.2f}s")
    print(f"Artifacts exported to:            {res['export_summary']['manifest_file']}")
    print("===============================================================\n")

if __name__ == "__main__":
    main()
