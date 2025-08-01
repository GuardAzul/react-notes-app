import { User } from '../../domain/models/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { SequelizeUserModel } from './models/SequelizeUserModel';

export class SequelizeUserRepository implements UserRepository  {
    async saveUser(user: User): Promise<User> {
        try{
            const existed = await SequelizeUserModel.findOne({
                where: {email: user.email}
            });

            if(existed){
                throw new Error('User already exists');
            }
            const created = await SequelizeUserModel.create({...user});

            return created.toJSON() as User;
            
        } catch(error) {
            throw new Error('Error al crear el usuario: '+(error as Error).message);
        }
    }

    async login(email: string, password: string): Promise<User | null> {
        try{
            const user = await SequelizeUserModel.findOne({
                where: {email, password}
            });
            if(!user){
                throw new Error('User not found');
            }
            return user.toJSON() as User;
        } catch(error) {
            throw new Error(`Error al obtener el usuario por email: ${email}. ${(error as Error).message}`);
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try{
            const user = await SequelizeUserModel.findOne({
                where: {id}
            });
            if(!user){
                throw new Error('User not found');
            }
            return user;
        } catch(error) {
            throw new Error(`Error al obtener el usuario. ${(error as Error).message}`);
        }
    }
}
