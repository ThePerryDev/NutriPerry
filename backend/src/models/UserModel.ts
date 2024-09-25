import mongoose, { Schema, Document, Types } from 'mongoose';
import { isEmail } from 'validator';
import NutricionistaModel from './NutricionistaModel';

// Interface que representa a estrutura do usuário
interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  height: number; // em cm
  weight: number; // em kg
  activityLevel: number; // de 1 a 7 horas por semana
  gender: 'masculino' | 'feminino';
  goal: 'perda de peso' | 'manutenção de peso' | 'emagrecimento';
  birthdate: Date; // Data de nascimento
  nutricionista?: Types.ObjectId; // Referência a um nutricionista existente
  isLogged: boolean; // Indica se o usuário está logado
}

// Validação da senha
const passwordValidator = [
  {
    validator: (v: string) => /[A-Z]/.test(v),
    message: 'A senha deve conter pelo menos uma letra maiúscula.',
  },
  {
    validator: (v: string) => /\d/.test(v),
    message: 'A senha deve conter pelo menos um número.',
  },
  {
    validator: (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v),
    message: 'A senha deve conter pelo menos um caractere especial.',
  },
  {
    validator: (v: string) => v.length >= 8,
    message: 'A senha deve ter pelo menos 8 caracteres.',
  },
];

// Definindo o esquema
const UserSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // Garante que não haverá duplicatas de email
    validate: [isEmail, 'Email inválido']
  },
  password: {
    type: String,
    required: true,
    validate: passwordValidator
  },
  username: {
    type: String,
    required: true,
    unique: true  // Garante que não haverá duplicatas de username
  },
  height: {
    type: Number,
    required: true,
    min: 0
  },
  weight: {
    type: Number,
    required: true,
    min: 0
  },
  activityLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 7
  },
  gender: {
    type: String,
    required: true,
    enum: ['masculino', 'feminino']
  },
  goal: {
    type: String,
    required: true,
    enum: ['perda de peso', 'manutenção de peso', 'emagrecimento']
  },
  birthdate: {
    type: Date,
    required: true,
    validate: {
      validator: (v: Date) => v < new Date(),
      message: 'A data de nascimento deve ser uma data no passado.'
    }
  },
  nutricionista: {
    type: Types.ObjectId, // Usando Types.ObjectId corretamente
    ref: 'Nutricionista', // Referência ao modelo de Nutricionista
    required: false, // Campo opcional
  },
  isLogged: {
    type: Boolean,
    trim: true,
    required: false
  }
}, {
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

// Middleware para validar se o nutricionista existe antes de salvar o documento
UserSchema.pre('save', async function (next) {
  const user = this as IUser;

  if (user.nutricionista) {
    const nutricionistaExists = await NutricionistaModel.findById(user.nutricionista);
    if (!nutricionistaExists) {
      const err = new Error('Nutricionista não encontrado');
      return next(err);
    }
  }

  next();
});

// Criando o modelo
const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
