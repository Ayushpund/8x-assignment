const WINDOW_MS = 60_000;
const MAX_REQUESTS =
  process.env.NODE_ENV === "development" ? 80 : 30;

type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { timestamps: [] };
    buckets.set(key, bucket);
  }

  bucket.timestamps = bucket.timestamps.filter((t) => now - t < WINDOW_MS);

  if (bucket.timestamps.length >= MAX_REQUESTS) {
    const oldest = bucket.timestamps[0]!;
    const retryAfterSec = Math.ceil((WINDOW_MS - (now - oldest)) / 1000);
    return { ok: false, retryAfterSec };
  }

  bucket.timestamps.push(now);
  return { ok: true };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "local";
}
