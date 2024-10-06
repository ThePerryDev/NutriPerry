import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { setaVolta } from "../../../../assets";
import { MenuInferior } from "../../../../components";
import { useState } from "react";

type ContinuarScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "TelaInformacoesNutri1"
>;

type Props = {
    navigation: ContinuarScreenNavigationProp;
};

const InformacoesNutri1: React.FC<Props> = ({ navigation }) => {
    const [telefone, setTelefone] = useState<string>("");
    const [trabalho, setTrabalho] = useState<string>("");
    return (
        <View style={styles.container}>
            <View style={styles.cima}>
                <TouchableOpacity style={styles.volta} onPress={() => navigation.navigate("TelaConfiguracoesNutri")}>
                    <Image source={setaVolta} />
                </TouchableOpacity>
                <Text style={styles.titulo}>Configurações</Text>

            </View>
            <View style={styles.viewAdendo}>
                <Text style={styles.subtitulo}>Alterar as informações de cadastro irá modificar alguns cálculos disponibilizados</Text>
            </View>
            <View style={styles.conteudo}>
                <Text style={styles.texto}>Insira seu telefone</Text>
                <TextInput
                    value={telefone}
                    onChangeText={(telefone) => setTelefone(telefone)}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <Text style={styles.texto}>Insira seu local de trabalho</Text>
                <TextInput
                    value={trabalho}
                    onChangeText={(trabalho) => setTrabalho(trabalho)}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.buttonSalvar}>
                    <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 900, }}>SALVAR</Text>
                </TouchableOpacity>
            </View>

            <MenuInferior></MenuInferior>
        </View>
    );
}

export default InformacoesNutri1;