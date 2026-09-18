"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";

export function ApiExploreAuthNote() {
  const user = useAuthStore((s) => s.user);

  if (user) {
    return (
      <p className="mt-10 text-center text-xs text-muted-foreground">
        Signed in as{" "}
        <span className="font-medium text-foreground">{user.email}</span>.{" "}
        <Link href="/api-product#keys" className="text-brand hover:underline">
          Your API key
        </Link>
        {" · "}
        <Link href="/create/image" className="text-brand hover:underline">
          Playground
        </Link>
      </p>
    );
  }

  return (
    <p className="mt-10 text-center text-xs text-muted-foreground">
      Need an API key?{" "}
      <Link href="/login?return=/api-product" className="text-brand hover:underline">
        Log in
      </Link>{" "}
      or{" "}
      <Link href="/signup" className="text-brand hover:underline">
        sign up
      </Link>
      {" — "}
      <Link href="/pricing" className="text-brand hover:underline">
        see pricing
      </Link>
      .
    </p>
  );
}
