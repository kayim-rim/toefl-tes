'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type UserTier = 'free' | 'tes' | 'student';

interface UserData {
  id: string;
  username: string;
  name: string;
  role: string;
  tier: UserTier;
  tierExpiresAt: string | null;
}

interface UseLearningAccessResult {
  user: UserData | null;
  isLoading: boolean;
  hasAccess: boolean;
  effectiveTier: UserTier;
}

// Check if tier is active
function isTierActive(tier: UserTier, expiresAt: string | null): boolean {
  if (tier === 'free') return true;
  if (!expiresAt) return true;
  return new Date(expiresAt) > new Date();
}

export function useLearningAccess(redirectIfNoAccess: boolean = true): UseLearningAccessResult {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAccess = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        if (redirectIfNoAccess) {
          router.push('/login?redirect=/learn');
        }
        return;
      }

      const data = await response.json();
      const userData = data.user as UserData;
      setUser(userData);

      // Check if user has learning access (must be student tier)
      const effectiveTier = isTierActive(userData.tier, userData.tierExpiresAt) 
        ? userData.tier 
        : 'free';

      if (effectiveTier !== 'student' && redirectIfNoAccess) {
        // Redirect to learn page which will show upgrade prompt
        router.push('/learn');
      }
    } catch (err) {
      if (redirectIfNoAccess) {
        router.push('/login?redirect=/learn');
      }
    } finally {
      setIsLoading(false);
    }
  }, [router, redirectIfNoAccess]);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  const effectiveTier = user 
    ? (isTierActive(user.tier, user.tierExpiresAt) ? user.tier : 'free')
    : 'free';
  const hasAccess = effectiveTier === 'student';

  return { user, isLoading, hasAccess, effectiveTier };
}
