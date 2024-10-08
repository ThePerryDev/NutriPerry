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
      <View style={Styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={setaVolta} />
        </TouchableOpacity>
        <Text style={Styles.headerTitle}>Novo Exercício</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#0f9d58",
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    color: "#0f9d58",
  },
  buttonContainer: {
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#0f9d58",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FormExercicio;
