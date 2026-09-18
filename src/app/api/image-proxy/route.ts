import { NextResponse } from "next/server";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function isAllowedImageUrl(raw: string): boolean {
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" && u.protocol !== "http:") return false;
    const host = u.hostname.toLowerCase();
    if (
      host === "localhost" ||
      host.startsWith("127.") ||
      host.startsWith("10.") ||
      host.startsWith("192.168.")
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url")?.trim();
  const download = searchParams.get("download") === "1";

  if (!target || !isAllowedImageUrl(target)) {
    return NextResponse.json({ error: "Invalid image URL." }, { status: 400 });
  }

  try {
    const res = await fetch(target, {
      headers: {
        "User-Agent": UA,
        Accept: "image/*,*/*;q=0.8",
        Referer: new URL(target).origin,
      },
      redirect: "follow",
      signal: AbortSignal.timeout(25_000),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Upstream fetch failed." }, { status: 502 });
    }
    const mime = (res.headers.get("content-type") ?? "image/jpeg").split(";")[0]!;
    if (!mime.startsWith("image/")) {
      return NextResponse.json({ error: "Not an image." }, { status: 502 });
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > 12_000_000) {
      return NextResponse.json({ error: "Image too large." }, { status: 502 });
    }

    const headers: Record<string, string> = {
      "Content-Type": mime,
      "Cache-Control": "public, max-age=86400",
    };
    if (download) {
      headers["Content-Disposition"] = 'attachment; filename="generation.jpg"';
    }

    return new NextResponse(buf, { status: 200, headers });
  } catch {
    return NextResponse.json({ error: "Could not fetch image." }, { status: 502 });
  }
}
