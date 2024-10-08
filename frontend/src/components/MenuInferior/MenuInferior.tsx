import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import Styles from "./Styles";
import { Configuração, Perfil, Receitas, TelaInicial } from "../../assets";

const MenuInferior = () => {
  return (
    <View style={Styles.MenuInferior}>
      <TouchableOpacity>
        <Image source={TelaInicial} style={Styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={Receitas} style={Styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={Perfil} style={Styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={Configuração} style={Styles.logo} />
      </TouchableOpacity>
    </View>
  );
};

export default MenuInferior;
