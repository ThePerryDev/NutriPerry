import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta, Editar, Deletar } from "../../../assets";
import styles from "./styles";
import AddMealButton from "../../../components/Cadastro/AddAlimento/botaoaddalimento";
import axios from "axios";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CafedaManha"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

type Produto = {
  id: string;
  nome: string;
  quantidade: number;
};

const CafedaManha: React.FC<Props> = ({ navigation }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [totalKcal, setTotalKcal] = useState<number>(0);
  const [totalProteina, setTotalProteina] = useState<number>(0);
  const [totalCarboidrato, setTotalCarboidrato] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    fetchAlimentos();
  }, [selectedDate]);

  const fetchAlimentos = async () => {
    try {
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      
      //192.168.1.4
      //const responseAlimentos = await axios.get("http://localhost:3000/consumos/alimento", {
        const responseAlimentos = await axios.get("http://192.168.1.4:3000/consumos/alimento", {
        params: {
          userId: "67074140dbf77240420381b1",
          data: formattedDate,
          tipoRefeicao: "cafe_da_manha"
        }
      });

      const alimentos = responseAlimentos.data.map((alimento: any) => ({
        id: alimento.id,
        nome: alimento.nome,
        quantidade: alimento.peso
      }));

      setProdutos(alimentos);

      //192.168.1.4
      //const responseTotais = await axios.get("http://localhost:3000/consumos/listarconsumo", {
        const responseTotais = await axios.get("http://192.168.1.4:3000/consumos/listarconsumo", {
        params: {
          userId: "67074140dbf77240420381b1",
          data: formattedDate,
          tipoRefeicao: "cafe_da_manha"
        }
      });

      setTotalKcal(responseTotais.data.totalKcal);
      setTotalProteina(responseTotais.data.totalProteina);
      setTotalCarboidrato(responseTotais.data.totalCarboidrato);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://192.168.1.4:3000/consumos/delete/${id}`);
      //await axios.delete(`http://localhost:3000/consumos/delete/${id}`);
      setProdutos((prevProdutos) => prevProdutos.filter((produto) => produto.id !== id));
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const renderItem = ({ item }: { item: Produto }) => (
    <View style={styles.row}>
      <Text style={styles.alimento}>{item.nome}</Text>
      <Text style={styles.quantidade}>{item.quantidade}</Text>
      <TouchableOpacity style={styles.botao}>
        <Image source={Editar} style={styles.icone} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={() => handleDelete(item.id)}>
        <Image source={Deletar} style={styles.icone} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("MenuDietas")}>
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Café da Manhã</Text>
      </View>
      
      <View style={styles.datePickerContainer}>
        <Button title="Selecionar Data" onPress={() => setShowDatePicker(true)} />
        <Text style={styles.selectedDateText}>
          {moment(selectedDate).format("DD/MM/YYYY")}
        </Text>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      
      <View style={styles.row}>
        <Text style={styles.columnHeaderAlimento}>Alimento</Text>
        <Text style={styles.columnHeaderQuantidade}>Qtd.</Text>
        <Text style={styles.columnHeaderBotao}>Edit.</Text>
        <Text style={styles.columnHeaderBotao}>Del.</Text>
      </View>
      
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      
      <View style={styles.spacer} />
      <View style={styles.datacontainer}>
        <View>
          <Text style={styles.datatext}>Calorias</Text>
          <View style={styles.datashow}>
            <Text style={styles.datainfo}>{totalKcal}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.datatext}>Proteínas</Text>
          <View style={styles.datashow}>
            <Text style={styles.datainfo}>{totalProteina}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.datatext}>Carboidratos</Text>
          <View style={styles.datashow}>
            <Text style={styles.datainfo}>{totalCarboidrato}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.AddMealButtoncontainer}>
        <AddMealButton onPress={() => navigation.navigate("PesquisaAlimento")} />
      </View>
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default CafedaManha;
