import sys
from pathlib import Path

# Ensure experiments/qpsi-transition-search/src and services/qpsi-engine/src are on sys.path
current_dir = Path(__file__).resolve().parent
src_dir = current_dir / "src"
repo_root = current_dir.parent.parent
engine_src = repo_root / "services" / "qpsi-engine" / "src"

if src_dir.exists() and str(src_dir) not in sys.path:
    sys.path.insert(0, str(src_dir))

if engine_src.exists() and str(engine_src) not in sys.path:
    sys.path.insert(0, str(engine_src))
