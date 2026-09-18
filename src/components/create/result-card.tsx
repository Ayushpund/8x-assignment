"use client";

import { motion } from "framer-motion";
import {
  Download,
  ImageDown,
  RefreshCw,
  Trash2,
} from "lucide-react";
import type { GenerationResult } from "@/store/create-store";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type ResultCardProps = {
  result: GenerationResult;
  onDownload: () => void;
  onUseAsInput: () => void;
  onRegenerate: () => void;
  onDelete: () => void;
};

const aspectClass: Record<string, string> = {
  "1:1": "aspect-square",
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "4:5": "aspect-[4/5]",
};

export function ResultCard({
  result,
  onDownload,
  onUseAsInput,
  onRegenerate,
  onDelete,
}: ResultCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface",
        aspectClass[result.aspectRatio] ?? "aspect-square"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={result.imageBase64}
        alt={result.prompt.slice(0, 80)}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-end justify-center gap-2 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        <ActionIcon label="Download" onClick={onDownload}>
          <Download className="h-4 w-4" />
        </ActionIcon>
        <ActionIcon label="Use as input" onClick={onUseAsInput}>
          <ImageDown className="h-4 w-4" />
        </ActionIcon>
        <ActionIcon label="Regenerate" onClick={onRegenerate}>
          <RefreshCw className="h-4 w-4" />
        </ActionIcon>
        <ActionIcon label="Delete" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </ActionIcon>
      </div>
    </motion.div>
  );
}

function ActionIcon({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm transition hover:bg-brand hover:text-brand-foreground"
          aria-label={label}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
