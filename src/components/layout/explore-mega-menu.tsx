"use client";

import Link from "next/link";
import { EXPLORE_SUITE_COLUMNS } from "@/lib/explore-suite-links";
import { cn } from "@/lib/utils";

export function ExploreMegaMenu({ open }: { open: boolean }) {
  return (
    <div
      className={cn(
        "absolute left-1/2 top-full z-[60] w-[100vw] max-w-[100vw] -translate-x-1/2 pt-0 transition-all duration-200",
        open
          ? "pointer-events-auto visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-1 opacity-0"
      )}
    >
      <div className="border-b border-black/10 bg-brand px-4 py-8 text-black sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-[minmax(0,1.1fr)_repeat(5,minmax(0,1fr))]">
          <div className="flex flex-col justify-center pr-4">
            <p className="text-3xl font-black uppercase leading-[1.05] tracking-tight md:text-4xl lg:text-[2.75rem]">
              AI-Native
              <br />
              Creative Suite
            </p>
          </div>
          {EXPLORE_SUITE_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-black/50">
                {col.title}
              </p>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-[13px] font-medium text-black/90 transition hover:text-black"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="rounded bg-black px-1 py-px text-[8px] font-bold uppercase text-brand">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
