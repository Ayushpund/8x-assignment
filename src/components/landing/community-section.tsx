import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RemoteImg } from "@/components/ui/remote-img";
import { COMMUNITY_PROJECTS } from "@/lib/navigation";

export function CommunitySection() {
  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Explore the inside of every project
          </h2>
          <p className="mt-1 text-muted-foreground">
            See all prompts, assets, and how each project was created
          </p>
        </div>
        <Button
          variant="secondary"
          className="rounded-full border border-brand/30 bg-transparent text-brand hover:bg-brand/10"
          asChild
        >
          <Link href="/gallery">Explore community ↗</Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 lg:grid-cols-8">
        {COMMUNITY_PROJECTS.map((project) => (
          <Link
            key={project.title}
            href="/gallery"
            className="group overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <div className="relative aspect-[3/4]">
              <RemoteImg
                src={project.image}
                alt={project.title}
                fill
                className="transition group-hover:scale-105"
              />
            </div>
            <div className="p-2.5">
              <p className="line-clamp-2 text-xs font-medium">{project.title}</p>
              <p className="text-[10px] text-muted-foreground">{project.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
