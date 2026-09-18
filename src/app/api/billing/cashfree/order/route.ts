import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

import { createCashfreeOrder } from "@/lib/cashfree";
import { verifyGenerationAuth } from "@/lib/auth/verify-generation-auth";

export const runtime = "nodejs";

type Body = {
  plan?: string;
  amountInr?: number;
};

export async function POST(request: Request) {
  const auth = await verifyGenerationAuth(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    /* defaults */
  }

  const amount = body.amountInr ?? 2499;
  const origin = new URL(request.url).origin;
  const orderId = `pro_${randomUUID().replace(/-/g, "").slice(0, 24)}`;

  const result = await createCashfreeOrder({
    orderId,
    amountInr: amount,
    customerId: auth.user.userId,
    customerEmail: auth.user.email || "demo@8xstudio.local",
    returnUrl: `${origin}/billing?order_id={order_id}&status=success`,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({
    orderId: result.orderId,
    paymentSessionId: result.paymentSessionId,
    mode: process.env.CASHFREE_ENV === "production" ? "production" : "sandbox",
  });
}
