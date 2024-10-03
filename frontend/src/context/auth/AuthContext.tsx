import { createContext } from "react";
import { User } from "../../types/User";

export type AuthConextType = {
    // se houver usuário, usa o types do user. Caso contrário não tem tipo
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
}

export const AuthContext = createContext<AuthConextType>(null!);

