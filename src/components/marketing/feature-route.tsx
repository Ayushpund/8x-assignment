import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { FeatureLanding } from "@/components/marketing/feature-landing";
import { getFeaturePage } from "@/lib/feature-pages";

export function FeatureRoute({ slug }: { slug: string }) {
  const page = getFeaturePage(slug);
  if (!page) notFound();

  return (
    <PageShell variant="marketing">
      <FeatureLanding page={page} />
    </PageShell>
  );
}
