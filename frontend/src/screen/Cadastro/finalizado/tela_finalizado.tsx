import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import ContinueButtonV2 from "../../../components/Cadastro/ContinuarV2/botao_continuar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import styles from "./styles";
import { setaVolta } from "../../../assets";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TelaFinalizado"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const TelaFinalizado: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.arrowContainer} // Ajuste o estilo
          onPress={() => navigation.navigate("TelaPPObjetivo")}
        >
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.headerlabel}>(5/5)</Text>
      </View>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerlabel}>Cadastro finalizado</Text>
          <Text style={styles.headerlabel}>Seja Bem-Vindo</Text>
        </View>
        <View style={styles.imagecontainer}>
          <Image
            source={require("../../../assets/finalizado.png")}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.buttoncontainer}>
        <ContinueButtonV2 onPress={() => navigation.navigate("Home")} />
      </View>
    </View>
  );
};

export default TelaFinalizado;
