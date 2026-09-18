import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { TemplatesGrid } from "@/components/templates/templates-grid";
import { Button } from "@/components/ui/button";

export default function TemplatesPage() {
  return (
    <PageShell variant="marketing">
      <div className="border-b border-border-subtle bg-surface/40">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-end justify-between gap-4 px-4 py-10 lg:px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Soul · Nano Banana
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Prompt templates
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Curated looks from the official Higgsfield-style library — product,
              cinematic, fashion, and VFX-ready prompts. One click opens Create
              with everything pre-filled.
            </p>
          </div>
          <Button variant="secondary" asChild>
            <Link href="/effects">Browse VFX presets</Link>
          </Button>
        </div>
      </div>
      <div className="mx-auto max-w-[1600px] px-4 py-8 lg:px-6">
        <TemplatesGrid />
      </div>
    </PageShell>
  );
}
