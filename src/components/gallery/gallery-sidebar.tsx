"use client";



import Link from "next/link";

import {

  Box,

  Film,

  Heart,

  ImageIcon,

  Music,

  Plus,

  Search,

} from "lucide-react";

import { useAuthStore } from "@/store/auth-store";

import { useGalleryStore } from "@/store/gallery-store";

import { cn } from "@/lib/utils";



type GallerySidebarProps = {

  active: "all" | "favorites";

};



export function GallerySidebar({ active }: GallerySidebarProps) {

  const user = useAuthStore((s) => s.user);

  const count = useGalleryStore((s) => s.items.length);
  const favoriteCount = useGalleryStore((s) => s.favoriteIds.length);

  const searchQuery = useGalleryStore((s) => s.searchQuery);

  const setSearchQuery = useGalleryStore((s) => s.setSearchQuery);



  return (

    <aside className="w-full shrink-0 border-b border-border-subtle lg:w-sidebar lg:border-b-0 lg:border-r">

      <div className="sticky top-[7rem] space-y-6 p-4 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:p-5">

        <div className="relative">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input

            value={searchQuery}

            onChange={(e) => setSearchQuery(e.target.value)}

            placeholder="Search prompts"

            className="w-full rounded-input border border-border bg-surface-input py-2.5 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-brand/40 focus:outline-none"

          />

        </div>



        <nav className="space-y-1">

          <SidebarItem

            href="/gallery"

            icon={<Box className="h-4 w-4" />}

            label="All assets"

            count={count}

            active={active === "all"}

          />

          <SidebarItem

            href="/gallery?tab=favorites"

            icon={<Heart className="h-4 w-4" />}

            label="Favorites"

            count={favoriteCount}

            active={active === "favorites"}

          />

        </nav>



        <div>

          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">

            Tools

          </p>

          <SidebarItem

            href="/create/image"

            icon={<ImageIcon className="h-4 w-4" />}

            label="Image"

            count={count}

          />

          <SidebarItem

            href="/video"

            icon={<Film className="h-4 w-4" />}

            label="Video"

          />

          <SidebarItem

            href="/audio"

            icon={<Music className="h-4 w-4" />}

            label="Audio"

          />

        </div>



        <div>

          <div className="mb-2 flex items-center justify-between px-2">

            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">

              {user?.name ?? "Guest"}

            </p>

            <Link

              href="/create/image"

              className="rounded p-1 hover:bg-surface-hover"

              aria-label="New generation"

            >

              <Plus className="h-4 w-4" />

            </Link>

          </div>

          <p className="px-2 text-xs text-muted-foreground">Folders (demo)</p>

        </div>

      </div>

    </aside>

  );

}



function SidebarItem({

  href,

  icon,

  label,

  count,

  active,

}: {

  href: string;

  icon: React.ReactNode;

  label: string;

  count?: number;

  active?: boolean;

}) {

  return (

    <Link

      href={href}

      className={cn(

        "flex items-center justify-between rounded-lg px-2 py-2 text-sm transition",

        active

          ? "bg-surface-input font-medium text-foreground"

          : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"

      )}

    >

      <span className="flex items-center gap-2">

        {icon}

        {label}

      </span>

      {count !== undefined && (

        <span className="text-xs text-muted-foreground">{count}</span>

      )}

    </Link>

  );

}

