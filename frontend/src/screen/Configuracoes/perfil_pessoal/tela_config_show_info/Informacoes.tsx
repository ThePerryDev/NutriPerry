import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { setaVolta } from "../../../../assets";
import { MenuInferior } from "../../../../components";
import Picker_update from "../../../../components/Cadastro/Picker_update/picker";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../../../../context";
import DatePickerUpdate from "../../../../components/Cadastro/DatePickerUpdate/datepicker";


type ContinuarScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "TelaInformacoes"
>;

type Props = {
    navigation: ContinuarScreenNavigationProp;
};

const Informacoes: React.FC<Props> = ({ navigation }) => {
    const [birthdate, setBirthdate] = useState<Date>(new Date()); // Estado agora é do tipo Date
    const [altura, setAltura] = useState<string>("");
    const [peso, setPeso] = useState<string>("");
    const [nivelatividade, setNivelAtividade] = useState<string>("");
    const [objetivo, setObjetivo] = useState<string>("");
    const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
    const { user } = useContext(AuthContext);

    const handleUpdate = async () => {
        if (!peso || !altura || !nivelatividade || !objetivo || !birthdate) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const dataAtualizada = {
            userId: user?.id,
            weight: parseFloat(peso),
            height: parseFloat(altura),
            activityLevel: nivelatividade,
            goal: objetivo,
            birthdate: moment(birthdate).format("YYYY-MM-DD"), // Converte Date para string
        };

        console.log("Dados enviados para atualização:", dataAtualizada);

        try {
            const response = await axios.put(
                `http://192.168.0.107:3000/user/atualizarpeso/${user?.id}`,
                dataAtualizada
            );

            if (response.status === 200) {
                alert("Dados atualizados com sucesso!");

                const updatedUser = response.data;
                setPeso(updatedUser.weight.toString());
                setAltura(updatedUser.height.toString());
                setNivelAtividade(updatedUser.activityLevel);
                setObjetivo(updatedUser.goal);
                setBirthdate(new Date(updatedUser.birthdate)); // Atualiza com o formato correto
            } else {
                alert("Erro ao atualizar dados. Por favor, tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao atualizar dados:", error);
            alert("Ocorreu um erro ao atualizar os dados. Tente novamente mais tarde.");
        }
    };

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

    const goalOptions = [
        { label: "", value: "" },
        { label: "Perder peso", value: "perda de peso" },
        { label: "Manutenção de peso", value: "manutenção de peso" },
        { label: "Ganho de peso", value: "ganho de peso" },
    ];

    const exerciseTimeOptions = [
        { label: "", value: "" },
        { label: "Sedentário", value: "sedentario" },
        { label: "Pouco ativo", value: "pouco ativo" },
        { label: "Ativo", value: "ativo" },
        { label: "Muito ativo", value: "muito ativo" },
    ];

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.cima}>
                <TouchableOpacity
                    style={styles.volta}
                    onPress={() => navigation.navigate("TelaConfiguracoes")}
                >
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
                    <Text style={styles.texto}>Selecione sua data de nascimento</Text>
                    <DatePickerUpdate
                        selectedDate={birthdate}
                        onDateChange={setBirthdate}
                    />
                    <Text style={styles.texto}>Insira sua altura (cm)</Text>
                    <TextInput
                        value={altura}
                        placeholder={"Exemplo: 175"}
                        onChangeText={(altura) => setAltura(altura)}
                        style={styles.input}
                    />
                </View>
                <View style={styles.conteudo}>
                    <Text style={styles.texto}>Insira seu peso (kg)</Text>
                    <TextInput
                        value={peso}
                        placeholder={"Exemplo: 70"}
                        onChangeText={(peso) => setPeso(peso)}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <Picker_update
                        label="Nível de Atividade Física"
                        selectedValue={nivelatividade}
                        onValueChange={(itemValue) => setNivelAtividade(itemValue)}
                        items={exerciseTimeOptions}
                    />
                    <Picker_update
                        label="Objetivo"
                        selectedValue={objetivo}
                        onValueChange={(itemValue) => setObjetivo(itemValue)}
                        items={goalOptions}
                    />
                    <TouchableOpacity style={styles.buttonSalvar} onPress={handleUpdate}>
                        <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "900" }}>
                            SALVAR
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {!isKeyboardVisible && <MenuInferior navigation={navigation} />}
        </KeyboardAvoidingView>
    );
};

export default Informacoes;
