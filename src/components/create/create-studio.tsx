"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageDropzone } from "@/components/create/image-dropzone";
import { ResultsGrid } from "@/components/create/results-grid";
import {
  ASPECT_RATIOS,
  STYLE_PRESETS,
  VARIATION_COUNTS,
  buildPromptWithStyles,
  type VariationCount,
} from "@/lib/create-constants";
import { fetchGenerations } from "@/lib/generate-client";
import {
  AUDIO_TYPES,
  MOTION_PRESETS,
  STUDIO_CONFIG,
  VIDEO_DURATIONS,
  type StudioMode,
} from "@/lib/studio-config";
import { useCreateStore } from "@/store/create-store";
import { useGalleryStore, type GalleryItem } from "@/store/gallery-store";
import { CreateApiStatus } from "@/components/create/create-api-status";
import { AiCredentialsPanel } from "@/components/create/ai-credentials-panel";
import { useAiCredentialsStore } from "@/store/ai-credentials-store";
import { getModelOption, isPlausibleApiKey } from "@/lib/ai-providers";
import { normalizeGeminiApiKey } from "@/lib/gemini-api-key";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";

async function downloadResultImage(src: string, filename: string) {
  try {
    if (src.startsWith("data:")) {
      const a = document.createElement("a");
      a.href = src;
      a.download = filename;
      a.click();
      return;
    }
    const res = await fetch(src);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  } catch {
    window.open(src, "_blank", "noopener,noreferrer");
  }
}

