import jwt from 'jsonwebtoken';

export function jwtMiddleware(handler) {
    return async (req, res) => {
        const token = req.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return new Response(JSON.stringify({ message: 'Token ausente' }), { status: 401 });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Adiciona os dados do usuário ao req
            return await handler(req, res); // Passa req e res para o handler
        } catch (error) {
            console.error('Token inválido', error);
            return new Response(JSON.stringify({ message: 'Token inválido' }), { status: 401 });
        }
    };
}
