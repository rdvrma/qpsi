'use client';

import React, { useState } from 'react';
import { ResearchCapsuleWorkloadV1 } from '@/lib/capsule/types';
import { Play, Upload, Code2, AlertTriangle, FileCode, CheckCircle2, Loader2, Info } from 'lucide-react';

interface WorkloadSubmitterProps {
  onSubmit: (workload: ResearchCapsuleWorkloadV1) => Promise<void>;
  loading: boolean;
}

const PRESET_WORKLOADS: Record<string, { label: string; data: ResearchCapsuleWorkloadV1 }> = {
  candidate_search_n4: {
    label: 'Preset: N=4 Candidate-State Search (Pokharel-Lidar / Grover Model)',
    data: {
      workload_name: 'benchmark_candidate_search_n4_eval',
      problem_type: 'state_space_search',
      input_format: 'json',
      compiler_options: {
        max_candidates: 16,
        target_qubits: 4,
        optimization_level: 'O2',
        candidate_hash_algorithm: 'sha256',
        preserve_intermediates: false,
        reduction_target: 'canonical_subspace',
      },
      payload: {
        universe_dimension: 4,
        candidate_space: [
          { candidate_id: 'state_000', bitstring: '0000', score: 0.94, marked: false },
          { candidate_id: 'state_001', bitstring: '0001', score: 0.82, marked: false },
          { candidate_id: 'state_010', bitstring: '0010', score: 0.99, marked: true },
          { candidate_id: 'state_011', bitstring: '0011', score: 0.76, marked: false },
        ],
        oracle_verification_rule: 'parity_balanced_hash',
      },
    },
  },
  qubo_ising_graph: {
    label: 'Preset: QUBO / Ising Graph Partitioning Space',
    data: {
      workload_name: 'qubo_graph_partition_4node',
      problem_type: 'qubo_ising',
      input_format: 'matrix',
      compiler_options: {
        max_candidates: 64,
        target_qubits: 4,
        optimization_level: 'O3',
        candidate_hash_algorithm: 'sha256',
      },
      payload: {
        nodes_count: 4,
        coupling_matrix: [
          [2.0, -1.5, 0.0, 0.5],
          [-1.5, 2.0, -1.0, 0.0],
          [0.0, -1.0, 2.0, -1.5],
          [0.5, 0.0, -1.5, 2.0],
        ],
        linear_bias: [-0.5, 0.0, 0.5, -0.2],
        penalty_multiplier: 10.0,
      },
    },
  },
  software_repair_universe: {
    label: 'Preset: Software-Repair Discrete AST Patch Universe',
    data: {
      workload_name: 'ast_mutation_universe_eval',
      problem_type: 'candidate_space',
      input_format: 'ast',
      compiler_options: {
        max_candidates: 32,
        target_qubits: 5,
        optimization_level: 'O2',
        candidate_hash_algorithm: 'sha256',
      },
      payload: {
        target_function: 'verify_state_invariant',
        syntax_tree_depth: 3,
        mutation_operators: ['branch_swap', 'inequality_inversion', 'null_check_injection'],
        symbolic_constraints: [
          'x >= 0',
          'pointer_not_null(ctx)',
          'checksum(buffer) == expected_digest',
        ],
      },
    },
  },
};

