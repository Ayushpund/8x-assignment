import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoopVideo } from "@/components/ui/loop-video";
import { RemoteImg } from "@/components/ui/remote-img";
import { HOME_EXPLORE_IMAGES } from "@/lib/home-explore-media";
import { HERO_CARD_VIDEOS } from "@/lib/higgs-videos";

export function GenjutsuGallerySection() {
  const items = HOME_EXPLORE_IMAGES.slice(0, 10);

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Higgsfield Genjutsu
          </h2>
          <p className="mt-2 text-muted-foreground">
            Take the motion and recast it with your characters, locations, and
            products, or swap specific elements while keeping the rest untouched.
          </p>
        </div>
        <Button variant="secondary" asChild className="rounded-full">
          <Link href="/genjutsu">View all presets</Link>
        </Button>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin sm:gap-3">
        {items.map((src, i) => (
          <Link
            key={`${src}-${i}`}
            href="/genjutsu"
            className="group w-[150px] shrink-0 sm:w-[170px] md:w-[190px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#2a2a2a] bg-black">
              {i < 5 ? (
                <LoopVideo
                  src={HERO_CARD_VIDEOS[i % HERO_CARD_VIDEOS.length]!}
                  poster={src}
                  fill
                  keepAlive
                  lazy
                />
              ) : (
                <RemoteImg src={src} alt="" fill className="object-cover" />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-brand">
                Recreate
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
