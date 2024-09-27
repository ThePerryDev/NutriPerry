import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta } from "../../../assets";
import styles from "./styles";
import UnidadePicker from "../../../components/Cadastro/PickerAlimentos/pickeralimentos";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AdicionarAlimento"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const AdicionarAlimento: React.FC<Props> = ({ navigation }) => {
  const [selectUnit, setSelectUnit] = useState("");
  const [quantidade, setQuantidade] = useState<string>("");

  const UnityOptions = [
    { label: "", value: "" },
    { label: "grama (g)", value: "grama" },
    { label: "kilograma (kg)", value: "kilo" },
    { label: "mililitro (ml)", value: "ml" },
    { label: "litro (L)", value: "litro" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("Home")}>
          <Image
            source={setaVolta}
            style={styles.arrow}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Adicionar Alimento</Text>
      </View>
      <Text style={styles.explanation}>Selecione a unidade que vai consumir e insira a quantidade a consumir</Text>
      <View>
        <UnidadePicker
          label="Unidade:"
          selectedValue={selectUnit}
          onValueChange={(itemValue) => setSelectUnit(itemValue)}
          items={UnityOptions}
        />
        <View style={styles.quantitycontainer}>
          <Text style={styles.textgeral}>Quantidade:</Text>
          <TextInput
            value={quantidade}
            onChangeText={(quantidade) => setQuantidade(quantidade)}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
      </View>
      <MenuInferior />
    </View>
  );
};

export default AdicionarAlimento;

