from typing import AsyncGenerator
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from qpsi_engine.infrastructure.database import init_db
from qpsi_engine.api.routes import health, worlds, commands, events


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    init_db()
    yield


app = FastAPI(
    title="Q-Psi Classical Reference State Engine API",
    description=(
        "Authoritative deterministic persistent state engine proving the smallest repeatable Q-Psi unit: "
        "Two original fictional adult characters (Marcus & Elena) inside one persistent room (`main_room`) "
        "with canonical history that survives process restarts."
    ),
    version="0.1.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(worlds.router)
app.include_router(commands.router)
app.include_router(events.router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("qpsi_engine.api.main:app", host="0.0.0.0", port=8000, reload=True)
