// app/editor/page.tsx
import EditorShell from "../../components/EditorShell/EditorShell";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function EditorPage({ searchParams }: PageProps) {
  const draftIdParam = searchParams?.draftId;
  const draftId =
    typeof draftIdParam === "string"
      ? draftIdParam
      : Array.isArray(draftIdParam)
      ? draftIdParam[0]
      : undefined;

  // Server Component: minimal logic only. Pass primitives to client component.
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <EditorShell initialDraftId={draftId} />
    </main>
  );
}
