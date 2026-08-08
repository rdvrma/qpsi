import time
import uuid
import logging
import subprocess
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Tuple
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from qpsi_engine.infrastructure.database import Base
from qpsi_engine.infrastructure.observability import ObservabilityAdapter
from qpsi_engine.domain.command import Command
from qpsi_engine.application.world_service import WorldService

logger = logging.getLogger("qpsi.experiments.classical_baseline")


def get_git_metadata() -> Dict[str, Any]:
    """Retrieves current git commit SHA and working tree status safely."""
    try:
        sha = subprocess.check_output(
            ["git", "rev-parse", "HEAD"], stderr=subprocess.DEVNULL
        ).decode("utf-8").strip()
        status_out = subprocess.check_output(
            ["git", "status", "--porcelain"], stderr=subprocess.DEVNULL
        ).decode("utf-8").strip()
        dirty = len(status_out) > 0
        return {"git_commit_sha": sha, "git_dirty": dirty}
    except Exception:
        return {"git_commit_sha": "unknown", "git_dirty": True}


def run_classical_baseline(
    db_url: str = "sqlite:///:memory:",
    project_name: str = "q-psi/qpsi-classical-baseline",
    enable_telemetry: Optional[bool] = None,
) -> Dict[str, Any]:
    """Runs the deterministic classical baseline benchmark evaluating persistence, replay,

    state transitions, intentional contradiction rejection, and restart recovery.
    """
    t_run_start = time.perf_counter()
    timestamp_iso = datetime.now(timezone.utc).isoformat()
    run_id = f"run-{uuid.uuid4().hex[:8]}"

    # Retrieve Git metadata
    git_meta = get_git_metadata()

    # Setup temporary/in-memory DB
    engine = create_engine(
        db_url,
        connect_args={"check_same_thread": False} if "sqlite" in db_url else {},
    )
    Base.metadata.create_all(bind=engine)
    session_factory = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = session_factory()

    # Setup telemetry adapter
    obs = ObservabilityAdapter()
    if enable_telemetry is True:
        import os
        os.environ["QPSI_WEAVE_ENABLED"] = "true"

    obs.initialize(project_override=project_name)

    world_service = WorldService(db=db, observability=obs)
    world_id = "world-baseline-001"

    # Step 1: Seed initial world
    world_state = world_service.seed_world(world_id=world_id)
    initial_digest = world_state.calculate_digest()

    # Step 2: Define deterministic workload with explicit expected validity outcomes
    # Fixed command IDs ensure deterministic payload parameters across benchmark runs
    workload: List[Tuple[Command, bool]] = [
        # Valid Transitions (Expected: ACCEPT)
        (Command(command_id="cmd-baseline-001", world_id=world_id, actor_id="elena", command_type="leave_room", source_location="main_room", destination_location="hallway"), True),
        (Command(command_id="cmd-baseline-002", world_id=world_id, actor_id="marcus", command_type="move_object", target_id="book", source_location="shelf", destination_location="table"), True),
        (Command(command_id="cmd-baseline-003", world_id=world_id, actor_id="marcus", command_type="pick_up_object", target_id="key", source_location="desk"), True),
        (Command(command_id="cmd-baseline-004", world_id=world_id, actor_id="elena", command_type="enter_room", source_location="hallway", destination_location="main_room"), True),
        (Command(command_id="cmd-baseline-005", world_id=world_id, actor_id="marcus", command_type="put_down_object", target_id="key", destination_location="table"), True),
        (Command(command_id="cmd-baseline-006", world_id=world_id, actor_id="elena", command_type="pick_up_object", target_id="glass", source_location="table"), True),
        # Intentionally Invalid / Contradictory Transitions (Expected: REJECT)
        (Command(command_id="cmd-baseline-007", world_id=world_id, actor_id="marcus", command_type="pick_up_object", target_id="nonexistent_object"), False),
        (Command(command_id="cmd-baseline-008", world_id=world_id, actor_id="unknown_actor", command_type="leave_room", source_location="main_room", destination_location="hallway"), False),
        (Command(command_id="cmd-baseline-009", world_id=world_id, actor_id="marcus", command_type="leave_room", source_location="main_room", destination_location="unconnected_room"), False),
        (Command(command_id="cmd-baseline-010", world_id=world_id, actor_id="elena", command_type="put_down_object", target_id="key"), False),
    ]

    latencies: List[float] = []
    expected_accept_count = sum(1 for _, expected in workload if expected)
    expected_reject_count = sum(1 for _, expected in workload if not expected)

    actual_accept_count = 0
    actual_reject_count = 0
    unexpected_accept_count = 0
    unexpected_reject_count = 0
    match_count = 0

    for cmd, expected_valid in workload:
        t_cmd_start = time.perf_counter()
        val_res, _ = world_service.execute_command(cmd)
        cmd_ms = (time.perf_counter() - t_cmd_start) * 1000.0
        latencies.append(cmd_ms)

        actual_valid = val_res.valid
        if actual_valid:
            actual_accept_count += 1
        else:
            actual_reject_count += 1

        if actual_valid == expected_valid:
            match_count += 1
        elif actual_valid and not expected_valid:
            unexpected_accept_count += 1
        elif not actual_valid and expected_valid:
            unexpected_reject_count += 1

    total_cases = len(workload)
    expected_outcome_match_rate = (match_count / total_cases) if total_cases > 0 else 0.0

    # Step 3: Replay state from event ledger
    replayed_state, replay_matches, active_digest = world_service.replay_world(world_id)

    # Step 4: Verify ledger hash chain integrity
    integrity_valid, integrity_errors = world_service.verify_integrity(world_id)

    # Step 5: Restart recovery simulation (close DB session, re-instantiate service)
    db.close()
    db_restart = session_factory()
    recovery_service = WorldService(db=db_restart, observability=obs)
    recovered_world = recovery_service.get_world(world_id)
    post_restart_digest = recovered_world.calculate_digest() if recovered_world else ""
    restart_recovery_success = (post_restart_digest == active_digest) and (recovered_world is not None)
    db_restart.close()

    total_runtime_ms = (time.perf_counter() - t_run_start) * 1000.0
    mean_latency = (sum(latencies) / len(latencies)) if latencies else 0.0
    sorted_latencies = sorted(latencies)
    p95_idx = int(0.95 * len(sorted_latencies))
    p95_latency = sorted_latencies[min(p95_idx, len(sorted_latencies) - 1)] if sorted_latencies else 0.0

    metrics: Dict[str, Any] = {
        "experiment_schema_version": "1.0.0",
        "run_id": run_id,
        "timestamp": timestamp_iso,
        "scenario_id": "classical-baseline-v1",
        "scenario_version": "1.0.0",
        "engine_version": "0.2.0",
        "git_commit_sha": git_meta["git_commit_sha"],
        "git_dirty": git_meta["git_dirty"],
        "total_transition_cases": total_cases,
        "expected_accept_count": expected_accept_count,
        "expected_reject_count": expected_reject_count,
        "actual_accept_count": actual_accept_count,
        "actual_reject_count": actual_reject_count,
        "unexpected_accept_count": unexpected_accept_count,
        "unexpected_reject_count": unexpected_reject_count,
        "expected_outcome_match_count": match_count,
        "expected_outcome_match_rate": expected_outcome_match_rate,
        "scenario_validation_accuracy": expected_outcome_match_rate,
        "replay_success": replay_matches,
        "restart_recovery_success": restart_recovery_success,
        "integrity_success": integrity_valid and (len(integrity_errors) == 0),
        "digest_match": replay_matches and restart_recovery_success,
        "total_runtime_ms": total_runtime_ms,
        "mean_transition_latency_ms": mean_latency,
        "p95_transition_latency_ms": p95_latency,
        "final_sequence_number": replayed_state.sequence_number,
        "final_state_digest": active_digest,
    }

    run_metadata = {
        "run_id": run_id,
        "scenario_id": "classical-baseline-v1",
        "git_commit_sha": git_meta["git_commit_sha"],
        "git_dirty": git_meta["git_dirty"],
        "initial_digest": initial_digest,
        "final_digest": active_digest,
        "telemetry_enabled": obs.is_active,
        "project": obs.project,
    }

    # Record aggregate experiment run to Weave
    if obs.is_active:
        obs.record_experiment_run(run_metadata, metrics)
        obs.flush()

    return metrics


