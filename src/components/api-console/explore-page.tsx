"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Filter, Search } from "lucide-react";
import { ExploreModelCard } from "@/components/api-console/explore-model-card";
import { RemoteImg } from "@/components/ui/remote-img";
import { ApiConsoleSections } from "@/components/api-console/api-console-sections";
import { ApiExploreAuthNote } from "@/components/api-console/api-explore-auth-note";
import {
  EXPLORE_CATALOG,
  EXPLORE_FEATURED,
  type ExploreModel,
} from "@/lib/explore-models";
import { higgsExploreImage } from "@/lib/higgs-media";

const ALL_EXPLORE_MODELS: ExploreModel[] = [
  ...EXPLORE_FEATURED,
  ...EXPLORE_CATALOG,
];
import { cn } from "@/lib/utils";

type FilterTab = "all" | "image" | "video" | "workflow";

const CAROUSEL_SLIDES = [
  higgsExploreImage(
    "1a6a226e8611b061e0b9f37ab843d6bd7bff420e46cfb72531375e9d5b2052b3-thumbnail.webp",
    1920
  ),
  higgsExploreImage(
    "5aaa4da5fe1aa5a2cc69996c8e9eddc019f68c36dae81c2c587ff5f3e4a87954-thumbnail.webp",
    1920
  ),
  higgsExploreImage(
    "53532530183a9f3450c6af708c5f15a16e5267bcfabb5d439f517a038c9b3ab4-image.webp",
    1920
  ),
];

function matchesTab(model: ExploreModel, tab: FilterTab) {
  if (tab === "all") return true;
  if (tab === "image") return model.type === "Image";
  if (tab === "video") return model.type === "Video";
  return model.type === "Workflow";
}

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return;
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export function ExplorePage() {
  const [tab, setTab] = useState<FilterTab>("all");
  const [query, setQuery] = useState("");
  const [slide, setSlide] = useState(0);
  const [dealsOnly, setDealsOnly] = useState(false);

  useEffect(() => {
    scrollToHash(window.location.hash);
    const onHash = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_EXPLORE_MODELS.filter((m) => {
      if (!matchesTab(m, tab)) return false;
      if (dealsOnly && !m.discount) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      );
    });
  }, [tab, query, dealsOnly]);

  return (
    <div className="px-4 py-5 lg:px-8 lg:py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Explore models
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Every image and video generation model on Higgsfield API, with live
          pricing. Search the catalog, compare modalities, and open any model in
          the playground.
        </p>
      </div>

      {/* Featured model cards — matches console top row */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {EXPLORE_FEATURED.map((model) => (
          <ExploreModelCard key={model.id} model={model} variant="featured" />
        ))}
      </div>

      {/* Visual carousel strip */}
      <div className="relative mt-4 overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d]">
        <div className="relative aspect-[21/9] min-h-[140px] md:min-h-[200px]">
          {CAROUSEL_SLIDES.map((src, i) => (
            <div
              key={src}
              className={cn(
                "absolute inset-0 transition-opacity duration-700",
                i === slide ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <RemoteImg src={src} alt="" fill className="object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {CAROUSEL_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlide(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === slide ? "w-6 bg-white" : "w-1.5 bg-white/40"
              )}
            />
          ))}
        </div>
      </div>

      {/* Filters — sticky like console */}
      <div
        id="search"
        className="sticky top-0 z-10 -mx-4 mt-6 border-b border-[#222] bg-[#0a0a0a]/95 px-4 py-3 backdrop-blur-md lg:-mx-8 lg:px-8"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 rounded-xl bg-[#141414] p-1">
            {(
              [
                ["all", "All models"],
                ["image", "Image"],
                ["video", "Video"],
                ["workflow", "Workflow"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition md:px-4",
                  tab === id
                    ? "bg-[#2a2a2a] text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative min-w-0 flex-1 sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search models"
                className="w-full rounded-xl border border-[#2a2a2a] bg-[#141414] py-2.5 pl-9 pr-3 text-sm focus:border-brand/40 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setDealsOnly((v) => !v)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2 text-sm transition",
                dealsOnly
                  ? "border-brand/50 bg-brand/10 text-brand"
                  : "border-[#2a2a2a] bg-[#141414] text-muted-foreground"
              )}
            >
              <Filter className="h-4 w-4" />
              {dealsOnly ? "Deals on" : "Deals only"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((model) => (
          <ExploreModelCard key={model.id} model={model} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No models match your search.{" "}
          <button
            type="button"
            className="text-brand underline"
            onClick={() => {
              setQuery("");
              setTab("all");
            }}
          >
            Clear filters
          </button>
        </p>
      )}

      <ApiExploreAuthNote />

      <ApiConsoleSections />
    </div>
  );
}
