// models/Transacao.js

import mongoose from 'mongoose';

const TransacaoSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  valor: { type: Number, required: true },
  descricao: { type: String, required: true },
  categoria: { type: String, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // Adicionando campo usuário
}, { timestamps: true });

export default mongoose.models.Transacao || mongoose.model('Transacao', TransacaoSchema);
