import { notFound } from "next/navigation";
import { CreateStudioDynamic } from "@/components/create/create-studio-dynamic";
import { parseStudioMode, type StudioMode } from "@/lib/studio-config";

export const dynamic = "force-dynamic";

type Props = {
  params: { studio: string };
};

export default function CreateStudioPage({ params }: Props) {
  const mode = parseStudioMode(params.studio);
  if (params.studio !== mode) notFound();

  return <CreateStudioDynamic mode={mode as StudioMode} />;
}
