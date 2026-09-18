"use client";

import { useCallback, useEffect, useState } from "react";
import { stylesLookBroken } from "@/lib/css-health";

const RELOAD_KEY = "8x-css-guard-reloads";

/**
 * When .next is corrupt, Tailwind never loads — page looks like raw HTML on black.
 * Show a clear fix UI and auto-reload once.
 */
export function CssGuard() {
  const [broken, setBroken] = useState(false);

  const check = useCallback(() => {
    setBroken(stylesLookBroken());
  }, []);

  useEffect(() => {
    const t1 = window.setTimeout(check, 400);
    const t2 = window.setTimeout(check, 1500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [check]);

  useEffect(() => {
    if (!broken) return;

    const reloads = Number(sessionStorage.getItem(RELOAD_KEY) ?? "0");
    if (reloads < 2) {
      sessionStorage.setItem(RELOAD_KEY, String(reloads + 1));
      const url = new URL(window.location.href);
      url.searchParams.set("_css", String(Date.now()));
      window.location.replace(url.toString());
    }
  }, [broken]);

  useEffect(() => {
    const t = window.setTimeout(() => sessionStorage.removeItem(RELOAD_KEY), 8000);
    return () => window.clearTimeout(t);
  }, []);

  if (!broken) return null;

  return (
    <div
      role="alertdialog"
      aria-labelledby="css-guard-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-6"
    >
      <div className="max-w-md rounded-2xl border border-[#333] bg-[#141414] p-6 text-center shadow-2xl">
        <h2 id="css-guard-title" className="text-lg font-semibold text-white">
          Styles didn&apos;t load
        </h2>
        <p className="mt-2 text-sm text-[#a3a3a3]">
          The dev bundle is stale (usually after <code className="text-brand">next build</code>{" "}
          while dev is running). Restart with a clean cache.
        </p>
        <ol className="mt-4 space-y-1 text-left text-xs text-[#a3a3a3]">
          <li>1. Stop all terminals on port 3000</li>
          <li>
            2. Run:{" "}
            <code className="block mt-1 rounded bg-black px-2 py-1 text-brand">
              node scripts/clean-next.mjs
            </code>
          </li>
          <li>
            3. Then:{" "}
            <code className="block mt-1 rounded bg-black px-2 py-1 text-brand">
              node scripts/dev.mjs
            </code>
          </li>
          <li>4. Hard refresh (Ctrl+Shift+R)</li>
        </ol>
        <button
          type="button"
          className="mt-5 w-full rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground"
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </div>
    </div>
  );
}
