import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
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
  const [showImage, setShowImage] = useState(true); // Estado para controlar a visibilidade da imagem

  const handleContinue = () => {
    updateUserData({ name: nome, nickname: sobrenome });
    navigation.navigate("CadastroEmail");
    console.log(updateUserData);
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
          setShowImage(true); // Mostrar imagem ao clicar fora
        }}
      >
        <View>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.arrow}
              onPress={() => navigation.navigate("TelaLogin")}
            >
              <Image source={setaVolta} style={styles.arrow} />
            </TouchableOpacity>
            <Text style={styles.headerlabel}>(1/5)</Text>
          </View>
          {showImage && (
            <Image source={image01} style={styles.image} resizeMode="contain" />
          )}
          <Text style={styles.textgeral}>Insira o seu primeiro nome</Text>
          <TextInput
            value={nome}
            onChangeText={(nome) => setNome(nome)}
            style={styles.input}
            onFocus={() => setShowImage(false)} // Ocultar imagem ao focar no input
          />
          <Text style={styles.textgeral}>Insira o seu sobrenome</Text>
          <TextInput
            value={sobrenome}
            onChangeText={(sobrenome) => setSobrenome(sobrenome)}
            style={styles.input}
            onFocus={() => setShowImage(false)} // Ocultar imagem ao focar no input
          />
          <View style={styles.buttoncontainer}>
            <ContinueButton onPress={handleContinue} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CadastroNome;
