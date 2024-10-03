import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import TelaLogin from "../../screen/login/Login";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useContext(AuthContext);
  
  // se não há usuário logado, manda pra página de login
  if (!auth.user) {
    return <TelaLogin navigation="" />;
  }
  return children;
}
