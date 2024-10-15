import { View, Text, Image, Pressable, TextInput } from "react-native";
import icone_perfil from "../../assets/perfil.png";
import icone_senha from "../../assets/senha.png";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";
import styles from "./styles";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
// 
type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TelaLogin"
>;
// 
type Props = {
  navigation: ContinuarScreenNavigationProp;
};
// 
const TelaLogin: React.FC<Props> = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // verifica se email e senha estão preenchidos e manda para o contexto email e senha
    if (email && password) {
      const isLogged = await auth.signin(email, password);
      if (isLogged) {
        navigation.navigate("Home");
      } else {
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
          onChangeText={(email: string) => setEmail(email)}
        />
      </View>
        <View style={styles.input_login}>
          <Image source={icone_senha} style={styles.icon} />
          <TextInput
            placeholder="Insira sua senha..."
            style={styles.input}
            value={password}
            onChangeText={(password) => setPassword(password)}
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
