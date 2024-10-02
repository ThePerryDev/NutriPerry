import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { monitorcalorico, setaVolta } from "../../../assets";
import styles from "./styles";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MonitorCalorico"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const MonitorCalorico: React.FC<Props> = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("Home")}>
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Monitor Calórico</Text>
      </View>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.dietbutton} onPress={() => navigation.navigate("MenuDietas")}>
          <Text style={styles.diettext}>Dietas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dietbutton} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.diettext}>Exercícios</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imagecontainer}>
        <Image source={monitorcalorico} style={styles.image} />
      </View>
      <MenuInferior />
    </View>
  );
};

export default MonitorCalorico;
