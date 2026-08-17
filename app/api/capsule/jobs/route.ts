import { NextRequest, NextResponse } from 'next/server';
import { unsealSession, getSessionCookieName } from '@/lib/capsule/session';
import { capsuleClient, CapsuleApiErrorClass } from '@/lib/capsule/client';
import { ResearchCapsuleWorkloadV1 } from '@/lib/capsule/types';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
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

    const workload: ResearchCapsuleWorkloadV1 = {
      workload_name: String(body.workload_name || 'unnamed_research_workload').slice(0, 128),
      problem_type: body.problem_type || 'state_space_search',
      input_format: body.input_format || 'json',
      payload: body.payload || {},
      compiler_options: body.compiler_options || {},
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
