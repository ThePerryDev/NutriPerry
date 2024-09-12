import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";

export default function TelaFinalizado() {

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
        <TouchableOpacity style={styles.continuebutton}>
          <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
