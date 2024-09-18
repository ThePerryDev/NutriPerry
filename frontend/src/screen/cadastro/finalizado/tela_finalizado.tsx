import React from "react";
import { View, Text, Image } from "react-native";
import ContinueButtonV2 from "../../../components/Cadastro/ContinuarV2/botao_continuar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import styles from "./Styles";

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
}

export default TelaFinalizado;