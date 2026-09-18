import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

type PageShellProps = {
  children: React.ReactNode;
  variant?: "marketing" | "app";
  header?: "full" | "compact" | "none";
};

export function PageShell({
  children,
  variant = "marketing",
  header = "full",
}: PageShellProps) {
  const shell = (
    <>
      {header !== "none" && <SiteHeader variant={header} />}
      <main className="flex-1">{children}</main>
    </>
  );

  if (variant === "app") {
    return <div className="flex min-h-screen flex-col bg-background">{shell}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {shell}
      <SiteFooter />
    </div>
  );
}
