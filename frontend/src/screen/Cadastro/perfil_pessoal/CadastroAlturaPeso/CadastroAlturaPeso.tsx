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
import { imagem4, setaVolta } from "../../../../assets";
import styles from "./Styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { useUserCadastro } from "../../../../context/UserCadastroContext";
import ContinueButton from "../../../../components/Cadastro/Continuar/botao_continuar";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CadastroAlturaPeso"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const CadastroAlturaPeso: React.FC<Props> = ({ navigation }) => {
  const { updateUserData } = useUserCadastro();
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [showImage, setShowImage] = useState(true);

  const handleContinue = () => {
    updateUserData({ height: Number(height), weight: Number(weight) });
    navigation.navigate("TelaPPObjetivo");
    console.log("dados a serem enviados", updateUserData);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.arrow}
              onPress={() => navigation.navigate("CadastroSexoIdade")}
            >
              <Image source={setaVolta} style={styles.arrow} />
            </TouchableOpacity>
            <Text style={styles.headerlabel}>(4/5)</Text>
          </View>
          {showImage && (
            <Image source={imagem4} style={styles.image} resizeMode="contain" />
          )}
          <Text style={styles.textgeral}>Insira sua altura</Text>
          <TextInput
            value={height}
            onChangeText={(height) => {
              setHeight(height);
              setShowImage(false); // Ocultar imagem ao focar no input
            }}
            style={styles.input}
            keyboardType="numeric"
            returnKeyType="done"
            onFocus={() => setShowImage(false)} // Ocultar imagem ao focar no input
            onBlur={() => setShowImage(true)} // Mostrar imagem ao desfocar
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.textgeral}>Insira seu peso</Text>
          <TextInput
            value={weight}
            onChangeText={(weight) => {
              setWeight(weight);
              setShowImage(false); // Ocultar imagem ao focar no input
            }}
            style={styles.input}
            keyboardType="numeric"
            returnKeyType="done"
            onFocus={() => setShowImage(false)} // Ocultar imagem ao focar no input
            onBlur={() => setShowImage(true)} // Mostrar imagem ao desfocar
            onSubmitEditing={Keyboard.dismiss}
          />
          <View style={styles.buttoncontainer}>
            <ContinueButton onPress={handleContinue} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CadastroAlturaPeso;
