FROM nvcr.io/nvidia/quantum/cuda-quantum:0.9.0

WORKDIR /app

COPY pyproject.toml README.md ./
COPY src/ ./src/
COPY tests/ ./tests/

RUN pip install -e ".[dev,cudaq]"

CMD ["python", "-m", "qpsi_transition_search.cli", "--run-benchmarks"]
