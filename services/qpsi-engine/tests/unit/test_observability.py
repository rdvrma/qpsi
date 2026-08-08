import os
from unittest.mock import patch, MagicMock
from qpsi_engine.infrastructure.observability import ObservabilityAdapter


def test_observability_disabled_by_default():
    adapter = ObservabilityAdapter()
    with patch.dict(os.environ, {"QPSI_WEAVE_ENABLED": "false"}, clear=False):
        result = adapter.initialize()
        assert result is False
        assert adapter.is_active is False


def test_observability_initialization_failure_resilience():
    adapter = ObservabilityAdapter()
    with patch.dict(os.environ, {"QPSI_WEAVE_ENABLED": "true", "WANDB_API_KEY": "invalid_key"}, clear=False):
        with patch("builtins.__import__") as mock_import:
            mock_weave = MagicMock()
            mock_weave.init.side_effect = RuntimeError("W&B API connection failed")
            mock_import.return_value = mock_weave

            result = adapter.initialize()
            assert result is False
            assert adapter.is_active is False


def test_trace_operation_safely_ignored_when_disabled():
    adapter = ObservabilityAdapter()
    assert adapter.is_active is False
    # Calling trace operations on a disabled adapter must never throw exceptions
    adapter.trace_operation("test_op", {"key": "value"})
    adapter.record_metric("test_metric", 42)
    adapter.record_experiment_run({"run": 1}, {"score": 0.95})
    adapter.flush()


def test_sanitization_removes_secrets():
    payload = {
        "world_id": "world-001",
        "wandb_api_key": "secret_abc123",
        "user_token": "token_xyz789",
        "secret_password": "super_secret",
        "sequence_number": 5,
        "valid": True,
    }
    sanitized = ObservabilityAdapter._sanitize_payload(payload)
    assert "world_id" in sanitized
    assert "sequence_number" in sanitized
    assert "valid" in sanitized
    assert "wandb_api_key" not in sanitized
    assert "user_token" not in sanitized
    assert "secret_password" not in sanitized


def test_mocked_weave_logging():
    adapter = ObservabilityAdapter()
    mock_weave = MagicMock()

    with patch.dict(os.environ, {"QPSI_WEAVE_ENABLED": "true"}, clear=False):
        with patch("qpsi_engine.infrastructure.observability.ObservabilityAdapter.initialize"):
            adapter._weave_module = mock_weave
            adapter._active = True

            adapter.trace_operation("state_transition", {"world_id": "w1", "valid": True})
            mock_weave.log.assert_called_once()
            call_args = mock_weave.log.call_args[0][0]
            assert "op/state_transition" in call_args
            assert call_args["op/state_transition"]["world_id"] == "w1"
