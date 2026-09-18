import { higgsExploreImage, HIGGS_STATIC } from "@/lib/higgs-media";

const img = (file: string, w = 800) => higgsExploreImage(file, w);

/** GPT Image 2 strip + masonry — each tile a distinct explore asset */
export const SHOWCASE_IMAGES = [
  {
    id: "1",
    alt: "Marketing campaign",
    title: "Marketing campaign",
    src: img("7ff805cfc3c70a2ca923b1a9002b04e91f6d627dd4d302afe09797ae2e3ca44a-image.webp"),
    href: "/create/image",
    aspect: "4/5" as const,
  },
  {
    id: "2",
    alt: "Soul portrait",
    title: "Soul portrait",
    src: img("52a6ceab9e44aa8dea42343c337a6b236690253920b4a2181b6c45cbb023ce49-image.webp"),
    href: "/image",
    aspect: "3/4" as const,
  },
  {
    id: "3",
    alt: "Fashion editorial",
    title: "Fashion editorial",
    src: img("aa642d35ed929d33feab8bbe4389d33ad8f65e384576ed6a25532e762c94bbd0-image.webp"),
    href: "/create/image",
    aspect: "square" as const,
  },
  {
    id: "4",
    alt: "Cinematic still",
    title: "Cinematic still",
    src: img("53532530183a9f3450c6af708c5f15a16e5267bcfabb5d439f517a038c9b3ab4-image.webp"),
    href: "/cinema-studio",
    aspect: "16/10" as const,
  },
  {
    id: "5",
    alt: "Grok refine",
    title: "Grok refine",
    src: img("d33e1b969add4c0e54ad3f0c22e0a46c2ad5bc96372525e89230fbad2177ece1-image.webp"),
    href: "/image",
    aspect: "9/16" as const,
  },
  {
    id: "6",
    alt: "VFX frame",
    title: "VFX frame",
    src: img("1a6a226e8611b061e0b9f37ab843d6bd7bff420e46cfb72531375e9d5b2052b3-thumbnail.webp"),
    href: "/effects",
    aspect: "3/4" as const,
  },
  {
    id: "7",
    alt: "Genjutsu",
    title: "Genjutsu",
    src: img("e88805fcb31442389587a2953675fd723ee8d4cb5a317e6280b5d1cca979e152-thumbnail.webp"),
    href: "/genjutsu",
    aspect: "4/5" as const,
  },
  {
    id: "8",
    alt: "Seedance frame",
    title: "Seedance frame",
    src: img("74c63b88a889cb7f0f4389b8ae945592ff66d7cbcf41b48f9132fa341803a090-thumbnail.webp"),
    href: "/create/video",
    aspect: "16/10" as const,
  },
  {
    id: "9",
    alt: "Kling mood",
    title: "Kling mood",
    src: img("847a08a539f44a715925a716c50f53f43d3073aeaa5a884921beb9394f810e04-thumbnail.webp"),
    href: "/gallery",
    aspect: "3/4" as const,
  },
  {
    id: "10",
    alt: "Wan prime",
    title: "Wan prime",
    src: img("c743629411ff8267c2920e116ce3790e5a303727efe964811b7bcf8b138b736b-thumbnail.webp"),
    href: "/effects",
    aspect: "4/5" as const,
  },
  {
    id: "11",
    alt: "Seedance 2.0",
    title: "Seedance 2.0",
    src: img("5d978a3db6a8f758a02a658956c68d1bd43b82da96be75c83369d0bb33e48eb4-thumbnail.webp"),
    href: "/create/video",
    aspect: "16/10" as const,
  },
  {
    id: "12",
    alt: "MiniMax H3",
    title: "MiniMax H3",
    src: img("5cc7f1716e46a1b53712d37f92f42389b13e11ba2c6d156194ab2a8fb90c14f3-thumbnail.webp"),
    href: "/api-product",
    aspect: "16/10" as const,
  },
];

export const HERO_CARD_IMAGES = {
  api: HIGGS_STATIC.openApi,
  genjutsu: HIGGS_STATIC.genjutsu,
  motion: HIGGS_STATIC.seedance25,
};
