import type { Note } from "./Note";

export interface NoteContextType {
    notes: Note[];
    fetchNotes: () => Promise<void>;
    createNote: (note: Note) => Promise<void>;
    updateNote: (note: Note) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
}