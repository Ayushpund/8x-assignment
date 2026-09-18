/** Explore mega-menu columns — mirrors higgsfield.ai Explore overlay */

export type ExploreLink = { label: string; href: string; badge?: string };

export type ExploreColumn = { title: string; links: ExploreLink[] };

export const EXPLORE_SUITE_COLUMNS: ExploreColumn[] = [
  {
    title: "Create",
    links: [
      { label: "AI Video", href: "/create/video" },
      { label: "AI Image", href: "/create/image" },
      { label: "Edit Image", href: "/create/image" },
      { label: "Inpaint", href: "/create/image" },
      { label: "Upscale", href: "/create/image" },
      { label: "AI Face Swap", href: "/genjutsu" },
      { label: "Apps", href: "/templates" },
    ],
  },
  {
    title: "Video Models",
    links: [
      { label: "Seedance 2.5", href: "/create/video?model=seedance-25-f", badge: "TOP" },
      { label: "Seedance 2.0", href: "/create/video?model=seedance-20-f" },
      { label: "Kling 3.0", href: "/create/video?model=kling-30" },
      { label: "WAN 2.6", href: "/create/video?model=wan-prime" },
      { label: "Genjutsu", href: "/create/video?model=genjutsu" },
    ],
  },
  {
    title: "Image Models",
    links: [
      { label: "Nano Banana Pro", href: "/create/image" },
      { label: "Soul 2", href: "/create/image?model=soul-2" },
      { label: "GPT Image 2", href: "/create/image" },
      { label: "Ideogram 4", href: "/create/image?model=ideogram-4" },
    ],
  },
  {
    title: "Studios",
    links: [
      { label: "Cinema Studio", href: "/cinema-studio" },
      { label: "Marketing Studio", href: "/marketing-studio" },
      { label: "Canvas", href: "/create/image" },
      { label: "Higgsfield Popcorn", href: "/effects" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Supercomputer", href: "/enterprise" },
      { label: "MCP / CLI", href: "/mcp" },
      { label: "API", href: "/api-product", badge: "New" },
      { label: "Games", href: "/templates" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Pricing", href: "/pricing" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Contact", href: "/help#enterprise" },
    ],
  },
];
