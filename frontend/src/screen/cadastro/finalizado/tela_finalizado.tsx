import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import ContinueButtonV2 from "../../../components/Cadastro/ContinuarV2/botao_continuar";

export default function TelaFinalizado() {
  const handleContinue = () => {
    console.log("Botão Continuar pressionado");
  };

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
        <ContinueButtonV2 onPress={handleContinue} />
      </View>
    </View>
  );
}
