import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

export function useNote() {
    const context = useContext(NoteContext);
    if(!context) throw new Error('useNotes debe ser usuado dentro de un NoteProvider');

    return context;
}