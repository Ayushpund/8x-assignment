import { PageShell } from "@/components/layout/page-shell";
import { AccountPageView } from "@/components/account/account-page-view";

export default function AccountPage() {
  return (
    <PageShell variant="marketing">
      <AccountPageView />
    </PageShell>
  );
}
