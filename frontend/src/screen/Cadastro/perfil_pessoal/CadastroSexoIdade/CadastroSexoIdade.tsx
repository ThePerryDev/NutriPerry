import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { imagem3, setaVolta } from "../../../../assets";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import ContinueButton from "../../../../components/Cadastro/Continuar/botao_continuar";
import CustomPicker from "../../../../components/Cadastro/Picker/picker";
import { useUserCadastro } from "../../../../context/UserCadastroContext";
import DatePickerComponent from "../../../../components/Cadastro/DatePicker/datepicker";
import moment from "moment";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CadastroSexoIdade"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const CadastroSexoIdade: React.FC<Props> = ({ navigation }) => {
  const { updateUserData } = useUserCadastro();
  const [sexo, setSexo] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<Date>(moment().toDate()); // Garantindo que não seja undefined

  const genderOptions = [
    { label: "", value: "" },
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
  ];

  
  const handleContinue = () => {
    if (dataNascimento) {
      updateUserData({ gender: sexo, birthdate: moment(dataNascimento).format("YYYY-MM-DD") }); // Passa 'sexo' corretamente
      navigation.navigate("CadastroAlturaPeso");
      console.log(updateUserData);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.navigate("CadastroEmail")}
        >
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.headerlabel}>(3/5)</Text>
      </View>
      <Image source={imagem3} style={styles.image} resizeMode="contain" />
      <CustomPicker
        label="Insira seu sexo"
        selectedValue={sexo}
        onValueChange={(itemValue) => setSexo(itemValue)}
        items={genderOptions}
      />
      <Text style={styles.textgeral}>Insira sua data de nascimento</Text>
      <DatePickerComponent
        selectedDate={dataNascimento} // Agora é garantido que não será undefined
        onDateChange={setDataNascimento}
      />
      <View style={styles.buttoncontainer}>
        <ContinueButton onPress={handleContinue} />
      </View>
    </View>
  );
};

export default CadastroSexoIdade;
