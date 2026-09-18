"use client";

import { useEffect } from "react";
import { stylesLookBroken } from "@/lib/css-health";

const KEY = "8x-style-reload";

/** Reload once when Tailwind/globals.css did not load. */
export function StyleRecovery() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!stylesLookBroken()) return;
      if (sessionStorage.getItem(KEY)) return;

      sessionStorage.setItem(KEY, "1");
      const url = new URL(window.location.href);
      url.searchParams.set("_style", String(Date.now()));
      window.location.replace(url.toString());
    }, 600);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => sessionStorage.removeItem(KEY), 8000);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
