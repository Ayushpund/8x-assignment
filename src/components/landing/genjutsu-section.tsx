import Link from "next/link";
import { HIGGS_STATIC } from "@/lib/higgs-media";
import { HERO_CARD_VIDEOS } from "@/lib/higgs-videos";
import { LoopVideo } from "@/components/ui/loop-video";
import { Button } from "@/components/ui/button";

export function GenjutsuSection() {
  return (
    <section className="overflow-hidden rounded-[24px] border border-[#2a2a2a] bg-[#0a0a0a]">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[380px]">
          <LoopVideo
            src={HERO_CARD_VIDEOS[1]!}
            poster={HIGGS_STATIC.genjutsu}
            fill
            lazy={false}
            keepAlive
          />
          <span className="absolute left-4 top-4 rounded bg-brand px-2 py-1 text-[10px] font-bold uppercase text-brand-foreground">
            New model
          </span>
        </div>
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Higgsfield Genjutsu
          </h2>
          <p className="mt-4 text-muted-foreground">
            Reality Manipulation — transfer motion into new scenes, or swap
            details while everything else stays as filmed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/create/video">Start generating</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/genjutsu">Learn more</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
