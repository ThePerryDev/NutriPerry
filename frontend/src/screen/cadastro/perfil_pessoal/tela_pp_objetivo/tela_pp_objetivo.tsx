import React, { useState } from "react"; 
import { View, Text, TouchableOpacity, Image } from "react-native";
import CustomPicker from "../../../../components/Cadastro/Picker/picker";
import ContinueButton from "../../../../components/Cadastro/Continuar/botao_continuar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import styles from "./styles";
import { setaVolta } from "../../../../assets";
import { useUserCadastro } from "../../../../context/UserCadastroContext";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TelaPPObjetivo"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const TelaPPObjetivo: React.FC<Props> = ({ navigation }) => {
  const { updateUserData, createUser } = useUserCadastro(); 
  const [selectGoal, setSelectGoal] = useState<string>("");
  const [selectExerciseTime, setSelectExerciseTime] = useState<string>("");

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

  const { userData } = useUserCadastro();

  const handleContinue = async () => {
    try {
      // Atualiza o contexto e aguarda a finalização
      await updateUserData({ 
        goal: selectGoal, 
        activityLevel: selectExerciseTime 
      });

      // Prepara os dados para envio
      const userDataToSend = { 
        ...userData, 
        goal: selectGoal,
        activityLevel: selectExerciseTime,
      };

      console.log("userData enviado para o backend:", userDataToSend);

      // Chama a função para criar o usuário no banco de dados
      await createUser(userDataToSend);
      navigation.navigate("TelaFinalizado");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => navigation.navigate("CadastroAlturaPeso")}
          >
            <Image source={setaVolta} style={styles.arrow} />
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
        <ContinueButton onPress={handleContinue} />
      </View>
    </View>
  );
};

export default TelaPPObjetivo;
