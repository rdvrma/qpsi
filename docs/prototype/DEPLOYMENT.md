# Q-Psi Engine & Prototype Deployment Guide

## 1. Local Development Setup

### Backend (Python FastAPI)
```bash
cd services/qpsi-engine
python -m pip install -e ".[dev]"
python -m uvicorn qpsi_engine.api.main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend (Next.js 15)
```bash
npm install
npm run dev
# Open http://localhost:3000/prototype
```

---

## 2. Docker Container Deployment

```bash
# Build and run backend container with persistent database volume
docker-compose -f docker-compose.prototype.yml up --build -d
```

### Container Specifications
- **Base Image**: `python:3.12-slim`
- **Exposed Port**: `8000`
- **Health Check**: `GET /health` and `GET /ready`

---

## 3. Production Environment Variables

### Backend Environment Variables
| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `sqlite:///./qpsi_world.db` | PostgreSQL or SQLite connection URL |
| `QPSI_ENV` | `production` | Deployment environment mode |
| `QPSI_PUBLIC_DEMO_ENABLED` | `true` | Enables isolated public visitor sessions |
| `QPSI_ALLOWED_ORIGINS` | `https://qpsi.vercel.app` | CORS allowlist (comma-separated) |
| `QPSI_SESSION_TTL_MINUTES` | `60` | Demo session expiration TTL |
| `QPSI_MAX_WORLDS_PER_CLIENT` | `10` | Rate control cap per client |
| `QPSI_RESET_ENABLED` | `true` | Allows visitor reset of own world |

### Frontend Environment Variables
| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_QPSI_ENGINE_URL` | `http://localhost:8000` | Engine backend API URL |
