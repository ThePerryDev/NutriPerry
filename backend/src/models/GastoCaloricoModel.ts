import mongoose, { Schema, Types } from 'mongoose';
import UserModel from './UserModel'; // Importação do modelo de usuário

// Esquema para Gasto Calórico
const GastoCaloricoSchema: Schema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência ao modelo de usuário
    required: true,

  },
  data: {
    type: Date,
    required: true,

  },
  atividadeFisica: {
    type: String,
    required: true,
  },
  gastoCalorico: {
    type: Number,
    required: true,
    min: 0, // Gasto calórico não pode ser negativo
  },
  tempo: {
    type: Number,
    required: true,
    min: 0,
  }
});

// Criando o modelo
const GastoCaloricoModel = mongoose.model('GastoCalorico', GastoCaloricoSchema);

export default GastoCaloricoModel;
