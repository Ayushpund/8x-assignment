import { FirebaseError } from "firebase/app";

export function mapFirebaseAuthError(err: unknown): string {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      case "auth/invalid-email":
        return "Enter a valid email.";
      case "auth/weak-password":
        return "Password must be at least 6 characters.";
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Invalid email or password.";
      case "auth/too-many-requests":
        return "Too many attempts — wait a moment and try again.";
      case "auth/network-request-failed":
        return "Network error — check your connection.";
      default:
        return err.message || "Authentication failed.";
    }
  }
  if (err instanceof Error) return err.message;
  return "Authentication failed.";
}
