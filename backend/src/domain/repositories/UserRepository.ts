import { User } from "../models/User";

export interface UserRepository {
    saveUser(user: User): Promise<User>;
    getUserById(id: number): Promise<User | null>;
    login(email: string, password: string): Promise<User | null>
}