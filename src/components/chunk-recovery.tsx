"use client";

import { useEffect } from "react";

const SESSION_KEY = "8x-chunk-reload";

/** One automatic reload when a stale Next.js chunk fails after dev restart. */
export function ChunkRecovery() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const msg = event.message ?? "";
      const isChunk =
        msg.includes("ChunkLoadError") ||
        msg.includes("Loading chunk") ||
        msg.includes("Failed to fetch dynamically imported module") ||
        msg.includes("Loading CSS chunk") ||
        msg.includes("layout.css");

      if (!isChunk) return;
      if (sessionStorage.getItem(SESSION_KEY)) return;

      sessionStorage.setItem(SESSION_KEY, "1");
      window.location.reload();
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const msg =
        reason instanceof Error
          ? reason.message
          : typeof reason === "string"
            ? reason
            : "";
      if (
        msg.includes("ChunkLoadError") ||
        msg.includes("Loading chunk") ||
        msg.includes("Failed to fetch dynamically imported module")
      ) {
        if (!sessionStorage.getItem(SESSION_KEY)) {
          sessionStorage.setItem(SESSION_KEY, "1");
          window.location.reload();
        }
      }
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);
    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => {
      sessionStorage.removeItem(SESSION_KEY);
    }, 4000);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
