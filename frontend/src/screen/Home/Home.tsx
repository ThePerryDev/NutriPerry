import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Styles from "./Styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";
import MenuInferior from "../../components/MenuInferior/MenuInferior";
import Speedometer from "../../components/Speedometer";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const [currentProgress, setCurrentProgress] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress((prev) => (prev >= 100 ? 0 : prev + 5));
    }, 1000); // Atualiza a cada 1 segundo

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, []);

  return (
    <View style={Styles.container}>
      <Text style={Styles.header}>Hoje</Text>
      <View style={Styles.card}>
        <View style={Styles.statsContainer}>
          <View style={Styles.stats}>
            <Text style={Styles.statLabel}>Gastos</Text>
            <Text style={Styles.statValue}>- calorias</Text>
          </View>
          <View style={Styles.stats}>
            <Text style={Styles.totalText}>Total</Text>
            <Speedometer progress={currentProgress} />
          </View>
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
            <TouchableOpacity
              onPress={() => navigation.navigate("PesquisaAlimento")}
            >
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
