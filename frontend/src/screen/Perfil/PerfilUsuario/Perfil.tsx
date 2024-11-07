import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta, Deletar } from "../../../assets";
import styles from "./styles";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TelaPerfil"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};


const Perfil: React.FC<Props> = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("Home")}>
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Perfil</Text>
      </View>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("TelaPeso")}>
        <Text>Peso</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("GraficoConsumoAgua")}>
        <Text>Grafico Agua</Text>
      </TouchableOpacity>
      <View style={styles.spacer} />

      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default Perfil;
