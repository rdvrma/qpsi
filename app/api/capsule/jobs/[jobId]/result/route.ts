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

    const result = await capsuleClient.getJobResult(session.licenseKey, jobId);
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    if (err instanceof CapsuleApiErrorClass) {
      return NextResponse.json(
        { error_code: err.errorCode, message: err.message },
        { status: err.status }
      );
    }
    return NextResponse.json(
      { error_code: 'INTERNAL_ERROR', message: 'Failed to retrieve job result.' },
      { status: 500 }
    );
  }
}
