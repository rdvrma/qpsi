'use client';

import React, { useState } from 'react';
import { CapsuleCompilerResult } from '@/lib/capsule/types';
import { Download, ShieldCheck, Cpu, Hash, FileCode2, Layers, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';

interface ResultViewerProps {
  result: CapsuleCompilerResult;
}

export function ResultViewer({ result }: ResultViewerProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadEvidence = async () => {
    setDownloading(true);
    try {
      const url = `/api/capsule/jobs/${encodeURIComponent(result.job_id)}/evidence`;
      const a = document.createElement('a');
      a.href = url;
      a.download = `qpsi_capsule_evidence_${result.job_id}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      alert('Unable to initiate evidence bundle download.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="scientific-card p-6 sm:p-8 bg-surface-raised border border-border rounded-lg space-y-6 font-sans">
      {/* Header & Evidence CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#16A34A]/10 text-[#15803D] border border-[#16A34A]/25 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>COMPILATION EVALUATION COMPLETED</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-text-primary">
            Compiler Output &amp; Candidate Space
          </h2>
          <p className="text-xs font-mono text-text-secondary mt-1">
            WORKLOAD: <strong className="text-text-primary">{result.workload_name}</strong> &bull; JOB ID: {result.job_id}
          </p>
        </div>

        <button
          onClick={handleDownloadEvidence}
          disabled={downloading}
          className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover transition-colors shadow-xs shrink-0"
        >
          {downloading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>Download SHA256 Evidence Bundle</span>
        </button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        <div className="p-4 bg-surface border border-border rounded space-y-1">
          <div className="text-text-muted text-[10px] uppercase font-bold">CANDIDATE STATES</div>
          <div className="text-2xl font-serif font-bold text-text-primary">
            {result.candidate_state_count}
          </div>
          <div className="text-text-muted text-[11px]">Structured subspace entries</div>
        </div>

        <div className="p-4 bg-surface border border-border rounded space-y-1">
          <div className="text-text-muted text-[10px] uppercase font-bold">EXECUTION RUNTIME</div>
          <div className="text-2xl font-serif font-bold text-text-primary">
            {result.runtime_seconds}s
          </div>
          <div className="text-text-muted text-[11px]">Isolated container compilation</div>
        </div>

        <div className="p-4 bg-surface border border-border rounded space-y-1">
          <div className="text-text-muted text-[10px] uppercase font-bold">COMPILER VERSION</div>
          <div className="text-base font-mono font-bold text-text-primary">
            {result.compiler_version}
          </div>
          <div className="text-text-muted text-[11px] truncate">Commit: {result.compiler_commit || 'master'}</div>
        </div>

        <div className="p-4 bg-surface border border-border rounded space-y-1">
          <div className="text-text-muted text-[10px] uppercase font-bold">EVIDENCE SEAL</div>
          <div className="text-xs font-mono text-[#15803D] font-bold flex items-center space-x-1 mt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SHA256 SEALED</span>
          </div>
          <div className="text-text-muted text-[10px] font-mono truncate">
            {result.evidence_sha256 ? `${result.evidence_sha256.slice(0, 16)}...` : 'VERIFIED'}
          </div>
        </div>
      </div>

      {/* Cryptographic Hashes Table */}
      <div className="p-4 bg-surface border border-border rounded space-y-2.5 text-xs font-mono">
        <div className="flex items-center space-x-2 text-text-primary font-bold uppercase text-[11px]">
          <Hash className="w-3.5 h-3.5 text-accent" />
          <span>PROVENANCE &amp; CRYPTOGRAPHIC REPRODUCIBILITY HASHES</span>
        </div>
        <div className="space-y-1.5 text-text-secondary text-[11px]">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 border-b border-border/50 gap-1">
            <span className="text-text-muted">Input Workload SHA256:</span>
            <code className="text-text-primary font-mono select-all break-all">{result.input_sha256 || 'n/a'}</code>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 border-b border-border/50 gap-1">
            <span className="text-text-muted">Candidate Space SHA256:</span>
            <code className="text-accent font-mono font-bold select-all break-all">{result.candidate_space_hash || 'n/a'}</code>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1">
            <span className="text-text-muted">Evidence Bundle SHA256:</span>
            <code className="text-[#15803D] font-mono font-bold select-all break-all">{result.evidence_sha256 || 'n/a'}</code>
          </div>
        </div>
      </div>

      {/* Subspace Reduction Metrics */}
      {result.reduction_metrics && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-text-primary uppercase">
            <Layers className="w-3.5 h-3.5 text-accent" />
            <span>STATE-SPACE REDUCTION METRICS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 bg-surface border border-border rounded">
              <div className="text-text-muted text-[10px] uppercase">ORIGINAL SEARCH SPACE</div>
              <div className="text-lg font-bold text-text-primary mt-0.5">
                {result.reduction_metrics.original_state_space_size ?? '—'}
              </div>
            </div>

            <div className="p-3 bg-surface border border-border rounded">
              <div className="text-text-muted text-[10px] uppercase">REDUCED CANDIDATE SPACE</div>
              <div className="text-lg font-bold text-accent mt-0.5">
                {result.reduction_metrics.reduced_candidate_space_size ?? result.candidate_state_count}
              </div>
            </div>

            <div className="p-3 bg-surface border border-border rounded">
              <div className="text-text-muted text-[10px] uppercase">REDUCTION RATIO</div>
              <div className="text-lg font-bold text-[#15803D] mt-0.5">
                {result.reduction_metrics.reduction_ratio ?? '—'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QuantumSearchIR or QUBO Summary */}
      {result.quantum_search_ir && (
        <div className="space-y-2 p-4 bg-surface border border-border rounded text-xs font-mono">
          <div className="text-text-primary font-bold text-[11px] uppercase">
            QUANTUM SEARCH IR STRUCTURE:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-text-secondary text-[11px]">
            <div>Oracle Type: <strong className="text-text-primary">{result.quantum_search_ir.oracle_type || 'Standard Phase'}</strong></div>
            <div>State Dimension: <strong className="text-text-primary">{result.quantum_search_ir.state_dimension || result.candidate_state_count}</strong></div>
            <div>Superposition: <strong className="text-accent">{result.quantum_search_ir.superposition_prepared ? 'YES' : 'NO'}</strong></div>
          </div>
        </div>
      )}

      {/* Warnings & Diagnostics */}
      {result.warnings && result.warnings.length > 0 && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded text-xs space-y-1.5">
          <div className="flex items-center space-x-1.5 text-amber-800 font-mono font-bold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>COMPILER DIAGNOSTIC WARNINGS:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-amber-900 text-xs font-sans">
            {result.warnings.map((w, idx) => (
              <li key={idx}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Evidence Disclosure Note */}
      <div className="p-3.5 bg-surface border border-border rounded text-[11px] font-sans text-text-muted leading-relaxed">
        <strong className="font-semibold text-text-primary">EVIDENCE BUNDLE PROVENANCE:</strong> Each successful Capsule run produces a SHA256-sealed evidence bundle containing reproducibility and provenance information. The sealed ZIP package contains input configuration digests, candidate hashes, and compilation run telemetry for independent external auditing.
      </div>
    </div>
  );
}
