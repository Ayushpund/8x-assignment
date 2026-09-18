import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { RemoteImg } from "@/components/ui/remote-img";
import { higgsExploreImage, HIGGS_STATIC } from "@/lib/higgs-media";

const masonry = [
  { src: HIGGS_STATIC.genjutsu, h: "h-[280px]" },
  {
    src: higgsExploreImage(
      "847a08a539f44a715925a716c50f53f43d3073aeaa5a884921beb9394f810e04-thumbnail.webp",
      800
    ),
    h: "h-[360px]",
  },
  {
    src: higgsExploreImage(
      "5aaa4da5fe1aa5a2cc69996c8e9eddc019f68c36dae81c2c587ff5f3e4a87954-thumbnail.webp",
      800
    ),
    h: "h-[200px]",
  },
  {
    src: higgsExploreImage(
      "1a6a226e8611b061e0b9f37ab843d6bd7bff420e46cfb72531375e9d5b2052b3-thumbnail.webp",
      800
    ),
    h: "h-[420px]",
  },
  {
    src: higgsExploreImage(
      "52a6ceab9e44aa8dea42343c337a6b236690253920b4a2181b6c45cbb023ce49-image.webp",
      800
    ),
    h: "h-[240px]",
  },
  {
    src: HIGGS_STATIC.landscapePromo,
    h: "h-[320px]",
  },
  {
    src: higgsExploreImage(
      "e88805fcb31442389587a2953675fd723ee8d4cb5a317e6280b5d1cca979e152-thumbnail.webp",
      800
    ),
    h: "h-[280px]",
  },
  {
    src: higgsExploreImage(
      "74c63b88a889cb7f0f4389b8ae945592ff66d7cbcf41b48f9132fa341803a090-thumbnail.webp",
      800
    ),
    h: "h-[200px]",
  },
];

export function GenjutsuLanding() {
  return (
    <PageShell variant="marketing">
      <div className="mx-auto max-w-[1600px] px-4 py-8 lg:px-6">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block rounded-md bg-brand px-2 py-1 text-[10px] font-bold uppercase text-brand-foreground">
              New model
            </span>
            <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-brand md:text-5xl lg:text-6xl">
              Higgsfield Genjutsu
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Reality Manipulation — transfer motion into new scenes, or swap details
              while everything else stays as filmed.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="/create/video?model=genjutsu">Try free</Link>
            </Button>
            <Button size="lg" variant="secondary" className="rounded-full px-8" asChild>
              <Link href="/help">Learn more</Link>
            </Button>
          </div>
        </div>

        <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 lg:gap-4">
          {masonry.map((item, i) => (
            <Link
              key={i}
              href="/create/video?model=genjutsu"
              className={`mb-3 block break-inside-avoid overflow-hidden rounded-2xl border border-border bg-surface lg:mb-4 ${item.h}`}
            >
              <div className="relative h-full min-h-[160px] w-full">
                <RemoteImg src={item.src} alt="" fill className="object-cover" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
