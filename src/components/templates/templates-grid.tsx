"use client";

import Link from "next/link";
import Image from "next/image";
import { TEMPLATE_PRESETS } from "@/lib/templates";
import { cn } from "@/lib/utils";

export function TemplatesGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {TEMPLATE_PRESETS.map((template) => (
        <Link
          key={template.id}
          href={`/create/image?template=${template.id}`}
          className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-surface transition hover:border-brand/40 hover:shadow-card-hover"
        >
          <Image
            src={template.thumbnail}
            alt={template.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
            sizes="(max-width:640px) 50vw, 20vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-90 transition group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-sm font-semibold leading-snug text-white">
              {template.name}
            </p>
            <p className="mt-1 line-clamp-2 text-[11px] text-white/70">
              {template.description}
            </p>
            <span
              className={cn(
                "mt-2 inline-block rounded bg-brand px-2 py-0.5 text-[10px] font-bold uppercase text-brand-foreground opacity-0 transition group-hover:opacity-100"
              )}
            >
              Use template
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
