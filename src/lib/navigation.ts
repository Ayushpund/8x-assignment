export type NavBadge = "New" | "Free" | null;

export type NavItem = {
  id: string;
  href: string;
  label: string;
  badge?: NavBadge;
};

/** Unique routes — no duplicate hrefs (Next.js reserves /api for route handlers) */
export const PRIMARY_NAV: NavItem[] = [
  { id: "explore", href: "/", label: "Explore" },
  { id: "image", href: "/create/image", label: "Image" },
  { id: "video", href: "/create/video", label: "Video" },
  { id: "audio", href: "/create/audio", label: "Audio" },
  { id: "mcp", href: "/mcp", label: "MCP" },
  { id: "api", href: "/api-product", label: "API", badge: "New" },
  { id: "chatgpt", href: "/chatgpt-plugin", label: "ChatGPT Plugin", badge: "New" },
  { id: "genjutsu", href: "/genjutsu", label: "Genjutsu", badge: "Free" },
  { id: "effects", href: "/effects", label: "Effects", badge: "Free" },
  { id: "cinema", href: "/cinema-studio", label: "Cinema Studio" },
  { id: "marketing", href: "/marketing-studio", label: "Marketing Studio" },
  { id: "supercomputer", href: "/enterprise", label: "Supercomputer" },
  { id: "3d", href: "/cinema-studio", label: "3D Journey" },
  { id: "support", href: "/help", label: "Support" },
];

export const EXPLORE_MENU_FEATURES: {
  title: string;
  description: string;
  href: string;
  badge?: "TOP";
}[] = [
  {
    title: "Create Image",
    description: "Generate visuals with Nano Banana Pro",
    href: "/image",
  },
  {
    title: "Cinematic Cameras",
    description: "Film-grade framing and lens looks",
    href: "/cinema-studio",
    badge: "TOP",
  },
  {
    title: "Canvas",
    description: "Edit regions with inpaint workflows",
    href: "/create/image",
  },
  {
    title: "Soul Moodboard",
    description: "Style boards for consistent shoots",
    href: "/templates",
  },
  {
    title: "Genjutsu",
    description: "Motion transfer & reality manipulation",
    href: "/genjutsu",
  },
];

export const EXPLORE_MENU_MODELS = [
  { name: "Nano Banana Pro", tag: "TOP" as const, href: "/image" },
  { name: "GPT Image 2.5 Sunburst", tag: "NEW" as const, href: "/create/image" },
  { name: "GPT Image 2.5 Flare", tag: "NEW" as const, href: "/create/image" },
  { name: "GPT Image 2", tag: "TOP" as const, href: "/create/image" },
  { name: "Seedream 5.0 Pro", tag: null, href: "/create/image" },
  { name: "Nano Banana 2 Lite", tag: null, href: "/image" },
  { name: "Recraft V4 Styles", tag: "NEW" as const, href: "/templates" },
];

export const VFX_PRESETS = [
  "Floating fall",
  "High flip",
  "Burning man",
  "Studio slide",
  "Incline",
  "Act natural",
  "Eyes in",
  "Street colossus",
  "Melting",
  "Wild ride",
  "Cutout",
  "World morphing",
  "Smash and grab",
  "Selfception",
  "Lacewalker",
];

export { COMMUNITY_PROJECTS } from "@/lib/community-projects";
