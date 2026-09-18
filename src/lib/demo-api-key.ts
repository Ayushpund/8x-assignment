/** Deterministic demo API key for local prototype (not a real secret). */
export function demoApiKeyForUser(userId: string): string {
  const slice = userId.replace(/-/g, "").slice(0, 16);
  return `hf_live_${slice}`;
}
