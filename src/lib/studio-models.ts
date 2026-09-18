import type { StudioMode } from "@/lib/studio-config";

export type StudioModelOption = {
  id: string;
  label: string;
  model: string;
  vendor: "gemini";
  studioModes: StudioMode[];
  badge?: string;
};

/** Catalog aligned with higgsfield.ai explore / nav (backend uses Gemini). */
export const STUDIO_MODEL_OPTIONS: StudioModelOption[] = [
  {
    id: "nano-banana-pro",
    label: "Nano Banana Pro",
    model: "gemini-3.1-flash-image",
    vendor: "gemini",
    studioModes: ["image", "audio"],
    badge: "TOP",
  },
  {
    id: "gemini-3.8-flash",
    label: "Gemini 3.8 Flash",
    model: "gemini-3.8-flash",
    vendor: "gemini",
    studioModes: ["image", "video", "audio"],
  },
  {
    id: "soul-2",
    label: "Soul 2",
    model: "gemini-3.8-flash",
    vendor: "gemini",
    studioModes: ["image", "audio"],
  },
  {
    id: "gpt-image-2",
    label: "GPT Image 2",
    model: "gemini-3.8-flash",
    vendor: "gemini",
    studioModes: ["image"],
  },
  {
    id: "ideogram-4",
    label: "Ideogram 4",
    model: "gemini-3.8-flash",
    vendor: "gemini",
    studioModes: ["image"],
  },
  {
    id: "grok-image",
    label: "Grok Imagine 2.0",
    model: "gemini-3.8-flash",
    vendor: "gemini",
    studioModes: ["image"],
  },
  {
    id: "seedance-25-f",
    label: "Seedance 2.5",
    model: "gemini-3.8-flash",
    vendor: "gemini",
    studioModes: ["video"],
    badge: "TOP",
  },
  {
    id: "seedance-20-f",
    label: "Seedance 2.0",
    model: "gemini-3.8-flash",
    vendor: "gemini",
    studioModes: ["video"],
  },
  {
    id: "kling-30",
    label: "Kling 3.0",
    model: "gemini-3.8-flash",
    vendor: "gemini",
    studioModes: ["video"],
  },
  {
    id: "wan-prime",
    label: "WAN 2.6",
    model: "gemini-3.8-flash",
    vendor: "gemini",
    studioModes: ["video"],
  },
  {
    id: "genjutsu",
    label: "Genjutsu",
    model: "gemini-3.8-flash",
    vendor: "gemini",
    studioModes: ["video"],
  },
  {
    id: "minimax-h3",
    label: "MiniMax H3",
    model: "gemini-3.8-flash",
    vendor: "gemini",
    studioModes: ["video"],
  },
  {
    id: "ltx-fast",
    label: "LTX 2.5 Fast",
    model: "gemini-3.8-flash",
    vendor: "gemini",
    studioModes: ["video"],
  },
  {
    id: "marketing-f",
    label: "Marketing Studio Image",
    model: "gemini-3.1-flash-image",
    vendor: "gemini",
    studioModes: ["image"],
  },
];

export const DEFAULT_STUDIO_MODEL_ID = "nano-banana-pro";

export function parseStudioModelId(raw: string | undefined): string {
  const id = raw?.trim();
  if (id && STUDIO_MODEL_OPTIONS.some((m) => m.id === id)) return id;
  return DEFAULT_STUDIO_MODEL_ID;
}

export function getStudioModelOption(id: string | undefined): StudioModelOption {
  const parsed = parseStudioModelId(id);
  return (
    STUDIO_MODEL_OPTIONS.find((m) => m.id === parsed) ??
    STUDIO_MODEL_OPTIONS[0]!
  );
}

export function studioModelsForMode(mode: StudioMode): StudioModelOption[] {
  return STUDIO_MODEL_OPTIONS.filter((m) => m.studioModes.includes(mode));
}
