import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Styles from "./Styles";
import { Configuração, Perfil, Receitas, TelaInicial } from "../../assets";
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
            <Speedometer />
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

/*<View style={Styles.MenuInferior}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={TelaInicial} style={Styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SeusExercicios")}>
          <Image source={Receitas} style={Styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Perfil} style={Styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Configuração} style={Styles.logo} />
        </TouchableOpacity>
      </View>*/
