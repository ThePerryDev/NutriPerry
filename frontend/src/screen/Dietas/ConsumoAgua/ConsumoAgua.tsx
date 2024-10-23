import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
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
import moment from "moment";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ConsumoAgua"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

type ConsumoAgregado = {
  _id: string;
  date: string;
  totalQuantidade: number;
  userId: string;
  documentoId: string;
};

const ConsumoAguaScreen: React.FC<Props> = ({ navigation }) => {
  const [consumos, setConsumos] = useState<ConsumoAgregado[]>([]);
  const [historico, setHistorico] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const userId = "67181fa58c9c26206b523e3a"; // ID fixo

  const fetchConsumoAgua = async () => {
    try {
      const response = await axios.get(
        `http://10.68.55.203:3000/consumo-agua/${userId}`
      );
      const consumosFormatados = response.data.map((consumo: any) => ({
        _id: consumo.documentoId,
        date: consumo.date,
        totalQuantidade: consumo.totalQuantidade,
        userId: consumo.userId,
      }));
      setConsumos(consumosFormatados);
    } catch (error) {
      console.error("Erro ao buscar o consumo de água:", error);
    }
  };

  useEffect(() => {
    fetchConsumoAgua();
  }, [consumos]); // Agora, o useEffect será chamado sempre que o estado consumos mudar

  const handleAddConsumo = async () => {
    if (!historico || !data || !quantidade) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const dataMoment = moment(data, "YYYY-MM-DD", true);
    if (!dataMoment.isValid()) {
      alert("Por favor, insira a data no formato AAAA-MM-DD.");
      return;
    }

    const dataFormatada = dataMoment.toISOString();

    try {
      await axios.post("http://10.68.55.203:3000/consumo-agua", {
        user: userId,
        quantidade: parseInt(historico),
        data: dataFormatada,
        vezes: parseInt(quantidade),
      });

      // Recarregar os dados da API após adicionar um novo consumo
      fetchConsumoAgua();

      setHistorico("");
      setData("");
      setQuantidade("");
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao adicionar o consumo de água:", error);
    }
  };

  const handleDeleteConsumo = async (date: string) => {
    try {
      await axios.delete(`http://10.68.55.203:3000/consumo-agua/${userId}/${date}`);
      // Recarregar os dados da API após deletar um consumo
      fetchConsumoAgua();
    } catch (error) {
      console.error("Erro ao deletar o consumo de água:", error);
    }
  };

  const renderItem = ({ item }: { item: ConsumoAgregado }) => (
    <View style={styles.row}>
      <Text style={styles.historico}>{item.totalQuantidade} ml</Text>
      <Text style={styles.data}>
        {moment(item.date).format("DD/MM/YYYY")}
      </Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => handleDeleteConsumo(item.date)} // Passa a data para o delete
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
      <View style={styles.container}>
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
          keyExtractor={(item, index) => item._id || index.toString()} // Adicionei index como fallback
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          style={{ flex: 1 }}
          extraData={consumos} // Força o FlatList a re-renderizar quando o estado mudar
        />

        <TouchableOpacity
          style={styles.continuebutton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Novo Consumo</Text>
        </TouchableOpacity>
      </View>

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
