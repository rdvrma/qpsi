'use client';

import React, { useEffect, useState } from 'react';
import { CapsuleJobStatus, JobStatusType } from '@/lib/capsule/types';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
  StopCircle,
  Cpu,
  RefreshCw,
} from 'lucide-react';

interface JobTrackerProps {
  jobId: string;
  initialStatus?: CapsuleJobStatus | null;
  onJobCompleted: (status: CapsuleJobStatus) => void;
}

const TERMINAL_STATES: JobStatusType[] = [
  'SUCCEEDED',
  'FAILED',
  'RESOURCE_LIMIT_EXCEEDED',
  'CANCELLED',
];

export function JobTracker({ jobId, initialStatus, onJobCompleted }: JobTrackerProps) {
  const [status, setStatus] = useState<CapsuleJobStatus | null>(initialStatus || null);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState<number>(0);

  const isTerminal = status ? TERMINAL_STATES.includes(status.status) : false;

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let pollInterval: NodeJS.Timeout | null = null;
    const startTime = Date.now();

    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/capsule/jobs/${encodeURIComponent(jobId)}`);
        if (!res.ok) {
          const errData = await res.json();
          setError(errData.message || 'Failed to poll job status.');
          return;
        }
        const data: CapsuleJobStatus = await res.json();
        setStatus(data);

        if (TERMINAL_STATES.includes(data.status)) {
          if (pollInterval) clearInterval(pollInterval);
          if (timer) clearInterval(timer);
          onJobCompleted(data);
        }
      } catch {
        setError('Network error while polling job status.');
      }
    };

    // Initial fetch
    fetchStatus();

    // Elapsed timer
    timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    // Poll every 3 seconds while active
    pollInterval = setInterval(() => {
      fetchStatus();
    }, 3000);

    return () => {
      if (pollInterval) clearInterval(pollInterval);
      if (timer) clearInterval(timer);
    };
  }, [jobId, onJobCompleted]);

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this compilation job?')) return;
    setCancelling(true);
    setError(null);
    try {
      const res = await fetch(`/api/capsule/jobs/${encodeURIComponent(jobId)}/cancel`, {
        method: 'POST',
      });
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || 'Failed to cancel job.');
      } else {
        const data = await res.json();
        if (data.status) {
          setStatus((prev) => (prev ? { ...prev, status: data.status } : null));
        }
      }
    } catch {
      setError('Network error while cancelling job.');
    } finally {
      setCancelling(false);
    }
  };

  const getStatusBadge = (s?: JobStatusType) => {
    switch (s) {
      case 'QUEUED':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20 text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>QUEUED</span>
          </span>
        );
      case 'VALIDATING':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-blue-500/10 text-blue-600 border border-blue-500/20 text-xs font-mono font-bold">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>VALIDATING SCHEMA</span>
          </span>
        );
      case 'RUNNING':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-accent/10 text-accent border border-accent/25 text-xs font-mono font-bold">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>COMPILING STATE SPACE</span>
          </span>
        );
      case 'SUCCEEDED':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-mono font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>SUCCEEDED</span>
          </span>
        );
      case 'FAILED':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-red-500/10 text-red-600 border border-red-500/20 text-xs font-mono font-bold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>FAILED</span>
          </span>
        );
      case 'RESOURCE_LIMIT_EXCEEDED':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-orange-500/10 text-orange-600 border border-orange-500/20 text-xs font-mono font-bold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>LIMIT EXCEEDED</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-stone-500/10 text-stone-600 border border-stone-500/20 text-xs font-mono font-bold">
            <XCircle className="w-3.5 h-3.5" />
            <span>CANCELLED</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-surface border border-border text-xs font-mono">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>INITIALIZING</span>
          </span>
        );
    }
  };

  return (
    <div className="scientific-card p-6 bg-surface-raised border border-border rounded-lg space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-text-muted uppercase">JOB EXECUTION CONSOLE</span>
            <span className="text-xs font-mono text-text-secondary">&bull; ID: {jobId}</span>
          </div>
          <div className="flex items-center space-x-3 pt-1">
            {getStatusBadge(status?.status)}
            <div className="text-xs font-mono text-text-muted">
              ELAPSED: <strong className="text-text-primary">{status?.runtime_seconds ?? elapsed}s</strong>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {!isTerminal && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-surface border border-border text-red-600 hover:bg-red-50 text-xs font-sans font-medium rounded transition-colors"
            >
              {cancelling ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <StopCircle className="w-3.5 h-3.5" />
              )}
              <span>Cancel Job</span>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-800 flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Real-time Status Details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-1">
        <div className="p-2.5 bg-surface border border-border rounded">
          <div className="text-text-muted text-[10px] uppercase">CREATED</div>
          <div className="text-text-primary font-medium mt-0.5 truncate">
            {status?.created_at ? new Date(status.created_at).toLocaleTimeString() : '—'}
          </div>
        </div>

        <div className="p-2.5 bg-surface border border-border rounded">
          <div className="text-text-muted text-[10px] uppercase">STARTED</div>
          <div className="text-text-primary font-medium mt-0.5 truncate">
            {status?.started_at ? new Date(status.started_at).toLocaleTimeString() : '—'}
          </div>
        </div>

        <div className="p-2.5 bg-surface border border-border rounded">
          <div className="text-text-muted text-[10px] uppercase">COMPLETED</div>
          <div className="text-text-primary font-medium mt-0.5 truncate">
            {status?.completed_at ? new Date(status.completed_at).toLocaleTimeString() : '—'}
          </div>
        </div>

        <div className="p-2.5 bg-surface border border-border rounded">
          <div className="text-text-muted text-[10px] uppercase">TOTAL RUNTIME</div>
          <div className="text-text-primary font-medium mt-0.5">
            {status?.runtime_seconds != null ? `${status.runtime_seconds}s` : `${elapsed}s`}
          </div>
        </div>
      </div>

      {status?.error_message && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-800 space-y-1">
          <div className="font-mono font-bold">ERROR CODE: {status.error_code || 'COMPILER_ERROR'}</div>
          <div>{status.error_message}</div>
        </div>
      )}
    </div>
  );
}
