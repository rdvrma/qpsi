import crypto from 'crypto';
import { CapsuleSessionData } from './types';

const COOKIE_NAME = 'qpsi_capsule_session';
const SESSION_MAX_AGE_SECONDS = 4 * 60 * 60; // 4 hours
const DEV_FALLBACK_SECRET = 'qpsi-dev-capsule-session-secret-key-32b-seed';

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

/**
 * Validates the session secret for the given environment.
 */
export function validateSessionSecret(
  secret?: string | null,
  nodeEnv: string | undefined = process.env.NODE_ENV
): { valid: boolean; error?: string } {
  const isProd = nodeEnv === 'production';

  if (!secret || typeof secret !== 'string' || !secret.trim()) {
    if (isProd) {
      return { valid: false, error: 'QPSI_CAPSULE_SESSION_SECRET is required in production.' };
    }
    return { valid: true }; // Allowed in dev with fallback
  }

  const cleanSecret = secret.trim();

  // Check minimum entropy/length boundary (minimum 32 characters / 256 bits)
  if (cleanSecret.length < 32) {
    if (isProd) {
      return {
        valid: false,
        error: 'QPSI_CAPSULE_SESSION_SECRET must be at least 32 characters in production.',
      };
    }
  }

  // Check for obvious placeholder patterns
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

/**
 * Derives a 32-byte AES-256 key from the environment secret.
 * In production: FAILS CLOSED if secret is missing, too short, or a placeholder.
 * In development: Uses dev fallback if unconfigured.
 */
export function getDerivedKey(
  overrideSecret?: string | null,
  overrideEnv?: string
): Buffer {
  const env = overrideEnv !== undefined ? overrideEnv : process.env.NODE_ENV;
  const isProd = env === 'production';
  const secret = overrideSecret !== undefined ? overrideSecret : process.env.QPSI_CAPSULE_SESSION_SECRET;

  const validation = validateSessionSecret(secret, env);
  if (!validation.valid) {
    throw new Error(
      `[CapsuleSecurity] Session key derivation failed-closed: ${validation.error}`
    );
  }

  if (secret && secret.trim().length >= 32) {
    // Also ensure not placeholder in dev if provided
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
    throw new Error(
      '[CapsuleSecurity] Session key derivation failed-closed: No valid secret in production.'
    );
  }

  // Safe development/testing fallback only
  return crypto.createHash('sha256').update(DEV_FALLBACK_SECRET).digest();
}

/**
 * Encrypts session data into a sealed token string (IV.Ciphertext.AuthTag).
 * Throws error if key derivation fails closed in production.
 */
export function sealSession(data: CapsuleSessionData, secretOverride?: string, envOverride?: string): string {
  const key = getDerivedKey(secretOverride, envOverride);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  const serialized = JSON.stringify(data);
  const encrypted = Buffer.concat([cipher.update(serialized, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return `${iv.toString('base64url')}.${encrypted.toString('base64url')}.${authTag.toString('base64url')}`;
}

/**
 * Decrypts a sealed token string back into session data.
 * Returns null if invalid, tampered with, expired, or key derivation fails.
 */
export function unsealSession(token: string, secretOverride?: string, envOverride?: string): CapsuleSessionData | null {
  try {
    if (!token || typeof token !== 'string') return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [ivB64, encB64, tagB64] = parts;
    const iv = Buffer.from(ivB64, 'base64url');
    const encrypted = Buffer.from(encB64, 'base64url');
    const authTag = Buffer.from(tagB64, 'base64url');

    if (iv.length !== 12 || authTag.length !== 16) return null;

    const key = getDerivedKey(secretOverride, envOverride);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const parsed: CapsuleSessionData = JSON.parse(decrypted.toString('utf8'));

    // Check expiration
    if (!parsed.sessionExpiresAt || Date.now() > parsed.sessionExpiresAt) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function getSessionCookieName(): string {
  return COOKIE_NAME;
}

export function getSessionCookieOptions(maxAgeSeconds = SESSION_MAX_AGE_SECONDS) {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}
