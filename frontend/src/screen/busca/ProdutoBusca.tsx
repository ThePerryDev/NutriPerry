import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

interface Nutriments {
  'energy-kcal_100g'?: number;
  proteins_100g?: number;
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
      const response = await axios.get(`https://world.openfoodfacts.org/cgi/search.pl`, {
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

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{item.product_name || 'Nome não disponível'}</Text>
      <Text>Kcal: {item.nutriments?.['energy-kcal_100g'] || 0}</Text>
      <Text>Proteínas: {item.nutriments?.proteins_100g || 0}g</Text>
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
