// utils/middleware.js
import jwt from 'jsonwebtoken';

export function jwtMiddleware(handler) {
    return async (req, res) => {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Token ausente' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Adiciona os dados do usuário ao req
            return handler(req, res);
        } catch (error) {
            console.error('Token inválido', error);
            return res.status(401).json({ message: 'Token inválido' });
        }
    };
}
