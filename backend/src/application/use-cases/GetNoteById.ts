import { NoteRepository } from "../../domain/repositories/NoteRepository";

export class GetNoteById {
    constructor(
        private readonly noteRepo: NoteRepository
    ) {}

    async execute(id: number) {
        const note = await this.noteRepo.getNoteById(id);

        return note;
    }
}