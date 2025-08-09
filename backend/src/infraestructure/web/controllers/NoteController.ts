import { CreateNote } from "../../../application/use-cases/CreateNote";
import { Request, Response } from "express";
import { GetNoteById } from "../../../application/use-cases/GetNoteById";
import { GetNotesByUserId } from "../../../application/use-cases/GetNotesByUserId";
import { DeleteNote } from "../../../application/use-cases/DeleteNote";
import { GetNoteByTitle } from "../../../application/use-cases/GetNoteByTitle";
import { UpdateNote } from "../../../application/use-cases/UpdateNote";

export class NoteController {
    constructor(
        private readonly createNote: CreateNote,
        private readonly getNoteById: GetNoteById,
        private readonly getNotesByUserId: GetNotesByUserId,
        private readonly deleteNote: DeleteNote,
        private readonly getNoteByTitle: GetNoteByTitle,
        private readonly updateNote: UpdateNote
    ) { }

    create = async (req: Request, res: Response) => {
        try {
            if (!req.body) return res.status(400).json({ error: "Missing note data" })

            const note = req.body;
            const userId = req.userId;
            if(!userId) return res.status(400).json({ error: "No valid User" });
            const result = await this.createNote.execute(note, +userId)
            return res.status(200).json({
                message: "Note created successfully",
                note: result
            })
        } 
        catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const noteId = req.params.id;
            if(!noteId) return res.status(400).json({ error: "No valid ID"})
            
            const result = await this.getNoteById.execute(+noteId);
            if(!result) return res.status(404).json({ error: "Note not found" });

            return res.status(200).json(result);
        } catch(error: any) {
            return res.status(500).json({ error: error.message });
        }
    };

    getNotes = async (req: Request, res: Response) => {
        try {
            const userId = req.userId;
            if(!userId) return res.status(400).json({ error: "No valid User" });
            
            const result = await this.getNotesByUserId.execute(+userId);

            return res.status(200).json({
                message: 'Notes fetched successfully',
                notes: result
            });
        } catch(error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    getByTitle = async (req: Request, res: Response) => {
        try {
            const title = req.body.title;
            if(!title) return res.status(400).json({ error: "Title not found" })

            const result = await this.getNoteByTitle.execute(title);
            if(!result) return res.status(404).json({ error: "Note not found" });

            return res.status(200).json({message: 'Note found', result: result});
        } catch(err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const noteId = req.params.id;
            if(!noteId) return res.status(400).json({ error: "No valid Id" })

            const note = req.body;
            const result = await this.updateNote.execute(+noteId, note);

            if(!result) return res.status(404).json({ error: "Note not found" });

            return res.status(200).json({ message: 'Note updated successfully', note: result })
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