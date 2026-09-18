"use client";

import { getFirebaseAuth } from "@/lib/firebase/client";
import { isFirebaseConfigured } from "@/lib/firebase/config";

const LOCAL_TOKEN_KEY = "studio-session-token";

export function persistLocalStudioToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) sessionStorage.setItem(LOCAL_TOKEN_KEY, token);
  else sessionStorage.removeItem(LOCAL_TOKEN_KEY);
}

export function readLocalStudioToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(LOCAL_TOKEN_KEY);
}

/** Bearer token for /api/generate (Firebase ID token or local studio session). */
export async function getClientAuthToken(): Promise<string | null> {
  if (isFirebaseConfigured()) {
    const auth = getFirebaseAuth();
    const user = auth?.currentUser;
    if (!user) return null;
    try {
      return await user.getIdToken();
    } catch {
      return null;
    }
  }
  return readLocalStudioToken();
}
