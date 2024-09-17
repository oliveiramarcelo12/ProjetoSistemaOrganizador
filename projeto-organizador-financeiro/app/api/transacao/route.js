// pages/api/transacao/route.js
import { jwtMiddleware } from "@/utils/middleware";
import { listarTransacoes, criarTransacao } from "@/controllers/TransacaoController";

export async function GET(req, res) {
    return jwtMiddleware(async (req, res) => {
        await listarTransacoes(req, res);
    })(req, res);
}

export async function POST(req, res) {
    return jwtMiddleware(async (req, res) => {
        await criarTransacao(req, res);
    })(req, res);
}

// Adicione PUT e DELETE se necessário
