export const STYLE_PRESETS = [
  { id: "cinematic", label: "Cinematic", suffix: ", cinematic lighting, film grain, anamorphic lens" },
  { id: "product", label: "Product Shot", suffix: ", professional product photography, clean background" },
  { id: "portrait", label: "Portrait", suffix: ", studio portrait, shallow depth of field" },
  { id: "fashion", label: "Fashion Editorial", suffix: ", high fashion editorial, vogue style" },
  { id: "anime", label: "Anime", suffix: ", anime illustration style, vibrant colors" },
  { id: "cyberpunk", label: "Cyberpunk", suffix: ", cyberpunk neon city, futuristic" },
  { id: "golden", label: "Golden Hour", suffix: ", golden hour sunlight, warm tones" },
  { id: "studio", label: "Studio Lighting", suffix: ", three-point studio lighting, softbox" },
] as const;

export type AspectRatioId = "1:1" | "16:9" | "9:16" | "4:5";

export const ASPECT_RATIOS: {
  id: AspectRatioId;
  label: string;
  className: string;
}[] = [
  { id: "1:1", label: "1:1", className: "aspect-square w-5" },
  { id: "16:9", label: "16:9", className: "aspect-video w-6" },
  { id: "9:16", label: "9:16", className: "aspect-[9/16] w-3.5" },
  { id: "4:5", label: "4:5", className: "aspect-[4/5] w-4" },
];

export const VARIATION_COUNTS = [1, 2, 4] as const;
export type VariationCount = (typeof VARIATION_COUNTS)[number];

export function buildPromptWithStyles(
  prompt: string,
  styleIds: string[]
): string {
  const trimmed = prompt.trim();
  if (!trimmed) return "";
  const suffixes = STYLE_PRESETS.filter((p) => styleIds.includes(p.id))
    .map((p) => p.suffix)
    .join("");
  return `${trimmed}${suffixes}`;
}
