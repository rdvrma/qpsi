import { NextRequest, NextResponse } from 'next/server';
import { sealSession, unsealSession, getSessionCookieName, getSessionCookieOptions } from '@/lib/capsule/session';
import { capsuleClient, CapsuleApiErrorClass } from '@/lib/capsule/client';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error_code: 'INVALID_REQUEST', message: 'Invalid JSON request payload.' },
        { status: 400 }
      );
    }

    const { licenseKey } = body || {};
    if (!licenseKey || typeof licenseKey !== 'string' || !licenseKey.trim()) {
      return NextResponse.json(
        { error_code: 'UNAUTHORIZED', message: 'A valid research license key is required.' },
        { status: 401 }
      );
    }

    const cleanKey = licenseKey.trim();

    // Verify license against Capsule backend
    const licenseInfo = await capsuleClient.getLicenseInfo(cleanKey);

    if (licenseInfo.status && licenseInfo.status !== 'active') {
      return NextResponse.json(
        {
          error_code: 'LICENSE_INACTIVE',
          message: `Research license is currently ${licenseInfo.status}. Active status required.`,
        },
        { status: 403 }
      );
    }

    const now = Date.now();
    const sessionDurationMs = 4 * 60 * 60 * 1000; // 4 hours

    const sessionPayload = {
      licenseKey: cleanKey,
      licenseId: licenseInfo.license_id || 'QPSI-EVAL',
      licenseType: licenseInfo.license_type || 'RESEARCH_EVALUATION',
      organization: licenseInfo.organization || null,
      expiresAt: licenseInfo.expires_at || null,
      sessionExpiresAt: now + sessionDurationMs,
      createdAt: now,
    };

    const token = sealSession(sessionPayload);
    const cookieOptions = getSessionCookieOptions();

    const response = NextResponse.json(
      {
        authenticated: true,
        license: {
          license_id: licenseInfo.license_id,
          license_type: licenseInfo.license_type,
          status: licenseInfo.status || 'active',
          organization: licenseInfo.organization || null,
          expires_at: licenseInfo.expires_at || null,
          max_runtime_seconds: licenseInfo.max_runtime_seconds || 600,
        },
      },
      { status: 200 }
    );

    response.cookies.set(cookieOptions.name, token, {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
      maxAge: cookieOptions.maxAge,
    });

    return response;
  } catch (err: any) {
    if (err instanceof CapsuleApiErrorClass) {
      return NextResponse.json(
        { error_code: err.errorCode, message: err.message },
        { status: err.status }
      );
    }
    return NextResponse.json(
      { error_code: 'INTERNAL_ERROR', message: 'Unable to authenticate research license.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const cookieName = getSessionCookieName();
    const cookie = req.cookies.get(cookieName);

    if (!cookie?.value) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const session = unsealSession(cookie.value);
    if (!session) {
      const response = NextResponse.json({ authenticated: false }, { status: 200 });
      response.cookies.delete(cookieName);
      return response;
    }

    // Verify against backend to catch any revocations during active session
    try {
      const licenseInfo = await capsuleClient.getLicenseInfo(session.licenseKey);
      if (licenseInfo.status && licenseInfo.status !== 'active') {
        const response = NextResponse.json(
          {
            authenticated: false,
            error_code: 'LICENSE_INACTIVE',
            message: 'Research license is no longer active.',
          },
          { status: 403 }
        );
        response.cookies.delete(cookieName);
        return response;
      }

      return NextResponse.json(
        {
          authenticated: true,
          license: {
            license_id: licenseInfo.license_id || session.licenseId,
            license_type: licenseInfo.license_type || session.licenseType,
            status: licenseInfo.status || 'active',
            organization: licenseInfo.organization || session.organization,
            expires_at: licenseInfo.expires_at || session.expiresAt,
            max_runtime_seconds: licenseInfo.max_runtime_seconds || 600,
          },
        },
        { status: 200 }
      );
    } catch {
      // Backend temporarily unreachable; return active session state if unexpired
      return NextResponse.json(
        {
          authenticated: true,
          license: {
            license_id: session.licenseId,
            license_type: session.licenseType,
            status: 'active',
            organization: session.organization,
            expires_at: session.expiresAt,
            max_runtime_seconds: 600,
          },
        },
        { status: 200 }
      );
    }
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}

export async function DELETE() {
  const cookieName = getSessionCookieName();
  const response = NextResponse.json({ success: true, authenticated: false }, { status: 200 });
  response.cookies.delete(cookieName);
  return response;
}
