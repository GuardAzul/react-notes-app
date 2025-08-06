import { createContext, useEffect, useState } from "react";
import type { NoteContextType } from "../interfaces/NoteContextType";
import type { Note } from "../interfaces/Note";

export const NoteContext = createContext<NoteContextType | null>(null);

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        fetchNotes();
    }, [])

    const fetchNotes = async () => {
        try {
            const response = await fetch(`https://localhost:3000/api/notes`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }

            const data = await response.json();
            if (data.Notes) {
                setNotes(data);
            } else {
                console.error('No notes found or error in response:', data.Error);
                throw new Error(data.Error || 'Unknown error');
            }

        } catch (err: any) {
            console.error('Error fetching notes:', err.message);
            throw err;
        }
    }

    return (
        <NoteContext.Provider value={{notes, fetchNotes}}>
            {children}
        </NoteContext.Provider>
    );
}