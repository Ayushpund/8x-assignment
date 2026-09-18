import { getFirebasePublicConfig, isFirebaseConfigured } from "@/lib/firebase/config";
import { verifyStudioSessionToken } from "@/lib/auth/studio-session-token";

export type VerifiedStudioUser = {
  userId: string;
  email: string;
};

function parseBearer(header: string | null): string | null {
  if (!header?.startsWith("Bearer ")) return null;
  const token = header.slice("Bearer ".length).trim();
  return token || null;
}

async function verifyFirebaseIdToken(
  idToken: string
): Promise<VerifiedStudioUser | null> {
  const apiKey = getFirebasePublicConfig()?.apiKey;
  if (!apiKey) return null;

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    }
  );

  const data = (await res.json()) as {
    users?: Array<{ localId?: string; email?: string }>;
    error?: { message?: string };
  };

  if (!res.ok || !data.users?.[0]?.localId) return null;
  const u = data.users[0];
  return {
    userId: u.localId!,
    email: (u.email ?? "").toLowerCase(),
  };
}

/** Require a signed-in user before hosted or BYOK generation. */
export async function verifyGenerationAuth(
  request: Request
): Promise<
  { ok: true; user: VerifiedStudioUser } | { ok: false; error: string }
> {
  const token = parseBearer(request.headers.get("authorization"));
  if (!token) {
    return {
      ok: false,
      error: "Sign in to generate — log in or create an account first.",
    };
  }

  if (isFirebaseConfigured() && !token.startsWith("studio_")) {
    const user = await verifyFirebaseIdToken(token);
    if (user) return { ok: true, user };
    return {
      ok: false,
      error: "Session expired — please log in again.",
    };
  }

  const local = verifyStudioSessionToken(token);
  if (local.ok) {
    return { ok: true, user: { userId: local.userId, email: local.email } };
  }

  return {
    ok: false,
    error: "Sign in to generate — log in or create an account first.",
  };
}
