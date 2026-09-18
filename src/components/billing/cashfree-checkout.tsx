"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getClientAuthToken } from "@/lib/auth/client-auth-token";

declare global {
  interface Window {
    Cashfree?: new (config: { mode: "sandbox" | "production" }) => {
      checkout: (opts: { paymentSessionId: string; redirectTarget: string }) => void;
    };
  }
}

function loadCashfreeSdk(mode: "sandbox" | "production"): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Cashfree) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Cashfree SDK"));
    document.body.appendChild(script);
  });
}

export function CashfreeCheckout({
  planLabel = "Pro",
  amountInr = 2499,
}: {
  planLabel?: string;
  amountInr?: number;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pay = async () => {
    setError(null);
    setLoading(true);
    try {
      const token = await getClientAuthToken();
      if (!token) {
        setError("Log in to run demo billing checkout.");
        return;
      }

      const res = await fetch("/api/billing/cashfree/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: planLabel, amountInr }),
      });
      const data = (await res.json()) as {
        paymentSessionId?: string;
        error?: string;
        mode?: "sandbox" | "production";
      };

      if (!res.ok || !data.paymentSessionId) {
        setError(data.error ?? "Could not start payment.");
        return;
      }

      const mode = data.mode === "production" ? "production" : "sandbox";
      await loadCashfreeSdk(mode);
      const cashfree = new window.Cashfree!({ mode });
      cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <Button type="button" className="w-full" onClick={() => void pay()} disabled={loading}>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          `Pay ₹${amountInr} (Cashfree demo)`
        )}
      </Button>
      {error ? <p className="text-sm text-accent-pink">{error}</p> : null}
      <p className="text-[11px] text-muted-foreground">
        Sandbox test mode — use Cashfree test cards/UPI in the checkout popup.
      </p>
    </div>
  );
}
