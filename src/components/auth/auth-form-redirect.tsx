"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

function safeReturnPath(raw: string | null): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/create/image";
}

/** When already signed in, leave login/signup immediately. */
export function AuthFormRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAuthStore((s) => s.user);
  const authReady = useAuthStore((s) => s.authReady);

  useEffect(() => {
    if (!authReady || !user) return;
    router.replace(safeReturnPath(searchParams.get("return")));
  }, [authReady, user, router, searchParams]);

  return null;
}

export function getAuthReturnPath(searchParams: URLSearchParams): string {
  return safeReturnPath(searchParams.get("return"));
}
