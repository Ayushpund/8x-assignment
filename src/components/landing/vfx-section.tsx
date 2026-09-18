import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoopVideo } from "@/components/ui/loop-video";
import { VFX_PRESETS } from "@/lib/navigation";
import { VFX_PRESET_HREFS } from "@/lib/vfx-preset-links";
import { VFX_LOOP_VIDEOS } from "@/lib/higgs-videos";
import { higgsExploreImage } from "@/lib/higgs-media";

const vfxPosters = [
  higgsExploreImage(
    "1a6a226e8611b061e0b9f37ab843d6bd7bff420e46cfb72531375e9d5b2052b3-thumbnail.webp",
    500
  ),
  higgsExploreImage(
    "5aaa4da5fe1aa5a2cc69996c8e9eddc019f68c36dae81c2c587ff5f3e4a87954-thumbnail.webp",
    500
  ),
  higgsExploreImage(
    "74c63b88a889cb7f0f4389b8ae945592ff66d7cbcf41b48f9132fa341803a090-thumbnail.webp",
    500
  ),
  higgsExploreImage(
    "c743629411ff8267c2920e116ce3790e5a303727efe964811b7bcf8b138b736b-thumbnail.webp",
    500
  ),
];

export function VfxSection() {
  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-brand md:text-3xl">
            Visual Effects
          </h2>
          <p className="mt-1 max-w-xl text-muted-foreground">
            Big-budget visual effects, from explosions to surreal transformations.
          </p>
        </div>
        <Button asChild className="rounded-full">
          <Link href="/effects">Start generating</Link>
        </Button>
      </div>
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin sm:gap-3">
        {VFX_PRESETS.map((name, i) => {
          const video = VFX_LOOP_VIDEOS[i % VFX_LOOP_VIDEOS.length]!;
          const poster = vfxPosters[i % vfxPosters.length]!;
          return (
            <Link
              key={name}
              href={VFX_PRESET_HREFS[i] ?? "/create"}
              className="group w-[150px] shrink-0 sm:w-[170px] md:w-[190px]"
            >
              <div className="relative aspect-[3/4] min-h-[200px] overflow-hidden rounded-2xl border border-[#2a2a2a] bg-black">
                <LoopVideo src={video} poster={poster} fill keepAlive lazy />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="text-xs text-brand">Recreate</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Link
        href="/effects"
        className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
      >
        View all presets
      </Link>
    </section>
  );
}
