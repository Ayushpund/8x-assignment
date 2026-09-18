import { withFeatureMedia } from "@/lib/feature-media";

export type FeaturePageConfig = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  highlights: string[];
  galleryImages: string[];
};

export const FEATURE_PAGES: Record<string, FeaturePageConfig> = {
  image: {
    slug: "image",
    eyebrow: "Nano Banana Pro",
    title: "Create stunning images",
    description:
      "Text-to-image and edit with Gemini 2.5 Flash Image. Style presets, aspect ratios, and batch variations in one studio.",
    heroImage:
      "https://images.unsplash.com/photo-1685909726692-257f202494b9?w=1400&q=80",
    ctaPrimary: { label: "Start generating", href: "/create/image" },
    ctaSecondary: { label: "Browse templates", href: "/templates" },
    highlights: [
      "Nano Banana Pro model",
      "1:1 · 16:9 · 9:16 · 4:5",
      "Image-to-image uploads",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    ],
  },
  video: {
    slug: "video",
    eyebrow: "Seedance 2.5",
    title: "The most advanced AI video model",
    description:
      "Cinematic motion, camera moves, and character consistency — open Video studio with Seedance 2.5 presets.",
    heroImage:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1400&q=80",
    ctaPrimary: { label: "Open video studio", href: "/create/video" },
    ctaSecondary: { label: "View Seedance gallery", href: "/gallery" },
    highlights: ["Seedance 2.5 TOP model", "Motion presets", "Export-ready frames"],
    galleryImages: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
    ],
  },
  audio: {
    slug: "audio",
    eyebrow: "Audio Studio",
    title: "Generate sound for your visuals",
    description:
      "Voice, sfx, and music beds paired with your visuals — open Audio studio to design sound concepts.",
    heroImage:
      "https://images.unsplash.com/photo-1478737270239-2f02ca77fc8b?w=1400&q=80",
    ctaPrimary: { label: "Create audio", href: "/create/audio" },
    highlights: ["Stem export", "Prompt-to-sfx", "Sync to video timelines"],
    galleryImages: [
      "https://images.unsplash.com/photo-1511379938542-c1f69419868d?w=600&q=80",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231d9d8?w=600&q=80",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
    ],
  },
  mcp: {
    slug: "mcp",
    eyebrow: "MCP & CLI",
    title: "Turn Claude into a creative engine",
    description:
      "Install the Higgsfield MCP plugin and drive Nano Banana, Seedance, and Effects from your agent workflow.",
    heroImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80",
    ctaPrimary: { label: "Install plugin", href: "/signup" },
    ctaSecondary: { label: "Explore use cases", href: "/templates" },
    highlights: ["GPT-6 Astra ready", "Game & 3D pipelines", "Scriptable CLI"],
    galleryImages: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    ],
  },
  "api-product": {
    slug: "api-product",
    eyebrow: "Higgsfield API",
    title: "Best prices in GenAI across 50+ models",
    description:
      "One API for image, video, and effects — fal, Replicate, and native Soul models with unified billing.",
    heroImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80",
    ctaPrimary: { label: "Get API key", href: "/signup" },
    ctaSecondary: { label: "View docs", href: "/docs" },
    highlights: ["50+ models", "Lowest $/gen", "Same models as the app"],
    galleryImages: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    ],
  },
  "chatgpt-plugin": {
    slug: "chatgpt-plugin",
    eyebrow: "ChatGPT Plugin",
    title: "Generate inside ChatGPT",
    description:
      "Use Nano Banana and Effects directly in chat — upload a reference, get variations without leaving the thread.",
    heroImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
    ctaPrimary: { label: "Connect plugin", href: "/signup" },
    highlights: ["New", "Free tier generations", "Reference uploads"],
    galleryImages: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    ],
  },
  genjutsu: {
    slug: "genjutsu",
    eyebrow: "New model",
    title: "Higgsfield Genjutsu",
    description:
      "Reality manipulation — transfer motion into new scenes, swap details while everything else stays as filmed.",
    heroImage:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1400&q=80",
    ctaPrimary: { label: "Start generating", href: "/create/video?template=neon-cyberpunk" },
    ctaSecondary: { label: "Video studio", href: "/video" },
    highlights: ["One video, many versions", "Motion transfer", "Character swap"],
    galleryImages: [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80",
    ],
  },
  effects: {
    slug: "effects",
    eyebrow: "Free generations",
    title: "Visual Effects presets",
    description:
      "Big-budget VFX presets — floating fall, street colossus, melting, and more. One click Recreate in studio.",
    heroImage:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1400&q=80",
    ctaPrimary: { label: "Start generating", href: "/create/image" },
    ctaSecondary: { label: "All templates", href: "/templates" },
    highlights: ["Viral presets", "ChatGPT Effects", "Free tier"],
    galleryImages: [
      "https://images.unsplash.com/photo-1534447672598-9623166a2e2?w=600&q=80",
      "https://images.unsplash.com/photo-1509245853830-6f0577f1f1e5?w=600&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    ],
  },
  "cinema-studio": {
    slug: "cinema-studio",
    eyebrow: "Cinema Studio 4.0",
    title: "Create cinematic scenes effortlessly",
    description:
      "Virtual cameras, lens packages, and lighting rigs — built for directors and previz teams.",
    heroImage:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1400&q=80",
    ctaPrimary: { label: "Open Cinema Studio", href: "/create/video?template=cinematic-portrait" },
    highlights: ["Anamorphic looks", "Rim & volumetric light", "Shot library"],
    galleryImages: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    ],
  },
  "marketing-studio": {
    slug: "marketing-studio",
    eyebrow: "Marketing Studio",
    title: "Ads, drops, and campaigns at scale",
    description:
      "Product shots, UGC-style variants, and localized copy — generate entire funnel creative in one workspace.",
    heroImage:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1400&q=80",
    ctaPrimary: { label: "Create campaign", href: "/create/image?template=marble-product" },
    ctaSecondary: { label: "See templates", href: "/templates" },
    highlights: ["Brand kits", "Marble & studio product", "Bulk variations"],
    galleryImages: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    ],
  },
  enterprise: {
    slug: "enterprise",
    eyebrow: "Enterprise",
    title: "Creative infrastructure for teams",
    description:
      "SSO, dedicated support, custom models, and API volume pricing — the same stack as Higgsfield Enterprise.",
    heroImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80",
    ctaPrimary: { label: "Contact sales", href: "/help#enterprise" },
    ctaSecondary: { label: "Pricing", href: "/pricing" },
    highlights: ["SSO & audit logs", "Dedicated GPU pools", "SLA & support"],
    galleryImages: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    ],
  },
};

export function getFeaturePage(slug: string): FeaturePageConfig | undefined {
  const page = FEATURE_PAGES[slug];
  return page ? withFeatureMedia(page) : undefined;
}
