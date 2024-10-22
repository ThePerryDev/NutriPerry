import { createContext } from "react";
import { UsersProps } from "../../types/index";

export type AuthConextType = {
    // se houver usuário, usa o types do user. Caso contrário não tem tipo
    user: UsersProps | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
}

export const AuthContext = createContext<AuthConextType>(null!);

