import type { StudioMode } from "@/lib/studio-config";

/** Hosted/server Gemini for image/audio (off by default). */
export function allowHostedGeminiImageGeneration(): boolean {
  return process.env.ALLOW_HOSTED_GEMINI_IMAGE?.trim() === "1";
}

export function isWebPrimaryStudioMode(mode: StudioMode): boolean {
  return mode === "image" || mode === "audio";
}

/** Web search for image/audio when the user is not on their own API key. */
export function useWebSearchForGeneration(
  mode: StudioMode,
  keySource: "user" | "server" | "none"
): boolean {
  if (!isWebPrimaryStudioMode(mode)) return false;
  if (keySource === "user") return false;
  return true;
}
