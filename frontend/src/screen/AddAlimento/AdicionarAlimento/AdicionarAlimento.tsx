import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import { Table, Row, Rows } from 'react-native-table-component';
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta } from "../../../assets";
import styles from "./styles";
import UnidadePicker from "../../../components/Cadastro/PickerAlimentos/pickeralimentos";
import SaveButton from "../../../components/Cadastro/Salvar/botaosalvar";

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
  const [productName, setProductName] = useState<string>(""); // Estado para o nome do produto

  const UnityOptions = [
    { label: "", value: "" },
    { label: "grama (g)", value: "grama" },
    { label: "kilograma (kg)", value: "kilo" },
    { label: "mililitro (ml)", value: "ml" },
    { label: "litro (L)", value: "litro" },
  ];

  const tableHead = ['Dados Nutricionais', 'Valores por 100g/100ml', 'Valores que foram atribuídos'];
  const tableData = [
    ['Kcal', '-', '-'],
    ['Proteína', '-', '-'],
    ['Açúcar', '-', '-'],
    ['Gordura', '-', '-'],
    ['Gordura Saturada', '-', '-'],
    ['Fibra', '-', '-'],
    ['Sal', '-', '-'],
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
      <View style={styles.infocontainer}>
        <Text style={styles.infotitle}>{productName || "Nome do Produto"}</Text>
        <Table 
          borderStyle={{ borderWidth: 0}} style={{ marginHorizontal: 10, marginBottom: 15 }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.textHead} />
          <Rows data={tableData} style={styles.row} textStyle={styles.text} />
        </Table>
      </View>
      <View style={styles.savebuttoncontainer}>
        <SaveButton onPress={() => navigation.navigate("Home")} /*Alterar para salvar os dados no cliente*//>
      </View>
      <MenuInferior />
    </View>
  );
};

export default AdicionarAlimento;