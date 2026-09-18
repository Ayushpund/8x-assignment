"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getTemplateById } from "@/lib/templates";
import { parseStudioModelId } from "@/lib/studio-models";
import { useAiCredentialsStore } from "@/store/ai-credentials-store";
import { useCreateStore } from "@/store/create-store";

const MODEL_PRESETS: Record<
  string,
  { prompt: string; styleIds: string[]; aspectRatio: "1:1" | "16:9" | "9:16" | "4:5" }
> = {
  "seedance-25-f": {
    prompt: "Cinematic drone shot over neon city at dusk, smooth camera motion",
    styleIds: ["cinematic"],
    aspectRatio: "16:9",
  },
  "seedance-20-f": {
    prompt: "Fashion walk on runway, slow motion, studio lights",
    styleIds: ["cinematic"],
    aspectRatio: "9:16",
  },
  "marketing-f": {
    prompt: "Premium skincare bottle on white marble, soft studio light",
    styleIds: ["product", "studio"],
    aspectRatio: "4:5",
  },
  "kling-30": {
    prompt: "Action hero landing in rain, dramatic lighting, wide shot",
    styleIds: ["cinematic"],
    aspectRatio: "16:9",
  },
  "soul-2": {
    prompt: "Editorial portrait, natural skin, soft window light",
    styleIds: ["portrait"],
    aspectRatio: "4:5",
  },
  genjutsu: {
    prompt: "Transfer motion into a new urban scene, same character energy, cinematic",
    styleIds: ["cinematic"],
    aspectRatio: "16:9",
  },
};

export function CreateTemplateHydrator() {
  const searchParams = useSearchParams();
  const hydrateFromTemplate = useCreateStore((s) => s.hydrateFromTemplate);
  const setPrompt = useCreateStore((s) => s.setPrompt);

  useEffect(() => {
    const templateId = searchParams.get("template");
    if (templateId) {
      const template = getTemplateById(templateId);
      if (template) {
        hydrateFromTemplate(
          template.prompt,
          template.styleIds,
          template.aspectRatio
        );
      }
      return;
    }

    const modelId = searchParams.get("model");
    if (modelId) {
      useAiCredentialsStore
        .getState()
        .setSelectedModelId(parseStudioModelId(modelId));
      const preset = MODEL_PRESETS[modelId];
      if (preset) {
        hydrateFromTemplate(preset.prompt, preset.styleIds, preset.aspectRatio);
      }
    }
  }, [searchParams, hydrateFromTemplate, setPrompt]);

  return null;
}
