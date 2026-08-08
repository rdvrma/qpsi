import os
from typing import AsyncGenerator
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from qpsi_engine.infrastructure.database import init_db
from qpsi_engine.api.routes import health, sessions, worlds, commands, events


from qpsi_engine.infrastructure.observability import default_observability_adapter


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    init_db()
    default_observability_adapter.initialize()
    yield
    default_observability_adapter.flush()


app = FastAPI(
    title="Q-Psi Classical Reference State Engine API",
    description=(
        "Authoritative deterministic persistent state engine proving the smallest repeatable Q-Psi unit: "
        "Two original fictional adult characters (Marcus & Elena) inside one persistent room (`main_room`) "
        "with canonical history that survives process restarts."
    ),
    version="0.2.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Parse environment CORS origins
raw_origins = os.environ.get(
    "QPSI_ALLOWED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000,https://qpsi.vercel.app"
)
allowed_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(sessions.router)
app.include_router(worlds.router)
app.include_router(commands.router)
app.include_router(events.router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("qpsi_engine.api.main:app", host="0.0.0.0", port=8000, reload=True)
