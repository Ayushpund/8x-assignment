"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { mapFirebaseAuthError } from "@/lib/firebase/auth-errors";
import { mapFirestoreError } from "@/lib/firebase/firestore-errors";
import {
  authUserFromFirebase,
  createUserProfile,
  hydrateUserProfileFromFirestore,
} from "@/lib/firebase/users";
import { useAuthStore } from "@/store/auth-store";
import type { AuthUser } from "@/store/auth-store";

function refreshProfileInBackground(firebaseUser: import("firebase/auth").User) {
  void hydrateUserProfileFromFirestore(firebaseUser)
    .then((user) => useAuthStore.getState().setUser(user))
    .catch(() => {
      /* keep auth-derived user */
    });
}

export async function firebaseSignUp(
  name: string,
  email: string,
  password: string
): Promise<{ user: AuthUser } | { error: string }> {
  const auth = getFirebaseAuth();
  if (!auth) {
    return { error: "Firebase is not configured on this app." };
  }

  try {
    const trimmedEmail = email.trim().toLowerCase();
    const cred = await createUserWithEmailAndPassword(
      auth,
      trimmedEmail,
      password
    );
    const displayName = name.trim();
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }

    try {
      await createUserProfile(cred.user, displayName);
    } catch (profileErr) {
      return { error: mapFirestoreError(profileErr) };
    }

    const user = authUserFromFirebase(cred.user, null);
    refreshProfileInBackground(cred.user);
    return { user };
  } catch (err) {
    return { error: mapFirebaseAuthError(err) };
  }
}

export async function firebaseLogIn(
  email: string,
  password: string
): Promise<{ user: AuthUser } | { error: string }> {
  const auth = getFirebaseAuth();
  if (!auth) {
    return { error: "Firebase is not configured on this app." };
  }

  try {
    const cred = await signInWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      password
    );

    const user = authUserFromFirebase(cred.user, null);
    refreshProfileInBackground(cred.user);
    return { user };
  } catch (err) {
    return { error: mapFirebaseAuthError(err) };
  }
}

export async function firebaseLogOut(): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) return;
  await firebaseSignOut(auth);
}
