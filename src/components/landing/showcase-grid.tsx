"use client";

import { RemoteImg } from "@/components/ui/remote-img";
import { SHOWCASE_IMAGES } from "@/lib/showcase-images";
import { cn } from "@/lib/utils";

const aspectClass: Record<string, string> = {
  square: "aspect-square",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "16/10": "aspect-[16/10]",
  "9/16": "aspect-[9/16]",
};

export function ShowcaseGrid() {
  return (
    <section id="showcase" className="scroll-mt-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-brand md:text-3xl">
          GPT Image 2
        </h2>
        <p className="mt-1 text-muted-foreground">
          4K-style images with near-perfect text rendering — sample community work.
        </p>
      </div>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {SHOWCASE_IMAGES.map((item) => (
          <div
            key={item.id}
            className={cn(
              "relative mb-4 min-h-[140px] break-inside-avoid overflow-hidden rounded-2xl border border-border bg-surface",
              aspectClass[item.aspect] ?? "aspect-square"
            )}
          >
            <RemoteImg src={item.src} alt={item.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
