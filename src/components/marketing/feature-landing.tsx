import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RemoteImg } from "@/components/ui/remote-img";
import type { FeaturePageConfig } from "@/lib/feature-pages";

export function FeatureLanding({ page }: { page: FeaturePageConfig }) {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 lg:px-6 lg:py-10">
      <div className="overflow-hidden rounded-[24px] border border-border bg-surface">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[280px] lg:min-h-[420px]">
            <RemoteImg src={page.heroImage} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent lg:from-black/60" />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              {page.eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {page.title}
            </h1>
            <p className="mt-4 text-base text-muted-foreground">{page.description}</p>
            <ul className="mt-6 space-y-2">
              {page.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 shrink-0 text-brand" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href={page.ctaPrimary.href}>{page.ctaPrimary.label}</Link>
              </Button>
              {page.ctaSecondary && (
                <Button size="lg" variant="secondary" asChild>
                  <Link href={page.ctaSecondary.href}>{page.ctaSecondary.label}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {page.galleryImages.map((src, i) => (
          <div
            key={src}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border"
          >
            <RemoteImg src={src} alt="" fill className="object-cover" />
            <div className="absolute bottom-3 left-3 rounded bg-black/50 px-2 py-1 text-xs backdrop-blur-sm">
              Sample {i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
