import { Suspense } from "react";
import { BillingPageView } from "@/components/billing/billing-page-view";

export default function BillingPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-16 text-center text-muted-foreground">
          Loading billing…
        </div>
      }
    >
      <BillingPageView />
    </Suspense>
  );
}
