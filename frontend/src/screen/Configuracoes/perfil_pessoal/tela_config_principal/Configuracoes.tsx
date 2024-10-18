import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { setaVolta } from "../../../../assets";
import { MenuInferior } from "../../../../components";
import { useContext } from "react";
import { AuthContext } from "../../../../context/auth/AuthContext";
import user from "../../../../services/userService";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TelaConfiguracoes"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const Configuracoes: React.FC<Props> = ({ navigation }) => {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signout();
    navigation.navigate("TelaLogin");
  };

  const handleDelete = async (id: string) => {
    await user.delete(id);
    navigation.navigate("TelaLogin");
  };

  return (
    <View style={styles.container}>
      <View style={styles.cima}>
        <Pressable style={styles.volta}>
          <Image source={setaVolta} />
        </Pressable>
        <Text style={styles.titulo}>Configurações</Text>
      </View>
      <View style={styles.conteudo}>
        <Pressable
          style={styles.buttonInformacoes}
          onPress={() => navigation.navigate("TelaInformacoes")}
        >
          <Text style={styles.textoButton}>Informações de cadastro</Text>
        </Pressable>
        <Pressable
          style={styles.buttonOutros}
          onPress={() => navigation.navigate("TelaTrocaSenha")}
        >
          <Text style={styles.textoButton}>Mudar senha</Text>
        </Pressable>
        <Pressable
          style={styles.buttonOutros}
          onPress={() => {
            if (auth.user?.id) {
              handleDelete(auth.user?.id);
            } else {
              console.error("ID do usuário não encontrado");
            }
          }}
        >
          <Text style={styles.textoButton}>Excluir conta</Text>
        </Pressable>

        <Pressable
          style={styles.buttonOutros}
          onPress={() => navigation.navigate("TelaLogin")}
        >
          <Text style={styles.textoButton}>Premium</Text>
        </Pressable>
        <Pressable style={styles.buttonLogout} onPress={handleLogout}>
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 900 }}>
            LOGOUT
          </Text>
        </Pressable>
      </View>
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default Configuracoes;