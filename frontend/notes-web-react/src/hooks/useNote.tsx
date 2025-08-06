import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

export function useNote() {
    const context = useContext(NoteContext);
    if(!context) throw new Error('useAuth debe ser usuado dentro de un AuthProvider');

    return context;
}