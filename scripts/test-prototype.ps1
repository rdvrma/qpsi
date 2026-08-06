Write-Host "Running Q-Psi Engine Automated Test Suite..." -ForegroundColor Cyan
Set-Location -Path "$PSScriptRoot\..\services\qpsi-engine"
python -m pytest
