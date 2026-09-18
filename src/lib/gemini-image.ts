import type { AspectRatioId } from "@/lib/create-constants";
import {
  GEMINI_MODEL_ID,
  primaryGeminiImageModel,
  resolveGeminiImageModels,
} from "@/lib/gemini-config";
import { mapWithConcurrency } from "@/lib/generation-batch";
import { generateLocalPromptPreviews } from "@/lib/local-prompt-preview";
import { shouldUseLightweightFallback } from "@/lib/model-errors";
import type { StudioMode } from "@/lib/studio-config";

const HOSTED_IMAGE_MS = 120_000;
const PREMIUM_CLOUD_MS = 120_000;

const ASPECT_FOR_API: Record<AspectRatioId, string> = {
  "1:1": "1:1",
  "16:9": "16:9",
  "9:16": "9:16",
  "4:5": "4:5",
};

export function getActiveGeminiModel(): string {
  return GEMINI_MODEL_ID;
}

export class VideoRequiresOwnKeyError extends Error {
  constructor() {
    super(
      "Video needs your own Gemini API key — server resources are limited to image & audio previews."
    );
    this.name = "VideoRequiresOwnKeyError";
  }
}

export function isGeminiRateOrQuotaError(err: unknown): boolean {
  const message =
    err instanceof Error ? err.message : typeof err === "string" ? err : "";
  const lower = message.toLowerCase();
  return (
    lower.includes("quota") ||
    lower.includes("rate") ||
    lower.includes("429") ||
    lower.includes("resource exhausted")
  );
}

export function translateGeminiError(err: unknown): string {
  if (err instanceof VideoRequiresOwnKeyError) return err.message;
  const message =
    err instanceof Error ? err.message : typeof err === "string" ? err : "";
  const lower = message.toLowerCase();

  if (shouldUseLightweightFallback(err)) return "";
  if (
    lower.includes("safety") ||
    lower.includes("blocked") ||
    lower.includes("block_reason")
  ) {
    return "This prompt was flagged by content safety — try rephrasing";
  }
  if (lower.includes("reported as leaked") || lower.includes("leaked")) {
    return (
      "This Gemini API key was disabled because it was exposed publicly. " +
      "Create a new key at Google AI Studio, put it only in .env.local or Create → Your AI API key, and never commit or paste it in chat."
    );
  }
  if (lower.includes("api key not valid") || lower.includes("invalid api key")) {
    return "Invalid Gemini API key — check the key from Google AI Studio";
  }
  if (isAspectRatioConfigError(err)) {
    return "Could not apply aspect ratio — retrying usually fixes this; try 1:1 or 16:9.";
  }
  if (lower.includes("image generation") && lower.includes("not supported")) {
    return "This model cannot render images — set GEMINI_IMAGE_MODEL to gemini-3.1-flash-image in .env.local";
  }
  if (lower.includes("quota") || lower.includes("resource exhausted")) {
    const retry = message.match(/retry in (\d+(?:\.\d+)?)\s*s/i);
    const waitSec = retry ? Math.ceil(Number(retry[1])) : null;
    const waitHint = waitSec ? ` Retry in about ${waitSec}s.` : "";
    return (
      `Gemini quota exceeded for image generation.${waitHint} ` +
      `Save your own key under “Your AI API key” (uses ${primaryGeminiImageModel()}), or wait and retry.`
    );
  }
  return message.trim() || "Generation failed — please try again.";
}

type GeminiPart =
  | { text: string }
  | { inlineData: { mimeType: string; data: string } };

function stripDataUrlPrefix(dataUrl: string): {
  mimeType: string;
  data: string;
} {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (match) {
    return { mimeType: match[1]!, data: match[2]! };
  }
  return { mimeType: "image/png", data: dataUrl };
}

type GeminiResponse = {
  error?: { message?: string };
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
        inlineData?: { mimeType?: string; data?: string };
        inline_data?: { mime_type?: string; data?: string };
      }>;
    };
  }>;
};

async function callGeminiModel(
  modelId: string,
  apiKey: string,
  parts: GeminiPart[],
  generationConfig: Record<string, unknown>,
  timeoutMs: number
): Promise<GeminiResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ role: "user", parts }],
        generationConfig,
      }),
    });
    const json = (await res.json()) as GeminiResponse;
    if (!res.ok) {
      throw new Error(json.error?.message ?? `Gemini error (${res.status})`);
    }
    return json;
  } finally {
    clearTimeout(timer);
  }
}

