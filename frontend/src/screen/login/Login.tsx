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
      { <View style={styles.imagecontainer}>
        <Image
          source={require("../../assets/logonutriperry.png")}
          style={styles.image}
        />
      </View>}
      <View style={styles.headerContainer}>
        <Text style={styles.headerlabel}>NUTRIPERRY</Text>
      </View>

      <View style={styles.inputcontainer}>
        <InputWithIcons
          iconSource={icone_perfil}
          placeholder="Insira seu email..."
          value={email}
          onChangeText={(email: string) => setEmail(email)}
        />
        <InputWithIcons
          iconSource={icone_senha}
          placeholder="Insira sua senha..."
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
      </View>  
      <LoginButton navigation={navigation} />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttontext}>CADASTRE-SE</Text>
      </TouchableOpacity>
    </View>
  )
};

export default TelaLogin;