def main() -> None:
    print("=" * 65)
    print(" Q-PSI CLASSICAL BASELINE EXPERIMENT BENCHMARK RUNNER")
    print("=" * 65)
    metrics = run_classical_baseline()

    print("\n--- REPRODUCIBILITY & EVIDENCE METRICS ---")
    print(f"Run ID                       : {metrics['run_id']}")
    print(f"Engine Version               : {metrics['engine_version']}")
    print(f"Scenario ID / Version        : {metrics['scenario_id']} (v{metrics['scenario_version']})")
    print(f"Git Commit SHA               : {metrics['git_commit_sha'][:10]}... (dirty={metrics['git_dirty']})")
    print(f"Total Transitions Evaluated  : {metrics['total_transition_cases']}")
    print(f"Expected Accept / Reject     : {metrics['expected_accept_count']} / {metrics['expected_reject_count']}")
    print(f"Actual Accept / Reject       : {metrics['actual_accept_count']} / {metrics['actual_reject_count']}")
    print(f"Unexpected Accept / Reject   : {metrics['unexpected_accept_count']} / {metrics['unexpected_reject_count']}")
    print(f"Expected Outcome Match Rate  : {metrics['expected_outcome_match_rate'] * 100:.1f}% ({metrics['expected_outcome_match_count']}/{metrics['total_transition_cases']})")
    print(f"Scenario Validation Accuracy : {metrics['scenario_validation_accuracy'] * 100:.1f}%")
    print(f"Replay Ledger Integrity      : {'PASS' if metrics['replay_success'] else 'FAIL'}")
    print(f"Restart Recovery Success     : {'PASS' if metrics['restart_recovery_success'] else 'FAIL'}")
    print(f"Ledger Hash-Chain Integrity  : {'PASS' if metrics['integrity_success'] else 'FAIL'}")
    print(f"State Digest Match           : {'MATCHED' if metrics['digest_match'] else 'MISMATCH'}")
    print(f"Total Runtime                : {metrics['total_runtime_ms']:.2f} ms (env dependent)")
    print(f"Mean Transition Latency      : {metrics['mean_transition_latency_ms']:.3f} ms (env dependent)")
    print(f"P95 Transition Latency       : {metrics['p95_transition_latency_ms']:.3f} ms (env dependent)")
    print(f"Final State Digest           : {metrics['final_state_digest']}")
    print("=" * 65)


if __name__ == "__main__":
    main()
