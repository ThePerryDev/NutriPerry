import React, { useState, useEffect, useContext } from "react";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta, Deletar } from "../../../assets";
import styles from "./styles";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../../../context/auth/AuthContext";

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
  const [data, setData] = useState<Date | undefined>(undefined);
  const [quantidade, setQuantidade] = useState<string>("");
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const { user } = useContext(AuthContext);
  const userId = user?.id;

  const fetchConsumoAgua = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.4:3000/consumo-agua/${userId}`
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
    if (userId) {
      fetchConsumoAgua();
    }
  }, [userId]);

  const handleAddConsumo = async () => {
    if (!quantidade || !data || !historico) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const dataFormatada = moment(data).format("YYYY-MM-DD");

    try {
      await axios.post("http://192.168.1.4:3000/consumo-agua", {
        user: userId,
        quantidade: parseInt(quantidade),
        data: dataFormatada,
        vezes: parseInt(historico),
      });

      fetchConsumoAgua();
      setHistorico("");
      setData(undefined);
      setQuantidade("");
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao adicionar o consumo de água:", error);
    }
  };

  const handleDeleteConsumo = async (date: string) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");

    try {
      await axios.delete(
        `http://192.168.1.4:3000/consumo-agua/${userId}/${formattedDate}`
      );

      setConsumos((prevConsumos) =>
        prevConsumos.filter((consumo) => consumo.date !== formattedDate)
      );
    } catch (error) {
      console.error("Erro ao deletar o consumo de água:", error);
      alert("Erro ao deletar consumo de água.");
    }
  };

  const renderItem = ({ item }: { item: ConsumoAgregado }) => (
    <View style={styles.row}>
      <Text style={styles.historico}>{item.totalQuantidade} ml</Text>
      <Text style={styles.data}>{moment(item.date).format("DD/MM/YYYY")}</Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => handleDeleteConsumo(item.date)}
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
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          style={{ flex: 1 }}
          extraData={consumos}
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
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.datePickerText}>
                {data ? moment(data).format("DD/MM/YYYY") : "Selecionar Data"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={data || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  setData(selectedDate || data);
                }}
              />
            )}
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
