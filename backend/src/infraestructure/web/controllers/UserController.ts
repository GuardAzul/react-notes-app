import { Login } from "../../../application/use-cases/Login";
import { GetUserById } from "../../../application/use-cases/GetUserById";
import { SaveUser } from "../../../application/use-cases/SaveUser";
import { Request, Response } from "express";
import { JwtService } from "../../security/JwtService";
import { verification } from "../../../domain/logic/verification";

export class UserController {
    constructor(
        private readonly saveUser: SaveUser,
        private readonly getUserById: GetUserById,
        private readonly getUserByEmail: Login,
        private readonly jwtService: JwtService
    ) { }

    save = async (req: Request, res: Response) => {
        try{
            const { name, email, password } = req.body;
    
            if (!name || !email || !password) {
                res.status(400).send({ message: "Name, email and password are required" });
                return;
            }
    
            const user = await this.saveUser.execute({ name, email, password })
            if (!user) return res.status(500).send({ error: "No se pudo crear el usuario" })

            verification(req, res, user, this.jwtService);
            
            return res.status(201).json(user)
        } catch (error: any) {
            return res.status(500).send({ error: error.message })
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id
            if (!userId) return res.status(400).send({ error: `No se proporcionó un id válido:  ${userId}` })

            const user = await this.getUserById.execute(+userId);
            if (!user) return res.status(400).send({ error: `No se encuentra el usuario con id: ${userId}` })

            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).send({ error: error.message })
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            if (!email) return res.status(400).send({ error: 'No se proporcionó un email válido' })

            const user = await this.getUserByEmail.execute(email, password)
            if (!user) return res.status(404).send({ error: `No se encontró un usuario con este email: ${email}` })

            verification(req, res, user, this.jwtService);

            return res.status(201).json(user)
        } catch (error: any) {
            return res.status(500).send({ error: error.message })
        }
    }
}