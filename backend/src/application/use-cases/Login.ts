import { User } from "../../domain/models/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class Login {
    constructor(
        private readonly userRepo: UserRepository
    ) {}

    async execute(email: string, password: string): Promise<User | null>{

        return await this.userRepo.login(email, password);
    }
}