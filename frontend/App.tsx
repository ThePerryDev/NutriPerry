import { StyleSheet, Text, View } from 'react-native';
import TelaCadEmailP from './src/screen/cadastro/perfil_pessoal/cadastroEmailP';
import TelaCadNomeP from './src/screen/cadastro/perfil_pessoal/cadastroNomeP';

export default function App() {
  return (
    <View style={styles.container}>
      <TelaCadNomeP></TelaCadNomeP>
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