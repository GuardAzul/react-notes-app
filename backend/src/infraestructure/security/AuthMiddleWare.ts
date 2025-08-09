import { Request, Response, NextFunction } from 'express';
import { JwtService } from './JwtService';

export class AuthMiddleware {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    authenticate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.access_token || (req.headers.authorization?.startsWith('Bearer ')
                ? req.headers.authorization.split(' ')[1] : null)

            if (!token) return res.status(401).json({ error: 'No se proporcionó token de autenticación' });

            // Verificar el token
            const decoded = this.jwtService.verifyToken(token);

            // Guardar información del usuario en el objeto request
            req.userId = decoded.sub;
            req.user = decoded;

            next();
        } catch (error: any) {
            return res.status(401).json({ error: `Token de autenticación inválido: ${error.message}` });
        }

    }
}