import { User } from "../../domain/models/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class GetUserById {
    constructor(
        private readonly userRepo: UserRepository
    ) {}

    async execute(id: number): Promise<User | null>{
        return await this.userRepo.getUserById(id);
    }
}