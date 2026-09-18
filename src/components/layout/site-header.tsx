"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Crown,
  FolderOpen,
  Gem,
  LogOut,
  Menu,
  Search,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExploreMegaMenu } from "@/components/layout/explore-mega-menu";
import { NotificationsMenu } from "@/components/layout/notifications-menu";
import { PromoBanner } from "@/components/layout/promo-banner";
import { PRIMARY_NAV } from "@/lib/navigation";
import { useAuthStore } from "@/store/auth-store";
import { HiggsfieldLogo } from "@/components/brand/higgsfield-logo";
import { cn } from "@/lib/utils";

function NavBadge({ type }: { type: "New" | "Free" }) {
  return (
    <span
      className={cn(
        "ml-1 inline-flex rounded px-1 py-px text-[9px] font-bold uppercase leading-none",
        type === "New"
          ? "bg-brand text-brand-foreground"
          : "border border-brand/60 text-brand"
      )}
    >
      {type}
    </span>
  );
}

type SiteHeaderProps = {
  variant?: "full" | "compact" | "none";
};

export function SiteHeader({ variant = "full" }: SiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logOut = useAuthStore((s) => s.logOut);
  const isPro = user?.plan === "pro";
  const [exploreOpen, setExploreOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  if (variant === "none") return null;

  const compact = variant === "compact";

  return (
    <div className="sticky top-0 z-50">
      {!compact && <PromoBanner />}
      <header className="border-b border-border-subtle bg-[#0a0a0a]">
        <div className="flex h-14 items-center gap-3 px-3 lg:px-4">
          <Link href="/" className="shrink-0 text-white" aria-label="Higgsfield home">
            <HiggsfieldLogo className="h-8 w-8" />
          </Link>

          {!compact && (
            <>
              <nav className="nav-scroll hidden min-w-0 flex-1 items-center xl:flex">
                {PRIMARY_NAV.map((link) => {
                  if (link.id === "explore") {
                    return (
                      <div
                        key={link.id}
                        className="relative shrink-0 pb-1"
                        onMouseEnter={() => setExploreOpen(true)}
                        onMouseLeave={() => setExploreOpen(false)}
                      >
                        <Link
                          href="/"
                          className={cn(
                            "relative whitespace-nowrap px-2.5 py-2 text-[13px] font-medium",
                            pathname === "/"
                              ? "text-brand"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          Explore
                          {pathname === "/" ? (
                            <span className="absolute inset-x-2 -top-0.5 h-0.5 rounded-full bg-brand" />
                          ) : null}
                        </Link>
                        <ExploreMegaMenu open={exploreOpen} />
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      className={cn(
                        "inline-flex shrink-0 items-center whitespace-nowrap px-2.5 py-2 text-[13px] font-medium",
                        isActive(link.href)
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.label}
                      {link.badge && <NavBadge type={link.badge} />}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex min-w-0 flex-1 justify-end xl:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="max-h-[70vh] w-56 overflow-y-auto">
                    {PRIMARY_NAV.map((link) => (
                      <DropdownMenuItem key={link.id} asChild>
                        <Link href={link.href}>{link.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}

          {compact && (
            <span className="flex-1 text-center text-sm font-medium text-muted-foreground">
              Account
            </span>
          )}

          <div className="flex shrink-0 items-center gap-1.5">
            {!compact && (
              <>
                <Link
                  href="/api-product#search"
                  className="hidden rounded-lg p-2 text-muted-foreground hover:bg-surface-hover hover:text-foreground md:inline-flex"
                  aria-label="Search models"
                >
                  <Search className="h-[18px] w-[18px]" />
                </Link>

                <Link
                  href="/pricing"
                  className="relative hidden flex-col items-center justify-center rounded-xl bg-[#1a1a1a] px-3 py-2 text-[11px] font-medium leading-tight text-foreground hover:bg-[#222] sm:flex"
                >
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-accent-pink px-1.5 py-px text-[8px] font-bold uppercase text-white">
                    54% off
                  </span>
                  <span className="mt-1">Pricing</span>
                </Link>

                <Link
                  href="/enterprise"
                  className="hidden items-center gap-1.5 rounded-xl bg-[#1a1a1a] px-3 py-2 text-[12px] font-medium text-foreground hover:bg-[#222] md:inline-flex"
                >
                  <Gem className="h-3.5 w-3.5 text-muted-foreground" />
                  Enterprise
                </Link>

                <Link
                  href="/gallery"
                  className="hidden items-center gap-1.5 rounded-xl bg-[#1a1a1a] px-3 py-2 text-[12px] font-medium text-foreground hover:bg-[#222] md:inline-flex"
                >
                  <FolderOpen className="h-3.5 w-3.5 text-brand" />
                  Assets
                </Link>

                <NotificationsMenu />
              </>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "relative ml-1 flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-[#1a1a1a]",
                      isPro
                        ? "bg-gradient-to-br from-amber-400 to-brand"
                        : "bg-gradient-to-br from-brand to-lime-300"
                    )}
                    aria-label="Profile"
                  >
                    <span className="text-xs font-bold text-brand-foreground">
                      {user.name.slice(0, 1).toUpperCase()}
                    </span>
                    {isPro ? (
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0a0a0a] ring-1 ring-brand">
                        <Crown className="h-2.5 w-2.5 text-brand" />
                      </span>
                    ) : null}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="border-b border-border px-2 py-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{user.name}</p>
                      {isPro ? (
                        <span className="inline-flex items-center gap-0.5 rounded-pill bg-brand px-1.5 py-px text-[9px] font-bold uppercase text-brand-foreground">
                          <Crown className="h-2.5 w-2.5" />
                          Pro
                        </span>
                      ) : (
                        <span className="text-[9px] font-semibold uppercase text-muted-foreground">
                          Free
                        </span>
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/account">
                      <UserCircle className="mr-2 h-4 w-4" />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/gallery">Assets</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/create/image">Create</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      void logOut();
                      router.push("/");
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              !compact && (
                <>
                  <Link
                    href="/login"
                    className="hidden px-2 text-[13px] font-medium text-muted-foreground hover:text-foreground sm:inline"
                  >
                    Login
                  </Link>
                  <Button
                    size="sm"
                    className="h-9 rounded-xl px-4 text-xs font-semibold"
                    asChild
                  >
                    <Link href="/signup">Sign up</Link>
                  </Button>
                </>
              )
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
