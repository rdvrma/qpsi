#!/usr/bin/env bash
set -e

echo "Running Q-Psi Engine Automated Test Suite & Code Verification..."
cd services/qpsi-engine
ruff check src tests
mypy src
pytest
