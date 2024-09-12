import mongoose, { Schema, Types } from 'mongoose'; // Ajustando a importação correta
import User from './UserModel'; // Importação do modelo de usuário

// Esquema para Alimento
const AlimentoSchema: Schema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  kcal: {
    type: Number,
    required: true,
    min: 0,
  },
  proteina: {
    type: Number,
    required: true,
    min: 0,
  },
  carboidrato: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Esquema para Refeição
const RefeicaoSchema: Schema = new Schema({
  tipo: {
    type: String,
    required: true,
    enum: ['café da manhã', 'almoço', 'jantar', 'lanches'],
  },
  alimentos: [AlimentoSchema], // Uma refeição pode conter vários alimentos
});

// Esquema para Gasto Calórico
const ConsumoCaloricoSchema: Schema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId, // Usando mongoose.Types.ObjectId corretamente
    ref: 'User', // Referência ao modelo de usuário
    required: true,
  },
  data: {
    type: Date,
    required: true,
    validate: {
      validator: (v: Date) => v <= new Date(), // Garantir que a data seja no máximo a data atual
      message: 'A data não pode ser no futuro.',
    },
  },
  refeicoes: [RefeicaoSchema], // Um registro diário pode ter várias refeições
});

// Criando o modelo
const ConsumoCalorico = mongoose.model('GastoCalorico', ConsumoCaloricoSchema);

export default ConsumoCalorico;
