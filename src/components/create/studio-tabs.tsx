"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { StudioMode } from "@/lib/studio-config";
import { cn } from "@/lib/utils";

const tabs: { mode: StudioMode; label: string; href: string }[] = [
  { mode: "image", label: "Image", href: "/create/image" },
  { mode: "video", label: "Video", href: "/create/video" },
  { mode: "audio", label: "Audio", href: "/create/audio" },
];

export function StudioTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const suffix = query ? `?${query}` : "";

  return (
    <div className="border-b border-border-subtle bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-[1600px] gap-1 px-4 py-2 lg:px-6">
        {tabs.map((tab) => {
          const active = pathname === tab.href || pathname?.startsWith(`${tab.href}/`);
          return (
            <Link
              key={tab.mode}
              href={`${tab.href}${suffix}`}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition",
                active
                  ? "bg-[#1f1f1f] text-foreground"
                  : "text-muted-foreground hover:bg-[#161616] hover:text-foreground"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
