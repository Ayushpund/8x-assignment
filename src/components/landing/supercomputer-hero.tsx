import type { ReactNode } from "react";
import Link from "next/link";
import {
  Megaphone,
  MousePointer2,
  Sparkles,
  UserRound,
  Video,
} from "lucide-react";
import { RemoteImg } from "@/components/ui/remote-img";
import { higgsExploreImage } from "@/lib/higgs-media";

const ugcThumbs = [
  higgsExploreImage(
    "aa642d35ed929d33feab8bbe4389d33ad8f65e384576ed6a25532e762c94bbd0-image.webp",
    400
  ),
  higgsExploreImage(
    "52a6ceab9e44aa8dea42343c337a6b236690253920b4a2181b6c45cbb023ce49-image.webp",
    400
  ),
  higgsExploreImage(
    "d33e1b969add4c0e54ad3f0c22e0a46c2ad5bc96372525e89230fbad2177ece1-image.webp",
    400
  ),
];

const marketingThumbs = [
  higgsExploreImage(
    "7ff805cfc3c70a2ca923b1a9002b04e91f6d627dd4d302afe09797ae2e3ca44a-image.webp",
    320
  ),
  higgsExploreImage(
    "53532530183a9f3450c6af708c5f15a16e5267bcfabb5d439f517a038c9b3ab4-image.webp",
    320
  ),
];

const productionThumb = higgsExploreImage(
  "74c63b88a889cb7f0f4389b8ae945592ff66d7cbcf41b48f9132fa341803a090-thumbnail.webp",
  480
);

function GreenPerspectiveGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px] bg-[#030a03]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,255,0,0.12)_0%,transparent_55%)]" />
      <div
        className="absolute left-1/2 top-[46%] h-[170%] w-[240%] -translate-x-1/2 opacity-40"
        style={{
          transform: "translateX(-50%) perspective(480px) rotateX(72deg)",
          backgroundImage: `
            linear-gradient(rgba(212,255,0,0.45) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,255,0,0.45) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000_78%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85" />
    </div>
  );
}

function AgentChip({
  icon,
  label,
  count,
}: {
  icon: ReactNode;
  label: string;
  count?: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-white/90">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-brand">
        {icon}
      </span>
      <span>{label}</span>
      {count ? (
        <span className="ml-auto rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] tabular-nums text-white/70">
          {count}
        </span>
      ) : null}
    </div>
  );
}

export function SupercomputerHero() {
  return (
    <section className="relative">
      <div className="mb-4 flex justify-center">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 rounded-full border border-brand/35 bg-[#0a0a0a] px-5 py-2 text-sm font-medium text-brand transition hover:border-brand/60 hover:bg-brand/5"
        >
          Explore community ↗
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-[28px] border-[3px] border-brand bg-black shadow-[0_0_80px_rgba(212,255,0,0.22),inset_0_0_120px_rgba(212,255,0,0.06)]">
        <div className="relative min-h-[520px] p-3 sm:min-h-[580px] md:min-h-[640px] md:p-4">
          <GreenPerspectiveGrid />

          {/* Floating agent cards — desktop layout like higgsfield.ai */}
          <div className="pointer-events-none absolute left-[4%] top-[18%] z-10 hidden w-[min(280px,28vw)] rounded-2xl border border-white/10 bg-black/75 p-3 shadow-2xl backdrop-blur-md lg:block">
            <AgentChip icon={<UserRound className="h-4 w-4" />} label="UGC Creator" count="2/2" />
            <div className="mt-3 flex gap-2">
              {ugcThumbs.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[3/4] flex-1 overflow-hidden rounded-xl border border-white/10"
                >
                  <RemoteImg src={src} alt="" fill className="object-cover" />
                  {i === 1 ? (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-black/80 px-2 py-0.5 text-[9px] font-bold text-white">
                      UGC ✓
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute right-[6%] top-[12%] z-10 hidden w-[min(260px,26vw)] rounded-2xl border border-white/10 bg-black/75 p-3 shadow-2xl backdrop-blur-md lg:block">
            <AgentChip icon={<Megaphone className="h-4 w-4" />} label="Marketing" />
            <div className="mt-2 flex items-center gap-2 border-b border-white/10 pb-2">
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/20">
                <RemoteImg
                  src={ugcThumbs[0]!}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1 text-[11px]">
                <p className="truncate font-semibold text-white">Ms. Higgs</p>
                <p className="text-white/50">2.1M · 412 videos</p>
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              {marketingThumbs.map((src) => (
                <div
                  key={src}
                  className="relative aspect-video flex-1 overflow-hidden rounded-lg border border-white/10"
                >
                  <RemoteImg src={src} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-[14%] right-[8%] z-10 hidden w-[min(300px,30vw)] rounded-2xl border border-white/10 bg-black/75 p-3 shadow-2xl backdrop-blur-md lg:block">
            <AgentChip icon={<Video className="h-4 w-4" />} label="Production" />
            <p className="mt-2 text-[11px] text-white/60">Scene 04 — Skaterpark</p>
            <div className="relative mt-2 aspect-video overflow-hidden rounded-xl border border-white/10">
              <RemoteImg src={productionThumb} alt="" fill className="object-cover" />
            </div>
          </div>

          <div className="pointer-events-none absolute right-[22%] top-[38%] z-20 hidden items-center gap-2 lg:flex">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white px-3 py-1.5 text-xs font-medium text-black shadow-lg">
              <MousePointer2 className="h-3.5 w-3.5" />
              Visualizing
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground shadow-lg">
              <Sparkles className="h-3.5 w-3.5" />
              Analyzing hooks
            </span>
          </div>

          {/* Center hero */}
          <div className="relative z-[5] flex min-h-[480px] flex-col items-center justify-center px-4 py-16 text-center md:min-h-[560px]">
            <div className="mb-5 flex items-center gap-2">
              {[
                "bg-violet-500",
                "bg-sky-400",
                "bg-amber-400",
                "bg-emerald-400",
                "bg-rose-400",
              ].map((c) => (
                <span
                  key={c}
                  className={`h-9 w-9 rounded-xl ${c} ring-2 ring-black/40`}
                />
              ))}
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tight text-brand sm:text-5xl md:text-6xl lg:text-7xl">
              Supercomputer
            </h2>
            <p className="mt-3 max-w-md text-base text-white/90 md:text-lg">
              One superagent for your entire creative stack
            </p>
            <Link
              href="/enterprise"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-black transition hover:bg-white/90"
            >
              Try Supercomputer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
