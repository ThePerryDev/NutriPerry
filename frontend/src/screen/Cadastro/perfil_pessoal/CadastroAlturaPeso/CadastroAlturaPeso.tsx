import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { imagem4, setaVolta } from "../../../../assets";
import styles from "./Styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CadastroAlturaPeso"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const CadastroAlturaPeso: React.FC<Props> = ({ navigation }) => {
  const [altura, setAltura] = useState<string>("");
  const [peso, setPeso] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.cima}>
        <TouchableOpacity style={styles.volta}>
          <Image source={setaVolta} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>(4/5)</Text>
      </View>
      <Image source={imagem4} style={styles.image} resizeMode="contain" />
      <Text style={styles.textgeral}>Insira seu altura</Text>
      <TextInput
        value={altura}
        onChangeText={(altura) => setAltura(altura)}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.textgeral}>Insira sua peso</Text>
      <TextInput
        value={peso}
        onChangeText={(peso) => setPeso(peso)}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("TelaFinalizado")}>
        <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CadastroAlturaPeso;
