import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, TextInput, Modal } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta, Deletar } from "../../../assets";
import styles from "./styles";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { AuthContext } from "../../../context/auth/AuthContext";
import axios from "axios";

type ContinuarScreenNavigationProp = StackNavigationProp<RootStackParamList, "TelaPeso">;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

type PesoAgregado = {
  _id: string;
  date: string;
  userId: string;
  documentoId: string;
  peso: string; // Adicionando peso aqui
};

const Pesos: React.FC<Props> = ({ navigation }) => {
  const [pesos, setPesos] = useState<PesoAgregado[]>([]);
  const [peso, setPeso] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [data, setData] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const { user } = useContext(AuthContext);
  const userId = user?.id; // Usando optional chaining para evitar erro se user for null

  const fetchPeso = async () => {
    if (!userId) return; // Não faz a chamada se o userId não estiver definido

    try {
      const response = await axios.get(`http://192.168.0.128:3000/peso/${userId}`);
      const pesosFormatados = response.data.map((peso: any) => ({
        _id: peso.documentoId,
        date: peso.date,
        userId: peso.userId,
        peso: peso.peso, // Adicionando peso à estrutura
      }));
      setPesos(pesosFormatados);
    } catch (error) {
      console.error("Erro ao buscar o peso:", error);
    }
  };

  useEffect(() => {
    fetchPeso(); // Chama a função para buscar pesos sempre que userId muda
  }, [userId]);

  const handleAddPeso = async () => {
    if (!peso || !data) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const dataFormatada = moment(data).format("YYYY-MM-DD");

    try {
      await axios.post("http://192.168.0.128:3000/peso", {
        user: userId,
        peso: parseInt(peso),
        data: dataFormatada,
      });

      fetchPeso();
      setPeso("");
      setData(undefined);
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao adicionar o peso:", error);
    }
  };

  const handleDeletePeso = async (id: string) => {
    try {
      await axios.delete(`http://192.168.0.128:3000/peso/${userId}/${id}`);
      // Atualiza a lista local removendo o peso deletado
      setPesos((prevPesos) => prevPesos.filter((peso) => peso._id !== id));
    } catch (error) {
      console.error("Erro ao deletar o peso:", error);
      alert("Erro ao deletar peso.");
    }
  };

  const renderItem = ({ item }: { item: PesoAgregado }) => (
    <View style={styles.row}>
      <Text style={styles.historico}>{item.peso} kg</Text>
      <Text style={styles.data}>{moment(item.date).format("DD/MM/YYYY")}</Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => handleDeletePeso(item._id)} // Passando o ID correto
      >
        <Image source={Deletar} style={styles.icone} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("MenuDietas")}>
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Peso</Text>
      </View>

      {/* Títulos das colunas */}
      <View style={styles.row}>
        <Text style={styles.columnHeaderHistorico}>Histórico (kg)</Text>
        <Text style={styles.columnHeaderData}>Data</Text>
        <Text style={styles.columnHeaderBotao}>Del.</Text>
      </View>

      {/* Lista de Pesos */}
      <FlatList
        data={pesos}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={styles.continuebutton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Novo Peso</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Novo Peso</Text>
            <TextInput
              value={peso}
              onChangeText={setPeso}
              style={styles.input}
              placeholder="Peso em kg"
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
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddPeso} // A função de adicionar peso deve ser chamada aqui
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

      {/* Menu Inferior */}
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default Pesos;
