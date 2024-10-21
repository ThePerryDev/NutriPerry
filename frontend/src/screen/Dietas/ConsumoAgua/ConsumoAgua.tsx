import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta, Deletar } from "../../../assets";
import styles from "./styles";
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
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false); // Modal state

  const userId = "67144a9f8012077179c3e518"; // ID fixo

  useEffect(() => {
    const fetchConsumoAgua = async () => {
      try {
        const response = await axios.get(
          `http://192.168.18.46:3000/consumo-agua/${userId}`
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

    // Verificação do formato da data
    const regexData = /^\d{4}-\d{2}-\d{2}$/;
    if (!regexData.test(data)) {
      alert("Por favor, insira a data no formato AAAA-MM-DD.");
      return;
    }

    const dataObj = new Date(data);
    if (isNaN(dataObj.getTime())) {
      alert("Data inválida. Por favor, insira uma data válida.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.18.46:3000/consumo-agua", {
        user: userId,
        quantidade: parseInt(historico),
        data: dataObj.toISOString(),
        vezes: parseInt(quantidade),
      });

      const novoConsumo = response.data;
      setConsumos((prev) => [...prev, novoConsumo]);

      setHistorico("");
      setData("");
      setQuantidade("");
      setModalVisible(false); // Close modal after adding
    } catch (error) {
      console.error("Erro ao adicionar o consumo de água:", error);
    }
  };

  const handleDeleteConsumo = async (id: string) => {
    try {
      console.log(`Deletando consumo com ID: ${userId}`);
      await axios.delete(`http://192.168.18.46:3000/consumo-agua/${userId}`); // Usando o ID fixo
      setConsumos(consumos.filter((consumo) => consumo._id !== id)); // Atualiza a lista após exclusão
    } catch (error) {
      console.error("Erro ao deletar o consumo de água:", error);
    }
  };

  const renderItem = ({ item }: { item: ConsumoAgregado }) => (
    <View style={styles.row}>
      <Text style={styles.historico}>{item.totalQuantidade} ml</Text>
      <Text style={styles.data}>
        {new Date(item._id).toLocaleDateString()}
      </Text>
      <TouchableOpacity style={styles.botao} onPress={() => handleDeleteConsumo(item._id)}>
        <Image source={Deletar} style={styles.icone} />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => navigation.navigate("MonitorCalorico")}
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
          keyExtractor={(item) => item._id} // Use _id como key
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
        <TouchableOpacity
          style={styles.continuebutton}
          onPress={() => setModalVisible(true)} // Open modal
        >
          <Text style={styles.buttonText}>Novo Consumo</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Consumo de Água</Text>
            <TextInput
              value={historico}
              onChangeText={setHistorico}
              style={styles.input}
              placeholder="Quantidade em ml"
              keyboardType="numeric"
            />
            <TextInput
              value={data}
              onChangeText={setData}
              style={styles.input}
              placeholder="Data (AAAA-MM-DD)"
            />
            <TextInput
              value={quantidade}
              onChangeText={setQuantidade}
              style={styles.input}
              placeholder="Quantidade de vezes"
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddConsumo}
            >
              <Text style={styles.modalButtonText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {!isKeyboardVisible && <MenuInferior navigation={navigation} />}
    </KeyboardAvoidingView>
  );
};

export default ConsumoAguaScreen;
