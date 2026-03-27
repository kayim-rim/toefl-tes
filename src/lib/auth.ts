// Authentication utilities for TOEFL ITP Learning Center
import { cookies } from 'next/headers';
import { cache } from 'react';

// Session cookie name
const SESSION_COOKIE = 'toefl_session';

// Simple password hashing (for demo - in production use bcrypt)
export function hashPassword(password: string): string {
  // Simple hash for demo - in production use bcrypt
  return Buffer.from(password + '_toefl_salt').toString('base64');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Session management
export interface SessionUser {
  id: string;
  username: string;
  name: string;
  role: 'student' | 'admin';
}

// Get current user from session
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  try {
    const cookieStore = await cookies();
    const sessionData = cookieStore.get(SESSION_COOKIE)?.value;
    
    if (!sessionData) return null;
    
    const user = JSON.parse(Buffer.from(sessionData, 'base64').toString());
    return user;
  } catch {
    return null;
  }
});

// Set session cookie
export async function setSessionCookie(user: SessionUser): Promise<void> {
  const cookieStore = await cookies();
  const sessionData = Buffer.from(JSON.stringify(user)).toString('base64');
  
  cookieStore.set(SESSION_COOKIE, sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/',
  });
}

// Clear session
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
