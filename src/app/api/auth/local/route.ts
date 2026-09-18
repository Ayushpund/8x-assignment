import { NextResponse } from "next/server";

import { createStudioSessionToken } from "@/lib/auth/studio-session-token";
import {
  localLogInServer,
  localSignUpServer,
} from "@/lib/auth/local-users-server";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { getUserSubscription } from "@/lib/subscription-server";
import type { AuthUser } from "@/store/auth-store";

function userWithPlan(user: {
  id: string;
  email: string;
  name: string;
}): AuthUser {
  const sub = getUserSubscription(user.id);
  return {
    ...user,
    plan: sub.plan === "pro" ? "pro" : "free",
    proSince: sub.proSince || null,
  };
}

export const runtime = "nodejs";

type Body = {
  action?: "signup" | "login";
  name?: string;
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  if (isFirebaseConfigured()) {
    return NextResponse.json(
      { error: "Use Firebase auth for this project." },
      { status: 400 }
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const action = body.action;
  const email = body.email ?? "";
  const password = body.password ?? "";

  if (action === "signup") {
    const result = localSignUpServer(body.name ?? "", email, password);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    const user = userWithPlan(result.user);
    const token = createStudioSessionToken(user);
    return NextResponse.json({ user, token });
  }

  if (action === "login") {
    const result = localLogInServer(email, password);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }
    const user = userWithPlan(result.user);
    const token = createStudioSessionToken(user);
    return NextResponse.json({ user, token });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
