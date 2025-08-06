import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthContextType } from '../interfaces/AuthContextType';

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: {children: ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar autenticación al cargar
    useEffect(() => {
        checkAuth();
    }, [])

    // Función para verificar si el usuario está autenticado
    const checkAuth = async (): Promise<boolean> => {
        try {
            // Hacer una petición al backend para verificar si la cookie es válida
            const response = await fetch('http://localhost:3000/api/user/verify', {
                method: 'GET',
                credentials: 'include', // Importante para enviar las cookies
            });

            const isAuth = response.ok;
            setIsAuthenticated(isAuth);
            return isAuth;
        } catch(err: any) {
            setIsAuthenticated(false);
            return false;
        }
    };

    // Función para cerrar la sesión
    const logout = async (): Promise<void> => {
        try {
            await fetch('http://localhost:3000/api/user/logout', {
                method: 'POST',
                credentials: 'include',
            });
            setIsAuthenticated(false);
        } catch(err: any) {
            console.log(`Error al cerrar sesión: ${err.message}`)
        }
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, checkAuth, logout}}>
            {children}
        </AuthContext.Provider>
    );
}