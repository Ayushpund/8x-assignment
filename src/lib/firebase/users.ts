"use client";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { getFirestoreDb } from "@/lib/firebase/client";
import {
  FirestoreTimeoutError,
  withFirestoreTimeout,
} from "@/lib/firebase/firestore-timeout";
import { isFirestoreOfflineError, mapFirestoreError } from "@/lib/firebase/firestore-errors";
import { ensureFirestoreOnline, withFirestoreRetry } from "@/lib/firebase/firestore-db";
import type { AuthUser } from "@/store/auth-store";

const USERS_COLLECTION = "users";
const PROFILE_READ_MS = 8_000;

/** Create profile on signup — no read-before-write (avoids offline getDoc failures). */
export async function createUserProfile(
  firebaseUser: User,
  name: string
): Promise<void> {
  const db = getFirestoreDb();
  if (!db) return;

  const ref = doc(db, USERS_COLLECTION, firebaseUser.uid);
  await withFirestoreRetry(
    db,
    () =>
      setDoc(ref, {
        name: name.trim(),
        email: firebaseUser.email?.toLowerCase() ?? "",
        plan: "free",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }),
    "Save profile"
  );
}

export async function upsertUserProfile(
  firebaseUser: User,
  name: string
): Promise<void> {
  const db = getFirestoreDb();
  if (!db) return;

  const ref = doc(db, USERS_COLLECTION, firebaseUser.uid);
  await withFirestoreRetry(
    db,
    () =>
      setDoc(
        ref,
        {
          name: name.trim(),
          email: firebaseUser.email?.toLowerCase() ?? "",
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      ),
    "Update profile"
  );
}

export async function fetchUserProfile(uid: string): Promise<AuthUser | null> {
  const db = getFirestoreDb();
  if (!db) return null;

  const ref = doc(db, USERS_COLLECTION, uid);

  try {
    await ensureFirestoreOnline(db);
    const snap = await withFirestoreTimeout(
      getDoc(ref),
      "Load profile",
      PROFILE_READ_MS
    );

    if (!snap.exists()) return null;

    const data = snap.data() as {
      name?: string;
      email?: string;
      plan?: string;
      proSince?: string;
    };
    return {
      id: uid,
      name: data.name?.trim() || "Creator",
      email: data.email?.trim() || "",
      plan: data.plan === "pro" ? "pro" : "free",
      proSince: data.proSince ?? null,
    };
  } catch (err) {
    if (
      isFirestoreOfflineError(err) ||
      err instanceof FirestoreTimeoutError
    ) {
      return null;
    }
    throw err;
  }
}

/** Refresh Firestore profile after auth — never blocks login UI. */
export async function hydrateUserProfileFromFirestore(
  firebaseUser: User
): Promise<AuthUser> {
  let profile = await fetchUserProfile(firebaseUser.uid);
  if (!profile && firebaseUser.displayName) {
    try {
      await upsertUserProfile(firebaseUser, firebaseUser.displayName);
      profile = await fetchUserProfile(firebaseUser.uid);
    } catch {
      /* use auth fields */
    }
  }
  return authUserFromFirebase(firebaseUser, profile);
}

export function authUserFromFirebase(
  firebaseUser: User,
  profile: AuthUser | null
): AuthUser {
  return {
    id: firebaseUser.uid,
    email:
      profile?.email ||
      firebaseUser.email?.toLowerCase() ||
      "",
    name:
      profile?.name ||
      firebaseUser.displayName?.trim() ||
      firebaseUser.email?.split("@")[0] ||
      "Creator",
    plan: profile?.plan === "pro" ? "pro" : "free",
    proSince: profile?.proSince ?? null,
  };
}

export async function setFirestoreProPlan(
  uid: string,
  orderId?: string
): Promise<void> {
  const db = getFirestoreDb();
  if (!db) return;
  const ref = doc(db, USERS_COLLECTION, uid);
  await withFirestoreRetry(
    db,
    () =>
      setDoc(
        ref,
        {
          plan: "pro",
          proSince: new Date().toISOString(),
          lastOrderId: orderId ?? null,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      ),
    "Upgrade to Pro"
  );
}

export { mapFirestoreError };
