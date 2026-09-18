import { higgsExploreImage, HIGGS_STATIC } from "@/lib/higgs-media";

const g = (file: string, w = 600) => higgsExploreImage(file, w);

/** CDN-backed hero + gallery images for marketing feature routes */
export const FEATURE_MEDIA: Record<
  string,
  { heroImage: string; galleryImages: [string, string, string] }
> = {
  image: {
    heroImage: HIGGS_STATIC.nanoBanana,
    galleryImages: [
      HIGGS_STATIC.marketingStudio,
      g("52a6ceab9e44aa8dea42343c337a6b236690253920b4a2181b6c45cbb023ce49-image.webp"),
      g("aa642d35ed929d33feab8bbe4389d33ad8f65e384576ed6a25532e762c94bbd0-image.webp"),
    ],
  },
  video: {
    heroImage: g("74c63b88a889cb7f0f4389b8ae945592ff66d7cbcf41b48f9132fa341803a090-thumbnail.webp", 1400),
    galleryImages: [
      g("5d978a3db6a8f758a02a658956c68d1bd43b82da96be75c83369d0bb33e48eb4-thumbnail.webp"),
      g("847a08a539f44a715925a716c50f53f43d3073aeaa5a884921beb9394f810e04-thumbnail.webp"),
      g("c743629411ff8267c2920e116ce3790e5a303727efe964811b7bcf8b138b736b-thumbnail.webp"),
    ],
  },
  audio: {
    heroImage: g("5cc7f1716e46a1b53712d37f92f42389b13e11ba2c6d156194ab2a8fb90c14f3-thumbnail.webp", 1400),
    galleryImages: [
      g("e4972ad8354781935712bd0fffcebb2347dee2270a46d039bfa6369bcef2fd3f-thumbnail.webp"),
      g("1a6a226e8611b061e0b9f37ab843d6bd7bff420e46cfb72531375e9d5b2052b3-thumbnail.webp"),
      HIGGS_STATIC.landscapePromo,
    ],
  },
  mcp: {
    heroImage: HIGGS_STATIC.openApi,
    galleryImages: [
      HIGGS_STATIC.seedance25,
      HIGGS_STATIC.genjutsu,
      g("53532530183a9f3450c6af708c5f15a16e5267bcfabb5d439f517a038c9b3ab4-image.webp"),
    ],
  },
  effects: {
    heroImage: g("1a6a226e8611b061e0b9f37ab843d6bd7bff420e46cfb72531375e9d5b2052b3-thumbnail.webp", 1400),
    galleryImages: [
      g("5aaa4da5fe1aa5a2cc69996c8e9eddc019f68c36dae81c2c587ff5f3e4a87954-thumbnail.webp"),
      g("74c63b88a889cb7f0f4389b8ae945592ff66d7cbcf41b48f9132fa341803a090-thumbnail.webp"),
      g("c743629411ff8267c2920e116ce3790e5a303727efe964811b7bcf8b138b736b-thumbnail.webp"),
    ],
  },
  genjutsu: {
    heroImage: HIGGS_STATIC.genjutsu,
    galleryImages: [
      HIGGS_STATIC.genjutsu,
      g("e88805fcb31442389587a2953675fd723ee8d4cb5a317e6280b5d1cca979e152-thumbnail.webp"),
      g("5aaa4da5fe1aa5a2cc69996c8e9eddc019f68c36dae81c2c587ff5f3e4a87954-thumbnail.webp"),
    ],
  },
  "chatgpt-plugin": {
    heroImage: HIGGS_STATIC.openApi,
    galleryImages: [
      HIGGS_STATIC.nanoBanana,
      HIGGS_STATIC.marketingStudio,
      HIGGS_STATIC.seedance25,
    ],
  },
  "cinema-studio": {
    heroImage: g("e4972ad8354781935712bd0fffcebb2347dee2270a46d039bfa6369bcef2fd3f-thumbnail.webp", 1400),
    galleryImages: [
      HIGGS_STATIC.landscapePromo,
      g("53532530183a9f3450c6af708c5f15a16e5267bcfabb5d439f517a038c9b3ab4-image.webp"),
      g("5d978a3db6a8f758a02a658956c68d1bd43b82da96be75c83369d0bb33e48eb4-thumbnail.webp"),
    ],
  },
  "marketing-studio": {
    heroImage: HIGGS_STATIC.marketingStudio,
    galleryImages: [
      HIGGS_STATIC.marketingStudio,
      g("d33e1b969add4c0e54ad3f0c22e0a46c2ad5bc96372525e89230fbad2177ece1-image.webp"),
      g("52a6ceab9e44aa8dea42343c337a6b236690253920b4a2181b6c45cbb023ce49-image.webp"),
    ],
  },
  enterprise: {
    heroImage: HIGGS_STATIC.landscapePromo,
    galleryImages: [
      HIGGS_STATIC.openApi,
      HIGGS_STATIC.seedance25,
      HIGGS_STATIC.genjutsu,
    ],
  },
  "api-product": {
    heroImage: HIGGS_STATIC.openApi,
    galleryImages: [
      HIGGS_STATIC.seedance25,
      HIGGS_STATIC.nanoBanana,
      HIGGS_STATIC.marketingStudio,
    ],
  },
};

export function withFeatureMedia<T extends { slug: string; heroImage: string; galleryImages: string[] }>(
  page: T
): T {
  const media = FEATURE_MEDIA[page.slug];
  if (!media) return page;
  return {
    ...page,
    heroImage: media.heroImage,
    galleryImages: [...media.galleryImages],
  };
}
