import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta, Deletar } from "../../../assets";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ConsumoAgua"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

type ConsumoAgregado = {
  _id: string; // A data do consumo
  totalQuantidade: number; // A quantidade total consumida nesse dia
};

const ConsumoAguaScreen: React.FC<Props> = ({ navigation }) => {
  const [consumos, setConsumos] = useState<ConsumoAgregado[]>([]);
  const [historico, setHistorico] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");

  useEffect(() => {
    const fetchConsumoAgua = async () => {
      try {
        const response = await axios.get(
          "http://192.168.56.1:3000/consumo-agua/670c7a910cad595a34ab9edf"
        );
        setConsumos(response.data);
      } catch (error) {
        console.error("Erro ao buscar o consumo de água:", error);
      }
    };

    fetchConsumoAgua();
  }, []);

  const handleAddConsumo = async () => {
    if (!historico || !data || !quantidade) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.56.1:3000/consumo-agua", {
        user: "670c7a910cad595a34ab9edf",
        quantidade: parseInt(historico),
        data: new Date(data).toISOString(),
        vezes: parseInt(quantidade),
      });

      // Atualizar lista corretamente
      const novoConsumo = response.data;

      setConsumos((prev) => [...prev, novoConsumo]);

      // Limpa os inputs
      setHistorico("");
      setData("");
      setQuantidade("");
    } catch (error) {
      console.error("Erro ao adicionar o consumo de água:", error);
    }
  };

  const renderItem = ({ item }: { item: ConsumoAgregado }) => (
    <View style={styles.row}>
      <Text style={styles.historico}>{item.totalQuantidade} ml</Text>
      <Text style={styles.data}>
        {new Date(item._id).toLocaleDateString()} {/* Exibir a data corretamente */}
      </Text>
      <TouchableOpacity style={styles.botao}>
        <Image source={Deletar} style={styles.icone} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.navigate("MenuDietas")}
        >
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Consumo de Água</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.columnHeaderHistorico}>Histórico (ml)</Text>
        <Text style={styles.columnHeaderData}>Data</Text>
        <Text style={styles.columnHeaderBotao}>Del.</Text>
      </View>

      <FlatList
        data={consumos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.spacer} />
      <View style={styles.row}>
        <Text style={styles.columnInputHistorico}>Histórico (ml)</Text>
        <Text style={styles.columnInputData}>Data</Text>
        <Text style={styles.columnInputBotao}>Qtd.</Text>
        <Text style={styles.columnInputSpacer}></Text>
      </View>

      <View style={styles.datacontainer}>
        <TextInput
          value={historico}
          onChangeText={setHistorico}
          style={styles.inputhistorico}
          keyboardType="numeric"
        />
        <TextInput
          value={data}
          onChangeText={setData}
          style={styles.inputdata}
        />
        <TextInput
          value={quantidade}
          onChangeText={setQuantidade}
          style={styles.inputquantidade}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleAddConsumo}>
          <Ionicons
            name="add-circle-outline"
            size={28}
            color="green"
            style={{ alignItems: "center", justifyContent: "center", marginTop: 10 }}
          />
        </TouchableOpacity>
      </View>

      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default ConsumoAguaScreen;
