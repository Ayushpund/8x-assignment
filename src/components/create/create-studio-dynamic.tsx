"use client";

import dynamic from "next/dynamic";
import type { StudioMode } from "@/lib/studio-config";
import { CreateStudioSkeleton } from "@/components/create/create-studio-skeleton";

const CreateStudio = dynamic(
  () =>
    import("@/components/create/create-studio").then((mod) => mod.CreateStudio),
  {
    ssr: false,
    loading: () => <CreateStudioSkeleton />,
  }
);

export function CreateStudioDynamic({ mode }: { mode: StudioMode }) {
  return <CreateStudio mode={mode} />;
}
