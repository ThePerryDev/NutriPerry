import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import { RouteProp } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta } from "../../../assets";
import styles from "./styles";
import UnidadePicker from "../../../components/Cadastro/PickerAlimentos/pickeralimentos";
import SaveButton from "../../../components/Cadastro/Salvar/botaosalvar";
import { AlimentoTaco, Product } from "../../../types"; // Importar as interfaces

type ContinuarScreenNavigationProp = StackNavigationProp<RootStackParamList, "AdicionarAlimento">;

type Props = {
  navigation: ContinuarScreenNavigationProp;
  route: RouteProp<RootStackParamList, "AdicionarAlimento">; // Adicionando a tipagem para route
};

const AdicionarAlimento: React.FC<Props> = ({ navigation, route }) => {
  const [selectUnit, setSelectUnit] = useState("");
  const [quantidade, setQuantidade] = useState<string>("");

  // Obtendo o produto passado pela navegação
  const product = route.params?.product as AlimentoTaco | Product | undefined;

  // Função para obter dados nutricionais
  const getNutritionalData = () => {
    if (!product) return { kcal: '-', protein: '-', carbohydrate: '-' }; // Retorna valores padrão se product for undefined

    if ('energy' in product) {
      // Produto do tipo AlimentoTaco
      return {
        kcal: product.energy.value || '-',
        protein: product.protein.value || '-',
        carbohydrate: product.carbohydrate.value || '-',
      };
    } else if (product.nutriments) {
      // Produto do tipo Product
      return {
        kcal: product.nutriments['energy-kcal_100g'] || '-',
        protein: product.nutriments.proteins || '-',
        carbohydrate: product.nutriments.carbohydrates || '-',
      };
    }
    return {
      kcal: '-',
      protein: '-',
      carbohydrate: '-',
    };
  };

  // Dados nutricionais
  const { kcal, protein, carbohydrate } = getNutritionalData();

  // Atualizando o nome do produto
  const productName = product 
    ? ('description' in product ? product.description : product.product_name || "Nome do Produto")
    : "Nome do Produto"; // Nome padrão se o produto for undefined

  const tableData = [
    ['Kcal', kcal, '-'],
    ['Proteína', protein, '-'],
    ['Carboidrato', carbohydrate, '-'],
    ['Açúcar', '-', '-'],
    ['Gordura', '-', '-'],
    ['Gordura Saturada', '-', '-'],
    ['Fibra', '-', '-'],
    ['Sal', '-', '-'],
  ];

  const UnityOptions = [
    { label: "", value: "" },
    { label: "grama (g)", value: "grama" },
    { label: "kilograma (kg)", value: "kilo" },
    { label: "mililitro (ml)", value: "ml" },
    { label: "litro (L)", value: "litro" },
  ];

  const tableHead = ['Dados Nutricionais', 'Valores por 100g/100ml', 'Valores que foram atribuídos'];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("PesquisaAlimento")}>
          <Image source={setaVolta} style={styles.arrow} />
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
            onChangeText={(text) => setQuantidade(text)}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.infocontainer}>
        <Text style={styles.infotitle}>{productName}</Text>
        <Table borderStyle={{ borderWidth: 0 }} style={{ marginHorizontal: 10, marginBottom: 15 }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.textHead} />
          <Rows data={tableData} style={styles.row} textStyle={styles.text} />
        </Table>
      </View>
      <View style={styles.savebuttoncontainer}>
        <SaveButton onPress={() => navigation.navigate("Home")} /*Alterar para salvar os dados no cliente*/ />
      </View>
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default AdicionarAlimento;
