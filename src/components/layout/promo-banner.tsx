"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function PromoBanner() {
  const [hidden, setHidden] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 12, s: 8 });

  useEffect(() => {
    if (sessionStorage.getItem("promo-dismissed") === "1") setHidden(true);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s -= 1;
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) return { h: 2, m: 12, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  if (hidden) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="relative flex min-h-[44px] items-center justify-center gap-3 border-b border-black/10 bg-brand px-10 py-2 text-[13px] text-black">
      <div className="flex items-center gap-2 rounded-lg bg-black/10 px-3 py-1.5 text-xs font-medium">
        <span className="text-black/70">Discount expires in</span>
        <span className="tabular-nums font-semibold text-black">
          {pad(timeLeft.h)} h&nbsp;{pad(timeLeft.m)} m&nbsp;{pad(timeLeft.s)} s
        </span>
      </div>

      <p className="hidden max-w-2xl text-center text-[13px] font-medium leading-snug text-black/90 lg:block">
        Nano Banana Pro &amp; 2 UNLIMITED on Max. Kling 3.0 Unlimited. Personal{" "}
        <span className="font-bold">54% OFF</span>
      </p>
      <p className="text-center text-xs font-medium text-black/80 lg:hidden">
        Nano Banana Pro · 54% OFF
      </p>

      <Link
        href="/pricing"
        className="shrink-0 rounded-lg bg-black px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-black/90"
      >
        Get Unlimited with 54% OFF
      </Link>

      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => {
          sessionStorage.setItem("promo-dismissed", "1");
          setHidden(true);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-black/60 hover:bg-black/10 hover:text-black"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
