"use client";

import { create } from "zustand";
import type { AspectRatioId, VariationCount } from "@/lib/create-constants";
import type {
  AudioTypeId,
  StudioMode,
  VideoDuration,
} from "@/lib/studio-config";

export type GenerationResult = {
  id: string;
  imageBase64: string;
  /** Full prompt sent to the model (includes style suffixes) */
  prompt: string;
  basePrompt: string;
  styles: string[];
  aspectRatio: AspectRatioId;
  createdAt: number;
};

type CreateState = {
  studioMode: StudioMode;
  videoDuration: VideoDuration;
  motionPreset: string;
  audioType: AudioTypeId;
  currentPrompt: string;
  selectedStyles: string[];
  aspectRatio: AspectRatioId;
  variationCount: VariationCount;
  uploadedImage: string | null;
  isGenerating: boolean;
  error: string | null;
  results: GenerationResult[];
  setStudioMode: (mode: StudioMode) => void;
  setVideoDuration: (v: VideoDuration) => void;
  setMotionPreset: (v: string) => void;
  setAudioType: (v: AudioTypeId) => void;
  setPrompt: (v: string) => void;
  toggleStyle: (id: string) => void;
  setAspectRatio: (v: AspectRatioId) => void;
  setVariationCount: (v: VariationCount) => void;
  setUploadedImage: (v: string | null) => void;
  setError: (v: string | null) => void;
  setGenerating: (v: boolean) => void;
  addResults: (items: GenerationResult[]) => void;
  removeResult: (id: string) => void;
  clearResults: () => void;
  hydrateFromTemplate: (
    prompt: string,
    styles: string[],
    aspectRatio?: AspectRatioId
  ) => void;
  applyResultSettings: (result: GenerationResult) => void;
  webSearchGeneration: number;
  bumpWebSearchGeneration: () => number;
};

export const useCreateStore = create<CreateState>((set, get) => ({
  studioMode: "image",
  videoDuration: 5,
  motionPreset: "dolly",
  audioType: "music",
  currentPrompt: "",
  selectedStyles: [],
  aspectRatio: "1:1",
  variationCount: 1,
  uploadedImage: null,
  isGenerating: false,
  error: null,
  results: [],
  webSearchGeneration: 0,

  bumpWebSearchGeneration: () => {
    const next = get().webSearchGeneration + 1;
    set({ webSearchGeneration: next });
    return next;
  },

  setStudioMode: (mode) => set({ studioMode: mode }),
  setVideoDuration: (v) => set({ videoDuration: v }),
  setMotionPreset: (v) => set({ motionPreset: v }),
  setAudioType: (v) => set({ audioType: v }),
  setPrompt: (v) => set({ currentPrompt: v, error: null }),
  toggleStyle: (id) =>
    set((s) => ({
      selectedStyles: s.selectedStyles.includes(id)
        ? s.selectedStyles.filter((x) => x !== id)
        : [...s.selectedStyles, id],
    })),
  setAspectRatio: (v) => set({ aspectRatio: v }),
  setVariationCount: (v) => set({ variationCount: v }),
  setUploadedImage: (v) => set({ uploadedImage: v }),
  setError: (v) => set({ error: v }),
  setGenerating: (v) => set({ isGenerating: v }),
  addResults: (items) =>
    set((s) => ({ results: [...items, ...s.results] })),
  removeResult: (id) =>
    set((s) => ({ results: s.results.filter((r) => r.id !== id) })),
  clearResults: () => set({ results: [] }),
  hydrateFromTemplate: (prompt, styles, aspectRatio) =>
    set({
      currentPrompt: prompt,
      selectedStyles: styles,
      ...(aspectRatio ? { aspectRatio } : {}),
      error: null,
    }),
  applyResultSettings: (result) =>
    set({
      currentPrompt: result.basePrompt,
      selectedStyles: result.styles,
      aspectRatio: result.aspectRatio,
      error: null,
    }),
}));
