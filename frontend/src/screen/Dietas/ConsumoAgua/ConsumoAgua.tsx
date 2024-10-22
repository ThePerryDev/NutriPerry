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
  date: string; // Data formatada
  totalQuantidade: number; // A quantidade total consumida nesse dia
  userId: string; // ID do usuário
  documentoId: string; // ID do documento
};

const ConsumoAguaScreen: React.FC<Props> = ({ navigation }) => {
  const [consumos, setConsumos] = useState<ConsumoAgregado[]>([]);
  const [historico, setHistorico] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false); // Modal state

  const userId = "6716f8c9bc779d5cf46b5871"; // ID fixo

  useEffect(() => {
    const fetchConsumoAgua = async () => {
      try {
        const response = await axios.get(
          `http://10.68.55.124:3000/consumo-agua/${userId}`
        );
        // Formata a resposta
        const consumosFormatados = response.data.map((consumo: any) => ({
          _id: consumo.documentoId, // Usar documentoId como _id
          date: consumo.date,
          totalQuantidade: consumo.totalQuantidade,
          userId: consumo.userId,
        }));
        setConsumos(consumosFormatados);
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
      const response = await axios.post("http://10.68.55.124:3000/consumo-agua", {
        user: "6716f8c9bc779d5cf46b5871",
        quantidade: parseInt(historico),
        data: dataObj.toISOString(),
        vezes: parseInt(quantidade),
      });
  
      // Ajuste a estrutura do novo consumo recebido
      const novoConsumo = {
        _id: response.data.documentoId, // Certifique-se de que documentoId está sendo retornado
        date: response.data.date, // Verifique se a data está sendo retornada corretamente
        totalQuantidade: response.data.totalQuantidade, // Certifique-se de que este campo está presente
        userId: response.data.userId, // Verifique se o userId está sendo retornado
      };
  
      setConsumos((prev) => [...prev, novoConsumo]);
  
      setHistorico("");
      setData("");
      setQuantidade("");
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao adicionar o consumo de água:", error);
    }
  };
  

  const handleDeleteConsumo = async (id: string) => {
    try {
      console.log(`Deletando consumo com ID: ${id}`);
      await axios.delete(`http://10.68.55.124:3000/consumo-agua/${id}`); // Usando o ID fixo
      setConsumos(consumos.filter((consumo) => consumo._id !== id)); // Atualiza a lista após exclusão
    } catch (error) {
      console.error("Erro ao deletar o consumo de água:", error);
    }
  };

  const renderItem = ({ item }: { item: ConsumoAgregado }) => (
    <View style={styles.row}>
      <Text style={styles.historico}>{item.totalQuantidade} ml</Text>
      <Text style={styles.data}>
        {new Date(item.date).toLocaleDateString()} {/* Usar item.date */}
      </Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => handleDeleteConsumo(item._id)}
      >
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
          onPress={() => setModalVisible(true)} // Abre o modal
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
