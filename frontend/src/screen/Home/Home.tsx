import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { Dimensions } from "react-native";
import Styles from "./Styles";
import MenuInferior from "../../components/MenuInferior/MenuInferior";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";
import axios from "axios";
import { AuthContext } from "../../context";
import moment from "moment";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { useFocusEffect } from '@react-navigation/native';

type ContinuarScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const meals = ["Café da Manhã", "Almoço", "Jantar", "Lanches"];

const Home: React.FC<Props> = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;

  const [totalCarboidratos, setTotalCarboidratos] = useState<number>(0);
  const [totalPeso, setTotalPeso] = useState<number>(0);
  const [totalProteinas, setTotalProteinas] = useState<number>(0);
  const [totalAcucar, setTotalAcucar] = useState<number>(0);
  const [totalCalorias, setTotalCalorias] = useState<number>(0); 
  const [refreshing, setRefreshing] = useState(false); 
  const { user } = useContext(AuthContext);

  const objetivoCalorias = 2000;
  const objetivoCarboidratos = 250;
  const objetivoProteinas = 100;
  const objetivoAcucar = 50;

  const fetchCaloriasConsumidas = async () => {
    const dataAtual = moment().format("YYYY-MM-DD");

    try {
      const response = await axios.get(`http://192.168.0.128:3000/consumos/totalkcal`, {
        params: { userId: user?.id, data: dataAtual }
      });

      const { totalKcal, totalCarboidrato, totalPeso, totalProteina, totalAcucar } = response.data;

      console.log("Resposta do servidor:", response.data);

      setTotalCalorias(totalKcal ?? 0);
      setTotalCarboidratos(totalCarboidrato ?? 0);
      setTotalPeso(totalPeso ?? 0);
      setTotalProteinas(totalProteina ?? 0);
      setTotalAcucar(totalAcucar ?? 0);
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCaloriasConsumidas().then(() => setRefreshing(false));
  };

  // Chama a função toda vez que a tela for focada
  useFocusEffect(
    useCallback(() => {
      fetchCaloriasConsumidas();
    }, [])
  );

  const ProgressRing: React.FC<{ progress: number; radius: number; strokeWidth: number; color: string }> = ({ progress, radius, strokeWidth, color }) => {
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
        <SvgText
          x={radius}
          y={radius}
          fill="black"
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          dy=".3em"
        >
          {progress > 0 ? `${Math.round(progress)}%` : "0%"}
        </SvgText>
      </Svg>
    );
  };

  return (
    <View style={Styles.pageContainer}>
      <ScrollView 
        style={Styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={Styles.header}>Hoje</Text>

        {/* Calorias */}
        <View style={Styles.card}>
          <Text style={Styles.totalText}>Calorias</Text>
          <View style={Styles.progressContainer}>
            <ProgressRing 
              progress={totalCalorias > 0 ? (totalCalorias / objetivoCalorias) * 100 : 0} 
              radius={50} 
              strokeWidth={10} 
              color="#00cc99" 
            />
            <View style={Styles.progressInfo}>
              <Text style={Styles.detailText}>{`Objetivo: ${objetivoCalorias.toFixed(2)} Kcal`}</Text>
              <Text style={Styles.detailText}>{`Consumido: ${totalCalorias > 0 ? totalCalorias.toFixed(2) : 0} Kcal`}</Text>
            </View>
          </View>
        </View>


        {/* Carboidratos */}
        <View style={Styles.card}>
          <Text style={Styles.totalText}>Carboidratos</Text>
          <View style={Styles.progressContainer}>
            <ProgressRing progress={totalCarboidratos > 0 ? (totalCarboidratos / objetivoCarboidratos) * 100 : 0} radius={50} strokeWidth={10} color="#ffcc00" />
            <View style={Styles.progressInfo}>
              <Text style={Styles.detailText}>{`Objetivo: ${objetivoCarboidratos.toFixed(2)}g`}</Text>
              <Text style={Styles.detailText}>{`Consumido: ${totalCarboidratos > 0 ? totalCarboidratos.toFixed(2) : 0}g`}</Text>
            </View>
          </View>
        </View>

        {/* Proteínas */}
        <View style={Styles.card}>
          <Text style={Styles.totalText}>Proteínas</Text>
          <View style={Styles.progressContainer}>
            <ProgressRing progress={totalProteinas > 0 ? (totalProteinas / objetivoProteinas) * 100 : 0} radius={50} strokeWidth={10} color="#337ab7" />
            <View style={Styles.progressInfo}>
              <Text style={Styles.detailText}>{`Objetivo: ${objetivoProteinas.toFixed(2)}g`}</Text>
              <Text style={Styles.detailText}>{`Consumido: ${totalProteinas > 0 ? totalProteinas.toFixed(2) : 0}g`}</Text>
            </View>
          </View>
        </View>

        {/* Açúcar */}
        <View style={Styles.card}>
          <Text style={Styles.totalText}>Açúcar</Text>
          <View style={Styles.progressContainer}>
            <ProgressRing progress={totalAcucar > 0 ? (totalAcucar / objetivoAcucar) * 100 : 0} radius={50} strokeWidth={10} color="#9c27b0" />
            <View style={Styles.progressInfo}>
              <Text style={Styles.detailText}>{`Objetivo: ${objetivoAcucar.toFixed(2)}g`}</Text>
              <Text style={Styles.detailText}>{`Consumido: ${totalAcucar > 0 ? totalAcucar.toFixed(2) : 0}g`}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Menu Inferior fixo */}
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default Home;
