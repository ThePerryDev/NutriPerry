import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Styles from "./Styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";
import MenuInferior from "../../components/MenuInferior/MenuInferior";
import Checkbox from "expo-checkbox";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const meals = ["Café da Manhã", "Almoço", "Jantar", "Lanches"];

const Home: React.FC<Props> = ({ navigation }) => {
  // Estado para rastrear o checkbox de cada refeição
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(meals.length).fill(false));

  // Função para alterar o estado de um checkbox específico
  const handleCheckboxChange = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
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
          <View style={Styles.chart}>
            <Text style={Styles.totalCalories}>- calorias</Text>
          </View>
          <View style={Styles.stats}>
            <Text style={Styles.statLabel}>Consumo</Text>
            <Text style={Styles.statValue}>- gramas</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        {meals.map((meal, index) => (
          <View key={index} style={Styles.mealItem}>
            <Checkbox
              style={Styles.checkbox}
              value={checkedItems[index]}
              onValueChange={() => handleCheckboxChange(index)}
              color={checkedItems[index] ? Styles.checkbox.color : undefined}
            />
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
