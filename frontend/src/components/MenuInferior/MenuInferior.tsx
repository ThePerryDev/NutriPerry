import React from "react";
import { View } from "react-native";
import Styles from "./Styles";
import { Configuração, Perfil, Receitas, TelaInicial } from "../../assets";
import { BotoesInferior } from "..";

const MenuInferior = () => {
  return (
    <View style={Styles.MenuInferior}>
      <BotoesInferior children={TelaInicial} />
      <BotoesInferior children={Receitas} />
      <BotoesInferior children={Perfil} />
      <BotoesInferior children={Configuração} />
    </View>
  );
};

export default MenuInferior;
