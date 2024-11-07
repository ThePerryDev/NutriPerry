import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput, Image, ActivityIndicator } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import AddAlimentoButton from "../../../components/Cadastro/Adicionar/adicionaralimento";
import { camera, setaVolta } from "../../../assets";
import styles from "./styles";
import { AlimentoTaco, Product } from "../../../types"; // Importar a interface AlimentoTaco
import axios from "axios";

// Tipagem para a navegação
type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PesquisaAlimento"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

// Função para buscar dados da AlimentoTaco
const buscarAlimentoTaco = async (termo: string): Promise<AlimentoTaco[]> => {
  try {
    
    //const response = await axios.get(`http://10.68.55.153/alimentotaco`, 
    const response = await axios.get(`http://10.68.55.153/alimentotaco`,
    {
      params: {
        description: termo,
      },
    });

    // Verifique a estrutura da resposta
    console.log("Response do AlimentoTaco:", response.data); // Log para verificar a resposta

    // Verifica se response.data é um array
    if (Array.isArray(response.data)) {
      return response.data.map((product: any) => ({
        id: product.id, // Certifique-se de que o ID esteja disponível na resposta
        description: product.description,
        energy: {
          label: product.energy.label, // Correção para pegar o label do objeto energy
          value: product.energy.value, // Correção para pegar o value do objeto energy
          unit: product.energy.unit, // Correção para pegar o unit do objeto energy
        },
        protein: {
          label: product.protein.label, // Correção para pegar o label do objeto protein
          value: product.protein.value, // Correção para pegar o value do objeto protein
          unit: product.protein.unit, // Correção para pegar o unit do objeto protein
        },
        carbohydrate: {
          label: product.carbohydrate.label, // Correção para pegar o label do objeto carbohydrate
          value: product.carbohydrate.value, // Correção para pegar o value do objeto carbohydrate
          unit: product.carbohydrate.unit, // Correção para pegar o unit do objeto carbohydrate
        },
      }));
    } else {
      console.error("Erro: response.data não é um array", response.data);
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar AlimentoTaco", error);
    return [];
  }
};

// Função para buscar dados da API Open Food Facts
const buscarOpenFoodFacts = async (termo: string) => {
  const response = await axios.get(`https://br.openfoodfacts.net/cgi/search.pl`, {
    params: {
      search_terms: termo,
      json: true,
      page_size: 10,
    },
  });
  return response.data.products || [];
};

const PesquisaAlimento: React.FC<Props> = ({ navigation }) => {
  const [nomeProduct, setNomeProduct] = useState<string>("");
  const [productList, setProductList] = useState<(AlimentoTaco | Product)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Função de busca
  const searchProducts = async () => {
    setLoading(true);
    try {
      // Filtra da base Taco
      const tacoResults = await buscarAlimentoTaco(nomeProduct);
      // Busca da API Open Food Facts
      const openFoodResults = await buscarOpenFoodFacts(nomeProduct);
      // Mescla os resultados
      setProductList([...tacoResults, ...openFoodResults]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (nomeProduct.length > 2) {
      searchProducts(); // Executa a busca quando o termo tem mais de 2 caracteres
    } else {
      setProductList([]); // Limpa a lista se o campo de busca está vazio
    }
  }, [nomeProduct]);

  const isAlimentoTaco = (item: Product | AlimentoTaco): item is AlimentoTaco => {
    return (item as AlimentoTaco).description !== undefined;
  };


  const renderProductItem = ({ item }: { item: Product | AlimentoTaco }) => (
    <View style={styles.ProductItem}>
      <Text style={styles.ProductName}>
        {isAlimentoTaco(item) ? item.description : item.product_name || "Produto Sem Nome"}
      </Text>
      <View style={styles.nutritionInfo}>
        <Text style={styles.nutritionText}>
          Kcal: {isAlimentoTaco(item) ? item.energy.value : item.nutriments?.['energy-kcal_100g'] || 0}
        </Text>
        <Text style={styles.nutritionText}>
          Proteína: {isAlimentoTaco(item) ? item.protein.value : item.nutriments?.proteins || 0}g
        </Text>
        <Text style={styles.nutritionText}>
          Carboidratos: {isAlimentoTaco(item) ? item.carbohydrate.value : item.nutriments?.carbohydrates || 0}g
        </Text>
      </View>
      <View style={styles.buttoncontainer}>
        <AddAlimentoButton
          onPress={() => {
            //console.log("Produto selecionado:", item); // Log do produto selecionado
            navigation.navigate("AdicionarAlimento", {
              product: isAlimentoTaco(item) ? item : item, // Passa o produto selecionado
            });
          }}
        />
      </View>
    </View>
  );
  

  

  /*
  const renderProductItem = ({ item }: { item: Product | AlimentoTaco }) => (
    <View style={styles.ProductItem}>
      <Text style={styles.ProductName}>{isAlimentoTaco(item) ? item.description : item.product_name}</Text>
      <View style={styles.nutritionInfo}>
        <Text style={styles.nutritionText}>
          Kcal: {isAlimentoTaco(item) ? item.energy.value : item.nutriments?.['energy-kcal_100g'] || 0}
        </Text>
        <Text style={styles.nutritionText}>
          Proteína: {isAlimentoTaco(item) ? item.protein.value : item.nutriments?.proteins || 0}g
        </Text>
        <Text style={styles.nutritionText}>
          Carboidratos: {isAlimentoTaco(item) ? item.carbohydrate.value : item.nutriments?.carbohydrates || 0}g
        </Text>
      </View>
      <View style={styles.buttoncontainer}>
        <AddAlimentoButton onPress={() => navigation.navigate("AdicionarAlimento")} />
      </View>
    </View>
  );
*/
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("Home")}>
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Adicionar Alimento</Text>
      </View>
      <View style={styles.searchcontainer}>
        <TextInput
          value={nomeProduct}
          placeholder={"Pesquisar"}
          onChangeText={setNomeProduct}
          style={styles.input}
        />
        {/*
        <TouchableOpacity style={styles.camera} disabled={true}>
          <Image source={camera} />
        </TouchableOpacity>
         */}
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={productList}
          keyExtractor={(item) => isAlimentoTaco(item) ? item.id : item.product_name || 'product'} // Ajuste para usar o id do AlimentoTaco
          renderItem={renderProductItem}
          contentContainerStyle={styles.listContent}
        />
      )}
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default PesquisaAlimento;
