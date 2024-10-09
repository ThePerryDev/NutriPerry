import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image} from "react-native";
import icone_perfil from "../../assets/perfil.png";
import icone_senha from "../../assets/senha.png";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";
import LoginButton from "../../components/Login/BotaoLogin/BotaoLogin";
import InputWithIcons from "../../components/Login/InputWithIcons/InputWithIcons";
import styles from "./styles";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TelaLogin"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const TelaLogin: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          onChangeText={(email) => setEmail(email)}
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
        onPress={() => navigation.navigate("CadastroNome")}
      >
        <Text style={styles.buttontext}>CADASTRE-SE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TelaLogin;
