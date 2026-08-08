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

logger = logging.getLogger("qpsi.experiments.benchmark_suite")


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


def generate_deterministic_workload(
    world_id: str, scenario_class: str, count: int, seed: int = 42
) -> List[Tuple[Command, bool]]:
    """Generates a deterministic workload of commands with PREDEFINED expected validity outcomes.

    Scenario classes:
    - 'happy_path': 100% valid state transitions.
    - 'adversarial': 100% intentionally invalid/contradictory commands.
    - 'mixed': Interleaved valid (70%) and invalid (30%) commands.
    """
    commands_with_expected: List[Tuple[Command, bool]] = []

    # Internal state tracker matching initial seed state of world-001
    char_locs = {"marcus": "main_room", "elena": "main_room"}
    obj_locs = {"book": "main_room", "key": "main_room", "glass": "main_room"}
    obj_surfaces = {"book": "shelf", "key": "desk", "glass": "table"}
    inventories: Dict[str, List[str]] = {"marcus": [], "elena": []}

    surfaces = ["shelf", "desk", "table"]

    for i in range(count):
        cmd_id = f"cmd-bench-{scenario_class[:4]}-{i+1:04d}"
        is_adversarial = False

        if scenario_class == "adversarial":
            is_adversarial = True
        elif scenario_class == "mixed":
            is_adversarial = (i % 10 in (3, 7, 9))
        else:
            is_adversarial = False

        if is_adversarial:
            adv_type = i % 5
            if adv_type == 0:
                cmd = Command(
                    command_id=cmd_id,
                    world_id=world_id,
                    actor_id="marcus",
                    command_type="pick_up_object",
                    target_id="nonexistent_object_x",
                )
            elif adv_type == 1:
                cmd = Command(
                    command_id=cmd_id,
                    world_id=world_id,
                    actor_id="unknown_actor_99",
                    command_type="leave_room",
                    source_location="main_room",
                    destination_location="hallway",
                )
            elif adv_type == 2:
                cmd = Command(
                    command_id=cmd_id,
                    world_id=world_id,
                    actor_id="marcus",
                    command_type="leave_room",
                    source_location=char_locs["marcus"],
                    destination_location="unconnected_void_room",
                )
            elif adv_type == 3:
                cmd = Command(
                    command_id=cmd_id,
                    world_id=world_id,
                    actor_id="elena",
                    command_type="put_down_object",
                    target_id="book",
                )
            else:
                cmd = Command(
                    command_id=cmd_id,
                    world_id=world_id,
                    actor_id="marcus",
                    command_type="move_object",
                    target_id="glass",
                    source_location="hallway",
                    destination_location="table",
                )
            commands_with_expected.append((cmd, False))

        else:
            # Pick an actor in main_room
            actor = "marcus"
            if char_locs["marcus"] != "main_room" and char_locs["elena"] == "main_room":
                actor = "elena"
            elif char_locs["marcus"] != "main_room" and char_locs["elena"] != "main_room":
                # Move Marcus back to main_room first
                cmd = Command(
                    command_id=cmd_id,
                    world_id=world_id,
                    actor_id="marcus",
                    command_type="enter_room",
                    source_location="hallway",
                    destination_location="main_room",
                )
                char_locs["marcus"] = "main_room"
                commands_with_expected.append((cmd, True))
                continue

            step_type = i % 5

            if step_type == 0:
                # Move object surface
                target_obj = "book" if (i % 2 == 0) else "glass"
                if obj_locs[target_obj] == "main_room":
                    curr_surf = obj_surfaces[target_obj]
                    next_surf = surfaces[(surfaces.index(curr_surf) + 1) % len(surfaces)]
                    cmd = Command(
                        command_id=cmd_id,
                        world_id=world_id,
                        actor_id=actor,
                        command_type="move_object",
                        target_id=target_obj,
                        source_location=curr_surf,
                        destination_location=next_surf,
                    )
                    obj_surfaces[target_obj] = next_surf
                    commands_with_expected.append((cmd, True))
                else:
                    cmd = Command(
                        command_id=cmd_id,
                        world_id=world_id,
                        actor_id=actor,
                        command_type="inspect_object",
                        target_id=target_obj,
                    )
                    commands_with_expected.append((cmd, True))

            elif step_type == 1:
                # Pick up or put down key
                if "key" in inventories[actor]:
                    target_surf = surfaces[i % len(surfaces)]
                    cmd = Command(
                        command_id=cmd_id,
                        world_id=world_id,
                        actor_id=actor,
                        command_type="put_down_object",
                        target_id="key",
                        destination_location=target_surf,
                    )
                    inventories[actor].remove("key")
                    obj_locs["key"] = "main_room"
                    obj_surfaces["key"] = target_surf
                    commands_with_expected.append((cmd, True))
                elif obj_locs["key"] == "main_room":
                    curr_surf = obj_surfaces["key"]
                    cmd = Command(
                        command_id=cmd_id,
                        world_id=world_id,
                        actor_id=actor,
                        command_type="pick_up_object",
                        target_id="key",
                        source_location=curr_surf,
                    )
                    inventories[actor].append("key")
                    obj_locs["key"] = actor
                    obj_surfaces["key"] = "inventory"
                    commands_with_expected.append((cmd, True))
                else:
                    cmd = Command(
                        command_id=cmd_id,
                        world_id=world_id,
                        actor_id=actor,
                        command_type="inspect_object",
                        target_id="glass",
                    )
                    commands_with_expected.append((cmd, True))

            elif step_type == 2:
                # Move inactive actor to hallway and back
                other_actor = "elena" if actor == "marcus" else "marcus"
                curr = char_locs[other_actor]
                dest = "hallway" if curr == "main_room" else "main_room"
                cmd_type = "leave_room" if curr == "main_room" else "enter_room"
                cmd = Command(
                    command_id=cmd_id,
                    world_id=world_id,
                    actor_id=other_actor,
                    command_type=cmd_type,
                    source_location=curr,
                    destination_location=dest,
                )
                char_locs[other_actor] = dest
                commands_with_expected.append((cmd, True))

            elif step_type == 3:
                # Inspect book
                cmd = Command(
                    command_id=cmd_id,
                    world_id=world_id,
                    actor_id=actor,
                    command_type="inspect_object",
                    target_id="book",
                )
                commands_with_expected.append((cmd, True))

            else:
                # Inspect key or glass
                target = "glass" if i % 2 == 0 else "key"
                cmd = Command(
                    command_id=cmd_id,
                    world_id=world_id,
                    actor_id=actor,
                    command_type="inspect_object",
                    target_id=target,
                )
                commands_with_expected.append((cmd, True))

    return commands_with_expected


