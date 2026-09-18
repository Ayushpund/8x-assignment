"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { CashfreeCheckout } from "@/components/billing/cashfree-checkout";
import { ProCelebration } from "@/components/billing/pro-celebration";
import {
  activateProOnServer,
  mergePlanIntoUser,
} from "@/lib/subscription-client";
import { setFirestoreProPlan } from "@/lib/firebase/users";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { useAuthStore } from "@/store/auth-store";

export function BillingPageView() {
  const searchParams = useSearchParams();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const status = searchParams.get("status");
  const orderId = searchParams.get("order_id");
  const [celebration, setCelebration] = useState<"new" | "welcome-back" | null>(
    null
  );
  const [activating, setActivating] = useState(false);
  const activatedRef = useRef(false);

  useEffect(() => {
    if (status !== "success" || !user || activatedRef.current) return;
    activatedRef.current = true;

    let cancelled = false;
    setActivating(true);

    void (async () => {
      const result = await activateProOnServer(orderId ?? undefined);
      if (cancelled || !result) {
        setActivating(false);
        return;
      }

      if (isFirebaseConfigured()) {
        try {
          await setFirestoreProPlan(user.id, orderId ?? undefined);
        } catch {
          /* server store is source of truth */
        }
      }

      setUser(mergePlanIntoUser(user, "pro", result.proSince));
      setCelebration(result.alreadyPro ? "welcome-back" : "new");
      setActivating(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [status, orderId, user, setUser]);

  useEffect(() => {
    if (status === "success" || !user) return;
    if (user.plan === "pro") {
      setCelebration("welcome-back");
    }
  }, [status, user]);

  return (
    <PageShell variant="marketing">
      <div className="mx-auto max-w-lg px-4 py-16">
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="mt-2 text-muted-foreground">
          Demo payments via Cashfree sandbox. Pro shows on your account instantly.
        </p>

        {activating ? (
          <p className="mt-8 text-sm text-muted-foreground">
            Activating Pro on your account…
          </p>
        ) : null}

        {celebration ? (
          <div className="mt-8">
            <ProCelebration variant={celebration} orderId={orderId} />
          </div>
        ) : user?.plan === "pro" ? (
          <div className="mt-8">
            <ProCelebration variant="welcome-back" orderId={orderId} />
          </div>
        ) : (
          <div className="mt-8 rounded-[20px] border border-border bg-surface p-6">
            <h2 className="text-xl font-semibold">Pro plan</h2>
            <p className="mt-1 text-3xl font-bold">₹2,499</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {user
                ? "Upgrade this account with a sandbox payment."
                : "Log in first, then complete checkout."}
            </p>
            {user ? (
              <CashfreeCheckout amountInr={2499} />
            ) : (
              <Link
                href="/login?return=/billing"
                className="mt-4 inline-block text-brand hover:underline"
              >
                Log in to pay
              </Link>
            )}
          </div>
        )}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link href="/account" className="text-brand hover:underline">
            Account &amp; profile
          </Link>
          {" · "}
          <Link href="/pricing" className="text-brand hover:underline">
            Pricing
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
