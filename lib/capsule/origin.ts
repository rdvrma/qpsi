import { NextRequest, NextResponse } from 'next/server';

/**
 * Validates that a mutating request originates from the same site / host.
 * Protects mutation endpoints against Cross-Site Request Forgery (CSRF).
 */
export function validateSameOrigin(req: NextRequest): { valid: boolean; reason?: string } {
  // Check Sec-Fetch-Site header (standard in modern browsers)
  const secFetchSite = req.headers.get('sec-fetch-site');
  if (secFetchSite === 'cross-site') {
    return { valid: false, reason: 'Cross-site request blocked by Sec-Fetch-Site policy.' };
  }

  const originHeader = req.headers.get('origin');
  const refererHeader = req.headers.get('referer');

  // If no origin and no referer provided (e.g. server-to-server or non-browser test)
  if (!originHeader && !refererHeader) {
    // If sec-fetch-site indicates cross-site, it was already blocked above.
    // Otherwise allow non-browser / direct invocations if no cross-origin indication exists.
    return { valid: true };
  }

  // Determine candidate origin URL from Origin or Referer
  let candidateOrigin = '';
  if (originHeader) {
    candidateOrigin = originHeader;
  } else if (refererHeader) {
    try {
      const parsedReferer = new URL(refererHeader);
      candidateOrigin = parsedReferer.origin;
    } catch {
      return { valid: false, reason: 'Malformed Referer header.' };
    }
  }

  let parsedCandidate: URL;
  try {
    parsedCandidate = new URL(candidateOrigin);
  } catch {
    return { valid: false, reason: 'Malformed Origin header.' };
  }

  // Get current host from request headers
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
  const hostWithoutPort = host.split(':')[0].toLowerCase();
  const candidateHostWithoutPort = parsedCandidate.hostname.toLowerCase();

  // 1. Direct host match
  if (host && (parsedCandidate.host.toLowerCase() === host.toLowerCase() || candidateHostWithoutPort === hostWithoutPort)) {
    return { valid: true };
  }

  // 2. Allow localhost / loopback matching in development
  const isDev = process.env.NODE_ENV !== 'production';
  const isCandidateLocal = candidateHostWithoutPort === 'localhost' || candidateHostWithoutPort === '127.0.0.1';
  const isHostLocal = !host || hostWithoutPort === 'localhost' || hostWithoutPort === '127.0.0.1';
  if (isDev && isCandidateLocal && isHostLocal) {
    return { valid: true };
  }

  // 3. Match against configured NEXT_PUBLIC_SITE_URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try {
      const parsedSite = new URL(siteUrl);
      if (parsedCandidate.origin.toLowerCase() === parsedSite.origin.toLowerCase()) {
        return { valid: true };
      }
    } catch {
      // ignore invalid siteUrl
    }
  }

  // 4. Match against VERCEL_URL if present
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    const cleanVercel = vercelUrl.replace(/^https?:\/\//, '').toLowerCase();
    if (parsedCandidate.host.toLowerCase() === cleanVercel) {
      return { valid: true };
    }
  }

  return {
    valid: false,
    reason: `Origin '${candidateOrigin}' does not match target host '${host}'.`,
  };
}

/**
 * Convenience helper that returns a 403 Forbidden response if validation fails,
 * or null if valid.
 */
export function enforceSameOrigin(req: NextRequest): NextResponse | null {
  const check = validateSameOrigin(req);
  if (!check.valid) {
    return NextResponse.json(
      {
        error_code: 'CROSS_ORIGIN_FORBIDDEN',
        message: check.reason || 'Cross-origin mutation request forbidden.',
      },
      { status: 403 }
    );
  }
  return null;
}
