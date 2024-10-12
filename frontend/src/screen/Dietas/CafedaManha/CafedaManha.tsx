import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta, Editar, Deletar } from "../../../assets";
import styles from "./styles";
import AddMealButton from "../../../components/Cadastro/AddAlimento/botaoaddalimento";
import axios from "axios";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CafedaManha"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

type Produto = {
  id: string;
  nome: string;
  quantidade: number;
};

const CafedaManha: React.FC<Props> = ({ navigation }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [totalKcal, setTotalKcal] = useState<number>(0);
  const [totalProteina, setTotalProteina] = useState<number>(0);
  const [totalCarboidrato, setTotalCarboidrato] = useState<number>(0);

  useEffect(() => {
    const fetchAlimentos = async () => {
      try {
        // Requisição para listar os alimentos por refeição
        const responseAlimentos = await axios.get("http://localhost:3000/consumos/alimento", {
          params: {
            userId: "67074140dbf77240420381b1", // Substitua pelo ID do usuário
            data: "2024-10-12", // Data no formato esperado (AAAA-MM-DD)
            tipoRefeicao: "cafe_da_manha" // Ajuste conforme necessário
          }
        });

        const alimentos = Object.entries(responseAlimentos.data).map(([nome, peso]) => ({
          id: nome, // Utilize o nome como ID temporário
          nome,
          quantidade: peso as number,
        }));
        setProdutos(alimentos);

        // Requisição para obter os totais de nutrientes
        const responseTotais = await axios.get("http://localhost:3000/consumos/listarconsumo", {
          params: {
            userId: "67074140dbf77240420381b1",
            data: "2024-10-12",
            tipoRefeicao: "cafe_da_manha"
          }
        });

        setTotalKcal(responseTotais.data.totalKcal);
        setTotalProteina(responseTotais.data.totalProteina);
        setTotalCarboidrato(responseTotais.data.totalCarboidrato);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchAlimentos();
  }, []);

  const renderItem = ({ item }: { item: Produto }) => (
    <View style={styles.row}>
      <Text style={styles.alimento}>{item.nome}</Text>
      <Text style={styles.quantidade}>{item.quantidade}</Text>
      <TouchableOpacity
        style={styles.botao}
        //onPress={() => navigation.navigate("AdicionarAlimento", { product: item })}
      >
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
            <Text style={styles.datainfo}>{totalKcal}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.datatext}>Proteínas</Text>
          <View style={styles.datashow}>
            <Text style={styles.datainfo}>{totalProteina}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.datatext}>Carboidratos</Text>
          <View style={styles.datashow}>
            <Text style={styles.datainfo}>{totalCarboidrato}</Text>
          </View>
        </View>
      </View>
      <View style={styles.AddMealButtoncontainer}>
        <AddMealButton onPress={() => navigation.navigate("PesquisaAlimento")} />
      </View>
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default CafedaManha;
