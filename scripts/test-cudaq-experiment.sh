#!/bin/bash
set -e

echo "=== Testing Q-Psi CUDA-Q Candidate Transition Search Suite ==="
cd "$(dirname "$0")/../experiments/qpsi-transition-search"

export PYTHONPATH="src:../../services/qpsi-engine/src"
python3 -m pytest

echo "=== Experiment Unit & Integration Tests Passed ==="
