import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import ContinueButtonV2 from "../../../components/Cadastro/ContinuarV2/botao_continuar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import styles from "./styles";
import { setaVolta } from "../../../assets";
import { useUserCadastro } from "../../../context/UserCadastroContext";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TelaFinalizado"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const TelaFinalizado: React.FC<Props> = ({ navigation }) => {
  const { createUser, userData } = useUserCadastro();

  useEffect(() => {
    const registerUser = async () => {
      try {
        // Chama a função para criar o usuário no banco de dados
        await createUser(userData);
        console.log("Usuário criado com sucesso:", userData);
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
      }
    };

    registerUser();
  }, [userData]);

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
        <ContinueButtonV2 onPress={() => navigation.navigate("TelaLogin")} />
      </View>
    </View>
  );
};

export default TelaFinalizado;
