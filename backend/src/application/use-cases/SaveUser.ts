import { User } from "../../domain/models/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class SaveUser {
    constructor(
        private readonly userRepo: UserRepository
    ) {}

    async execute(user: User): Promise<User> {
        return await this.userRepo.saveUser(user);
    }
}