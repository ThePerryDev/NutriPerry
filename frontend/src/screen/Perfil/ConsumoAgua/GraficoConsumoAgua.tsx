import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./styles";
import { LineChart } from "react-native-gifted-charts";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta } from "../../../assets";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
import moment from "moment";

type ContinuarScreenNavigationProp = StackNavigationProp<RootStackParamList, "GraficoConsumoAgua">;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const GraficoConsumoAgua: React.FC<Props> = ({ navigation }) => {
  const periods = ["Semanal", "Mensal", "Anual"] as const;

  const [selectedRange, setSelectedRange] = useState<"Semanal" | "Mensal" | "Anual">("Semanal");
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [averageLastWeek, setAverageLastWeek] = useState(0);
  const [averageCurrentWeek, setAverageCurrentWeek] = useState(0);
  const [averageLastMonth, setAverageLastMonth] = useState(0);
  const [averageCurrentMonth, setAverageCurrentMonth] = useState(0);
  const [averageLastYear, setAverageLastYear] = useState(0);
  const [averageCurrentYear, setAverageCurrentYear] = useState(0);

  const { user } = useContext(AuthContext);
  const userId = user?.id;
  
  const fetchWeeklyData = async () => {
    try {
      const response = await fetch(`http://192.168.0.20:3000/consumo-agua/weekly/${userId}`);
      const data = await response.json();
      setAverageLastWeek(data.averageLastWeek);
      setAverageCurrentWeek(data.averageCurrentWeek);

      const formattedData = data.weeklyData.map((value: number, index: number) => ({
        value,
        dataPointText: value ? value.toString() : "0",
        label: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"][index],
      }));

      setWeeklyData(formattedData);
    } catch (error) {
      console.error("Erro ao buscar dados semanais:", error);
    }
  };

  const fetchMonthlyData = async () => {
    try {
      const response = await fetch(`http://192.168.0.20:3000/consumo-agua/monthly/${userId}`);
      const data = await response.json();
      setAverageLastMonth(data.averageLastMonth);
      setAverageCurrentMonth(data.averageCurrentMonth);

      const formattedData = data.monthlyData.map((value: number, index: number) => ({
        value,
        dataPointText: value ? value.toString() : "0",
        label: (index + 1).toString().padStart(2, '0'),
      }));

      setMonthlyData(formattedData);
    } catch (error) {
      console.error("Erro ao buscar dados mensais:", error);
    }
  };

  const fetchYearlyData = async () => {
    try {
      const response = await fetch(`http://192.168.0.20:3000/consumo-agua/yearly/${userId}`);
      const data = await response.json();
      setAverageLastYear(data.averageLastYear);
      setAverageCurrentYear(data.averageCurrentYear);

      const formattedData = data.yearlyData.map((value: number, index: number) => ({
        value,
        dataPointText: value ? value.toString() : "0",
        label: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][index],
      }));

      setYearlyData(formattedData);
    } catch (error) {
      console.error("Erro ao buscar dados anuais:", error);
    }
  };

  useEffect(() => {
    if (selectedRange === "Semanal") {
      fetchWeeklyData();
    } else if (selectedRange === "Mensal") {
      fetchMonthlyData();
    } else if (selectedRange === "Anual") {
      fetchYearlyData();
    }
  }, [selectedRange]);

  const getSubtitle = () => ({
    Semanal: "Última Semana",
    Mensal: "Último Mês",
    Anual: "Último Ano",
  })[selectedRange];

  // Função para obter o período de exibição no título do gráfico
  const getDisplayPeriod = () => {
    if (selectedRange === "Semanal") {
      const startOfWeek = moment().startOf("week").add(1, 'days'); // Segunda-feira
      const endOfWeek = moment().endOf("week").add(1, 'days'); // Domingo
      return `${startOfWeek.format("DD/MM/YYYY")} a ${endOfWeek.format("DD/MM/YYYY")}`;
    } else if (selectedRange === "Mensal") {
      const startOfMonth = moment().startOf("month");
      const endOfMonth = moment().endOf("month");
      return `${startOfMonth.format("DD/MM/YYYY")} a ${endOfMonth.format("DD/MM/YYYY")}`;
    } else if (selectedRange === "Anual") {
      const startOfYear = moment().startOf("year");
      const endOfYear = moment().endOf("year");
      return `${startOfYear.format("DD/MM/YYYY")} a ${endOfYear.format("DD/MM/YYYY")}`;
    }
    return "";
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("TelaPerfil")}>
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Água</Text>
      </View>
      <View style={styles.buttonsplit}>
        {periods.map((period) => (
          <TouchableOpacity key={period} onPress={() => setSelectedRange(period)}>
            <Text style={[styles.selectButtonText, selectedRange === period && styles.activeText]}>
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.infocontainer}>
        <Text style={styles.infotitle}>Média do Consumo de Água</Text>
        <View style={styles.infosplit}>
          <View>
            <Text style={styles.infosubtitle}>{getSubtitle()}</Text>
            <Text style={styles.infodata}>
              {selectedRange === "Semanal"
                ? averageLastWeek.toFixed(2)
                : selectedRange === "Mensal"
                ? averageLastMonth.toFixed(2)
                : averageLastYear.toFixed(2)}
            </Text>
          </View>
          <View>
            <Text style={styles.infosubtitle}>Atual</Text>
            <Text style={styles.infodata}>
              {selectedRange === "Semanal"
                ? averageCurrentWeek.toFixed(2)
                : selectedRange === "Mensal"
                ? averageCurrentMonth.toFixed(2)
                : averageCurrentYear.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.charttitle}>{getDisplayPeriod()}</Text>
        <LineChart
          initialSpacing={20}
          data={
            selectedRange === "Semanal" ? weeklyData : 
            selectedRange === "Mensal" ? monthlyData : 
            yearlyData
          }
          spacing={40}
          textColor1="#2C4B4E"
          height={200}
          xAxisLength={260}
          textShiftY={0}
          textShiftX={7}
          textFontSize={14}
          thickness={5}
          yAxisColor="#2C4B4E"
          xAxisColor="#2C4B4E"
          color="#FF725E"
          curved
          rulesLength={0}
          yAxisExtraHeight={15}
        />
      </View>
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default GraficoConsumoAgua;
