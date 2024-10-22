import mongoose, { Schema, Types } from 'mongoose';
import UserModel from './UserModel'; // Importação do modelo de usuário

// Esquema para Gasto Calórico
const GastoCaloricoSchema: Schema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência ao modelo de usuário
    required: true,
    validate: {
      validator: async function (id: string) {
        const usuário = await UserModel.findById(id); // verifica se id existe na coleção 
        return !!usuário; // true se o usuário existir
      },
      message: 'O usuário não existe!',
    },
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

// Criando o modelo
const GastoCaloricoModel = mongoose.model('GastoCalorico', GastoCaloricoSchema);

export default GastoCaloricoModel;
