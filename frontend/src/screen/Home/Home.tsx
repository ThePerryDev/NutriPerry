import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";
import { MenuInferior } from "../../components";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hoje</Text>
      <View style={styles.card}>
        <Text style={styles.totalText}>Total</Text>
        <View style={styles.statsContainer}>
          <View style={styles.stats}>
            <Text style={styles.statLabel}>Gastos</Text>
            <Text style={styles.statValue}>- calorias</Text>
          </View>
          <View style={styles.chart}>
            <Text style={styles.totalCalories}>- calorias</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.statLabel}>Consumo</Text>
            <Text style={styles.statValue}>- gramas</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        {["Café da Manhã", "Almoço", "Jantar", "Lanches"].map((meal, index) => (
          <View key={index} style={styles.mealItem}>
            <MaterialIcons name={"check-box-outline-blank"} size={24} />
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{meal}</Text>
              <Text style={styles.mealDetail}>Sem cardápio cadastrado</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("PesquisaAlimento")}>
              <Ionicons name="add-circle-outline" size={28} color="green" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <MenuInferior />
    </View>
  );
};

export default Home;
