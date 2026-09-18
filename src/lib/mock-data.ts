/** Marketing content aligned with higgsfield.ai structure */



import { higgsExploreImage, HIGGS_STATIC } from "@/lib/higgs-media";
import { HERO_CARD_VIDEOS } from "@/lib/higgs-videos";

export const heroCarousel = [
  {
    id: "api",
    title: "Higgsfield API",
    description: "Best prices in GenAI across 50+ models in one API.",
    href: "/api-product",
    image: HIGGS_STATIC.openApi,
    video: HERO_CARD_VIDEOS[0],
  },
  {
    id: "genjutsu",
    title: "Higgsfield Genjutsu",
    description: "One upload in. Endless new visions out.",
    href: "/create/video?model=genjutsu",
    image: HIGGS_STATIC.genjutsu,
    video: HERO_CARD_VIDEOS[1],
  },
  {
    id: "motion",
    title: "Higgsfield AI Motion Designer",
    description: "ChatGPT can now do motion design in After Effects.",
    href: "/create/video?model=seedance-25-f",
    image: HIGGS_STATIC.seedance25,
    video: HERO_CARD_VIDEOS[2],
  },
  {
    id: "effects",
    title: "Higgsfield Effects",
    description: "Viral video presets now in ChatGPT, with free generations",
    href: "/effects",
    image: higgsExploreImage(
      "1a6a226e8611b061e0b9f37ab843d6bd7bff420e46cfb72531375e9d5b2052b3-thumbnail.webp",
      1400
    ),
    video: HERO_CARD_VIDEOS[3],
  },
  {
    id: "gpt-image",
    title: "GPT Image 2.5 Sunburst",
    description: "Sharper edits with more natural light and texture",
    href: "/create/image",
    image: HIGGS_STATIC.nanoBanana,
    video: HERO_CARD_VIDEOS[4],
  },
];



/** First row on higgsfield.ai home (API · Genjutsu · Motion — carousel of 5) */
export const heroFeatures = heroCarousel.slice(0, 3);



export const toolCards = [

  {

    id: "seedance",

    title: "Seedance 2.5",

    badge: "TOP" as const,

    tag: "Video",

    description: "The most advanced video model.",

    href: "/create/video?model=seedance-25-f",

    image: higgsExploreImage(

      "74c63b88a889cb7f0f4389b8ae945592ff66d7cbcf41b48f9132fa341803a090-thumbnail.webp",

      600

    ),

  },

  {

    id: "nano-banana",

    title: "Nano Banana Pro",

    badge: null,

    tag: "Image",

    description: "Generate high-quality visuals.",

    href: "/create/image",

    image: HIGGS_STATIC.nanoBanana,

  },

  {

    id: "remix",

    title: "Higgsfield Genjutsu",

    badge: null,

    tag: "New",

    description: "One video, many versions.",

    href: "/genjutsu",

    image: HIGGS_STATIC.genjutsu,

  },

  {

    id: "mcp",

    title: "MCP & CLI",

    badge: null,

    tag: null,

    description: "Turn Claude into a creative engine.",

    href: "/mcp",

    image: HIGGS_STATIC.openApi,

  },

  {

    id: "cinema",

    title: "Cinema Studio 4.0",

    badge: null,

    tag: null,

    description: "Create cinematic scenes effortlessly.",

    href: "/cinema-studio",

    image: higgsExploreImage(

      "e4972ad8354781935712bd0fffcebb2347dee2270a46d039bfa6369bcef2fd3f-thumbnail.webp",

      600

    ),

  },

  {

    id: "super",

    title: "Supercomputer",

    badge: null,

    tag: null,

    description: "Agent powered by GPT-6 Astra.",

    href: "/enterprise",

    image: higgsExploreImage(

      "53532530183a9f3450c6af708c5f15a16e5267bcfabb5d439f517a038c9b3ab4-image.webp",

      600

    ),

  },

];

