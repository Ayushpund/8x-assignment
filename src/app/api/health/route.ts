import { NextResponse } from "next/server";

import { DEFAULT_MODEL_ID, getModelOption, getServerApiKey } from "@/lib/ai-providers";

import { GEMINI_MODEL_ID, primaryGeminiImageModel } from "@/lib/gemini-config";



export const runtime = "nodejs";



export async function GET() {

  const hasGemini = Boolean(getServerApiKey("gemini"));

  const modelOption = getModelOption(DEFAULT_MODEL_ID);



  return NextResponse.json({

    ok: true,

    defaultModelId: DEFAULT_MODEL_ID,

    defaultModel: GEMINI_MODEL_ID,

    model: modelOption.model,
    imageModel: primaryGeminiImageModel(),

    modelCount: 1,

    serverKeys: { gemini: hasGemini },

    generationMode: hasGemini ? "live" : "byok-or-demo",

    message: hasGemini
      ? `Hosted: Gemini 3.8 prompts + ${primaryGeminiImageModel()} for image/audio · video needs your key.`
      : "Add GEMINI_API_KEY or your Gemini key in Create for prompt-accurate image/audio.",

  });

}


