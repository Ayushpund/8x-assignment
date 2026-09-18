import { redirect } from "next/navigation";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

function pickParam(
  value: string | string[] | undefined
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default function CreatePage({ searchParams }: Props) {
  const mode = pickParam(searchParams.mode);
  const template = pickParam(searchParams.template);
  const model = pickParam(searchParams.model);

  const q = new URLSearchParams();
  if (template) q.set("template", template);
  if (model) q.set("model", model);
  const suffix = q.toString() ? `?${q.toString()}` : "";

  if (mode === "video") redirect(`/create/video${suffix}`);
  if (mode === "audio") redirect(`/create/audio${suffix}`);
  redirect(`/create/image${suffix}`);
}
