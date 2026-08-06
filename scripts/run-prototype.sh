#!/usr/bin/env bash
set -e

echo "Starting Q-Psi Classical Reference State Engine..."
cd services/qpsi-engine
python -m uvicorn qpsi_engine.api.main:app --host 0.0.0.0 --port 8000 --reload
