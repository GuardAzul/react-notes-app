import { useState } from "react";
import type { User, UserResponse } from "../interfaces/User";
import { loginService } from "../services/loginService";

export function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>();
    const [userData, setUserData] = useState<UserResponse | null>();

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            setError(null);

            const user: User = {
                email: email,
                password: password
            }

            const response = await loginService(user);
            setUserData(response);

            return response;
        } catch(err: any) {
            setError(err.message || 'Error al iniciar sesión');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        isLoading,
        error,
        userData
    };
}