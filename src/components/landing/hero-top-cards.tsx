"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { heroCarousel } from "@/lib/mock-data";
import { LoopVideo } from "@/components/ui/loop-video";
import { cn } from "@/lib/utils";

function HeroCardTitle({ title }: { title: string }) {
  const parts = title.split(" ");
  const accent = parts.pop() ?? "";
  const lead = parts.join(" ");
  return (
    <h3 className="text-[11px] font-black uppercase tracking-[0.12em]">
      <span className="text-white">{lead} </span>
      <span className="text-brand">{accent}</span>
    </h3>
  );
}

/** Three-up hero row + carousel — higgsfield.ai home top */
export function HeroTopCards() {
  const [start, setStart] = useState(0);
  const visibleCount = 3;
  const len = heroCarousel.length;

  useEffect(() => {
    const t = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setStart((s) => (s + 1) % len);
    }, 8000);
    return () => clearInterval(t);
  }, [len]);

  const visible = Array.from({ length: visibleCount }, (_, i) => {
    return heroCarousel[(start + i) % len]!;
  });

  return (
    <div className="relative space-y-3">
      <div className="grid gap-2 sm:gap-3 lg:grid-cols-3">
        {visible.map((card, index) => (
          <div key={`${card.id}-${start}-${index}`} className="relative">
            <Link
              href={card.href}
              className="group relative block overflow-hidden rounded-[18px] border border-[#2a2a2a] bg-[#0a0a0a] transition hover:border-brand/35"
            >
              <div className="relative aspect-[16/9] min-h-[220px] overflow-hidden sm:min-h-[260px] lg:min-h-[300px]">
                {card.video ? (
                  <LoopVideo
                    key={`${card.id}-${card.video}`}
                    src={card.video}
                    poster={card.image}
                    fill
                    lazy={false}
                    keepAlive
                  />
                ) : null}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/92 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <HeroCardTitle title={card.title} />
                  <p className="mt-1.5 text-[13px] leading-snug text-white/75">
                    {card.description}
                  </p>
                </div>
              </div>
            </Link>
            {index === visibleCount - 1 ? (
              <button
                type="button"
                aria-label="Next featured cards"
                onClick={() => setStart((s) => (s + 1) % len)}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-sm transition hover:border-brand/50 hover:bg-black"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-1.5">
        {heroCarousel.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show ${slide.title}`}
            onClick={() => setStart(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === start ? "w-8 bg-brand" : "w-3 bg-[#333]"
            )}
          />
        ))}
      </div>
    </div>
  );
}
