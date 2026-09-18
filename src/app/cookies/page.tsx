import { LegalPage } from "@/components/legal/legal-page";

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie notice">
      <p>
        This app uses browser storage for gallery items and UI preferences.
        When Firebase is configured, sign-in uses Firebase Authentication and
        profile fields are stored in Cloud Firestore. No third-party advertising
        cookies are set by this prototype.
      </p>
    </LegalPage>
  );
}
