import { PageShell } from "@/components/layout/page-shell";
import { SignupPageView } from "@/components/auth/signup-page-view";

export default function SignupPage() {
  return (
    <PageShell variant="marketing" header="full">
      <SignupPageView />
    </PageShell>
  );
}
