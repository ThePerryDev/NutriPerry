import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Styles from "./Styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";
import MenuInferior from "../../components/MenuInferior/MenuInferior";
import Speedometer from "../../components/Speedometer";
import { AuthContext } from "../../context";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
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

const ProgressRing: React.FC<{
  progress: number;
  radius: number;
  strokeWidth: number;
  color: string;
}> = ({ progress, radius, strokeWidth, color }) => {
  const normalizedRadius = radius - strokeWidth;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Svg height={radius * 2} width={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
      <Circle
        stroke="#d3d3d3"
        fill="none"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <Circle
        stroke={color}
        fill="none"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      <SvgText x={radius} y={radius} fill="black" fontSize="16" fontWeight="bold" textAnchor="middle" dy=".3em">
        {progress > 0 ? `${Math.round(progress)}%` : "0%"}
      </SvgText>
    </Svg>
  );
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
  const [carboidratoObjetivo, setCarboidratoObjetivo] = useState<number>(0);
  const [proteinaObjetivo, setProteinaObjetivo] = useState<number>(0);
  const [acucarObjetivo, setAcucarObjetivo] = useState<number>(0);
  const [totalGastoCalorico, setTotalGastoCalorico] = useState<number>(0);
  const [loading, setLoading] = useState(true); // Para verificar o carregamento

  

  const fetchCaloriasConsumidas = async () => {
    const dataAtual = moment().format("YYYY-MM-DD");

    try {
      //console.log("ID do usuário:", user?.id);
      const response = await axios.get(`http://192.168.1.4:3000/consumos/totalkcal`, {
        params: { userId: user?.id, data: dataAtual }
      });

      const {
        totalKcal,
        totalCarboidrato,
        totalPeso,
        totalProteina,
        totalAcucar,
      } = response.data;

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
      const response = await axios.get(`http://192.168.1.4:3000/user/objetivo`, {
        params: { userId: user?.id }
      });

      const {
        kcalObjetivo,
        carboidratoObjetivo,
        proteinaObjetivo,
        acucarObjetivo,
      } = response.data;
      //console.log("Resposta com objetivos do servidor: ", response.data);

      setkcalObjetivo(kcalObjetivo ?? 0);
      setCarboidratoObjetivo(carboidratoObjetivo ?? 0);
      setProteinaObjetivo(proteinaObjetivo ?? 0);
      setAcucarObjetivo(acucarObjetivo ?? 0);
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dataAtual = moment().format("YYYY-MM-DD");

        const caloriasResponse = await axios.get("http://192.168.1.4:3000/consumos/totalkcal", {
          params: { userId: user?.id, data: dataAtual },
        });
        const objetivoResponse = await axios.get("http://192.168.1.4:3000/user/objetivo", {
          params: { userId: user?.id },
        });
        const gastoCaloricoResponse = await axios.get(`http://192.168.1.4:3000/gastocalorico/total/${user?.id}`, {
          params: { data: dataAtual },
        });

        setTotalCalorias(caloriasResponse.data.totalKcal ?? 0);
        setkcalObjetivo(objetivoResponse.data.kcalObjetivo ?? 0);
        setTotalGastoCalorico(gastoCaloricoResponse.data.totalGastoCalorico ?? 0);

        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  

  const fetchGastoCalorico = async () => {
    const dataAtual = moment().format("YYYY-MM-DD");

    try {
      const response = await axios.get(`http://192.168.1.4:3000/gastocalorico/total/${user?.id}`, {
        params: { data: dataAtual }
      });

      const { totalGastoCalorico } = response.data;

      console.log("Resposta do gasto calórico:", response.data);

      setTotalGastoCalorico(totalGastoCalorico ?? 0);
    } catch (error) {
      console.error("Erro ao buscar o gasto calórico", error);
    }
  };

  // useFocusEffect para fazer o fetch e calcular o progresso quando a tela é focada
 

  // Função onRefresh, que também atualizará o progress após o refresh
  const onRefresh = async () => {
    setRefreshing(true); // Inicia o processo de refresh
    fetchCaloriasConsumidas().then(() => setRefreshing(false));
    fetchObjetivo().then(() => setRefreshing(false));
    
    fetchGastoCalorico().then(() => setRefreshing(false));
    setRefreshing(false); // Após completar, define refreshing como false
  };

  useFocusEffect(
    useCallback(() => {
      fetchCaloriasConsumidas();
      fetchObjetivo();
     
      fetchGastoCalorico();
    }, [])
  );

  useEffect(() => {
    if (!loading && kcalObjetivo > 0) {
      const novoProgress = ((totalCalorias - totalGastoCalorico) / kcalObjetivo) * 100;
      setCurrentProgress(novoProgress);
    }
  }, [totalCalorias, kcalObjetivo, totalGastoCalorico, loading]);

  if (loading) {
    return <Text>Carregando...</Text>; // Exibe algo enquanto carrega
  }
  

  

  return (
    <View style={Styles.container}>
      <Text style={Styles.header}>Hoje</Text>
      <View style={Styles.card}>
        <View style={Styles.statsContainer}>
          <View style={Styles.stats}>
            <Text style={Styles.statLabel}>Gasto</Text>
            <Text style={Styles.statValue}>{`${totalGastoCalorico > 0 ? totalGastoCalorico.toFixed(0) : 0} Kcal`}</Text>
          </View>
          <View style={Styles.stats}>
            <Text style={Styles.totalText}>Total</Text>
            <Speedometer key = {progress} progress={progress} />
            <Text style={Styles.statSpeedometerValue}>{totalCalorias > 0 ? (((totalCalorias - totalGastoCalorico) / kcalObjetivo) * 100).toFixed(0) : "0"} %
            </Text>
            <Text style={Styles.statSpeedometerValue}>{totalCalorias > 0 ? (((totalCalorias - totalGastoCalorico))).toFixed(0) : "0"} Kcal
            </Text>
          </View>
          <View style={Styles.stats}>
            <Text style={Styles.statLabel}>Consumo</Text>
            <Text style={Styles.statValue}>{`${totalCalorias > 0 ? totalCalorias.toFixed(0) : 0} Kcal`}</Text>
          </View>
        </View>
      </View>

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={Styles.doubleCard}>
        {/* Calorias */}
        <View style={Styles.cardStats}>
          <Text style={Styles.totalText2}>Calorias</Text>
          <View style={Styles.progressContainer}>
            <ProgressRing
              progress={totalCalorias > 0 ? (totalCalorias / kcalObjetivo) * 100 : 0}
              radius={50}
              strokeWidth={10}
              color="#00cc99"
            />
            <View style={Styles.progressInfo}>
              <Text style={Styles.detailText}>
                {`Objetivo: ${kcalObjetivo.toFixed(0)} Kcal`}
              </Text>
              <Text style={Styles.detailText}>
                {`Consumido: ${
                  totalCalorias > 0 ? totalCalorias.toFixed(0) : 0
                } Kcal`}
              </Text>
            </View>
          </View>
        </View>
        {/* Carboidratos */}
        <View style={Styles.cardStats}>
          <Text style={Styles.totalText2}>Carboidratos</Text>
          <View style={Styles.progressContainer}>
            <ProgressRing
              progress={
                totalCarboidratos > 0
                  ? (totalCarboidratos / carboidratoObjetivo) * 100
                  : 0
              }
              radius={50}
              strokeWidth={10}
              color="#ffcc00"
            />
            {/* Carboidratos */}
            <View style={Styles.progressInfo}>
              <Text style={Styles.detailText}>
                {`Objetivo: ${carboidratoObjetivo.toFixed(0)}g`}
              </Text>
              <Text style={Styles.detailText}>
                {`Consumido: ${
                  totalCarboidratos > 0 ? totalCarboidratos.toFixed(0) : 0
                }g`}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={Styles.doubleCard}>
        {/* Proteínas */}
        <View style={Styles.cardStats}>
          <Text style={Styles.totalText2}>Proteínas</Text>
          <View style={Styles.progressContainer}>
            <ProgressRing
              progress={
                totalProteinas > 0
                  ? (totalProteinas / proteinaObjetivo) * 100
                  : 0
              }
              radius={50}
              strokeWidth={10}
              color="#337ab7"
            />
            <View style={Styles.progressInfo}>
              <Text style={Styles.detailText}>
                {`Objetivo: ${proteinaObjetivo.toFixed(0)}g`}
              </Text>
              <Text style={Styles.detailText}>
                {`Consumido: ${
                  totalProteinas > 0 ? totalProteinas.toFixed(0) : 0
                }g`}
              </Text>
            </View>
          </View>
        </View>
        {/* Açúcar */}
        <View style={Styles.cardStats}>
          <Text style={Styles.totalText2}>Açúcar</Text>
          <View style={Styles.progressContainer}>
            <ProgressRing
              progress={
                totalAcucar > 0 ? (totalAcucar / acucarObjetivo) * 100 : 0
              }
              radius={50}
              strokeWidth={10}
              color="#9c27b0"
            />
            <View style={Styles.progressInfo}>
              <Text
                style={Styles.detailText}
              >{`Objetivo: ${acucarObjetivo.toFixed(0)}g`}</Text>
              <Text style={Styles.detailText}>{`Consumido: ${
                totalAcucar > 0 ? totalAcucar.toFixed(0) : 0
              }g`}</Text>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default Home;
