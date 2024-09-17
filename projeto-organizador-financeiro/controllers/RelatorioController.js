import Relatorio from '../models/Relatorio';
import Transacao from '../models/Transacao';

// Criar um novo relatório
export const criarRelatorio = async (req, res) => {
    try {
        const { titulo, dataInicio, dataFim } = req.body;

        // Buscar todas as transações do usuário dentro do intervalo de datas
        const transacoes = await Transacao.find({
            usuario: req.user._id,
            data: { $gte: dataInicio, $lte: dataFim }
        });

        // Calcular total de receitas e despesas
        const totalReceitas = transacoes
            .filter(t => t.tipo === 'receita')
            .reduce((acc, transacao) => acc + transacao.valor, 0);

        const totalDespesas = transacoes
            .filter(t => t.tipo === 'despesa')
            .reduce((acc, transacao) => acc + transacao.valor, 0);

        // Criar o relatório
        const novoRelatorio = new Relatorio({
            titulo,
            dataInicio,
            dataFim,
            totalReceitas,
            totalDespesas,
            saldoFinal: totalReceitas - totalDespesas,
            usuario: req.user._id,
            transacoes: transacoes.map(t => t._id) // Referencia as transações
        });

        const relatorioSalvo = await novoRelatorio.save();
        res.status(201).json(relatorioSalvo);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar relatório", error });
    }
};

// Listar todos os relatórios do usuário
export const listarRelatorios = async (req, res) => {
    try {
        const relatorios = await Relatorio.find({ usuario: req.user._id });
        res.status(200).json(relatorios);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar relatórios", error });
    }
};

// Visualizar um relatório específico
export const visualizarRelatorio = async (req, res) => {
    try {
        const { id } = req.params;
        const relatorio = await Relatorio.findById(id).populate('transacoes'); // Popula com as transações
        if (!relatorio || relatorio.usuario.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: "Relatório não encontrado ou acesso negado" });
        }
        res.status(200).json(relatorio);
    } catch (error) {
        res.status(500).json({ message: "Erro ao visualizar relatório", error });
    }
};

// Deletar um relatório
export const deletarRelatorio = async (req, res) => {
    try {
        const { id } = req.params;
        const relatorio = await Relatorio.findById(id);
        if (!relatorio || relatorio.usuario.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: "Relatório não encontrado ou acesso negado" });
        }
        await relatorio.deleteOne();
        res.status(200).json({ message: "Relatório deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar relatório", error });
    }
};
