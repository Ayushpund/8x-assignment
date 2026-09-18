import type { AspectRatioId } from "@/lib/create-constants";

import type { StudioMode } from "@/lib/studio-config";

import { getClientAuthToken } from "@/lib/auth/client-auth-token";
import { normalizeGeminiApiKey } from "@/lib/gemini-api-key";
import type { GenerationResult } from "@/store/create-store";



type GenerateResponse = {

  images: string[];

  error?: string;

  demoMode?: boolean;

  notice?: string;

  needsOwnKey?: boolean;

};



export async function fetchGenerations(options: {

  prompt: string;

  basePrompt: string;

  styles: string[];

  aspectRatio: AspectRatioId;

  count: number;

  baseImage?: string | null;

  studioMode: StudioMode;

  modelId?: string;

  apiKey?: string;

  webSearchPage?: number;

}): Promise<{

  results: GenerationResult[];

  notice?: string;

  error?: string;

  needsOwnKey?: boolean;

}> {

  const authToken = await getClientAuthToken();
  if (!authToken) {
    return {
      results: [],
      error: "Sign in to generate — log in or create an account first.",
    };
  }

  const res = await fetch("/api/generate", {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },

    body: JSON.stringify({

      prompt: options.prompt,

      styleTags: options.styles,

      aspectRatio: options.aspectRatio,

      count: options.count,

      baseImage: options.baseImage ?? undefined,

      studioMode: options.studioMode,

      modelId: options.modelId,

      apiKey: normalizeGeminiApiKey(options.apiKey ?? "") || undefined,
      geminiApiKey: normalizeGeminiApiKey(options.apiKey ?? "") || undefined,

      webSearchPage: options.webSearchPage,

    }),

  });



  let data: GenerateResponse;

  try {

    data = (await res.json()) as GenerateResponse;

  } catch {

    return {

      results: [],

      error: "Network error — could not reach the server.",

    };

  }



  if (!res.ok || data.error) {

    return {

      results: [],

      error: data.error ?? "Generation failed — please try again.",

      needsOwnKey: data.needsOwnKey,

    };

  }



  const baseSeed = Date.now();

  const results: GenerationResult[] = data.images.map((imageBase64, i) => ({

    id: `${baseSeed}-${i}-${Math.random().toString(36).slice(2, 8)}`,

    imageBase64,

    prompt: options.prompt,

    basePrompt: options.basePrompt,

    styles: [...options.styles],

    aspectRatio: options.aspectRatio,

    createdAt: Date.now(),

  }));



  return { results, notice: data.notice, needsOwnKey: data.needsOwnKey };

}


