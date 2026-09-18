"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AspectRatioId } from "@/lib/create-constants";

export type GalleryItem = {
  id: string;
  imageBase64: string;
  prompt: string;
  basePrompt: string;
  styles: string[];
  aspectRatio: AspectRatioId;
  createdAt: number;
};

const MAX_ITEMS = 200;
const STORAGE_KEY = "8x-studio-gallery";

type GalleryState = {
  items: GalleryItem[];
  favoriteIds: string[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  addItems: (items: GalleryItem[]) => void;
  removeItem: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearAll: () => void;
};

export const useGalleryStore = create<GalleryState>()(
  persist(
    (set, get) => ({
      items: [],
      favoriteIds: [],
      searchQuery: "",
      setSearchQuery: (q) => set({ searchQuery: q }),
      addItems: (incoming) =>
        set((state) => {
          const merged = [...incoming, ...state.items];
          const byId = new Map<string, GalleryItem>();
          for (const item of merged) {
            byId.set(item.id, item);
          }
          const sorted = Array.from(byId.values()).sort(
            (a, b) => b.createdAt - a.createdAt
          );
          return { items: sorted.slice(0, MAX_ITEMS) };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
          favoriteIds: state.favoriteIds.filter((f) => f !== id),
        })),
      toggleFavorite: (id) =>
        set((state) => {
          const has = state.favoriteIds.includes(id);
          return {
            favoriteIds: has
              ? state.favoriteIds.filter((f) => f !== id)
              : [...state.favoriteIds, id],
          };
        }),
      isFavorite: (id) => get().favoriteIds.includes(id),
      clearAll: () => set({ items: [], favoriteIds: [] }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ items: state.items, favoriteIds: state.favoriteIds }),
    }
  )
);
