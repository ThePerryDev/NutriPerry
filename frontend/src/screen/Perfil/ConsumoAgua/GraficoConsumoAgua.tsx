import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./styles";
import { LineChart } from "react-native-gifted-charts";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta } from "../../../assets";
import React, { useState } from "react";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "GraficoConsumoAgua"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const GraficoConsumoAgua: React.FC<Props> = ({ navigation }) => {
  const WeeklineData = [
    { value: 2000, dataPointText: "2000", label:"Dom"},
    { value: 2000, dataPointText: "2000", label:"Seg" },
    { value: 1800, dataPointText: "1800", label:"Ter" },
    { value: 1700, dataPointText: "1700", label:"Qua" },
    { value: 2200, dataPointText: "2200", label:"Qui" },
    { value: 1900, dataPointText: "1800", label:"Sex" },
    { value: 2100, dataPointText: "2100", label:"Sab" },
  ];

  const MonthlineData = [
    { value: 2000, dataPointText: "2000", label:"01"},
    { value: 2000, dataPointText: "2000", label:"02" },
    { value: 1800, dataPointText: "1800", label:"03" },
    { value: 1700, dataPointText: "1700", label:"04" },
    { value: 2200, dataPointText: "2200", label:"05" },
    { value: 1900, dataPointText: "1800", label:"06" },
    { value: 2100, dataPointText: "2100", label:"07" },
    { value: 2000, dataPointText: "2000", label:"08"},
    { value: 2000, dataPointText: "2000", label:"09" },
    { value: 1800, dataPointText: "1800", label:"10" },
    { value: 1700, dataPointText: "1700", label:"11" },
    { value: 2200, dataPointText: "2200", label:"12" },
    { value: 1900, dataPointText: "1800", label:"13" },
    { value: 2100, dataPointText: "2100", label:"14" },
    { value: 2000, dataPointText: "2000", label:"15"},
    { value: 2000, dataPointText: "2000", label:"16" },
    { value: 1800, dataPointText: "1800", label:"17" },
    { value: 1700, dataPointText: "1700", label:"18" },
    { value: 2200, dataPointText: "2200", label:"19" },
    { value: 1900, dataPointText: "1800", label:"20" },
    { value: 2100, dataPointText: "2100", label:"21" },
    { value: 2000, dataPointText: "2000", label:"22"},
    { value: 2000, dataPointText: "2000", label:"23" },
    { value: 1800, dataPointText: "1800", label:"24" },
    { value: 1700, dataPointText: "1700", label:"25" },
    { value: 2200, dataPointText: "2200", label:"26" },
    { value: 1900, dataPointText: "1800", label:"27" },
    { value: 2100, dataPointText: "2100", label:"28" },
    { value: 1700, dataPointText: "1700", label:"29" },
    { value: 2200, dataPointText: "2200", label:"30" },
    { value: 1900, dataPointText: "1800", label:"31" },
  ];

  const YearlineData = [
    { value: 2000, dataPointText: "2000", label:"Jan"},
    { value: 2000, dataPointText: "2000", label:"Fev" },
    { value: 1800, dataPointText: "1800", label:"Mar" },
    { value: 1700, dataPointText: "1700", label:"Abr" },
    { value: 2200, dataPointText: "2200", label:"Mai" },
    { value: 1900, dataPointText: "1800", label:"Jun" },
    { value: 2100, dataPointText: "2100", label:"Jul" },
    { value: 2000, dataPointText: "2000", label:"Ago"},
    { value: 2000, dataPointText: "2000", label:"Set" },
    { value: 1800, dataPointText: "1800", label:"Out" },
    { value: 1700, dataPointText: "1700", label:"Nov" },
    { value: 2200, dataPointText: "2200", label:"Dez" },
  ];

  const [selectedRange, setSelectedRange] = useState("Mensal");
  const lineData = selectedRange === "Semanal" ? WeeklineData : selectedRange === "Mensal" ? MonthlineData : YearlineData;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.navigate("Home")}
        >
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Água</Text>
      </View>
      <View style={styles.buttonsplit}>
        <TouchableOpacity onPress={() => setSelectedRange("Semanal")}>
          <Text style={[styles.selectButtonText, selectedRange === "Semanal" && styles.activeText]}>
            Semanal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedRange("Mensal")}>
          <Text style={[styles.selectButtonText, selectedRange === "Mensal" && styles.activeText]}>
            Mensal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedRange("Anual")}>
          <Text style={[styles.selectButtonText, selectedRange === "Anual" && styles.activeText]}>
            Anual
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infocontainer}>
        <Text style={styles.infotitle}>Média do Consumo de Água</Text>
        <View style={styles.infosplit}>
          <View>
            <Text style={styles.infosubtitle}>Ultima Semana</Text>
            <Text style={styles.infodata}>0000</Text>
          </View>
          <View>
            <Text style={styles.infosubtitle}>Atual</Text>
            <Text style={styles.infodata}>9999</Text>
          </View>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.charttitle}>Consumo de Água</Text>
        <LineChart
          initialSpacing={20}
          data={lineData}
          spacing={40}
          textColor1="#2C4B4E"
          height={200}
          xAxisLength={260}
          textShiftY={0}
          textShiftX={7}
          textFontSize={14}
          thickness={5}
          yAxisColor="#2C4B4E"
          yAxisOffset={1400}
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
