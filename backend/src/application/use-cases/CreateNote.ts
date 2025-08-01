import { Note } from "../../domain/models/Note";
import { NoteRepository } from "../../domain/repositories/NoteRepository";

export class CreateNote {
    constructor(
        private readonly noteRepo: NoteRepository
    ) {}

    async execute(note: Note, userId: number): Promise<Note> {

        const newNote = await this.noteRepo.saveNote(note, userId);
        return newNote;
    }
}