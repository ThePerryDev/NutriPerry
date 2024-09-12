import { View, StyleSheet, Button, Text } from 'react-native';
import { InputWithIcons } from '../../../components';
import icone_perfil from "../../../assets/perfil.png";
import icone_senha from "../../../assets/senha.png";


export default function LoginForm() {
  return (
    <View style={styles.container}>
      <InputWithIcons iconSource={icone_perfil} placeholder='Insira seu email...'/>
      <InputWithIcons iconSource={icone_senha} placeholder='Insira sua senha...'/>
      
      <Button title='ENTRAR' />
      <Text>Ou cadastre-se...</Text>
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
