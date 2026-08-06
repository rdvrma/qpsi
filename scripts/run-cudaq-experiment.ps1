# PowerShell script to execute CUDA-Q candidate transition search experiment
$ErrorActionPreference = "Stop"

Write-Host "=== Running Q-Psi CUDA-Q Candidate Transition Search Experiment ===" -ForegroundColor Cyan

Set-Location "$PSScriptRoot\..\experiments\qpsi-transition-search"

$env:PYTHONPATH = "src;..\..\services\qpsi-engine\src"
python -m qpsi_transition_search.cli --run-benchmarks --shots 1000 --seed 42

Write-Host "=== Benchmark Experiment Complete ===" -ForegroundColor Green
