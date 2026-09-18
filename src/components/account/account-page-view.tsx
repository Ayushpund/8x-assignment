"use client";

import Link from "next/link";
import { Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProCelebration } from "@/components/billing/pro-celebration";
import { useAuthStore } from "@/store/auth-store";

export function AccountPageView() {
  const user = useAuthStore((s) => s.user);
  const authReady = useAuthStore((s) => s.authReady);

  if (!authReady) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 animate-pulse text-muted-foreground">
        Loading account…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Account</h1>
        <p className="mt-2 text-muted-foreground">
          Log in to see your plan and profile.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/login?return=/account">Log in</Link>
        </Button>
      </div>
    );
  }

  const isPro = user.plan === "pro";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold">Account</h1>
      <p className="mt-1 text-muted-foreground">Profile &amp; subscription</p>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold ${
              isPro
                ? "bg-gradient-to-br from-amber-400 to-brand text-black ring-2 ring-brand"
                : "bg-gradient-to-br from-brand to-lime-300 text-brand-foreground"
            }`}
          >
            {user.name.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              {isPro ? (
                <span className="inline-flex items-center gap-1 rounded-pill bg-brand px-2.5 py-0.5 text-[10px] font-bold uppercase text-brand-foreground">
                  <Crown className="h-3 w-3" />
                  Pro
                </span>
              ) : (
                <span className="rounded-pill border border-border px-2.5 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                  Free
                </span>
              )}
            </div>
            <p className="truncate text-sm text-muted-foreground">{user.email}</p>
            {isPro && user.proSince ? (
              <p className="mt-2 text-xs text-brand">
                Pro since {new Date(user.proSince).toLocaleDateString()}
              </p>
            ) : null}
          </div>
        </div>

        {!isPro ? (
          <div className="mt-6 rounded-xl border border-brand/30 bg-brand/5 p-4">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-brand" />
              Upgrade to Pro for unlimited generations
            </p>
            <Button className="mt-3" size="sm" asChild>
              <Link href="/billing">Go to billing</Link>
            </Button>
          </div>
        ) : null}
      </div>

      {isPro ? (
        <div className="mt-8">
          <ProCelebration variant="welcome-back" />
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="secondary" asChild>
          <Link href="/create/image">Create</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/gallery">Assets</Link>
        </Button>
      </div>
    </div>
  );
}
