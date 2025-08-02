import { JwtService } from "../../infraestructure/security/JwtService"
import { User } from "../models/User"
import { Request, Response } from "express"

export function verification(_req: Request, res: Response, user: User, jwtService: JwtService) {
    if(!user.id) throw new Error("No identificar o crear el usuario")

    console.log('Generating token....')
    const token = jwtService.generateToken({ sub: user.id.toString(), name: user.name, email: user.email })

    console.log('Setting cookie...')
    res.cookie('access_token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60,
    })
}