export function WorkloadSubmitter({ onSubmit, loading }: WorkloadSubmitterProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>('candidate_search_n4');
  const [workloadName, setWorkloadName] = useState<string>(
    PRESET_WORKLOADS.candidate_search_n4.data.workload_name
  );
  const [problemType, setProblemType] = useState<ResearchCapsuleWorkloadV1['problem_type']>(
    PRESET_WORKLOADS.candidate_search_n4.data.problem_type
  );
  const [jsonText, setJsonText] = useState<string>(
    JSON.stringify(PRESET_WORKLOADS.candidate_search_n4.data.payload, null, 2)
  );
  const [optLevel, setOptLevel] = useState<'O0' | 'O1' | 'O2' | 'O3'>('O2');
  const [maxCandidates, setMaxCandidates] = useState<number>(16);
  const [parseError, setParseError] = useState<string | null>(null);

  const handlePresetChange = (presetKey: string) => {
    setSelectedPreset(presetKey);
    const preset = PRESET_WORKLOADS[presetKey];
    if (preset) {
      setWorkloadName(preset.data.workload_name);
      setProblemType(preset.data.problem_type);
      setJsonText(JSON.stringify(preset.data.payload, null, 2));
      setOptLevel(preset.data.compiler_options?.optimization_level || 'O2');
      setMaxCandidates(preset.data.compiler_options?.max_candidates || 16);
      setParseError(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setParseError('File exceeds 2 MB client upload limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed.workload_name) setWorkloadName(parsed.workload_name);
        if (parsed.problem_type) setProblemType(parsed.problem_type);
        if (parsed.payload) {
          setJsonText(JSON.stringify(parsed.payload, null, 2));
        } else {
          setJsonText(JSON.stringify(parsed, null, 2));
        }
        setParseError(null);
      } catch {
        setParseError('Uploaded file is not valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setParseError(null);

    let parsedPayload: Record<string, any>;
    try {
      parsedPayload = JSON.parse(jsonText);
    } catch {
      setParseError('Invalid JSON format in payload editor. Please check syntax.');
      return;
    }

    const workload: ResearchCapsuleWorkloadV1 = {
      workload_name: workloadName.trim() || 'qpsi_eval_workload',
      problem_type: problemType,
      input_format: 'json',
      payload: parsedPayload,
      compiler_options: {
        max_candidates: Number(maxCandidates) || 16,
        optimization_level: optLevel,
        candidate_hash_algorithm: 'sha256',
      },
    };

    await onSubmit(workload);
  };

  return (
    <div className="scientific-card p-6 sm:p-8 bg-surface-raised border border-border rounded-lg space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h2 className="text-xl font-serif font-bold text-text-primary">
              Workload Submission
            </h2>
          </div>
          <p className="text-xs font-sans text-text-secondary mt-0.5">
            Submit bounded structured research workload conforming to <code className="font-mono text-text-primary font-bold">ResearchCapsuleWorkloadV1</code>
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center space-x-2">
          <label htmlFor="preset-select" className="text-xs font-mono text-text-muted shrink-0">
            LOAD TEMPLATE:
          </label>
          <select
            id="preset-select"
            value={selectedPreset}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="text-xs font-sans bg-surface border border-border rounded px-2.5 py-1.5 text-text-primary focus:border-accent focus:outline-hidden"
          >
            {Object.entries(PRESET_WORKLOADS).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Limits & Guardrails Notice */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-surface border border-border rounded text-xs font-mono">
        <div>
          <span className="text-text-muted">MAX RUNTIME: </span>
          <strong className="text-text-primary">600 SEC (10 MIN)</strong>
        </div>
        <div>
          <span className="text-text-muted">MAX PAYLOAD SIZE: </span>
          <strong className="text-text-primary">2 MB JSON</strong>
        </div>
        <div>
          <span className="text-text-muted">TARGET BACKEND: </span>
          <strong className="text-accent">STATE-SPACE COMPILER V1</strong>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Workload Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-text-secondary">
              Workload Identifier
            </label>
            <input
              type="text"
              value={workloadName}
              onChange={(e) => setWorkloadName(e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border rounded text-xs font-mono text-text-primary focus:border-accent focus:outline-hidden"
              required
            />
          </div>

          {/* Problem Type */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-text-secondary">
              Problem / Search Type
            </label>
            <select
              value={problemType}
              onChange={(e) =>
                setProblemType(e.target.value as ResearchCapsuleWorkloadV1['problem_type'])
              }
              className="w-full px-3 py-2 bg-surface border border-border rounded text-xs font-sans text-text-primary focus:border-accent focus:outline-hidden"
            >
              <option value="state_space_search">state_space_search (Candidate State Space)</option>
              <option value="qubo_ising">qubo_ising (Ising Coupling Matrix)</option>
              <option value="candidate_space">candidate_space (Discrete AST / Grammar)</option>
              <option value="discrete_optimization">discrete_optimization (Constraint Subspace)</option>
              <option value="graph_coloring">graph_coloring (Combinatorial Search)</option>
              <option value="boolean_sat">boolean_sat (Conjunctive Normal Form)</option>
              <option value="custom_manifest">custom_manifest (Custom Manifest)</option>
            </select>
          </div>

          {/* Optimization Level */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-text-secondary">
              Compiler Optimization
            </label>
            <select
              value={optLevel}
              onChange={(e) => setOptLevel(e.target.value as 'O0' | 'O1' | 'O2' | 'O3')}
              className="w-full px-3 py-2 bg-surface border border-border rounded text-xs font-sans text-text-primary focus:border-accent focus:outline-hidden"
            >
              <option value="O0">O0 (Direct Mapping / Unoptimized)</option>
              <option value="O1">O1 (Redundant Branch Elimination)</option>
              <option value="O2">O2 (Subspace Compression + Grover IR)</option>
              <option value="O3">O3 (Maximal Canonical Reduction)</option>
            </select>
          </div>
        </div>

        {/* JSON Payload Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-text-secondary">
              Workload Payload (JSON)
            </label>
            <div className="flex items-center space-x-3">
              <label className="inline-flex items-center space-x-1.5 text-xs font-mono text-accent hover:underline cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload JSON file</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value);
              if (parseError) setParseError(null);
            }}
            rows={10}
            className="w-full p-3.5 bg-surface border border-border rounded font-mono text-xs text-text-primary focus:border-accent focus:outline-hidden leading-relaxed"
            spellCheck={false}
          />
        </div>

        {parseError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded flex items-start space-x-2 text-xs text-red-800">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>{parseError}</div>
          </div>
        )}

        {/* Action & Disclaimers */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-border">
          <div className="text-[11px] font-sans text-text-muted max-w-lg">
            Execution runs remotely inside the isolated Q-Psi Capsule container. No arbitrary code execution or external network calls are permitted.
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center space-x-2 px-6 py-2.5 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Workload...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Submit to Research Capsule</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
