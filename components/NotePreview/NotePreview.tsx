"use client";

import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  note: Note;
  onClose: () => void;
}

export default function NotePreview({ note, onClose }: NotePreviewProps) {
  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h2 className={css.title}>{note.title}</h2>

        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <p className={css.content}>{note.content}</p>
      <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
    </div>
  );
}
