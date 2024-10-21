import mongoose, { Schema, Document } from "mongoose";
import UserModel from "./UserModel";
import user from "../routes/user";

interface IConsumoAgua extends Document {
  user: mongoose.Schema.Types.ObjectId; // Referência ao usuário
  quantidade: number; // ml consumidos
  data: Date; // Data do consumo
  vezes: number; // Quantidade de vezes que a mesma quantidade foi consumida
}

const ConsumoAguaSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    validate: {
      validator: async function (id: string) {
        const usuário = await UserModel.findById(id);
        return !!user; // true se a editora existir
      },
      message: "O usuário fornecida não existe!",
    },
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  vezes: {
    type: Number,
    required: true,
    default: 1,
  },
});

const ConsumoAguaModel = mongoose.model<IConsumoAgua>('ConsumoAgua', ConsumoAguaSchema);

export default ConsumoAguaModel;
