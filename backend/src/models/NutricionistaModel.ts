import mongoose, { Schema, Document } from 'mongoose';

// Interface para o documento de Nutricionista
interface INutricionista extends Document {
  email: string;
  password: string;
  nome: string;
  birthdate: Date;
  genero: 'masculino' | 'feminino';
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

// Definição do esquema de Nutricionista
const NutricionistaSchema: Schema<INutricionista> = new Schema({
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
    required: true,
    validate: passwordValidator,
  },
  nome: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
    validate: {
      validator: (v: Date) => v < new Date(), // Garante que a data de nascimento seja no passado
      message: 'A data de nascimento deve ser uma data no passado.',
    },
  },
  genero: {
    type: String,
    required: true,
    enum: ['masculino', 'feminino'], // Gênero pode ser apenas 'masculino' ou 'feminino'
  },
});

// Criando o modelo
const NutricionistaModel = mongoose.model<INutricionista>('Nutricionista', NutricionistaSchema);

export default NutricionistaModel;
