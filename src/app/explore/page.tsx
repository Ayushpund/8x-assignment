import { ApiConsoleShell } from "@/components/api-console/api-console-shell";
import { ExplorePage } from "@/components/api-console/explore-page";

export default function ExploreRoutePage() {
  return (
    <ApiConsoleShell>
      <ExplorePage />
    </ApiConsoleShell>
  );
}
