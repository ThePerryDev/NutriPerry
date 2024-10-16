import React, { useState, useContext } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Alert } from 'react-native';
import { ConsumoCaloricoContext } from '../../context/ConsumoCaloricoContext';
import axios from 'axios';
import { Product, AlimentoTaco, ConsumoCaloricoProps } from '../../types';

const ProdutoBusca = () => {
  const { create } = useContext(ConsumoCaloricoContext);
  const [produto, setProduto] = useState('');
  const [resultados, setResultados] = useState<(Product | AlimentoTaco)[]>([]);
  const [loading, setLoading] = useState(false);

  const buscarAlimentoTaco = async (termo: string) => {

    //192.168.1.5
    //const response = await axios.get(`http://localhost:3000/alimentos`, {
      const response = await axios.get(`http://192.168.1.5:3000/alimentos`, {
      params: {
        description: termo,
      },
    });
    return response.data;
  };

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

  const buscarProduto = async () => {
    if (!produto) return;

    setLoading(true);
    try {
      const [alimentosTaco, produtosOpenFood] = await Promise.all([
        buscarAlimentoTaco(produto),
        buscarOpenFoodFacts(produto),
      ]);

      const resultadosCombinados = [
        ...alimentosTaco,
        ...produtosOpenFood,
      ];
      setResultados(resultadosCombinados);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      // Caso ocorra erro no Open Food Facts, busca apenas no AlimentoTaco
      const alimentosTaco = await buscarAlimentoTaco(produto);
      setResultados(alimentosTaco);
    } finally {
      setLoading(false);
    }
  };


  //product.nutriments['sugars_100g']
  const cadastrarConsumo = async (item: Product | AlimentoTaco) => {
    const consumoData: any = {
      user: '66fded5c0cf47108c33eac8c',
      data: new Date(), // Formato de data ISO
      tipoRefeicao: 'refeição 1',
      nomeAlimento: isAlimentoTaco(item) ? item.description : item.product_name || 'Nome não disponível',
      kcal: isAlimentoTaco(item) ? item.energy.value : item.nutriments?.['energy-kcal_100g'] || 0,
      proteina: isAlimentoTaco(item) ? item.protein.value : item.nutriments?.proteins || 0,
      carboidrato: isAlimentoTaco(item) ? item.carbohydrate.value : item.nutriments?.carbohydrates || 0,
      peso: 100,
      acucar: isAlimentoTaco(item) ? 0 : item.nutriments?.['sugars_100g'] , // Aqui
    };
  
    console.log('Dados a serem enviados:', consumoData); // Adicione esta linha para verificar os dados
  
    // Validação adicional
    const camposFaltando = Object.keys(consumoData).filter(key => 
      consumoData[key] === undefined || (consumoData[key] === '' && key !== 'acucar')
    );
  
    if (camposFaltando.length > 0) {
      console.error('Campos faltando:', camposFaltando);
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
  
    try {
      await create(consumoData);
      Alert.alert('Sucesso', 'Consumo cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar consumo:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o consumo.');
    }
  };
  
  

  const isAlimentoTaco = (item: Product | AlimentoTaco): item is AlimentoTaco => {
    return (item as AlimentoTaco).description !== undefined;
  };

  const renderItem = ({ item }: { item: Product | AlimentoTaco }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{isAlimentoTaco(item) ? item.description : item.product_name}</Text>
      <Text>Kcal: {isAlimentoTaco(item) ? item.energy.value : item.nutriments?.['energy-kcal_100g'] || 0}</Text>
      <Text>Proteínas: {isAlimentoTaco(item) ? item.protein.value : item.nutriments?.proteins || 0}g</Text>
      <Button title="Cadastrar" onPress={() => cadastrarConsumo(item)} />
    </View>
  );

  const keyExtractor = (item: Product | AlimentoTaco) => {
    if (isAlimentoTaco(item)) {
      return item.id; // ou outro campo único
    }
    return item.product_name || 'product'; // valor padrão se product_name não existir
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar produto..."
        value={produto}
        onChangeText={setProduto}
      />
      <Button title="Buscar" onPress={buscarProduto} />

      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={resultados}
          renderItem={renderItem}
          keyExtractor={keyExtractor} // Utilize o keyExtractor aqui
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  list: {
    marginTop: 16,
  },
  item: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  nome: {
    fontWeight: 'bold',
  },
});

export default ProdutoBusca;
