"use client";

import Link from "next/link";
import { LoopVideo } from "@/components/ui/loop-video";
import { PROMO_HERO_VIDEO } from "@/lib/higgs-videos";
import { HIGGS_STATIC } from "@/lib/higgs-media";

const sideCards = [
  {
    href: "/mcp",
    title: "MCP & CLI",
    description: "Turn Claude into a creative engine",
  },
  {
    href: "/cinema-studio",
    title: "Cinema Studio 4.0",
    description: "Create cinematic scenes effortlessly",
  },
  {
    href: "/enterprise",
    title: "Supercomputer",
    description: "Agent powered by GPT-6 Astra",
  },
] as const;

export function HomeFeatureStrip() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
      <Link
        href="/pricing"
        className="group relative isolate min-h-[140px] overflow-hidden rounded-2xl border border-border sm:min-h-[160px] xl:row-span-1"
      >
        <LoopVideo
          src={PROMO_HERO_VIDEO}
          poster={HIGGS_STATIC.landscapePromo}
          fill
          lazy={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
        <div className="relative flex h-full flex-col justify-end p-4 md:p-5">
          <span className="inline-flex w-fit rounded-xl bg-brand px-4 py-2.5 text-sm font-black uppercase tracking-tight text-brand-foreground shadow-lg">
            Get with 54% OFF
          </span>
          <span className="mt-2 inline-flex w-fit rounded-md bg-accent-pink px-2 py-0.5 text-[10px] font-bold text-white">
            Discount expires soon
          </span>
        </div>
      </Link>

      {sideCards.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className="flex min-h-[140px] flex-col justify-end rounded-2xl border border-border bg-[#141414] p-4 transition hover:border-brand/30 hover:bg-[#1a1a1a] sm:min-h-[160px] md:p-5"
        >
          <p className="text-[15px] font-semibold leading-tight">{card.title}</p>
          <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
            {card.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
