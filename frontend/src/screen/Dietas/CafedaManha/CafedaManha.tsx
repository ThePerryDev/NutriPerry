import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta, Editar, Deletar } from "../../../assets";
import styles from "./styles";
import AddMealButton from "../../../components/Cadastro/AddAlimento/botaoaddalimento";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CafedaManha"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

type Produto = {
  id: number;
  nome: string;
  quantidade: string;
};

const produtos: Produto[] = [
  { id: 1, nome: "Ovos", quantidade: "2" },
  { id: 2, nome: "Pão Integral", quantidade: "2" },
  { id: 3, nome: "Café", quantidade: "1" },
];

const CafedaManha: React.FC<Props> = ({ navigation }) => {
  const renderItem = ({ item }: { item: Produto }) => (
    <View style={styles.row}>
      <Text style={styles.alimento}>{item.nome}</Text>
      <Text style={styles.quantidade}>{item.quantidade}</Text>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("CadastrarAlimento")}>
        <Image source={Editar} style={styles.icone} />
      </TouchableOpacity>
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
        <Text style={styles.header}>Café da Manhã</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.columnHeaderAlimento}>Alimento</Text>
        <Text style={styles.columnHeaderQuantidade}>Qtd.</Text>
        <Text style={styles.columnHeaderBotao}>Edit.</Text>
        <Text style={styles.columnHeaderBotao}>Del.</Text>
      </View>
      <View>
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.datacontainer}>
        <View>
          <Text style={styles.datatext}>Calorias</Text>
          <View style={styles.datashow}>
            <Text style={styles.datainfo}>-</Text>
          </View>
        </View>
        <View>
          <Text style={styles.datatext}>Proteínas</Text>
          <View style={styles.datashow}>
            <Text style={styles.datainfo}>-</Text>
          </View>
        </View>
        <View>
          <Text style={styles.datatext}>Carboidratos</Text>
          <View style={styles.datashow}>
            <Text style={styles.datainfo}>-</Text>
          </View>
        </View>
      </View>

      <View style={styles.AddMealButtoncontainer}>
        <AddMealButton onPress={() => navigation.navigate("PesquisaAlimento")} />
      </View>

      <MenuInferior />
    </View>
  );
};

export default CafedaManha;
