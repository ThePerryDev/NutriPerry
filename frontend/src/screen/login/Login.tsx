import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import icone_perfil from "../../assets/perfil.png";
import icone_senha from "../../assets/senha.png";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";
import styles from "./styles";
import { AuthContext } from "../../context/auth/AuthContext";
import InputWithIcons from "../../components/Login/InputWithIcons/InputWithIcons";

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
  const [showLogo, setShowLogo] = useState(true); // Novo estado para controlar a visibilidade da imagem

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <TouchableWithoutFeedback 
        onPress={() => {
          Keyboard.dismiss();
          setShowLogo(true); // Mostrar logo ao clicar fora
        }}
      >
        <View style={styles.innerContainer}>
          {showLogo && (
            <View style={styles.imagecontainer}>
              <Image
                source={require("../../assets/logonutriperry.png")}
                style={styles.image}
              />
            </View>
          )}
          <View style={styles.headerContainer}>
            <Text style={styles.headerlabel}>NUTRIPERRY</Text>
          </View>

          <View style={styles.inputcontainer}>
            <InputWithIcons
              iconSource={icone_perfil}
              placeholder="Insira seu email..."
              value={email}
              onChangeText={(email) => setEmail(email)}
              onFocus={() => {
                setShowLogo(false); // Ocultar logo ao focar no input
              }}
            />
            <InputWithIcons
              iconSource={icone_senha}
              placeholder="Insira sua senha..."
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
              onFocus={() => {
                setShowLogo(false); // Ocultar logo ao focar no input
              }}
            />
          </View>
          <TouchableOpacity style={styles.loginbutton} onPress={handleLogin}>
            <Text style={styles.loginbuttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CadastroNome")}
          >
            <Text style={styles.buttontext}>CADASTRE-SE</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TelaLogin;
