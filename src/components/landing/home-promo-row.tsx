import Link from "next/link";
import { toolCards } from "@/lib/mock-data";
import { Film, ImageIcon, Sparkles, Terminal, Clapperboard, Cpu } from "lucide-react";
import { RemoteImg } from "@/components/ui/remote-img";
import { LoopVideo } from "@/components/ui/loop-video";
import { HIGGS_STATIC } from "@/lib/higgs-media";
import { PROMO_HERO_VIDEO } from "@/lib/higgs-videos";

const icons: Record<string, React.ReactNode> = {
  seedance: <Film className="h-3.5 w-3.5" />,
  "nano-banana": <ImageIcon className="h-3.5 w-3.5" />,
  remix: <Sparkles className="h-3.5 w-3.5" />,
  mcp: <Terminal className="h-3.5 w-3.5" />,
  cinema: <Clapperboard className="h-3.5 w-3.5" />,
  super: <Cpu className="h-3.5 w-3.5" />,
};

export function HomePromoRow() {
  return (
    <div className="grid gap-3 lg:grid-cols-[1.45fr_1fr]">
      <Link
        href="/pricing"
        className="group relative isolate min-h-[320px] overflow-hidden rounded-[20px] border border-[#2a2a2a] lg:min-h-[380px]"
      >
        <LoopVideo
          src={PROMO_HERO_VIDEO}
          poster={HIGGS_STATIC.landscapePromo}
          fill
          lazy={false}
          keepAlive
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
          <h2 className="max-w-lg text-2xl font-black uppercase leading-tight tracking-tight text-white md:text-3xl">
            Unlimited Nano Banana Pro with Personal{" "}
            <span className="text-brand">54% OFF</span>
          </h2>
          <p className="mt-2 max-w-md text-sm text-white/70">
            7-day unlimited Nano Banana Pro, Nano Banana 2 and Kling 3.0
          </p>
          <span className="mt-5 inline-flex w-fit rounded-xl bg-brand px-4 py-2 text-sm font-bold text-brand-foreground">
            Get with 54% OFF
          </span>
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {toolCards.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="group relative flex min-h-[140px] flex-col overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#141414] p-3 transition hover:border-brand/30 sm:min-h-[155px]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <RemoteImg
                src={tool.image}
                alt=""
                fill
                className="object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/90 to-[#141414]/60" />
            </div>
            <div className="relative mb-2 flex items-start justify-between gap-1">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#222]/90 text-muted-foreground backdrop-blur-sm">
                {icons[tool.id]}
              </span>
              <div className="flex flex-col items-end gap-0.5">
                {tool.badge === "TOP" && (
                  <span className="rounded bg-accent-pink px-1 py-px text-[8px] font-bold uppercase text-white">
                    Top
                  </span>
                )}
                {tool.tag && (
                  <span
                    className={
                      tool.tag === "Free" || tool.tag === "New"
                        ? "rounded bg-brand/20 px-1 py-px text-[8px] font-bold uppercase text-brand"
                        : "text-[9px] text-muted-foreground"
                    }
                  >
                    {tool.tag === "Free" || tool.tag === "New"
                      ? tool.tag
                      : `· ${tool.tag}`}
                  </span>
                )}
              </div>
            </div>
            <p className="relative text-[13px] font-semibold leading-tight">{tool.title}</p>
            <p className="relative mt-1 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
