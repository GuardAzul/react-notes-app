import { Note } from "../models/Note";

export interface NoteRepository {
    saveNote(note: Note, userId: number): Promise<Note>;
    getNoteById(id: number): Promise<Note | null>;
    getNotesByUserId(userId: number): Promise<Note[] | null>;
    deleteNote(id: number): Promise<void>;
}