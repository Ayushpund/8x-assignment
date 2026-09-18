"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RemoteImg } from "@/components/ui/remote-img";
import { HIGGS_STATIC } from "@/lib/higgs-media";
import { Download, Heart, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GallerySidebar } from "@/components/gallery/gallery-sidebar";
import { STYLE_PRESETS } from "@/lib/create-constants";
import { useGalleryStore, type GalleryItem } from "@/store/gallery-store";
import { cn } from "@/lib/utils";

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

function styleLabels(ids: string[]) {
  return ids
    .map((id) => STYLE_PRESETS.find((p) => p.id === id)?.label ?? id)
    .join(", ");
}

export function GalleryView() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const items = useGalleryStore((s) => s.items);
  const searchQuery = useGalleryStore((s) => s.searchQuery);
  const removeItem = useGalleryStore((s) => s.removeItem);
  const favoriteIds = useGalleryStore((s) => s.favoriteIds);
  const toggleFavorite = useGalleryStore((s) => s.toggleFavorite);
  const isFavorite = useGalleryStore((s) => s.isFavorite);
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const q = searchQuery.trim().toLowerCase();
  const matchesSearch = (item: GalleryItem) =>
    !q ||
    item.prompt.toLowerCase().includes(q) ||
    item.basePrompt.toLowerCase().includes(q);

  const displayItems =
    tab === "favorites"
      ? items.filter((item) => favoriteIds.includes(item.id) && matchesSearch(item))
      : items.filter(matchesSearch);

  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh]">
        <div className="hidden w-sidebar shrink-0 lg:block" />
        <div className="flex-1 p-6">
          <div className="h-8 w-48 animate-pulse rounded bg-surface-input" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col lg:flex-row">
      <GallerySidebar active={tab === "favorites" ? "favorites" : "all"} />

      <div className="flex-1 p-4 lg:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            {tab === "favorites" ? "Favorites" : "All assets"}
          </h1>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-xs text-muted-foreground">Grid size</span>
            <input type="range" min={1} max={3} defaultValue={2} className="w-24 accent-brand" />
          </div>
        </div>

        {displayItems.length === 0 ? (
          <EmptyGallery variant={tab === "favorites" ? "favorites" : "all"} />
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {displayItems.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="absolute inset-0 z-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageBase64}
                    alt={item.basePrompt.slice(0, 60)}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </button>
                <button
                  type="button"
                  aria-label={isFavorite(item.id) ? "Remove from favorites" : "Add to favorites"}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className="absolute right-2 top-2 z-10 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition hover:bg-black/80"
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      isFavorite(item.id) && "fill-brand text-brand"
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl border-border bg-surface">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>Generation detail</DialogTitle>
              </DialogHeader>
              <div className="overflow-hidden rounded-card border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.imageBase64}
                  alt={selected.basePrompt}
                  className="max-h-[50vh] w-full object-contain"
                />
              </div>
              <p className="text-sm text-muted-foreground">{selected.basePrompt}</p>
              {selected.styles.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Styles: {styleLabels(selected.styles)}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {new Date(selected.createdAt).toLocaleString()} · {selected.aspectRatio}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  onClick={() => toggleFavorite(selected.id)}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      isFavorite(selected.id) && "fill-current"
                    )}
                  />
                  {isFavorite(selected.id) ? "Unfavorite" : "Favorite"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    downloadDataUrl(
                      selected.imageBase64,
                      `gallery-${selected.id}.png`
                    )
                  }
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    removeItem(selected.id);
                    setSelected(null);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EmptyGallery({ variant }: { variant: "all" | "favorites" }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-border py-20 text-center">
      <div className="mb-6 flex -space-x-2">
        {[
          HIGGS_STATIC.nanoBanana,
          HIGGS_STATIC.genjutsu,
          HIGGS_STATIC.seedance25,
          HIGGS_STATIC.marketingStudio,
        ].map((src, i) => (
          <div
            key={src}
            className={cn(
              "relative h-14 w-14 overflow-hidden rounded-xl border border-border",
              i % 2 === 0 && "rotate-3",
              i % 2 === 1 && "-rotate-3"
            )}
          >
            <RemoteImg src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
      <p className="text-lg font-medium">
        {variant === "favorites"
          ? "No favorites yet"
          : "Your generations will appear here"}
      </p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {variant === "favorites"
          ? "Heart any generation in All assets to save it here."
          : "Use folders to keep your work organized."}
      </p>
      <Button className="mt-8 rounded-pill" size="lg" asChild>
        <Link href="/create/image">
          <Sparkles className="h-4 w-4" />
          + Generate
        </Link>
      </Button>
    </div>
  );
}
