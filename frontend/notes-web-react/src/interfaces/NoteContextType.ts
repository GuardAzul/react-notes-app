import type { Note } from "./Note";

export interface NoteContextType {
    notes: Note[];
    fetchNotes: () => Promise<void>;
}