import { CreateNote } from "../../../application/use-cases/CreateNote";
import { Request, Response } from "express";
import { GetNoteById } from "../../../application/use-cases/GetNoteById";
import { GetNotesByUserId } from "../../../application/use-cases/GetNotesByUserId";
import { DeleteNote } from "../../../application/use-cases/DeleteNote";

export class NoteController {
    constructor(
        private readonly createNote: CreateNote,
        private readonly getNoteById: GetNoteById,
        private readonly getNotesByUserId: GetNotesByUserId,
        private readonly deleteNote: DeleteNote
    ) { }

    create = async (req: Request, res: Response) => {
        try {
            if (!req.body) return res.status(400).json({ error: "Missing note data" })

            const note = req.body;
            const userId = req.params.id;
            if(!userId) return res.status(400).json({ error: "No valid User" });
            const result = this.createNote.execute(note, +userId)
            return res.status(200).json(result)
        } 
        catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const noteId = req.params.id;
            if(!noteId) return res.status(400).json({ error: "No valid ID"})
            
            const result = this.getNoteById.execute(+noteId);
            if(!result) return res.status(404).json({ error: "Note not found" });

            return res.status(200).json(result);
        } catch(error: any) {
            return res.status(500).json({ error: error.message });
        }
    };

    getNotes = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            if(!userId) return res.status(400).json({ error: "No valid User" });
            
            const result = this.getNotesByUserId.execute(+userId);

            return res.status(200).json(result);
        } catch(error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    delete = async(req: Request, res: Response) => {
        try {
            const noteId = req.params.id;
            if(!noteId) return res.status(400).json({ error: "No valid Id" })

            const result = await this.deleteNote.execute(+noteId)
            return res.status(201).json({ message: result.message })
        } catch(error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}