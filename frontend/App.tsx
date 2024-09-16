import { StyleSheet, Text, View } from 'react-native';
import TelaCadEmailP from './src/screen/cadastro/perfil_pessoal/cadastroEmailP';
import TelaCadNomeP from './src/screen/cadastro/perfil_pessoal/cadastroNomeP';
import TelaCadProfissaoN from './src/screen/cadastro/perfil_nutricionista/cadastroFormacaoN';

export default function App() {
  return (
    <View style={styles.container}>
      <TelaCadProfissaoN></TelaCadProfissaoN>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});