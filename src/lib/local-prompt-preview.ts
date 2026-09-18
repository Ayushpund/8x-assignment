import type { AspectRatioId } from "@/lib/create-constants";
import type { StudioMode } from "@/lib/studio-config";

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapPromptLines(
  prompt: string,
  maxChars: number,
  maxLines: number
): string[] {
  const clean = prompt.replace(/\s+/g, " ").trim();
  if (!clean) return ["Your prompt"];
  const words = clean.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
      if (lines.length >= maxLines) break;
    } else {
      line = next;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  if (lines.length === 0) lines.push(clean.slice(0, maxChars));
  return lines.slice(0, maxLines);
}

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

function paletteFromPrompt(prompt: string, variant: number) {
  const h = hashString(`${prompt}:${variant}`);
  const hue = h % 360;
  const hue2 = (hue + 40 + (variant * 17)) % 360;
  return {
    bg: `hsl(${hue} 35% 12%)`,
    mid: `hsl(${hue2} 45% 22%)`,
    accent: `hsl(${(hue + 120) % 360} 85% 55%)`,
    text: "#f5f5f5",
    muted: "#a3a3a3",
  };
}

function modeTitle(mode: StudioMode): string {
  if (mode === "video") return "Video keyframe (lightweight)";
  if (mode === "audio") return "Audio visual (lightweight)";
  return "Image preview (lightweight)";
}

function modeOverlay(mode: StudioMode, w: number, h: number): string {
  if (mode === "video") {
    return `
      <rect x="${w * 0.08}" y="${h * 0.72}" width="${w * 0.84}" height="4" fill="#ffffff" opacity="0.15"/>
      <polygon points="${w * 0.45},${h * 0.38} ${w * 0.45},${h * 0.58} ${w * 0.58},${h * 0.48}" fill="#d4ff00" opacity="0.85"/>
      <text x="${w * 0.08}" y="${h * 0.12}" fill="#d4ff00" font-size="11" font-family="system-ui,sans-serif">CINEMATIC FRAME</text>`;
  }
  if (mode === "audio") {
    const bars = Array.from({ length: 24 }, (_, i) => {
      const x = w * 0.08 + i * (w * 0.035);
      const barH = 12 + ((hashString(`a${i}`) % 100) / 100) * (h * 0.22);
      return `<rect x="${x}" y="${h * 0.55 - barH}" width="${w * 0.02}" height="${barH}" fill="#d4ff00" opacity="0.75"/>`;
    }).join("");
    return `${bars}
      <text x="${w * 0.08}" y="${h * 0.12}" fill="#d4ff00" font-size="11" font-family="system-ui,sans-serif">AUDIO VISUAL</text>`;
  }
  return `<text x="${w * 0.08}" y="${h * 0.12}" fill="#d4ff00" font-size="11" font-family="system-ui,sans-serif">STILL IMAGE</text>`;
}

export function createPromptPreviewDataUrl(options: {
  prompt: string;
  aspectRatio: AspectRatioId;
  studioMode: StudioMode;
  variantIndex: number;
}): string {
  const [w, h] = aspectDimensions(options.aspectRatio);
  const colors = paletteFromPrompt(options.prompt, options.variantIndex);
  const lines = wrapPromptLines(options.prompt, 42, 4);
  const title = escapeXml(modeTitle(options.studioMode));
  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="32" dy="${i === 0 ? 0 : 18}">${escapeXml(line)}</tspan>`
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${colors.bg}"/>
        <stop offset="100%" stop-color="${colors.mid}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <circle cx="${w * 0.82}" cy="${h * 0.2}" r="${Math.min(w, h) * 0.12}" fill="${colors.accent}" opacity="0.25"/>
    ${modeOverlay(options.studioMode, w, h)}
    <text x="32" y="${h * 0.22}" fill="${colors.text}" font-family="system-ui,sans-serif" font-size="14" font-weight="600">${title}</text>
    <text x="32" y="${h * 0.34}" fill="${colors.muted}" font-family="system-ui,sans-serif" font-size="11">From your prompt:</text>
    <text x="32" y="${h * 0.42}" fill="${colors.text}" font-family="system-ui,sans-serif" font-size="13">${tspans}</text>
    <text x="32" y="${h - 16}" fill="${colors.muted}" font-family="system-ui,sans-serif" font-size="10">Gemini 3.8 Flash · prompt preview frame</text>
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export async function generateLocalPromptPreviews(options: {
  prompt: string;
  count: number;
  aspectRatio: AspectRatioId;
  studioMode: StudioMode;
}): Promise<string[]> {
  const prompt = options.prompt.trim() || "Creative scene";
  return Array.from({ length: options.count }, (_, i) =>
    createPromptPreviewDataUrl({
      prompt,
      aspectRatio: options.aspectRatio,
      studioMode: options.studioMode,
      variantIndex: i,
    })
  );
}
