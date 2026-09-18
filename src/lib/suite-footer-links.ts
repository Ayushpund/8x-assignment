import type { ExploreLink } from "@/lib/explore-suite-links";

export type FooterBlock = { heading: string; links: ExploreLink[] };

export type FooterColumn = { blocks: FooterBlock[] };

export const SUITE_FOOTER_COLUMNS: FooterColumn[] = [
  {
    blocks: [
      {
        heading: "Create",
        links: [
          { label: "AI Video", href: "/create/video" },
          { label: "AI Image", href: "/create/image" },
          { label: "Edit Image", href: "/create/image" },
          { label: "Inpaint", href: "/create/image" },
          { label: "Upscale", href: "/create/image" },
          { label: "Mixed Media", href: "/effects" },
          { label: "AI Face Swap", href: "/genjutsu" },
          { label: "AI Influencer", href: "/marketing-studio" },
          { label: "Apps", href: "/templates" },
        ],
      },
    ],
  },
  {
    blocks: [
      {
        heading: "Video Models",
        links: [
          { label: "Seedance 2.5", href: "/create/video?model=seedance-25-f" },
          { label: "Seedance 2.0", href: "/create/video?model=seedance-20-f" },
          { label: "Kling 3.0", href: "/create/video?model=kling-30" },
          { label: "WAN 2.6", href: "/create/video?model=wan-prime" },
        ],
      },
      {
        heading: "Image Models",
        links: [
          { label: "Nano Banana", href: "/create/image" },
          { label: "GPT Image 2", href: "/create/image" },
          { label: "Soul 2", href: "/create/image?model=soul-2" },
        ],
      },
    ],
  },
  {
    blocks: [
      {
        heading: "Studios",
        links: [
          { label: "Cinema Studio", href: "/cinema-studio" },
          { label: "Marketing Studio", href: "/marketing-studio" },
          { label: "Higgsfield Canvas", href: "/create/image" },
          { label: "Higgsfield Popcorn", href: "/effects" },
        ],
      },
      {
        heading: "Soul",
        links: [
          { label: "Soul 2.0", href: "/create/image?model=soul-2" },
          { label: "Soul ID Character", href: "/create/image" },
          { label: "Soul Cinema", href: "/cinema-studio" },
        ],
      },
    ],
  },
  {
    blocks: [
      {
        heading: "Platform",
        links: [
          { label: "Supercomputer", href: "/enterprise" },
          { label: "MCP / CLI", href: "/mcp" },
          { label: "API", href: "/api-product" },
          { label: "Games", href: "/templates" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "Help Center", href: "/help" },
          { label: "Pricing", href: "/pricing" },
          { label: "Enterprise", href: "/enterprise" },
        ],
      },
    ],
  },
  {
    blocks: [
      {
        heading: "Company",
        links: [
          { label: "About", href: "/enterprise" },
          { label: "Trust", href: "/privacy" },
          { label: "Team", href: "/enterprise" },
          { label: "Careers", href: "/signup" },
          { label: "Contact", href: "/help#enterprise" },
        ],
      },
      {
        heading: "Community",
        links: [
          { label: "Community", href: "/gallery" },
          { label: "Contests", href: "/gallery" },
          { label: "Creator Partners", href: "/signup" },
        ],
      },
    ],
  },
];
