import { randomUUID } from "crypto";
import EditorShell from "@/components/EditorShell/EditorShell";

export default function EditorPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const draftIdParam = searchParams?.draftId;
  const draftId =
    typeof draftIdParam === "string"
      ? draftIdParam
      : Array.isArray(draftIdParam)
      ? draftIdParam[0]
      : undefined;

  const id = draftId ?? `local-${randomUUID()}`;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <EditorShell initialDraftId={id} />
    </main>
  );
}
