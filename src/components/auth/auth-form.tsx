"use client";



import { useState } from "react";

import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { useAuthStore } from "@/store/auth-store";
import { getAuthReturnPath } from "@/components/auth/auth-form-redirect";

import { cn } from "@/lib/utils";

const SUBMIT_WATCHDOG_MS = 20_000;



type AuthFormProps = {

  mode: "login" | "signup";

  className?: string;

  onSuccess?: () => void;

};



export function AuthForm({ mode, className, onSuccess }: AuthFormProps) {

  const router = useRouter();

  const searchParams = useSearchParams();

  const signUp = useAuthStore((s) => s.signUp);

  const logIn = useAuthStore((s) => s.logIn);

  const usingFirebase = isFirebaseConfigured();



  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);



  const submit = async (e: React.FormEvent) => {

    e.preventDefault();

    setError(null);

    setLoading(true);

    const watchdog = window.setTimeout(() => {
      setLoading(false);
      setError("Request took too long — if you are signed in, open Create from the menu.");
    }, SUBMIT_WATCHDOG_MS);

    try {
      const err =
        mode === "signup"
          ? await signUp(name, email, password)
          : await logIn(email, password);

      if (err) {
        setError(err);
        return;
      }

      onSuccess?.();
      router.replace(getAuthReturnPath(searchParams));
    } finally {
      window.clearTimeout(watchdog);
      setLoading(false);
    }

  };



  return (

    <form onSubmit={(e) => void submit(e)} className={cn("space-y-4", className)}>

      {usingFirebase ? (
        <p className="rounded-lg border border-border-subtle bg-[#0a0a0a] px-3 py-2 text-xs text-muted-foreground">
          Secure signup with Firebase Auth. Profile saved to Firestore{" "}
          <span className="text-foreground">users</span>.
        </p>
      ) : (
        <p className="rounded-lg border border-brand/30 bg-brand/5 px-3 py-2 text-xs text-muted-foreground">
          Demo mode — accounts are stored locally in this browser until Firebase is
          configured.
        </p>
      )}

      {mode === "signup" && (

        <div>

          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">

            Name

          </label>

          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-input border border-border bg-surface-input px-3 py-2.5 text-sm text-foreground focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30"
            placeholder="Your name"
            autoComplete="name"
          />

        </div>

      )}

      <div>

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">

          Email

        </label>

        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-input border border-border bg-surface-input px-3 py-2.5 text-sm text-foreground focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30"
          placeholder="you@email.com"
          autoComplete="email"
        />

      </div>

      <div>

        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">

          Password

        </label>

        <input
          required
          minLength={6}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-input border border-border bg-surface-input px-3 py-2.5 text-sm text-foreground focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30"
          placeholder="••••••••"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
        />

      </div>



      {error && (

        <p role="alert" className="text-sm text-accent-pink">

          {error}

        </p>

      )}



      <Button type="submit" className="w-full" size="lg" disabled={loading}>

        {loading ? (

          <Loader2 className="h-4 w-4 animate-spin" />

        ) : mode === "signup" ? (

          "Sign up"

        ) : (

          "Log in"

        )}

      </Button>



      <p className="text-center text-xs text-muted-foreground">

        {mode === "login" ? (

          <>

            No account?{" "}

            <Link href="/signup" className="text-brand hover:underline">

              Sign up

            </Link>

          </>

        ) : (

          <>

            Already have an account?{" "}

            <Link href="/login" className="text-brand hover:underline">

              Log in

            </Link>

          </>

        )}

      </p>

    </form>

  );

}


