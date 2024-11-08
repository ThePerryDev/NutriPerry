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
import moment from "moment";

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
  const [nivelAtividade, setNivelAtividade] = useState<string>("");
  const [objetivo, setObjetivo] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [metabolismoBasal, setMetabolismoBasal] = useState<string>("");
  const [objetivoCalorico, setObjetivoCalorico] = useState<string>("");

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

  useEffect(() => {
    // Função para buscar os dados do usuário
    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://192.168.1.4:3000/user/objetivo?userId=${user?.id}`);
            if (!response.ok) {
                throw new Error("Erro ao buscar dados do usuário");
            }

            const data = await response.json();

            // Preenche os campos com os dados recebidos
            setNivelAtividade(data.activityLevel || "");
            setObjetivo(data.goal || "");
            setDataNascimento(moment.utc(data.birthdate).format("DD-MM-YYYY") || "");
            setMetabolismoBasal(data.taxaBasal.toFixed(2) ?? 0);
            setObjetivoCalorico(data.kcalObjetivo.toFixed(2) ?? 0);
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    };

    fetchUserData();
  }, [user?.id]);

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
        <View>
          <View style={styles.infoHeaderContainer}>
            <Text style={styles.username}>{`${userData.name} ${userData.nickname || ""}`}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infotitle}>Sexo:</Text>
            <Text style={styles.info}>{userData.gender}</Text>
            <Text style={styles.infotitle}>Idade:</Text>
            <Text style={styles.info}>{userData.birthdate ? calculateAge(userData.birthdate) : "N/A"} anos</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infotitle}>Altura:</Text>
            <Text style={styles.info}>{formatHeight(userData.height)} m</Text>
            <Text style={styles.infotitle}>Peso:</Text>
            <Text style={styles.info}>{userData.weight} kg</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infotitle}>Data de Nascimento:</Text>
            <Text style={styles.info}>{dataNascimento}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infotitle}>Nível de Atividade:</Text>
            <Text style={styles.info}>{nivelAtividade}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infotitle}>Objetivo: </Text>
            <Text style={styles.info}>{objetivo}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infotitle}>Metabolismo Basal:</Text>
            <Text style={styles.info}>{metabolismoBasal}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infotitle}>Objetivo Calórico:</Text>
            <Text style={styles.info}>{objetivoCalorico} kcal</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.infocarregando}>Carregando informações...</Text>
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
