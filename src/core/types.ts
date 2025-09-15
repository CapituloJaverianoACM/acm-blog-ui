
export type EditorState = {
  id: string;                // draftId, local-<uuid>
  title: string;
  slug: string;
  excerpt: string;
  content: string;           // Markdown raw text
  published: boolean;
  latitude?: number;         // optional
  longitude?: number;        // optional
  lastSavedAt?: Date;        // timestamp of last save
};

/** Result type for saving drafts */
export type SaveResult =
  | { ok: true; id: string; savedAt: Date }
  | { ok: false; error: string };
