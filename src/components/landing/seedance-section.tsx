import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoopVideo } from "@/components/ui/loop-video";
import { RemoteImg } from "@/components/ui/remote-img";
import { HOME_EXPLORE_IMAGES } from "@/lib/home-explore-media";
import { HIGGS_STATIC } from "@/lib/higgs-media";
import { HERO_CARD_VIDEOS } from "@/lib/higgs-videos";

export function SeedanceSection() {
  const thumbs = HOME_EXPLORE_IMAGES.slice(2, 8);

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand">
            Seedance 2.5
          </p>
          <h2 className="mt-1 text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
            The most advanced AI video model
          </h2>
        </div>
        <Button asChild className="rounded-full">
          <Link href="/create/video">View all of Seedance 2.5</Link>
        </Button>
      </div>

      <div className="mb-4 overflow-hidden rounded-[20px] border border-[#2a2a2a]">
        <div className="relative min-h-[280px] md:min-h-[360px]">
          <LoopVideo
            src={HERO_CARD_VIDEOS[0]!}
            poster={HIGGS_STATIC.seedance25}
            fill
            lazy={false}
            keepAlive
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin sm:gap-3">
        {thumbs.map((src, i) => (
          <Link
            key={src}
            href="/create/video"
            className="group relative w-[140px] shrink-0 sm:w-[160px] md:w-[180px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#2a2a2a] bg-black">
              {i < 4 ? (
                <LoopVideo
                  src={HERO_CARD_VIDEOS[(i + 2) % HERO_CARD_VIDEOS.length]!}
                  poster={src}
                  fill
                  keepAlive
                  lazy
                />
              ) : (
                <RemoteImg src={src} alt="" fill className="object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 transition group-hover:opacity-100" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
