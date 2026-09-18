"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { parseModelId } from "@/lib/ai-providers";
import { DEFAULT_STUDIO_MODEL_ID } from "@/lib/studio-models";
import { normalizeGeminiApiKey } from "@/lib/gemini-api-key";

type AiCredentialsState = {
  selectedModelId: string;
  userApiKey: string;
  _hasHydrated: boolean;
  setSelectedModelId: (modelId: string) => void;
  setUserApiKey: (key: string) => void;
  clearUserApiKey: () => void;
  setHasHydrated: (value: boolean) => void;
};

function readLegacyGeminiKey(): string {
  if (typeof window === "undefined") return "";
  try {
    const raw = localStorage.getItem("8x-studio-gemini-key");
    if (!raw) return "";
    const parsed = JSON.parse(raw) as { state?: { userApiKey?: string } };
    return normalizeGeminiApiKey(parsed.state?.userApiKey ?? "");
  } catch {
    return "";
  }
}

export const useAiCredentialsStore = create<AiCredentialsState>()(
  persist(
    (set) => ({
      selectedModelId: DEFAULT_STUDIO_MODEL_ID,
      userApiKey: "",
      _hasHydrated: false,
      setSelectedModelId: (modelId) =>
        set({ selectedModelId: parseModelId(modelId) }),
      setUserApiKey: (key) => {
        const cleaned = normalizeGeminiApiKey(key);
        set({ userApiKey: cleaned });
        if (typeof window !== "undefined" && cleaned) {
          try {
            localStorage.setItem("8x-studio-gemini-key-backup", cleaned);
          } catch {
            /* private mode */
          }
        }
      },
      clearUserApiKey: () => {
        set({ userApiKey: "" });
        if (typeof window !== "undefined") {
          try {
            localStorage.removeItem("8x-studio-gemini-key-backup");
          } catch {
            /* ignore */
          }
        }
      },
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: "8x-studio-ai-credentials",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedModelId: state.selectedModelId,
        userApiKey: state.userApiKey,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      merge: (persisted, current) => {
        const p = persisted as Partial<AiCredentialsState> & {
          provider?: string;
        };
        let key = normalizeGeminiApiKey(p?.userApiKey ?? "");
        if (!key && typeof window !== "undefined") {
          key =
            normalizeGeminiApiKey(
              localStorage.getItem("8x-studio-gemini-key-backup") ?? ""
            ) || readLegacyGeminiKey();
        }
        const modelId = p?.selectedModelId
          ? parseModelId(p.selectedModelId)
              : DEFAULT_STUDIO_MODEL_ID;
        return {
          ...current,
          ...p,
          selectedModelId: modelId,
          userApiKey: key,
        };
      },
    }
  )
);

/** @deprecated alias */
export const useGeminiKeyStore = useAiCredentialsStore;
