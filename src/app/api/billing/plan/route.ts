import { NextResponse } from "next/server";

import { verifyGenerationAuth } from "@/lib/auth/verify-generation-auth";
import { getUserSubscription } from "@/lib/subscription-server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = await verifyGenerationAuth(request);
  if (!auth.ok) {
    return NextResponse.json({ plan: "free" as const }, { status: 401 });
  }

  const sub = getUserSubscription(auth.user.userId);
  return NextResponse.json({
    plan: sub.plan,
    proSince: sub.proSince || null,
    lastOrderId: sub.lastOrderId ?? null,
  });
}
