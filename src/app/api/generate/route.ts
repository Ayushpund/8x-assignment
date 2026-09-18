import { NextResponse } from "next/server";

import type { AspectRatioId } from "@/lib/create-constants";

import {

  getModelOption,

  parseModelId,

  resolveGenerationCredentials,

  translateProviderError,

} from "@/lib/ai-providers";

import {
  generateStudioOutput,
  isRateOrQuotaError,
} from "@/lib/generate-orchestrator";
import { VideoRequiresOwnKeyError } from "@/lib/gemini-image";

import { mockGenerateImagesServer } from "@/lib/mock-generate-server";

import { enhancePromptForStudio } from "@/lib/prompt-engine";
import {
  fetchPromptImagesFromWeb,
  isPlaceholderSvgDataUrl,
} from "@/lib/prompt-web-images";

import { verifyGenerationAuth } from "@/lib/auth/verify-generation-auth";
import { primaryGeminiImageModel } from "@/lib/gemini-config";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

import type { StudioMode } from "@/lib/studio-config";

import { parseStudioMode } from "@/lib/studio-config";
import {
  allowGeminiImageGeneration,
  isWebPrimaryStudioMode,
} from "@/lib/generation-mode";

export const runtime = "nodejs";
export const maxDuration = 60;



type Body = {

  prompt?: string;

  styleTags?: string[];

  aspectRatio?: string;

  count?: number;

  baseImage?: string;

  studioMode?: string;

  modelId?: string;

  provider?: string;

  apiKey?: string;

  geminiApiKey?: string;

  webSearchPage?: number;

};



const VALID_RATIOS = new Set(["1:1", "16:9", "9:16", "4:5"]);



