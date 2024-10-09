import React, { useContext, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import { AuthContext } from "../../../context/auth/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";

interface LoginButtonProps {
  title?: string;
  navigation: StackNavigationProp<RootStackParamList, "TelaLogin">; // Tipando navigation
}

const LoginButton: React.FC<LoginButtonProps> = ({ navigation, title = "LOGIN" }) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Verifica se email e senha estão preenchidos e chama o contexto de autenticação
    if (email && password) {
      const isLogged = await auth.signin(email, password);
      if (isLogged) {
        alert('Logou com sucesso');
        navigation.navigate("CadastroNome"); // Navega para a próxima tela
      } else {
        alert("Falha ao logar");
      }
    } else {
      alert("Preencha os campos de email e senha");
    }
  };

  return (
    <TouchableOpacity style={styles.continuebutton} onPress={handleLogin}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
