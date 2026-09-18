import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

export type SubscriptionPlan = "free" | "pro";

export type UserSubscription = {
  plan: SubscriptionPlan;
  proSince: string;
  lastOrderId?: string;
};

const dataDir = path.join(process.cwd(), ".data");
const subsFile = path.join(dataDir, "subscriptions.json");

type Store = Record<string, UserSubscription>;

function readStore(): Store {
  if (!existsSync(subsFile)) return {};
  try {
    return JSON.parse(readFileSync(subsFile, "utf8")) as Store;
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(subsFile, JSON.stringify(store, null, 2), "utf8");
}

export function getUserSubscription(userId: string): UserSubscription {
  const store = readStore();
  return (
    store[userId] ?? {
      plan: "free",
      proSince: "",
    }
  );
}

export function activateProSubscription(
  userId: string,
  orderId?: string
): { subscription: UserSubscription; isNew: boolean } {
  const store = readStore();
  const existing = store[userId];
  if (existing?.plan === "pro") {
    return { subscription: existing, isNew: false };
  }
  const next: UserSubscription = {
    plan: "pro",
    proSince: new Date().toISOString(),
    lastOrderId: orderId,
  };
  store[userId] = next;
  writeStore(store);
  return { subscription: next, isNew: true };
}
