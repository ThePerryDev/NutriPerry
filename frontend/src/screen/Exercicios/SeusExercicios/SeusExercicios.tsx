import React, { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View, Text, Image, } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { lupa, setaVolta } from "../../../assets";
import styles from "./styles"
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import Checkbox from "expo-checkbox";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SeusExercicios"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const meals = ["Caminhada", "Corrida", "Flexões", "Agachamentos"];


const SeusExercicios: React.FC<Props> = ({ navigation }) => {
    // Estado para rastrear o checkbox de cada refeição
    const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(meals.length).fill(false));

    // Função para alterar o estado de um checkbox específico
    const handleCheckboxChange = (index: number) => {
      const updatedCheckedItems = [...checkedItems];
      updatedCheckedItems[index] = !updatedCheckedItems[index];
      setCheckedItems(updatedCheckedItems);
    };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.navigate("MonitorCalorico")}
        >
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Seus Exercício</Text>
      </View>
      <View style={styles.searchContainer}>
        <Image source={lupa} />
        <TextInput style={styles.searchInput} placeholder="Procurar" />
      </View>
      <ScrollView>
        {["Caminhada", "Corrida", "Flexões", "Agachamentos"].map(
          (exercicio, index) => (
            <View key={index} style={styles.mealItem}>
              <View style={styles.mealInfo}>
                <Text style={styles.mealName}>{exercicio}</Text>
                <Text style={styles.mealDetail}>Calorias</Text>
              </View>
              <Checkbox
                style={styles.checkbox}
                value={checkedItems[index]}
                onValueChange={() => handleCheckboxChange(index)}
                color={checkedItems[index] ? styles.checkbox.color : undefined}
              />
              <TouchableOpacity>
                <Ionicons name="add-circle-outline" size={28} color="green" />
              </TouchableOpacity>
            </View>
          )
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("NewExercicise")}>
          <Text style={styles.addButtonText}>Criar novo exercício</Text>
        </TouchableOpacity>
      </View>
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default SeusExercicios;
