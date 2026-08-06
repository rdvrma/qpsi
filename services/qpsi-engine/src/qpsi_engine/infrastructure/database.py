import os
from typing import Generator, Any
from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker, Session

# Environment variable check (checking DATABASE_URL first for PostgreSQL compatibility)
raw_db_url = os.environ.get("DATABASE_URL") or os.environ.get("QPSI_DATABASE_URL", "sqlite:///./qpsi_world.db")

# Convert legacy postgres:// to postgresql:// for SQLAlchemy 2.0
if raw_db_url.startswith("postgres://"):
    DATABASE_URL = raw_db_url.replace("postgres://", "postgresql://", 1)
else:
    DATABASE_URL = raw_db_url

is_sqlite = "sqlite" in DATABASE_URL

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if is_sqlite else {},
    pool_pre_ping=True,
    echo=False,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base: Any = declarative_base()


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db(target_engine: Any = engine) -> None:
    Base.metadata.create_all(bind=target_engine)


def check_database_ready(target_engine: Any = engine) -> bool:
    try:
        with target_engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return True
    except Exception:
        return False
