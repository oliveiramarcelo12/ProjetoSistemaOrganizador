// controllers/TransacaoController.js
import Transacao from '../models/Transacao';

// controllers/TransacaoController.js
export async function listarTransacoes(req, res) {
    try {
        const userId = req.user._id; // Obtém o ID do usuário do request
        // Lógica para listar transações do usuário
        // Exemplo: const transacoes = await Transacao.find({ usuario: userId });
        res.status(200).json({ success: true, data: transacoes });
    } catch (error) {
        console.error('Erro ao listar transações', error);
        res.status(500).json({ success: false, message: 'Erro ao listar transações' });
    }
}

export async function criarTransacao(req, res) {
    try {
        const userId = req.user._id; // Obtém o ID do usuário do request
        const data = req.body;
        // Lógica para criar uma nova transação
        // Exemplo: const novaTransacao = await Transacao.create({ ...data, usuario: userId });
        res.status(201).json({ success: true, data: novaTransacao });
    } catch (error) {
        console.error('Erro ao criar transação', error);
        res.status(500).json({ success: false, message: 'Erro ao criar transação' });
    }
}

// Defina funções para PUT e DELETE conforme necessário



// Atualizar uma transação existente
export const atualizarTransacao = async (req, res) => {
    try {
        const { id } = req.params;
        const transacaoAtualizada = await Transacao.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(transacaoAtualizada);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar transação", error });
    }
};

// Deletar uma transação
export const deletarTransacao = async (req, res) => {
    try {
        const { id } = req.params;
        await Transacao.findByIdAndDelete(id);
        res.status(200).json({ message: "Transação deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar transação", error });
    }
};
