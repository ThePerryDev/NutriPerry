import React from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Configuração,
  lupa,
  Perfil,
  Receitas,
  setaVolta,
  TelaInicial,
} from "../../assets";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";
import MenuInferior from "../../components/MenuInferior/MenuInferior";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SeusExercicios"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const SeusExercicios: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.headerContainer}>
        <TouchableOpacity
          style={Styles.arrow}
          onPress={() => navigation.navigate("MonitorCalorico")}
        >
          <Image source={setaVolta} style={Styles.arrow} />
        </TouchableOpacity>
        <Text style={Styles.header}>Seus Exercício</Text>
      </View>
      <View style={Styles.searchContainer}>
        <Image source={lupa} />
        <TextInput style={Styles.searchInput} placeholder="Procurar" />
      </View>
      <ScrollView>
        {["Caminhada", "Corrida", "Flexões", "Agachamentos"].map(
          (exercicio, index) => (
            <View key={index} style={Styles.mealItem}>
              <View style={Styles.mealInfo}>
                <Text style={Styles.mealName}>{exercicio}</Text>
                <Text style={Styles.mealDetail}>Calorias</Text>
              </View>
              <MaterialIcons
                name={"check-box-outline-blank"}
                size={24}
                style={Styles.checkBoxPlaceholder}
              />
              <TouchableOpacity>
                <Ionicons name="add-circle-outline" size={28} color="green" />
              </TouchableOpacity>
            </View>
          )
        )}
      </ScrollView>
      <View style={Styles.buttonContainer}>
        <TouchableOpacity style={Styles.addButton} onPress={() => navigation.navigate("FormExercicio")}>
          <Text style={Styles.addButtonText}>Criar novo exercício</Text>
        </TouchableOpacity>
      </View>
      <MenuInferior navigation={navigation} />
    </View>
  );
};

// Estilos com StyleSheet
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 65,
    marginBottom: 25,
    marginTop: 30,
  },
  arrow: {
    width: 30,
    height: 30,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C4B4E",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  checkBoxPlaceholder: {
    marginRight: 10,
  },

  exercicioItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },

  exercicioText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  exercicioCalorias: {
    fontSize: 14,
    color: "#666",
  },

  mealItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  mealInfo: {
    flex: 1,
    marginLeft: 10,
    color: "#2C4B4E",
  },

  mealName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C4B4E",
  },

  mealDetail: {
    fontSize: 14,
    color: "#2C4B4E",
  },

  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    marginBottom: 85,
  },
  addButton: {
    backgroundColor: "#00AD71",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default SeusExercicios;
