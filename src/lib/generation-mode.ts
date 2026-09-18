/** When false (default), image/audio use open-web prompt search — no Gemini API. */
export function allowGeminiImageGeneration(): boolean {
  return process.env.ALLOW_GEMINI_IMAGE?.trim() === "1";
}

export function isWebPrimaryStudioMode(mode: string): boolean {
  return mode === "image" || mode === "audio";
}
