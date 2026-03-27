// Audio Cache System for TTS
// Caches generated audio in memory for faster playback

interface CacheEntry {
  audioUrl: string;
  timestamp: number;
  size: number;
}

class AudioCache {
  private cache: Map<string, CacheEntry> = new Map();
  private maxSize: number = 100; // Maximum cache entries
  private ttl: number = 60 * 60 * 1000; // 1 hour TTL

  get(key: string): CacheEntry | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if expired
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry;
  }

  set(key: string, audioUrl: string, size: number): void {
    // Evict oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      audioUrl,
      timestamp: Date.now(),
      size
    });
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  getStats(): { entries: number; totalSize: number } {
    let totalSize = 0;
    this.cache.forEach(entry => {
      totalSize += entry.size;
    });
    return {
      entries: this.cache.size,
      totalSize
    };
  }
}

// Singleton instance
export const audioCache = new AudioCache();

// Generate cache key from text, voice, and speed
export function generateCacheKey(text: string, voice: string = 'tongtong', speed: number = 1.0): string {
  // Create a simple hash of the text + voice + speed
  const str = `${text}:${voice}:${speed}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `tts_${Math.abs(hash)}`;
}
