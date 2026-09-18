import type { AspectRatioId } from "@/lib/create-constants";
import type { StudioMode } from "@/lib/studio-config";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 8xStudio/1.0";
const FETCH_MS = 25_000;
const MAX_BYTES = 12_000_000;

const STOP_WORDS = new Set([
  "a", "an", "the", "with", "and", "or", "of", "in", "on", "at", "to", "for",
  "from", "your", "this", "that", "image", "photo", "picture", "style", "shot",
]);

export type WebPromptImageResult = {
  images: string[];
  notice: string;
  sources: string[];
};

export function isPlaceholderSvgDataUrl(dataUrl: string): boolean {
  return dataUrl.startsWith("data:image/svg+xml");
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

export function buildPromptSearchQuery(options: {
  prompt: string;
  styleTags?: string[];
  studioMode: StudioMode;
  includeStyles?: boolean;
}): string {
  const base = options.prompt
    .replace(/\s*—\s*.+$/, "")
    .replace(/,\s*[\w\s-]+(?:style|lighting|preset)/gi, "")
    .trim();

  let q = base;
  if (options.includeStyles !== false) {
    const styleHint = (options.styleTags ?? []).slice(0, 1).join(" ");
    q = [base, styleHint].filter(Boolean).join(" ").trim();
  }
  if (!q) q = options.prompt.trim();

  if (options.studioMode === "audio") q = `${q} album cover artwork`;
  return q.slice(0, 140);
}

function searchVariants(query: string, aggressive: boolean): string[] {
  const variants = [query];
  const lower = query.toLowerCase();
  const words = tokenize(query);

  if (lower.includes("ramayan")) {
    variants.push(query.replace(/ramayan/gi, "Ramayana"));
    variants.push("Ramayana battle art");
    variants.push("Ramayana war illustration");
  }
  if (words.length >= 2) {
    variants.push(words.slice(0, 3).join(" "));
    variants.push(`${words.slice(0, 2).join(" ")} photo`);
    variants.push(`${words.slice(0, 2).join(" ")} image`);
  }
  if (aggressive && words.length > 0) {
    variants.push(words[0]!);
    variants.push(`${words[0]} wallpaper`);
  }

  return Array.from(new Set(variants.map((v) => v.trim()).filter(Boolean)));
}

function relevanceScore(hit: ImageHit, tokens: string[]): number {
  if (tokens.length === 0) return 1;
  const hay = `${hit.title ?? ""} ${hit.url}`.toLowerCase();
  let score = 0;
  for (const t of tokens) {
    if (hay.includes(t)) score += 3;
  }
  return score;
}

async function fetchBuffer(
  url: string,
  referer?: string
): Promise<{ data: Buffer; mime: string } | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        Referer: referer ?? "https://openverse.org/",
      },
      signal: AbortSignal.timeout(FETCH_MS),
      redirect: "follow",
    });
    if (!res.ok) return null;
    const mime = (res.headers.get("content-type") ?? "image/jpeg").split(";")[0]!;
    if (!mime.startsWith("image/")) return null;
    const data = Buffer.from(await res.arrayBuffer());
    if (data.length > MAX_BYTES || data.length < 400) return null;
    return { data, mime };
  } catch {
    return null;
  }
}

async function urlToDataUrl(url: string, referer?: string): Promise<string | null> {
  const buf = await fetchBuffer(url, referer);
  if (!buf) return null;
  return `data:${buf.mime};base64,${buf.data.toString("base64")}`;
}

type ImageHit = {
  url: string;
  fallbackUrl?: string;
  title?: string;
  source: string;
  referer?: string;
  score?: number;
};

async function searchOpenverse(
  query: string,
  limit: number,
  page: number
): Promise<ImageHit[]> {
  const params = new URLSearchParams({
    q: query,
    page: String(Math.max(1, page)),
    page_size: String(Math.min(limit * 4, 20)),
  });
  const res = await fetch(
    `https://api.openverse.engineering/v1/images/?${params}`,
    {
      headers: { "User-Agent": UA, Accept: "application/json" },
      signal: AbortSignal.timeout(FETCH_MS),
    }
  );
  if (!res.ok) return [];
  const json = (await res.json()) as {
    results?: Array<{
      url?: string;
      thumbnail?: string;
      title?: string;
      filesize?: number;
    }>;
  };
  const hits: ImageHit[] = [];
  for (const item of json.results ?? []) {
    const full = item.url?.trim();
    const thumb = item.thumbnail?.trim();
    if (!full && !thumb) continue;
    const useFullFirst = !item.filesize || item.filesize <= MAX_BYTES * 0.85;
    hits.push({
      url: useFullFirst && full ? full : thumb ?? full!,
      fallbackUrl:
        useFullFirst && full && thumb && thumb !== full ? full : undefined,
      title: item.title,
      source: "Openverse",
      referer: "https://openverse.org/",
    });
  }
  return hits;
}

