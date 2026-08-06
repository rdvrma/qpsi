# Complete End-to-End Reproduction Guide

## 1. M1/M2 Backend State Engine
```bash
cd services/qpsi-engine
pip install -e ".[dev]"
python -m pytest -v
```

## 2. M2 Frontend & Playwright E2E Suite
```bash
npm install
npx playwright install --with-deps chromium
npx playwright test
```

## 3. M3 CUDA-Q Experiment Suite
```bash
cd experiments/qpsi-transition-search
pip install -e ".[dev]"
python -m pytest -v
python -m qpsi_transition_search.cli --run-benchmarks --shots 1000 --seed 42
```
