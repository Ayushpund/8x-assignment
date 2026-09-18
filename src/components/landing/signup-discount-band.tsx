"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoopVideo } from "@/components/ui/loop-video";
import { HIGGS_STATIC } from "@/lib/higgs-media";
import { PROMO_HERO_VIDEO } from "@/lib/higgs-videos";

const perks = [
  "Get unlimited Nano Banana Pro",
  "Unlock your extra discount",
  "Access to Seedance 2.5",
];

/** Sign-up strip with background video — higgsfield home */
export function SignupDiscountBand() {
  return (
    <section className="overflow-hidden rounded-[20px] border border-[#2a2a2a] bg-[#0a0a0a]">
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="relative min-h-[220px] lg:min-h-[280px]">
          <LoopVideo
            src={PROMO_HERO_VIDEO}
            poster={HIGGS_STATIC.landscapePromo}
            fill
            lazy={false}
            keepAlive
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/80 lg:to-black/90" />
        </div>
        <div className="flex flex-col justify-center gap-5 p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Sign up and get your{" "}
            <span className="text-brand">extra discount</span>
          </h2>
          <ul className="space-y-2.5">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check className="h-4 w-4 shrink-0 text-brand" />
                {perk}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" variant="white" asChild>
              <Link href="/signup">Get your discount</Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/signup">Sign up and get your discount</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
