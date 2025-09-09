// src/core/autosave/useAutosave.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { EditorState } from "../../core/types";

const DRAFT_KEY = (id: string) => `blog:editor:${id}`;

type AutosaveOptions = {
  /** ms to wait after the last change before saving */
  debounceMs?: number;
  /** which fields to persist (default: whole state) */
  picker?: (s: EditorState) => EditorState;
};

type AutosaveReturn = {
  lastSavedAt?: Date;
  isSaving: boolean;
  error?: string;
  /** force an immediate save without debounce */
  saveNow: () => void;
  /** load from storage (used on mount+draftId change) */
  loadFromStorage: (id: string) => EditorState | undefined;
};

function serialize(state: EditorState): string {
  // Dates → ISO strings
  return JSON.stringify({
    ...state,
    lastSavedAt: state.lastSavedAt ? state.lastSavedAt.toISOString() : undefined,
  });
}

function deserialize(json: string): EditorState | undefined {
  try {
    const raw = JSON.parse(json) as EditorState & { lastSavedAt?: string };
    return {
      ...raw,
      lastSavedAt: raw.lastSavedAt ? new Date(raw.lastSavedAt) : undefined,
    };
  } catch {
    return undefined;
  }
}

export function useAutosave(
  state: EditorState,
  onStatePatched: (patch: Partial<EditorState>) => void,
  options: AutosaveOptions = {}
): AutosaveReturn {
  const debounceMs = options.debounceMs ?? 1200;
  const picker = options.picker ?? ((s) => s);

  const [lastSavedAt, setLastSavedAt] = useState<Date | undefined>(state.lastSavedAt);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const timerRef = useRef<number | undefined>(undefined);
  const lastSavedSnapshotRef = useRef<string>("");

  const doSave = useCallback(() => {
    try {
      if (typeof window === "undefined") return; // SSR safeguard
      setIsSaving(true);
      setError(undefined);

      const key = DRAFT_KEY(state.id);
      const toPersist: EditorState = {
        ...picker(state),
        lastSavedAt: new Date(),
      };
      const serialized = serialize(toPersist);

      // Skip write if nothing changed (reduces churn)
      if (serialized === lastSavedSnapshotRef.current) {
        setIsSaving(false);
        return;
      }

      localStorage.setItem(key, serialized);
      lastSavedSnapshotRef.current = serialized;
      setLastSavedAt(toPersist.lastSavedAt);
      setIsSaving(false);
    } catch (e) {
      setIsSaving(false);
      setError(e instanceof Error ? e.message : "Unknown save error.");
    }
  }, [picker, state]);

  // Debounce on state changes
  useEffect(() => {
    // Clear previous timer
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(doSave, debounceMs);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [state, doSave, debounceMs]);

  const saveNow = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    doSave();
  }, [doSave]);

  const loadFromStorage = useCallback((id: string): EditorState | undefined => {
    if (typeof window === "undefined") return undefined;
    const raw = localStorage.getItem(DRAFT_KEY(id));
    const loaded = raw ? deserialize(raw) : undefined;
    if (loaded) {
      // Patch parent state with loaded fields
      onStatePatched(loaded);
      // Cache snapshot to avoid immediate redundant save
      lastSavedSnapshotRef.current = serialize(loaded);
      setLastSavedAt(loaded.lastSavedAt);
    }
    return loaded;
  }, [onStatePatched]);

  return { lastSavedAt, isSaving, error, saveNow, loadFromStorage };
}
