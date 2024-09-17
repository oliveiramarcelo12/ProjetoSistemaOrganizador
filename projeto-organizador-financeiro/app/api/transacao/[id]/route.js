import { atualizarTransacao, deletarTransacao } from "@/controllers/TransacaoController";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        // Obtenha o corpo da requisição
        const data = await request.json();

        // Atualize a transação usando o ID fornecido nos parâmetros da URL
        const transacao = await atualizarTransacao(params.id, data);

        // Verifique se a transação foi atualizada com sucesso
        if (!transacao) {
            return NextResponse.json({ success: false, message: 'Transação não encontrada ou não atualizada' }, { status: 404 });
        }

        // Retorne a resposta com sucesso
        return NextResponse.json({ success: true, data: transacao });
    } catch (error) {
        console.error('Erro ao atualizar transação:', error);
        return NextResponse.json({ success: false, message: 'Erro ao atualizar transação' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        // Deletar a transação usando o ID fornecido nos parâmetros da URL
        const result = await deletarTransacao(params.id);

        // Verifique se a transação foi deletada com sucesso
        if (!result) {
            return NextResponse.json({ success: false, message: 'Transação não encontrada ou não deletada' }, { status: 404 });
        }

        // Retorne a resposta com sucesso
        return NextResponse.json({ success: true, message: 'Deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar transação:', error);
        return NextResponse.json({ success: false, message: 'Erro ao deletar transação' }, { status: 500 });
    }
}
