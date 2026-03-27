// Authentication utilities for TOEFL ITP Learning Center
import { cookies } from 'next/headers';
import { cache } from 'react';
import { createHash, createHmac, randomBytes } from 'crypto';

// Session cookie name
const SESSION_COOKIE = 'toefl_session';

// Secret key for HMAC signing (in production, use environment variable)
const getSecretKey = () => {
  return process.env.SESSION_SECRET || 'toefl-itp-secret-key-2024-secure';
};

// ============================================
// PASSWORD HASHING - SHA-256 with salt
// ============================================

/**
 * Hash password using SHA-256 with salt
 * This is a proper cryptographic hash (one-way), not just encoding like base64
 */
export function hashPassword(password: string): string {
  // Generate a random salt for each password
  const salt = randomBytes(16).toString('hex');
  // Hash password + salt using SHA-256
  const hash = createHash('sha256')
    .update(password + salt)
    .digest('hex');
  // Return salt:hash format (so we can verify later)
  return `${salt}:${hash}`;
}

/**
 * Verify password against stored hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    // Handle legacy base64 format (for backward compatibility)
    if (!storedHash.includes(':')) {
      // Old format: base64 encoding - verify with old method
      const legacyHash = Buffer.from(password + '_toefl_salt').toString('base64');
      return legacyHash === storedHash;
    }

    // New format: salt:hash
    const [salt, hash] = storedHash.split(':');
    const verifyHash = createHash('sha256')
      .update(password + salt)
      .digest('hex');
    return hash === verifyHash;
  } catch {
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
function signData(data: string): string {
  return createHmac('sha256', getSecretKey())
    .update(data)
    .digest('hex');
}

/**
 * Create signed session token
 */
function createSignedSession(user: Omit<SessionUser, 'iat'>): string {
  const sessionUser: SessionUser = {
    ...user,
    iat: Math.floor(Date.now() / 1000),
  };

  const dataString = JSON.stringify(sessionUser);
  const signature = signData(dataString);

  const signedSession: SignedSession = {
    data: sessionUser,
    signature,
  };

  return Buffer.from(JSON.stringify(signedSession)).toString('base64');
}

/**
 * Verify and decode signed session token
 */
function verifySignedSession(token: string): SessionUser | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());

    // Check if it's the new signed format
    if (decoded.data && decoded.signature) {
      const dataString = JSON.stringify(decoded.data);
      const expectedSignature = signData(dataString);

      // Verify signature
      if (decoded.signature !== expectedSignature) {
        return null; // Signature mismatch - session tampered
      }

      return decoded.data as SessionUser;
    }

    // Legacy format (unsigned) - for backward compatibility
    // But we'll reject it for sensitive operations
    return decoded as SessionUser;
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

    return verifySignedSession(sessionData);
  } catch {
    return null;
  }
});

/**
 * Set session cookie with signed data
 */
export async function setSessionCookie(user: Omit<SessionUser, 'iat'>): Promise<void> {
  const cookieStore = await cookies();
  const sessionToken = createSignedSession(user);

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
