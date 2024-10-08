import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { imagem4, setaVolta } from "../../../../assets";
import styles from "./Styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import user from "../../../../services/userService";
import { useUserContext } from "../../../../context/userContext";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CadastroAlturaPeso"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const CadastroAlturaPeso: React.FC<Props> = ({ navigation }) => {
  const { userData, setUserData } = useUserContext(); // Obtendo userData e setUserData do contexto
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const handleRegister = async () => {
    if (height && weight) {
      const heightNumber = parseFloat(height);
      const weightNumber = parseFloat(weight);
      const birthdate = new Date(2020, 1, 2); // Exemplo de data de nascimento

      if (!isNaN(heightNumber) && !isNaN(weightNumber)) {
        // Atualiza os dados do usuário no contexto
        setUserData({
          ...userData,
          height: heightNumber,
          weight: weightNumber,
        });

        await user.post({
          email: userData.email, // Assume que o email foi salvo anteriormente
          password: userData.password,
          name: userData.name,
          nickname: userData.nickname,
          activityLevel: "sedentario",
          gender: userData.sexo, // Obtém o sexo do contexto
          goal: "perda de peso",
          birthdate: birthdate,
          height: heightNumber,
          weight: weightNumber,
          isLogged: false,
        });

        // Navega para a próxima tela
        navigation.navigate("TelaPPObjetivo");
      } else {
        alert("Insira valores numéricos válidos");
      }
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cima}>
        <TouchableOpacity style={styles.volta}>
          <Image source={setaVolta} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>(4/5)</Text>
      </View>
      <Image source={imagem4} style={styles.image} resizeMode="contain" />
      <Text style={styles.textgeral}>Insira sua altura</Text>
      <TextInput
        value={height}
        onChangeText={setHeight}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.textgeral}>Insira seu peso</Text>
      <TextInput
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CadastroAlturaPeso;
