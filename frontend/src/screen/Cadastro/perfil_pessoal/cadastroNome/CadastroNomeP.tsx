import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { image01, setaVolta } from "../../../../assets";
import ContinueButton from "../../../../components/Cadastro/Continuar/botao_continuar";
import { useUserCadastro } from "../../../../context/UserCadastroContext";

type ContinuarScreenNavigationProp = StackNavigationProp<RootStackParamList, "CadastroNome">;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const CadastroNome: React.FC<Props> = ({ navigation }) => {
  const { updateUserData } = useUserCadastro();
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");

  const handleContinue = () => {
    updateUserData({ name: nome, nickname: sobrenome });
    navigation.navigate("CadastroEmail");
    console.log(updateUserData)
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.navigate("TelaLogin")}
        >
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.headerlabel}>(2/5)</Text>
      </View>
      <Image source={image01} style={styles.image} resizeMode="contain" />
      <Text style={styles.textgeral}>Insira o seu primeiro nome</Text>
      <TextInput
        value={nome}
        onChangeText={(nome) => setNome(nome)}
        style={styles.input}
      />
      <Text style={styles.textgeral}>Insira o seu sobrenome</Text>
      <TextInput
        value={sobrenome}
        onChangeText={(sobrenome) => setSobrenome(sobrenome)}
        style={styles.input}
      />
      <View style={styles.buttoncontainer}>
        <ContinueButton onPress={handleContinue} />
      </View>
    </View>
  );
};

export default CadastroNome;
