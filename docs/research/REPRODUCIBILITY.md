# M3 — Reproducibility Instructions

## 1. Local Python Environment Setup

```bash
cd experiments/qpsi-transition-search
pip install -e ".[dev]"
```

## 2. Run Test Suite

```bash
python -m pytest
```

## 3. Run Benchmark Suite

```bash
python -m qpsi_transition_search.cli --run-benchmarks --shots 1000 --seed 42
```

## 4. Run Docker Container Execution

```bash
cd experiments/qpsi-transition-search
docker-compose -f docker-compose.cudaq.yml up --build
```

## 5. Verify Checksums

```bash
cat artifacts/MANIFEST.json
```
