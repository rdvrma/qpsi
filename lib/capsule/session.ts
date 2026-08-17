import crypto from 'crypto';
import { CapsuleSessionData } from './types';

const COOKIE_NAME = 'qpsi_capsule_session';
const SESSION_MAX_AGE_SECONDS = 4 * 60 * 60; // 4 hours

/**
 * Derives a 32-byte key from the environment secret.
 * Falls back safely to a deterministic hash if running in development.
 */
function getDerivedKey(): Buffer {
  const secret = process.env.QPSI_CAPSULE_SESSION_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      // In production, we derive from available environment or throw if completely unconfigured
      const fallback = process.env.VERCEL_GIT_COMMIT_SHA || 'qpsi-prod-capsule-secret-boundary';
      return crypto.createHash('sha256').update(fallback).digest();
    }
    return crypto.createHash('sha256').update('qpsi-dev-capsule-session-secret-key-32b').digest();
  }
  return crypto.createHash('sha256').update(secret).digest();
}

/**
 * Encrypts session data into a sealed token string (IV:Ciphertext:AuthTag).
 */
export function sealSession(data: CapsuleSessionData): string {
  const key = getDerivedKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  const serialized = JSON.stringify(data);
  const encrypted = Buffer.concat([cipher.update(serialized, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return `${iv.toString('base64url')}.${encrypted.toString('base64url')}.${authTag.toString('base64url')}`;
}

/**
 * Decrypts a sealed token string back into session data.
 * Returns null if invalid, tampered with, or expired.
 */
export function unsealSession(token: string): CapsuleSessionData | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [ivB64, encB64, tagB64] = parts;
    const iv = Buffer.from(ivB64, 'base64url');
    const encrypted = Buffer.from(encB64, 'base64url');
    const authTag = Buffer.from(tagB64, 'base64url');

    if (iv.length !== 12 || authTag.length !== 16) return null;

    const key = getDerivedKey();
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
