import { Note } from "../../domain/models/Note";
import { NoteRepository } from "../../domain/repositories/NoteRepository";

export class GetNoteByTitle {
    constructor(
        private readonly noteRepo: NoteRepository
    ) {}

    async execute(title: string): Promise<Note | null> {
        const note = await this.noteRepo.getNoteByTitle(title);
        return note;
    }
}