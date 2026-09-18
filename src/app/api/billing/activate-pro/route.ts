import { NextResponse } from "next/server";

import { verifyGenerationAuth } from "@/lib/auth/verify-generation-auth";
import { activateProSubscription } from "@/lib/subscription-server";

export const runtime = "nodejs";

type Body = { orderId?: string };

export async function POST(request: Request) {
  const auth = await verifyGenerationAuth(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  let orderId: string | undefined;
  try {
    const body = (await request.json()) as Body;
    orderId = body.orderId?.trim();
  } catch {
    /* optional */
  }

  const { subscription: sub, isNew } = activateProSubscription(
    auth.user.userId,
    orderId
  );

  return NextResponse.json({
    plan: sub.plan,
    proSince: sub.proSince,
    lastOrderId: sub.lastOrderId ?? null,
    isNewPro: isNew,
    alreadyPro: !isNew,
  });
}
