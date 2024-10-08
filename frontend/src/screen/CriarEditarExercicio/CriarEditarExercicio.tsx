import React, { useState } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";
import { setaVolta } from "../../assets";
import MenuInferior from "../../components/MenuInferior/MenuInferior";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "FormExercicio"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const FormExercicio: React.FC<Props> = ({ navigation }) => {
  // Estados para os campos de texto
  const [nomeExercicio, setNomeExercicio] = useState("");
  const [tempo, setTempo] = useState("");
  const [calorias, setCalorias] = useState("");

  return (
    <View style={Styles.container}>
      <View style={Styles.headerContainer}>
        <TouchableOpacity
          style={Styles.arrow}
          onPress={() => navigation.navigate("SeusExercicios")}
        >
          <Image source={setaVolta} style={Styles.arrow} />
        </TouchableOpacity>
        <Text style={Styles.header}>Novo Exercício</Text>
      </View>

      <ScrollView style={Styles.form}>
        <TextInput
          style={Styles.input}
          placeholder="Escreva o exercício físico"
          value={nomeExercicio}
          onChangeText={setNomeExercicio}
        />
        <TextInput
          style={Styles.input}
          placeholder="Insira o tempo em minutos"
          value={tempo}
          keyboardType="numeric"
          onChangeText={setTempo}
        />
        <TextInput
          style={Styles.input}
          placeholder="Insira as calorias gastas"
          value={calorias}
          keyboardType="numeric"
          onChangeText={setCalorias}
        />
      </ScrollView>

      <View style={Styles.buttonContainer}>
        <TouchableOpacity style={Styles.saveButton}>
          <Text style={Styles.saveButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <MenuInferior navigation={navigation} />
    </View>
  );
};

// Estilos
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
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#0f9d58",
    borderRadius: 15,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    color: "#0f9d58",
  },
  buttonContainer: {
    marginBottom: 85,
  },
  saveButton: {
    backgroundColor: "#00AD71",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default FormExercicio;
