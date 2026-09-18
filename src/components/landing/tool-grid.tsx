"use client";

import Link from "next/link";
import Image from "next/image";
import { Film, ImageIcon, Sparkles, Terminal, Clapperboard, Cpu } from "lucide-react";
import { toolCards } from "@/lib/mock-data";

const icons: Record<string, React.ReactNode> = {
  "nano-banana": <ImageIcon className="h-4 w-4" />,
  seedance: <Film className="h-4 w-4" />,
  remix: <Sparkles className="h-4 w-4" />,
  mcp: <Terminal className="h-4 w-4" />,
  cinema: <Clapperboard className="h-4 w-4" />,
  super: <Cpu className="h-4 w-4" />,
};

export function ToolGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {toolCards.map((tool) => (
        <Link
          key={tool.id}
          href={tool.href}
          className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface transition hover:border-brand/30 hover:bg-surface-hover"
        >
          <div className="relative h-24 overflow-hidden">
            <Image
              src={tool.image}
              alt=""
              fill
              className="object-cover opacity-60 transition group-hover:scale-105 group-hover:opacity-80"
              sizes="300px"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
          </div>
          <div className="flex flex-1 flex-col p-4 pt-2">
            <div className="mb-2 flex items-start justify-between gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-input text-muted-foreground">
                {icons[tool.id]}
              </span>
              <div className="flex flex-wrap justify-end gap-1">
                {tool.badge === "TOP" && (
                  <span className="rounded bg-accent-pink px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                    Top
                  </span>
                )}
                {tool.tag && (
                  <span className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    {tool.tag}
                  </span>
                )}
              </div>
            </div>
            <h3 className="font-semibold">{tool.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{tool.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
