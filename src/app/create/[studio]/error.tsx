"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function CreateStudioError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[create studio]", error);
  }, [error]);

  const isChunk =
    error.message.includes("ChunkLoadError") ||
    error.message.includes("Loading chunk");

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h2 className="text-lg font-semibold text-foreground">
        {isChunk ? "Studio failed to load" : "Something went wrong"}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {isChunk
          ? "The dev server was restarted or the cache is stale. Reload once — if it persists, run node scripts/clean-next.mjs then node scripts/dev.mjs."
          : error.message}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={() => window.location.reload()}>
          Reload page
        </Button>
        <Button type="button" variant="secondary" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
