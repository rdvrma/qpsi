'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/content/siteConfig';
import {
  CapsuleLicenseInfo,
  ResearchCapsuleWorkloadV1,
  CapsuleJobStatus,
  CapsuleCompilerResult,
} from '@/lib/capsule/types';
import { WorkloadSubmitter } from '@/components/capsule/WorkloadSubmitter';
import { JobTracker } from '@/components/capsule/JobTracker';
import { ResultViewer } from '@/components/capsule/ResultViewer';
import { LicenseModal } from '@/components/capsule/LicenseModal';
import {
  Key,
  ShieldCheck,
  Cpu,
  LogOut,
  AlertCircle,
  Clock,
  History,
  FileCode,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Loader2,
} from 'lucide-react';

interface SessionJobHistoryItem {
  jobId: string;
  workloadName: string;
  submittedAt: string;
  status: string;
}

export default function CapsuleWorkspacePage() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [license, setLicense] = useState<CapsuleLicenseInfo | null>(null);
  const [licenseModalOpen, setLicenseModalOpen] = useState(false);

  // Active Job State
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [activeJobStatus, setActiveJobStatus] = useState<CapsuleJobStatus | null>(null);
  const [submittingWorkload, setSubmittingWorkload] = useState(false);
  const [compilerResult, setCompilerResult] = useState<CapsuleCompilerResult | null>(null);
  const [workspaceError, setWorkspaceError] = useState<string | null>(null);

  // Session job list
  const [jobHistory, setJobHistory] = useState<SessionJobHistoryItem[]>([]);

  const checkSession = useCallback(async () => {
    setCheckingSession(true);
    setWorkspaceError(null);
    try {
      const res = await fetch('/api/capsule/session', { cache: 'no-store' });
      const data = await res.json();
      if (res.ok && data.authenticated && data.license) {
        setAuthenticated(true);
        setLicense(data.license);
      } else {
        setAuthenticated(false);
        setLicense(null);
        if (res.status === 503 || data.error_code === 'LICENSE_VALIDATION_UNAVAILABLE') {
          setWorkspaceError(data.message || 'Unable to verify research license with Capsule backend.');
        }
      }
    } catch {
      setAuthenticated(false);
      setLicense(null);
    } finally {
      setCheckingSession(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const handleEndSession = async () => {
    try {
      await fetch('/api/capsule/session', { method: 'DELETE' });
    } finally {
      setAuthenticated(false);
      setLicense(null);
      setActiveJobId(null);
      setCompilerResult(null);
      router.push('/capsule');
    }
  };

  const handleSubmitWorkload = async (workload: ResearchCapsuleWorkloadV1) => {
    setSubmittingWorkload(true);
    setWorkspaceError(null);
    setCompilerResult(null);

    try {
      const res = await fetch('/api/capsule/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workload),
      });

      const data = await res.json();

      if (!res.ok) {
        setWorkspaceError(data.message || 'Workload submission was rejected by backend.');
        setSubmittingWorkload(false);
        return;
      }

      const newJobId = data.job_id;
      setActiveJobId(newJobId);
      setActiveJobStatus({
        job_id: newJobId,
        status: data.status || 'QUEUED',
        created_at: data.created_at || new Date().toISOString(),
        workload_name: workload.workload_name,
      });

      // Add to session history
      setJobHistory((prev) => [
        {
          jobId: newJobId,
          workloadName: workload.workload_name,
          submittedAt: new Date().toLocaleTimeString(),
          status: data.status || 'QUEUED',
        },
        ...prev,
      ]);
    } catch {
      setWorkspaceError('Network error while submitting workload to server proxy.');
    } finally {
      setSubmittingWorkload(false);
    }
  };

  const handleJobCompleted = useCallback(async (completedStatus: CapsuleJobStatus) => {
    setActiveJobStatus(completedStatus);

    // Update session history entry
    setJobHistory((prev) =>
      prev.map((item) =>
        item.jobId === completedStatus.job_id
          ? { ...item, status: completedStatus.status }
          : item
      )
    );

    if (completedStatus.status === 'SUCCEEDED') {
      try {
        const res = await fetch(`/api/capsule/jobs/${encodeURIComponent(completedStatus.job_id)}/result`);
        if (res.ok) {
          const resultData: CapsuleCompilerResult = await res.json();
          setCompilerResult(resultData);
        } else {
          const errData = await res.json();
          setWorkspaceError(errData.message || 'Failed to fetch compiler results artifact.');
        }
      } catch {
        setWorkspaceError('Network error while retrieving compiler evaluation artifact.');
      }
    }
  }, []);

  const handleSelectHistoryJob = async (jobId: string) => {
    setActiveJobId(jobId);
    setCompilerResult(null);
    setWorkspaceError(null);

    try {
      const res = await fetch(`/api/capsule/jobs/${encodeURIComponent(jobId)}`);
      if (res.ok) {
        const statusData: CapsuleJobStatus = await res.json();
        setActiveJobStatus(statusData);

        if (statusData.status === 'SUCCEEDED') {
          const resResult = await fetch(`/api/capsule/jobs/${encodeURIComponent(jobId)}/result`);
          if (resResult.ok) {
            const resData: CapsuleCompilerResult = await resResult.json();
            setCompilerResult(resData);
          }
        }
      }
    } catch {
      setWorkspaceError('Failed to load selected job.');
    }
  };

  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb / Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-text-muted">
              <Link href="/capsule" className="hover:text-accent transition-colors">
                CAPSULE
              </Link>
              <span>/</span>
              <span className="text-text-primary font-bold">WORKSPACE CONSOLE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">
              Researcher Workspace
            </h1>
          </div>

          {authenticated && license && (
            <div className="flex items-center space-x-3">
              <button
                onClick={handleEndSession}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-surface-raised border border-border hover:bg-surface-subtle text-red-600 text-xs font-sans font-medium rounded transition-colors shadow-2xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>End Session</span>
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {checkingSession && (
          <div className="p-12 text-center space-y-3 bg-surface-raised border border-border rounded-lg font-mono text-xs text-text-muted">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-accent" />
            <div>CHECKING SECURE CAPSULE SESSION...</div>
          </div>
        )}

        {/* Unauthenticated View */}
        {!checkingSession && !authenticated && (
          <div className="scientific-card p-8 sm:p-12 bg-surface-raised border border-border rounded-lg text-center space-y-6 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto text-accent">
              <Key className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-text-primary">
                Authentication Required
              </h2>
              <p className="text-sm font-sans text-text-secondary leading-relaxed max-w-md mx-auto">
                Please enter your active Q-Psi Research Evaluation License key to evaluate workloads against the production Capsule compiler.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setLicenseModalOpen(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-accent text-white font-sans text-xs font-semibold rounded hover:bg-accent-hover transition-colors shadow-xs w-full sm:w-auto justify-center"
              >
                <Key className="w-4 h-4" />
                <span>Enter Research License</span>
              </button>

              <Link
                href="/capsule#support-access"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-surface border border-border text-text-primary font-sans text-xs font-semibold rounded hover:bg-surface-subtle transition-colors w-full sm:w-auto justify-center"
              >
                <span>Request Access License</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-4 bg-surface border border-border rounded text-[11px] font-mono text-text-muted text-left space-y-1">
              <div className="font-bold text-text-primary uppercase flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>SECURITY PROTOCOL:</span>
              </div>
              <div>
                License keys are securely verified over an encrypted server-side session and are never exposed in browser storage, HTML, or analytics.
              </div>
            </div>
          </div>
        )}

        {/* Authenticated Workspace */}
        {!checkingSession && authenticated && license && (
          <div className="space-y-8">
            {/* License Status Banner */}
            <div className="scientific-card p-5 bg-surface-raised border border-border rounded-lg flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-[#16A34A] animate-pulse" />
                <div>
                  <span className="text-text-muted">LICENSE ID: </span>
                  <strong className="text-text-primary">{license.license_id}</strong>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-text-secondary">
                <div>
                  <span className="text-text-muted">TIER: </span>
                  <span className="text-text-primary font-bold">{license.license_type}</span>
                </div>

                {license.organization && (
                  <div>
                    <span className="text-text-muted">AFFILIATION: </span>
                    <span className="text-text-primary">{license.organization}</span>
                  </div>
                )}

                <div>
                  <span className="text-text-muted">STATUS: </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#16A34A]/10 text-[#15803D] font-bold border border-[#16A34A]/25 text-[10px]">
                    ACTIVE
                  </span>
                </div>

                <div>
                  <span className="text-text-muted">MAX RUNTIME: </span>
                  <span className="text-text-primary">{license.max_runtime_seconds || 600}s</span>
                </div>
              </div>
            </div>

            {workspaceError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded flex items-start space-x-2 text-xs text-red-800 font-sans">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{workspaceError}</div>
              </div>
            )}

            {/* Main Workspace Area: Submitter + Console */}
            <div className="space-y-8">
              {/* Workload Submission Form */}
              <WorkloadSubmitter
                onSubmit={handleSubmitWorkload}
                loading={submittingWorkload}
              />

              {/* Active Job Tracker */}
              {activeJobId && (
                <JobTracker
                  jobId={activeJobId}
                  initialStatus={activeJobStatus}
                  onJobCompleted={handleJobCompleted}
                />
              )}

              {/* Compiler Result Inspector */}
              {compilerResult && <ResultViewer result={compilerResult} />}

              {/* Session Job History */}
              {jobHistory.length > 0 && (
                <div className="scientific-card p-6 bg-surface-raised border border-border rounded-lg space-y-4 font-sans">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center space-x-2 text-xs font-mono font-bold text-text-primary uppercase">
                      <History className="w-4 h-4 text-accent" />
                      <span>SESSION JOB HISTORY</span>
                    </div>
                    <span className="text-[11px] font-mono text-text-muted">
                      {jobHistory.length} {jobHistory.length === 1 ? 'JOB' : 'JOBS'} EXECUTED THIS SESSION
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border text-text-muted text-[10px] uppercase">
                          <th className="py-2 px-3">Job ID</th>
                          <th className="py-2 px-3">Workload Name</th>
                          <th className="py-2 px-3">Submitted</th>
                          <th className="py-2 px-3">Status</th>
                          <th className="py-2 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {jobHistory.map((item) => (
                          <tr
                            key={item.jobId}
                            className={`hover:bg-surface transition-colors ${
                              activeJobId === item.jobId ? 'bg-surface' : ''
                            }`}
                          >
                            <td className="py-2.5 px-3 font-bold text-text-primary truncate max-w-[160px]">
                              {item.jobId}
                            </td>
                            <td className="py-2.5 px-3 text-text-secondary truncate max-w-[200px]">
                              {item.workloadName}
                            </td>
                            <td className="py-2.5 px-3 text-text-muted">{item.submittedAt}</td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                                  item.status === 'SUCCEEDED'
                                    ? 'bg-[#16A34A]/10 text-[#15803D]'
                                    : item.status === 'RUNNING'
                                    ? 'bg-accent/10 text-accent'
                                    : item.status === 'FAILED'
                                    ? 'bg-red-500/10 text-red-600'
                                    : 'bg-stone-500/10 text-stone-600'
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                onClick={() => handleSelectHistoryJob(item.jobId)}
                                className="text-xs font-mono text-accent hover:underline"
                              >
                                Inspect
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Disclosures */}
            <div className="p-4 bg-surface border border-border rounded text-[11px] font-sans text-text-muted space-y-1">
              <div className="font-mono font-bold text-text-primary uppercase text-[10px]">
                RESEARCH ENVIRONMENT CONSTRAINTS:
              </div>
              <p>
                Capsule v1 isolates compilation tasks into transient containers. Maximum runtime per job is 600 seconds. No arbitrary code execution or unmonitored network connections are permitted.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* License Modal */}
      <LicenseModal
        isOpen={licenseModalOpen}
        onClose={() => setLicenseModalOpen(false)}
        onSuccess={() => {
          checkSession();
        }}
      />
    </div>
  );
}
