import { translateGeminiError } from "@/lib/gemini-image";
import {
  isValidGeminiApiKey,
  normalizeGeminiApiKey,
} from "@/lib/gemini-api-key";
import {
  DEFAULT_STUDIO_MODEL_ID,
  getStudioModelOption,
  parseStudioModelId,
  STUDIO_MODEL_OPTIONS,
  studioModelsForMode,
} from "@/lib/studio-models";
import type { StudioMode } from "@/lib/studio-config";

export type AiVendorId = "gemini" | "openai" | "anthropic";

export type AiModelOption = {
  id: string;
  label: string;
  model: string;
  vendor: AiVendorId;
  badge?: string;
};

export const DEFAULT_MODEL_ID = DEFAULT_STUDIO_MODEL_ID;

export const AI_MODEL_OPTIONS: AiModelOption[] = STUDIO_MODEL_OPTIONS.map(
  (m) => ({
    id: m.id,
    label: m.label,
    model: m.model,
    vendor: m.vendor,
    badge: m.badge,
  })
);

export function getModelOptionsForStudio(mode: StudioMode): AiModelOption[] {
  return studioModelsForMode(mode).map((m) => ({
    id: m.id,
    label: m.label,
    model: m.model,
    vendor: m.vendor,
    badge: m.badge,
  }));
}

export function getModelOption(modelId: string | undefined): AiModelOption {
  const m = getStudioModelOption(modelId);
  return {
    id: m.id,
    label: m.label,
    model: m.model,
    vendor: m.vendor,
    badge: m.badge,
  };
}

export const VENDOR_KEY_META: Record<
  AiVendorId,
  { label: string; keyPlaceholder: string; keyHelpUrl: string }
> = {
  gemini: {
    label: "Google Gemini",
    keyPlaceholder: "Paste API key",
    keyHelpUrl: "https://aistudio.google.com/apikey",
  },
  openai: {
    label: "OpenAI",
    keyPlaceholder: "sk-…",
    keyHelpUrl: "https://platform.openai.com/api-keys",
  },
  anthropic: {
    label: "Anthropic",
    keyPlaceholder: "sk-ant-…",
    keyHelpUrl: "https://console.anthropic.com/settings/keys",
  },
};

export function parseModelId(raw: string | undefined): string {
  return parseStudioModelId(raw);
}

export function normalizeApiKey(raw: string | undefined | null): string {
  return normalizeGeminiApiKey(raw?.trim() ? raw : "");
}

export function isPlausibleApiKey(vendor: AiVendorId, key: string): boolean {
  const k = key.trim();
  if (k.length < 16 || k.length > 512) return false;
  switch (vendor) {
    case "gemini":
      return isValidGeminiApiKey(k);
    case "openai":
      return /^sk-[\w-]+$/.test(k);
    case "anthropic":
      return /^sk-ant-[\w-]+$/.test(k);
    default:
      return false;
  }
}

export function getServerApiKey(_vendor: AiVendorId): string {
  return normalizeApiKey(process.env.GEMINI_API_KEY);
}

export type KeyResolution = {
  vendor: AiVendorId;
  modelId: string;
  model: string;
  key: string;
  source: "user" | "server" | "none";
  userKeyRejected?: boolean;
};

export function resolveGenerationCredentials(options: {
  modelId: string;
  userKey?: string;
}): KeyResolution {
  const modelOption = getModelOption(options.modelId);
  const rawInput = options.userKey?.trim() ?? "";
  const userKey = normalizeApiKey(options.userKey);

  if (rawInput.length > 0) {
    if (userKey && isPlausibleApiKey("gemini", userKey)) {
      return {
        vendor: "gemini",
        modelId: modelOption.id,
        model: modelOption.model,
        key: userKey,
        source: "user",
      };
    }
    return {
      vendor: "gemini",
      modelId: modelOption.id,
      model: modelOption.model,
      key: "",
      source: "none",
      userKeyRejected: true,
    };
  }

  const serverKey = getServerApiKey("gemini");
  if (serverKey) {
    return {
      vendor: "gemini",
      modelId: modelOption.id,
      model: modelOption.model,
      key: serverKey,
      source: "server",
    };
  }

  return {
    vendor: "gemini",
    modelId: modelOption.id,
    model: modelOption.model,
    key: "",
    source: "none",
  };
}

export function isRateOrQuotaError(err: unknown): boolean {
  const message =
    err instanceof Error ? err.message : typeof err === "string" ? err : "";
  const lower = message.toLowerCase();
  return (
    lower.includes("quota") ||
    lower.includes("rate") ||
    lower.includes("429") ||
    lower.includes("resource exhausted")
  );
}

export function translateProviderError(err: unknown, vendor: AiVendorId): string {
  if (vendor === "gemini") {
    const translated = translateGeminiError(err);
    if (translated) return translated;
  }
  const message =
    err instanceof Error ? err.message : typeof err === "string" ? err : "";
  if (!message.trim()) {
    return "Generation failed — try again.";
  }
  const lower = message.toLowerCase();
  if (
    lower.includes("safety") ||
    lower.includes("blocked") ||
    lower.includes("block_reason")
  ) {
    return "This prompt was flagged — try rephrasing";
  }
  return message.trim();
}
