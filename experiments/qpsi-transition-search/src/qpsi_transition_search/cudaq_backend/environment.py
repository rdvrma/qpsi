import sys
import platform
from typing import Dict, Any

try:
    import cudaq  # type: ignore
    HAS_CUDA_Q = True
    CUDA_Q_VERSION = getattr(cudaq, "__version__", "installed")
except ImportError:
    cudaq = None
    HAS_CUDA_Q = False
    CUDA_Q_VERSION = "N/A (Host environment missing cudaq package)"

class CudaQEnvironment:
    """Detects CUDA-Q system environment, simulator targets, and GPU availability."""

    @staticmethod
    def get_info() -> Dict[str, Any]:
        has_gpu = False
        gpu_count = 0
        gpu_model = "None"
        target = "qpp-cpu"

        if HAS_CUDA_Q and cudaq is not None:
            try:
                if hasattr(cudaq, "num_available_gpus"):
                    gpu_count = cudaq.num_available_gpus()
                    has_gpu = gpu_count > 0
                if hasattr(cudaq, "has_target") and cudaq.has_target("nvidia") and has_gpu:
                    target = "nvidia"
            except Exception:
                pass

        return {
            "has_cudaq": HAS_CUDA_Q,
            "cudaq_version": CUDA_Q_VERSION,
            "operating_system": platform.platform(),
            "python_version": sys.version.split()[0],
            "cpu_model": platform.processor() or "x86_64",
            "gpu_available": has_gpu,
            "gpu_count": gpu_count,
            "gpu_model": gpu_model,
            "selected_target": target,
        }
