import React, { useState, useContext } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Alert } from 'react-native';
import { ConsumoCaloricoContext } from '../../context/ConsumoCaloricoContext'; // Ajuste o caminho conforme necessário
import axios from 'axios';

interface Nutriments {
  'energy-kcal_100g'?: number;
  proteins?: number;
  carbohydrates?: number;
  sugars?: number;
}

interface Product {
  product_name?: string;
  nutriments?: Nutriments;
}

const ProdutoBusca = () => {
  const { create } = useContext(ConsumoCaloricoContext); // Obtém a função create do contexto
  const [produto, setProduto] = useState('');
  const [resultados, setResultados] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const buscarProduto = async () => {
    if (!produto) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://br.openfoodfacts.net/cgi/search.pl`, {
        params: {
          search_terms: produto,
          json: true,
          page_size: 10, // Retorna até 10 resultados
        },
      });

      if (response.data.products) {
        setResultados(response.data.products);
      } else {
        setResultados([]);
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  const cadastrarConsumo = async (item: Product) => {
    try {
      const consumoData = {
        user: '66f2b55fde79d5902647ab9d', // Substitua pelo ID do usuário que está cadastrado
        data: new Date(),
        tipoRefeicao: 'refeição 1', // Ou outro tipo de refeição que você desejar
        nomeAlimento: item.product_name || 'Nome não disponível',
        kcal: item.nutriments?.['energy-kcal_100g'] || 0,
        proteina: item.nutriments?.proteins || 0,
        carboidrato: item.nutriments?.carbohydrates || 0,
        peso: 100, // Ajuste conforme necessário, por exemplo, o peso padrão pode ser 100g
        acucar: item.nutriments?.sugars || 0,
      };

      // Chama a função create do contexto
      await create(consumoData);
      Alert.alert('Sucesso', 'Consumo cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar consumo:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o consumo.');
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{item.product_name || 'Nome não disponível'}</Text>
      <Text>Kcal: {item.nutriments?.['energy-kcal_100g'] || 0}</Text>
      <Text>Proteínas: {item.nutriments?.proteins || 0}g</Text>
      <Button title="Cadastrar" onPress={() => cadastrarConsumo(item)} />
    </View>
  );

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
          keyExtractor={(item, index) => index.toString()}
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


/*
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

interface Nutriments {
  'energy-kcal_100g'?: number;
  proteins?: number;
  carbohydrates?: number;
  sugars?: number;
}

interface Product {
  product_name?: string;
  nutriments?: Nutriments;
}

const ProdutoBusca = () => {
  const [produto, setProduto] = useState('');
  const [resultados, setResultados] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const buscarProduto = async () => {
    if (!produto) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://br.openfoodfacts.org/cgi/search.pl`, {
        params: {
          search_terms: produto,
          json: true,
          page_size: 10, // Retorna até 10 resultados
        },
      });

      if (response.data.products) {
        setResultados(response.data.products);
      } else {
        setResultados([]);
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  const cadastrarConsumo = async (item: Product) => {
    try {
      const consumoData = {
        user: '66f2b55fde79d5902647ab9d', // Substitua pelo ID do usuário que está cadastrado
        data: new Date(),
        tipoRefeicao: 'refeição 1', // Ou outro tipo de refeição que você desejar
        nomeAlimento: item.product_name || 'Nome não disponível',
        kcal: item.nutriments?.['energy-kcal_100g'] || 0,
        proteina: item.nutriments?.proteins || 0,
        carboidrato: item.nutriments?.carbohydrates || 0,
        peso: 100, // Ajuste conforme necessário, por exemplo, o peso padrão pode ser 100g
        acucar: item.nutriments?.sugars || 0,
      };

      await axios.post('http://localhost:3000/consumocalorico', consumoData); // Altere para a URL correta
      Alert.alert('Sucesso', 'Consumo cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar consumo:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o consumo.');
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{item.product_name || 'Nome não disponível'}</Text>
      <Text>Kcal: {item.nutriments?.['energy-kcal_100g'] || 0}</Text>
      <Text>Proteínas: {item.nutriments?.proteins || 0}g</Text>
      <Button title="Cadastrar" onPress={() => cadastrarConsumo(item)} />
    </View>
  );

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
          keyExtractor={(item, index) => index.toString()}
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
*/