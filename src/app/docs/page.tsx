import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

export default function DocsPage() {
  return (
    <PageShell variant="marketing">
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6">
        <h1 className="text-3xl font-bold tracking-tight">API documentation</h1>
        <p className="mt-3 text-muted-foreground">
          Prototype docs for this clone. Explore the full model catalog in the
          console UI.
        </p>

        <section className="mt-10 space-y-4 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold">Generate images</h2>
          <pre className="overflow-x-auto rounded-xl bg-[#0d0d0d] p-4 text-xs text-foreground">
{`POST /api/generate
Content-Type: application/json

{
  "prompt": "Product bottle on marble, studio light",
  "aspectRatio": "1:1",
  "count": 1,
  "studioMode": "image",
  "modelId": "gemini-3.8-flash",
  "apiKey": "AIza…",
  "baseImage": "data:image/png;base64,..." // optional
}

Model: gemini-3.8-flash only.`}
          </pre>
          <p className="text-sm text-muted-foreground">
            Response: <code className="text-foreground">{`{ images: string[], demoMode?: boolean }`}</code>
          </p>
          <Button asChild>
            <Link href="/create/image">Open playground</Link>
          </Button>
        </section>

        <section className="mt-6 space-y-2 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold">Health check</h2>
          <p className="text-sm text-muted-foreground">
            <code className="text-foreground">GET /api/health</code> — use for
            deploy probes (returns whether Gemini is configured).
          </p>
          <Button variant="secondary" asChild>
            <Link href="/api-product">Explore models</Link>
          </Button>
        </section>
      </div>
    </PageShell>
  );
}
