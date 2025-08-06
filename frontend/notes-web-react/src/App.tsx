import './App.css'
import { Dashboard } from './components/dashboard/Dashboard'
import { NoteProvider } from './context/NoteContext'
import { useNote } from './hooks/useNote'

function App() {
  const { notes, fetchNotes } = useNote();

  return (
    <NoteProvider>
      <header className='nt-app-header'>
        <label className='nt-app-header-label'>
          <span>Nombre usuario</span>
        </label>
        <button className='nt-app-header-btn'>Create</button>
      </header>
      <main className='nt-app'>
        <h1>Notes App</h1>
        <Dashboard notes={ notes }/>
      </main>
    </NoteProvider>
  )
}

export default App
