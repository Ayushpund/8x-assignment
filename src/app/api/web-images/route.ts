import { NextResponse } from "next/server";

import { fetchPromptImagesFromWeb } from "@/lib/prompt-web-images";
import { parseStudioMode } from "@/lib/studio-config";

export const runtime = "nodejs";
export const maxDuration = 60;

/** Debug / direct prompt web search (image & audio studios). */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("q")?.trim() ?? "";
  const count = Math.min(4, Math.max(1, Number(searchParams.get("count") ?? 1) || 1));
  const studioMode = parseStudioMode(searchParams.get("mode") ?? "image");

  if (!prompt) {
    return NextResponse.json({ error: "Missing ?q=prompt" }, { status: 400 });
  }

  const result = await fetchPromptImagesFromWeb({
    prompt,
    count,
    aspectRatio: "1:1",
    studioMode,
  });

  return NextResponse.json({
    ok: result.images.length > 0,
    count: result.images.length,
    notice: result.notice,
    sources: result.sources,
    images: result.images,
  });
}
