import React, { useCallback, useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { camera, setaVolta } from "../../../assets";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import NewDietButton from "../../../components/Cadastro/NovaDieta/novadieta";
import moment from "moment";
import { AuthContext } from "../../../context";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MenuDietas"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const MenuDietas: React.FC<Props> = ({ navigation }) => {
  const [namediet, setNameDiet] = useState<string>("");
  const [totalKcalCafe, setTotalKcalCafe] = useState(0);
  const [totalKcalAlmoco, setTotalKcalAlmoco] = useState(0);
  const [totalKcalJantar, setTotalKcalJantar] = useState(0);
  const [totalKcalLanche, setTotalKcalLanche] = useState(0);
  const { user } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCafedaManha = async () => {
    try {
      const responseTotais = await axios.get("http://192.168.1.76:3000/consumos/listarconsumo", {
        params: {
          userId: user?.id,
          data: moment().format("YYYY-MM-DD"),
          tipoRefeicao: "cafe_da_manha",
        },
      });

      setTotalKcalCafe(responseTotais.data.totalKcal);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const fetchAlmoco = async () => {
    try {
      const responseTotais = await axios.get("http://192.168.1.76:3000/consumos/listarconsumo", {
        params: {
          userId: user?.id,
          data: moment().format("YYYY-MM-DD"),
          tipoRefeicao: "almoco",
        },
      });

      setTotalKcalAlmoco(responseTotais.data.totalKcal);

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const fetchJantar = async () => {
    try {
      const responseTotais = await axios.get("http://192.168.1.76:3000/consumos/listarconsumo", {
        params: {
          userId: user?.id,
          data: moment().format("YYYY-MM-DD"),
          tipoRefeicao: "jantar",
        },
      });

      setTotalKcalJantar(responseTotais.data.totalKcal);

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const fetchLanche = async () => {
    try {
      const responseTotais = await axios.get("http://192.168.1.76:3000/consumos/listarconsumo", {
        params: {
          userId: user?.id,
          data: moment().format("YYYY-MM-DD"),
          tipoRefeicao: "lanches",
        },
      });
      

      setTotalKcalLanche(responseTotais.data.totalKcal);

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCafedaManha().then(() => setRefreshing(false));
    fetchAlmoco().then(() => setRefreshing(false));
    fetchJantar().then(() => setRefreshing(false));
    fetchLanche().then(() => setRefreshing(false));
  };

  // Chama a função toda vez que a tela for focada
  useFocusEffect(
    useCallback(() => {
      fetchCafedaManha();
      fetchAlmoco();
      fetchJantar();
      fetchLanche();      
      
    }, [])
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.navigate("MonitorCalorico")}
        >
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Suas Dietas</Text>
      </View>
      <View style={styles.searchcontainer}>
        <TextInput
          value={namediet}
          placeholder={"Pesquisar"}
          onChangeText={(name) => setNameDiet(name)}
          style={styles.input}
        />
      </View>
      <ScrollView>
  {["Café da Manhã", "Almoço", "Jantar", "Lanches"].map((meal, index) => {
    let totalKcal = 0;

    // Associando o total de calorias correto para cada refeição
    switch (meal) {
      case "Café da Manhã":
        totalKcal = totalKcalCafe;
        break;
      case "Almoço":
        totalKcal = totalKcalAlmoco;
        break;
      case "Jantar":
        totalKcal = totalKcalJantar;
        break;
      case "Lanches":
        totalKcal = totalKcalLanche;
        break;
      default:
        totalKcal = 0;
    }

        return (
          <View key={index} style={styles.mealItem}>
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{meal}</Text>
              <Text style={styles.mealDetail}>{totalKcal} kcal</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                switch (meal) {
                  case "Café da Manhã":
                    navigation.navigate("CafedaManha");
                    break;
                  case "Almoço":
                    navigation.navigate("Almoco");
                    break;
                  case "Jantar":
                    navigation.navigate("Jantar");
                    break;
                  case "Lanches":
                    navigation.navigate("Lanches");
                    break;
                  default:
                    break;
                }
              }}
            >
              <Ionicons name="add-circle-outline" size={28} color="green" />
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>

      {/* 
      <View style={styles.dietbuttoncontainer}>
        <NewDietButton
          onPress={() =>
            navigation.navigate("Home")
          }
        />
      </View>
      */}
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default MenuDietas;
function setRefreshing(arg0: boolean) {
  throw new Error("Function not implemented.");
}