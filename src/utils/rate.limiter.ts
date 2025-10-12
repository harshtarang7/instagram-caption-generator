import { NextRequest } from "next/server";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitRecord>();

if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of store.entries()) {
      if (now > value.resetTime) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export function createRateLimiter(maxRequests: number, windowMs: number) {
  return async function checkRateLimit(req: NextRequest) {
    const ip = req.headers.get("cf-connecting-ip") || // Cloudflare
              req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
              req.headers.get("x-real-ip") ||
              "unknown";

    const key = `${maxRequests}_${windowMs}_${ip}`;
    const now = Date.now();

    let record = store.get(key);

    if (!record || now >= record.resetTime) {
      record = {
        count: 1,
        resetTime: now + windowMs,
      };
      store.set(key, record);

      return {
        allowed: true,
        limit: maxRequests,
        remaining: maxRequests - 1,
        reset: Math.ceil(record.resetTime / 1000),
      };
    }

    record.count++;
    
    const allowed = record.count <= maxRequests;
    const remaining = Math.max(0, maxRequests - record.count);

    return {
      allowed,
      limit: maxRequests,
      remaining,
      reset: Math.ceil(record.resetTime / 1000),
    };
  };
}

export const captionLimiter = createRateLimiter(
  5,             
  60 * 60 * 1000   
);

export const globalLimiter = createRateLimiter(
  50,                
  60 * 60 * 1000   
);

export const premiumLimiter = createRateLimiter(
  100,             
  60 * 60 * 1000   
);
