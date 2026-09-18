import Link from "next/link";
import { RemoteImg } from "@/components/ui/remote-img";
import { SHOWCASE_IMAGES } from "@/lib/showcase-images";

export function GptImageSection() {
  const items = SHOWCASE_IMAGES;

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-black uppercase tracking-tight text-brand md:text-[2rem]">
          GPT Image 2
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground md:text-base">
          4K images with near-perfect text rendering.
        </p>
      </div>
      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin sm:gap-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href === "/create" ? "/create/image" : item.href}
            className="group w-[168px] shrink-0 sm:w-[200px] md:w-[220px]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#0a0a0a]">
              <RemoteImg
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
