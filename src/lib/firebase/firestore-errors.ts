import { FirebaseError } from "firebase/app";
import { FirestoreTimeoutError } from "@/lib/firebase/firestore-timeout";

export function isFirestoreOfflineError(err: unknown): boolean {
  if (!(err instanceof FirebaseError)) {
    const msg =
      err instanceof Error ? err.message.toLowerCase() : String(err).toLowerCase();
    return msg.includes("offline") || msg.includes("client is offline");
  }
  return (
    err.code === "unavailable" ||
    err.code === "failed-precondition" ||
    err.message.toLowerCase().includes("offline")
  );
}

export function mapFirestoreError(err: unknown): string {
  if (err instanceof FirestoreTimeoutError) {
    return err.message;
  }
  if (err instanceof FirebaseError) {
    if (err.code === "permission-denied") {
      return "Firestore denied access — deploy firestore.rules (npm run firebase:rules) and sign in again.";
    }
    if (isFirestoreOfflineError(err)) {
      return "Could not reach Firestore. In Firebase Console create a Firestore database, deploy rules, then retry signup.";
    }
  }
  if (err instanceof Error && err.message) return err.message;
  return "Could not save profile to Firestore.";
}