export function CreateStudio({ mode }: { mode: StudioMode }) {
  const config = STUDIO_CONFIG[mode];
  const visibleStyles = useMemo(
    () => STYLE_PRESETS.filter((p) => config.stylePresetIds.includes(p.id)),
    [config.stylePresetIds]
  );
  const visibleAspects = useMemo(
    () => ASPECT_RATIOS.filter((a) => config.aspectRatios.includes(a.id)),
    [config.aspectRatios]
  );

  const {
    currentPrompt,
    selectedStyles,
    aspectRatio,
    variationCount,
    uploadedImage,
    isGenerating,
    error,
    results,
    videoDuration,
    motionPreset,
    audioType,
    setStudioMode,
    setVideoDuration,
    setMotionPreset,
    setAudioType,
    setPrompt,
    toggleStyle,
    setAspectRatio,
    setVariationCount,
    setUploadedImage,
    setError,
    setGenerating,
    addResults,
    removeResult,
    applyResultSettings,
  } = useCreateStore();

  useEffect(() => {
    setStudioMode(mode);
    if (!config.aspectRatios.includes(aspectRatio)) {
      setAspectRatio(config.defaultAspect);
    }
  }, [mode, setStudioMode, config, aspectRatio, setAspectRatio]);
  const addGalleryItems = useGalleryStore((s) => s.addItems);
  const removeGalleryItem = useGalleryStore((s) => s.removeItem);
  const [notice, setNotice] = useState<string | null>(null);
  const [emphasizeApiKey, setEmphasizeApiKey] = useState(false);
  const selectedModelId = useAiCredentialsStore((s) => s.selectedModelId);
  const userApiKey = useAiCredentialsStore((s) => s.userApiKey);
  const hasProKey = Boolean(
    userApiKey?.trim() &&
      isPlausibleApiKey(getModelOption(selectedModelId).vendor, userApiKey.trim())
  );
  const user = useAuthStore((s) => s.user);
  const authReady = useAuthStore((s) => s.authReady);
  const canGenerate = authReady && Boolean(user);
  const loginReturn = `/create/${mode}`;

  const runGenerate = useCallback(async () => {
    if (!useAuthStore.getState().user) {
      setError("Sign in to generate — log in or create an account first.");
      return;
    }
    const {
      currentPrompt: promptText,
      selectedStyles: styles,
      aspectRatio: ratio,
      variationCount: count,
    } = useCreateStore.getState();

    let base = promptText.trim();
    const { studioMode, motionPreset, videoDuration, audioType } =
      useCreateStore.getState();
    if (studioMode === "video") {
      base = `${base} — ${motionPreset} camera, ${videoDuration}s cinematic clip`;
    } else if (studioMode === "audio") {
      base = `${audioType} audio: ${base}`;
    }
    const fullPrompt = buildPromptWithStyles(base, styles);
    if (!fullPrompt) {
      setError("Enter a prompt before generating.");
      return;
    }

    setError(null);
    setNotice(null);
    setGenerating(true);
    try {
      const { uploadedImage: refImage, studioMode } = useCreateStore.getState();
      const webSearchPage = useCreateStore.getState().bumpWebSearchGeneration();
      const creds = useAiCredentialsStore.getState();
      const apiKey = normalizeGeminiApiKey(creds.userApiKey);
      const usingOwnKey = Boolean(apiKey && isPlausibleApiKey("gemini", apiKey));
      if (usingOwnKey) {
        setNotice("Using your API key for this generation.");
      }

      const {
        results: items,
        error: apiError,
        notice: apiNotice,
        needsOwnKey,
      } = await fetchGenerations({
        prompt: fullPrompt,
        basePrompt: base,
        styles,
        aspectRatio: ratio,
        count,
        baseImage: refImage,
        studioMode,
        modelId: creds.selectedModelId,
        apiKey,
        webSearchPage,
      });

      if (apiError) {
        setError(apiError);
        if (needsOwnKey) setEmphasizeApiKey(true);
        return;
      }

      addResults(items);
      addGalleryItems(items as GalleryItem[]);
      if (apiNotice) setNotice(apiNotice);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setGenerating(false);
    }
  }, [addGalleryItems, addResults, setError, setGenerating]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (!isGenerating && useAuthStore.getState().user) void runGenerate();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isGenerating, runGenerate]);

  const handleRegenerate = (result: (typeof results)[0]) => {
    applyResultSettings(result);
    void runGenerate();
  };

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col lg:flex-row">
      {/* Mobile: results first after scroll — on md we keep controls on left */}
      <aside className="order-2 w-full shrink-0 border-t border-border-subtle bg-background lg:order-1 lg:w-studio-panel lg:border-t-0 lg:border-r">
        <div className="sticky top-[7rem] max-h-[calc(100vh-7rem)] overflow-y-auto p-4 lg:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand" />
            <div>
              <h1 className="text-lg font-semibold">{config.title} studio</h1>
              <p className="text-xs text-muted-foreground">
                {config.modelLabel} · {config.subtitle}
              </p>
            </div>
          </div>

          <CreateApiStatus />

          {authReady && !user ? (
            <div className="mb-4 rounded-input border border-brand/40 bg-brand/10 px-3 py-3 text-sm text-foreground">
              <p className="font-medium">Sign in to generate</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Image and audio use Gemini 3.8 with our image model after you log in.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="default">
                  <Link href={`/login?return=${encodeURIComponent(loginReturn)}`}>
                    Log in
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/signup?return=${encodeURIComponent(loginReturn)}`}>
                    Sign up
                  </Link>
                </Button>
              </div>
            </div>
          ) : null}

          <AiCredentialsPanel
            studioMode={mode}
            emphasize={emphasizeApiKey}
            defaultOpen={emphasizeApiKey}
          />

          {mode === "video" && !hasProKey ? (
            <div className="mb-4 rounded-input border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-foreground">
              Video is not available on limited hosted resources. Save your Gemini API key
              below to generate cinematic frames from your prompt.
            </div>
          ) : null}

          {notice && (
            <div className="mb-4 rounded-input border border-brand/40 bg-brand/10 px-3 py-2 text-sm text-foreground">
              {notice}
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mb-4 rounded-input border border-accent-pink/50 bg-accent-pink/10 px-3 py-2 text-sm text-foreground"
            >
              {error}
            </div>
          )}

          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Prompt
          </label>
          <textarea
            value={currentPrompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
            placeholder={config.promptPlaceholder}
            rows={5}
            className="mb-4 w-full resize-none rounded-input border border-border bg-surface-input px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30 disabled:opacity-60"
          />

          {mode === "image" && (
            <>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Reference image (optional)
              </label>
              <div className="mb-4">
                <ImageDropzone
                  value={uploadedImage}
                  onChange={setUploadedImage}
                  disabled={isGenerating}
                />
              </div>
            </>
          )}

          {mode === "video" && (
            <>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Duration
              </label>
              <div className="mb-4 flex gap-2">
                {VIDEO_DURATIONS.map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    disabled={isGenerating}
                    onClick={() => setVideoDuration(sec)}
                    className={cn(
                      "flex-1 rounded-input border py-2 text-sm font-semibold transition-colors",
                      videoDuration === sec
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-border bg-surface-input text-muted-foreground"
                    )}
                  >
                    {sec}s
                  </button>
                ))}
              </div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Camera motion
              </label>
              <div className="mb-4 flex flex-wrap gap-2">
                {MOTION_PRESETS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    disabled={isGenerating}
                    onClick={() => setMotionPreset(m.id)}
                    className={cn(
                      "rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors",
                      motionPreset === m.id
                        ? "border-brand bg-brand/15 text-brand"
                        : "border-border bg-surface-input text-muted-foreground"
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {mode === "audio" && (
            <>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Audio type
              </label>
              <div className="mb-4 flex flex-wrap gap-2">
                {AUDIO_TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    disabled={isGenerating}
                    onClick={() => setAudioType(t.id)}
                    className={cn(
                      "rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors",
                      audioType === t.id
                        ? "border-brand bg-brand/15 text-brand"
                        : "border-border bg-surface-input text-muted-foreground"
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </>
          )}

          <label className="mb-2 block text-xs font-medium text-muted-foreground">
            Style presets
          </label>
          <div className="mb-4 flex max-h-[140px] flex-wrap gap-2 overflow-y-auto pr-1">
            {visibleStyles.map((preset) => {
              const active = selectedStyles.includes(preset.id);
              return (
                <button
                  key={preset.id}
                  type="button"
                  disabled={isGenerating}
                  onClick={() => toggleStyle(preset.id)}
                  className={cn(
                    "rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "border-brand bg-brand/15 text-brand"
                      : "border-border bg-surface-input text-muted-foreground hover:border-border hover:text-foreground"
                  )}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <label className="mb-2 block text-xs font-medium text-muted-foreground">
            Aspect ratio
          </label>
          <div className="mb-4 flex flex-wrap gap-2">
            {visibleAspects.map((ar) => (
              <button
                key={ar.id}
                type="button"
                disabled={isGenerating}
                onClick={() => setAspectRatio(ar.id)}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-input border px-3 py-2 text-xs font-medium transition-colors",
                  aspectRatio === ar.id
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-border bg-surface-input text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "rounded-sm border border-current bg-surface",
                    ar.className
                  )}
                />
                {ar.label}
              </button>
            ))}
          </div>

          <label className="mb-2 block text-xs font-medium text-muted-foreground">
            Variations
          </label>
          <div className="mb-5 flex gap-2">
            {VARIATION_COUNTS.map((n) => (
              <button
                key={n}
                type="button"
                disabled={isGenerating}
                onClick={() => setVariationCount(n as VariationCount)}
                className={cn(
                  "flex-1 rounded-input border py-2 text-sm font-semibold transition-colors",
                  variationCount === n
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-border bg-surface-input text-muted-foreground"
                )}
              >
                {n}
              </button>
            ))}
          </div>

          <Button
            className="w-full"
            size="lg"
            disabled={isGenerating || !canGenerate}
            onClick={() => void runGenerate()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                {config.ctaLabel}
              </>
            )}
          </Button>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Cmd/Ctrl+Enter · 1 variation is fastest · saved to Assets automatically
          </p>
        </div>
      </aside>

      <section className="order-1 flex-1 p-4 lg:order-2 lg:p-6">
        <ResultsGrid
          studioMode={mode}
          results={results}
          isGenerating={isGenerating}
          skeletonCount={variationCount}
          onDownload={(r) =>
            void downloadResultImage(r.imageBase64, `generation-${r.id}.png`)
          }
          onUseAsInput={(r) => setUploadedImage(r.imageBase64)}
          onRegenerate={handleRegenerate}
          onDelete={(id) => {
            removeResult(id);
            removeGalleryItem(id);
          }}
        />
      </section>
    </div>
  );
}
