import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Platform,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import { RouteProp } from "@react-navigation/native";
import { Table, Row, Rows } from "react-native-table-component";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta } from "../../../assets";
import styles from "./styles";
import UnidadePicker from "../../../components/Cadastro/PickerAlimentos/pickeralimentos";
import SaveButton from "../../../components/Cadastro/Salvar/botaosalvar";
import { AlimentoTaco, NutritionalValues, Product } from "../../../types";
import useConsumoCalorico from "../../../hooks/useConsumoCalorico"; // Importando o hook
import {
  AuthContext,
  ConsumoCaloricoContext,
  ConsumoCaloricoProvider,
} from "../../../context";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import MealPricker from "../../../components/Cadastro/MealPricker/MealPicker";
import MealPicker from "../../../components/Cadastro/MealPricker/MealPicker";
import DatePickerComponent from "../../../components/Cadastro/DatePicker/datepicker";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AdicionarAlimento"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
  route: RouteProp<RootStackParamList, "AdicionarAlimento">;
};

const AdicionarAlimento: React.FC<Props> = ({ navigation, route }) => {
  const [selectUnit, setSelectUnit] = useState("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const MealOption = [
    { label: "", value: "" },
    { label: "Café da Manhã", value: "cafe_da_manha" },
    { label: "Almoço", value: "almoco" },
    { label: "Jantar", value: "jantar" },
    { label: "Lanches", value: "lanches" },
  ];
  const { user } = useContext(AuthContext);

  const product = route.params?.product as AlimentoTaco | Product | undefined;

  const { create } = useContext(ConsumoCaloricoContext);

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  //const { create } = useContext(ConsumoCaloricoContext);
  console.log("Função create do contexto:", create);

  const getNutritionalData = () => {
    if (!product) {
      console.log("Produto não encontrado ou indefinido:", product);
      return {
        kcal: "-",
        protein: "-",
        carbohydrate: "-",
        sodium: "-",
        sugar: "-",
        gordura: "-",
        gordura_saturada: "-",
        fibra: "-",
      };
    }

    if ("energy" in product) {
      return {
        kcal: product.energy.value || "-",
        protein: product.protein.value || "-",
        carbohydrate: product.carbohydrate.value || "-",
        sodium: "-",
        sugar: "-",
        gordura: "-",
        gordura_saturada: "-",
        fibra: "-",
      };
    } else if (product.nutriments) {
      return {
        kcal: product.nutriments["energy-kcal_100g"] || "-",
        protein: product.nutriments.proteins || "-",
        carbohydrate: product.nutriments.carbohydrates || "-",
        sodium: product.nutriments["salt_100g"] || "-",
        sugar: product.nutriments["sugars_100g"] || "-",
        gordura: product.nutriments["fat_100g"] || "-",
        gordura_saturada: product.nutriments["saturated-fat_100g"] || "-",
        fibra: product.nutriments["fiber_100g"] || "-",
      };
    } else {
      return {
        kcal: "-",
        protein: "-",
        carbohydrate: "-",
        sodium: "-",
        sugar: "-",
        gordura: "-",
        gordura_saturada: "-",
        fibra: "-",
      };
    }
  };

  const {
    kcal,
    protein,
    carbohydrate,
    sodium,
    sugar,
    gordura,
    gordura_saturada,
    fibra,
  } = getNutritionalData();

  const productName = product
    ? "description" in product
      ? product.description
      : product.product_name || "Nome do Produto"
    : "Nome do Produto";

  const calculateValues = (value: number): NutritionalValues => {
    return {
      kcal: ((Number(kcal) * value) / 100).toFixed(2),
      protein: ((Number(protein) * value) / 100).toFixed(2),
      carbohydrate: ((Number(carbohydrate) * value) / 100).toFixed(2),
      sodium: ((Number(sodium) * value) / 100).toFixed(2),
      sugar: ((Number(sugar) * value) / 100).toFixed(2),
      gordura: ((Number(gordura) * value) / 100).toFixed(2),
      gordura_saturada: ((Number(gordura_saturada) * value) / 100).toFixed(2),
      fibra: ((Number(fibra) * value) / 100).toFixed(2),
    };
  };

  const parsedQuantidade = Number(quantidade);

  const calculatedValues: NutritionalValues =
    parsedQuantidade > 0
      ? calculateValues(parsedQuantidade)
      : {
          kcal: "-",
          protein: "-",
          carbohydrate: "-",
          sodium: "-",
          sugar: "-",
          gordura: "-",
          gordura_saturada: "-",
          fibra: "-",
        };

  const tableHead = [
    "Dados Nutricionais",
    "Valores por 100g/100ml",
    "Valores que foram atribuídos",
  ];
  const tableData = [
    ["Kcal", kcal, calculatedValues.kcal],
    ["Proteína", protein, calculatedValues.protein],
    ["Carboidrato", carbohydrate, calculatedValues.carbohydrate],
    ["Açúcar", sugar, calculatedValues.sugar],
    ["Gordura", gordura, calculatedValues.gordura],
    ["Gordura Saturada", gordura_saturada, calculatedValues.gordura_saturada],
    ["Fibra", fibra, calculatedValues.fibra],
    ["Sal", sodium, calculatedValues.sodium],
  ];

  // AVALIAR O METODO CREATE COM PROBLEMA

  // Função para cadastrar o consumo
  const cadastrarConsumo = async () => {
    const consumoData = {
      user: user?.id, // Coloque aqui o ID do usuário correto
      data: moment(date).format("YYYY-MM-DD"),
      //data: Date(),
      tipoRefeicao: selectUnit, // Ajuste conforme necessário
      nomeAlimento: productName,
      kcal: Number(calculatedValues.kcal),
      proteina: Number(calculatedValues.protein),
      carboidrato: Number(calculatedValues.carbohydrate),
      peso: parsedQuantidade,
      acucar: Number(calculatedValues.sugar),
    };

    console.log("Dados que serão enviados para o banco:", consumoData);

    try {
      await create(consumoData);
      Alert.alert("Sucesso", "Consumo cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar consumo:", error);
      Alert.alert("Erro", "Não foi possível cadastrar o consumo.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.navigate("PesquisaAlimento")}
        >
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Adicionar Alimento</Text>
      </View>
      <Text style={styles.explanation}></Text>
      <View>
        <MealPicker
          label="Dietas:"
          selectedValue={selectUnit}
          onValueChange={(itemValue) => setSelectUnit(itemValue)}
          items={MealOption}
        />

        <View style={styles.quantitycontainer}>
          <Text style={styles.quantitytext}>Quantidade:</Text>
          <TextInput
            value={quantidade}
            onChangeText={(text) => setQuantidade(text)}
            style={styles.input}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>

        <DatePickerComponent selectedDate={date} onDateChange={setDate} />

      </View>
      <View style={styles.infocontainer}>
        <Text style={styles.infotitle}>{productName}</Text>
        <Table
          borderStyle={{ borderWidth: 0 }}
          style={{ marginHorizontal: 10, marginBottom: 15 }}
        >
          <Row
            data={tableHead}
            style={styles.head}
            textStyle={styles.textHead}
          />
          <Rows data={tableData} style={styles.row} textStyle={styles.text} />
        </Table>
      </View>
      <ConsumoCaloricoProvider>
        <View style={styles.savebuttoncontainer}>
          <SaveButton onPress={cadastrarConsumo} />
        </View>
      </ConsumoCaloricoProvider>
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default AdicionarAlimento;
