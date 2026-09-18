import type { AspectRatioId } from "@/lib/create-constants";
import { getModelOption } from "@/lib/ai-providers";
import { GEMINI_MODEL_ID } from "@/lib/gemini-config";
import {
  generateImagesWithGemini,
  isGeminiRateOrQuotaError,
  VideoRequiresOwnKeyError,
} from "@/lib/gemini-image";
import type { StudioMode } from "@/lib/studio-config";

export async function generateStudioOutput(options: {
  keySource: "user" | "server" | "none";
  modelId: string;
  apiKey: string;
  prompt: string;
  displayPrompt: string;
  aspectRatio: AspectRatioId;
  count: number;
  baseImage?: string;
  studioMode: StudioMode;
}): Promise<{
  images: string[];
  usedLocalPreview: boolean;
  lightweightFallback?: boolean;
  usedCloud?: boolean;
  premium?: boolean;
  model: string;
  modelId: string;
}> {
  const modelOption = getModelOption(options.modelId);

  if (options.studioMode === "video" && options.keySource !== "user") {
    throw new VideoRequiresOwnKeyError();
  }

  if (!options.apiKey) {
    throw new VideoRequiresOwnKeyError();
  }

  const tier = options.keySource === "user" ? "premium" : "hosted";

  const result = await generateImagesWithGemini({
    apiKey: options.apiKey,
    prompt: options.prompt,
    displayPrompt: options.displayPrompt,
    aspectRatio: options.aspectRatio,
    count: options.count,
    baseImage: options.baseImage,
    studioMode: options.studioMode,
    tier,
  });

  return {
    images: result.images,
    usedLocalPreview: result.usedLocalPreview,
    lightweightFallback: result.usedLocalPreview,
    usedCloud: result.usedCloud,
    premium: tier === "premium" && !result.usedLocalPreview,
    model: GEMINI_MODEL_ID,
    modelId: modelOption.id,
  };
}

export { isGeminiRateOrQuotaError as isRateOrQuotaError };
