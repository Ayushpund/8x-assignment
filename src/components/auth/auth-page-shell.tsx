"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { HiggsfieldLogo } from "@/components/brand/higgsfield-logo";
import { cn } from "@/lib/utils";

const signupPerks = [
  "Get unlimited Nano Banana Pro",
  "Unlock your extra discount",
  "Access to Seedance 2.5",
];

type Props = {
  mode: "login" | "signup";
  children: ReactNode;
};

export function AuthPageShell({ mode, children }: Props) {
  const isSignup = mode === "signup";

  return (
    <div className="mx-auto grid w-full max-w-[960px] gap-8 px-4 py-10 md:grid-cols-2 md:py-16 lg:gap-12">
      <div className="flex flex-col justify-center">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-white"
          aria-label="Back to home"
        >
          <HiggsfieldLogo className="h-9 w-9" />
          <span className="text-sm font-semibold text-muted-foreground">8x Studio</span>
        </Link>

        {isSignup ? (
          <>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Sign up and get your{" "}
              <span className="text-brand">extra discount</span>
            </h1>
            <p className="mt-3 text-muted-foreground">
              Create Studio, gallery sync, and hosted image generation — same flow as{" "}
              <span className="text-foreground">higgsfield.ai</span> style signup.
            </p>
            <ul className="mt-8 space-y-3">
              {signupPerks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {perk}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Welcome back</h1>
            <p className="mt-3 text-muted-foreground">
              Log in to save generations, sync your gallery, and use your own API keys in
              Create.
            </p>
          </>
        )}
      </div>

      <div
        className={cn(
          "rounded-[20px] border border-[#2a2a2a] bg-[#141414] p-6 shadow-xl md:p-8",
          "ring-1 ring-white/5"
        )}
      >
        <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
          {isSignup ? "Create your account" : "Log in to your account"}
        </p>
        {children}
      </div>
    </div>
  );
}
