// Authentication utilities for TOEFL ITP Learning Center
import { cookies } from 'next/headers';
import { cache } from 'react';
import { createHmac, randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';

// Session cookie name
const SESSION_COOKIE = 'toefl_session';

// ============================================
// SECURITY: Session Secret - NO FALLBACK
// ============================================
// IMPORTANT: You MUST set SESSION_SECRET in your environment variables!
// Generate a secure random string: openssl rand -base64 32
function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    // In development, show warning but still fail gracefully
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ WARNING: SESSION_SECRET not set! Using insecure development secret.');
      console.warn('⚠️ Set SESSION_SECRET in your .env file for production!');
      return 'dev-insecure-secret-please-set-session-secret-in-production';
    }

    throw new Error(
      'SESSION_SECRET environment variable is required for security. ' +
      'Generate one with: openssl rand -base64 32'
    );
  }

  return secret;
}

// ============================================
// PASSWORD HASHING - bcrypt (Industry Standard)
// ============================================

const BCRYPT_ROUNDS = 12; // ~250ms hash time, good balance

/**
 * Hash password using bcrypt (slow hashing algorithm)
 * bcrypt is designed for passwords - it's slow by design to resist brute force
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
  return bcrypt.hash(password, salt);
}

/**
 * Verify password against stored hash
 * Supports both bcrypt (new) and legacy SHA-256 (old) formats
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    // Check if it's bcrypt format (starts with $2a$, $2b$, or $2y$)
    if (storedHash.startsWith('$2')) {
      return bcrypt.compare(password, storedHash);
    }

    // Check if it's our SHA-256 salt:hash format
    if (storedHash.includes(':') && storedHash.length > 40) {
      const [salt, hash] = storedHash.split(':');
      const crypto = await import('crypto');
      const verifyHash = crypto.createHash('sha256')
        .update(password + salt)
        .digest('hex');
      return hash === verifyHash;
    }

    // Legacy base64 format (oldest) - for backward compatibility
    const legacyHash = Buffer.from(password + '_toefl_salt').toString('base64');
    return legacyHash === storedHash;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}

// ============================================
// SESSION MANAGEMENT - Signed cookies
// ============================================

export interface SessionUser {
  id: string;
  username: string;
  name: string;
  role: 'student' | 'admin';
  iat: number; // Issued at timestamp
}

interface SignedSession {
  data: SessionUser;
  signature: string;
}

/**
 * Create HMAC signature for session data
 */
function signData(data: string, secret: string): string {
  return createHmac('sha256', secret)
    .update(data)
    .digest('hex');
}

/**
 * Create signed session token
 */
function createSignedSession(user: Omit<SessionUser, 'iat'>, secret: string): string {
  const sessionUser: SessionUser = {
    ...user,
    iat: Math.floor(Date.now() / 1000),
  };

  const dataString = JSON.stringify(sessionUser);
  const signature = signData(dataString, secret);

  const signedSession: SignedSession = {
    data: sessionUser,
    signature,
  };

  return Buffer.from(JSON.stringify(signedSession)).toString('base64');
}

/**
 * Verify and decode signed session token
 */
function verifySignedSession(token: string, secret: string): SessionUser | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());

    // Check if it's the new signed format
    if (decoded.data && decoded.signature) {
      const dataString = JSON.stringify(decoded.data);
      const expectedSignature = signData(dataString, secret);

      // Verify signature
      if (decoded.signature !== expectedSignature) {
        return null; // Signature mismatch - session tampered
      }

      return decoded.data as SessionUser;
    }

    // Legacy format (unsigned) - reject for security
    return null;
  } catch {
    return null;
  }
}

// ============================================
// PUBLIC API
// ============================================

/**
 * Get current user from session cookie
 * Verifies signature to ensure session hasn't been tampered with
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  try {
    const cookieStore = await cookies();
    const sessionData = cookieStore.get(SESSION_COOKIE)?.value;

    if (!sessionData) return null;

    const secret = getSessionSecret();
    return verifySignedSession(sessionData, secret);
  } catch {
    return null;
  }
});

/**
 * Set session cookie with signed data
 */
export async function setSessionCookie(user: Omit<SessionUser, 'iat'>): Promise<void> {
  const cookieStore = await cookies();
  const secret = getSessionSecret();
  const sessionToken = createSignedSession(user, secret);

  cookieStore.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/',
  });
}

/**
 * Clear session cookie
 */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/**
 * Check if session is secure (signed)
 */
export async function isSecureSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionData = cookieStore.get(SESSION_COOKIE)?.value;

    if (!sessionData) return false;

    const decoded = JSON.parse(Buffer.from(sessionData, 'base64').toString());
    return !!(decoded.data && decoded.signature);
  } catch {
    return false;
  }
}
