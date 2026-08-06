FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy pyproject.toml and install Python dependencies
COPY pyproject.toml ./
RUN pip install --no-cache-dir .

# Copy source code and tests
COPY src/ ./src/
COPY tests/ ./tests/
COPY README.md ./

# Install package in editable/production mode
RUN pip install --no-cache-dir -e .

EXPOSE 8000

ENV QPSI_DATABASE_URL=sqlite:////app/data/qpsi_world.db

CMD ["uvicorn", "qpsi_engine.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
