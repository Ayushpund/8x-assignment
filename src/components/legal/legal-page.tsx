import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

type LegalPageProps = {
  title: string;
  children: React.ReactNode;
};

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <PageShell variant="marketing">
      <article className="mx-auto max-w-3xl px-4 py-12 lg:px-6">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <div className="prose prose-invert mt-8 max-w-none space-y-4 text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
        <Button className="mt-10" variant="secondary" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </article>
    </PageShell>
  );
}
