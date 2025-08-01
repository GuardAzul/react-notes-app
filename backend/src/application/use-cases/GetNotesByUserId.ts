import { NoteRepository } from "../../domain/repositories/NoteRepository";

export class GetNotesByUserId {
    constructor(
        private readonly noteRepository: NoteRepository
    ) {}

    async execute(userId: number) {
        
        const Notes = await this.noteRepository.getNotesByUserId(userId);
        
        return Notes;
    }
}