// Rate Limiting Utility - Serverless Compatible
// Uses Supabase for persistence (works on Vercel, AWS Lambda, etc.)

import { createSupabaseServerClientSimple } from '@/lib/supabase/server';

export interface RateLimitConfig {
  windowMs: number;    // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

// Table name for rate limiting
const RATE_LIMIT_TABLE = 'rate_limits';

/**
 * Get client identifier for rate limiting
 * Uses X-Forwarded-For header (for proxies) or falls back to connection info
 */
export function getClientIdentifier(request: Request): string {
  // Check for forwarded header (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // Take the first IP in the chain (original client)
    return forwarded.split(',')[0].trim();
  }

  // Check for real-ip header (some proxies)
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // Fallback identifier
  return 'unknown';
}

/**
 * Clean up expired rate limit entries
 * Called periodically to keep table clean
 */
async function cleanupExpiredEntries(): Promise<void> {
  try {
    const supabase = createSupabaseServerClientSimple();
    const now = new Date().toISOString();

    await supabase
      .from(RATE_LIMIT_TABLE)
      .delete()
      .lt('reset_at', now);
  } catch (error) {
    // Silently fail - cleanup is not critical
    console.error('Rate limit cleanup error:', error);
  }
}

/**
 * Check rate limit for a given key using Supabase
 * This works in serverless environments like Vercel
 *
 * @param key - Unique identifier (e.g., IP address or user ID)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export async function checkRateLimit(
  key: string,
  config: RateLimitConfig = { windowMs: 60000, maxRequests: 5 }
): Promise<RateLimitResult> {
  const supabase = createSupabaseServerClientSimple();
  const now = Date.now();
  const resetTime = now + config.windowMs;
  const resetTimeISO = new Date(resetTime).toISOString();

  try {
    // Try to get existing entry
    const { data: existing, error: fetchError } = await supabase
      .from(RATE_LIMIT_TABLE)
      .select('*')
      .eq('key', key)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 = no rows found, other errors are actual problems
      console.error('Rate limit fetch error:', fetchError);
      // Fail open - don't block requests if rate limiting fails
      return { success: true, remaining: config.maxRequests, resetTime };
    }

    // No existing entry or expired - create new
    if (!existing || new Date(existing.reset_at).getTime() < now) {
      const { error: insertError } = await supabase
        .from(RATE_LIMIT_TABLE)
        .upsert({
          key,
          count: 1,
          reset_at: resetTimeISO,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'key' });

      if (insertError) {
        console.error('Rate limit insert error:', insertError);
        // Fail open
        return { success: true, remaining: config.maxRequests, resetTime };
      }

      // Occasionally clean up old entries (1% chance)
      if (Math.random() < 0.01) {
        cleanupExpiredEntries().catch(() => {});
      }

      return {
        success: true,
        remaining: config.maxRequests - 1,
        resetTime,
      };
    }

    // Entry exists and is within window
    const currentCount = existing.count || 0;

    if (currentCount >= config.maxRequests) {
      return {
        success: false,
        remaining: 0,
        resetTime: new Date(existing.reset_at).getTime(),
      };
    }

    // Increment count
    const newCount = currentCount + 1;
    const { error: updateError } = await supabase
      .from(RATE_LIMIT_TABLE)
      .update({
        count: newCount,
        updated_at: new Date().toISOString(),
      })
      .eq('key', key);

    if (updateError) {
      console.error('Rate limit update error:', updateError);
    }

    return {
      success: true,
      remaining: config.maxRequests - newCount,
      resetTime: new Date(existing.reset_at).getTime(),
    };
  } catch (error) {
    console.error('Rate limit error:', error);
    // Fail open - don't block requests if rate limiting fails
    return { success: true, remaining: config.maxRequests, resetTime };
  }
}

/**
 * Rate limit preset configurations
 */
export const RATE_LIMITS = {
  LOGIN: { windowMs: 60000, maxRequests: 5 },      // 5 login attempts per minute
  REGISTER: { windowMs: 3600000, maxRequests: 3 }, // 3 registrations per hour
  API: { windowMs: 60000, maxRequests: 100 },      // 100 API calls per minute
  ADMIN: { windowMs: 60000, maxRequests: 20 },     // 20 admin actions per minute
} as const;
