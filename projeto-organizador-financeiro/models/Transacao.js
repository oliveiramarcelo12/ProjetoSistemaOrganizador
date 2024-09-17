import mongoose from 'mongoose';

// Schema de transação
const transacaoSchema = new mongoose.Schema({
    tipo: { 
        type: String, 
        enum: ['receita', 'despesa'], 
        required: true 
    },
    valor: { 
        type: Number, 
        required: true 
    },
    descricao: { 
        type: String, 
        required: true 
    },
    data: { 
        type: Date, 
        default: Date.now 
    },
    categoria: { 
        type: String, 
        required: true 
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Referência ao model User
        required: true
    }
});

// Métodos adicionais, se necessário
transacaoSchema.methods.formatarValor = function() {
    return `R$ ${this.valor.toFixed(2)}`;
};

// Criar o modelo de transação
const Transacao = mongoose.models.Transacao || mongoose.model('Transacao', transacaoSchema);

export default Transacao;