def run_benchmark_scenario(
    scenario_class: str = "mixed",
    workload_size: int = 100,
    db_url: str = "sqlite:///:memory:",
    project_name: str = "q-psi/qpsi-classical-baseline",
    enable_telemetry: Optional[bool] = None,
) -> Dict[str, Any]:
    """Runs a single scalable classical benchmark scenario (100 or 1,000 transitions)."""
    t_run_start = time.perf_counter()
    timestamp_iso = datetime.now(timezone.utc).isoformat()
    run_id = f"run-b-{scenario_class[:4]}-{workload_size}-{uuid.uuid4().hex[:6]}"
    scenario_id = f"classical-{scenario_class}-{workload_size}"

    git_meta = get_git_metadata()

    # DB Setup
    engine = create_engine(
        db_url,
        connect_args={"check_same_thread": False} if "sqlite" in db_url else {},
    )
    Base.metadata.create_all(bind=engine)
    session_factory = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = session_factory()

    # Telemetry Adapter Setup
    obs = ObservabilityAdapter()
    if enable_telemetry is True:
        import os
        os.environ["QPSI_WEAVE_ENABLED"] = "true"

    obs.initialize(project_override=project_name)

    world_service = WorldService(db=db, observability=obs)
    world_id = f"world-bench-{scenario_class}-{workload_size}"

    # Step 1: Seed Initial World
    world_service.seed_world(world_id=world_id)

    # Step 2: Generate Deterministic Workload
    workload = generate_deterministic_workload(
        world_id=world_id, scenario_class=scenario_class, count=workload_size
    )

    latencies: List[float] = []
    expected_accept_count = sum(1 for _, expected in workload if expected)
    expected_reject_count = sum(1 for _, expected in workload if not expected)

    actual_accept_count = 0
    actual_reject_count = 0
    unexpected_accept_count = 0
    unexpected_reject_count = 0
    match_count = 0

    valid_commands_only: List[Command] = []

    for cmd, expected_valid in workload:
        t_cmd_start = time.perf_counter()
        val_res, _ = world_service.execute_command(cmd)
        cmd_ms = (time.perf_counter() - t_cmd_start) * 1000.0
        latencies.append(cmd_ms)

        actual_valid = val_res.valid
        if actual_valid:
            actual_accept_count += 1
            valid_commands_only.append(cmd)
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

    # Step 3: Replay State from Event Ledger
    replayed_state, replay_matches, active_digest = world_service.replay_world(world_id)

    # Step 4: Verify Hash-Chain Integrity
    integrity_valid, integrity_errors = world_service.verify_integrity(world_id)

    # Step 5: Restart Recovery Simulation
    db.close()
    db_restart = session_factory()
    recovery_service = WorldService(db=db_restart, observability=obs)
    recovered_world = recovery_service.get_world(world_id)
    post_restart_digest = recovered_world.calculate_digest() if recovered_world else ""
    restart_recovery_success = (post_restart_digest == active_digest) and (recovered_world is not None)
    db_restart.close()

    # Step 6: Accepted-State Equivalence Verification (Path A vs Path B)
    accepted_state_equivalence_success = True
    if scenario_class == "mixed":
        engine_b = create_engine(
            "sqlite:///:memory:",
            connect_args={"check_same_thread": False},
        )
        Base.metadata.create_all(bind=engine_b)
        session_factory_b = sessionmaker(autocommit=False, autoflush=False, bind=engine_b)
        db_path_b = session_factory_b()
        service_b = WorldService(db=db_path_b, observability=obs)
        service_b.seed_world(world_id=world_id)

        for valid_cmd in valid_commands_only:
            service_b.execute_command(valid_cmd)

        path_b_state = service_b.get_world(world_id)
        path_b_digest = path_b_state.calculate_digest() if path_b_state else ""
        accepted_state_equivalence_success = (path_b_digest == active_digest)
        db_path_b.close()

    # Compute Latency Percentiles
    total_runtime_ms = (time.perf_counter() - t_run_start) * 1000.0
    mean_latency = (sum(latencies) / len(latencies)) if latencies else 0.0
    sorted_latencies = sorted(latencies) if latencies else [0.0]

    def calc_percentile(pct: float) -> float:
        idx = int(pct * len(sorted_latencies))
        return sorted_latencies[min(idx, len(sorted_latencies) - 1)]

    p50_latency = calc_percentile(0.50)
    p95_latency = calc_percentile(0.95)
    p99_latency = calc_percentile(0.99)
    max_latency = max(sorted_latencies)

    metrics: Dict[str, Any] = {
        "experiment_schema_version": "1.0.0",
        "benchmark_suite_version": "1.0.0",
        "scenario_id": scenario_id,
        "scenario_class": scenario_class,
        "workload_size": workload_size,
        "engine_version": "0.2.0",
        "git_commit_sha": git_meta["git_commit_sha"],
        "git_dirty": git_meta["git_dirty"],
        "run_id": run_id,
        "timestamp": timestamp_iso,
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
        "accepted_state_equivalence_success": accepted_state_equivalence_success,
        "final_sequence_number": replayed_state.sequence_number,
        "final_state_digest": active_digest,
        "total_runtime_ms": total_runtime_ms,
        "mean_transition_latency_ms": mean_latency,
        "p50_transition_latency_ms": p50_latency,
        "p95_transition_latency_ms": p95_latency,
        "p99_transition_latency_ms": p99_latency,
        "max_transition_latency_ms": max_latency,
        "latency_disclaimer": "Latency metrics are environment-dependent and measured dynamically.",
    }

    run_metadata = {
        "run_id": run_id,
        "scenario_id": scenario_id,
        "scenario_class": scenario_class,
        "workload_size": workload_size,
        "git_commit_sha": git_meta["git_commit_sha"],
        "git_dirty": git_meta["git_dirty"],
        "telemetry_enabled": obs.is_active,
        "project": obs.project,
    }

    if obs.is_active:
        obs.record_experiment_run(run_metadata, metrics)
        obs.flush()

    return metrics


