"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const perks = [
  "Get unlimited Nano Banana Pro",
  "Unlock your extra discount",
  "Access to Seedance 2.5",
];

export function DiscountCta() {
  return (
    <section className="rounded-[24px] border border-border bg-surface p-6 md:p-10">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Sign up and get your{" "}
            <span className="text-brand">extra discount</span>
          </h2>
          <ul className="mt-6 space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 shrink-0 text-brand" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
          <Button size="lg" variant="white" asChild>
            <Link href="/signup">Get your discount</Link>
          </Button>
          <Button size="lg" asChild>
            <Link href="/signup">Sign up and get your discount</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
