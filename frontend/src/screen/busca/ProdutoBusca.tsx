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
    const response = await axios.get(`http://localhost:3000/alimentos`, {
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

  const cadastrarConsumo = async (item: Product | AlimentoTaco) => {
    try {
      const consumoData: ConsumoCaloricoProps = {
        user: '66f2b55fde79d5902647ab9d', // Substitua pelo ID do usuário
        data: new Date(),
        tipoRefeicao: 'refeição 1',
        nomeAlimento: isAlimentoTaco(item) ? item.description : item.product_name || 'Nome não disponível',
        kcal: isAlimentoTaco(item) ? item.energy.value : item.nutriments?.['energy-kcal_100g'] || 0,
        proteina: isAlimentoTaco(item) ? item.protein.value : item.nutriments?.proteins || 0,
        carboidrato: isAlimentoTaco(item) ? item.carbohydrate.value : item.nutriments?.carbohydrates || 0,
        peso: 100,
        acucar: isAlimentoTaco(item) ? 0 : item.nutriments?.sugars || 0,
      };

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



/* AQUI SOMENTE TABELA TACO

import React, { useState, useContext } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Alert } from 'react-native';
import { ConsumoCaloricoContext } from '../../context/ConsumoCaloricoContext';
import axios from 'axios';
import { AlimentoTaco, ConsumoCaloricoProps } from '../../types';

const ProdutoBusca = () => {
  const { create } = useContext(ConsumoCaloricoContext);
  const [produto, setProduto] = useState('');
  const [resultados, setResultados] = useState<AlimentoTaco[]>([]);
  const [loading, setLoading] = useState(false);

  const buscarAlimentoTaco = async (termo: string) => {
    const response = await axios.get(`http://localhost:3000/alimentos`, {
      params: {
        description: termo,
      },
    });
    return response.data;
  };

  const buscarProduto = async () => {
    if (!produto) return;

    setLoading(true);
    try {
      const alimentosTaco = await buscarAlimentoTaco(produto);
      setResultados(alimentosTaco);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  const cadastrarConsumo = async (item: AlimentoTaco) => {
    try {
      const consumoData: ConsumoCaloricoProps = {
        user: '66f2b55fde79d5902647ab9d', // Substitua pelo ID do usuário
        data: new Date(),
        tipoRefeicao: 'refeição 1',
        nomeAlimento: item.description,
        kcal: item.energy.value,
        proteina: item.protein.value,
        carboidrato: item.carbohydrate.value,
        peso: 100,
        acucar: 0, // Ajuste conforme a sua lógica
      };

      await create(consumoData);
      Alert.alert('Sucesso', 'Consumo cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar consumo:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o consumo.');
    }
  };

  const renderItem = ({ item }: { item: AlimentoTaco }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{item.description}</Text>
      <Text>Kcal: {item.energy.value}</Text>
      <Text>Proteínas: {item.protein.value}g</Text>
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
          keyExtractor={(item) => item.id}
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


/*          AQUI INCLUI ALIMENTO TACO E OPEN FOOD



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
    const response = await axios.get(`http://localhost:3000/alimentos`, {
      params: {
        description: termo,
      },
    });
    return response.data;
  };

  const buscarProduto = async () => {
    if (!produto) return;

    setLoading(true);
    try {
      // Busca na AlimentoTaco
      const alimentosTaco = await buscarAlimentoTaco(produto);
      let resultadosCombinados = alimentosTaco;

      // Busca na API Open Food Facts
      const response = await axios.get(`https://br.openfoodfacts.net/cgi/search.pl`, {
        params: {
          search_terms: produto,
          json: true,
          page_size: 10,
        },
      });

      if (response.data.products) {
        resultadosCombinados = [...alimentosTaco, ...response.data.products];
      }

      setResultados(resultadosCombinados);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  const isAlimentoTaco = (item: Product | AlimentoTaco): item is AlimentoTaco => {
    return (item as AlimentoTaco).description !== undefined;
  };

  const cadastrarConsumo = async (item: Product | AlimentoTaco) => {
    try {
      const nomeAlimento = isAlimentoTaco(item) ? item.description : item.product_name || 'Nome não disponível';
  
      const consumoData: ConsumoCaloricoProps = {
        user: '66f2b55fde79d5902647ab9d', // Substitua pelo ID do usuário
        data: new Date(),
        tipoRefeicao: 'refeição 1',
        nomeAlimento,
        kcal: isAlimentoTaco(item) ? item.energy.value : item.nutriments?.['energy-kcal_100g'] || 0,
        proteina: isAlimentoTaco(item) ? item.protein.value : item.nutriments?.proteins || 0,
        carboidrato: isAlimentoTaco(item) ? item.carbohydrate.value : item.nutriments?.carbohydrates || 0,
        peso: 100,
        acucar: isAlimentoTaco(item) ? 0 : item.nutriments?.sugars || 0,
      };
  
      await create(consumoData);
      Alert.alert('Sucesso', 'Consumo cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar consumo:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o consumo.');
    }
  };

  const renderItem = ({ item }: { item: Product | AlimentoTaco }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{isAlimentoTaco(item) ? item.description : item.product_name}</Text>
      <Text>Kcal: {isAlimentoTaco(item) ? item.energy.value : item.nutriments?.['energy-kcal_100g'] || 0}</Text>
      <Text>Proteínas: {isAlimentoTaco(item) ? item.protein.value : item.nutriments?.proteins || 0}g</Text>
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
/*
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