import { createContext, useEffect, useState } from "react";
import type { NoteContextType } from "../interfaces/NoteContextType";
import type { Note } from "../interfaces/Note";

export const NoteContext = createContext<NoteContextType | null>(null);

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        fetchNotes();
    }, [notes])

    const fetchNotes = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/notes`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }

            const data = await response.json();
            if (data.notes) {
                setNotes(data.notes);
            } else {
                console.warn('No notes found or error in response:', data.Error);
                throw new Error(data.Error || 'Unknown error');
            }

        } catch (err: any) {
            console.error('Error fetching notes:', err.message);
            throw err;
        }
    }

    const createNote = async (note: Note) => {
        try {
            const response = await fetch('http://localhost:3000/api/notes', {
                method: 'POST',
                body: JSON.stringify(note),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to create note, review the data');

            const data = await response.json();

            if(data.note) {
                setNotes([...notes, data.note]);
            } else {
                throw new Error(data.Error || 'Unknown error');
            }

        } catch(err: any) {
            console.error('Error creating note', err.message)
            throw err;
        }
    }

    const updateNote = async (note: Note) => {
        try {
            const response = await fetch(`http://localhost:3000/api/notes/${note.id}`, {
                method: 'PUT',
                body: JSON.stringify(note),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to update note, review the data');

            const data = await response.json();

            if(data.note) {
                setNotes(notes.map(n => n.id === note.id ? data.note : n));
            } else {
                throw new Error(data.Error || 'Unknown error');
            }
        } catch(err: any) {
            console.error('Error updating note', err.message)
            throw err;
        }
    }

    const deleteNote = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to delete note');
            setNotes(notes.filter(n => n.id !== id));
        } catch(err: any) {
            console.log('Error deleting note', err.message);
            throw err;
        }
    }

    return (
        <NoteContext.Provider value={{notes, fetchNotes, createNote, updateNote, deleteNote}}>
            {children}
        </NoteContext.Provider>
    );
}