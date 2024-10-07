import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { imagem4, setaVolta } from "../../../../assets";
import styles from "./Styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { AuthContext } from "../../../../context/auth/AuthContext";
import user from "../../../../services/userService";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CadastroAlturaPeso"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const CadastroAlturaPeso: React.FC<Props> = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const handleRegister = async () => {
    if (height && weight) {
      const heightNumber = parseFloat(height); // Convertendo o valor de altura para número
      const weightNumber = parseFloat(weight); // Convertendo o valor de peso para número
      const birthdate = new Date(2020, 1, 2);

      if (!isNaN(heightNumber) && !isNaN(weightNumber)) {
        await user.post({
          height: heightNumber,
          weight: weightNumber,
          email: "",
          password: "",
          name: "",
          activityLevel: "sedentario",
          gender: "masculino",
          goal: "perda de peso",
          birthdate: birthdate,
          isLogged: false,
        });
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
      <Text style={styles.textgeral}>Insira seu height</Text>
      <TextInput
        value={height}
        onChangeText={(height) => setHeight(height)}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.textgeral}>Insira sua weight</Text>
      <TextInput
        value={weight}
        onChangeText={(weight) => setWeight(weight)}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TelaPPObjetivo")}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CadastroAlturaPeso;
