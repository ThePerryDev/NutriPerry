import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import TelaLogin from "../../screen/login/Login";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";

type NavigationProp = StackNavigationProp<RootStackParamList, "TelaLogin">;

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp>(); // Obter a navegação específica para "TelaLogin"
  
  if (!auth.user) {
    return <TelaLogin navigation={navigation} />;
  }
  return children;
}
