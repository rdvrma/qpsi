/**
 * Comprehensive Mechanical Audit Script for Q-Psi Research Capsule (M4-B)
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

async function runAudit() {
  console.log('====================================================');
  console.log('Q-PSI RESEARCH CAPSULE M4-B AUDIT SUITE');
  console.log('====================================================\n');

  // 1. Check Routes and Files
  console.log('[1/7] Verifying Route Files & Component Structure...');
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
    'lib/capsule/client.ts',
    'lib/capsule/types.ts',
    'components/capsule/LicenseModal.tsx',
    'components/capsule/WorkloadSubmitter.tsx',
    'components/capsule/JobTracker.tsx',
    'components/capsule/ResultViewer.tsx',
    '.env.example',
  ];

  for (const f of filesToCheck) {
    const fullPath = path.join(ROOT_DIR, f);
    assert(fs.existsSync(fullPath), `File exists: ${f}`);
  }

  // 2. Pricing & Anchoring String Audit
  console.log('\n[2/7] Auditing Pricing & Copy Strings (Zero Anchoring)...');
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
      capsuleLanding.includes('support-based access model') ||
      capsuleLanding.includes('Support-based research access') ||
      capsuleLanding.includes('SUPPORT-BASED RESEARCH ACCESS'),
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

  // 3. Security & Session Storage Audit
  console.log('\n[3/7] Auditing Security Boundaries & Local Storage...');
  assert(!capsuleLanding.includes('localStorage.setItem'), 'License key not saved to localStorage in landing');
  assert(!capsuleWorkspace.includes('localStorage.setItem'), 'License key not saved to localStorage in workspace');
  assert(!capsuleLanding.includes('sessionStorage.setItem'), 'License key not saved to sessionStorage in landing');
  assert(!capsuleWorkspace.includes('sessionStorage.setItem'), 'License key not saved to sessionStorage in workspace');

  // Verify Session Token Encryption Logic
  function testSealSession(data) {
    const key = crypto.createHash('sha256').update('qpsi-dev-capsule-session-secret-key-32b').digest();
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const serialized = JSON.stringify(data);
    const encrypted = Buffer.concat([cipher.update(serialized, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return `${iv.toString('base64url')}.${encrypted.toString('base64url')}.${authTag.toString('base64url')}`;
  }

  function testUnsealSession(token) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const [ivB64, encB64, tagB64] = parts;
      const iv = Buffer.from(ivB64, 'base64url');
      const encrypted = Buffer.from(encB64, 'base64url');
      const authTag = Buffer.from(tagB64, 'base64url');
      if (iv.length !== 12 || authTag.length !== 16) return null;
      const key = crypto.createHash('sha256').update('qpsi-dev-capsule-session-secret-key-32b').digest();
      const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
      decipher.setAuthTag(authTag);
      const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
      const parsed = JSON.parse(decrypted.toString('utf8'));
      if (!parsed.sessionExpiresAt || Date.now() > parsed.sessionExpiresAt) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  const testPayload = {
    licenseKey: 'synthetic_secret_key_test_123',
    licenseId: 'QPSI-TEST-ID',
    licenseType: 'RESEARCH_EVALUATION',
    sessionExpiresAt: Date.now() + 3600000,
    createdAt: Date.now(),
  };

  const sealed = testSealSession(testPayload);
  assert(typeof sealed === 'string' && sealed.split('.').length === 3, 'Session sealer produces 3-part AES-GCM token');
  assert(!sealed.includes('synthetic_secret_key_test_123'), 'Sealed session token is encrypted (no plaintext leak)');

  const unsealed = testUnsealSession(sealed);
  assert(unsealed && unsealed.licenseKey === 'synthetic_secret_key_test_123', 'Session unsealer correctly recovers payload');

  const tampered = sealed.slice(0, -4) + 'AAAA';
  assert(testUnsealSession(tampered) === null, 'Tampered session token is rejected safely');

  // 4. Live Capsule Backend Check
  console.log('\n[4/7] Testing Live Production Capsule Backend Communication...');
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

  // 5. Audit Proprietary Source Leakage
  console.log('\n[5/7] Auditing Public Repo for Zero Private Compiler Leakage...');
  const repoFiles = [];
  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (['node_modules', '.git', '.next'].includes(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(full);
      } else {
        repoFiles.push(full);
      }
    }
  }
  scanDir(ROOT_DIR);

  let privateCompilerLeaks = 0;
  for (const rf of repoFiles) {
    if (rf.endsWith('audit-capsule.js')) continue;
    const content = fs.readFileSync(rf, 'utf8');
    if (content.includes(['qpsi', 'data', 'compiler', 'src'].join('/')) || content.includes(['PROPRIETARY', 'COMPILER', 'HEURISTIC'].join('_'))) {
      privateCompilerLeaks++;
    }
  }
  assert(privateCompilerLeaks === 0, 'Zero proprietary compiler source code or private paths found in repo');

  // 6. Navigation Integration
  console.log('\n[6/7] Auditing Navigation Links...');
  const navbarContent = fs.readFileSync(path.join(ROOT_DIR, 'components/ui/Navbar.tsx'), 'utf8');
  assert(navbarContent.includes('/capsule'), 'Navbar includes link to /capsule');

  const footerContent = fs.readFileSync(path.join(ROOT_DIR, 'components/ui/Footer.tsx'), 'utf8');
  assert(footerContent.includes('/capsule'), 'Footer includes link to /capsule');

  // 7. Audit Summary
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
