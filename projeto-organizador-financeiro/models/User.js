const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isColaborador: { type: Boolean, default: false }
});

// Usa `mongoose.models.User` para evitar sobrescrita
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
