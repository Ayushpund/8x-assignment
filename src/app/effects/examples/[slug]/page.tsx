import { redirect, notFound } from "next/navigation";
import { templateForVfxSlug, VFX_EFFECT_SLUGS } from "@/lib/vfx-effect-slugs";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return VFX_EFFECT_SLUGS.map((slug) => ({ slug }));
}

export default function VfxExamplePage({ params }: Props) {
  const template = templateForVfxSlug(params.slug);
  if (!template) notFound();
  redirect(`/create/video?template=${template}`);
}
