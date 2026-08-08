import os
import logging
import time
from typing import Any, Dict, Optional

logger = logging.getLogger("qpsi.observability")


class ObservabilityAdapter:
    """Thin, fail-safe Weights & Biases Weave adapter for Q-Psi experiment telemetry.

    Guarantees:
    1. Telemetry is OFF by default.
    2. Failure or missing credentials NEVER block or corrupt canonical engine operations.
    3. Fully functional in offline or test environments.
    """

    def __init__(self) -> None:
        self._active: bool = False
        self._project: str = ""
        self._weave_module: Any = None

    @property
    def is_active(self) -> bool:
        return self._active

    @property
    def project(self) -> str:
        return self._project

    def initialize(self, project_override: Optional[str] = None) -> bool:
        """Initializes Weave connection if QPSI_WEAVE_ENABLED is true and credentials exist."""
        enabled_env = os.getenv("QPSI_WEAVE_ENABLED", "false").lower() in ("true", "1", "yes")
        if not enabled_env:
            self._active = False
            logger.debug("Q-Psi Weave Observability disabled by configuration (QPSI_WEAVE_ENABLED=false).")
            return False

        project_name: str = project_override or os.getenv("QPSI_WEAVE_PROJECT", "q-psi/qpsi-classical-baseline") or "q-psi/qpsi-classical-baseline"
        _ = os.getenv("WANDB_API_KEY", "").strip()

        try:
            import weave
            self._weave_module = weave
        except ImportError:
            logger.warning(
                "QPSI_WEAVE_ENABLED=true but 'weave' package is not installed. "
                "Observability disabled; continuing engine execution normally."
            )
            self._active = False
            return False

        try:
            # Initialize weave project
            self._weave_module.init(project_name)
            self._active = True
            self._project = project_name
            logger.info(f"Q-Psi Weave Observability initialized successfully for project '{project_name}'.")
            return True
        except Exception as err:
            self._active = False
            logger.warning(
                f"Q-Psi Weave Observability initialization failed ({type(err).__name__}: {err}). "
                "Engine continuing normally without telemetry."
            )
            return False

    def trace_operation(self, op_name: str, payload: Dict[str, Any]) -> None:
        """Logs a state transition, replay, recovery, or validation boundary trace safely."""
        if not self._active or self._weave_module is None:
            return

        try:
            cleaned_payload = self._sanitize_payload(payload)
            cleaned_payload["timestamp_epoch_ms"] = int(time.time() * 1000)
            cleaned_payload["op_name"] = op_name

            # Publish or log to weave
            if hasattr(self._weave_module, "log"):
                self._weave_module.log({f"op/{op_name}": cleaned_payload})
            elif hasattr(self._weave_module, "publish"):
                self._weave_module.publish(cleaned_payload, name=op_name)
        except Exception as err:
            logger.debug(f"Telemetry logging error in trace_operation '{op_name}': {err}")

    def record_metric(self, metric_name: str, value: Any, metadata: Optional[Dict[str, Any]] = None) -> None:
        """Records an experimental metric safely."""
        if not self._active or self._weave_module is None:
            return

        try:
            data: Dict[str, Any] = {"value": value}
            if metadata:
                data.update(self._sanitize_payload(metadata))
            if hasattr(self._weave_module, "log"):
                self._weave_module.log({f"metric/{metric_name}": data})
        except Exception as err:
            logger.debug(f"Telemetry logging error in record_metric '{metric_name}': {err}")

    def record_experiment_run(self, run_metadata: Dict[str, Any], metrics: Dict[str, Any]) -> None:
        """Logs aggregate experiment run results to Weave."""
        if not self._active or self._weave_module is None:
            return

        try:
            event_data = {
                "run_metadata": self._sanitize_payload(run_metadata),
                "metrics": self._sanitize_payload(metrics),
            }
            if hasattr(self._weave_module, "log"):
                self._weave_module.log(event_data)
        except Exception as err:
            logger.debug(f"Telemetry logging error in record_experiment_run: {err}")

    def flush(self) -> None:
        """Flushes pending telemetry events safely."""
        if not self._active or self._weave_module is None:
            return

        try:
            if hasattr(self._weave_module, "finish"):
                self._weave_module.finish()
            elif hasattr(self._weave_module, "flush"):
                self._weave_module.flush()
        except Exception as err:
            logger.debug(f"Telemetry flush error: {err}")

    @staticmethod
    def _sanitize_payload(payload: Dict[str, Any]) -> Dict[str, Any]:
        """Strips out secrets, tokens, and non-serializable objects before telemetry transmission."""
        sanitized: Dict[str, Any] = {}
        for k, v in payload.items():
            key_lower = str(k).lower()
            if any(secret_term in key_lower for secret_term in ("key", "secret", "token", "password", "auth")):
                continue
            if isinstance(v, (str, int, float, bool, type(None))):
                sanitized[k] = v
            elif isinstance(v, (list, tuple)):
                sanitized[k] = [str(item) if not isinstance(item, (str, int, float, bool, type(None))) else item for item in v]
            elif isinstance(v, dict):
                sanitized[k] = ObservabilityAdapter._sanitize_payload(v)
            else:
                sanitized[k] = str(v)
        return sanitized


# Global default adapter instance
default_observability_adapter = ObservabilityAdapter()
