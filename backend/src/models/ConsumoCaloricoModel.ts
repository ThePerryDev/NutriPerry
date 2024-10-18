import mongoose, { Schema, Document, Types } from 'mongoose';
import UserModel from './UserModel';
import user from '../routes/user';

// TIRAR COMENTÁRIO DOS REQUIRED, AJUSTAR O TIPO STRING/NUMBER DA PROTEINA

// Interface que representa a estrutura do consumo calórico
interface IConsumoCalorico extends Document {
  user: mongoose.Schema.Types.ObjectId; // Referência ao usuário
  data: Date; // Data do consumo
  tipoRefeicao: 'cafe_da_manha'| 'almoco'| 'jantar'| 'lanches';
  nomeAlimento: string; // Nome do alimento
  kcal: number; // Calorias
  proteina: number; // Proteínas em gramas
  carboidrato: number; // Carboidratos em gramas
  peso: number; // Peso do alimento em gramas
  acucar: number; // Açúcares em gramas
}

// Definindo o esquema
const ConsumoCaloricoSchema: Schema<IConsumoCalorico> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência ao modelo de usuário
    validate: {
      validator: async function (id: string) {
        const editora = await UserModel.findById(id); // verifica se id existe na coleção editoras
        return !!user; // true se a editora existir
      },
      message: 'O usuário fornecida não existe!',
    },
    //required: true,
  },
  data: {
    type: Date,
    //required: true,
   // Define a data atual como padrão
  },
  tipoRefeicao: {
    type: String,
    //required: true,
    enum: ['cafe_da_manha', 'almoco', 'jantar', 'lanches'],
  },
  nomeAlimento: {
    type: String,
    //required: true,
  },
  kcal: {
    type: Number,
    //required: true,
  },
  proteina: {
    type: Number,
    //required: true,
  },
  carboidrato: {
    type: Number,
    //required: true,
  },
  peso: {
    type: Number,
    //required: true,
  },
  acucar: {
    type: Number,
    //required: true,
  },
}

);

// Criando o modelo
const ConsumoCaloricoModel = mongoose.model<IConsumoCalorico>('ConsumoCalorico', ConsumoCaloricoSchema);

export default ConsumoCaloricoModel;
