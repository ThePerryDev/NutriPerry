import React from 'react';
import { SafeAreaView } from 'react-native';
import ProdutoBusca from '../frontend/src/screen/busca/ProdutoBusca'; // Ajuste o caminho conforme necessário

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProdutoBusca />
    </SafeAreaView>
  );
};

export default App;
