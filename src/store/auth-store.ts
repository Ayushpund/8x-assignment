"use client";

import { create } from "zustand";
import { persistLocalStudioToken } from "@/lib/auth/client-auth-token";
import { localLogOut } from "@/lib/auth/local-auth";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import {
  firebaseLogIn,
  firebaseLogOut,
  firebaseSignUp,
} from "@/lib/firebase/auth-service";
import { normalizeAuthUser } from "@/lib/auth-user-normalize";

export type UserPlan = "free" | "pro";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  plan: UserPlan;
  proSince?: string | null;
};

type AuthState = {
  user: AuthUser | null;
  authReady: boolean;
  setUser: (user: AuthUser | null) => void;
  patchUser: (patch: Partial<AuthUser>) => void;
  setAuthReady: (ready: boolean) => void;
  signUp: (name: string, email: string, password: string) => Promise<string | null>;
  logIn: (email: string, password: string) => Promise<string | null>;
  logOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  authReady: false,

  setUser: (user) => set({ user }),
  patchUser: (patch) =>
    set((s) => (s.user ? { user: { ...s.user, ...patch } } : {})),
  setAuthReady: (authReady) => set({ authReady }),

  signUp: async (name, email, password) => {
    if (isFirebaseConfigured()) {
      const result = await firebaseSignUp(name, email, password);
      if ("error" in result) return result.error;
      set({ user: normalizeAuthUser(result.user) });
      return null;
    }

    const res = await fetch("/api/auth/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "signup", name, email, password }),
    });
    const data = (await res.json()) as {
      user?: AuthUser;
      token?: string;
      error?: string;
    };
    if (!res.ok || !data.user || !data.token) {
      return data.error ?? "Sign up failed.";
    }
    persistLocalStudioToken(data.token);
    set({ user: normalizeAuthUser(data.user) });
    return null;
  },

  logIn: async (email, password) => {
    if (isFirebaseConfigured()) {
      const result = await firebaseLogIn(email, password);
      if ("error" in result) return result.error;
      set({ user: normalizeAuthUser(result.user) });
      return null;
    }

    const res = await fetch("/api/auth/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", email, password }),
    });
    const data = (await res.json()) as {
      user?: AuthUser;
      token?: string;
      error?: string;
    };
    if (!res.ok || !data.user || !data.token) {
      return data.error ?? "Log in failed.";
    }
    persistLocalStudioToken(data.token);
    set({ user: normalizeAuthUser(data.user) });
    return null;
  },

  logOut: async () => {
    if (isFirebaseConfigured()) {
      await firebaseLogOut();
    } else {
      localLogOut();
      persistLocalStudioToken(null);
    }
    set({ user: null });
  },
}));
