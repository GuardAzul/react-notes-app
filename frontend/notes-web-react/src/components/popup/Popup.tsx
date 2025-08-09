import { useEffect, useRef } from 'react';
import type { Note } from '../../interfaces/Note';

interface PopupProps {
    isEditing: boolean;
    initialNote?: Note;
    onSubmit: (note: Note) => Promise<void>;
    onClose: () => void;

}

export function Popup({ isEditing, initialNote, onSubmit, onClose }: PopupProps) {
    const inputTitle = useRef<HTMLInputElement>(null);
    const inputContent = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if(isEditing && initialNote) {
            if(inputTitle.current) inputTitle.current.value = initialNote.title;
            if(inputContent.current) inputContent.current.value = initialNote.content;
        } 
    },[isEditing, initialNote]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newNote: Note = {
            id: initialNote?.id,
            title: inputTitle.current?.value || '',
            content: inputContent.current?.value || ''
        };

        console.log(newNote);

        if (newNote.title === '' || newNote.content === '') {
            alert('Please fill in all fields');
            return;
        }

        onSubmit(newNote);
    }

    return (
        <div className='popup-overlay'>
            <div className='popup-content'>
                {
                    isEditing ? <h2>Update Note</h2> : <h2>Create Note</h2>
                }
                <form className='crte-nte-frm' onSubmit={handleSubmit}>
                    <input type='text' placeholder='Title' id='title' ref={inputTitle} />
                    <textarea placeholder='Content' id='content' ref={inputContent}></textarea>
                    <button type='button' onClick={onClose}>Cancel</button>
                    <button type='submit'>{isEditing ? 'Update' : 'Create'}</button>
                </form>
            </div>
        </div>
    );
}