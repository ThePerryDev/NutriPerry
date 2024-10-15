import React, { useContext, useState } from "react"; 
import { View, Text, TouchableOpacity, Image } from "react-native"; 
import CustomPicker from "../../../../components/Cadastro/Picker/picker"; 
import ContinueButton from "../../../../components/Cadastro/Continuar/botao_continuar"; 
import { StackNavigationProp } from "@react-navigation/stack"; 
import { RootStackParamList } from "../../../../types/rootStack"; 
import styles from "./styles"; 
import { setaVolta } from "../../../../assets"; 
import user from "../../../../services/userService"; 
import { useUserContext } from "../../../../context/userContext"; 

type ContinuarScreenNavigationProp = StackNavigationProp<RootStackParamList, "TelaPPObjetivo">;

type Props = { navigation: ContinuarScreenNavigationProp; };

const TelaPPObjetivo: React.FC<Props> = ({ navigation }) => {
  const { userData } = useUserContext(); 
  const [selectGoal, setSelectGoal] = useState(""); 
  const [selectExerciseTime, setSelectExerciseTime] = useState("");

  const goalOptions = [
    { label: "", value: "" },
    { label: "Perder peso", value: "perda de peso" },
    { label: "Manutenção de peso", value: "manutenção de peso" },
    { label: "Ganho de peso", value: "ganho de peso" },
  ];

  const exerciseTimeOptions = [
    { label: "", value: "" },
    { label: "Sedentário", value: "sedentario" },
    { label: "Pouco ativo", value: "pouco ativo" },
    { label: "Ativo", value: "ativo" },
    { label: "Muito ativo", value: "muito ativo" },
  ];

  const handleSubmit = async () => {
    const { email, password, name, nickname, height, weight, gender } = userData;
  
    if (selectGoal && selectExerciseTime) {
      try {
        await user.post({
          email,
          password,
          name,
          nickname,
          height,
          weight,
          activityLevel: selectExerciseTime,
          gender, 
          goal: selectGoal,
          birthdate: new Date(2020, 1, 2), 
          isLogged: true,
        });
        navigation.navigate("TelaFinalizado"); 
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao cadastrar. Tente novamente.");
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };
  
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.arrow}>
            <Image source={setaVolta} style={styles.arrow} />
          </TouchableOpacity>
          <Text style={styles.headerlabel}>(5/5)</Text>
        </View>

        <View style={styles.imagecontainer}>
          <Image source={require("../../../../assets/pp_objetivos.png")} style={styles.image} />
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
        <ContinueButton onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default TelaPPObjetivo;
