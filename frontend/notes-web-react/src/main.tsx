import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { Login } from './components/login/Login.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> }/>
        <Route path="/login" element={ <Login /> }/>
        <Route path="/notes" element={ <App /> }/>
      </Routes>
    </StrictMode>
  </BrowserRouter>,
)
