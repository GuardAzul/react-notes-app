import type { User } from "../interfaces/User";

export const loginService = async (user: User) => {

    try {
        const response = await fetch(`http://localhost:3000/api/user/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if(data.Response === 'Success') {
            return data;
        } else {
            throw new Error(data.Error);
        }
    } catch(error: any) {
        throw new Error(`Error al inicar sesión: ${error.message}`);
    }

}