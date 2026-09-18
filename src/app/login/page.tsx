import { PageShell } from "@/components/layout/page-shell";
import { LoginPageView } from "@/components/auth/login-page-view";

export default function LoginPage() {
  return (
    <PageShell variant="marketing" header="full">
      <LoginPageView />
    </PageShell>
  );
}
