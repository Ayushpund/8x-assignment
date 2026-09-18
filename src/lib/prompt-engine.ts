import type { StudioMode } from "@/lib/studio-config";
import type { AspectRatioId } from "@/lib/create-constants";

const HOSTED_SUFFIX =
  " High detail, clean composition, no text or watermarks.";

const PRO_SUFFIX =
  " Ultra-detailed, award-winning commercial quality, cinematic lighting, " +
  "rich color grading, sharp focus, depth of field, trending on artstation, " +
  "Higgsfield-level polish, 8K clarity, no text, no watermarks, no UI.";

export function enhancePromptForStudio(
  mode: StudioMode,
  userPrompt: string,
  aspectRatio: AspectRatioId,
  pro = false
): string {
  const core = userPrompt.trim();
  if (!core) return "";
  const suffix = pro ? PRO_SUFFIX : HOSTED_SUFFIX;

  switch (mode) {
    case "image":
      return pro
        ? `Masterpiece hero still (${aspectRatio}). ${core}. Editorial fashion / product / concept art quality. ${suffix}`
        : `Commercial still (${aspectRatio}). ${core}. ${suffix}`;
    case "video":
      return pro
        ? `Blockbuster film keyframe (${aspectRatio}), motion-ready, anamorphic lens, volumetric light, ${core}. ${suffix}`
        : `Cinematic keyframe (${aspectRatio}). ${core}. ${suffix}`;
    case "audio":
      return pro
        ? `Premium album / podcast cover (${aspectRatio}) for: ${core}. Bold typography-safe layout, iconic mood. ${suffix}`
        : `Audio cover art (${aspectRatio}). ${core}. ${suffix}`;
    default:
      return core;
  }
}
