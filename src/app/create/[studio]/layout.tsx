import { Suspense } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { CreateTemplateHydrator } from "@/components/create/create-template-hydrator";
import { StudioTabs } from "@/components/create/studio-tabs";

export default function CreateStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageShell variant="app">
      <Suspense
        fallback={<div className="h-11 border-b border-border-subtle bg-[#0a0a0a]" />}
      >
        <StudioTabs />
        <CreateTemplateHydrator />
      </Suspense>
      {children}
    </PageShell>
  );
}
