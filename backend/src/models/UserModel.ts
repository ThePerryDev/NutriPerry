import mongoose, { Schema, Document, Types } from 'mongoose';
import NutricionistaModel from './NutricionistaModel';

// Interface que representa a estrutura do usuário
interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  height: number; // em cm
  weight: number; // em kg
  activityLevel: 'sedentario' | 'pouco ativo' | 'ativo' | 'muito ativo';
  gender: 'masculino' | 'feminino';
  goal: 'perda de peso' | 'manutenção de peso' | 'ganho de peso';
  birthdate: Date; // Data de nascimento
  nutricionista?: Types.ObjectId; // Referência a um nutricionista existente
  isLogged: boolean; // Indica se o usuário está logado
  nickname: string
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

// Para o validator do email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Definindo o esquema
const UserSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "O e-mail é obrigatório"],
    maxlength: [50, "O e-mail deve ter no máximo 50 caracteres"],
    validate: {
      validator: function (value: string) {
        return emailRegex.test(value);
      },
      message: "O e-mail informado não é válido"
    }
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória'],
    //validate: passwordValidator
  },
  name: {
    type: String,
    required: true,
   
  },
  nickname: {
    type: String,
    required: true,
    
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
    type: String,
    required: true,
   
  },
  gender: {
    type: String,
    required: true,
    enum: ['masculino', 'feminino']
  },
  goal: {
    type: String,
    required: true,
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
    type: Types.ObjectId,
    ref: 'Nutricionista',
    required: false,
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
