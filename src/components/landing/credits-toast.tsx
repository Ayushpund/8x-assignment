"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";

export function CreditsToast() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-sm items-start gap-3 rounded-2xl border border-border bg-[#1a1a1a] p-4 shadow-xl">
      <div className="flex-1">
        <p className="text-sm font-semibold">Credits are running low!</p>
        <p className="mt-0.5 text-xs text-muted-foreground">All credits used</p>
        <Link
          href="/pricing"
          className="mt-3 inline-block rounded-lg bg-brand px-3 py-1.5 text-xs font-bold text-brand-foreground"
        >
          Upgrade
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="text-muted-foreground hover:text-foreground"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
