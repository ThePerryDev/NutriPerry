import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { setaVolta } from "../../../../assets";
import { MenuInferior } from "../../../../components";
import { useState } from "react";

type ContinuarScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "TelaTrocaSenha"
>;

type Props = {
    navigation: ContinuarScreenNavigationProp;
};

const Senha: React.FC<Props> = ({ navigation }) => {
    const [senha, setSenha] = useState<string>("");
    return (
        <View style={styles.container}>
            <View style={styles.cima}>
                <TouchableOpacity style={styles.volta} onPress={() => navigation.navigate("TelaConfiguracoes")}>
                    <Image source={setaVolta} />
                </TouchableOpacity>
                <Text style={styles.titulo}>Configurações</Text>

            </View>
            <View style={styles.viewAdendo}>
                <Text style={styles.subtitulo}>Essa opção irá mudar a senha da sua conta.
                </Text>

                <Text style={styles.texto}>Insira a nova senha</Text>
                <TextInput
                    value={senha}
                    onChangeText={(senha) => setSenha(senha)}
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

export default Senha;