import { higgsExploreImage, HIGGS_STATIC } from "@/lib/higgs-media";

export type TemplatePreset = {
  id: string;
  name: string;
  description: string;
  prompt: string;
  styleIds: string[];
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:5";
  thumbnail: string;
};

const t = (file: string) => higgsExploreImage(file, 600);

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: "marble-product",
    name: "Product on marble",
    description: "Luxury bottle or gadget on white marble, soft shadows.",
    prompt: "Premium skincare bottle on white marble slab, soft diffused studio light",
    styleIds: ["product", "studio"],
    aspectRatio: "4:5",
    thumbnail: HIGGS_STATIC.marketingStudio,
  },
  {
    id: "cinematic-portrait",
    name: "Cinematic portrait, rim light",
    description: "Moody close-up with strong rim lighting.",
    prompt: "Close-up portrait of a woman, dramatic rim light, shallow depth of field",
    styleIds: ["cinematic", "portrait"],
    aspectRatio: "4:5",
    thumbnail: HIGGS_STATIC.nanoBanana,
  },
  {
    id: "retro-film",
    name: "Retro film photo",
    description: "35mm grain, warm highlights, nostalgic street scene.",
    prompt: "Friends laughing at a diner at night, vintage 35mm film look",
    styleIds: ["cinematic", "golden"],
    aspectRatio: "16:9",
    thumbnail: t("1a6a226e8611b061e0b9f37ab843d6bd7bff420e46cfb72531375e9d5b2052b3-thumbnail.webp"),
  },
  {
    id: "fashion-editorial",
    name: "Studio fashion editorial",
    description: "High-fashion pose, clean backdrop, bold styling.",
    prompt: "Model in avant-garde outfit, minimalist grey backdrop, full body",
    styleIds: ["fashion", "studio"],
    aspectRatio: "4:5",
    thumbnail: t("aa642d35ed929d33feab8bbe4389d33ad8f65e384576ed6a25532e762c94bbd0-image.webp"),
  },
  {
    id: "neon-cyberpunk",
    name: "Neon cyberpunk street",
    description: "Rain-slick streets, holographic signs, teal and magenta.",
    prompt: "Lonely figure walking through neon cyberpunk alley in the rain",
    styleIds: ["cyberpunk"],
    aspectRatio: "16:9",
    thumbnail: t("5aaa4da5fe1aa5a2cc69996c8e9eddc019f68c36dae81c2c587ff5f3e4a87954-thumbnail.webp"),
  },
  {
    id: "golden-hour",
    name: "Golden hour outdoor portrait",
    description: "Warm sun flare, natural background bokeh.",
    prompt: "Outdoor portrait during golden hour, sun flare, natural smile",
    styleIds: ["golden", "portrait"],
    aspectRatio: "4:5",
    thumbnail: HIGGS_STATIC.landscapePromo,
  },
  {
    id: "anime-hero",
    name: "Anime action poster",
    description: "Dynamic pose, saturated colors, speed lines.",
    prompt: "Anime hero mid-leap with energy aura, dynamic action poster composition",
    styleIds: ["anime"],
    aspectRatio: "9:16",
    thumbnail: t("52a6ceab9e44aa8dea42343c337a6b236690253920b4a2181b6c45cbb023ce49-image.webp"),
  },
  {
    id: "food-flatlay",
    name: "Food flat lay",
    description: "Overhead brunch spread, editorial food styling.",
    prompt: "Overhead flat lay of brunch spread, coffee, pastries, editorial food photo",
    styleIds: ["product", "studio"],
    aspectRatio: "1:1",
    thumbnail: t("7ff805cfc3c70a2ca923b1a9002b04e91f6d627dd4d302afe09797ae2e3ca44a-image.webp"),
  },
  {
    id: "scifi-concept",
    name: "Sci-fi concept art",
    description: "Epic scale environment, cinematic atmosphere.",
    prompt: "Massive futuristic space station orbiting a gas giant, concept art",
    styleIds: ["cinematic"],
    aspectRatio: "16:9",
    thumbnail: t("53532530183a9f3450c6af708c5f15a16e5267bcfabb5d439f517a038c9b3ab4-image.webp"),
  },
  {
    id: "minimal-tech",
    name: "Minimal tech hero",
    description: "Sleek device floating on gradient background.",
    prompt: "Sleek wireless earbuds floating on dark gradient, minimal tech hero shot",
    styleIds: ["product", "studio"],
    aspectRatio: "1:1",
    thumbnail: HIGGS_STATIC.openApi,
  },
];

export function getTemplateById(id: string): TemplatePreset | undefined {
  return TEMPLATE_PRESETS.find((t) => t.id === id);
}
