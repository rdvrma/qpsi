#!/bin/bash
set -e

echo "=== Running Q-Psi CUDA-Q Candidate Transition Search Experiment ==="
cd "$(dirname "$0")/../experiments/qpsi-transition-search"

export PYTHONPATH="src:../../services/qpsi-engine/src"
python3 -m qpsi_transition_search.cli --run-benchmarks --shots 1000 --seed 42

echo "=== Benchmark Experiment Complete ==="
