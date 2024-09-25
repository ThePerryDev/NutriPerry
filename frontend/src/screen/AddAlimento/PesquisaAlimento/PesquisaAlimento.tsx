import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Button, TextInput } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import styles from "./styles";
import AddAlimentoButton from "../../../components/Cadastro/Adicionar/adicionaralimento";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PesquisaAlimento"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const PesquisaAlimento: React.FC<Props> = ({ navigation }) => {
  const [nome, setNome] = useState<string>("");
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar Alimento</Text>
      <TextInput
                value={nome}
                onChangeText={(nome) => setNome(nome)}
                style={styles.input}
            />
      <ScrollView>
        {["Café da Manhã", "Almoço", "Jantar", "Lanches"].map((meal, index) => (
          <View key={index} style={styles.mealItem}>
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{meal}</Text>
              <Text style={styles.mealDetail}>Sem cardápio cadastrado</Text>
            </View>
            <View style={styles.buttoncontainer}>
              <AddAlimentoButton onPress={() => navigation.navigate("TelaFinalizado")} />
            </View>
          </View>
        ))}
      </ScrollView>
      <MenuInferior />
    </View>
  );
};

export default PesquisaAlimento;
