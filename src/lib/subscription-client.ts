"use client";

import type { AuthUser } from "@/store/auth-store";
import { getClientAuthToken } from "@/lib/auth/client-auth-token";

export type UserPlan = "free" | "pro";

export async function fetchUserPlanFromServer(): Promise<{
  plan: UserPlan;
  proSince: string | null;
} | null> {
  const token = await getClientAuthToken();
  if (!token) return null;

  const res = await fetch("/api/billing/plan", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    plan?: UserPlan;
    proSince?: string | null;
  };
  return {
    plan: data.plan === "pro" ? "pro" : "free",
    proSince: data.proSince ?? null,
  };
}

export async function activateProOnServer(orderId?: string): Promise<{
  plan: UserPlan;
  proSince: string;
  alreadyPro: boolean;
} | null> {
  const token = await getClientAuthToken();
  if (!token) return null;

  const res = await fetch("/api/billing/activate-pro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orderId }),
  });

  if (!res.ok) return null;

  const data = (await res.json()) as {
    plan?: UserPlan;
    proSince?: string;
    alreadyPro?: boolean;
  };

  return {
    plan: data.plan === "pro" ? "pro" : "free",
    proSince: data.proSince ?? new Date().toISOString(),
    alreadyPro: Boolean(data.alreadyPro),
  };
}

export function mergePlanIntoUser(
  user: AuthUser,
  plan: UserPlan,
  proSince: string | null
): AuthUser {
  return {
    ...user,
    plan,
    proSince: proSince ?? user.proSince,
  };
}

export function isProUser(user: AuthUser | null): boolean {
  return user?.plan === "pro";
}
