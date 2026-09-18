export function isModelOverloadError(err: unknown): boolean {
  const message = errorMessage(err).toLowerCase();
  return (
    message.includes("high demand") ||
    message.includes("overloaded") ||
    message.includes("try again later") ||
    message.includes("capacity") ||
    message.includes("unavailable") ||
    message.includes("503") ||
    message.includes("502") ||
    message.includes("504")
  );
}

export function isTimeoutError(err: unknown): boolean {
  if (err instanceof Error) {
    if (err.name === "AbortError" || err.name === "TimeoutError") return true;
  }
  const message = errorMessage(err).toLowerCase();
  return (
    message.includes("timeout") ||
    message.includes("timed out") ||
    message.includes("aborted") ||
    message.includes("operation was aborted")
  );
}

/** Only fall back to SVG previews when the model is temporarily overloaded. */
export function shouldUseLightweightFallback(err: unknown): boolean {
  return isModelOverloadError(err) || isTimeoutError(err);
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "";
}
