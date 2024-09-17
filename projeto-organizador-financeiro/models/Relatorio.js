import mongoose from 'mongoose';

// Schema de relatório
const relatorioSchema = new mongoose.Schema({
    titulo: { 
        type: String, 
        required: true 
    },
    dataInicio: { 
        type: Date, 
        required: true 
    },
    dataFim: { 
        type: Date, 
        required: true 
    },
    totalReceitas: { 
        type: Number, 
        required: true,
        default: 0 
    },
    totalDespesas: { 
        type: Number, 
        required: true,
        default: 0 
    },
    saldoFinal: { 
        type: Number, 
        required: true,
        default: 0 
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Relaciona com o modelo User
        required: true
    },
    transacoes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transacao'  // Relaciona com o modelo Transacao
    }]
});

// Método para calcular o saldo final
relatorioSchema.methods.calcularSaldo = function() {
    this.saldoFinal = this.totalReceitas - this.totalDespesas;
    return this.saldoFinal;
};

// Criar o modelo de relatório
const Relatorio = mongoose.models.Relatorio || mongoose.model('Relatorio', relatorioSchema);

export default Relatorio;