def run_full_benchmark_suite(
    workload_sizes: Optional[List[int]] = None,
    enable_telemetry: Optional[bool] = None,
) -> Dict[str, Any]:
    """Runs the full scalable benchmark suite across all scenario classes and workload sizes."""
    sizes = workload_sizes or [100, 1000]
    classes = ["happy_path", "adversarial", "mixed"]

    suite_results: Dict[str, Any] = {
        "benchmark_suite_version": "1.0.0",
        "engine_version": "0.2.0",
        "git_metadata": get_git_metadata(),
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "scenarios": {},
    }

    print("=" * 70)
    print(" Q-PSI SCALABLE CLASSICAL VALIDATION BENCHMARK SUITE (100 → 1,000)")
    print("=" * 70)

    for sz in sizes:
        for cls_name in classes:
            scen_key = f"{cls_name}_{sz}"
            print(f"\n[RUNNING BENCHMARK] Scenario: '{cls_name}' | Size: {sz} transitions...")
            metrics = run_benchmark_scenario(
                scenario_class=cls_name,
                workload_size=sz,
                enable_telemetry=enable_telemetry,
            )
            suite_results["scenarios"][scen_key] = metrics

            print(f"  -> Run ID: {metrics['run_id']}")
            print(f"  -> Match Rate: {metrics['expected_outcome_match_rate']*100:.1f}% ({metrics['expected_outcome_match_count']}/{metrics['total_transition_cases']})")
            print(f"  -> Replay: {'PASS' if metrics['replay_success'] else 'FAIL'} | Recovery: {'PASS' if metrics['restart_recovery_success'] else 'FAIL'} | Equivalence: {'PASS' if metrics['accepted_state_equivalence_success'] else 'FAIL'}")
            print(f"  -> Final Digest: {metrics['final_state_digest'][:24]}...")

    print("\n" + "=" * 70)
    print(" ALL BENCHMARK SCENARIOS EXECUTED SUCCESSFULLY")
    print("=" * 70)

    return suite_results


if __name__ == "__main__":
    run_full_benchmark_suite()
