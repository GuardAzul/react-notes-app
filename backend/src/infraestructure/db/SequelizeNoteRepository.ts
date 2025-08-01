import { Note } from "../../domain/models/Note";
import { NoteRepository } from "../../domain/repositories/NoteRepository";
import { SequelizeNoteModel } from "./models";

export class SequelizeNoteRepository implements NoteRepository {
    async saveNote(note: Note, userId: number): Promise<Note> {
        try {
            const noteCreated = await SequelizeNoteModel.create({
                ...note,
                userId: userId
            });
            return noteCreated.toJSON() as Note;
        } catch(error: any ) {
            throw new Error(error.message);
        }
    }

    async getNoteById(id: number): Promise<Note | null> {
        try {
            const note = await SequelizeNoteModel.findByPk(id);
            return note?.toJSON() as Note;
        } catch({ error }: any) {
            throw new Error(error.message);
        }
    }

    async getNotesByUserId(userId: number): Promise<Note[]> {
        try {
            const notes = await SequelizeNoteModel.findAll({
                where: {
                    userId: userId
                }
            });
            return notes.map(note => note.toJSON() as Note);
        } catch({ error }: any) {
            throw new Error(error.message);
        }
    }

    async deleteNote(id: number): Promise<void> {
        try {
            await SequelizeNoteModel.destroy({
                where: {
                    id: id
                }
            });
        } catch(error: any) {
            throw new Error(error.message);
        }
    }
}