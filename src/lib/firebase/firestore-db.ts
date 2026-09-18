"use client";

import type { FirebaseApp } from "firebase/app";
import {
  enableNetwork,
  getFirestore,
  initializeFirestore,
  type Firestore,
} from "firebase/firestore";
import { withFirestoreTimeout } from "@/lib/firebase/firestore-timeout";

let db: Firestore | null = null;
let networkReady: Promise<void> | null = null;

function longPollingEnabled(): boolean {
  const flag = process.env.NEXT_PUBLIC_FIRESTORE_LONG_POLLING?.trim();
  if (flag === "0" || flag === "false") return false;
  return true;
}

/** One Firestore instance — long polling helps on networks that block WebChannel. */
export function getOrInitFirestore(app: FirebaseApp): Firestore {
  if (db) return db;

  if (longPollingEnabled()) {
    try {
      db = initializeFirestore(app, {
        experimentalForceLongPolling: true,
      });
    } catch {
      db = getFirestore(app);
    }
  } else {
    db = getFirestore(app);
  }

  networkReady = enableNetwork(db).catch(() => undefined);
  return db;
}

export async function ensureFirestoreOnline(firestore: Firestore): Promise<void> {
  if (networkReady) await networkReady;
  try {
    await enableNetwork(firestore);
  } catch {
    /* already online */
  }
}

export async function withFirestoreRetry<T>(
  firestore: Firestore,
  action: () => Promise<T>,
  label = "Firestore"
): Promise<T> {
  await ensureFirestoreOnline(firestore);
  const run = () => withFirestoreTimeout(action(), label);
  try {
    return await run();
  } catch (err) {
    if (!isRetryableFirestoreError(err)) throw err;
    await ensureFirestoreOnline(firestore);
    await delay(350);
    return await run();
  }
}

function isRetryableFirestoreError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const msg = err.message.toLowerCase();
  return (
    msg.includes("offline") ||
    msg.includes("unavailable") ||
    msg.includes("network")
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
