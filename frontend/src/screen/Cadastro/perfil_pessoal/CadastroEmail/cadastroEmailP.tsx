import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { image02, setaVolta } from "../../../../assets";
import ContinueButton from "../../../../components/Cadastro/Continuar/botao_continuar";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CadastroEmail"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const CadastroEmail: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.cima}>
        <TouchableOpacity
          style={styles.volta}
          onPress={() => navigation.navigate("CadastroNome")}
        >
          <Image source={setaVolta}></Image>
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>(2/5)</Text>
      </View>
      <Image source={image02} style={styles.image} resizeMode="contain" />
      <Text style={styles.textgeral}>Insira seu email</Text>
      <TextInput
        value={email}
        onChangeText={(email) => setEmail(email)}
        style={styles.input}
      />
      <Text style={styles.textgeral}>Insira sua senha</Text>
      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        style={styles.input}
      />
      <View style={styles.buttoncontainer}>
        <ContinueButton onPress={() => navigation.navigate("CadastroSexoIdade")} />
      </View>
    </View>
  );
};

export default CadastroEmail;
