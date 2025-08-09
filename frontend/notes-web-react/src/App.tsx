import { useNavigate } from 'react-router';
import './App.css'
import { Dashboard } from './components/dashboard/Dashboard'
import { NoteProvider } from './context/NoteContext'
import { useAuth } from './hooks/useAuth'

function App() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = async () => {
    await logout();
    if(isAuthenticated === false) {
      navigate('/login');
    }
  }

  return (
    <NoteProvider>
      <header className='nt-app-header'>
        <label className='nt-app-header-label'>
          <span>Nombre usuario</span>
        </label>
        <button onClick={handleLogout} className='nt-app-header-btn'>Log out</button>
      </header>
      <main className='nt-app'>
        <Dashboard />
      </main>
    </NoteProvider>
  )
}

export default App
