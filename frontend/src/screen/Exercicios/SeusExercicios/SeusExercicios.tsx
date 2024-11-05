import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View, Text, Image, } from "react-native";
import { lupa, setaVolta } from "../../../assets";
import styles from "./styles"
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../../../context";

const API_URL = "http://192.168.18.72:3000/gastocalorico";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SeusExercicios"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

type Exercicios = {
  //id: number;
  //data: string;
  atividadeFisica: string;
  gastoCalorico: number;
  //tempo: number;
  //userID: string;
}


const SeusExercicios: React.FC<Props> = ({ navigation }) => {// Estado para rastrear o checkbox de cada refeição
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [exercicios, setExercicios] = useState<{ atividadeFisica: string, gastoCalorico: number }[]>([]); // Estado para armazenar os produtos
  const { user } = useContext(AuthContext);
  const [selectedExercise, setSelectedExercise] = useState<Exercicios | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchExercicios = async () => {
    try {
      const formattedDate = moment().format("YYYY-MM-DD");

      const responseExercicios = await axios.get(API_URL, {
        params: {
          userID: user?.id,
          data: formattedDate,
          atividadeFisica: "atividadeFisica",
        },
      });

      const exercicios = responseExercicios.data.map((exercicio: any) => ({
        id: exercicio.id,
        data: exercicio.data,
        atividadeFisica: exercicio.atividadeFisica,
        gastoCalorico: exercicio.gastoCalorico,
        tempo: exercicio.tempo,
        userID: exercicio.userID,
      }));

      setExercicios(exercicios); // Atualiza o estado com os dados recebidos

      setCheckedItems(Array(exercicios.length).fill(false)); // Agora você pode acessar a propriedade length
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchExercicios();
  }, []);

  const handleSearch = async (text: string) => {
    setSearchTerm(text);
    try {
      const responseExercicios = await axios.get(API_URL, {
        params: {
          userID: user?.id,
          data: moment().format("YYYY-MM-DD"),
          atividadeFisica: text,
        },
      });

      const exercicios = responseExercicios.data.map((exercicio: any) => ({
        //id: exercicio.id,
        //data: exercicio.data,
        atividadeFisica: exercicio.atividadeFisica,
        gastoCalorico: exercicio.gastoCalorico,
        //tempo: exercicio.tempo,
        //userID: exercicio.userID,
      }));

      setExercicios(exercicios);
      setSelectedExercise(exercicios[0]);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleExerciseClick = (exercise: Exercicios) => {
    setSelectedExercise(exercise);
    // Aqui você pode navegar para a tela desejada com o exercício selecionado
    // Exemplo: navigation.navigate("DetalhesExercicio", { exercise });
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
        <Text style={styles.header}>Seus Exercícios</Text>
      </View>
      <View style={styles.searchContainer}>
        <Image source={lupa} />
        <TextInput style={styles.searchInput} placeholder="Procurar"
          value={searchTerm}
          onChange={(event) => handleSearch(event.nativeEvent.text)}
        />
      </View>
      <ScrollView>
        {exercicios.filter((exercise) =>
            exercise.atividadeFisica
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .map(
          ((exercicio, index) => (
              <View key={index} style={styles.mealItem}>
                <TouchableOpacity
                onPress={() => handleExerciseClick(exercicio)}
              ></TouchableOpacity>
              <View style={styles.mealInfo}>
                <Text style={styles.mealName}>{exercicio.atividadeFisica}</Text>
                <Text style={styles.mealDetail}>{exercicio.gastoCalorico} kcal</Text>
              </View>
            </View>
          )
        ))}
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
