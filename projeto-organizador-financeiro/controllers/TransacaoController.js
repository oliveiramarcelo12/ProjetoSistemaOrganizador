// controllers/TransacaoController.js
import { NextResponse } from 'next/server';
import Transacao from '../models/Transacao';


export async function listarTransacoes() {
    try {
        return await Transacao.find();
    } catch (error) {
        console.error('Erro ao listar transações:', error);
        throw error;
    }
}

// controllers/TransacaoController.js

export const criarTransacao = async (req, res) => {
  try {
    const { tipo, valor, descricao, categoria, usuario } = req.body;

    if (!usuario) {
      throw new Error('Usuário é obrigatório para criar uma transação.');
    }

    const transacao = new Transacao({ tipo, valor, descricao, categoria, usuario });
    await transacao.save();

    res.status(201).json(transacao);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exportar outras funções, se necessário

  


// Atualizar transação
export async function atualizarTransacao(req) {
    try {
        const { id } = req.params;
        const data = await req.json();
        const transacaoAtualizada = await Transacao.findByIdAndUpdate(id, data, { new: true });
        if (!transacaoAtualizada) {
            return NextResponse.json({ success: false, message: 'Transação não encontrada' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: transacaoAtualizada }, { status: 200 });
    } catch (error) {
        console.error('Erro ao atualizar transação', error);
        return NextResponse.json({ success: false, message: 'Erro ao atualizar transação' }, { status: 500 });
    }
}

// Deletar transação
export async function deletarTransacao(req) {
    try {
        const { id } = req.params;
        const transacao = await Transacao.findByIdAndDelete(id);
        if (!transacao) {
            return NextResponse.json({ success: false, message: 'Transação não encontrada' }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Transação deletada com sucesso" }, { status: 200 });
    } catch (error) {
        console.error('Erro ao deletar transação', error);
        return NextResponse.json({ success: false, message: 'Erro ao deletar transação' }, { status: 500 });
    }
}
