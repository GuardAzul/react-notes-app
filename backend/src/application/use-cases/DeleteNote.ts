import { NoteRepository } from "../../domain/repositories/NoteRepository";

export class DeleteNote {
    constructor(
        private noteRepo: NoteRepository
    ) {}

    async execute(id: number) {
        try{
            const note = await this.noteRepo.deleteNote(id);
            return {message: "Note deleted successfully", note};
        } catch(error: any) {
            return {message: error.message, note: null};
        }

    }
}