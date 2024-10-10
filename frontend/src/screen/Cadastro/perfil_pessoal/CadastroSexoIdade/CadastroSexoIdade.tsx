import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { imagem3, setaVolta } from "../../../../assets";
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import ContinueButton from "../../../../components/Cadastro/Continuar/botao_continuar";
import CustomPicker from "../../../../components/Cadastro/Picker/picker";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CadastroSexoIdade"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const CadastroSexoIdade: React.FC<Props> = ({ navigation }) => {
  const [sexo, setSexo] = useState<string>("");
  const [idade, setIdade] = useState<string>("");

  const genderOptions = [
    { label: "", value: "" },
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.navigate("CadastroEmail")}
        >
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.headerlabel}>(3/5)</Text>
      </View>
      <Image source={imagem3} style={styles.image} resizeMode="contain" />
      <CustomPicker
        label="Insira seu sexo"
        selectedValue={sexo}
        onValueChange={(itemValue) => setSexo(itemValue)}
        items={genderOptions}
      />
      <Text style={styles.textgeral}>Insira sua idade</Text>
      <TextInput
        value={idade}
        onChangeText={(idade) => setIdade(idade)}
        style={styles.input}
        keyboardType="numeric"
      />
      <View style={styles.buttoncontainer}>
        <ContinueButton onPress={() => navigation.navigate("CadastroAlturaPeso")} />
      </View>
    </View>
  );
};

export default CadastroSexoIdade;
