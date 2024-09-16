import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import CustomPicker from "../../../../components/Cadastro/Picker/picker";
import ContinueButton from "../../../../components/Cadastro/Continuar/botao_continuar";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TelaPPObjetivo"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const TelaPPObjetivo: React.FC<Props> = ({ navigation }) => {
  const [selectGoal, setSelectGoal] = useState("");
  const [selectExerciseTime, setSelectExerciseTime] = useState("");

  const goalOptions = [
    { label: "Perder peso", value: "lose" },
    { label: "Manter peso", value: "keep" },
    { label: "Ganhar peso", value: "gain" },
  ];

  const exerciseTimeOptions = [
    { label: "15 a 30 minutos", value: "15-30" },
    { label: "30 a 45 minutos", value: "30-45" },
    { label: "45 a 60 minutos", value: "45-60" },
    { label: "Mais de 60 minutos", value: "+60" },
  ];

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.arrow}>
            <Image
              source={require("../../../../assets/setaVolta.png")}
              style={styles.arrow}
            />
          </TouchableOpacity>
          <Text style={styles.headerlabel}>(5/5)</Text>
        </View>

        <View style={styles.imagecontainer}>
          <Image
            source={require("../../../../assets/pp_objetivos.png")}
            style={styles.image}
          />
        </View>
        <CustomPicker
          label="Qual seu objetivo com o App?"
          selectedValue={selectGoal}
          onValueChange={(itemValue) => setSelectGoal(itemValue)}
          items={goalOptions}
        />
        <CustomPicker
          label="Quanto tempo se exercitando?"
          selectedValue={selectExerciseTime}
          onValueChange={(itemValue) => setSelectExerciseTime(itemValue)}
          items={exerciseTimeOptions}
        />
      </View>

      <View style={styles.buttoncontainer}>
        <ContinueButton onPress={() => navigation.navigate("TelaFinalizado")} />
      </View>
    </View>
  );
};

export default TelaPPObjetivo;
