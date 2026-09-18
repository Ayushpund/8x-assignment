import Link from "next/link";
import { Compass, Plug } from "lucide-react";
import { Button } from "@/components/ui/button";

function OpenAiMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.938 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .742 7.097 5.98 5.98 0 0 0 .511 4.936 6.051 6.051 0 0 0 6.514 2.912 5.981 5.981 0 0 0 4.976-2.732 6.055 6.055 0 0 0 3.996-2.907 5.988 5.988 0 0 0-.242-6.565zm-9.864 11.68a4.475 4.475 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM5.72 18.795a4.47 4.47 0 0 1-.534-3.013l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-4.02-.155zM4.25 8.995a4.495 4.495 0 0 1 2.365-1.972V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 4.25 8.995zm16.597 3.855l-5.833-3.387L17.035 7.3a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.104v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681l-.004 6.748z" />
    </svg>
  );
}

function GridTunnel() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#030303]">
      {/* Center glow */}
      <div className="absolute left-1/2 top-[42%] h-[min(80vw,520px)] w-[min(80vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl" />

      {/* Floor grid */}
      <div
        className="absolute left-1/2 top-[48%] h-[160%] w-[220%] -translate-x-1/2 origin-top opacity-[0.55]"
        style={{
          transform: "translateX(-50%) perspective(520px) rotateX(68deg)",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />
      {/* Ceiling grid */}
      <div
        className="absolute left-1/2 bottom-[52%] h-[120%] w-[220%] -translate-x-1/2 origin-bottom opacity-[0.22]"
        style={{
          transform: "translateX(-50%) perspective(520px) rotateX(-68deg)",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.28) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.28) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />
      {/* Side vignette + depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000_72%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
    </div>
  );
}

/** Full-bleed MCP hero — GPT-6 ASTRA tunnel (matches higgsfield home) */
export function McpSection() {
  return (
    <section
      id="mcp-astra"
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden border-y border-[#222] bg-black"
    >
      <GridTunnel />
      <div className="relative z-[1] flex min-h-[min(72vh,620px)] flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[560px] sm:py-20">
        <p className="text-base text-[#a3a3a3] md:text-lg">
          Higgsfield MCP with
        </p>

        <h2 className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:gap-x-4">
          <span className="bg-gradient-to-b from-white via-[#e8e8e8] to-[#9ca3af] bg-clip-text text-4xl font-black uppercase tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            GPT-6
          </span>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 sm:h-14 sm:w-14 md:h-16 md:w-16">
            <OpenAiMark className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9" />
          </span>
          <span className="bg-gradient-to-b from-white via-[#e8e8e8] to-[#9ca3af] bg-clip-text text-4xl font-black uppercase tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            ASTRA
          </span>
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#a3a3a3] md:text-base">
          Build games, motion graphics, and interactive 3D experiences with
          Higgsfield MCP
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-brand px-8 text-base font-semibold text-brand-foreground hover:bg-brand/90"
          >
            <Link href="/mcp">
              <Plug className="mr-2 h-4 w-4" />
              Install Higgsfield plugin
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="h-12 rounded-full border border-white/20 bg-transparent px-8 text-base text-white hover:bg-white/10"
          >
            <Link href="/templates">
              <Compass className="mr-2 h-4 w-4" />
              Explore use cases
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
