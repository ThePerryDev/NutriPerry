import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta, Editar, Deletar } from "../../../assets";
import styles from "./styles";
import AddMealButton from "../../../components/Cadastro/AddAlimento/botaoaddalimento";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CafedaManha"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

type Produto = {
  id: number;
  nome: string;
  quantidade: string;
};

const produtos: Produto[] = [
  { id: 1, nome: "Ovos", quantidade: "2" },
  { id: 2, nome: "Pão Integral", quantidade: "2" },
  { id: 3, nome: "Café", quantidade: "1" },
];

const CafedaManha: React.FC<Props> = ({ navigation }) => {
<<<<<<< Updated upstream
=======
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [totalKcal, setTotalKcal] = useState<number>(0);
  const [totalProteina, setTotalProteina] = useState<number>(0);
  const [totalCarboidrato, setTotalCarboidrato] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  // Usando useFocusEffect para chamar fetchAlimentos quando a tela estiver ativa
  useFocusEffect(
    React.useCallback(() => {
      fetchAlimentos();
    }, [selectedDate]) // Dependência pode incluir selectedDate se necessário
  );

  const fetchAlimentos = async () => {
    try {
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

      const responseAlimentos = await axios.get("http://192.168.0.20:3000/consumos/alimento", {
        params: {
          userId: user?.id,
          data: formattedDate,
          tipoRefeicao: "cafe_da_manha",
        },
      });

      const alimentos = responseAlimentos.data.map((alimento: any) => ({
        id: alimento.id,
        nome: alimento.nome,
        quantidade: alimento.peso,
      }));

      setProdutos(alimentos);

      const responseTotais = await axios.get("http://192.168.0.20:3000/consumos/listarconsumo", {
        params: {
          userId: user?.id,
          data: formattedDate,
          tipoRefeicao: "cafe_da_manha",
        },
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
      await axios.delete(`http://192.168.0.20:3000/consumos/delete/${id}`);
      
      setProdutos((prevProdutos) => {
        const updatedProdutos = prevProdutos.filter((produto) => produto.id !== id);
        
        if (updatedProdutos.length === 0) {
          setTotalKcal(0);
          setTotalProteina(0);
          setTotalCarboidrato(0);
        }

        return updatedProdutos;
      });

      fetchAlimentos(); 
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

>>>>>>> Stashed changes
  const renderItem = ({ item }: { item: Produto }) => (
    <View style={styles.row}>
      <Text style={styles.alimento}>{item.nome}</Text>
      <Text style={styles.quantidade}>{item.quantidade}</Text>
      <TouchableOpacity 
        style={styles.botao} 
        onPress={() => navigation.navigate("AdicionarAlimento", { product: item })}>
        <Image source={Editar} style={styles.icone} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={() => console.log("Deletar", item.id)}>
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
      <View style={styles.row}>
        <Text style={styles.columnHeaderAlimento}>Alimento</Text>
        <Text style={styles.columnHeaderQuantidade}>Qtd.</Text>
        <Text style={styles.columnHeaderBotao}>Edit.</Text>
        <Text style={styles.columnHeaderBotao}>Del.</Text>
      </View>
      <View>
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.datacontainer}>
        <View>
          <Text style={styles.datatext}>Calorias</Text>
          <View style={styles.datashow}>
            <Text style={styles.datainfo}>-</Text>
          </View>
        </View>
        <View>
          <Text style={styles.datatext}>Proteínas</Text>
          <View style={styles.datashow}>
            <Text style={styles.datainfo}>-</Text>
          </View>
        </View>
        <View>
          <Text style={styles.datatext}>Carboidratos</Text>
          <View style={styles.datashow}>
            <Text style={styles.datainfo}>-</Text>
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
