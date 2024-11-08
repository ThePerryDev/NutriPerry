import React, { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View, Text, Image, Alert, } from "react-native";
import { Deletar, lupa, setaVolta } from "../../../assets";
import styles from "./styles"
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import moment, { Moment } from "moment";
import axios from "axios";
import { AuthContext } from "../../../context";
import { useFocusEffect } from "@react-navigation/native";

const API_URL = "http://192.168.18.46:3000/gastocalorico";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SeusExercicios"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

type Exercicios = {
  id: string;
  data: string;
  atividadeFisica: string;
  gastoCalorico: number;
  tempo: number;
  //userID: string;
}




const SeusExercicios: React.FC<Props> = ({ navigation }) => {// Estado para rastrear o checkbox de cada refeição
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [exercicios, setExercicios] = useState<{ id: string, tempo: number, data: string, atividadeFisica: string, gastoCalorico: number }[]>([]); // Estado para armazenar os produtos
  const { user } = useContext(AuthContext);
  const [selectedExercise, setSelectedExercise] = useState<Exercicios | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchExercicios = async () => {
    try {
      // Garantir que o userID esteja presente
      if (!user?.id) {
        console.error("User ID não encontrado!");
        return;
      }
  
      // Construir a URL corretamente com o userID
      const responseExercicios = await axios.get(`http://192.168.18.46:3000/gastocalorico/gastos/${user.id}`);
  
      // A resposta já deve vir com todos os exercícios relacionados ao userID
      const exercicios = responseExercicios.data.map((exercicio: any) => ({
        id: exercicio._id, // O ID real do documento
        data: exercicio.data,
        atividadeFisica: exercicio.atividadeFisica,
        gastoCalorico: exercicio.gastoCalorico,
        tempo: exercicio.tempo,
        userID: exercicio.userID,
      }));
  
      // Ordenar os exercícios pela data mais recente
      exercicios.sort((a: Exercicios, b: Exercicios) => {
        return new Date(b.data).getTime() - new Date(a.data).getTime();
      });
      
  
      setExercicios(exercicios); // Atualiza o estado com os dados recebidos
      setCheckedItems(Array(exercicios.length).fill(false)); // Inicializa o estado para o checkbox
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
      // Garantir que o userID esteja presente
      if (!user?.id) {
        console.error("User ID não encontrado!");
        return;
      }
  
      // Chamada para o backend, passando o termo de pesquisa para o campo 'atividadeFisica'
      const responseExercicios = await axios.get(`http://192.168.18.46:3000/gastocalorico/gastos/${user.id}`, {
        params: {
          atividadeFisica: text, // Envia o termo de pesquisa
        },
      });
  
      const exercicios = responseExercicios.data.map((exercicio: any) => ({
        id: exercicio._id,  // O ID real do documento
        data: exercicio.data,
        atividadeFisica: exercicio.atividadeFisica,
        gastoCalorico: exercicio.gastoCalorico,
        tempo: exercicio.tempo,
      }));
  
      setExercicios(exercicios);  // Atualiza o estado com os exercícios filtrados
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };
  

  
  const handleDelete = async (id: string) => {
    Alert.alert(
      'Excluir Exercício',
      'Tem certeza que deseja excluir este exercício?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Deletar',
          onPress: async () => {
            try {
              // URL agora usa '/delete/:id', que é o parâmetro correto
              const response = await axios.delete(`http://192.168.18.46:3000/gastocalorico/delete/${id}`);
              console.log(response);
  
              // Atualiza o estado removendo o exercício deletado
              setExercicios((prevExercicios) => prevExercicios.filter(exercicio => exercicio.id !== id));
              Alert.alert('Sucesso', 'Exercício deletado com sucesso');
            } catch (error) {
              console.error("Erro ao deletar exercício:", error);
              Alert.alert('Erro', 'Não foi possível deletar o exercício');
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchExercicios();
    }, [])
  );
  

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
                  <Text style={styles.mealDetail}>{moment.utc(exercicio.data).format("DD-MM-YYYY")}</Text>
                  <Text style={styles.mealDetail}>{exercicio.gastoCalorico} kcal</Text>
                  <Text style={styles.mealDetail}>{exercicio.tempo} min</Text>
                </View>
                <TouchableOpacity style={styles.botao} onPress={() => handleDelete(exercicio.id)}>
                <Image source={Deletar} style={styles.icone} />
                </TouchableOpacity>
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