export async function POST(request: Request) {

  let body: Body;

  try {

    body = (await request.json()) as Body;

  } catch {

    return NextResponse.json(

      { images: [], error: "Invalid request body." },

      { status: 400 }

    );

  }

  const auth = await verifyGenerationAuth(request);
  if (!auth.ok) {
    return NextResponse.json(
      { images: [], error: auth.error, requiresAuth: true },
      { status: 401 }
    );
  }

  const modelId = parseModelId(body.modelId);

  const modelOption = getModelOption(modelId);

  const studioModeEarly: StudioMode = parseStudioMode(body.studioMode);
  const webPrimary =
    isWebPrimaryStudioMode(studioModeEarly) && !allowGeminiImageGeneration();

  const userKeyFromClient = webPrimary
    ? undefined
    : body.apiKey ?? body.geminiApiKey;

  const creds = resolveGenerationCredentials({
    modelId,
    userKey: userKeyFromClient,
  });

  if (creds.userKeyRejected && !webPrimary) {
    return NextResponse.json(
      {
        images: [],
        error:
          "Could not use your API key — paste the full key from Google AI Studio (Create → Your AI API key → Save), then generate again.",
      },
      { status: 400 }
    );
  }

  if (creds.source === "server" && !webPrimary) {

    const ip = getClientIp(request);

    const limit = checkRateLimit(ip);

    if (!limit.ok) {

      return NextResponse.json(

        {

          images: [],

          error: `Shared server limit — wait ${limit.retryAfterSec}s or add your own API key`,

          needsOwnKey: true,

        },

        { status: 429 }

      );

    }

  }



  const prompt = body.prompt?.trim() ?? "";

  if (!prompt) {

    return NextResponse.json(

      { images: [], error: "Prompt is required." },

      { status: 400 }

    );

  }



  const aspectRatio = (body.aspectRatio ?? "1:1") as AspectRatioId;

  if (!VALID_RATIOS.has(aspectRatio)) {

    return NextResponse.json(

      { images: [], error: "Invalid aspect ratio." },

      { status: 400 }

    );

  }



  const count = Math.min(4, Math.max(1, Number(body.count ?? 1) || 1));

  const studioMode: StudioMode = parseStudioMode(body.studioMode);

  const displayPrompt = prompt;
  const styleTags = Array.isArray(body.styleTags) ? body.styleTags : [];
  const webSearchPage = Math.max(1, Number(body.webSearchPage) || 1);
  const pro = creds.source === "user";

  const webImageOptions = () => ({
    prompt: displayPrompt,
    styleTags,
    count,
    aspectRatio,
    studioMode,
    searchPage: webSearchPage,
  });
  const enhancedPrompt = enhancePromptForStudio(
    studioMode,
    prompt,
    aspectRatio,
    pro
  );

  async function respondWebImages(primary: boolean): Promise<NextResponse | null> {
    if (studioMode === "video") return null;
    const web = await fetchPromptImagesFromWeb(webImageOptions());
    if (web.images.length === 0) return null;
    return NextResponse.json({
      images: web.images,
      modelId: "web-prompt-search",
      model: "open-web",
      webFallback: true,
      webPrimary: primary,
      notice:
        web.notice ||
        "Prompt-matched images from Openverse, Wikimedia & DuckDuckGo (no Gemini API).",
    });
  }

  if (webPrimary) {
    const webRes = await respondWebImages(true);
    if (webRes) return webRes;

    const images = await mockGenerateImagesServer({
      count,
      aspectRatio,
      prompt: displayPrompt,
      studioMode,
    });

    return NextResponse.json({
      images,
      demoMode: true,
      webPrimary: true,
      notice:
        "No web matches for this prompt — try simpler keywords (e.g. “sunset mountains”, “portrait studio”).",
    });
  }

  if (studioMode === "video" && creds.source !== "user") {
    return NextResponse.json(
      {
        images: [],
        error:
          "Video can't run on limited server resources. Add your own Gemini API key for full cinematic generation.",
        needsOwnKey: true,
        videoBlocked: true,
      },
      { status: 403 }
    );
  }

  if (!creds.key) {
    if (studioMode === "video") {
      return NextResponse.json(
        {
          images: [],
          error:
            "Video can't run on limited server resources. Add your own Gemini API key to generate cinematic frames.",
          needsOwnKey: true,
          videoBlocked: true,
        },
        { status: 403 }
      );
    }

    const web = await fetchPromptImagesFromWeb(webImageOptions());
    if (web.images.length > 0) {
      return NextResponse.json({
        images: web.images,
        demoMode: true,
        webFallback: true,
        notice: web.notice,
      });
    }

    const images = await mockGenerateImagesServer({
      count,
      aspectRatio,
      prompt: displayPrompt,
      studioMode,
    });

    return NextResponse.json({
      images,
      demoMode: true,
      needsOwnKey: true,
      notice:
        "No web matches for this prompt — add your Gemini API key for AI-generated image/audio.",
    });
  }

  async function tryWebPromptFallback(): Promise<NextResponse | null> {
    return respondWebImages(false);
  }

  try {
    const result = await generateStudioOutput({
      keySource: creds.source,
      modelId: creds.modelId,
      apiKey: creds.key,
      prompt: enhancedPrompt,
      displayPrompt,
      aspectRatio,
      count,
      baseImage: body.baseImage,
      studioMode,
    });

    const onlyPlaceholders =
      result.images.length > 0 &&
      result.images.every(isPlaceholderSvgDataUrl);
    const shouldTryWeb =
      (studioMode === "image" || studioMode === "audio") &&
      (result.images.length === 0 ||
        result.usedLocalPreview ||
        onlyPlaceholders);

    if (shouldTryWeb) {
      const webRes = await tryWebPromptFallback();
      if (webRes) return webRes;
    }

    return NextResponse.json({
      images: result.images,
      modelId: result.modelId,
      model: result.model,
      usedOwnKey: creds.source === "user",
      notice: result.premium
        ? `Your API key · Gemini 3.8 + ${primaryGeminiImageModel()} (free-tier image model).`
        : result.usedLocalPreview
          ? "Cloud busy — showing lightweight placeholder. Retry or add your own key."
          : `Hosted · Gemini 3.8 + ${primaryGeminiImageModel()} generated your ${studioMode === "audio" ? "audio artwork" : "image"}. Video needs your API key.`,
    });
  } catch (err) {
    if (err instanceof VideoRequiresOwnKeyError) {
      return NextResponse.json(
        {
          images: [],
          error: err.message,
          needsOwnKey: true,
          videoBlocked: true,
        },
        { status: 403 }
      );
    }

    if (studioMode === "image" || studioMode === "audio") {
      const webRes = await tryWebPromptFallback();
      if (webRes) return webRes;
    }

    const status = isRateOrQuotaError(err) ? 429 : 502;
    const geminiMsg = translateProviderError(err, creds.vendor);
    const hideGeminiKeyNoise =
      (studioMode === "image" || studioMode === "audio") &&
      geminiMsg.toLowerCase().includes("leaked");
    return NextResponse.json(
      {
        images: [],
        error: hideGeminiKeyNoise
          ? "No prompt-matched web images found. Try different keywords — image mode uses web search, not Gemini, unless ALLOW_GEMINI_IMAGE=1 in .env.local."
          : geminiMsg,
        needsOwnKey: creds.source === "server" && isRateOrQuotaError(err),
      },
      { status }
    );
  }

}


