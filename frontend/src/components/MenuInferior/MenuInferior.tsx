import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import Styles from "./Styles";
import { Configuração, Perfil, Receitas, TelaInicial } from "../../assets";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";

type NavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: NavigationProp;
};

const MenuInferior: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={Styles.MenuInferior}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image source={TelaInicial} style={Styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MonitorCalorico")}>
        <Image source={Receitas} style={Styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("GraficoConsumoAgua")}>
        <Image source={Perfil} style={Styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("TelaConfiguracoes")}>
        <Image source={Configuração} style={Styles.logo} />
      </TouchableOpacity>
    </View>
  );
};

export default MenuInferior;