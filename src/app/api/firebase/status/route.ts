import { NextResponse } from "next/server";
import { getFirebasePublicConfig } from "@/lib/firebase/config";

export const runtime = "nodejs";

export async function GET() {
  const config = getFirebasePublicConfig();
  if (!config) {
    return NextResponse.json({
      ok: false,
      configured: false,
      message:
        "Firebase env vars missing. Add NEXT_PUBLIC_FIREBASE_* to .env.local and restart dev.",
    });
  }

  return NextResponse.json({
    ok: true,
    configured: true,
    projectId: config.projectId,
    authDomain: config.authDomain,
    message:
      "Firebase client config loaded. Firestore runs in the cloud — enable Auth + Firestore in Firebase Console, deploy firestore.rules, then sign up in the app.",
    rulesFile: "firestore.rules",
    deployCommand: "firebase deploy --only firestore:rules",
  });
}
