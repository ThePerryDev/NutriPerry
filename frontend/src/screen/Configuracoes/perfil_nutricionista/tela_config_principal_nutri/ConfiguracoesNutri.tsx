import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { setaVolta } from "../../../../assets";
import { MenuInferior } from "../../../../components";

type ContinuarScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "TelaConfiguracoesNutri"
>;

type Props = {
    navigation: ContinuarScreenNavigationProp;
};

const ConfiguracoesNutri: React.FC<Props> = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.cima}>
                <TouchableOpacity style={styles.volta}>
                    <Image source={setaVolta} />
                </TouchableOpacity>
                <Text style={styles.titulo}>Configurações</Text>
            </View>
            <View style={styles.conteudo}>
                <TouchableOpacity style={styles.buttonInformacoes} onPress={() => navigation.navigate("TelaInformacoesNutri2")}>
                    <Text style={styles.textoButton}>Informações pessoais</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOutros} onPress={() => navigation.navigate("TelaInformacoesNutri1")}>
                    <Text style={styles.textoButton}>Informações profissionais</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOutros} onPress={() => navigation.navigate("TelaTrocaSenhaNutri")}>
                    <Text style={styles.textoButton}>Mudar senha</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOutros} onPress={() => navigation.navigate("TelaLogin")}>
                    <Text style={styles.textoButton}>Excluir conta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOutros} onPress={() => navigation.navigate("TelaLogin")}>
                    <Text style={styles.textoButton}>Premium</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLogout} onPress={() => navigation.navigate("TelaLogin")}>
                    <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 900, }}>LOGOUT</Text>
                </TouchableOpacity>
            </View>
            <MenuInferior navigation={navigation} />
        </View>
    );
}

export default ConfiguracoesNutri;