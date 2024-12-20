import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { setaVolta } from "../../../../assets";
import { MenuInferior } from "../../../../components";
import { useState } from "react";

type ContinuarScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "TelaInformacoesNutri2"
>;

type Props = {
    navigation: ContinuarScreenNavigationProp;
};

const InformacoesNutri2: React.FC<Props> = ({ navigation }) => {
    const [idade, setIdade] = useState<string>("");
    const [altura, setAltura] = useState<string>("");
    const [peso, setPeso] = useState<string>("");
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
                <Text style={styles.texto}>Insira sua idade</Text>
                <TextInput
                    value={idade}
                    onChangeText={(idade) => setIdade(idade)}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <Text style={styles.texto}>Insira sua altura</Text>
                <TextInput
                    value={altura}
                    onChangeText={(altura) => setAltura(altura)}
                    style={styles.input}
                />
                <Text style={styles.texto}>Insira sua peso</Text>
                <TextInput
                    value={peso}
                    onChangeText={(peso) => setPeso(peso)}
                    style={styles.input}
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.buttonSalvar}>
                    <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 900, }}>SALVAR</Text>
                </TouchableOpacity>
            </View>

            <MenuInferior navigation={navigation} />
        </View>
    );
}

export default InformacoesNutri2;