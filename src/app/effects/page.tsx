import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { FeatureLanding } from "@/components/marketing/feature-landing";
import { getFeaturePage } from "@/lib/feature-pages";
import { VFX_PRESETS } from "@/lib/navigation";
import { VFX_PRESET_HREFS } from "@/lib/vfx-preset-links";
import { VFX_LOOP_VIDEOS } from "@/lib/higgs-videos";
import { LoopVideo } from "@/components/ui/loop-video";
import { higgsExploreImage } from "@/lib/higgs-media";

const posters = [
  higgsExploreImage(
    "1a6a226e8611b061e0b9f37ab843d6bd7bff420e46cfb72531375e9d5b2052b3-thumbnail.webp",
    500
  ),
  higgsExploreImage(
    "5aaa4da5fe1aa5a2cc69996c8e9eddc019f68c36dae81c2c587ff5f3e4a87954-thumbnail.webp",
    500
  ),
];

export default function EffectsPage() {
  const page = getFeaturePage("effects")!;

  return (
    <PageShell variant="marketing">
      <FeatureLanding page={page} />
      <div className="mx-auto max-w-[1600px] px-4 pb-16 lg:px-6">
        <h2 className="mb-6 text-2xl font-bold">All presets</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {VFX_PRESETS.map((name, i) => (
            <Link
              key={name}
              href={VFX_PRESET_HREFS[i] ?? "/create"}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-black"
            >
              <LoopVideo
                src={VFX_LOOP_VIDEOS[i % VFX_LOOP_VIDEOS.length]!}
                poster={posters[i % posters.length]!}
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-xs font-semibold leading-tight">{name}</p>
                <p className="text-[10px] font-medium text-brand">Recreate</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
