import React, { useState } from "react";
import {ScrollView, TextInput, TouchableOpacity, View, Text, Image,} from "react-native";
import styles from "./styles"
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import { setaVolta } from "../../../assets";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import axios from 'axios';
import moment from "moment";

const API_URL = 'http://192.168.1.4:3000/gastocalorico';
type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "NewExercicise"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const NewExercicise: React.FC<Props> = ({ navigation }) => {
  const [nomeExercicio, setNomeExercicio] = useState("");
  const [tempo, setTempo] = useState("");
  const [calorias, setCalorias] = useState("");

  const handleAdicionar = async () => {
    try {
      const formattedDate = moment().format("YYYY-MM-DD");

      const gastoCalorico = {
        userID: '67074140dbf77240420381b1', // substitua por um ID válido
        atividadeFisica: nomeExercicio,
        gastoCalorico: parseInt(calorias), // converte a string para um número
        data:formattedDate, // cria uma data atual
        tempo: parseInt(tempo), // converte a string para um número
      };

      console.log("Dados enviados para o backend:", gastoCalorico)
      await axios.post(API_URL, gastoCalorico);
      alert("Exercício adicionado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar exercício");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.navigate("SeusExercicios")}
        >
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Novo Exercício</Text>
      </View>
      <Text style={styles.explanation}>Escreva o exercício físico</Text>
      <TextInput
        value={nomeExercicio}
        onChangeText={(nomeExercicio) => setNomeExercicio(nomeExercicio)}
        style={styles.nameinput}
      />
      <Text style={styles.explanation}>Insira o tempo em minutos</Text>
      <TextInput
        value={tempo}
        onChangeText={(tempo) => setTempo(tempo)}
        style={styles.nameinput}
        keyboardType="numeric"
      />
      <Text style={styles.explanation}>Insira as calorias gastas</Text>
      <TextInput
        value={calorias}
        onChangeText={(calorias) => setCalorias(calorias)}
        style={styles.nameinput}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleAdicionar}>
          <Text style={styles.saveButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default NewExercicise;
