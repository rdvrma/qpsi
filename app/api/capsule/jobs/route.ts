import { NextRequest, NextResponse } from 'next/server';
import { unsealSession, getSessionCookieName } from '@/lib/capsule/session';
import { capsuleClient, CapsuleApiErrorClass } from '@/lib/capsule/client';
import { ResearchCapsuleWorkloadV1 } from '@/lib/capsule/types';
import { enforceSameOrigin } from '@/lib/capsule/origin';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // CSRF Protection: enforce same-origin for mutating workload submission
  const originError = enforceSameOrigin(req);
  if (originError) return originError;

  try {
    const cookieName = getSessionCookieName();
    const cookie = req.cookies.get(cookieName);

    if (!cookie?.value) {
      return NextResponse.json(
        { error_code: 'UNAUTHORIZED', message: 'Authentication required. Please enter your research license.' },
        { status: 401 }
      );
    }

    const session = unsealSession(cookie.value);
    if (!session?.licenseKey) {
      return NextResponse.json(
        { error_code: 'UNAUTHORIZED', message: 'Session expired or invalid. Please re-authenticate.' },
        { status: 401 }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error_code: 'INVALID_WORKLOAD', message: 'Invalid JSON request payload.' },
        { status: 400 }
      );
    }

    // Basic structure check
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error_code: 'INVALID_WORKLOAD', message: 'Workload payload must be an object.' },
        { status: 422 }
      );
    }

    const workload: any = {
      workload_id: String(body.workload_id || body.workload_name || 'qpsi_eval_workload').replace(/[^a-zA-Z0-9_\-\.]/g, '_').slice(0, 64),
      problem_statement: String(body.problem_statement || `Evaluation of ${body.problem_type || 'state_space_search'} candidate space`),
      ecosystem: String(body.ecosystem || 'Python'),
      repository_files: Array.isArray(body.repository_files) && body.repository_files.length > 0
        ? body.repository_files
        : ['src/candidate_000.py', 'src/candidate_001.py', 'src/candidate_010.py', 'src/candidate_011.py'],
      visible_tests: Array.isArray(body.visible_tests) ? body.visible_tests : ['tests/test_candidate.py'],
      dependency_manifests: Array.isArray(body.dependency_manifests) ? body.dependency_manifests : ['setup.py'],
      max_candidate_capacity: Number(body.max_candidate_capacity || body.compiler_options?.max_candidates || 25),
      solver_timeout_seconds: Number(body.solver_timeout_seconds || 30.0),
      metadata: body.metadata || body.payload || {},
      workload_name: String(body.workload_name || body.workload_id || 'unnamed_research_workload').slice(0, 128),
      problem_type: body.problem_type || 'state_space_search',
      input_format: body.input_format || 'json',
      payload: body.payload || {},
      compiler_options: body.compiler_options || {},
      ...body,
      schema_version: 'qpsi_capsule_workload_v1',
    };

    // Forward to Capsule backend
    const job = await capsuleClient.submitWorkload(session.licenseKey, workload);

    return NextResponse.json(job, { status: 201 });
  } catch (err: any) {
    if (err instanceof CapsuleApiErrorClass) {
      return NextResponse.json(
        { error_code: err.errorCode, message: err.message },
        { status: err.status }
      );
    }
    return NextResponse.json(
      { error_code: 'INTERNAL_ERROR', message: 'Failed to submit workload to Capsule backend.' },
      { status: 500 }
    );
  }
}
