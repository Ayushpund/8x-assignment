"use client";

import Link from "next/link";
import { Bell, Sparkles, Tag, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const notifications = [
  {
    id: "credits",
    title: "Credits are running low",
    body: "Upgrade for unlimited Nano Banana Pro and priority queue.",
    href: "/pricing",
    icon: Zap,
    unread: true,
  },
  {
    id: "promo",
    title: "Personal 54% OFF",
    body: "Limited-time discount on Pro — includes Seedance 2.5 access.",
    href: "/pricing",
    icon: Tag,
    unread: true,
  },
  {
    id: "models",
    title: "New models in API catalog",
    body: "Seedance 2.5, Kling 3.0, and Genjutsu are live in Explore.",
    href: "/api-product",
    icon: Sparkles,
    unread: false,
  },
];

export function NotificationsMenu() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="relative rounded-lg p-2 text-muted-foreground transition hover:bg-surface-hover hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-pink px-1 text-[9px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[min(100vw-2rem,340px)] p-0">
        <p className="border-b border-border px-4 py-3 text-sm font-semibold">
          Notifications
        </p>
        <div className="max-h-[min(60vh,320px)] overflow-y-auto">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem key={item.id} asChild className="cursor-pointer p-0">
                <Link
                  href={item.href}
                  className="flex gap-3 px-4 py-3 hover:bg-surface-hover"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {item.title}
                      </span>
                      {item.unread && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      )}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                      {item.body}
                    </span>
                  </span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </div>
        <div className="border-t border-border p-2">
          <Button variant="secondary" className="w-full" size="sm" asChild>
            <Link href="/pricing">View plans &amp; upgrades</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
