import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./styles";
import { LineChart } from "react-native-gifted-charts";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta } from "../../../assets";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "GraficoConsumoAgua"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const GraficoConsumoAgua: React.FC<Props> = ({ navigation }) => {
  const lineData = [
    { value: 1500, dataPointText: "1500" },
    { value: 2000, dataPointText: "2000" },
    { value: 1800, dataPointText: "1800" },
    { value: 1500, dataPointText: "1500" },
    { value: 2200, dataPointText: "2200" },
    { value: 1800, dataPointText: "1800" },
    { value: 2000, dataPointText: "2000" },
  ];

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
      <View style={{ paddingTop: 50, marginLeft:10 }}>
        <LineChart
          initialSpacing={0}
          data={lineData}
          spacing={35}
          textColor1="black" // Mudança de cor para mais contraste
          height={250}
          textShiftY={0}
          textShiftX={20}
          textFontSize={14} // Aumentar o tamanho da fonte
          thickness={6} // Espessura aumentada para destaque
          yAxisColor="#0BA5A4"
          yAxisOffset={1200}
          showVerticalLines
          verticalLinesColor="rgba(14,164,164,0.2)" // Reduzir opacidade das linhas verticais
          xAxisColor="#0BA5A4"
          color="#0BA5A4"
          curved
        />
      </View>
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default GraficoConsumoAgua;
