"use client";

import Link from "next/link";
import { heroCarousel } from "@/lib/mock-data";
import { LoopVideo } from "@/components/ui/loop-video";

/** Compact video cards — same media as the main hero carousel */
export function HeroFeatureCards() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {heroCarousel.slice(0, 3).map((card) => (
        <Link
          key={card.id}
          href={card.href}
          className="group overflow-hidden rounded-2xl border border-border bg-[#111] transition hover:border-brand/25"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            {card.video ? (
              <LoopVideo src={card.video} poster={card.image} fill />
            ) : null}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          </div>
          <div className="space-y-1 px-4 py-3">
            <h3 className="text-[11px] font-bold uppercase tracking-wide text-brand">
              {card.title}
            </h3>
            <p className="text-[13px] leading-snug text-muted-foreground">
              {card.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
