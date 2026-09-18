"use client";

import { useEffect } from "react";
import { fetchUserPlanFromServer } from "@/lib/subscription-client";
import { useAuthStore } from "@/store/auth-store";

/** Merge server subscription (Cashfree Pro) into the signed-in user. */
export function SubscriptionSync() {
  const user = useAuthStore((s) => s.user);
  const authReady = useAuthStore((s) => s.authReady);
  const patchUser = useAuthStore((s) => s.patchUser);

  useEffect(() => {
    if (!authReady || !user) return;
    void fetchUserPlanFromServer().then((plan) => {
      if (!plan) return;
      patchUser({
        plan: plan.plan,
        proSince: plan.plan === "pro" ? plan.proSince : null,
      });
    });
  }, [authReady, user, patchUser]);

  return null;
}
