"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { EditorState } from "../../app/core/types";
import { generateSlug } from "../../app/core/utils/slug";
import { parseMarkdownFile } from "../../app/core/utils/parseMarkdownFile";
import { useAutosave } from "../../app/core/autosave/useAutosave";
import MarkdownRenderer from "../../app/core/markdown/MarkdownRenderer";
import {
  validateContent,
  validateCoordinates,
  validateExcerpt,
  validateSlug,
  validateTitle,
} from "../../app/core/validators";

type EditorShellProps = {
  initialDraftId?: string;
};

function parseNumberOrUndefined(v: string): number | undefined {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export default function EditorShell({ initialDraftId }: EditorShellProps) {
  // --- local state (source of truth) ---
  const [state, setState] = useState<EditorState>({
    id: initialDraftId ?? `local-${crypto.randomUUID()}`,
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    published: false,
    latitude: undefined,
    longitude: undefined,
    lastSavedAt: undefined,
  });

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Autosave hook (persists to localStorage)
  const { lastSavedAt, isSaving, error, saveNow, loadFromStorage } = useAutosave(
    state,
    (patch) => setState((prev) => ({ ...prev, ...patch }))
  );

  // On mount and when initialDraftId changes, attempt to load from storage
  useEffect(() => {
    const id = initialDraftId ?? state.id;
    loadFromStorage(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDraftId]);

  const pageTitle = useMemo(
    () => (initialDraftId ? "Editing draft" : "New draft"),
    [initialDraftId]
  );

  function onUploadMdClick() {
  fileInputRef.current?.click();
}

function onFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (!file) return;

  if (state.content.trim().length > 0) {
    const proceed = window.confirm(
      "Uploading a new file will replace your current content. Continue?"
    );
    if (!proceed) return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const text = reader.result as string;
    const parsed = parseMarkdownFile(text);

    setState((prev) => ({
      ...prev,
      content: parsed.content,
      title: parsed.title ?? prev.title,
      excerpt: parsed.excerpt ?? prev.excerpt,
      published: parsed.published ?? prev.published,
    }));
  };
  reader.readAsText(file);
}

   // Keyboard shortcuts: Ctrl/Cmd+S (save), Ctrl/Cmd+P (toggle published)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isMeta = e.ctrlKey || e.metaKey;
      if (!isMeta) return;

      if (e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveNow();
      }
      if (e.key.toLowerCase() === "p") {
        e.preventDefault();
        setState((prev) => ({ ...prev, published: !prev.published }));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [saveNow]);

  // --- handlers ---
  function onTitleChange(value: string) {
    setState((prev) => {
      const nextSlug = slugManuallyEdited ? prev.slug : generateSlug(value);
      return { ...prev, title: value, slug: nextSlug };
    });
  }

  function onSlugChange(value: string) {
    setSlugManuallyEdited(true);
    setState((prev) => ({ ...prev, slug: value }));
  }

  function onExcerptChange(value: string) {
    setState((prev) => ({ ...prev, excerpt: value }));
  }

  function onContentChange(value: string) {
    setState((prev) => ({ ...prev, content: value }));
  }

  function onLatitudeChange(value: string) {
    const lat = parseNumberOrUndefined(value);
    setState((prev) => ({ ...prev, latitude: lat }));
  }

  function onLongitudeChange(value: string) {
    const lng = parseNumberOrUndefined(value);
    setState((prev) => ({ ...prev, longitude: lng }));
  }

  function onTogglePublished() {
    setState((prev) => ({ ...prev, published: !prev.published }));
  }

  // Toolbar buttons

  function onSaveDraft() {
    saveNow(); // immediate persistence
  }

  function onPublish() {
    // Just toggle the flag (no backend yet)
    setState((prev) => ({ ...prev, published: true }));
    saveNow();
  }

  // --- validation (pure; runs every render) ---
  const titleError = validateTitle(state.title);
  const slugError = validateSlug(state.slug);
  const excerptError = validateExcerpt(state.excerpt);
  const coordsError = validateCoordinates(state.latitude, state.longitude);
  const contentError = validateContent(state.content);

  const isValid =
    !titleError && !slugError && !excerptError && !coordsError && !contentError;

  return (
    <div className="flex flex-col gap-4">
      {/* Top bar */}
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{pageTitle}</h1>
          <p className="text-sm text-gray-500">
            draftId: {state.id} {slugManuallyEdited ? "(slug: manual)" : "(slug: auto)"} ·{" "}
            {state.published ? "Published" : "Draft"}
          </p>
          <p className="text-xs text-gray-400">
            {isSaving
              ? "Saving…"
              : lastSavedAt
              ? `Last saved at ${lastSavedAt.toLocaleTimeString()}`
              : "Not saved yet"}
            {error ? ` — Error: ${error}` : ""}
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2">
            <input
                ref={fileInputRef}
                type="file"
                accept=".md"
                onChange={onFileSelected}
                className="hidden"
            />
          <button
            type="button"
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
            onClick={onUploadMdClick}
            title="Upload a .md file"
          >
            Upload .md
          </button>
          <button
            type="button"
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50"
            onClick={onSaveDraft}
            disabled={!isValid}
            title={!isValid ? "Fix validation errors before saving" : "Save draft"}
          >
            Save draft
          </button>
          <button
            type="button"
            className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50"
            onClick={onPublish}
            disabled={!isValid}
            title={!isValid ? "Fix validation errors before publishing" : "Publish"}
          >
            Publish
          </button>
        </div>
      </header>

      {/* Fields row */}
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* Title */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className={`rounded-md border px-3 py-2 ${
              titleError ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Enter a descriptive title…"
            value={state.title}
            onChange={(e) => onTitleChange(e.target.value)}
            aria-invalid={!!titleError}
            aria-describedby="title-error"
          />
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-gray-500">Max 80 characters.</p>
            {titleError && (
              <p id="title-error" className="text-xs text-red-600">
                {titleError}
              </p>
            )}
          </div>
        </div>

        {/* Slug */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            className={`rounded-md border px-3 py-2 ${
              slugError ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="auto-generated-from-title"
            value={state.slug}
            onChange={(e) => onSlugChange(e.target.value)}
            aria-invalid={!!slugError}
            aria-describedby="slug-error"
          />
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Lowercase, alphanumeric, hyphens only (kebab-case).
            </p>
            {slugError && (
              <p id="slug-error" className="text-xs text-red-600">
                {slugError}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Excerpt + Published */}
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* Excerpt */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            className={`w-full rounded-md border px-3 py-2 ${
              excerptError ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Short summary (≤160 chars)…"
            value={state.excerpt}
            onChange={(e) => onExcerptChange(e.target.value)}
            rows={3}
            aria-invalid={!!excerptError}
            aria-describedby="excerpt-error"
          />
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {state.excerpt.length}/160 characters
            </p>
            {excerptError && (
              <p id="excerpt-error" className="text-xs text-red-600">
                {excerptError}
              </p>
            )}
          </div>
        </div>

        {/* Published toggle */}
        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium">Status</span>
          <div className="flex items-center gap-3 rounded-md border px-3 py-2">
            <button
              type="button"
              onClick={onTogglePublished}
              className={`relative h-6 w-11 rounded-full transition ${
                state.published ? "bg-green-600" : "bg-gray-300"
              }`}
              aria-pressed={state.published}
              aria-label="Toggle published"
              title="Toggle published (Ctrl/Cmd+P)"
            >
              <span
                className={`absolute left-0 top-0 m-0.5 h-5 w-5 rounded-full bg-white transition ${
                  state.published ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-sm">
              {state.published ? "Published" : "Draft"}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Press <kbd>Ctrl/Cmd+P</kbd> to toggle.
          </p>
        </div>
      </section>

      {/* Coordinates */}
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="latitude">
            Latitude
          </label>
          <input
            id="latitude"
            type="text"
            inputMode="decimal"
            className={`rounded-md border px-3 py-2 ${
              coordsError ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="e.g., 4.7110"
            value={state.latitude ?? ""}
            onChange={(e) => onLatitudeChange(e.target.value)}
            aria-invalid={!!coordsError}
            aria-describedby="coords-error"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="longitude">
            Longitude
          </label>
          <input
            id="longitude"
            type="text"
            inputMode="decimal"
            className={`rounded-md border px-3 py-2 ${
              coordsError ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="e.g., -74.0721"
            value={state.longitude ?? ""}
            onChange={(e) => onLongitudeChange(e.target.value)}
            aria-invalid={!!coordsError}
            aria-describedby="coords-error"
          />
        </div>

        {coordsError && (
          <p id="coords-error" className="text-sm text-red-600 md:col-span-2">
            {coordsError}
          </p>
        )}
      </section>

      {/* Two-pane editor */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Write */}
        <div className="flex min-h-[420px] flex-col rounded-md border">
          <div className="border-b px-3 py-2 text-sm font-medium">Write</div>
          <textarea
            className={`min-h-[380px] flex-1 resize-none bg-white p-3 outline-none ${
              contentError ? "ring-1 ring-red-400" : ""
            }`}
            placeholder="Write your Markdown here…"
            value={state.content}
            onChange={(e) => onContentChange(e.target.value)}
            aria-invalid={!!contentError}
            aria-describedby="content-error"
          />
          {contentError && (
            <p id="content-error" className="px-3 pb-2 text-xs text-red-600">
              {contentError}
            </p>
          )}
        </div>

        {/* Preview */}
        <div className="flex min-h-[420px] flex-col rounded-md border">
        <div className="border-b px-3 py-2 text-sm font-medium">Preview</div>
        <div className="p-3">
            {state.content.trim() ? (
            <MarkdownRenderer content={state.content} />
            ) : (
            <p className="text-gray-500">Start typing Markdown to see the preview.</p>
            )}
        </div>
        </div>
      </section>
    </div>
  );
}