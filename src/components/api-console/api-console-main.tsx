"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Filter, Search } from "lucide-react";
import { API_MODELS } from "@/lib/api-models";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "image" | "video";

export function ApiConsoleMain() {
  const [tab, setTab] = useState<FilterTab>("all");
  const [query, setQuery] = useState("");

  const filtered = API_MODELS.filter((m) => {
    if (tab === "image" && m.type !== "Image") return false;
    if (tab === "video" && m.type !== "Video") return false;
    if (query && !m.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="px-4 py-6 lg:px-8">
      {/* Hero — Marketing Studio */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-[#111]">
        <div className="relative min-h-[280px] md:min-h-[320px]">
          <Image
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1400&q=80"
            alt=""
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-[10px] font-black text-brand-foreground">
                H
              </span>
              <span className="text-sm font-medium text-white/80">Higgsfield</span>
            </div>
            {API_MODELS[0]?.badge && (
              <span className="mb-2 w-fit rounded bg-brand px-2 py-0.5 text-[10px] font-bold text-brand-foreground">
                {API_MODELS[0].badge}
              </span>
            )}
            <h1 className="max-w-2xl text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              Marketing Studio Image
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/70">
              Generate or edit campaign images with optional preset-guided Marketing
              Studio prompt enhancement.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/create?template=marble-product"
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90"
              >
                Explore model
              </Link>
              <p className="text-sm text-white/80">
                from{" "}
                <span className="font-semibold text-white">{API_MODELS[0]?.price}</span>
                {API_MODELS[0]?.oldPrice && (
                  <span className="ml-2 text-white/40 line-through">
                    {API_MODELS[0].oldPrice}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-xl bg-[#141414] p-1">
          {(
            [
              ["all", "All models"],
              ["image", "Image"],
              ["video", "Video"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition",
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
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full rounded-xl border border-border bg-[#141414] py-2.5 pl-9 pr-3 text-sm focus:border-brand/40 focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-[#141414] px-4 py-2 text-sm text-muted-foreground"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Model grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((model) => (
          <Link
            key={model.id}
            href={model.href}
            className="group overflow-hidden rounded-2xl border border-border bg-[#111] transition hover:border-brand/30"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={model.thumbnail}
                alt={model.name}
                fill
                className="object-cover transition group-hover:scale-[1.02]"
                unoptimized
              />
              <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                {model.type}
              </span>
              {model.badge && (
                <span className="absolute right-2 top-2 rounded bg-brand px-2 py-0.5 text-[9px] font-bold text-brand-foreground">
                  {model.badge}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{model.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{model.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
