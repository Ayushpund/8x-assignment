"use client";

import { AnimatePresence } from "framer-motion";
import { ResultCard } from "@/components/create/result-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { GenerationResult } from "@/store/create-store";
import type { StudioMode } from "@/lib/studio-config";
import { cn } from "@/lib/utils";

type ResultsGridProps = {
  studioMode: StudioMode;
  results: GenerationResult[];
  isGenerating: boolean;
  skeletonCount: number;
  onDownload: (r: GenerationResult) => void;
  onUseAsInput: (r: GenerationResult) => void;
  onRegenerate: (r: GenerationResult) => void;
  onDelete: (id: string) => void;
};

const emptyCopy: Record<StudioMode, { title: string; hint: string }> = {
  image: {
    title: "Your images will appear here",
    hint: "Write a prompt and generate — Nano Banana Pro quality when live.",
  },
  video: {
    title: "Video keyframes appear here",
    hint: "Seedance-style cinematic stills — tune motion and duration on the left.",
  },
  audio: {
    title: "Audio visuals appear here",
    hint: "Cover art and waveform-style visuals for your sound concept.",
  },
};

export function ResultsGrid({
  studioMode,
  results,
  isGenerating,
  skeletonCount,
  onDownload,
  onUseAsInput,
  onRegenerate,
  onDelete,
}: ResultsGridProps) {
  const showEmpty = results.length === 0 && !isGenerating;

  return (
    <div className="flex h-full min-h-[320px] flex-col">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">
          {studioMode === "video"
            ? "Video frames"
            : studioMode === "audio"
              ? "Audio visuals"
              : "Generations"}
        </h2>
        <span className="text-xs text-muted-foreground">
          {results.length} result{results.length === 1 ? "" : "s"}
        </span>
      </div>

      {showEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-card border border-dashed border-border bg-surface/50 px-6 py-16 text-center">
          <div className="mb-4 flex -space-x-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-12 w-12 rounded-lg border border-border bg-surface-input",
                  i % 2 === 0 && "rotate-6",
                  i % 2 === 1 && "-rotate-6"
                )}
              />
            ))}
          </div>
          <p className="font-medium">{emptyCopy[studioMode].title}</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {emptyCopy[studioMode].hint}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          {isGenerating &&
            Array.from({ length: skeletonCount }).map((_, i) => (
              <Skeleton key={`sk-${i}`} className="aspect-square min-h-[180px] w-full" />
            ))}
          <AnimatePresence mode="popLayout">
            {results.map((result) => (
              <ResultCard
                key={result.id}
                result={result}
                onDownload={() => onDownload(result)}
                onUseAsInput={() => onUseAsInput(result)}
                onRegenerate={() => onRegenerate(result)}
                onDelete={() => onDelete(result.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
