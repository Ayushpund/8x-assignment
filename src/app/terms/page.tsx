import { LegalPage } from "@/components/legal/legal-page";

export default function TermsPage() {
  return (
    <LegalPage title="Terms of service">
      <p>
        8x Studio is a student / prototype clone for learning and demos. Do not
        use it for production workloads without your own legal review.
      </p>
      <p>
        Generated content is your responsibility. Third-party model providers
        (Google Gemini, etc.) apply their own terms when you use live API keys.
      </p>
    </LegalPage>
  );
}
