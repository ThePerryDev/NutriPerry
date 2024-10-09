import React from "react";
import { ScrollView, TextInput, TouchableOpacity, View, Text, Image,} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {lupa, setaVolta} from "../../../assets";
import styles from "./styles"
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SeusExercicios"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const SeusExercicios: React.FC<Props> = ({ navigation }) => {
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
              <MaterialIcons
                name={"check-box-outline-blank"}
                size={24}
                style={styles.checkBoxPlaceholder}
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
