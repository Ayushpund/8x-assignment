import { Suspense } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { GalleryView } from "@/components/gallery/gallery-view";

export default function GalleryPage() {
  return (
    <PageShell variant="app">
      <Suspense fallback={null}>
        <GalleryView />
      </Suspense>
    </PageShell>
  );
}
