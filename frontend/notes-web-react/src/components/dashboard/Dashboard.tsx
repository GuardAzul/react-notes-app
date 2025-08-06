import type { Note } from "../../interfaces/Note";

export function Dashboard({ notes }: { notes: Note[] }) {

    return (
        <section className='Dashboard'>
            <h1>Dashboard</h1>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}