import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta } from "../../../assets";
import styles from "./styles";
import { AuthContext } from "../../../context/";
import UserCadastroService, { UserProps } from "../../../services/UserCadastroService";
import { useFocusEffect } from "@react-navigation/native";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TelaPerfil"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const Perfil: React.FC<Props> = ({ navigation }) => {
  const { user } = useContext(AuthContext); 
  const [userData, setUserData] = useState<UserProps | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        if (user?.email) {
          try {
            const users = await UserCadastroService.listUsers();
            const loggedInUser = users.find(u => u.email === user.email);
            if (loggedInUser) {
              setUserData(loggedInUser);
            }
          } catch (error) {
            console.error("Erro ao buscar os dados do usuário:", error);
          }
        }
      };

      fetchUserData();
    }, [user])
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("Home")}>
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Perfil</Text>
      </View>
      {/* Exibição das informações do usuário */}
      {userData ? (
        <View style={styles.infoContainer}>
          <Text style={[styles.header, { marginBottom: 30 }]}>{`${userData.name} ${userData.nickname || ""}`}</Text>
          <Text style={[styles.info, { marginTop: 30 }]}>Sexo:         {userData.gender}</Text>
          <Text style={styles.info}>Idade:         {userData.birthdate ? calculateAge(userData.birthdate) : "N/A"} anos</Text>
          <Text style={styles.info}>Altura:          {formatHeight(userData.height)} m</Text>
          <Text style={styles.info}>Peso:              {userData.weight} kg</Text>
        </View>
      ) : (
        <Text style={styles.info}>Carregando informações...</Text>
      )}
      <View style={styles.botaoContainer}>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("TelaPeso")}>
        <Text style={styles.botaoTexto}>Peso</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("GraficoConsumoAgua")}>
        <Text style={styles.botaoTexto}>Gráfico Água</Text>
      </TouchableOpacity>
      </View>

      <MenuInferior navigation={navigation} />
    </View>
  );
};

// Função auxiliar para calcular a idade
const calculateAge = (birthdate: Date | string): number => {
  const birth = new Date(birthdate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1;
  }
  return age;
};

const formatHeight = (height: number): string => {
  return (height / 100).toFixed(2); // Divide por 100 e mantém 2 casas decimais
};

export default Perfil;
