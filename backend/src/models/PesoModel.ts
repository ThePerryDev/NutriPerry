import mongoose, { Schema, Document } from "mongoose";
import UserModel from "./UserModel";
import user from "../routes/user";

interface IPeso extends Document {
  user: mongoose.Schema.Types.ObjectId; // Referência ao usuário
  peso: number; // ml consumidos
  data: Date; // Data do consumo
}

const PesoSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    validate: {
      validator: async function (id: string) {
        const usuario = await UserModel.findById(id);
        return !!user; // true se a editora existir
      },
      message: "O usuário fornecido não existe!",
    },
    required: true,
  },
  peso: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  }
});

const PesoModel = mongoose.model<IPeso>('Peso', PesoSchema);

export default PesoModel;
