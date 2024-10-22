import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, TextInput } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta, Deletar } from "../../../assets";
import styles from "./styles";
import DateTimePicker from '@react-native-community/datetimepicker';

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TelaPeso"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

type Peso = {
  id: number;
  peso: string;
  data: string;
};

const Pesos: React.FC<Props> = ({ navigation }) => {
  const [pesos, setPesos] = useState<Peso[]>([
    { id: 1, peso: "70", data: "10/08/2024" },
    { id: 2, peso: "72", data: "10/09/2024" },
    { id: 3, peso: "74", data: "10/10/2024" },
    { id: 4, peso: "71", data: "10/11/2024" },
  ]);

  const [newPeso, setNewPeso] = useState<string>("");
  const [chosenDate, setChosenDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addPeso = () => {
    if (newPeso && chosenDate) {
      setPesos([
        ...pesos,
        { id: pesos.length + 1, peso: newPeso, data: chosenDate.toLocaleDateString() },
      ]);
      setNewPeso(""); // Limpa o campo de peso
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || chosenDate;
    setShowDatePicker(false);
    setChosenDate(currentDate);
  };

  const renderItem = ({ item }: { item: Peso }) => (
    <View style={styles.row}>
      <Text style={styles.historico}>{item.peso}</Text>
      <Text style={styles.data}>{item.data}</Text>
      <TouchableOpacity style={styles.botao} onPress={() => console.log("Deletar", item.id)}>
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.row}>
        <Text style={styles.columnHeaderHistorico}>Histórico (kg)</Text>
        <Text style={styles.columnHeaderData}>Data</Text>
        <Text style={styles.columnHeaderBotao}></Text>
      </View>

      {/* Inputs para adicionar peso e data */}
      <View style={styles.inputInfos}>
        <TextInput
          style={styles.inputPeso}
          placeholder="00"
          keyboardType="numeric"
          value={newPeso}
          onChangeText={setNewPeso}
        />

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.inputData}
            placeholder="Data"
            value={chosenDate.toLocaleDateString()}
            editable={false} // Desativa a edição direta
          />
        </TouchableOpacity>

        {/* DateTimePicker visível ao clicar */}
        {showDatePicker && (
          <DateTimePicker
            value={chosenDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.addButton} onPress={addPeso}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Inferior */}
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default Pesos;
