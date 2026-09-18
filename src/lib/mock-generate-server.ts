import type { AspectRatioId } from "@/lib/create-constants";
import { generateLocalPromptPreviews } from "@/lib/local-prompt-preview";
import type { StudioMode } from "@/lib/studio-config";

export async function mockGenerateImagesServer(options: {
  count: number;
  aspectRatio: AspectRatioId;
  prompt: string;
  studioMode?: StudioMode;
}): Promise<string[]> {
  if (options.prompt.toLowerCase().includes("fail")) {
    throw new Error(
      "This prompt was flagged by content safety — try rephrasing"
    );
  }

  return generateLocalPromptPreviews({
    count: options.count,
    aspectRatio: options.aspectRatio,
    prompt: options.prompt,
    studioMode: options.studioMode ?? "image",
  });
}
