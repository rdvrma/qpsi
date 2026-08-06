# PowerShell script to test CUDA-Q candidate transition search experiment
$ErrorActionPreference = "Stop"

Write-Host "=== Testing Q-Psi CUDA-Q Candidate Transition Search Suite ===" -ForegroundColor Cyan

Set-Location "$PSScriptRoot\..\experiments\qpsi-transition-search"

$env:PYTHONPATH = "src;..\..\services\qpsi-engine\src"
python -m pytest

Write-Host "=== Experiment Unit & Integration Tests Passed ===" -ForegroundColor Green
