import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { imagem3, setaVolta } from "../../../../assets";
import styles from ".";
import { Picker } from "@react-native-picker/picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { useUserContext } from "../../../../context/userContext";


type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CadastroSexoIdade"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const CadastroSexoIdade: React.FC<Props> = ({ navigation }) => {
  const { setUserData } = useUserContext(); // Obtendo o setUserData do contexto
  const [sexo, setSexo] = useState<string>("");
  const [idade, setIdade] = useState<string>("");

  const handleContinue = () => {
    // Atualiza os dados do usuário no contexto
    setUserData((prevData:any) => ({
      ...prevData,
      sexo: sexo,
      idade: idade,
    }));
    // Navega para a próxima tela
    navigation.navigate("CadastroAlturaPeso");
  };

  return (
    <View style={styles.container}>
      <View style={styles.cima}>
        <TouchableOpacity style={styles.volta}>
          <Image source={setaVolta} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>(3/5)</Text>
      </View>
      <Image source={imagem3} style={styles.image} resizeMode="contain" />
      <Text style={styles.textgeral}>Insira seu sexo</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={sexo} onValueChange={(itemValue) => setSexo(itemValue)}>
          <Picker.Item label="Masculino" value="masculino" />
          <Picker.Item label="Feminino" value="feminino" />
        </Picker>
      </View>
      <Text style={styles.textgeral}>Insira sua idade</Text>
      <TextInput
        value={idade}
        onChangeText={setIdade}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CadastroSexoIdade;
