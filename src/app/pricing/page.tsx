import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { CashfreeCheckout } from "@/components/billing/cashfree-checkout";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    badge: null,
    features: ["20 generations / day (demo)", "Gallery on device", "Templates"],
  },
  {
    name: "Pro",
    price: "$29",
    badge: "54% OFF",
    features: [
      "Unlimited Nano Banana Pro",
      "Seedance 2.5 access",
      "Priority queue",
      "Commercial license",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    badge: null,
    features: ["API & MCP", "SSO", "Dedicated support", "Custom models"],
  },
];

export default function PricingPage() {
  return (
    <PageShell variant="marketing">
      <div className="mx-auto max-w-[1200px] px-4 py-16 lg:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Pricing</h1>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Choose the plan that fits your image, video, and audio workflow. Sign
            up to unlock unlimited generations and priority rendering.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[20px] border p-6 ${
                plan.highlighted
                  ? "border-brand bg-brand/5 shadow-card-hover"
                  : "border-border bg-surface"
              }`}
            >
              {plan.badge && (
                <span className="rounded bg-accent-pink px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  {plan.badge}
                </span>
              )}
              <h2 className="mt-3 text-xl font-semibold">{plan.name}</h2>
              <p className="mt-2 text-3xl font-bold">{plan.price}</p>
              <ul className="mt-6 space-y-2">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="h-4 w-4 shrink-0 text-brand" />
                    {f}
                  </li>
                ))}
              </ul>
              {plan.highlighted ? (
                <div className="mt-8">
                  <Button className="w-full" variant="secondary" asChild>
                    <Link href="/signup">Sign up first</Link>
                  </Button>
                  <CashfreeCheckout amountInr={2499} />
                </div>
              ) : (
                <Button
                  className="mt-8 w-full"
                  variant="secondary"
                  asChild
                >
                  <Link
                    href={
                      plan.name === "Enterprise"
                        ? "/enterprise"
                        : plan.name === "Free"
                          ? "/signup"
                          : "/billing"
                    }
                  >
                    {plan.name === "Enterprise"
                      ? "Contact sales"
                      : plan.name === "Free"
                        ? "Get started"
                        : "Billing"}
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
