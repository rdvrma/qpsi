Write-Host "Starting Q-Psi Classical Reference State Engine..." -ForegroundColor Green
Set-Location -Path "$PSScriptRoot\..\services\qpsi-engine"
python -m uvicorn qpsi_engine.api.main:app --host 0.0.0.0 --port 8000 --reload
