import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, TextInput, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta, Deletar } from "../../../assets";
import styles from "./styles";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { AuthContext } from "../../../context/auth/AuthContext";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

type ContinuarScreenNavigationProp = StackNavigationProp<RootStackParamList, "TelaPeso">;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

type PesoAgregado = {
  _id: string;
  date: string;
  userId: string;
  documentoId: string;
  peso: string;
};

const Pesos: React.FC<Props> = ({ navigation }) => {
  const [pesos, setPesos] = useState<PesoAgregado[]>([]);
  const [peso, setPeso] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [data, setData] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const [idade, setIdade] = useState<string>("");
  const [altura, setAltura] = useState<string>("");
  const [nivelAtividade, setNivelAtividade] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [objetivo, setObjetivo] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [metabolismoBasal, setMetabolismoBasal] = useState<string>("");
  const [objetivoCalorico, setObjetivoCalorico] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);
  const userId = user?.id;
  
  
    const fetchPeso = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`http://192.168.0.107:3000/peso/${userId}`);
        const pesosFormatados = response.data.map((peso: any) => ({
          _id: peso.documentoId,
          date: peso.date,
          userId: peso.userId,
          peso: peso.peso,
        }));
        setPesos(pesosFormatados);
      } catch (error) {
        console.error("Erro ao buscar o peso:", error);
      }
    };

    const fetchUserData = async () => {
      try {
          const response = await fetch(`http://192.168.0.107:3000/user/objetivo?userId=${user?.id}`);
          if (!response.ok) {
              throw new Error("Erro ao buscar dados do usuário");
          }

          const data = await response.json();

          console.log("Dados do usuário recebidos:", data);

          // Preenche os campos com os dados recebidos
          setAltura(data.height?.toString() || "");
          setPeso(data.weight?.toString() || "");
          setNivelAtividade(data.activityLevel || "");
          setGender(data.gender || "");
          setObjetivo(data.goal || "");
          setDataNascimento(moment(data.birthdate).format("DD-MM-YYYY") || "");
          setMetabolismoBasal(data.taxaBasal?.toString() || "");
          setObjetivoCalorico(data.kcalObjetivo?.toString() || "");
      } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
      }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPeso();
      fetchUserData();
    }, [])
  );



  // ----------------HANDLE UPDATE


  const handleUpdate = async () => {
  if (!peso || !altura || !nivelAtividade || !objetivo || !dataNascimento) {
  alert("Por favor, preencha todos os campos.");
  return;
  }

  const dataAtualizada = {
  userId: userId,
  weight: parseFloat(peso),
  height: parseFloat(altura),
  activityLevel: nivelAtividade,
  goal: objetivo,
  birthdate: moment.utc(dataNascimento, "DD-MM-YYYY").format("YYYY-MM-DD")  // Formatando corretamente a data
  };

  console.log("dados enviados para update: ", dataAtualizada);

  try {
  const response = await axios.put(`http://192.168.0.107:3000/user/atualizarpeso/${user?.id}`, dataAtualizada);


  if (response.status === 200) {
  alert("Dados atualizados com sucesso!");

  // Chama o fetchUserData após a atualização para garantir que os dados sejam atualizados corretamente na interface
  fetchUserData();

  // Limpar campos somente se necessário, você pode deixar como está ou evitar limpar caso queira manter a UI atualizada
  setPeso(dataAtualizada.weight.toString());
  setAltura(dataAtualizada.height.toString());
  setNivelAtividade(dataAtualizada.activityLevel);
  setObjetivo(dataAtualizada.goal);
  setDataNascimento(moment(dataAtualizada.birthdate).format("DD-MM-YYYY"));

  } else {
  alert("Erro ao atualizar dados.");
  }
  } catch (error) {
  console.error("Erro ao atualizar dados:", error);
  alert("Erro ao atualizar dados.");
  }
  };

  const handleAddPeso = async () => {
    if (!peso || !data) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const dataFormatada = moment(data).format("YYYY-MM-DD");

    try {
      await axios.post("http://192.168.0.107:3000/peso", {
        user: userId,
        peso: parseFloat(peso),
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


  const handleBothActions = () => {
    handleAddPeso();  // Chama o primeiro handler
   // handleUpdate(); // Chama o segundo handler
  };

  const handleDeletePeso = async (id: string) => {
    try {
      await axios.delete(`http://192.168.0.107:3000/peso/${userId}/${id}`);
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
        onPress={() => handleDeletePeso(item._id)}
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
          <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("TelaPerfil")}>
            <Image source={setaVolta} style={styles.arrow} />
          </TouchableOpacity>
          <Text style={styles.header}>Peso</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.columnHeaderHistorico}>Histórico (kg)</Text>
          <Text style={styles.columnHeaderData}>Data</Text>
          <Text style={styles.columnHeaderBotao}>Del.</Text>
        </View>

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
                onPress={handleBothActions}
                
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

        <MenuInferior navigation={navigation} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Pesos;