async function searchWikimediaCommons(
  query: string,
  limit: number
): Promise<ImageHit[]> {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: String(Math.min(limit * 4, 20)),
    prop: "imageinfo",
    iiprop: "url|thumburl|mime",
    iiurlwidth: "1024",
  });
  const res = await fetch(
    `https://commons.wikimedia.org/w/api.php?${params}`,
    {
      headers: { "User-Agent": UA, Accept: "application/json" },
      signal: AbortSignal.timeout(FETCH_MS),
    }
  );
  if (!res.ok) return [];
  const json = (await res.json()) as {
    query?: {
      pages?: Record<
        string,
        { title?: string; imageinfo?: Array<{ thumburl?: string; url?: string }> }
      >;
    };
  };
  const hits: ImageHit[] = [];
  for (const page of Object.values(json.query?.pages ?? {})) {
    const info = page.imageinfo?.[0];
    const url = info?.thumburl ?? info?.url;
    if (!url) continue;
    hits.push({
      url,
      title: page.title?.replace(/^File:/i, ""),
      source: "Wikimedia Commons",
      referer: "https://commons.wikimedia.org/",
    });
  }
  return hits;
}

async function getDuckDuckGoVqd(query: string): Promise<string | null> {
  const res = await fetch(
    `https://duckduckgo.com/?q=${encodeURIComponent(`"${query}"`)}&iax=images&ia=images`,
    {
      headers: { "User-Agent": UA, Accept: "text/html" },
      signal: AbortSignal.timeout(FETCH_MS),
    }
  );
  if (!res.ok) return null;
  const html = await res.text();
  const match =
    html.match(/vqd=['"]([^'"]+)['"]/) ?? html.match(/vqd=([\d-]+)/);
  return match?.[1] ?? null;
}

