// Tier Access Control for TOEFL ITP Learning Center
import type { UserTier } from './auth';

// Tier levels for comparison (higher = more access)
export const TIER_LEVELS: Record<UserTier, number> = {
  free: 0,
  tes: 1,
  student: 2
};

// Package IDs that each tier can access
export const TIER_PACKAGE_ACCESS: Record<UserTier, string[]> = {
  free: ['package_A', 'package_B'],
  tes: ['package_A', 'package_B', 'package_C', 'package_D'],
  student: ['package_A', 'package_B', 'package_C', 'package_D']
};

// Feature access by tier
export const TIER_FEATURES = {
  free: {
    testPackages: ['package_A', 'package_B'],
    learningAccess: false,
    detailedExplanation: false,
    historyAnalytics: false,
    certificate: false,
    maxTestsPerDay: 3
  },
  tes: {
    testPackages: ['package_A', 'package_B', 'package_C', 'package_D'],
    learningAccess: false,
    detailedExplanation: true,
    historyAnalytics: true,
    certificate: true,
    maxTestsPerDay: Infinity
  },
  student: {
    testPackages: ['package_A', 'package_B', 'package_C', 'package_D'],
    learningAccess: true,
    detailedExplanation: true,
    historyAnalytics: true,
    certificate: true,
    maxTestsPerDay: Infinity
  }
} as const;

/**
 * Check if a tier is active (not expired)
 */
export function isTierActive(tier: UserTier, expiresAt: string | null): boolean {
  // Free tier is always active
  if (tier === 'free') return true;

  // If no expiry set, consider it active (lifetime)
  if (!expiresAt) return true;

  // Check if not expired
  return new Date(expiresAt) > new Date();
}

/**
 * Check if user has access to a specific package
 */
export function hasPackageAccess(
  userTier: UserTier,
  tierExpiresAt: string | null,
  packageId: string
): boolean {
  // First check if tier is active
  if (!isTierActive(userTier, tierExpiresAt)) {
    // Tier expired, fallback to free
    return TIER_PACKAGE_ACCESS.free.includes(packageId);
  }

  return TIER_PACKAGE_ACCESS[userTier].includes(packageId);
}

/**
 * Check if user has access to a feature
 */
export function hasFeatureAccess(
  userTier: UserTier,
  tierExpiresAt: string | null,
  feature: keyof typeof TIER_FEATURES.free
): boolean {
  // First check if tier is active
  const effectiveTier = isTierActive(userTier, tierExpiresAt) ? userTier : 'free';

  return TIER_FEATURES[effectiveTier][feature] as boolean;
}

/**
 * Check if user's tier meets minimum requirement
 */
export function meetsMinimumTier(
  userTier: UserTier,
  tierExpiresAt: string | null,
  minimumTier: UserTier
): boolean {
  // First check if tier is active
  const effectiveTier = isTierActive(userTier, tierExpiresAt) ? userTier : 'free';

  return TIER_LEVELS[effectiveTier] >= TIER_LEVELS[minimumTier];
}

/**
 * Get effective tier (considering expiry)
 * Returns 'free' if tier is expired
 */
export function getEffectiveTier(
  userTier: UserTier,
  tierExpiresAt: string | null
): UserTier {
  return isTierActive(userTier, tierExpiresAt) ? userTier : 'free';
}

/**
 * Get list of packages user cannot access
 */
export function getRestrictedPackages(
  userTier: UserTier,
  tierExpiresAt: string | null
): string[] {
  const effectiveTier = getEffectiveTier(userTier, tierExpiresAt);
  const allPackages = ['package_A', 'package_B', 'package_C', 'package_D'];
  const accessiblePackages = TIER_PACKAGE_ACCESS[effectiveTier];

  return allPackages.filter(pkg => !accessiblePackages.includes(pkg));
}

/**
 * Get tier display name in Indonesian
 */
export function getTierDisplayName(tier: UserTier): string {
  const names: Record<UserTier, string> = {
    free: 'Gratis',
    tes: 'Tes',
    student: 'Student'
  };
  return names[tier];
}

/**
 * Get tier price
 */
export function getTierPrice(tier: UserTier): number {
  const prices: Record<UserTier, number> = {
    free: 0,
    tes: 10000,
    student: 25000
  };
  return prices[tier];
}

/**
 * Format price in Indonesian Rupiah
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}
