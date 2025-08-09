import { useCallback, useState } from "react";
import { useNote } from "../../hooks/useNote";
import type { Note } from "../../interfaces/Note";
import './Daschboard.css'
import { Popup } from "../popup/Popup";


export function Dashboard() {
    const { notes, createNote, updateNote, deleteNote } = useNote();
    const [showPopup, setShowPopup] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

    const handleOpenPopup = useCallback(() => {
        setShowPopup(true);
    }, []);

    const handleClosePopup = useCallback(() => {
        setShowPopup(false);
        setNoteToEdit(null);
    }, []);

    const handleEditNote = useCallback(async (note: Note) => {
        console.log('note', note);
        setNoteToEdit(note);
        setShowPopup(true);
    }, [])

    const handleDeleteNote = useCallback(async (id: number | undefined) => {
        try {
            if(!id) {
                alert('Note ID is undefined');
                return;
            }

            await deleteNote(id);
        } catch (err: any) {
            console.error('Error deleting note:', err.message);
            alert('Error deleting note. Please try again.');
        }
    }, [deleteNote]);


    const handleSubmit = useCallback(async (note: Note) => {
        try {
            console.log('notToEdit', noteToEdit)
            if(noteToEdit) {
                await updateNote(note);
                setShowPopup(false);
            } else {
                await createNote(note);
                setShowPopup(false);
            }
        } catch (err: any) {
            console.error('Error creating note:', err.message);
            alert('Error creating note. Please try again.');
        }
    }, [noteToEdit, createNote, updateNote]);

    return (
        <section className='Dashboard'>
            <h1>Notes</h1>
            {notes && notes.length > 0 ? (
                <div className='notes-container'>
                    <ul className='notes'>
                        {notes.map(note => (
                            <li className='note' key={note.id}>
                                <h2>{note.title}</h2>
                                <p>{note.content}</p>
                                <button onClick={() => handleEditNote(note)} className='note-btn-edit'>Edit</button>
                                <button onClick={() => handleDeleteNote(note.id)} className='note-btn-delete'>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <button className='create-btn-note' onClick={handleOpenPopup}>Create Note</button>
                </div>
            ) : (
                <div>
                    <p>Create your firts Note</p>
                    <button onClick={handleOpenPopup}>Create Note</button>
                </div>
            )}
            {showPopup && (
                <div className='popup'>
                    <Popup 
                        isEditing={!!noteToEdit} 
                        initialNote={noteToEdit || undefined} 
                        onSubmit={handleSubmit} 
                        onClose={handleClosePopup} 
                    />
                </div>
            )}
        </section>
    )
}