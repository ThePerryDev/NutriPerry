import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    mail: string,
    name: string,
    isLogged: boolean,
    password: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UsersSchema: Schema<IUser> = new Schema({
    mail: {
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
        trim: true,
        required: [true, "A senha é obrigatória"],
        maxlength: [100, "A senha deve ter no máximo 100 caracteres"]
    },
    name: {
        type: String,
        trim: true,
        required: [true, "O nome é obrigatório"],
        maxlength: [100, "O nomne deve ter no máximo 100 caracteres"]
    },
    isLogged: {
        type: Boolean,
        trim: true,
        required: true
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});


export default mongoose.model("User", UsersSchema);

