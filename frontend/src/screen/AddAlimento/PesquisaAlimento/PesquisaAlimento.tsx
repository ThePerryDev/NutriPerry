import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import AddAlimentoButton from "../../../components/Cadastro/Adicionar/adicionaralimento";
import { camera, setaVolta } from "../../../assets";
import styles from "./styles";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PesquisaAlimento"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const product = [
  { name: "Nome do Produto", kcal: 250, protein: 10, carb: 30 },
  { name: "Nome do ProdutoS", kcal: 5000, protein: 2000, carb: 5000},
  { name: "NomeS doS ProdutoS", kcal: 400, protein: 15, carb: 40 },
  { name: "NomeS do Produto", kcal: 150, protein: 5, carb: 20 },
];

const PesquisaAlimento: React.FC<Props> = ({ navigation }) => {
  const [nomeproduct, setNomeProduct] = useState<string>("");

  const renderProductItem = ({ item }: { item: { name: string, kcal: number, protein: number, carb: number } }) => (
    <View style={styles.ProductItem}>
      <Text style={styles.ProductName}>{item.name}</Text>
      <View style={styles.nutritionInfo}>
        <Text style={styles.nutritionText}>Kcal: {item.kcal}</Text>
        <Text style={styles.nutritionText}>Proteína: {item.protein}</Text>
        <Text style={styles.nutritionText}>Carb: {item.carb}</Text>
      </View>
      <View style={styles.buttoncontainer}>
        <AddAlimentoButton onPress={() => navigation.navigate("AdicionarAlimento")} />
      </View>
    </View>
  );

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
      <View style={styles.searchcontainer}>
        <TextInput
          value={nomeproduct}
          placeholder={"Pesquisar"}
          onChangeText={(nome) => setNomeProduct(nome)}
          style={styles.input}
        />
        <TouchableOpacity style={styles.camera} disabled={true}>
          <Image source={camera} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={product}
        keyExtractor={(item) => item.name}
        renderItem={renderProductItem}
        contentContainerStyle={styles.listContent}
      />
      <MenuInferior />
    </View>
  );
};

export default PesquisaAlimento;

