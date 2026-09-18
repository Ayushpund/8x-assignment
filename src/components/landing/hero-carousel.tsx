"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroCarousel } from "@/lib/mock-data";
import { LoopVideo } from "@/components/ui/loop-video";
import { cn } from "@/lib/utils";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % heroCarousel.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const slide = heroCarousel[index]!;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[20px] border border-border bg-surface">
        <Link href={slide.href} className="group block">
          <div className="relative isolate aspect-[16/7] min-h-[220px] w-full overflow-hidden sm:aspect-[16/6]">
            {slide.video ? (
              <LoopVideo
                key={slide.video}
                src={slide.video}
                poster={slide.image}
                fill
                lazy={false}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(212,255,0,0.12),transparent_45%)]" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-widest text-brand">
                Open {slide.title}
              </p>
              <h2 className="mt-2 max-w-2xl text-xl font-bold tracking-tight sm:text-3xl">
                {slide.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                {slide.description}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="flex gap-1.5">
          {heroCarousel.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-8 bg-brand" : "w-3 bg-surface-hover"
              )}
            />
          ))}
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() =>
              setIndex((i) => (i - 1 + heroCarousel.length) % heroCarousel.length)
            }
            className="rounded-lg border border-border p-2 hover:bg-surface-hover"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % heroCarousel.length)}
            className="rounded-lg border border-border p-2 hover:bg-surface-hover"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
