import {
  CapsuleLicenseInfo,
  ResearchCapsuleWorkloadV1,
  CapsuleJobStatus,
  CapsuleCompilerResult,
  CapsuleErrorCode,
} from './types';

const CAPSULE_API_BASE_URL =
  process.env.QPSI_CAPSULE_API_BASE_URL ||
  'https://qpsi-research-capsule-prod-596385402822.us-central1.run.app';

export class CapsuleApiErrorClass extends Error {
  constructor(
    public errorCode: CapsuleErrorCode,
    public status: number,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'CapsuleApiError';
  }
}

/**
 * Validates that an endpoint stays strictly on the allowed Capsule backend.
 */
function buildCapsuleUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const base = CAPSULE_API_BASE_URL.replace(/\/+$/, '');
  return `${base}${cleanPath}`;
}

async function handleCapsuleResponse(res: Response): Promise<any> {
  const contentType = res.headers.get('content-type') || '';
  let body: any = null;

  if (contentType.includes('application/json')) {
    try {
      body = await res.json();
    } catch {
      body = null;
    }
  }

  if (!res.ok) {
    let errorCode: CapsuleErrorCode = 'INTERNAL_ERROR';
    let message = 'An error occurred while communicating with the Capsule backend.';

    if (res.status === 401) {
      errorCode = 'UNAUTHORIZED';
      message = body?.detail?.message || 'Invalid or missing research license key.';
    } else if (res.status === 403) {
      errorCode = 'LICENSE_INACTIVE';
      message = body?.detail?.message || 'Research license is inactive, suspended, or expired.';
    } else if (res.status === 404) {
      errorCode = 'JOB_NOT_FOUND';
      message = body?.detail?.message || 'Requested research job or resource was not found.';
    } else if (res.status === 422) {
      errorCode = 'INVALID_WORKLOAD';
      message = body?.detail?.[0]?.msg || body?.detail?.message || 'Workload validation failed against schema.';
    } else if (res.status === 429) {
      errorCode = 'RATE_LIMITED';
      message = body?.detail?.message || 'Concurrency or rate limit exceeded. Please wait before retrying.';
    } else if (res.status === 413) {
      errorCode = 'RESOURCE_LIMIT_EXCEEDED';
      message = body?.detail?.message || 'Workload size exceeds maximum allowed limit.';
    } else if (res.status >= 500) {
      errorCode = 'COMPILER_ERROR';
      message = 'Remote compiler evaluation encountered an internal condition.';
    }

    throw new CapsuleApiErrorClass(errorCode, res.status, message, body?.detail);
  }

  return body;
}

export const capsuleClient = {
  /**
   * Health check
   */
  async getHealth(): Promise<{ status: string; service: string; version: string }> {
    const url = buildCapsuleUrl('/health');
    const res = await fetch(url, { method: 'GET', cache: 'no-store' });
    return handleCapsuleResponse(res);
  },

  /**
   * Validates research license against backend
   */
  async getLicenseInfo(licenseKey: string): Promise<CapsuleLicenseInfo> {
    const url = buildCapsuleUrl('/v1/capsule/license');
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${licenseKey.trim()}`,
      },
      cache: 'no-store',
    });
    return handleCapsuleResponse(res);
  },

  /**
   * Submits a structured research workload for compilation
   */
  async submitWorkload(
    licenseKey: string,
    workload: ResearchCapsuleWorkloadV1
  ): Promise<{ job_id: string; status: string; created_at: string }> {
    const url = buildCapsuleUrl('/v1/capsule/jobs');
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${licenseKey.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workload),
      cache: 'no-store',
    });
    return handleCapsuleResponse(res);
  },

  /**
   * Retrieves status of an evaluation job
   */
  async getJobStatus(licenseKey: string, jobId: string): Promise<CapsuleJobStatus> {
    const url = buildCapsuleUrl(`/v1/capsule/jobs/${encodeURIComponent(jobId)}`);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${licenseKey.trim()}`,
      },
      cache: 'no-store',
    });
    return handleCapsuleResponse(res);
  },

  /**
   * Retrieves compiler evaluation output artifact
   */
  async getJobResult(licenseKey: string, jobId: string): Promise<CapsuleCompilerResult> {
    const url = buildCapsuleUrl(`/v1/capsule/jobs/${encodeURIComponent(jobId)}/result`);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${licenseKey.trim()}`,
      },
      cache: 'no-store',
    });
    return handleCapsuleResponse(res);
  },

  /**
   * Downloads sealed SHA256 reproducible evidence bundle
   */
  async getJobEvidenceResponse(licenseKey: string, jobId: string): Promise<Response> {
    const url = buildCapsuleUrl(`/v1/capsule/jobs/${encodeURIComponent(jobId)}/evidence`);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${licenseKey.trim()}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      await handleCapsuleResponse(res);
    }
    return res;
  },

  /**
   * Cancels a pending or active job
   */
  async cancelJob(
    licenseKey: string,
    jobId: string
  ): Promise<{ job_id: string; status: string; cancelled: boolean }> {
    const url = buildCapsuleUrl(`/v1/capsule/jobs/${encodeURIComponent(jobId)}/cancel`);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${licenseKey.trim()}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    return handleCapsuleResponse(res);
  },
};
