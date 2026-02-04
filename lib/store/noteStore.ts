import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CreateNotePayload } from "@/types/note";

export const initialDraft: CreateNotePayload = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteStoreState = {
  draft: CreateNotePayload;
  setDraft: (note: CreateNotePayload) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStoreState>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "notehub-draft",
    }
  )
);
