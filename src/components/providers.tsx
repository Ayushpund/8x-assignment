"use client";

import { FirebaseAuthListener } from "@/components/auth/firebase-auth-listener";
import { SubscriptionSync } from "@/components/subscription/subscription-sync";
import { ChunkRecovery } from "@/components/chunk-recovery";
import { CssGuard } from "@/components/css-guard";
import { StyleRecovery } from "@/components/style-recovery";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={200}>
      <ChunkRecovery />
      <StyleRecovery />
      <CssGuard />
      <FirebaseAuthListener />
      <SubscriptionSync />
      {children}
    </TooltipProvider>
  );
}
