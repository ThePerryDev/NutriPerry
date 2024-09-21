import { View, StyleSheet, Button, Text } from 'react-native';
import { InputWithIcons } from '../../components';
import icone_perfil from "../../assets/perfil.png"
import icone_senha from "../../assets/senha.png";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TelaLogin"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};


const TelaLogin: React.FC<Props> = ({ navigation }) =>{
  return (
    <View style={styles.container}>
      <InputWithIcons iconSource={icone_perfil} placeholder='Insira seu email...'/>
      <InputWithIcons iconSource={icone_senha} placeholder='Insira sua senha...'/>
      
      <Button title='ENTRAR' onPress={() => navigation.navigate("CadastroNome")}/>
      <Text>Ou cadastre-se...</Text>
    </View>
  );
}

export default TelaLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