function isModelNotFoundError(err: unknown): boolean {
  const message =
    err instanceof Error ? err.message : typeof err === "string" ? err : "";
  const lower = message.toLowerCase();
  return (
    lower.includes("not found") ||
    lower.includes("is not supported") ||
    lower.includes("does not exist") ||
    lower.includes("unknown model") ||
    lower.includes("404")
  );
}

function isInvalidApiKeyError(err: unknown): boolean {
  const message =
    err instanceof Error ? err.message : typeof err === "string" ? err : "";
  const lower = message.toLowerCase();
  return (
    lower.includes("api key not valid") ||
    lower.includes("invalid api key") ||
    lower.includes("permission denied") ||
    lower.includes("api key expired") ||
    lower.includes("reported as leaked") ||
    lower.includes("leaked")
  );
}

function isAspectRatioConfigError(err: unknown): boolean {
  const message =
    err instanceof Error ? err.message : typeof err === "string" ? err : "";
  const lower = message.toLowerCase();
  return lower.includes("aspect") && (lower.includes("ratio") || lower.includes("invalid"));
}

async function callGeminiForImage(
  apiKey: string,
  parts: GeminiPart[],
  aspectRatio: AspectRatioId,
  timeoutMs: number
): Promise<GeminiResponse> {
  const ratio = ASPECT_FOR_API[aspectRatio] ?? "1:1";
  const withAspectConfig: Record<string, unknown> = {
    responseModalities: ["IMAGE"],
    imageConfig: { aspectRatio: ratio },
  };
  const imageOnlyConfig: Record<string, unknown> = {
    responseModalities: ["IMAGE"],
  };
  const promptOnlyConfig: Record<string, unknown> = {
    responseModalities: ["TEXT", "IMAGE"],
    imageConfig: { aspectRatio: ratio },
  };

  const models = resolveGeminiImageModels();
  let lastError: unknown;

  for (const modelId of models) {
    for (const config of [withAspectConfig, imageOnlyConfig, promptOnlyConfig]) {
      try {
        return await callGeminiModel(modelId, apiKey, parts, config, timeoutMs);
      } catch (err) {
        lastError = err;
        if (isInvalidApiKeyError(err)) throw err;
        if (isModelNotFoundError(err)) break;
        if (isAspectRatioConfigError(err)) continue;
        if (isGeminiRateOrQuotaError(err)) break;
        continue;
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Image generation failed — check GEMINI_IMAGE_MODEL and API key.");
}

function extractImage(json: GeminiResponse): string | null {
  for (const candidate of json.candidates ?? []) {
    for (const part of candidate.content?.parts ?? []) {
      const inline = part.inlineData ?? part.inline_data;
      const data = inline?.data;
      if (data) {
        const mime =
          (part.inlineData?.mimeType ?? part.inline_data?.mime_type) ||
          "image/png";
        return `data:${mime};base64,${data}`;
      }
    }
  }
  return null;
}

async function generateOnePremiumFrame(
  apiKey: string,
  prompt: string,
  aspectRatio: AspectRatioId,
  baseImage: string | undefined,
  studioMode: StudioMode,
  timeoutMs = PREMIUM_CLOUD_MS
): Promise<string> {
  const parts: GeminiPart[] = [];
  const modeHint =
    studioMode === "video"
      ? "Generate one ultra-cinematic video keyframe that matches this description exactly. "
      : studioMode === "audio"
        ? "Generate premium album/podcast cover artwork that visually matches this audio concept. "
        : "Generate one photorealistic still image that matches this description exactly. ";

  if (baseImage) {
    const { mimeType, data } = stripDataUrlPrefix(baseImage);
    parts.push({ inlineData: { mimeType, data } });
    parts.push({
      text: `${modeHint}Edit/refine: ${prompt}`,
    });
  } else {
    parts.push({ text: `${modeHint}${prompt}` });
  }

  const ratioLabel = ASPECT_FOR_API[aspectRatio] ?? "1:1";
  const json = await callGeminiForImage(apiKey, parts, aspectRatio, timeoutMs);

  const image = extractImage(json);
  if (image) return image;

  const textBrief =
    json.candidates?.[0]?.content?.parts
      ?.map((p) => p.text ?? "")
      .join(" ")
      .trim() || prompt;

  const retryJson = await callGeminiForImage(
    apiKey,
    [
      {
        text: `${modeHint}${textBrief} Frame aspect ratio ${ratioLabel}.`,
      },
    ],
    aspectRatio,
    timeoutMs
  );
  const retryImage = extractImage(retryJson);
  if (retryImage) return retryImage;

  throw new Error(
    `${primaryGeminiImageModel()} did not return image bytes for this prompt.`
  );
}

async function generatePremiumBatch(options: {
  apiKey: string;
  prompt: string;
  aspectRatio: AspectRatioId;
  count: number;
  baseImage?: string;
  studioMode: StudioMode;
}): Promise<{ images: string[]; usedLocalPreview: boolean; usedCloud: boolean }> {
  const indices = Array.from({ length: options.count }, (_, i) => i);
  const images = await mapWithConcurrency(indices, Math.min(options.count, 2), () =>
    generateOnePremiumFrame(
      options.apiKey,
      options.prompt,
      options.aspectRatio,
      options.baseImage,
      options.studioMode
    )
  );
  return { images, usedLocalPreview: false, usedCloud: true };
}

async function generateHostedImageBatch(options: {
  apiKey: string;
  prompt: string;
  aspectRatio: AspectRatioId;
  count: number;
  baseImage?: string;
  studioMode: StudioMode;
}): Promise<{ images: string[]; usedLocalPreview: boolean; usedCloud: boolean }> {
  if (options.studioMode === "video") {
    throw new VideoRequiresOwnKeyError();
  }

  const indices = Array.from({ length: options.count }, (_, i) => i);
  const images = await mapWithConcurrency(indices, Math.min(options.count, 2), (i) => {
    const variantHint =
      options.count > 1
        ? ` Variation ${i + 1}: same scene, distinct composition.`
        : "";
    return generateOnePremiumFrame(
      options.apiKey,
      `${options.prompt}${variantHint}`,
      options.aspectRatio,
      options.baseImage,
      options.studioMode,
      HOSTED_IMAGE_MS
    );
  });

  return { images, usedLocalPreview: false, usedCloud: true };
}

async function generateHostedPreview(options: {
  apiKey: string;
  prompt: string;
  displayPrompt: string;
  aspectRatio: AspectRatioId;
  count: number;
  baseImage?: string;
  studioMode: StudioMode;
}): Promise<{ images: string[]; usedLocalPreview: boolean; usedCloud: boolean }> {
  if (options.studioMode === "video") {
    throw new VideoRequiresOwnKeyError();
  }

  try {
    return await generateHostedImageBatch({
      apiKey: options.apiKey,
      prompt: options.prompt,
      aspectRatio: options.aspectRatio,
      count: options.count,
      baseImage: options.baseImage,
      studioMode: options.studioMode,
    });
  } catch (err) {
    if (
      err instanceof VideoRequiresOwnKeyError ||
      !shouldUseLightweightFallback(err)
    ) {
      throw err;
    }
    if (isGeminiRateOrQuotaError(err)) {
      throw err;
    }
    const caption = options.displayPrompt.trim() || options.prompt;
    const images = await generateLocalPromptPreviews({
      prompt: caption,
      count: options.count,
      aspectRatio: options.aspectRatio,
      studioMode: options.studioMode,
    });
    return { images, usedLocalPreview: true, usedCloud: false };
  }
}

export async function generateImagesWithGemini(options: {
  apiKey: string;
  prompt: string;
  displayPrompt: string;
  aspectRatio: AspectRatioId;
  count: number;
  baseImage?: string;
  studioMode: StudioMode;
  tier: "hosted" | "premium";
}): Promise<{ images: string[]; usedLocalPreview: boolean; usedCloud: boolean }> {
  if (options.tier === "premium") {
    return generatePremiumBatch({
      apiKey: options.apiKey,
      prompt: options.prompt,
      aspectRatio: options.aspectRatio,
      count: options.count,
      baseImage: options.baseImage,
      studioMode: options.studioMode,
    });
  }

  return generateHostedPreview({
    apiKey: options.apiKey,
    prompt: options.prompt,
    displayPrompt: options.displayPrompt,
    aspectRatio: options.aspectRatio,
    count: options.count,
    baseImage: options.baseImage,
    studioMode: options.studioMode,
  });
}
