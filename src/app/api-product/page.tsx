import { ApiConsoleShell } from "@/components/api-console/api-console-shell";
import { ExplorePage } from "@/components/api-console/explore-page";

export default function ApiProductPage() {
  return (
    <ApiConsoleShell>
      <ExplorePage />
    </ApiConsoleShell>
  );
}
