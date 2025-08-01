import dtoenv from 'dotenv';
import jwt, { SignOptions, VerifyOptions, JwtPayload } from 'jsonwebtoken';

dtoenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "c6557d1e51e7a07cbcc35e317b71a4a1a784dc7f253883aacdc57ddb917526f1";

const defaultSignOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1h',
    issuer: 'react-notes-app',
    audience: "react-notes-app-users"
}

export class JwtService {

    generateToken(payload: { sub: string; email: string; name: string; }): string {
        const jti = crypto.randomUUID()
        return jwt.sign({ ...payload, jti }, JWT_SECRET, defaultSignOptions);
    }

    verifyToken(token: string): JwtPayload {
        try {
            const options: VerifyOptions = {
                algorithms: ['HS256'],
                issuer: 'react-notes-app',
                audience: "react-notes-app-users"
            }

            const decoded = jwt.verify(token, JWT_SECRET, options) as JwtPayload;

            if (!decoded.sub) throw new Error("Missing subject (sub) in token");
            if (!decoded.jti) throw new Error("Missing JWT ID (jti)");
            if (!decoded.iat) throw new Error("Missing issued at (iat)");

            return decoded;
        } catch (err: any) {
            if(err.name === 'TokenExpiredError') {
                throw new Error("Token has expired");
            } else if(err.name === 'JsonWebTokenError') {
                throw new Error("Invalid token");
            } else if(err.name === 'NoteBeforeError'){
                throw new Error('Token is not active yet')
            } else {
                throw new Error(`Token verification failed: ${err.message}`)
            }
        }
    }
}