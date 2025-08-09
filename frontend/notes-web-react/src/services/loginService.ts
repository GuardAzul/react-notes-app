import type { User } from "../interfaces/User";

export const loginService = async (user: User) => {

    try {
        console.log(JSON.stringify(user))
        const response = await fetch(`http://localhost:3000/api/user/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.Error || `Error desconocido: ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(`Error al inicar sesión: ${error.message}`);
    }

}