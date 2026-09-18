/** Prompt / product id (text model — no image output). */

export const GEMINI_MODEL_ID = "gemini-3.8-flash" as const;

/**
 * Image/audio/video frames must use an image-capable model.
 * gemini-3.8-flash is text-only; sending imageConfig causes aspect-ratio errors.
 */
export const DEFAULT_GEMINI_IMAGE_MODEL = "gemini-3.1-flash-image" as const;

/** Free-tier image models (try in order when one hits quota or 404). */
const IMAGE_MODEL_ALLOWLIST = [
  "gemini-2.5-flash-image",
  DEFAULT_GEMINI_IMAGE_MODEL,
] as const;

/** These report limit: 0 on free tier — never use for hosted generation. */
function isBlockedImageModel(id: string): boolean {
  const lower = id.toLowerCase();
  return lower.includes("flash-lite") || lower.includes("lite-image");
}

function normalizeImageModel(id: string | undefined): string | null {
  const trimmed = id?.trim();
  if (!trimmed) return null;
  if (isBlockedImageModel(trimmed)) return null;
  if (IMAGE_MODEL_ALLOWLIST.includes(trimmed as (typeof IMAGE_MODEL_ALLOWLIST)[number])) {
    return trimmed;
  }
  if (trimmed.endsWith("-image") && !isBlockedImageModel(trimmed)) {
    return trimmed;
  }
  return null;
}

export function resolveGeminiModel(): string {
  return GEMINI_MODEL_ID;
}

export function resolveGeminiImageModels(): string[] {
  const fromEnv = normalizeImageModel(process.env.GEMINI_IMAGE_MODEL);
  const ordered: string[] = [];

  if (fromEnv) ordered.push(fromEnv);
  for (const m of IMAGE_MODEL_ALLOWLIST) {
    if (!ordered.includes(m)) ordered.push(m);
  }

  return ordered.length ? ordered : [DEFAULT_GEMINI_IMAGE_MODEL];
}

export function primaryGeminiImageModel(): string {
  return resolveGeminiImageModels()[0] ?? DEFAULT_GEMINI_IMAGE_MODEL;
}

export function geminiModelLabel(): string {
  return "Gemini 3.8 Flash";
}

export function describeImageModelEnv(): string | null {
  const raw = process.env.GEMINI_IMAGE_MODEL?.trim();
  if (!raw) return null;
  if (isBlockedImageModel(raw)) {
    return `GEMINI_IMAGE_MODEL=${raw} is ignored (no free-tier image quota). Using ${DEFAULT_GEMINI_IMAGE_MODEL} instead.`;
  }
  return null;
}
