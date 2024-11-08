import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Styles from "./Styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";
import MenuInferior from "../../components/MenuInferior/MenuInferior";
import Speedometer from "../../components/Speedometer";
import { AuthContext } from "../../context";
import axios from "axios";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import { RefreshControl } from "react-native";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const [progress, setCurrentProgress] = useState<number>(0);
  const [totalCalorias, setTotalCalorias] = useState<number>(0);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);
  const [kcalObjetivo, setkcalObjetivo] = useState<number>(0);
  const [totalCarboidratos, setTotalCarboidratos] = useState<number>(0);
  const [totalPeso, setTotalPeso] = useState<number>(0);
  const [totalProteinas, setTotalProteinas] = useState<number>(0);
  const [totalAcucar, setTotalAcucar] = useState<number>(0);
  const [totalCalorias, setTotalCalorias] = useState<number>(0); 
  const [refreshing, setRefreshing] = useState(false); 
  const { user } = useContext(AuthContext);
  const [totalGastoCalorico, setTotalGastoCalorico] = useState<number>(0);

  const objetivoCalorias = 2000;
  const objetivoCarboidratos = 250;
  const objetivoProteinas = 100;
  const objetivoAcucar = 50;

  const fetchCaloriasConsumidas = async () => {
    const dataAtual = moment().format("YYYY-MM-DD");

    try {
      //console.log("ID do usuário:", user?.id);
      const response = await axios.get(`http://192.168.0.20:3000/consumos/totalkcal`, {
        params: { userId: user?.id, data: dataAtual }
      });

      const { totalKcal, totalCarboidrato, totalPeso, totalProteina, totalAcucar } = response.data;

      //console.log("Resposta do servidor:", response.data);

      setTotalCalorias(totalKcal ?? 0);
      setTotalCarboidratos(totalCarboidrato ?? 0);
      setTotalPeso(totalPeso ?? 0);
      setTotalProteinas(totalProteina ?? 0);
      setTotalAcucar(totalAcucar ?? 0);
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  };

  const fetchObjetivo = async () => {
    try {
      //console.log("ID do usuário:", user?.id);
      const response = await axios.get(`http://192.168.0.20:3000/user/objetivo`, {
        params: { userId: user?.id }
      });

      const { kcalObjetivo, carboidratoObjetivo, proteinaObjetivo, acucarObjetivo } = response.data;
      //console.log("Resposta com objetivos do servidor: ", response.data);

      setkcalObjetivo(kcalObjetivo ?? 0);
      setCarboidratoObjetivo(carboidratoObjetivo ?? 0);
      setProteinaObjetivo(proteinaObjetivo ?? 0);
      setAcucarObjetivo(acucarObjetivo ?? 0);
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }

  const fetchGastoCalorico = async () => {
    const dataAtual = moment().format("YYYY-MM-DD");

    try {
      const response = await axios.get(`http://192.168.0.138:3000/gastocalorico/total/${user?.id}`, {
        params: { data: dataAtual }
      });

      const { totalGastoCalorico } = response.data;

      console.log("Resposta do gasto calórico:", response.data);

      setTotalGastoCalorico(totalGastoCalorico ?? 0);
    } catch (error) {
      console.error("Erro ao buscar o gasto calórico", error);
    }
  };
  

  const onRefresh = () => {
    setRefreshing(true);
    fetchCaloriasConsumidas().then(() => setRefreshing(false));
    fetchGastoCalorico().then(() => setRefreshing(false));
  };

  const fetchData = async () => {
    try {
      const dataAtual = moment().format("YYYY-MM-DD");

      // Buscando o total de calorias consumidas (exemplo com axios)
      const caloriasResponse = await axios.get("http://192.168.0.20:3000/consumos/totalkcal", {
        params: { userId: user?.id, data: dataAtual },
      });
      setTotalCalorias(caloriasResponse.data.totalKcal ?? 0);

      // Buscando o objetivo de calorias
      const objetivoResponse = await axios.get("http://192.168.0.20:3000/user/objetivo", {
        params: { userId: user?.id },
      });
      setkcalObjetivo(objetivoResponse.data.kcalObjetivo ?? 0);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  // useFocusEffect para fazer o fetch e calcular o progresso quando a tela é focada
  useFocusEffect(
    useCallback(() => {
      // Realiza o fetch de dados
      fetchData().then(() => {
        // Log de valores recebidos
        console.log("totalCalorias:", totalCalorias);
        console.log("kcalObjetivo:", kcalObjetivo);

        // Calcular o valor de progress depois de pegar os dados
        if (kcalObjetivo > 0) {
          const progress = (totalCalorias / kcalObjetivo) * 100;
          setCurrentProgress(progress);
          console.log("Novo valor de currentProgress:", progress);
        }
      });
    }, [totalCalorias, kcalObjetivo]) // Quando totalCalorias ou kcalObjetivo mudarem, refaz a lógica
  );
  
  // Função onRefresh, que também atualizará o progress após o refresh
  const onRefresh = async () => {
    setRefreshing(true); // Inicia o processo de refresh
    await fetchCaloriasConsumidas();
    await fetchObjetivo();
    await fetchData();
  
    setRefreshing(false); // Após completar, define refreshing como false
  };
  

  useFocusEffect(
    useCallback(() => {
      fetchCaloriasConsumidas();
      fetchObjetivo();
      fetchData();
      fetchGastoCalorico();
    }, [])
  );



  return (
    <View style={Styles.container}>
      
      <Text style={Styles.header}>Hoje</Text>
      <View style={Styles.card}>
        <View style={Styles.statsContainer}>
          <View style={Styles.stats}>
            <Text style={Styles.statLabel}>Gastos</Text>
            <Text style={Styles.statValue}>- calorias</Text>
          </View>
          <View style={Styles.stats}>
            <Text style={Styles.totalText}>Total</Text>
            <Speedometer key = {progress} progress={progress} />

        {/* Calorias */}
        <View style={Styles.card}>
          <Text style={Styles.totalText}>Calorias</Text>
          <View style={Styles.progressContainer}>
            <ProgressRing 
              progress={totalCalorias > 0 ? ((totalCalorias-totalGastoCalorico) / objetivoCalorias) * 100 : 0} 
              radius={50} 
              strokeWidth={10} 
              color="#00cc99" 
            />
            <View style={Styles.progressInfo}>
              <Text style={Styles.detailText}>{`Objetivo: ${objetivoCalorias.toFixed(2)} Kcal`}</Text>
              <Text style={Styles.detailText}>{`Consumido: ${totalCalorias > 0 ? totalCalorias.toFixed(2) : 0} Kcal`}</Text>
              <Text style={Styles.detailText}>{`Gasto: ${totalGastoCalorico > 0 ? totalGastoCalorico.toFixed(2) : 0} Kcal`}</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {["Café da Manhã", "Almoço", "Jantar", "Lanches"].map((meal, index) => (
          <View key={index} style={Styles.mealItem}>
            <MaterialIcons name={"check-box-outline-blank"} size={24} />
            <View style={Styles.mealInfo}>
              <Text style={Styles.mealName}>{meal}</Text>
              <Text style={Styles.mealDetail}>Sem cardápio cadastrado</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("PesquisaAlimento")}>
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