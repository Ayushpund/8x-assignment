/** Clean pasted API keys (spaces, quotes, "API key:" labels). */
export function normalizeGeminiApiKey(raw: string | undefined | null): string {
  if (!raw) return "";
  let k = raw.trim().replace(/^["']|["']$/g, "");
  k = k.replace(/\s/g, "");
  // If an AIza key appears inside a longer paste, prefer that segment.
  const ai = k.match(/(AIza[A-Za-z0-9_-]+)/);
  if (ai) return ai[1]!;
  return k;
}

/**
 * Accept Google AI Studio keys (AIza…) and other Gemini/Google API key shapes.
 * Does not require AIza prefix.
 */
export function isValidGeminiApiKey(key: string): boolean {
  const k = normalizeGeminiApiKey(key);
  if (k.length < 16 || k.length > 512) return false;
  if (/^AIza[A-Za-z0-9_-]+$/.test(k)) return true;
  return /^[A-Za-z0-9][A-Za-z0-9_\-\.+/=]{15,}$/.test(k);
}
