"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { heroFeatures } from "@/lib/mock-data";
import { HERO_CARD_IMAGES } from "@/lib/showcase-images";

const imageById: Record<string, string> = {
  api: HERO_CARD_IMAGES.api,
  genjutsu: HERO_CARD_IMAGES.genjutsu,
  motion: HERO_CARD_IMAGES.motion,
};

export function HeroFeatureRow() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {heroFeatures.map((feature, i) => (
        <motion.div
          key={feature.id}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="opacity-100"
        >
          <Link
            href={feature.href}
            className="group block overflow-hidden rounded-[20px] border border-border bg-surface transition-shadow hover:shadow-card-hover"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={imageById[feature.id] ?? HERO_CARD_IMAGES.api}
                alt={feature.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,255,0,0.12),transparent_50%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-sm">
                <p className="text-xs font-medium uppercase tracking-wider text-brand">
                  Open {feature.title}
                </p>
              </div>
            </div>
            <div className="space-y-1 p-4">
              <h3 className="text-base font-semibold transition-colors group-hover:text-brand">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
