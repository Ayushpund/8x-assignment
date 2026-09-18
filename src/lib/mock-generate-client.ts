import type { AspectRatioId } from "@/lib/create-constants";
import type { GenerationResult } from "@/store/create-store";

const PALETTES = [
  ["#1a1a2e", "#16213e", "#0f3460", "#d4ff00"],
  ["#2d1b4e", "#512da8", "#ff2e7e", "#d4ff00"],
  ["#0d1117", "#21262d", "#30363d", "#58a6ff"],
  ["#1c1917", "#44403c", "#78716c", "#fbbf24"],
];

function aspectDimensions(ratio: AspectRatioId): [number, number] {
  switch (ratio) {
    case "16:9":
      return [640, 360];
    case "9:16":
      return [360, 640];
    case "4:5":
      return [512, 640];
    default:
      return [512, 512];
  }
}

export function createMockImageDataUrl(
  aspectRatio: AspectRatioId,
  seed: number
): string {
  const [w, h] = aspectDimensions(aspectRatio);
  const palette = PALETTES[seed % PALETTES.length];
  const label = `Mock ${(seed % 9) + 1}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${palette[0]}"/>
        <stop offset="50%" stop-color="${palette[1]}"/>
        <stop offset="100%" stop-color="${palette[2]}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <circle cx="${w * 0.75}" cy="${h * 0.25}" r="${Math.min(w, h) * 0.15}" fill="${palette[3]}" opacity="0.35"/>
    <text x="24" y="${h - 32}" fill="${palette[3]}" font-family="system-ui,sans-serif" font-size="20" font-weight="600">${label}</text>
    <text x="24" y="${h - 10}" fill="#a1a1a1" font-family="system-ui,sans-serif" font-size="12">Gemini in Step 4</text>
  </svg>`;
  const encoded =
    typeof window !== "undefined"
      ? btoa(unescape(encodeURIComponent(svg)))
      : "";
  return `data:image/svg+xml;base64,${encoded}`;
}

export async function mockGenerateImages(options: {
  count: number;
  aspectRatio: AspectRatioId;
  basePrompt: string;
  prompt: string;
  styles: string[];
}): Promise<GenerationResult[]> {
  await new Promise((r) => setTimeout(r, 1800 + Math.random() * 800));

  if (options.prompt.toLowerCase().includes("fail")) {
    throw new Error(
      "This prompt was flagged by content safety — try rephrasing"
    );
  }

  const baseSeed = Date.now();
  return Array.from({ length: options.count }, (_, i) => ({
    id: `${baseSeed}-${i}-${Math.random().toString(36).slice(2, 8)}`,
    imageBase64: createMockImageDataUrl(
      options.aspectRatio,
      baseSeed + i
    ),
    prompt: options.prompt,
    basePrompt: options.basePrompt,
    styles: [...options.styles],
    aspectRatio: options.aspectRatio,
    createdAt: Date.now(),
  }));
}
