// TelaLogin.tsx
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
import InputWithIcon from "../../components/Login/InputWithIcons/InputWithIcons";

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
  const [showLogo, setShowLogo] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleLogin = async () => {
    if (email && password) {
      console.log("Tentando fazer login com:", email);
      const isLogged = await auth.signin(email, password);

      if (isLogged) {
        setIsError(false);
        navigation.navigate("Home");
      } else {
        setIsError(true);
      }
    } else {
      console.log("Os campos de email e senha são obrigatórios");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setShowLogo(true);
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
            <InputWithIcon
              iconSource={icone_perfil}
              placeholder="Insira seu email..."
              value={email}
              onChangeText={(text) => setEmail(text)}
              onFocus={() => setShowLogo(false)}
              style={isError ? styles.inputError : undefined}
            />
            <InputWithIcon
              iconSource={icone_senha}
              placeholder="Insira sua senha..."
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              onFocus={() => setShowLogo(false)}
              style={isError ? styles.inputError : undefined}
            />
            {isError && (
              <Text style={styles.errorText}>Usuário ou senha incorretos</Text>
            )}
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
