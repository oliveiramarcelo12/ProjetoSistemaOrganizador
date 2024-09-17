import Transacao from '../models/Transacao';

// Criar uma nova transação
export const criarTransacao = async (req, res) => {
    try {
        const { tipo, valor, descricao, categoria } = req.body;
        const novaTransacao = new Transacao({
            tipo,
            valor,
            descricao,
            categoria,
            usuario: req.user._id  // Obtém o ID do usuário autenticado
        });
        const transacaoSalva = await novaTransacao.save();
        res.status(201).json(transacaoSalva);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar transação", error });
    }
};

// Listar todas as transações do usuário
export const listarTransacoes = async (req, res) => {
    try {
        const transacoes = await Transacao.find({ usuario: req.user._id });
        res.status(200).json(transacoes);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar transações", error });
    }
};

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
