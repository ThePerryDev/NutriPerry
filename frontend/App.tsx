import { StyleSheet, Text, View } from 'react-native';
import TelaCadEmail from './src/screen/cadastro/perfil_pessoal/cadastroEmail';

export default function App() {
  return (
    <View style={styles.container}>
      <TelaCadEmail></TelaCadEmail>
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