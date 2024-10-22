import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Styles from "./Styles";
import MenuInferior from "../../components/MenuInferior/MenuInferior";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";
import axios from "axios"; // Importar axios para fazer requisições HTTP
import { AuthContext } from "../../context";
import moment from "moment"; // Importando moment para manipulação de datas

type ContinuarScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  
  const [selectedInfo, setSelectedInfo] = useState<string | null>(null);
  const [totalCalorias, setTotalCalorias] = useState<number>(0); // Estado para total de calorias
  const { user } = useContext(AuthContext);

  // Função para buscar calorias consumidas
  const fetchCaloriasConsumidas = async () => {
    const dataAtual = moment().format("YYYY-MM-DD"); // Obtendo a data atual formatada
    console.log("Data atual:", dataAtual);
    console.log("ID do usuário:", user?.id); // Logando o ID do usuário
  
    try {
      const response = await axios.get(`http://192.168.1.4:3000/consumos/totalkcal`, {
        params: { userId: user?.id, data: dataAtual } // Incluindo a data na requisição
      });
      console.log("Resposta do servidor:", response.data); // Logando a resposta do servidor
      const totalKcal = response.data.totalKcal; // Supondo que totalKcal está na resposta
      setTotalCalorias(totalKcal); // Atualiza o estado com o total de calorias consumidas
    } catch (error) {
      console.error("Erro ao buscar calorias consumidas", error);
      if (axios.isAxiosError(error)) {
        console.error("Erro de Axios:", error.message);
        console.error("Configuração da requisição:", error.config); // Logando a configuração da requisição
      }
    }
  };
  
  

  useEffect(() => {
    fetchCaloriasConsumidas(); // Chama a função ao montar o componente
  }, []);

  // Dados para o gráfico de donut
  const data = [
    {
      name: "Calorias Consumidas",
      calorias: totalCalorias, // Atualiza para usar o total de calorias
      color: "#00cc99",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Calorias Restantes",
      calorias: 600, // Você pode calcular isso dinamicamente se necessário
      color: "#d3d3d3",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  // Função para lidar com o clique na fatia do gráfico
  const handlePress = (index: number) => {
    const item = data[index];
    setSelectedInfo(`${item.calorias} ${item.name}`);
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.header}>Hoje</Text>
      <View style={Styles.card}>
        <Text style={Styles.totalText}>Total</Text>
        <View style={Styles.statsContainer}>
          <View style={Styles.stats}>
            <Text style={Styles.statLabel}>Gastos</Text>
            <Text style={Styles.statValue}>- calorias</Text>
          </View>

          {/* Gráfico de donut */}
          <PieChart
            data={data.map(item => ({
              name: item.name,
              population: item.calorias,
              color: item.color,
              legendFontColor: item.legendFontColor,
              legendFontSize: item.legendFontSize
            }))}
            width={screenWidth - 40} // Ajusta para o tamanho da tela
            height={220}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#eff3ff",
              backgroundGradientTo: "#efefef",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
            hasLegend={false} // Remove legenda original
          />

          {/* Camada interativa para cada fatia */}
          <View style={{ position: 'absolute', width: '100%', height: 220 }}>
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ flex: 1 }}
                onPress={() => handlePress(index)}
              />
            ))}
          </View>

          {/* Modal para mostrar informações */}
          {selectedInfo && (
            <Modal
              transparent={true}
              animationType="fade"
              visible={!!selectedInfo}
              onRequestClose={() => setSelectedInfo(null)}
            >
              <TouchableWithoutFeedback onPress={() => setSelectedInfo(null)}>
                <View style={Styles.modalBackground}>
                  <TouchableWithoutFeedback>
                    <View style={Styles.modalContent}>
                      <Text>{selectedInfo}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          )}

          <View style={Styles.stats}>
            <Text style={Styles.statLabel}>Consumo</Text>
            <Text style={Styles.statValue}>- gramas</Text>
          </View>
        </View>
      </View>

      <ScrollView>
        {["Café da Manhã", "Almoço", "Jantar", "Lanches"].map((meal, index) => (
          <View key={index} style={Styles.mealItem}>
            <MaterialIcons name={"check-box-outline-blank"} size={24} />
            <View style={Styles.mealInfo}>
              <Text style={Styles.mealName}>{meal}</Text>
              <Text style={Styles.mealDetail}>Sem cardápio cadastrado</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("PesquisaAlimento")}>
              <Ionicons name="add-circle-outline" size={28} color="green" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default Home;
