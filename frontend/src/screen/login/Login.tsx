import { View, Text, TouchableOpacity } from "react-native";
import { InputWithIcons } from "../../components";
import icone_perfil from "../../assets/perfil.png";
import icone_senha from "../../assets/senha.png";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";
import styles from "../Cadastro/perfil_nutricionista/tela_nutri_formacao/styles";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TelaLogin"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const TelaLogin: React.FC<Props> = ({ navigation }) => {

  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // verifica se email e senha estão preeenchidos e manda para o contexto email e senha
    if (email && password) {
      const isLogged = await auth.signin(email, password);
      if (isLogged) {
        alert('logou')
        navigation.navigate("CadastroNutriTelefone");
      } else {
        alert("Falha ao logar");
      }
    }
  };
  
  return (
    <View style={styles.caixinha}>
      <InputWithIcons
        iconSource={icone_perfil}
        placeholder="Insira seu email..."
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <InputWithIcons
        iconSource={icone_senha}
        placeholder="Insira sua senha..."
        value={password}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 30 }}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CadastroNutriTelefone")}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CADASTRE-SE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TelaLogin;
