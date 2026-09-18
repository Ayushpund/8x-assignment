import { LegalPage } from "@/components/legal/legal-page";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy">
      <p>
        Auth and gallery data are stored in your browser (localStorage) only in
        this prototype. Prompts are sent to your server route{" "}
        <code className="text-foreground">/api/generate</code> and then to Google
        when a Gemini key is configured.
      </p>
      <p>
        We do not operate a central user database in this demo. Clear site data
        in your browser to remove saved gallery items and login session.
      </p>
    </LegalPage>
  );
}
