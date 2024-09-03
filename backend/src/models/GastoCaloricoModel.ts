import mongoose, { Schema, Types } from 'mongoose';
import User from './UserModel'; // Importação do modelo de usuário

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
    validate: {
      validator: (v: Date) => v <= new Date(), // A data não pode ser no futuro
      message: 'A data não pode ser no futuro.',
    },
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
});

// Middleware para validar o usuário antes de salvar o documento
GastoCaloricoSchema.pre('save', async function (next) {
  const gastoCalorico = this;

  // Verifica se o usuário existe no banco de dados
  const userExists = await User.findById(gastoCalorico.userID);
  if (!userExists) {
    const err = new Error('Usuário não encontrado');
    return next(err);
  }

  // Se o usuário existir, prosseguir com o salvamento
  next();
});

// Criando o modelo
const GastoCaloricoModel = mongoose.model('GastoCalorico', GastoCaloricoSchema);

export default GastoCaloricoModel;