async function ddgImageRequest(
  query: string,
  vqd: string,
  page: number,
  limit: number,
  quoted: boolean
): Promise<ImageHit[]> {
  const params = new URLSearchParams({
    l: "us-en",
    o: "json",
    q: quoted ? `"${query}"` : query,
    vqd,
    f: ",,,",
    p: String(Math.max(1, page)),
  });
  const res = await fetch(`https://duckduckgo.com/i.js?${params}`, {
    headers: {
      "User-Agent": UA,
      Accept: "application/json",
      Referer: "https://duckduckgo.com/",
    },
    signal: AbortSignal.timeout(FETCH_MS),
  });
  if (!res.ok) return [];
  const json = (await res.json()) as {
    results?: Array<{ image?: string; thumbnail?: string; title?: string }>;
  };
  const hits: ImageHit[] = [];
  for (const row of json.results ?? []) {
    const url = row.thumbnail?.trim() || row.image?.trim();
    if (!url || !/^https?:\/\//i.test(url)) continue;
    hits.push({
      url,
      title: row.title,
      source: "Web search",
      referer: "https://duckduckgo.com/",
    });
    if (hits.length >= limit * 4) break;
  }
  return hits;
}

async function searchDuckDuckGoImages(
  query: string,
  limit: number,
  page: number
): Promise<ImageHit[]> {
  const vqd = await getDuckDuckGoVqd(query);
  if (!vqd) return [];
  const strict = await ddgImageRequest(query, vqd, page, limit, true);
  if (strict.length > 0) return strict;
  return ddgImageRequest(query, vqd, page, limit, false);
}

async function searchGoogleImagesHtml(
  query: string,
  limit: number
): Promise<ImageHit[]> {
  const url = `https://www.google.com/search?q=${encodeURIComponent(query + " image")}&tbm=isch&hl=en`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "text/html",
      "Accept-Language": "en-US,en;q=0.9",
    },
    signal: AbortSignal.timeout(FETCH_MS),
  });
  if (!res.ok) return [];
  const html = await res.text();
  const hits: ImageHit[] = [];
  const seen = new Set<string>();

  const patterns = [
    /"ou":"(https:\\\/\\\/[^"\\]+)"/g,
    /\["(https:\/\/[^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/gi,
    /(https:\/\/[^"\s]+\.(?:jpg|jpeg|png|webp)(?:\?[^"\s]*)?)/gi,
  ];

  for (const re of patterns) {
    for (const m of html.matchAll(re)) {
      let raw = m[1] ?? m[0];
      if (!raw) continue;
      raw = raw.replace(/\\u003d/g, "=").replace(/\\\//g, "/");
      if (!/^https?:\/\//i.test(raw)) continue;
      const key = raw.split("?")[0]!.toLowerCase();
      if (seen.has(key)) continue;
      if (raw.includes("gstatic.com") && raw.includes("images?q=tbn")) continue;
      seen.add(key);
      hits.push({
        url: raw,
        title: query,
        source: "Google Images",
        referer: "https://www.google.com/",
      });
      if (hits.length >= limit * 4) break;
    }
    if (hits.length >= limit * 4) break;
  }
  return hits;
}

async function collectHits(
  query: string,
  count: number,
  page: number,
  tokens: string[],
  aggressive: boolean
): Promise<ImageHit[]> {
  for (const variant of searchVariants(query, aggressive)) {
    const [openverse, wiki, ddg, google] = await Promise.all([
      searchOpenverse(variant, count, page),
      searchWikimediaCommons(variant, count),
      searchDuckDuckGoImages(variant, count, page),
      aggressive ? searchGoogleImagesHtml(variant, count) : Promise.resolve([]),
    ]);

    const seen = new Set<string>();
    const merged: ImageHit[] = [];
    for (const hit of [...google, ...wiki, ...openverse, ...ddg]) {
      const key = hit.url.split("?")[0]!.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      hit.score = relevanceScore(hit, tokens);
      merged.push(hit);
    }

    merged.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    if (merged.length > 0) return merged;
  }
  return [];
}

async function hitToStudioImage(hit: ImageHit): Promise<string | null> {
  let dataUrl = await urlToDataUrl(hit.url, hit.referer);
  if (!dataUrl && hit.fallbackUrl) {
    dataUrl = await urlToDataUrl(hit.fallbackUrl, hit.referer);
  }
  if (dataUrl) return dataUrl;
  if (/^https?:\/\//i.test(hit.url)) {
    return `/api/image-proxy?url=${encodeURIComponent(hit.url)}`;
  }
  return null;
}

export async function fetchPromptImagesFromWeb(options: {
  prompt: string;
  styleTags?: string[];
  count: number;
  aspectRatio: AspectRatioId;
  studioMode: StudioMode;
  searchPage?: number;
  aggressive?: boolean;
}): Promise<WebPromptImageResult> {
  void options.aspectRatio;
  const baseQuery = buildPromptSearchQuery({
    prompt: options.prompt,
    styleTags: options.styleTags,
    studioMode: options.studioMode,
    includeStyles: false,
  });
  if (!baseQuery) {
    return { images: [], notice: "", sources: [] };
  }

  const tokens = tokenize(baseQuery);
  const page = Math.max(1, Number(options.searchPage) || 1);
  let candidates = await collectHits(
    baseQuery,
    options.count,
    page,
    tokens,
    Boolean(options.aggressive)
  );
  if (candidates.length === 0) {
    candidates = await collectHits(
      baseQuery,
      options.count,
      page + 1,
      tokens,
      true
    );
  }

  const images: string[] = [];
  const sources: string[] = [];

  for (const hit of candidates) {
    if (images.length >= options.count) break;
    const src = await hitToStudioImage(hit);
    if (!src) continue;
    images.push(src);
    sources.push(hit.source);
  }

  if (images.length === 0) {
    return { images: [], notice: "", sources: [] };
  }

  const modeLabel =
    options.studioMode === "audio" ? "audio visual" : "image";

  return {
    images: images.slice(0, options.count),
    sources: sources.slice(0, options.count),
    notice:
      `Web search for “${baseQuery}” — ${images.length} ${modeLabel}(s) from ${sources.join(", ")}. Download enabled.`,
  };
}
