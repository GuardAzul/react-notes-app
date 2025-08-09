import { Note } from "../../domain/models/Note";
import { NoteRepository } from "../../domain/repositories/NoteRepository";

export class UpdateNote {
    constructor(
        private readonly noteRepo: NoteRepository
    ) {}

    async execute(noteId: number, note: Note): Promise<Note | null> {
        const updatedNote = await this.noteRepo.updateNote(noteId, note);
        if(!updatedNote) return null;
        return updatedNote;
    }
}