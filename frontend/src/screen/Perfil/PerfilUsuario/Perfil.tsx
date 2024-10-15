import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta, Deletar } from "../../../assets";
import styles from "./styles";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TelaPeso"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

type Peso = {
  id: number;
  peso: string;
  data: string;
};

const pesos: Peso[] = [
  { id: 1, peso: "52,9", data: "08/10/2024" },
  { id: 2, peso: "52,2", data: "09/10/2024" },
  { id: 3, peso: "51,8", data: "10/10/2024" },
];

const Pesos: React.FC<Props> = ({ navigation }) => {
  const renderItem = ({ item }: { item: Peso }) => (
    <View style={styles.row}>
      <Text style={styles.historico}>{item.peso}</Text>
      <Text style={styles.data}>{item.data}</Text>
      <TouchableOpacity style={styles.botao} onPress={() => console.log("Deletar", item.id)}>
        <Image source={Deletar} style={styles.icone} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("MenuDietas")}>
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Peso</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.columnHeaderHistorico}>Histórico (kg)</Text>
        <Text style={styles.columnHeaderData}>Data</Text>
        <Text style={styles.columnHeaderBotao}>Del.</Text>
      </View>
      <View>
        <FlatList
          data={pesos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
      <View style={styles.spacer} />

      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default Pesos;
