"use client";

import Link from "next/link";
import { PartyPopper, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProCelebration({
  variant,
  orderId,
}: {
  variant: "new" | "welcome-back";
  orderId?: string | null;
}) {
  const isNew = variant === "new";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand/50 bg-gradient-to-br from-brand/20 via-[#141414] to-[#0a0a0a] p-8 text-center shadow-[0_0_60px_rgba(212,255,0,0.15)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,255,0,0.25),transparent_55%)]" />
      <div className="relative">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-brand-foreground">
          {isNew ? (
            <PartyPopper className="h-8 w-8" />
          ) : (
            <Sparkles className="h-8 w-8" />
          )}
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-brand">
          {isNew ? "Payment confirmed" : "Pro member"}
        </p>
        <h2 className="mt-2 text-2xl font-bold md:text-3xl">
          {isNew
            ? "Hurray — you’re on Pro!"
            : "You’re already crushing it on Pro!"}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          {isNew
            ? "Unlimited Nano Banana Pro vibes, priority queue, Seedance access, and commercial license — all unlocked for your account."
            : "Your Pro plan is active. Keep generating — the good stuff is already yours."}
        </p>
        {orderId ? (
          <p className="mt-2 font-mono text-[11px] text-muted-foreground">
            Order {orderId}
          </p>
        ) : null}
        <ul className="mx-auto mt-6 flex max-w-sm flex-col gap-2 text-left text-sm text-foreground">
          <li className="flex items-center gap-2">
            <Zap className="h-4 w-4 shrink-0 text-brand" />
            Pro badge on your profile
          </li>
          <li className="flex items-center gap-2">
            <Zap className="h-4 w-4 shrink-0 text-brand" />
            Priority generation queue
          </li>
          <li className="flex items-center gap-2">
            <Zap className="h-4 w-4 shrink-0 text-brand" />
            Full model catalog in Create
          </li>
        </ul>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/account">View account</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/create/image">Start creating</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
