const SANDBOX = "https://sandbox.cashfree.com/pg";
const PROD = "https://api.cashfree.com/pg";

export function cashfreeConfig() {
  const appId = process.env.CASHFREE_APP_ID?.trim();
  const secret = process.env.CASHFREE_SECRET_KEY?.trim();
  const env = process.env.CASHFREE_ENV?.trim() ?? "sandbox";
  if (!appId || !secret) return null;
  return {
    appId,
    secret,
    baseUrl: env === "production" ? PROD : SANDBOX,
  };
}

export async function createCashfreeOrder(options: {
  orderId: string;
  amountInr: number;
  customerId: string;
  customerEmail: string;
  customerPhone?: string;
  returnUrl: string;
}): Promise<
  | { ok: true; paymentSessionId: string; orderId: string }
  | { ok: false; error: string }
> {
  const cfg = cashfreeConfig();
  if (!cfg) {
    return {
      ok: false,
      error: "Cashfree is not configured. Add CASHFREE_APP_ID and CASHFREE_SECRET_KEY to .env.local",
    };
  }

  const res = await fetch(`${cfg.baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": cfg.appId,
      "x-client-secret": cfg.secret,
      "x-api-version": "2023-08-01",
    },
    body: JSON.stringify({
      order_id: options.orderId,
      order_amount: options.amountInr,
      order_currency: "INR",
      customer_details: {
        customer_id: options.customerId,
        customer_email: options.customerEmail,
        customer_phone: options.customerPhone ?? "9999999999",
      },
      order_meta: {
        return_url: options.returnUrl,
      },
    }),
  });

  const data = (await res.json()) as {
    payment_session_id?: string;
    message?: string;
  };

  if (!res.ok || !data.payment_session_id) {
    return {
      ok: false,
      error: data.message ?? `Cashfree order failed (${res.status})`,
    };
  }

  return {
    ok: true,
    paymentSessionId: data.payment_session_id,
    orderId: options.orderId,
  };
}
