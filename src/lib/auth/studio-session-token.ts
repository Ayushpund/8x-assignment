import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_PREFIX = "studio_";
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type StudioSessionPayload = {
  sub: string;
  email: string;
  exp: number;
};

function authSecret(): string {
  const fromEnv = process.env.STUDIO_AUTH_SECRET?.trim();
  if (fromEnv && fromEnv.length >= 16) return fromEnv;
  const gemini = process.env.GEMINI_API_KEY?.trim();
  if (gemini && gemini.length >= 20) {
    return createHmac("sha256", "studio-fallback").update(gemini).digest("hex");
  }
  return "dev-studio-auth-change-me-in-production";
}

function signPayload(encoded: string): string {
  return createHmac("sha256", authSecret()).update(encoded).digest("base64url");
}

export function createStudioSessionToken(user: {
  id: string;
  email: string;
}): string {
  const payload: StudioSessionPayload = {
    sub: user.id,
    email: user.email.toLowerCase(),
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${TOKEN_PREFIX}${encoded}.${signPayload(encoded)}`;
}

export function verifyStudioSessionToken(
  token: string
): { ok: true; userId: string; email: string } | { ok: false } {
  if (!token.startsWith(TOKEN_PREFIX)) return { ok: false };
  const rest = token.slice(TOKEN_PREFIX.length);
  const dot = rest.lastIndexOf(".");
  if (dot <= 0) return { ok: false };
  const encoded = rest.slice(0, dot);
  const sig = rest.slice(dot + 1);
  const expected = signPayload(encoded);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return { ok: false };
  } catch {
    return { ok: false };
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    ) as StudioSessionPayload;
    if (!payload.sub || !payload.email || !payload.exp) return { ok: false };
    if (Date.now() > payload.exp) return { ok: false };
    return { ok: true, userId: payload.sub, email: payload.email };
  } catch {
    return { ok: false };
  }
}
