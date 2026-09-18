import { VFX_PRESETS } from "@/lib/navigation";
import { TEMPLATE_PRESETS } from "@/lib/templates";

export function vfxSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export const VFX_EFFECT_SLUGS = VFX_PRESETS.map(vfxSlug);

export function hrefForVfxIndex(index: number): string {
  const slug = VFX_EFFECT_SLUGS[index] ?? "floating-fall";
  return `/effects/examples/${slug}`;
}

export function templateForVfxSlug(slug: string): string | undefined {
  const i = VFX_EFFECT_SLUGS.indexOf(slug);
  if (i < 0) return undefined;
  return TEMPLATE_PRESETS[i % TEMPLATE_PRESETS.length]?.id;
}

export const VFX_PRESET_HREFS = VFX_PRESETS.map((_, i) => hrefForVfxIndex(i));
