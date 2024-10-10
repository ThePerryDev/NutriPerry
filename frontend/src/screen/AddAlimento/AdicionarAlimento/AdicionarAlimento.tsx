import React, { useContext, useState } from "react"; 
import { View, Text, TouchableOpacity, TextInput, Image, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import { RouteProp } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta } from "../../../assets";
import styles from "./styles";
import UnidadePicker from "../../../components/Cadastro/PickerAlimentos/pickeralimentos";
import SaveButton from "../../../components/Cadastro/Salvar/botaosalvar";
import { AlimentoTaco, NutritionalValues, Product } from "../../../types"; 
import useConsumoCalorico from '../../../hooks/useConsumoCalorico'; // Importando o hook
import { ConsumoCaloricoContext, ConsumoCaloricoProvider } from "../../../context";

type ContinuarScreenNavigationProp = StackNavigationProp<RootStackParamList, "AdicionarAlimento">;

type Props = {
  navigation: ContinuarScreenNavigationProp;
  route: RouteProp<RootStackParamList, "AdicionarAlimento">; 
};

const AdicionarAlimento: React.FC<Props> = ({ navigation, route }) => {
  const [selectUnit, setSelectUnit] = useState("");
  const [quantidade, setQuantidade] = useState<string>("");

  // Obtendo o produto passado pela navegação
  const product = route.params?.product as AlimentoTaco | Product | undefined;

  //usando context
  const { create } = useContext(ConsumoCaloricoContext);

  //const { create } = useContext(ConsumoCaloricoContext);
  console.log("Função create do contexto:", create);

  const getNutritionalData = () => {
    if (!product) {
      console.log("Produto não encontrado ou indefinido:", product);
      return { 
        kcal: '-', 
        protein: '-', 
        carbohydrate: '-', 
        sodium: '-', 
        sugar: '-', 
        gordura: '-', 
        gordura_saturada: '-', 
        fibra: '-' 
      };
    }
  
    if ('energy' in product) {
      return {
        kcal: product.energy.value || '-',
        protein: product.protein.value || '-',
        carbohydrate: product.carbohydrate.value || '-',
        sodium: '-',
        sugar: '-',
        gordura: '-',
        gordura_saturada: '-',
        fibra: '-',
      };
    } else if (product.nutriments) {
      return {
        kcal: product.nutriments['energy-kcal_100g'] || '-',
        protein: product.nutriments.proteins || '-',
        carbohydrate: product.nutriments.carbohydrates || '-',
        sodium: product.nutriments['salt_100g'] || '-',
        sugar: product.nutriments['sugars_100g'] || '-',
        gordura: product.nutriments['fat_100g'] || '-',
        gordura_saturada: product.nutriments['saturated-fat_100g'] || '-',
        fibra: product.nutriments['fiber_100g'] || '-',
      };
    } else {
      return {
        kcal: '-',
        protein: '-',
        carbohydrate: '-',
        sodium: '-',
        sugar: '-',
        gordura: '-',
        gordura_saturada: '-',
        fibra: '-',
      };
    }
  };

  const { kcal, protein, carbohydrate, sodium, sugar, gordura, gordura_saturada, fibra } = getNutritionalData();

  const productName = product 
    ? ('description' in product ? product.description : product.product_name || "Nome do Produto")
    : "Nome do Produto";

  const calculateValues = (value: number): NutritionalValues => {
    return {
      kcal: (Number(kcal) * value / 100).toFixed(2),
      protein: (Number(protein) * value / 100).toFixed(2),
      carbohydrate: (Number(carbohydrate) * value / 100).toFixed(2),
      sodium: (Number(sodium) * value / 100).toFixed(2),
      sugar: (Number(sugar) * value / 100).toFixed(2),
      gordura: (Number(gordura) * value / 100).toFixed(2),
      gordura_saturada: (Number(gordura_saturada) * value / 100).toFixed(2),
      fibra: (Number(fibra) * value / 100).toFixed(2),
    };
  };

  const parsedQuantidade = Number(quantidade);

  const calculatedValues: NutritionalValues = parsedQuantidade > 0 ? calculateValues(parsedQuantidade) : {
    kcal: '-',
    protein: '-',
    carbohydrate: '-',
    sodium: '-',
    sugar: '-',
    gordura: '-',
    gordura_saturada: '-',
    fibra: '-',
  };

  /*const handleSave = () => {
  if (selectUnit) {
    // Navegar para a página correspondente com base na dieta selecionada
    switch (selectUnit) {
      case "cafedamanha":
        navigation.navigate("CafedaManha", undefined); // Navega para a tela de Café da Manhã
        break;
      case "almoco":
        navigation.navigate("Almoco", undefined); // Navega para a tela de Almoço
        break;
      case "jantar":
        navigation.navigate("Jantar", undefined); // Navega para a tela de Jantar
        break;
      case "lanches":
        navigation.navigate("Lanches", undefined); // Navega para a tela de Lanches
        break;
      default:
        navigation.navigate("Home", undefined); // Navega para a tela inicial ou outra tela padrão
    }
  } else {
    // Caso não tenha uma unidade selecionada, pode mostrar um alerta ou mensagem
    alert("Por favor, selecione uma dieta antes de salvar.");
  }
};*/

  const tableHead = ['Dados Nutricionais', 'Valores por 100g/100ml', 'Valores que foram atribuídos'];
  const tableData = [
    ['Kcal', kcal, calculatedValues.kcal],
    ['Proteína', protein, calculatedValues.protein],
    ['Carboidrato', carbohydrate, calculatedValues.carbohydrate],
    ['Açúcar', sugar, calculatedValues.sugar],
    ['Gordura', gordura, calculatedValues.gordura],
    ['Gordura Saturada', gordura_saturada, calculatedValues.gordura_saturada],
    ['Fibra', fibra, calculatedValues.fibra],
    ['Sal', sodium, calculatedValues.sodium],
  ];

  const MealOption = [
    { label: "", value: "" },
    { label: "refeição 1", value: "refeição 1" },
    { label: "refeição 2", value: "refeição 2" },
    { label: "refeição 3", value: "refeição 3" },
    { label: "refeição 4", value: "refeição 4" },
    { label: "refeição 4", value: "refeição 5" },
    { label: "refeição 4", value: "refeição 6" },
  ];

// AVALIAR O METODO CREATE COM PROBLEMA

  // Função para cadastrar o consumo
  const cadastrarConsumo = async () => {
    const consumoData = {
      user: '67074140dbf77240420381b1', // Coloque aqui o ID do usuário correto
      data: new Date(),
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
      await
       
      create(consumoData);
      Alert.alert('Sucesso', 'Consumo cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar consumo:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o consumo.');
    }
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("PesquisaAlimento")}>
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Adicionar Alimento</Text>
      </View>
      <Text style={styles.explanation}>Selecione a unidade que vai consumir e insira a quantidade a consumir</Text>
      <View>
        <UnidadePicker
          label="Dietas:"
          selectedValue={selectUnit}
          onValueChange={(itemValue) => setSelectUnit(itemValue)}
          items={MealOption}
        />
        <View style={styles.quantitycontainer}>
          <Text style={styles.textgeral}>Quantidade:</Text>
          <TextInput
            value={quantidade}
            onChangeText={(text) => setQuantidade(text)}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.infocontainer}>
        <Text style={styles.infotitle}>{productName}</Text>
        <Table borderStyle={{ borderWidth: 0 }} style={{ marginHorizontal: 10, marginBottom: 15 }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.textHead} />
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
