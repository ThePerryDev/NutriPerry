import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { camera, setaVolta } from "../../../assets";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import NewDietButton from "../../../components/Cadastro/NovaDieta/novadieta";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MenuDietas"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const MenuDietas: React.FC<Props> = ({ navigation }) => {
  const [namediet, setNameDiet] = useState<string>("");

  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.navigate("MonitorCalorico")}
        >
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Suas Dietas</Text>
      </View>
      <View style={styles.searchcontainer}>
        <TextInput
          value={namediet}
          placeholder={"Pesquisar"}
          onChangeText={(name) => setNameDiet(name)}
          style={styles.input}
        />
      </View>
      <ScrollView>
        {["Café da Manhã", "Almoço", "Jantar", "Lanches"].map((meal, index) => (
          <View key={index} style={styles.mealItem}>
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{meal}</Text>
              <Text style={styles.mealDetail}>Sem cardápio cadastrado</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                switch (meal) {
                  case "Café da Manhã":
                    navigation.navigate("CafedaManha");
                    break;
                  case "Almoço":
                    navigation.navigate("Almoco");
                    break;
                  case "Jantar":
                    navigation.navigate("Jantar");
                    break;
                  case "Lanches":
                    navigation.navigate("Lanches");
                    break;
                  default:
                    break;
                }
              }}
            >
              <Ionicons name="add-circle-outline" size={28} color="green" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* 
      <View style={styles.dietbuttoncontainer}>
        <NewDietButton
          onPress={() =>
            navigation.navigate("Home")
          }
        />
      </View>
      */}
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default MenuDietas;
