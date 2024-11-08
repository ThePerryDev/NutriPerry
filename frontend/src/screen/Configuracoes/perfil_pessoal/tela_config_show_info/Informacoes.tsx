import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { setaVolta } from "../../../../assets";
import { MenuInferior } from "../../../../components";
import { useState, useEffect } from "react";

type ContinuarScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "TelaInformacoes"
>;

type Props = {
    navigation: ContinuarScreenNavigationProp;
};

const Informacoes: React.FC<Props> = ({ navigation }) => {
    const [idade, setIdade] = useState<string>("");
    const [altura, setAltura] = useState<string>("");
    const [peso, setPeso] = useState<string>("");
    const [nivelatividade, setNivelAtividade] = useState<string>("");
    const [objetivo, setObjetivo] = useState<string>("");
    const [objetivocalorico, setObjetivoCalorico] = useState<string>("");
    const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setIsKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.cima}>
                <TouchableOpacity style={styles.volta} onPress={() => navigation.navigate("TelaConfiguracoes")}>
                    <Image source={setaVolta} />
                </TouchableOpacity>
                <Text style={styles.titulo}>Configurações</Text>
            </View>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.viewAdendo}>
                    <Text style={styles.subtitulo}>
                        Alterar as informações de cadastro irá modificar alguns cálculos disponibilizados
                    </Text>
                </View>
                <View style={styles.conteudo}>
                    <Text style={styles.texto}>Insira sua idade</Text>
                    <TextInput
                        value={idade}
                        placeholder={"Exemplo: 16"}
                        onChangeText={(idade) => setIdade(idade)}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <Text style={styles.texto}>Insira sua altura (cm)</Text>
                    <TextInput
                        value={altura}
                        placeholder={"Exemplo: 175"}
                        onChangeText={(altura) => setAltura(altura)}
                        style={styles.input}
                    />
                    <Text style={styles.texto}>Insira seu peso (kg)</Text>
                    <TextInput
                        value={peso}
                        placeholder={"Exemplo: 70"}
                        onChangeText={(peso) => setPeso(peso)}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <Text style={styles.texto}>Nivel de Atividade Física</Text>
                    <TextInput
                        value={nivelatividade}
                        placeholder={"Exemplo: Ativo"}
                        onChangeText={(nivelatividade) => setNivelAtividade(nivelatividade)}
                        style={styles.input}
                    />
                    <Text style={styles.texto}>Objetivo</Text>
                    <TextInput
                        value={objetivo}
                        placeholder={"Exemplo: Ganho de Peso"}
                        onChangeText={(objetivo) => setObjetivo(objetivo)}
                        style={styles.input}
                    />
                    <Text style={styles.texto}>Objetivo Calórico (kcal)</Text>
                    <TextInput
                        value={objetivocalorico}
                        placeholder={"Exemplo: 2000"}
                        onChangeText={(objetivocalorico) => setObjetivoCalorico(objetivocalorico)}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.buttonSalvar}>
                        <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "900" }}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {!isKeyboardVisible && <MenuInferior navigation={navigation} />}
        </KeyboardAvoidingView>
    );
}

export default Informacoes;
