import { jwtMiddleware } from "@/utils/middleware";
import { listarTransacoes, criarTransacao } from "@/controllers/TransacaoController";

export async function GET(req) {
    return jwtMiddleware(async (req, res) => {
        try {
            const result = await listarTransacoes(req);
            return new Response(JSON.stringify(result), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Erro ao listar transações:', error);
            return new Response(JSON.stringify({ message: 'Erro ao listar transações' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    })(req);
}

export async function POST(req) {
    return jwtMiddleware(async (req, res) => {
        try {
            if (req.method === 'POST') {
                const body = await req.json();
                console.log('Request Body:', body);

                // Passar o corpo e resposta para o controlador
                await criarTransacao(req, res);

                return new Response(JSON.stringify({ message: 'Transação criada com sucesso' }), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                return new Response(JSON.stringify({ message: 'Método não permitido' }), {
                    status: 405,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
        } catch (error) {
            console.error('Erro ao processar requisição', error);
            return new Response(JSON.stringify({ message: 'Erro interno no servidor' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    })(req, res);
}
