import { higgsExploreImage } from "@/lib/higgs-media";

export type ExploreModel = {
  id: string;
  provider: string;
  name: string;
  type: "Video" | "Image" | "Workflow";
  description: string;
  thumbnail: string;
  href: string;
  discount?: string;
  priceFrom: string;
  priceWas?: string;
  exclusive?: boolean;
  featured?: boolean;
};

export const EXPLORE_FEATURED: ExploreModel[] = [
  {
    id: "seedance-25-f",
    provider: "ByteDance",
    name: "Seedance 2.5",
    type: "Video",
    description:
      "Seedance 2.5 generates videos from text prompts, allowing customization of duration, resolution, aspect ratio, output format, and optional audio generation.",
    thumbnail: higgsExploreImage(
      "74c63b88a889cb7f0f4389b8ae945592ff66d7cbcf41b48f9132fa341803a090-thumbnail.webp",
      1920
    ),
    href: "/create/video?model=seedance-25-f",
    discount: "30% OFF",
    priceFrom: "0.144 / s",
    priceWas: "0.2057 / s",
    featured: true,
  },
  {
    id: "seedance-20-f",
    provider: "ByteDance",
    name: "Seedance 2.0",
    type: "Video",
    description:
      "Seedance 2.0 generates videos from text prompts with duration, resolution, aspect ratio, and optional audio up to 15 seconds including 4K.",
    thumbnail: higgsExploreImage(
      "5d978a3db6a8f758a02a658956c68d1bd43b82da96be75c83369d0bb33e48eb4-thumbnail.webp",
      1920
    ),
    href: "/create/video?model=seedance-20-f",
    discount: "30% OFF",
    priceFrom: "0.0985 / s",
    priceWas: "0.1407 / s",
    featured: true,
  },
  {
    id: "marketing-f",
    provider: "Higgsfield",
    name: "Marketing Studio Image",
    type: "Image",
    description:
      "Generate or edit campaign images with optional preset-guided Marketing Studio prompt enhancement.",
    thumbnail: higgsExploreImage(
      "7ff805cfc3c70a2ca923b1a9002b04e91f6d627dd4d302afe09797ae2e3ca44a-image.webp",
      1920
    ),
    href: "/create/image?template=marble-product",
    discount: "20% OFF",
    priceFrom: "0.0129 / image",
    priceWas: "0.0162 / image",
    featured: true,
  },
];

export const EXPLORE_CATALOG: ExploreModel[] = [
  {
    id: "kling-30",
    provider: "kling",
    name: "Kling 3.0",
    type: "Video",
    description:
      "Kling 3.0 Standard generates videos from text prompts with options for sound, duration, aspect ratio, and multiple shots.",
    thumbnail: higgsExploreImage(
      "847a08a539f44a715925a716c50f53f43d3073aeaa5a884921beb9394f810e04-thumbnail.webp",
      800
    ),
    href: "/create/video?model=kling-30",
    discount: "50% OFF",
    priceFrom: "0.042 / s",
    priceWas: "0.084 / s",
  },
  {
    id: "minimax-h3",
    provider: "minimax",
    name: "MiniMax H3",
    type: "Video",
    description: "MiniMax H3 / Hailuo-03 preview integration using Video Generation V2.",
    thumbnail: higgsExploreImage(
      "5cc7f1716e46a1b53712d37f92f42389b13e11ba2c6d156194ab2a8fb90c14f3-thumbnail.webp",
      800
    ),
    href: "/create/video?model=minimax-h3",
    discount: "45% OFF",
    priceFrom: "0.0715 / s",
    priceWas: "0.13 / s",
  },
  {
    id: "wan-prime",
    provider: "alibaba",
    name: "Wan 3.0 Prime",
    type: "Video",
    description: "Generate videos from text prompts with Wan 3.0 Prime.",
    thumbnail: higgsExploreImage(
      "c743629411ff8267c2920e116ce3790e5a303727efe964811b7bcf8b138b736b-thumbnail.webp",
      800
    ),
    href: "/create/video?model=wan-prime",
    discount: "30% OFF",
    priceFrom: "0.0476 / s",
    priceWas: "0.068 / s",
  },
  {
    id: "grok-image",
    provider: "xai",
    name: "Grok Imagine 2.0",
    type: "Image",
    description: "Transform and refine source images with Grok Imagine 2.0.",
    thumbnail: higgsExploreImage(
      "d33e1b969add4c0e54ad3f0c22e0a46c2ad5bc96372525e89230fbad2177ece1-image.webp",
      800
    ),
    href: "/create/image?model=grok-image",
    priceFrom: "0.04 / img",
  },
  {
    id: "genjutsu-wf",
    provider: "higgsfield",
    name: "Genjutsu",
    type: "Workflow",
    description: "One video. Endless ways to reimagine it.",
    thumbnail: higgsExploreImage(
      "e88805fcb31442389587a2953675fd723ee8d4cb5a317e6280b5d1cca979e152-thumbnail.webp",
      800
    ),
    href: "/genjutsu",
    discount: "50% OFF",
    priceFrom: "0.159 / s",
    priceWas: "0.318 / s",
    exclusive: true,
  },
  {
    id: "soul-2",
    provider: "higgsfield",
    name: "Soul 2",
    type: "Image",
    description:
      "Soul V2 Standard generates images from text prompts with customizable style, resolution, aspect ratio, and batch size.",
    thumbnail: higgsExploreImage(
      "52a6ceab9e44aa8dea42343c337a6b236690253920b4a2181b6c45cbb023ce49-image.webp",
      800
    ),
    href: "/create/image?model=soul-2",
    priceFrom: "0.0032 / img",
    exclusive: true,
  },
  {
    id: "ideogram-4",
    provider: "ideogram",
    name: "Ideogram 4.0",
    type: "Image",
    description:
      "Ideogram 4.0 generates images from text prompts and allows image editing with adjustable aspect ratios.",
    thumbnail: higgsExploreImage(
      "aa642d35ed929d33feab8bbe4389d33ad8f65e384576ed6a25532e762c94bbd0-image.webp",
      800
    ),
    href: "/create/image?model=ideogram-4",
    priceFrom: "0.03 / img",
  },
  {
    id: "ltx-fast",
    provider: "lightricks",
    name: "LTX 2.5 Fast",
    type: "Video",
    description:
      "LTX-2.5 Fast Text to Video on Runware with native audio and optional camera movement.",
    thumbnail: higgsExploreImage(
      "e4972ad8354781935712bd0fffcebb2347dee2270a46d039bfa6369bcef2fd3f-thumbnail.webp",
      800
    ),
    href: "/create/video?model=ltx-fast",
    priceFrom: "0.09 / s",
  },
];
