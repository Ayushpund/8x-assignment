import Link from "next/link";
import { RemoteImg } from "@/components/ui/remote-img";
import type { ExploreModel } from "@/lib/explore-models";
import { cn } from "@/lib/utils";

type Props = {
  model: ExploreModel;
  variant?: "grid" | "featured";
};

export function ExploreModelCard({ model, variant = "grid" }: Props) {
  const featured = variant === "featured";

  return (
    <Link
      href={model.href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#111] transition hover:border-[#3a3a3a]",
        featured && "min-w-[min(100%,420px)] flex-1 snap-center"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[#0d0d0d]",
          featured ? "aspect-[16/10]" : "aspect-[4/3]"
        )}
      >
        <RemoteImg
          src={model.thumbnail}
          alt={model.name}
          fill
          className="transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {model.discount && (
            <span className="rounded-md bg-brand px-2 py-0.5 text-[10px] font-bold text-brand-foreground">
              {model.discount}
            </span>
          )}
          {model.exclusive && (
            <span className="rounded-md bg-[#333] px-2 py-0.5 text-[10px] font-semibold text-white">
              Exclusive
            </span>
          )}
        </div>
        <span className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          {model.type}
        </span>
      </div>

      <div className={cn("flex flex-1 flex-col p-4", featured && "p-5")}>
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {model.provider}
        </p>
        <h3 className={cn("mt-1 font-semibold text-foreground", featured && "text-lg")}>
          {model.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-snug text-muted-foreground">
          {model.description}
        </p>
        <div className="mt-3 flex flex-wrap items-baseline gap-2 text-sm">
          <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black transition group-hover:bg-white/90">
            Explore model
          </span>
          <span className="text-muted-foreground">
            from{" "}
            <span className="font-medium text-foreground">{model.priceFrom}</span>
            {model.priceWas && (
              <span className="ml-1.5 text-xs line-through opacity-50">
                {model.priceWas}
              </span>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
