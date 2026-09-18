import Link from "next/link";
import {
  CreditCard,
  Film,
  ImageIcon,
  Layers,
  Music,
  Sparkles,
  Wrench,
} from "lucide-react";

const quickLinks = [
  {
    label: "Image studio",
    href: "/create/image",
    icon: ImageIcon,
    hint: "Nano Banana Pro",
  },
  {
    label: "Video studio",
    href: "/create/video",
    icon: Film,
    hint: "Seedance 2.5",
  },
  {
    label: "Audio studio",
    href: "/create/audio",
    icon: Music,
    hint: "Voice & SFX",
  },
  {
    label: "Your assets",
    href: "/gallery",
    icon: Layers,
    hint: "Gallery & favorites",
  },
  {
    label: "Pricing",
    href: "/pricing",
    icon: CreditCard,
    hint: "Plans & 54% off",
  },
  {
    label: "API models",
    href: "/api-product",
    icon: Sparkles,
    hint: "50+ models",
  },
];

import type { ReactNode } from "react";

type FaqItem = { q: string; a: ReactNode };

const sections: { title: string; items: FaqItem[] }[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "How do I create my first image?",
        a: (
          <>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                Go to{" "}
                <Link href="/create/image" className="text-brand hover:underline">
                  Image studio
                </Link>
                .
              </li>
              <li>Describe your scene in the prompt box.</li>
              <li>Pick an aspect ratio (1:1, 16:9, 9:16, or 4:5).</li>
              <li>Click Generate — results appear on the right and save to Assets.</li>
            </ol>
          </>
        ),
      },
      {
        q: "Image vs Video vs Audio — which studio?",
        a: (
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-medium text-foreground">Image</strong> — product shots,
              portraits, edits, templates.{" "}
              <Link href="/image" className="text-brand hover:underline">
                Learn more
              </Link>
            </li>
            <li>
              <strong className="font-medium text-foreground">Video</strong> — cinematic clips,
              motion, Seedance-style keyframes.{" "}
              <Link href="/video" className="text-brand hover:underline">
                Learn more
              </Link>
            </li>
            <li>
              <strong className="font-medium text-foreground">Audio</strong> — music, voice, and
              sound-design concepts with cover art.{" "}
              <Link href="/audio" className="text-brand hover:underline">
                Learn more
              </Link>
            </li>
          </ul>
        ),
      },
      {
        q: "Where are my generations saved?",
        a: (
          <>
            Everything you generate is stored in{" "}
            <Link href="/gallery" className="text-brand hover:underline">
              Assets (Gallery)
            </Link>
            . Use the heart icon to add favorites. Sign in to keep your account in sync across
            sessions on this device.
          </>
        ),
      },
    ],
  },
  {
    title: "Studios & tools",
    items: [
      {
        q: "Which Higgsfield tool should I use?",
        a: (
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Product ads &amp; campaigns →{" "}
              <Link href="/marketing-studio" className="text-brand hover:underline">
                Marketing Studio
              </Link>
            </li>
            <li>
              Film looks &amp; cameras →{" "}
              <Link href="/cinema-studio" className="text-brand hover:underline">
                Cinema Studio
              </Link>
            </li>
            <li>
              Motion transfer &amp; remix →{" "}
              <Link href="/genjutsu" className="text-brand hover:underline">
                Genjutsu
              </Link>
            </li>
            <li>
              Viral VFX presets →{" "}
              <Link href="/effects" className="text-brand hover:underline">
                Effects
              </Link>{" "}
              (free presets)
            </li>
            <li>
              Agent &amp; team workflows →{" "}
              <Link href="/enterprise" className="text-brand hover:underline">
                Supercomputer / Enterprise
              </Link>
            </li>
            <li>
              Claude &amp; coding agents →{" "}
              <Link href="/mcp" className="text-brand hover:underline">
                MCP &amp; CLI
              </Link>
            </li>
          </ul>
        ),
      },
      {
        q: "Templates and Effects",
        a: (
          <>
            <Link href="/templates" className="text-brand hover:underline">
              Templates
            </Link>{" "}
            open Image studio with a ready-made prompt.{" "}
            <Link href="/effects" className="text-brand hover:underline">
              Effects
            </Link>{" "}
            presets open Video studio for cinematic VFX-style generations.
          </>
        ),
      },
    ],
  },
  {
    title: "Billing & credits",
    items: [
      {
        q: "Plans and pricing",
        a: (
          <>
            See{" "}
            <Link href="/pricing" className="text-brand hover:underline">
              Pricing
            </Link>{" "}
            for Free, Pro, and Enterprise. The top banner and bell notifications show active
            promos (e.g. 54% off Personal). Tap Upgrade in the credits toast on the home page
            anytime.
          </>
        ),
      },
      {
        q: "What counts as a generation?",
        a: (
          <>
            Each click of Generate in a studio uses credits based on how many variations you
            request (1–4). Video and Audio studios follow the same flow; Pro plans unlock higher
            limits and priority rendering.
          </>
        ),
      },
    ],
  },
  {
    title: "Account & API",
    items: [
      {
        q: "Sign up and log in",
        a: (
          <>
            <Link href="/signup" className="text-brand hover:underline">
              Sign up
            </Link>{" "}
            to unlock Create after checkout flow, or{" "}
            <Link href="/login" className="text-brand hover:underline">
              log in
            </Link>{" "}
            if you already have an account. Profile menu (top right) links to Assets and Create.
          </>
        ),
      },
      {
        q: "Developers & API",
        a: (
          <>
            Browse models and pricing in{" "}
            <Link href="/api-product" className="text-brand hover:underline">
              API Explore
            </Link>
            . Paste your Google AI Studio key under{" "}
            <strong className="font-medium text-foreground">Your Gemini API key</strong>{" "}
            (Create or API) — model is{" "}
            <code className="text-foreground">gemini-3.8-flash</code> only. Product docs at{" "}
            <Link href="/docs" className="text-brand hover:underline">
              Documentation
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      {
        q: "Rate limit or generation failed",
        a: (
          <>
            Shared server quota may be exhausted — open{" "}
            <Link href="/create/image" className="text-brand hover:underline">
              Image studio
            </Link>{" "}
            or{" "}
            <Link href="/api-product#keys" className="text-brand hover:underline">
              API keys
            </Link>
            , expand <strong className="font-medium text-foreground">Your Gemini API key</strong>,
            and save a free key from Google AI Studio. Your key bypasses the app rate limit.
            Use one variation at a time on free tiers.
          </>
        ),
      },
      {
        q: "Page looks unstyled or broken",
        a: (
          <>
            Restart the app locally with a clean dev server, then hard-refresh the browser
            (Ctrl+Shift+R). Clear cached CSS if the layout appears without colors or fonts.
          </>
        ),
      },
    ],
  },
];

export function HelpCenter() {
  return (
    <div className="space-y-10">
      <p className="text-base leading-relaxed text-muted-foreground">
        Find answers about creating, plans, and tools. Use the shortcuts below or browse by topic.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 transition hover:border-brand/40 hover:bg-surface-hover"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{item.hint}</span>
              </span>
            </Link>
          );
        })}
      </div>

      {sections.map((section) => (
        <section
          key={section.title}
          className="rounded-2xl border border-border bg-surface/50 p-6 sm:p-8"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            {section.title === "Troubleshooting" && (
              <Wrench className="h-5 w-5 text-brand" aria-hidden />
            )}
            {section.title}
          </h2>
          <ul className="mt-5 space-y-8">
            {section.items.map((item) => (
              <li key={item.q}>
                <h3 className="text-sm font-semibold text-foreground">{item.q}</h3>
                <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</div>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section
        id="enterprise"
        className="scroll-mt-24 rounded-2xl border border-brand/30 bg-brand/10 p-6 sm:p-8"
      >
        <h2 className="text-lg font-semibold text-foreground">Enterprise &amp; sales</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Need SSO, dedicated support, custom models, or high-volume API? Review{" "}
          <Link href="/enterprise" className="font-medium text-brand hover:underline">
            Enterprise
          </Link>
          , compare{" "}
          <Link href="/pricing" className="font-medium text-brand hover:underline">
            Pricing
          </Link>
          , then{" "}
          <Link href="/signup" className="font-medium text-brand hover:underline">
            create an account
          </Link>{" "}
          — our team will help you choose the right plan.
        </p>
      </section>
    </div>
  );
}
