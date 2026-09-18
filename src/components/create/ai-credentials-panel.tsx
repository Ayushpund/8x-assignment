"use client";

import { useEffect, useState } from "react";
import { Check, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getModelOption,
  getModelOptionsForStudio,
  isPlausibleApiKey,
  VENDOR_KEY_META,
} from "@/lib/ai-providers";
import type { StudioMode } from "@/lib/studio-config";
import {
  isValidGeminiApiKey,
  normalizeGeminiApiKey,
} from "@/lib/gemini-api-key";
import { primaryGeminiImageModel } from "@/lib/gemini-config";
import { useAiCredentialsStore } from "@/store/ai-credentials-store";
import { cn } from "@/lib/utils";

type Props = {
  studioMode?: StudioMode;
  className?: string;
  defaultOpen?: boolean;
  emphasize?: boolean;
};

export function AiCredentialsPanel({
  studioMode = "image",
  className,
  defaultOpen = false,
  emphasize = false,
}: Props) {
  const modelOptions = getModelOptionsForStudio(studioMode);
  const selectedModelId = useAiCredentialsStore((s) => s.selectedModelId);
  const setSelectedModelId = useAiCredentialsStore((s) => s.setSelectedModelId);
  const stored = useAiCredentialsStore((s) => s.userApiKey);
  const setUserApiKey = useAiCredentialsStore((s) => s.setUserApiKey);
  const clearUserApiKey = useAiCredentialsStore((s) => s.clearUserApiKey);
  const hasHydrated = useAiCredentialsStore((s) => s._hasHydrated);

  const [draft, setDraft] = useState(stored);
  const [open, setOpen] = useState(defaultOpen || emphasize);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  const modelOption = getModelOption(selectedModelId);
  const vendorMeta = VENDOR_KEY_META[modelOption.vendor];
  const imageModel = primaryGeminiImageModel();

  useEffect(() => {
    setDraft(stored);
  }, [stored]);

  useEffect(() => {
    if (emphasize) setOpen(true);
  }, [emphasize]);

  useEffect(() => {
    if (!justSaved) return;
    const t = window.setTimeout(() => setJustSaved(false), 2500);
    return () => window.clearTimeout(t);
  }, [justSaved]);

  const saved = Boolean(
    stored && isPlausibleApiKey(modelOption.vendor, stored)
  );

  const handleSave = () => {
    setSaveError(null);
    const cleaned = normalizeGeminiApiKey(draft);
    if (!isValidGeminiApiKey(cleaned)) {
      setSaveError(
        "Key too short or invalid characters — paste the full API key from aistudio.google.com/apikey (usually 30+ characters)."
      );
      return;
    }
    setUserApiKey(cleaned);
    setDraft(cleaned);
    setJustSaved(true);
  };

  return (
    <div
      className={cn(
        "mb-4 rounded-input border bg-surface px-3 py-3 text-xs",
        emphasize ? "border-brand/50" : "border-border-subtle",
        className
      )}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center gap-2 font-medium text-foreground">
          <KeyRound className="h-4 w-4 text-brand" />
          Your AI API key
          {saved ? (
            <span className="rounded-pill bg-brand/15 px-2 py-0.5 text-[10px] font-semibold text-brand">
              Saved · uses your quota
            </span>
          ) : null}
        </span>
        <span className="text-muted-foreground">{open ? "Hide" : "Show"}</span>
      </button>
      {open ? (
        <div className="mt-3 space-y-3 text-muted-foreground">
          <p>
            Prompts: <strong className="text-foreground">gemini-3.8-flash</strong>.
            Images &amp; audio:{" "}
            <strong className="text-foreground">{imageModel}</strong> (free tier).
            Your key bypasses hosted limits.
          </p>
          {!hasHydrated ? (
            <p className="text-[11px]">Loading saved key…</p>
          ) : null}
          <label className="block">
            <span className="mb-1 block font-medium text-foreground">Model</span>
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="max-h-48 w-full rounded-input border border-border bg-surface-input px-3 py-2 text-sm text-foreground focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30"
              size={1}
            >
              {modelOptions.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.badge ? `[${m.badge}] ` : ""}
                  {m.label}
                </option>
              ))}
            </select>
          </label>
          <p>
            API id: <code className="text-foreground">{modelOption.model}</code>{" "}
            ·{" "}
            <a
              href={vendorMeta.keyHelpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              Get {vendorMeta.label} key
            </a>
          </p>
          <input
            type="password"
            autoComplete="off"
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              setSaveError(null);
            }}
            onPaste={(e) => {
              const text = e.clipboardData.getData("text");
              if (text.length > 12) {
                e.preventDefault();
                setDraft(normalizeGeminiApiKey(text));
                setSaveError(null);
              }
            }}
            placeholder={vendorMeta.keyPlaceholder}
            className="w-full rounded-input border border-border bg-surface-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30"
          />
          {saveError ? (
            <p role="alert" className="text-sm text-accent-pink">
              {saveError}
            </p>
          ) : null}
          {justSaved ? (
            <p className="flex items-center gap-1.5 text-sm text-brand">
              <Check className="h-4 w-4" />
              Key saved — generate again to use your quota.
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="secondary" onClick={handleSave}>
              Save key
            </Button>
            {saved ? (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="text-muted-foreground"
                onClick={() => {
                  clearUserApiKey();
                  setDraft("");
                  setSaveError(null);
                }}
              >
                Remove
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** @deprecated */
export const GeminiApiKeyPanel = AiCredentialsPanel;
