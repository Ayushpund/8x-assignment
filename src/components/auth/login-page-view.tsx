"use client";

import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthFormRedirect } from "@/components/auth/auth-form-redirect";
import { AuthPageShell } from "@/components/auth/auth-page-shell";

function LoginFormInner() {
  return <AuthForm mode="login" />;
}

export function LoginPageView() {
  return (
    <AuthPageShell mode="login">
      <Suspense
        fallback={
          <div className="space-y-4 animate-pulse">
            <div className="h-10 rounded-input bg-surface-input" />
            <div className="h-10 rounded-input bg-surface-input" />
            <div className="h-11 rounded-pill bg-brand/20" />
          </div>
        }
      >
        <AuthFormRedirect />
        <LoginFormInner />
      </Suspense>
    </AuthPageShell>
  );
}
