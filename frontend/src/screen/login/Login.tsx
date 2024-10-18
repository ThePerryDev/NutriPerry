import { View, Text, Image, Pressable, TextInput } from "react-native";
import icone_perfil from "../../assets/perfil.png";
import icone_senha from "../../assets/senha.png";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";
import styles from "./styles";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TelaLogin" // Garantindo que o tipo é específico para "TelaLogin"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const TelaLogin: React.FC<Props> = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      console.log("Tentando fazer login com:", email);
      const isLogged = await auth.signin(email, password);

      if (isLogged) {
        console.log("Navegando para Home");
        navigation.navigate("Home");
      } else {
        console.error("Falha ao logar");
        alert("Falha ao logar");
      }
    } else {
      console.log("Os campos de email e senha são obrigatórios");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.input_login}>
        <Image source={icone_perfil} style={styles.icon} />
        <TextInput
          placeholder="Insira seu email..."
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.input_login}>
        <Image source={icone_senha} style={styles.icon} />
        <TextInput
          placeholder="Insira sua senha..."
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={{ color: "#FFFFFF", fontSize: 30 }}>ENTRAR</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("CadastroNome")}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CADASTRE-SE</Text>
      </Pressable>
    </View>
  );
};

export default TelaLogin;
