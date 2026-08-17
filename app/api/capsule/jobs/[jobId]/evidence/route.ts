import { NextRequest, NextResponse } from 'next/server';
import { unsealSession, getSessionCookieName } from '@/lib/capsule/session';
import { capsuleClient, CapsuleApiErrorClass } from '@/lib/capsule/client';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await context.params;
    if (!jobId) {
      return NextResponse.json(
        { error_code: 'INVALID_REQUEST', message: 'Job ID is required.' },
        { status: 400 }
      );
    }

    const cookieName = getSessionCookieName();
    const cookie = req.cookies.get(cookieName);

    if (!cookie?.value) {
      return NextResponse.json(
        { error_code: 'UNAUTHORIZED', message: 'Authentication required.' },
        { status: 401 }
      );
    }

    const session = unsealSession(cookie.value);
    if (!session?.licenseKey) {
      return NextResponse.json(
        { error_code: 'UNAUTHORIZED', message: 'Session expired or invalid.' },
        { status: 401 }
      );
    }

    const backendRes = await capsuleClient.getJobEvidenceResponse(session.licenseKey, jobId);

    const headers = new Headers();
    headers.set(
      'Content-Type',
      backendRes.headers.get('content-type') || 'application/zip'
    );
    headers.set(
      'Content-Disposition',
      backendRes.headers.get('content-disposition') ||
        `attachment; filename="qpsi_capsule_evidence_${jobId}.zip"`
    );
    if (backendRes.headers.get('content-length')) {
      headers.set('Content-Length', backendRes.headers.get('content-length')!);
    }
    if (backendRes.headers.get('x-evidence-sha256')) {
      headers.set('X-Evidence-SHA256', backendRes.headers.get('x-evidence-sha256')!);
    }

    return new Response(backendRes.body, {
      status: 200,
      headers,
    });
  } catch (err: any) {
    if (err instanceof CapsuleApiErrorClass) {
      return NextResponse.json(
        { error_code: err.errorCode, message: err.message },
        { status: err.status }
      );
    }
    return NextResponse.json(
      { error_code: 'INTERNAL_ERROR', message: 'Failed to download evidence bundle.' },
      { status: 500 }
    );
  }
}
