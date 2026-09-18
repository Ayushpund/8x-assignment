"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  CreditCard,
  Key,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Rocket,
  Search,
  Sparkles,
  Terminal,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";

const sidebarMain = [
  { href: "/api-product", label: "Dashboard", icon: LayoutDashboard },
  { href: "/api-product#search", label: "Search", icon: Search },
  { href: "/api-product", label: "Explore models", icon: Sparkles },
  { href: "/api-product#quickstart", label: "Quick start", icon: Rocket },
  { href: "/docs", label: "Documentation", icon: BookOpen },
  { href: "/pricing", label: "Pricing", icon: CreditCard, badge: "UP TO 50% OFF" },
];

const sidebarPlayground = [
  { href: "/create/image", label: "Playground", icon: Terminal },
  { href: "/api-product#keys", label: "API keys", icon: Key },
  { href: "/api-product#analytics", label: "Analytics", icon: BarChart3 },
  { href: "/billing", label: "Billing", icon: CreditCard },
];

export function ApiConsoleShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <SiteHeader variant="full" />
      <div className="flex min-h-0 flex-1">
        {sidebarOpen && (
        <aside className="hidden w-[240px] shrink-0 flex-col border-r border-border-subtle bg-[#0a0a0a] lg:flex">
          <div className="flex items-center justify-between border-b border-border-subtle px-4 py-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-xs font-black text-brand-foreground">
                H
              </span>
              <span className="text-sm font-semibold">Higgsfield API</span>
            </div>
            <button
              type="button"
              aria-label="Collapse sidebar"
              onClick={() => setSidebarOpen(false)}
              className="rounded p-1 hover:bg-surface-hover"
            >
              <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <nav className="flex-1 space-y-0.5 p-3">
            {sidebarMain.map((item) => (
              <SidebarLink key={item.label} item={item} pathname={pathname} />
            ))}

            <p className="mb-1 mt-6 px-3 text-[11px] font-medium text-muted-foreground">
              Playground
            </p>
            {sidebarPlayground.map((item) => (
              <SidebarLink key={item.label} item={item} pathname={pathname} />
            ))}
          </nav>

          <div className="space-y-2 border-t border-border-subtle p-3">
            <Link
              href="/enterprise"
              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-surface-hover hover:text-foreground"
            >
              Contact sales
            </Link>
            <Link
              href="/pricing"
              className="block rounded-lg border border-brand/30 bg-brand/10 px-3 py-2 text-center text-sm font-medium text-brand"
            >
              Pricing
            </Link>
            {user ? (
              <>
                <p className="truncate px-3 py-1 text-xs text-muted-foreground">
                  {user.name}
                </p>
                <Link
                  href="/create/image"
                  className="block rounded-lg bg-brand px-3 py-2.5 text-center text-sm font-bold text-brand-foreground"
                >
                  Open playground
                </Link>
              </>
            ) : (
              <Link
                href="/login?return=/api-product"
                className="block rounded-lg bg-brand px-3 py-2.5 text-center text-sm font-bold text-brand-foreground"
              >
                Log in
              </Link>
            )}
          </div>
        </aside>
        )}

        <main className="relative min-w-0 flex-1 overflow-y-auto">
          {!sidebarOpen && (
            <button
              type="button"
              aria-label="Expand sidebar"
              onClick={() => setSidebarOpen(true)}
              className="absolute left-3 top-3 z-10 hidden rounded-lg border border-border-subtle bg-[#141414] p-2 hover:bg-[#1f1f1f] lg:inline-flex"
            >
              <PanelLeftOpen className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
          <nav className="flex gap-2 overflow-x-auto border-b border-border-subtle px-4 py-2 lg:hidden">
            <Link href="/api-product" className="shrink-0 rounded-lg bg-[#1f1f1f] px-3 py-1.5 text-xs font-medium">
              Models
            </Link>
            <Link href="/api-product#search" className="shrink-0 rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
              Search
            </Link>
            <Link href="/create/image" className="shrink-0 rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
              Playground
            </Link>
            <Link href="/docs" className="shrink-0 rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
              Docs
            </Link>
            <Link href="/pricing" className="shrink-0 rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
              Pricing
            </Link>
          </nav>
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarLink({
  item,
  pathname,
}: {
  item: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    external?: boolean;
    badge?: string;
    active?: boolean;
  };
  pathname: string;
}) {
  const Icon = item.icon;
  const active =
    item.active ||
    (item.label === "Explore models" &&
      (pathname === "/api-product" || pathname === "/explore"));

  const className = cn(
    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition",
    active
      ? "bg-[#1f1f1f] text-foreground"
      : "text-muted-foreground hover:bg-[#161616] hover:text-foreground"
  );

  const inner = (
    <>
      <Icon className="h-4 w-4 shrink-0 opacity-80" />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span className="rounded bg-brand px-1.5 py-0.5 text-[8px] font-bold uppercase text-brand-foreground">
          {item.badge}
        </span>
      )}
    </>
  );

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {inner}
    </Link>
  );
}
