import json
import csv
import hashlib
import time
import subprocess
from pathlib import Path
from typing import List, Dict, Any
from dataclasses import asdict
from qpsi_transition_search.domain.result import ScenarioResult, MetricSummary
from qpsi_transition_search.cudaq_backend.environment import CudaQEnvironment

class BenchmarkExporter:
    """Exports benchmark result artifacts, CSVs, JSONs, and generates SHA-256 MANIFEST.json."""

    def __init__(self, output_dir: Path):
        self.output_dir = output_dir
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def export_all(
        self,
        scenario_results: List[ScenarioResult],
        metrics: MetricSummary,
        raw_scenarios: List[Dict[str, Any]],
        qaoa_params: Dict[str, Any],
    ) -> Dict[str, Any]:
        env_info = CudaQEnvironment.get_info()

        # 1. environment.json
        env_path = self.output_dir / "environment.json"
        with open(env_path, "w", encoding="utf-8") as f:
            json.dump(env_info, f, indent=2)

        # 2. scenarios.json
        scen_path = self.output_dir / "scenarios.json"
        with open(scen_path, "w", encoding="utf-8") as f:
            json.dump(raw_scenarios, f, indent=2)

        # 3. benchmark-results.json
        res_json_path = self.output_dir / "benchmark-results.json"
        results_data = [asdict(r) for r in scenario_results]
        with open(res_json_path, "w", encoding="utf-8") as f:
            json.dump(results_data, f, indent=2)

        # 4. benchmark-results.csv
        res_csv_path = self.output_dir / "benchmark-results.csv"
        if results_data:
            fieldnames = list(results_data[0].keys())
            with open(res_csv_path, "w", newline="", encoding="utf-8") as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(results_data)

        # 5. aggregate-metrics.json
        metrics_path = self.output_dir / "aggregate-metrics.json"
        with open(metrics_path, "w", encoding="utf-8") as f:
            json.dump(asdict(metrics), f, indent=2)

        # 6. qaoa-parameters.json
        params_path = self.output_dir / "qaoa-parameters.json"
        with open(params_path, "w", encoding="utf-8") as f:
            json.dump(qaoa_params, f, indent=2)

        # 7. MANIFEST.json with SHA-256 checksums
        git_sha = self._get_git_commit_sha()
        timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

        manifest_entries: List[Dict[str, Any]] = []
        files_to_hash = [
            env_path,
            scen_path,
            res_json_path,
            res_csv_path,
            metrics_path,
            params_path,
        ]

        for filepath in files_to_hash:
            if filepath.exists():
                sha256 = self._compute_sha256(filepath)
                manifest_entries.append(
                    {
                        "filename": filepath.name,
                        "checksum_sha256": sha256,
                        "generating_command": "python -m qpsi_transition_search.cli --run-benchmarks",
                        "timestamp": timestamp,
                        "git_commit_sha": git_sha,
                        "cudaq_version": env_info["cudaq_version"],
                        "environment_id": env_info["selected_target"],
                    }
                )

        manifest_path = self.output_dir / "MANIFEST.json"
        with open(manifest_path, "w", encoding="utf-8") as f:
            json.dump({"manifest": manifest_entries}, f, indent=2)

        return {
            "output_directory": str(self.output_dir),
            "manifest_file": str(manifest_path),
            "total_artifacts_exported": len(manifest_entries) + 1,
        }

    def _compute_sha256(self, filepath: Path) -> str:
        h = hashlib.sha256()
        with open(filepath, "rb") as f:
            while chunk := f.read(8192):
                h.update(chunk)
        return h.hexdigest()

    def _get_git_commit_sha(self) -> str:
        try:
            res = subprocess.run(
                ["git", "rev-parse", "HEAD"],
                capture_output=True,
                text=True,
                check=True,
            )
            return res.stdout.strip()
        except Exception:
            return "unknown"
