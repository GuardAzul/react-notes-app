export interface AuthContextType {
    isAuthenticated: boolean;
    checkAuth: () => Promise<boolean>;
    logout: () => Promise<void>;
}