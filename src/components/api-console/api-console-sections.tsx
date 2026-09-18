"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiCredentialsPanel } from "@/components/create/ai-credentials-panel";
import { demoApiKeyForUser } from "@/lib/demo-api-key";
import { useAuthStore } from "@/store/auth-store";

export function ApiConsoleSections() {
  const user = useAuthStore((s) => s.user);
  const demoKey = user ? demoApiKeyForUser(user.id) : null;

  return (
    <div className="mt-12 space-y-10 border-t border-[#222] pt-10">
      <section id="quickstart" className="scroll-mt-24">
        <h2 className="text-xl font-bold">Quick start</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {user
            ? `You're signed in as ${user.email}. Copy your key below or open the playground.`
            : "Create an account once, then use your API key or the visual playground."}
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          {user ? (
            <>
              <li>
                Copy your API key in{" "}
                <a href="#keys" className="text-brand hover:underline">
                  API keys
                </a>
              </li>
              <li>
                <Link href="/docs" className="text-brand hover:underline">
                  Read the docs
                </Link>{" "}
                or{" "}
                <Link href="/create/image" className="text-brand hover:underline">
                  open playground
                </Link>
              </li>
              <li>Call your app endpoint or use Explore models above</li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signup" className="text-brand hover:underline">
                  Create an account
                </Link>{" "}
                (one time)
              </li>
              <li>
                <Link
                  href="/login?return=/api-product"
                  className="text-brand hover:underline"
                >
                  Log in
                </Link>{" "}
                — your session works across Home, Create, and API
              </li>
              <li>
                <Link href="/docs" className="text-brand hover:underline">
                  Read the docs
                </Link>{" "}
                or{" "}
                <Link href="/create/image" className="text-brand hover:underline">
                  try the playground
                </Link>
              </li>
            </>
          )}
        </ol>
      </section>

      <section id="keys" className="scroll-mt-24">
        <h2 className="text-xl font-bold">API keys</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Generation uses gemini-3.8-flash only. Keys stay in this browser.
          With no user key, the app uses the hosted Gemini key.
        </p>
        <AiCredentialsPanel className="mt-4" defaultOpen />
        {user && demoKey ? (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              Demo key for <span className="text-foreground">{user.name}</span>.
              Use server-side env keys in production — never expose secrets in
              client apps.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <code className="flex-1 overflow-x-auto rounded-xl border border-[#2a2a2a] bg-[#141414] px-4 py-3 text-xs text-brand">
                {demoKey}
              </code>
              <Button
                type="button"
                variant="secondary"
                onClick={() => void navigator.clipboard.writeText(demoKey)}
              >
                Copy key
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Playground:{" "}
              <Link href="/create/image" className="text-brand hover:underline">
                Image
              </Link>
              {" · "}
              <Link href="/create/video" className="text-brand hover:underline">
                Video
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in once to generate a local demo key. No second login needed
              after you use the same browser.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/login?return=/api-product">Log in</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </>
        )}
      </section>

      <section id="analytics" className="scroll-mt-24">
        <h2 className="text-xl font-bold">Analytics</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Usage charts are not wired in this demo. Your generations appear in{" "}
          <Link href="/gallery" className="text-brand hover:underline">
            Assets / Gallery
          </Link>
          .
        </p>
        <Button className="mt-4" variant="secondary" asChild>
          <Link href="/gallery">View gallery</Link>
        </Button>
      </section>
    </div>
  );
}
