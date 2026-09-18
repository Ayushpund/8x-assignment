import type { AuthUser } from "@/store/auth-store";

export function normalizeAuthUser(
  user: Omit<AuthUser, "plan" | "proSince"> &
    Partial<Pick<AuthUser, "plan" | "proSince">>
): AuthUser {
  return {
    ...user,
    plan: user.plan === "pro" ? "pro" : "free",
    proSince: user.proSince ?? null,
  };
}
