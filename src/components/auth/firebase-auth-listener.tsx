"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import {
  authUserFromFirebase,
  hydrateUserProfileFromFirestore,
} from "@/lib/firebase/users";
import { normalizeAuthUser } from "@/lib/auth-user-normalize";
import { useAuthStore } from "@/store/auth-store";

export function FirebaseAuthListener() {
  const setUser = useAuthStore((s) => s.setUser);
  const setAuthReady = useAuthStore((s) => s.setAuthReady);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setAuthReady(true);
      return;
    }

    const auth = getFirebaseAuth();
    if (!auth) {
      setAuthReady(true);
      return;
    }

    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setAuthReady(true);
        return;
      }

      setUser(normalizeAuthUser(authUserFromFirebase(firebaseUser, null)));
      setAuthReady(true);

      void hydrateUserProfileFromFirestore(firebaseUser)
        .then((u) => setUser(normalizeAuthUser(u)))
        .catch(() => {
          /* keep auth-derived user */
        });
    });

    return () => unsub();
  }, [setAuthReady, setUser]);

  return null;
}
