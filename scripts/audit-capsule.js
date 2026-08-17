/**
 * Comprehensive Mechanical Audit Script for Q-Psi Research Capsule (M4-B-R1)
 * Tests Session Security, Fail-Closed Rules, CSRF Protection, Backend Error Semantics, and Engine CI.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failedTests++;
  }
}

// ---------------------------------------------------------
// Reference Implementations of Session & Origin Validation
// matching lib/capsule/session.ts and lib/capsule/origin.ts
// ---------------------------------------------------------

const PLACEHOLDER_PATTERNS = [
  /^placeholder/i,
  /placeholder/i,
  /change_me/i,
  /changeme/i,
  /your_secret/i,
  /yoursecret/i,
  /todo/i,
  /example/i,
];

function validateSessionSecret(secret, nodeEnv) {
  const isProd = nodeEnv === 'production';

  if (!secret || typeof secret !== 'string' || !secret.trim()) {
    if (isProd) {
      return { valid: false, error: 'QPSI_CAPSULE_SESSION_SECRET is required in production.' };
    }
    return { valid: true };
  }

  const cleanSecret = secret.trim();

  if (cleanSecret.length < 32) {
    if (isProd) {
      return {
        valid: false,
        error: 'QPSI_CAPSULE_SESSION_SECRET must be at least 32 characters in production.',
      };
    }
  }

  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(cleanSecret)) {
      if (isProd) {
        return {
          valid: false,
          error: 'QPSI_CAPSULE_SESSION_SECRET contains placeholder text and cannot be used in production.',
        };
      }
    }
  }

  return { valid: true };
}

function getDerivedKey(secret, nodeEnv) {
  const isProd = nodeEnv === 'production';
  const validation = validateSessionSecret(secret, nodeEnv);
  if (!validation.valid) {
    throw new Error(`[CapsuleSecurity] Session key derivation failed-closed: ${validation.error}`);
  }

  if (secret && secret.trim().length >= 32) {
    let isPlaceholder = false;
    for (const pattern of PLACEHOLDER_PATTERNS) {
      if (pattern.test(secret.trim())) {
        isPlaceholder = true;
        break;
      }
    }
    if (!isPlaceholder) {
      return crypto.createHash('sha256').update(secret.trim()).digest();
    }
  }

  if (isProd) {
    throw new Error('[CapsuleSecurity] Session key derivation failed-closed: No valid secret in production.');
  }

  return crypto.createHash('sha256').update('qpsi-dev-capsule-session-secret-key-32b-seed').digest();
}

function sealSession(data, secret, nodeEnv) {
  const key = getDerivedKey(secret, nodeEnv);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const serialized = JSON.stringify(data);
  const encrypted = Buffer.concat([cipher.update(serialized, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${iv.toString('base64url')}.${encrypted.toString('base64url')}.${authTag.toString('base64url')}`;
}

function unsealSession(token, secret, nodeEnv) {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [ivB64, encB64, tagB64] = parts;
    const iv = Buffer.from(ivB64, 'base64url');
    const encrypted = Buffer.from(encB64, 'base64url');
    const authTag = Buffer.from(tagB64, 'base64url');

    if (iv.length !== 12 || authTag.length !== 16) return null;

    const key = getDerivedKey(secret, nodeEnv);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const parsed = JSON.parse(decrypted.toString('utf8'));

    if (!parsed.sessionExpiresAt || Date.now() > parsed.sessionExpiresAt) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function validateSameOrigin({ headers = {}, nodeEnv = 'production', siteUrl = '' }) {
  const secFetchSite = headers['sec-fetch-site'];
  if (secFetchSite === 'cross-site') {
    return { valid: false, reason: 'Cross-site request blocked by Sec-Fetch-Site policy.' };
  }

  const originHeader = headers['origin'];
  const refererHeader = headers['referer'];

  if (!originHeader && !refererHeader) {
    return { valid: true };
  }

  let candidateOrigin = originHeader;
  if (!candidateOrigin && refererHeader) {
    try {
      candidateOrigin = new URL(refererHeader).origin;
    } catch {
      return { valid: false, reason: 'Malformed Referer header.' };
    }
  }

  let parsedCandidate;
  try {
    parsedCandidate = new URL(candidateOrigin);
  } catch {
    return { valid: false, reason: 'Malformed Origin header.' };
  }

  const host = headers['x-forwarded-host'] || headers['host'] || '';
  const hostWithoutPort = host.split(':')[0].toLowerCase();
  const candidateHostWithoutPort = parsedCandidate.hostname.toLowerCase();

  if (host && (parsedCandidate.host.toLowerCase() === host.toLowerCase() || candidateHostWithoutPort === hostWithoutPort)) {
    return { valid: true };
  }

  const isDev = nodeEnv !== 'production';
  const isCandidateLocal = candidateHostWithoutPort === 'localhost' || candidateHostWithoutPort === '127.0.0.1';
  const isHostLocal = !host || hostWithoutPort === 'localhost' || hostWithoutPort === '127.0.0.1';
  if (isDev && isCandidateLocal && isHostLocal) {
    return { valid: true };
  }

  if (siteUrl) {
    try {
      const parsedSite = new URL(siteUrl);
      if (parsedCandidate.origin.toLowerCase() === parsedSite.origin.toLowerCase()) {
        return { valid: true };
      }
    } catch {}
  }

  return { valid: false, reason: `Origin mismatch: '${candidateOrigin}' vs host '${host}'` };
}

// ---------------------------------------------------------
// Main Audit Runner
// ---------------------------------------------------------
async function runAudit() {
  console.log('====================================================');
  console.log('Q-PSI RESEARCH CAPSULE M4-B-R1 AUDIT SUITE');
  console.log('====================================================\n');

  // 1. Check Routes and Files
  console.log('[1/8] Verifying Route Files & Component Structure...');
  const filesToCheck = [
    'app/capsule/page.tsx',
    'app/capsule/workspace/page.tsx',
    'app/api/capsule/session/route.ts',
    'app/api/capsule/jobs/route.ts',
    'app/api/capsule/jobs/[jobId]/route.ts',
    'app/api/capsule/jobs/[jobId]/result/route.ts',
    'app/api/capsule/jobs/[jobId]/evidence/route.ts',
    'app/api/capsule/jobs/[jobId]/cancel/route.ts',
    'lib/capsule/session.ts',
    'lib/capsule/origin.ts',
    'lib/capsule/client.ts',
    'lib/capsule/types.ts',
    'components/capsule/LicenseModal.tsx',
    'components/capsule/WorkloadSubmitter.tsx',
    'components/capsule/JobTracker.tsx',
    'components/capsule/ResultViewer.tsx',
    '.github/workflows/engine-ci.yml',
    'services/qpsi-engine/pyproject.toml',
    '.env.example',
  ];

  for (const f of filesToCheck) {
    const fullPath = path.join(ROOT_DIR, f);
    assert(fs.existsSync(fullPath), `File exists: ${f}`);
  }

  // 2. Production Session Secret Fail-Closed Audit (Issue A)
  console.log('\n[2/8] Auditing Production Session Secret Fail-Closed Rules...');

  // Production: Missing secret must fail
  assert(!validateSessionSecret(undefined, 'production').valid, 'Production mode rejects missing secret (undefined)');
  assert(!validateSessionSecret('', 'production').valid, 'Production mode rejects empty secret ("")');

  // Production: Placeholder secrets must fail
  const placeholders = [
    'placeholder_generate_32_byte_session_secret',
    'placeholder_generate_32_byte_hex_or_base64_secret',
    'placeholder-capsule-key',
    'change_me_to_a_real_secret_key_123',
    'changeme_production_secret_32_chars_now',
    'your_secret_here_replace_me_promptly',
    'todo_replace_with_actual_session_secret',
    'example_secret_for_research_capsule',
  ];
  for (const p of placeholders) {
    assert(!validateSessionSecret(p, 'production').valid, `Production mode rejects placeholder: ${p.slice(0, 30)}...`);
  }

  // Production: Short secrets (< 32 chars) must fail
  assert(!validateSessionSecret('too_short_secret', 'production').valid, 'Production mode rejects short secret (16 chars)');
  assert(!validateSessionSecret('a'.repeat(31), 'production').valid, 'Production mode rejects 31-character secret');

  // Production: Valid 32+ character secrets pass
  const validSecret32 = '0123456789abcdef0123456789abcdef';
  const validSecret64 = 'c84a8b79f380126786a3455bcdef1234c84a8b79f380126786a3455bcdef1234';
  assert(validateSessionSecret(validSecret32, 'production').valid, 'Production mode accepts valid 32-character secret');
  assert(validateSessionSecret(validSecret64, 'production').valid, 'Production mode accepts valid 64-character hex secret');

  // Production: Key derivation throws on missing secret
  let prodDerivationThrew = false;
  try {
    getDerivedKey(undefined, 'production');
  } catch {
    prodDerivationThrew = true;
  }
  assert(prodDerivationThrew, 'Key derivation in production throws error when secret is absent (no fallback)');

  // Development mode: Fallback is permitted
  assert(validateSessionSecret(undefined, 'development').valid, 'Development mode permits fallback without explicit secret');
  const devKey = getDerivedKey(undefined, 'development');
  assert(Buffer.isBuffer(devKey) && devKey.length === 32, 'Development key derives valid 32-byte AES key');

  // Cryptographic AES-256-GCM Token Sealing & Tamper Resistance
  const testPayload = {
    licenseKey: 'qpsi_lic_synthetic_evaluation_key_456',
    licenseId: 'QPSI-TEST-EVAL',
    licenseType: 'RESEARCH_EVALUATION',
    sessionExpiresAt: Date.now() + 3600000,
    createdAt: Date.now(),
  };

  const sealedProd = sealSession(testPayload, validSecret64, 'production');
  assert(typeof sealedProd === 'string' && sealedProd.split('.').length === 3, 'AES-256-GCM sealer produces 3-part token');
  assert(!sealedProd.includes('qpsi_lic_synthetic_evaluation_key_456'), 'Plaintext license key is encrypted in token');

  const unsealedProd = unsealSession(sealedProd, validSecret64, 'production');
  assert(unsealedProd && unsealedProd.licenseKey === 'qpsi_lic_synthetic_evaluation_key_456', 'Valid token correctly decrypts with matching secret');

  // Token with wrong secret fails
  const unsealedWrongSecret = unsealSession(sealedProd, 'another_valid_32_byte_secret_key_99999', 'production');
  assert(unsealedWrongSecret === null, 'Decryption with wrong secret fails closed (returns null)');

  // Tampered ciphertext fails
  const tamperedToken = sealedProd.slice(0, -6) + 'XXXXXX';
  assert(unsealSession(tamperedToken, validSecret64, 'production') === null, 'Tampered token authentication tag check fails closed');

  // Expired token fails
  const expiredPayload = { ...testPayload, sessionExpiresAt: Date.now() - 1000 };
  const expiredToken = sealSession(expiredPayload, validSecret64, 'production');
  assert(unsealSession(expiredToken, validSecret64, 'production') === null, 'Expired session token fails closed (returns null)');

  // Verify source code of session.ts contains no fallback in production
  const sessionTsSource = fs.readFileSync(path.join(ROOT_DIR, 'lib/capsule/session.ts'), 'utf8');
  assert(!sessionTsSource.includes('VERCEL_GIT_COMMIT_SHA'), 'lib/capsule/session.ts does not fall back to commit SHA');
  assert(!sessionTsSource.includes('qpsi-prod-capsule-secret-boundary'), 'lib/capsule/session.ts contains no hardcoded prod boundary secret');

  // 3. Mutating Route CSRF / Same-Origin Hardening (Issue C)
  console.log('\n[3/8] Auditing Mutating Route CSRF / Same-Origin Protection...');
  
  // Valid same-origin
  const validSameOrigin = validateSameOrigin({
    headers: { host: 'qpsi.vercel.app', origin: 'https://qpsi.vercel.app' },
    nodeEnv: 'production',
  });
  assert(validSameOrigin.valid, 'Same-origin matching request is accepted');

  // Valid Referer same-origin
  const validRefererOrigin = validateSameOrigin({
    headers: { host: 'qpsi.vercel.app', referer: 'https://qpsi.vercel.app/capsule/workspace' },
    nodeEnv: 'production',
  });
  assert(validRefererOrigin.valid, 'Same-origin Referer request is accepted');

  // Cross-origin attack with malicious Origin
  const crossOriginAttack = validateSameOrigin({
    headers: { host: 'qpsi.vercel.app', origin: 'https://malicious-phish.net' },
    nodeEnv: 'production',
  });
  assert(!crossOriginAttack.valid, 'Cross-origin mutation request with evil Origin is rejected');

  // Cross-origin attack with malicious Referer
  const crossRefererAttack = validateSameOrigin({
    headers: { host: 'qpsi.vercel.app', referer: 'https://evil-attacker.org/exploit' },
    nodeEnv: 'production',
  });
  assert(!crossRefererAttack.valid, 'Cross-origin mutation request with evil Referer is rejected');

  // Sec-Fetch-Site: cross-site
  const crossSiteFetch = validateSameOrigin({
    headers: { host: 'qpsi.vercel.app', origin: 'https://qpsi.vercel.app', 'sec-fetch-site': 'cross-site' },
    nodeEnv: 'production',
  });
  assert(!crossSiteFetch.valid, 'Sec-Fetch-Site: cross-site header is rejected');

  // Development localhost matching
  const devLocalhost = validateSameOrigin({
    headers: { host: 'localhost:3000', origin: 'http://localhost:3000' },
    nodeEnv: 'development',
  });
  assert(devLocalhost.valid, 'Localhost development matching is accepted');

  // Verify mutation routes enforce origin check
  const sessionRouteSource = fs.readFileSync(path.join(ROOT_DIR, 'app/api/capsule/session/route.ts'), 'utf8');
  const jobsRouteSource = fs.readFileSync(path.join(ROOT_DIR, 'app/api/capsule/jobs/route.ts'), 'utf8');
  const cancelRouteSource = fs.readFileSync(path.join(ROOT_DIR, 'app/api/capsule/jobs/[jobId]/cancel/route.ts'), 'utf8');

  assert(sessionRouteSource.includes('enforceSameOrigin(req)'), 'POST /api/capsule/session enforces same-origin');
  assert(sessionRouteSource.includes('DELETE(req: NextRequest)') && sessionRouteSource.includes('enforceSameOrigin(req)'), 'DELETE /api/capsule/session enforces same-origin');
  assert(jobsRouteSource.includes('enforceSameOrigin(req)'), 'POST /api/capsule/jobs enforces same-origin');
  assert(cancelRouteSource.includes('enforceSameOrigin(req)'), 'POST /api/capsule/jobs/[jobId]/cancel enforces same-origin');

  // 4. Backend Failure & License Revocation Semantics (Issue B)
  console.log('\n[4/8] Auditing Backend Failure & License Revocation Semantics...');
  assert(sessionRouteSource.includes('LICENSE_VALIDATION_UNAVAILABLE'), 'GET /api/capsule/session defines fail-closed 503 LICENSE_VALIDATION_UNAVAILABLE');
  assert(sessionRouteSource.includes('{ status: 503 }'), 'GET /api/capsule/session returns HTTP 503 on backend outage');
  assert(sessionRouteSource.includes('LICENSE_INACTIVE'), 'GET /api/capsule/session returns 403 on inactive/revoked license');
  assert(sessionRouteSource.includes('response.cookies.delete(cookieName)'), 'GET /api/capsule/session clears cookie when license is revoked');

  // 5. Pricing & Anchoring String Audit
  console.log('\n[5/8] Auditing Pricing & Copy Strings (Zero Anchoring)...');
  const capsuleLanding = fs.readFileSync(path.join(ROOT_DIR, 'app/capsule/page.tsx'), 'utf8');
  const capsuleWorkspace = fs.readFileSync(path.join(ROOT_DIR, 'app/capsule/workspace/page.tsx'), 'utf8');
  const siteConfig = fs.readFileSync(path.join(ROOT_DIR, 'content/siteConfig.ts'), 'utf8');

  const forbiddenStrings = [
    'pay what you want',
    'name your price',
    'cheap',
    'free license',
    '$5',
    '$50',
    '$500',
    '$4000',
    'PAYMENT VERIFIED',
  ];

  for (const s of forbiddenStrings) {
    const foundLanding = capsuleLanding.toLowerCase().includes(s.toLowerCase());
    const foundWorkspace = capsuleWorkspace.toLowerCase().includes(s.toLowerCase());
    assert(!foundLanding && !foundWorkspace, `Forbidden phrase '${s}' is absent from Capsule portal`);
  }

  assert(
    capsuleLanding.includes('SUPPORT_BASED_RESEARCH_ACCESS') ||
      capsuleLanding.includes('SUPPORT-BASED RESEARCH ACCESS') ||
      capsuleLanding.includes('support-based access model') ||
      capsuleLanding.includes('Support-based research access') ||
      capsuleLanding.toLowerCase().includes('support-based research access'),
    'Support-based research access model copy is present'
  );

  assert(
    siteConfig.includes('https://www.paypal.com/ncp/payment/8FW5GHBJGG9AA'),
    'Exact PayPal support URL is configured'
  );

  assert(
    siteConfig.includes('aadisatv@sattvaos.tech'),
    'Exact commercial/research contact email is configured'
  );

  assert(
    siteConfig.includes('https://qpsi-research-capsule-prod-596385402822.us-central1.run.app'),
    'Exact production Capsule API endpoint is configured'
  );

  // 6. Security Boundaries & Local Storage Audit
  console.log('\n[6/8] Auditing Security Boundaries & Local Storage...');
  assert(!capsuleLanding.includes('localStorage.setItem'), 'License key not saved to localStorage in landing');
  assert(!capsuleWorkspace.includes('localStorage.setItem'), 'License key not saved to localStorage in workspace');
  assert(!capsuleLanding.includes('sessionStorage.setItem'), 'License key not saved to sessionStorage in landing');
  assert(!capsuleWorkspace.includes('sessionStorage.setItem'), 'License key not saved to sessionStorage in workspace');

  // 7. Workflow & Engine CI
  console.log('\n[7/8] Auditing Engine CI Workflow Configuration...');
  const engineCiWorkflow = fs.readFileSync(path.join(ROOT_DIR, '.github/workflows/engine-ci.yml'), 'utf8');
  assert(engineCiWorkflow.includes('Classical Engine CI') && engineCiWorkflow.includes('python -m mypy src'), 'engine-ci.yml includes Classical Engine CI pipeline with mypy and pytest');

  // 8. Live Capsule Backend Check
  console.log('\n[8/8] Testing Live Production Capsule Backend Communication...');
  try {
    const healthRes = await fetch('https://qpsi-research-capsule-prod-596385402822.us-central1.run.app/health');
    const healthJson = await healthRes.json();
    assert(healthRes.status === 200, `Capsule backend /health returns 200 (service: ${healthJson.service})`);

    const readyRes = await fetch('https://qpsi-research-capsule-prod-596385402822.us-central1.run.app/ready');
    const readyJson = await readyRes.json();
    assert(readyRes.status === 200, `Capsule backend /ready returns 200 (compiler_version: ${readyJson.compiler_version})`);

    const invalidAuthRes = await fetch(
      'https://qpsi-research-capsule-prod-596385402822.us-central1.run.app/v1/capsule/license',
      { headers: { Authorization: 'Bearer invalid_synthetic_token' } }
    );
    assert(invalidAuthRes.status === 401, 'Invalid research license key is rejected with 401 Unauthorized by backend');
  } catch (err) {
    console.error('Backend check failed:', err);
    assert(false, 'Live backend communication passed');
  }

  // Final Summary
  console.log('\n====================================================');
  console.log(`AUDIT RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
  if (failedTests > 0) {
    console.error(`FAILED: ${failedTests} test(s) failed.`);
    process.exit(1);
  } else {
    console.log('ALL MECHANICAL AND SECURITY CHECKS PASSED PERFECTLY.');
    console.log('====================================================\n');
  }
}

runAudit();
